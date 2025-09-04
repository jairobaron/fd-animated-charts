import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  name: string;
  tension: number;
  percentage: number;
  color: string;
}

const initialData: ChartData[] = [
  { name: 'Tramo 1', tension: 5, percentage: 41.7, color: 'hsl(var(--chart-1))' },
  { name: 'Tramo 2', tension: 8, percentage: 66.7, color: 'hsl(var(--chart-2))' },
  { name: 'Tramo 3', tension: 10, percentage: 83.3, color: 'hsl(var(--chart-3))' },
  { name: 'Tramo 4', tension: 8.9, percentage: 74.4, color: 'hsl(var(--chart-4))' },
  { name: 'Tramo 5', tension: 6.8, percentage: 56.8, color: 'hsl(var(--chart-5))' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg animate-fade-in-up">
        <p className="font-semibold text-card-foreground">{label}</p>
        <p className="text-primary">
          Tensión: <span className="font-bold">{payload[0].value} kN/m²</span>
        </p>
        <p className="text-secondary">
          Porcentaje: <span className="font-bold">{payload[0].payload.percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const AnimatedChart: React.FC = () => {
  const [animatedData, setAnimatedData] = useState<ChartData[]>([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // Initialize with zero values
    setAnimatedData(initialData.map(item => ({ ...item, tension: 0 })));
    
    // Show chart container
    setTimeout(() => setShowChart(true), 100);
    
    // Animate bars one by one
    initialData.forEach((item, index) => {
      setTimeout(() => {
        setAnimatedData(prev => 
          prev.map((prevItem, prevIndex) => 
            prevIndex === index 
              ? { ...prevItem, tension: item.tension }
              : prevItem
          )
        );
      }, 200 + index * 150);
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card className={`transition-all duration-700 ${showChart ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Diagrama de superficie con cargas admisibles
          </CardTitle>
          <CardDescription className="text-lg">
            Análisis de Goodman - Tensión por tramos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 md:h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={animatedData}
                margin={{ top: 40, right: 30, left: 20, bottom: 60 }}
                barCategoryGap="20%"
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  strokeOpacity={0.3}
                />
                <XAxis 
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 14, 
                    fontWeight: 500,
                    fill: 'hsl(var(--foreground))'
                  }}
                  interval={0}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 12,
                    fill: 'hsl(var(--muted-foreground))'
                  }}
                  label={{ 
                    value: 'Tensión (kN/m²)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { 
                      textAnchor: 'middle',
                      fill: 'hsl(var(--foreground))',
                      fontSize: '14px',
                      fontWeight: '500'
                    }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Línea de tensión admisible */}
                <Bar dataKey="tension" radius={[8, 8, 0, 0]}>
                  {animatedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity duration-200"
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                        transformOrigin: 'bottom'
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Línea de referencia */}
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-destructive opacity-80" 
                 style={{ top: '-280px' }}>
              <span className="absolute right-0 -top-6 text-sm font-medium text-destructive">
                Tensión admisible (12 kN/m²)
              </span>
            </div>
          </div>
          
          {/* Porcentajes */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {initialData.map((item, index) => (
              <div 
                key={item.name}
                className={`text-center p-3 rounded-lg bg-gradient-to-br from-card to-muted/50 border border-border transition-all duration-500 hover:scale-105 ${
                  showChart ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${800 + index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-2 animate-pulse-glow"
                  style={{ backgroundColor: item.color }}
                />
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.percentage}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.tension} kN/m²
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimatedChart;