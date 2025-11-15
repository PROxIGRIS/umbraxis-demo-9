import { supabase } from '@/integrations/supabase/client';

export interface RouteResponse {
  routes: Array<{
    summary: {
      distance: number;
      duration: number;
    };
    geometry: string;
  }>;
}

export interface MatrixResponse {
  durations: number[][];
  distances: number[][];
}

export const getRoute = async (
  coordinates: [number, number][]
): Promise<RouteResponse> => {
  const { data, error } = await supabase.functions.invoke('ors-directions', {
    body: { coordinates },
  });

  if (error) throw error;
  return data;
};

export const getMatrixETA = async (
  locations: [number, number][],
  sources?: number[],
  destinations?: number[]
): Promise<MatrixResponse> => {
  const { data, error } = await supabase.functions.invoke('ors-matrix', {
    body: { locations, sources, destinations },
  });

  if (error) throw error;
  return data;
};