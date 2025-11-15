import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useDriverStore } from '@/store/driverStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogOut, MapPin, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Driver() {
  const { driverId, driverName, isAuthenticated, setDriver, logout } = useDriverStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [lastLocation, setLastLocation] = useState<GeolocationPosition | null>(null);
  const [lastSent, setLastSent] = useState<Date | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && isTracking) {
      startTracking();
    }

    return () => {
      stopTracking();
    };
  }, [isAuthenticated, isTracking]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('drivers')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
      return;
    }

    const passwordMatch = atob(data.password_hash) === password;
    if (!passwordMatch) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
      return;
    }

    if (!data.active) {
      toast({
        title: 'Error',
        description: 'Your account is inactive. Contact admin.',
        variant: 'destructive',
      });
      return;
    }

    setDriver(data.id, data.name);
    toast({
      title: 'Success',
      description: 'Logged in successfully',
    });
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Error',
        description: 'Geolocation is not supported',
        variant: 'destructive',
      });
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        setLastLocation(position);
        
        if (driverId) {
          const { error } = await supabase
            .from('driver_locations')
            .insert([
              {
                driver_id: driverId,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: new Date().toISOString(),
              },
            ]);

          if (!error) {
            setLastSent(new Date());
          }
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast({
          title: 'Location Error',
          description: error.message,
          variant: 'destructive',
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    setIsTracking(true);
    toast({
      title: 'Tracking Started',
      description: 'Your location is being shared',
    });
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  const handleLogout = () => {
    stopTracking();
    logout();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Driver Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Driver Mode</h1>
            <p className="text-muted-foreground mt-2">Welcome, {driverName}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Tracking Status</h2>
              <Badge variant={isTracking ? 'default' : 'secondary'}>
                <Activity className={`w-4 h-4 mr-2 ${isTracking ? 'animate-pulse' : ''}`} />
                {isTracking ? 'Online' : 'Offline'}
              </Badge>
            </div>

            {!isTracking ? (
              <Button onClick={startTracking} className="w-full" size="lg">
                <MapPin className="w-4 h-4 mr-2" />
                Start Location Sharing
              </Button>
            ) : (
              <Button onClick={stopTracking} variant="destructive" className="w-full" size="lg">
                Stop Sharing
              </Button>
            )}
          </Card>

          {lastLocation && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Current Location</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latitude:</span>
                  <span className="font-mono">{lastLocation.coords.latitude.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Longitude:</span>
                  <span className="font-mono">{lastLocation.coords.longitude.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span>{Math.round(lastLocation.coords.accuracy)}m</span>
                </div>
                {lastSent && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sent:</span>
                    <span>{lastSent.toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}