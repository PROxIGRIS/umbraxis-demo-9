import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjgxMWNkMGE3MzlkZjQ4ZGJiMTU4NDU2MTk1ZDViNzQ2IiwiaCI6Im11cm11cjY0In0=';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { locations, sources, destinations } = await req.json();

    if (!locations || !Array.isArray(locations)) {
      throw new Error('Invalid locations format');
    }

    console.log('Requesting matrix for locations:', locations);

    const body: any = { locations };
    if (sources !== undefined) body.sources = sources;
    if (destinations !== undefined) body.destinations = destinations;

    const response = await fetch(
      'https://api.openrouteservice.org/v2/matrix/driving-car',
      {
        method: 'POST',
        headers: {
          'Authorization': ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ORS Matrix API Error:', errorText);
      throw new Error(`ORS Matrix API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Matrix calculated successfully');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ors-matrix:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});