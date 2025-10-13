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
    const { answers, subject } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing quiz for subject:", subject);

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
            content: `You are an educational assessment expert. Analyze student quiz answers and provide:
1. Overall proficiency level (Beginner/Intermediate/Advanced)
2. Knowledge map with 6-8 specific topics and scores (0-100)
3. Top 3 strengths and 3 areas for improvement
4. Personalized 90-day study roadmap with weekly goals
5. Recommended tutor match criteria

Return valid JSON only with this structure:
{
  "proficiency": "string",
  "overallScore": number,
  "knowledgeMap": [{"topic": "string", "score": number, "description": "string"}],
  "strengths": ["string"],
  "improvements": ["string"],
  "roadmap": [{"week": number, "goal": "string", "activities": ["string"]}],
  "tutorMatch": {"style": "string", "focus": ["string"], "sessionFrequency": "string"}
}` 
          },
          { 
            role: "user", 
            content: `Subject: ${subject}\n\nStudent Answers:\n${JSON.stringify(answers, null, 2)}\n\nAnalyze this quiz and provide detailed educational insights.`
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
    const analysisText = data.choices[0].message.content;
    
    // Parse JSON from AI response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = analysisText.match(/```json\n?([\s\S]*?)\n?```/) || analysisText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : analysisText;
      analysis = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      throw new Error("Failed to parse analysis results");
    }

    console.log("Quiz analysis completed successfully");

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Quiz analysis error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
