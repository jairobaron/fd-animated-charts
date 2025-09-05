import IPRCurveChart from '@/components/IPRCurveChart';

const IPRCurve = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Curva IPR
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Análisis de la Relación de Rendimiento de Entrada del Pozo
          </p>
        </div>
        
        <IPRCurveChart />
      </div>
    </div>
  );
};

export default IPRCurve;