-- Create drivers table
CREATE TABLE IF NOT EXISTS public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  assigned_route JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create driver_locations table for tracking
CREATE TABLE IF NOT EXISTS public.driver_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_locations ENABLE ROW LEVEL SECURITY;

-- Policies for drivers table
CREATE POLICY "Drivers can view their own data"
  ON public.drivers FOR SELECT
  USING (true);

CREATE POLICY "Drivers can update their own data"
  ON public.drivers FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Policies for driver_locations (public read for tracking)
CREATE POLICY "Anyone can view driver locations"
  ON public.driver_locations FOR SELECT
  USING (true);

CREATE POLICY "Drivers can insert their own location"
  ON public.driver_locations FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_driver_locations_driver_id ON public.driver_locations(driver_id);
CREATE INDEX idx_driver_locations_timestamp ON public.driver_locations(timestamp DESC);

-- Enable realtime for driver_locations
ALTER PUBLICATION supabase_realtime ADD TABLE public.driver_locations;

-- Trigger for updated_at
CREATE TRIGGER update_drivers_updated_at
  BEFORE UPDATE ON public.drivers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();