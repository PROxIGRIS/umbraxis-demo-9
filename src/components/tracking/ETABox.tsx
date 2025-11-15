import { Clock, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { convertSecondsToMinutes, convertMetersToKM } from '@/utils/mapUtils';

interface ETABoxProps {
  duration: number | null;
  distance: number | null;
  loading?: boolean;
}

export const ETABox = ({ duration, distance, loading }: ETABoxProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/20">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estimated Time</p>
            <p className="text-2xl font-bold">
              {loading ? '...' : duration ? `${convertSecondsToMinutes(duration)} min` : 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-secondary/20">
            <MapPin className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Distance</p>
            <p className="text-2xl font-bold">
              {loading ? '...' : distance ? `${convertMetersToKM(distance)} km` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};