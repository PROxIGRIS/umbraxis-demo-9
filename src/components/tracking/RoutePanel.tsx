import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RoutePanelProps {
  driverName: string;
  serialNumber: string;
  isActive: boolean;
  startPoint?: [number, number];
  endPoint?: [number, number];
  onRecalculate: () => void;
  loading?: boolean;
}

export const RoutePanel = ({
  driverName,
  serialNumber,
  isActive,
  startPoint,
  endPoint,
  onRecalculate,
  loading
}: RoutePanelProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{driverName}</h2>
          <p className="text-sm text-muted-foreground">Serial: {serialNumber}</p>
        </div>
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Active' : 'Offline'}
        </Badge>
      </div>

      {startPoint && endPoint && (
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Navigation className="w-4 h-4 mt-1 text-primary" />
            <div>
              <p className="font-medium">Start</p>
              <p className="text-muted-foreground">
                {startPoint[1].toFixed(6)}, {startPoint[0].toFixed(6)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Navigation className="w-4 h-4 mt-1 text-destructive rotate-180" />
            <div>
              <p className="font-medium">End</p>
              <p className="text-muted-foreground">
                {endPoint[1].toFixed(6)}, {endPoint[0].toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}

      <Button 
        onClick={onRecalculate} 
        disabled={loading}
        className="w-full"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
        Recalculate Route
      </Button>
    </Card>
  );
};