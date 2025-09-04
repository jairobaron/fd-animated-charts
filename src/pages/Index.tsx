import AnimatedChart from '@/components/AnimatedChart';

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Gráficas Animadas Interactivas
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualización de datos con animaciones fluidas, optimizada para web y móvil
          </p>
        </div>
        
        <AnimatedChart />
      </div>
    </main>
  );
};

export default Index;
