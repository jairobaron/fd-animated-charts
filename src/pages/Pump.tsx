import PumpVisualization from '@/components/PumpVisualization';

const Pump = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Bomba Mecánica SRP
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema de Bombeo por Varillas de Succión - Monitoreo en Tiempo Real
          </p>
        </div>
        
        <PumpVisualization />
      </div>
    </div>
  );
};

export default Pump;