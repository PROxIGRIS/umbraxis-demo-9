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
    const { subject, level } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating quiz for:", subject, level);

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
            content: `You are an expert educational assessment creator. Generate a diagnostic quiz with 8 questions for ${subject} at ${level} level.

Return ONLY valid JSON with this exact structure:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": "Correct answer text (must match one option exactly)",
      "topic": "Specific topic name",
      "difficulty": "easy|medium|hard"
    }
  ]
}

Requirements:
- 8 questions total
- Mix of difficulty levels (3 easy, 3 medium, 2 hard)
- Cover diverse topics within the subject
- Clear, unambiguous questions
- 4 options per question
- Correct answer must be ONE of the exact option strings` 
          },
          { 
            role: "user", 
            content: `Generate an 8-question diagnostic quiz for ${subject} at ${level} level.`
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
    const quizText = data.choices[0].message.content;
    
    // Parse JSON from AI response
    let quiz;
    try {
      const jsonMatch = quizText.match(/```json\n?([\s\S]*?)\n?```/) || quizText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : quizText;
      quiz = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      throw new Error("Failed to parse quiz data");
    }

    console.log("Quiz generated successfully");

    return new Response(JSON.stringify(quiz), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Quiz generation error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
