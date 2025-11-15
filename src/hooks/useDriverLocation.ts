import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DriverLocation {
  id: string;
  driver_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export const useDriverLocation = (driverId: string | null) => {
  const [location, setLocation] = useState<DriverLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!driverId) return;

    const fetchLatestLocation = async () => {
      const { data, error } = await supabase
        .from('driver_locations')
        .select('*')
        .eq('driver_id', driverId)
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setLocation(data);
      }
      setLoading(false);
    };

    fetchLatestLocation();

    const channel = supabase
      .channel(`driver-location-${driverId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'driver_locations',
          filter: `driver_id=eq.${driverId}`,
        },
        (payload) => {
          setLocation(payload.new as DriverLocation);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [driverId]);

  return { location, loading };
};