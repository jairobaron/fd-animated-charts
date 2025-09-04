import PumpOffControl from '@/components/PumpOffControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const PumpControl = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Pump Control
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Control y monitoreo de sistemas de bombeo
          </p>
        </div>
        
        <Card className="w-full max-w-6xl mx-auto p-4 space-y-4">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Pump Control System
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <PumpOffControl />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PumpControl;