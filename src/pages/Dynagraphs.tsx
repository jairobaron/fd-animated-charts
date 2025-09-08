import SurfaceDynagraph from '@/components/SurfaceDynagraph';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const Dynagraphs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Dynagraphs
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Análisis de dinamógrafos y comportamiento de bombeo
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Dynagraphs Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <SurfaceDynagraph/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dynagraphs;