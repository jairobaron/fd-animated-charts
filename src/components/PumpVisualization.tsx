import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PumpData {
  nivel: number;
  submergence: number;
  disPressure: number;
  pip: number;
  pwf: number;
  isActive: boolean;
}

const PumpVisualization = () => {
  const [pumpData, setPumpData] = useState<PumpData>({
    nivel: 4785.5,
    submergence: 146.0,
    disPressure: 1751.0,
    pip: 319.0,
    pwf: 991.6,
    isActive: true
  });

  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
      
      // Simulate slight variations in data
      setPumpData(prev => ({
        ...prev,
        nivel: 4785.5 + (Math.random() - 0.5) * 2,
        submergence: 146.0 + (Math.random() - 0.5) * 1,
        disPressure: 1751.0 + (Math.random() - 0.5) * 10,
        pip: 319.0 + (Math.random() - 0.5) * 5,
        pwf: 991.6 + (Math.random() - 0.5) * 8,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fluidHeight = 60 + (pumpData.submergence / 200) * 30;
  const pumpPosition = animationPhase < 2 ? 45 : 55;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Pump Visualization */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${pumpData.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                Bomba Mecánica SRP
              </CardTitle>
              <CardDescription>
                Sistema de Bombeo por Varillas de Succión
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full p-0 relative">
              <svg className="w-full h-full" viewBox="0 0 400 500">
                {/* Ground/Formation */}
                <defs>
                  <pattern id="ground" patternUnits="userSpaceOnUse" width="4" height="4">
                    <rect width="4" height="4" fill="#8B4513"/>
                    <circle cx="2" cy="2" r="0.5" fill="#654321"/>
                  </pattern>
                  <linearGradient id="fluidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF8C00"/>
                    <stop offset="100%" stopColor="#FF6B35"/>
                  </linearGradient>
                </defs>
                
                {/* Wellbore */}
                <rect x="180" y="100" width="40" height="350" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="2"/>
                
                {/* Formation/Ground */}
                <rect x="0" y="100" width="180" height="350" fill="url(#ground)"/>
                <rect x="220" y="100" width="180" height="350" fill="url(#ground)"/>
                
                {/* Fluid Level */}
                <rect 
                  x="182" 
                  y={450 - fluidHeight} 
                  width="36" 
                  height={fluidHeight} 
                  fill="url(#fluidGradient)"
                  className="transition-all duration-1000"
                />
                
                {/* Pump Assembly */}
                <g transform={`translate(200, ${pumpPosition})`} className="transition-all duration-500">
                  {/* Pump Body */}
                  <rect x="-15" y="200" width="30" height="80" fill="#4A5568" stroke="#2D3748" strokeWidth="2" rx="5"/>
                  
                  {/* Plunger */}
                  <rect x="-8" y="210" width="16" height="60" fill="#E2E8F0" stroke="#CBD5E0" strokeWidth="1" rx="2"/>
                  
                  {/* Sucker Rod */}
                  <rect x="-2" y="0" width="4" height="200" fill="#718096" stroke="#4A5568" strokeWidth="1"/>
                  
                  {/* Pump Intake */}
                  <circle cx="0" cy="285" r="8" fill="#2B6CB0" stroke="#1E4A8C" strokeWidth="2"/>
                  
                  {/* Fluid flow indicators */}
                  {pumpData.isActive && (
                    <>
                      <circle cx="-10" cy="290" r="2" fill="#FF8C00" className="animate-bounce" style={{animationDelay: '0ms'}}/>
                      <circle cx="0" cy="295" r="2" fill="#FF8C00" className="animate-bounce" style={{animationDelay: '200ms'}}/>
                      <circle cx="10" cy="290" r="2" fill="#FF8C00" className="animate-bounce" style={{animationDelay: '400ms'}}/>
                    </>
                  )}
                </g>
                
                {/* Surface Equipment */}
                <rect x="150" y="80" width="100" height="20" fill="#4A5568" stroke="#2D3748" strokeWidth="2" rx="3"/>
                <rect x="195" y="60" width="10" height="40" fill="#718096"/>
                
                {/* Walking Beam (simplified) */}
                <line x1="120" y1="50" x2="280" y2="50" stroke="#4A5568" strokeWidth="8"/>
                <circle cx="200" cy="50" r="6" fill="#2D3748"/>
                
                {/* Depth markers */}
                <text x="320" y="120" className="text-xs fill-muted-foreground">0 ft</text>
                <text x="320" y="200" className="text-xs fill-muted-foreground">1000 ft</text>
                <text x="320" y="280" className="text-xs fill-muted-foreground">2000 ft</text>
                <text x="320" y="360" className="text-xs fill-muted-foreground">3000 ft</text>
                <text x="320" y="440" className="text-xs fill-muted-foreground">4000+ ft</text>
              </svg>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nivel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {pumpData.nivel.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Ft</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Submergence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {pumpData.submergence.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Ft</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dis. Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {pumpData.disPressure.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">PSI</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PIP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {pumpData.pip.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">PSI</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PWF</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {pumpData.pwf.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">PSI</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Estado</span>
                <Badge variant={pumpData.isActive ? "default" : "destructive"}>
                  {pumpData.isActive ? "Activa" : "Inactiva"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PumpVisualization;