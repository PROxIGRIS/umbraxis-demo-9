import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ShareRequest {
  email: string;
  studentName: string;
  subject: string;
  overallScore: number;
  proficiency: string;
  resultsUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, studentName, subject, overallScore, proficiency, resultsUrl }: ShareRequest = await req.json();

    // Note: Resend API key needs to be configured in Supabase secrets
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "EduTutor Results <onboarding@resend.dev>",
        to: [email],
        subject: `${studentName}'s ${subject} Quiz Results - ${proficiency} Level`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .score-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .score { font-size: 48px; font-weight: bold; color: #667eea; margin: 10px 0; }
                .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎓 Quiz Results</h1>
                  <p>Diagnostic Assessment for ${studentName}</p>
                </div>
                <div class="content">
                  <p>Hello!</p>
                  <p><strong>${studentName}</strong> has completed a diagnostic quiz in <strong>${subject}</strong>. Here are the results:</p>
                  
                  <div class="score-card">
                    <h2>${subject}</h2>
                    <div class="score">${overallScore}%</div>
                    <p style="font-size: 18px; color: #667eea; font-weight: 600;">${proficiency} Level</p>
                  </div>

                  <p>The complete results include:</p>
                  <ul>
                    <li>📊 Detailed knowledge map across all topics</li>
                    <li>💪 Identified strengths and growth areas</li>
                    <li>🗺️ Personalized 90-day learning roadmap</li>
                    <li>👨‍🏫 Matched tutor recommendations</li>
                  </ul>

                  <div style="text-align: center;">
                    <a href="${resultsUrl}" class="button">View Full Results</a>
                  </div>

                  <p style="margin-top: 30px; padding: 20px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                    <strong>💡 Next Steps:</strong> Review the personalized roadmap and consider booking a session with one of our recommended tutors to accelerate progress.
                  </p>
                </div>
                <div class="footer">
                  <p>This email was sent because someone shared quiz results with this email address.</p>
                  <p>© ${new Date().getFullYear()} EduTutor. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const data = await emailResponse.json();
    console.log("Results shared successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sharing results:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
