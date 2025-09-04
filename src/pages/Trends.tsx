import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const Trends = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Trends
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Análisis de tendencias y patrones temporales
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <BarChart className="h-6 w-6 text-primary" />
              Trend Analysis
            </CardTitle>
            <CardDescription>
              Próximamente: Análisis de tendencias
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="bg-muted rounded-lg p-8">
              <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Esta sección contendrá análisis de tendencias y patrones de datos históricos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trends;