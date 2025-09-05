import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot, ReferenceDot } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IPRData {
  barrels: number;
  pressure: number;
}

const IPRCurveChart = () => {
  const [data, setData] = useState<IPRData[]>([]);
  const [currentPoint, setCurrentPoint] = useState({ barrels: 35, pressure: 1020 });
  const [animationProgress, setAnimationProgress] = useState(0);

  // Generate IPR curve data points
  const generateIPRData = (): IPRData[] => {
    const points: IPRData[] = [];
    const maxPressure = 1500;
    const maxFlow = 100;
    
    for (let i = 0; i <= 100; i++) {
      const barrels = i;
      // IPR curve equation: P = Pmax * (1 - (Q/Qmax)^2)
      const normalizedFlow = barrels / maxFlow;
      const pressure = maxPressure * (1 - Math.pow(normalizedFlow, 1.8));
      points.push({ barrels, pressure: Math.max(0, pressure) });
    }
    
    return points;
  };

  useEffect(() => {
    const iprData = generateIPRData();
    setData(iprData);

    // Animation for drawing the curve
    const animationInterval = setInterval(() => {
      setAnimationProgress(prev => {
        if (prev >= 100) {
          clearInterval(animationInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate operating point variations
    const pointInterval = setInterval(() => {
      setCurrentPoint(prev => ({
        barrels: 35 + (Math.random() - 0.5) * 4,
        pressure: 1020 + (Math.random() - 0.5) * 40
      }));
    }, 3000);

    return () => {
      clearInterval(animationInterval);
      clearInterval(pointInterval);
    };
  }, []);

  // Filter data based on animation progress
  const visibleData = data.slice(0, Math.floor((data.length * animationProgress) / 100));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`Flujo: ${label} bbl/d`}</p>
          <p className="text-primary">{`Presión: ${payload[0].value.toFixed(1)} PSI`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy } = props;
    if (Math.abs(props.payload.barrels - currentPoint.barrels) < 2) {
      return <Dot cx={cx} cy={cy} r={4} fill="#22c55e" stroke="#16a34a" strokeWidth={2} />;
    }
    return null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Card className="overflow-hidden">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-primary">
            Curva IPR
          </CardTitle>
          <CardDescription>
            Relación de Rendimiento de Entrada (Inflow Performance Relationship)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chart */}
            <div className="lg:col-span-3">
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={visibleData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="hsl(var(--muted-foreground))" 
                      opacity={0.3}
                    />
                    <XAxis 
                      dataKey="barrels"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      label={{ 
                        value: 'Barriles/D', 
                        position: 'insideBottom', 
                        offset: -10,
                        style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }
                      }}
                      domain={[0, 100]}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      label={{ 
                        value: 'Presión (PSI)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }
                      }}
                      domain={[0, 1600]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Line
                      type="monotone"
                      dataKey="pressure"
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={{ r: 6, fill: "#ef4444" }}
                      connectNulls={false}
                    />
                    
                    {/* Operating Point */}
                    <ReferenceDot 
                      x={currentPoint.barrels} 
                      y={currentPoint.pressure} 
                      r={5} 
                      fill="#1f2937" 
                      stroke="#374151" 
                      strokeWidth={2}
                      className="animate-pulse"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Metrics Panel */}
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Punto de Operación</div>
                    <Badge variant="default" className="mb-2">Actual</Badge>
                    <div className="space-y-2">
                      <div>
                        <div className="text-lg font-bold text-primary">
                          {currentPoint.barrels.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">bbl/d</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary">
                          {currentPoint.pressure.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">PSI</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Presión Máxima</div>
                    <div className="text-lg font-bold text-destructive">
                      1500.0
                    </div>
                    <div className="text-xs text-muted-foreground">PSI</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Flujo Máximo</div>
                    <div className="text-lg font-bold text-destructive">
                      100.0
                    </div>
                    <div className="text-xs text-muted-foreground">bbl/d</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Eficiencia</div>
                    <div className="text-lg font-bold text-green-600">
                      {((currentPoint.barrels / 100) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">del máximo</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-red-500 border-dashed border-t-2 border-red-500"></div>
              <span className="text-muted-foreground">Curva IPR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-600"></div>
              <span className="text-muted-foreground">Punto de Operación</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-green-600"></div>
              <span className="text-muted-foreground">Punto Óptimo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IPRCurveChart;