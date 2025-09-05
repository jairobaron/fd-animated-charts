import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const anomaliesData = [
  { x: -13, y: 11, type: 'ASPHALTENES', category: 'asphaltenes' },
  { x: -11.5, y: 6.5, type: 'AVERAGE WELL', category: 'average' },
  { x: -8, y: 3.5, type: 'BOMBA MAL ESPACIADA', category: 'pump_spacing' },
  { x: -8, y: 3.5, type: 'DEEP WELL', category: 'deep_well' },
  { x: -13, y: 4, type: 'DINAGRAMA NUEVO', category: 'new_diagram' },
  { x: -7.5, y: 10, type: 'FLUID POUND', category: 'fluid_pound' },
  { x: -5, y: -10, type: 'FLUMPING', category: 'flumping' },
  { x: -6, y: -2, type: 'FUGA VALVULA FIJA', category: 'fixed_valve_leak' },
  { x: -6, y: -9, type: 'FUGA VALVULA VIAJERA', category: 'traveling_valve_leak' },
  { x: -12, y: 1.5, type: 'GAS INTERFERENCE', category: 'gas_interference' },
  { x: -12, y: 1.5, type: 'GUNK IN PUMP', category: 'gunk_pump' },
  { x: -9.5, y: -6, type: 'LEAK SV', category: 'leak_sv' },
  { x: -12.5, y: -0.5, type: 'LEAK TUB-HOLE', category: 'leak_tub_hole' },
  { x: -9, y: -1.5, type: 'LEAK TV', category: 'leak_tv' },
  { x: -6, y: -2, type: 'TAGGING DOWN HARD', category: 'tagging_down' },
  { x: -4, y: -10, type: 'TUBERIA NO ANCLADA', category: 'unanchored_tubing' }
];

const categoryColors = {
  asphaltenes: 'hsl(var(--chart-1))',
  average: 'hsl(var(--chart-2))',
  pump_spacing: 'hsl(var(--chart-3))',
  deep_well: 'hsl(var(--chart-4))',
  new_diagram: 'hsl(var(--destructive))',
  fluid_pound: 'hsl(var(--destructive))',
  flumping: 'hsl(220 14.3% 45.9%)',
  fixed_valve_leak: 'hsl(262.1 83.3% 57.8%)',
  traveling_valve_leak: 'hsl(220 8.9% 46.1%)',
  gas_interference: 'hsl(220 8.9% 46.1%)',
  gunk_pump: 'hsl(var(--chart-5))',
  leak_sv: 'hsl(var(--chart-2))',
  leak_tub_hole: 'hsl(var(--chart-1))',
  leak_tv: 'hsl(var(--chart-3))',
  tagging_down: 'hsl(var(--chart-4))',
  unanchored_tubing: 'hsl(262.1 83.3% 57.8%)'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{data.type}</p>
        <p className="text-sm text-muted-foreground">
          Latente 1: {data.x}
        </p>
        <p className="text-sm text-muted-foreground">
          Latente 2: {data.y}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems(prev => {
        const categories = Object.keys(categoryColors);
        const nextIndex = prev.length;
        if (nextIndex < categories.length) {
          return [...prev, categories[nextIndex]];
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-4 px-4">
      {Object.entries(categoryColors).map(([category, color], index) => {
        const isVisible = visibleItems.includes(category);
        const displayName = anomaliesData.find(d => d.category === category)?.type || category;
        
        return (
          <div
            key={category}
            className={`flex items-center gap-2 text-xs transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-foreground font-medium">{displayName}</span>
          </div>
        );
      })}
    </div>
  );
};

const AnomaliesChart = () => {
  const [animatedData, setAnimatedData] = useState<typeof anomaliesData>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedData(prev => {
        if (prev.length < anomaliesData.length) {
          return [...prev, anomaliesData[prev.length]];
        }
        return prev;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="w-full max-w-7xl mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Dinagrama nuevo en el espacio latente
        </CardTitle>
        <CardDescription className="text-base">
          Análisis de anomalías en el espacio de características latentes
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 60,
                left: 60,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--muted-foreground))" 
                opacity={0.3}
              />
              <XAxis
                type="number"
                dataKey="x"
                name="Latente 1"
                domain={[-14, -3]}
                stroke="hsl(var(--foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ 
                  value: 'Latente 1', 
                  position: 'bottom',
                  style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' }
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Latente 2"
                domain={[-11, 12]}
                stroke="hsl(var(--foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ 
                  value: 'Latente 2', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Scatter data={animatedData} fill="hsl(var(--primary))">
                {animatedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={categoryColors[entry.category as keyof typeof categoryColors]}
                    r={entry.category === 'new_diagram' || entry.category === 'fluid_pound' ? 8 : 5}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <CustomLegend />
      </CardContent>
    </Card>
  );
};

export default AnomaliesChart;