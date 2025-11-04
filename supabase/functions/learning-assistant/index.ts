import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, subject } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Learning assistant request:", action, subject);

    if (action === 'analyze-subject') {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { 
              role: "system", 
              content: `You are an educational AI assistant. Analyze subjects and provide structured learning insights. Return ONLY valid JSON.`
            },
            { 
              role: "user", 
              content: `Analyze the subject "${subject}" and provide:
1. 4-6 key topics with name, difficulty (easy/medium/hard), and brief description
2. A learning path with 4 phases (each with phase name, duration, description)
3. 3 matched tutors with name, specialty, and match percentage (85-98%)

Return JSON format:
{
  "topics": [{"name": "string", "difficulty": "easy|medium|hard", "description": "string"}],
  "learningPath": [{"phase": "string", "duration": "string", "description": "string"}],
  "tutors": [{"name": "string", "specialty": "string", "match": number}]
}`
            }
          ],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("AI gateway error:", response.status, text);
        return new Response(JSON.stringify({ error: "AI service error" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const data = await response.json();
      const resultText = data.choices[0].message.content;
      
      let result;
      try {
        const jsonMatch = resultText.match(/```json\n?([\s\S]*?)\n?```/) || resultText.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : resultText;
        result = JSON.parse(jsonStr);
      } catch (e) {
        console.error("Failed to parse AI response:", e);
        throw new Error("Failed to parse analysis results");
      }

      console.log("Subject analysis completed successfully");

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("Learning assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
