import AnomaliesChart from '@/components/AnomaliesChart';

const Anomalies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Anomalies
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Detección y análisis de anomalías en el sistema
          </p>
        </div>
        
        <AnomaliesChart />
      </div>
    </div>
  );
};

export default Anomalies;