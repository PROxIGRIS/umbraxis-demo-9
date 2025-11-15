import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import { supabase } from '@/integrations/supabase/client';
import { useDriverLocation } from '@/hooks/useDriverLocation';
import { LiveMap } from '@/components/tracking/LiveMap';
import { RoutePanel } from '@/components/tracking/RoutePanel';
import { ETABox } from '@/components/tracking/ETABox';
import { getRoute, getMatrixETA } from '@/utils/orsApi';
import { decodePolyline, isDriverActive } from '@/utils/mapUtils';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  id: string;
  name: string;
  serial_number: string;
  assigned_route: any;
}

export default function Tracking() {
  const { driverId } = useParams<{ driverId: string }>();
  const { location } = useDriverLocation(driverId || null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (driverId) {
      fetchDriver();
    }
  }, [driverId]);

  useEffect(() => {
    if (location && mapRef.current) {
      updateDriverMarker([location.longitude, location.latitude]);
      
      if (driver?.assigned_route?.end) {
        calculateRoute();
      }
    }
  }, [location, driver]);

  const fetchDriver = async () => {
    if (!driverId) return;

    const { data, error } = await supabase
      .from('drivers')
      .select('*')
      .eq('id', driverId)
      .single();

    if (!error && data) {
      setDriver(data);
    }
  };

  const updateDriverMarker = (coords: [number, number]) => {
    if (!mapRef.current) return;

    if (markerRef.current) {
      markerRef.current.setLngLat(coords);
    } else {
      const el = document.createElement('div');
      el.className = 'driver-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#3b82f6';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';

      markerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat(coords)
        .addTo(mapRef.current);
    }

    mapRef.current.flyTo({
      center: coords,
      zoom: 14,
      duration: 1000,
    });
  };

  const calculateRoute = async () => {
    if (!location || !driver?.assigned_route?.end) return;

    setLoading(true);

    try {
      const start: [number, number] = [location.longitude, location.latitude];
      const end = driver.assigned_route.end;

      const [routeData, matrixData] = await Promise.all([
        getRoute([start, end]),
        getMatrixETA([start, end], [0], [1]),
      ]);

      if (routeData.routes[0]) {
        const route = routeData.routes[0];
        setDuration(route.summary.duration);
        setDistance(route.summary.distance);

        if (mapRef.current) {
          const coordinates = decodePolyline(route.geometry);

          if (mapRef.current.getSource('route')) {
            (mapRef.current.getSource('route') as maplibregl.GeoJSONSource).setData({
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates,
              },
            });
          } else {
            mapRef.current.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates,
                },
              },
            });

            mapRef.current.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#3b82f6',
                'line-width': 4,
                'line-opacity': 0.8,
              },
            });
          }

          // Add end marker
          const endEl = document.createElement('div');
          endEl.className = 'end-marker';
          endEl.style.width = '20px';
          endEl.style.height = '20px';
          endEl.style.borderRadius = '50%';
          endEl.style.backgroundColor = '#ef4444';
          endEl.style.border = '2px solid white';

          new maplibregl.Marker({ element: endEl })
            .setLngLat(end)
            .addTo(mapRef.current);
        }
      }

      toast({
        title: 'Route Calculated',
        description: 'ETA and route updated successfully',
      });
    } catch (error) {
      console.error('Route calculation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to calculate route',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMapLoad = (map: maplibregl.Map) => {
    mapRef.current = map;
    
    if (location) {
      updateDriverMarker([location.longitude, location.latitude]);
      if (driver?.assigned_route?.end) {
        calculateRoute();
      }
    }
  };

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading driver information...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="md:w-1/3 p-4 space-y-4 overflow-y-auto bg-background">
        <RoutePanel
          driverName={driver.name}
          serialNumber={driver.serial_number}
          isActive={location ? isDriverActive(location.timestamp) : false}
          startPoint={location ? [location.longitude, location.latitude] : undefined}
          endPoint={driver.assigned_route?.end}
          onRecalculate={calculateRoute}
          loading={loading}
        />
        
        <ETABox
          duration={duration}
          distance={distance}
          loading={loading}
        />
      </div>

      <div className="flex-1 relative">
        <LiveMap
          center={location ? [location.longitude, location.latitude] : [0, 0]}
          zoom={13}
          onMapLoad={handleMapLoad}
        />
      </div>
    </div>
  );
}