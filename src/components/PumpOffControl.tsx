import React, { useState, useEffect } from 'react';
import { Power, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import DynaChart from '@/components/DynaChart';
import FluidLevelIndicator from '@/components/FluidLevelIndicator';
import MetricsPanel from '@/components/MetricsPanel';

interface PumpData {
  spm: number;
  actualFillage: number;
  warningFillage: number;
  triggerFillage: number;
  initialFillage: number;
  enabled: boolean;
  dynaPoints: Array<{ x: number; y: number }>;
  actualPoints: Array<{ x: number; y: number }>;
}

const PumpOffControl: React.FC = () => {
  const [pumpData, setPumpData] = useState<PumpData>({
    spm: 4.15,
    actualFillage: 63.9,
    warningFillage: 30.0,
    triggerFillage: 15.0,
    initialFillage: 63.9,
    enabled: false,
    dynaPoints: [],
    actualPoints: []
  });

  const generateDynaPoints = () => {
    const points: Array<{ x: number; y: number }> = [];
    const actualPoints: Array<{ x: number; y: number }> = [];
    
    // Generate realistic dynagram cycle - closed loop
    const totalPoints = 200;
    
    for (let i = 0; i < totalPoints; i++) {
      const progress = i / totalPoints;
      
      let x, y1, y2;
      
      if (progress <= 0.5) {
        // Upstroke: from bottom-left to top-right
        const upstrokeProgress = progress * 2;
        x = 5 + (75 * upstrokeProgress); // 5 to 80 inches
        
        if (upstrokeProgress <= 0.15) {
          // Rapid initial load increase
          y1 = -0.1 + (2.8 * Math.pow(upstrokeProgress / 0.15, 0.4));
        } else {
          // Plateau with slight variations
          const plateauProgress = (upstrokeProgress - 0.15) / 0.85;
          y1 = 2.7 + 0.1 * Math.sin(plateauProgress * 8) + 0.05 * Math.sin(plateauProgress * 20);
        }
      } else {
        // Downstroke: from top-right back to bottom-left
        const downstrokeProgress = (progress - 0.5) * 2;
        x = 80 - (75 * downstrokeProgress); // 80 back to 5 inches
        
        if (downstrokeProgress <= 0.7) {
          // Gradual load decrease
          const decreaseProgress = downstrokeProgress / 0.7;
          y1 = 2.7 - (2.4 * Math.pow(decreaseProgress, 1.5));
        } else {
          // Final drop to complete cycle
          const finalProgress = (downstrokeProgress - 0.7) / 0.3;
          y1 = 0.3 - (0.4 * finalProgress) + 0.05 * Math.sin(finalProgress * 15);
        }
      }
      
      // Actual dynagram with realistic noise and variations
      if (progress <= 0.5) {
        // Upstroke variations
        y2 = y1 + (Math.random() - 0.5) * 0.1 + 0.03 * Math.sin(progress * 40);
      } else {
        // Downstroke variations
        y2 = y1 + (Math.random() - 0.5) * 0.08 + 0.02 * Math.sin(progress * 60);
      }
      
      // Ensure values stay within bounds
      y1 = Math.max(-0.3, Math.min(3, y1));
      y2 = Math.max(-0.3, Math.min(3, y2));
      
      points.push({ x, y: y1 });
      actualPoints.push({ x, y: y2 });
    }
    
    return { dynaPoints: points, actualPoints };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const { dynaPoints, actualPoints } = generateDynaPoints();
      setPumpData(prev => ({
        ...prev,
        spm: 3.8 + Math.random() * 0.7,
        actualFillage: Math.max(10, Math.min(95, prev.actualFillage + (Math.random() - 0.5) * 2)),
        dynaPoints,
        actualPoints
      }));
    }, 2000);

    // Initial data
    const { dynaPoints, actualPoints } = generateDynaPoints();
    setPumpData(prev => ({ ...prev, dynaPoints, actualPoints }));

    return () => clearInterval(interval);
  }, []);

  const toggleEnabled = () => {
    setPumpData(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const getStatus = () => {
    if (!pumpData.enabled) return { text: 'DISABLED', color: 'text-gray-400', icon: XCircle };
    if (pumpData.actualFillage <= pumpData.triggerFillage) return { text: 'CRITICAL', color: 'text-red-400', icon: AlertTriangle };
    if (pumpData.actualFillage <= pumpData.warningFillage) return { text: 'WARNING', color: 'text-orange-400', icon: AlertTriangle };
    return { text: 'OK', color: 'text-green-400', icon: CheckCircle };
  };

  const status = getStatus();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-blue-400">
          Pump Off Control System
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <status.icon className={`w-5 h-5 ${status.color}`} />
            <span className={`font-semibold ${status.color}`}>{status.text}</span>
          </div>
          
          <button
            onClick={toggleEnabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              pumpData.enabled 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-gray-200'
            }`}
          >
            <Power className="w-4 h-4" />
            {pumpData.enabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-6 h-full">
        {/* Dynagram Chart */}
        <div className="xl:col-span-4">
          <DynaChart
            dynaPoints={pumpData.dynaPoints}
            actualPoints={pumpData.actualPoints}
            enabled={pumpData.enabled}
          />
        </div>

        {/* Right Panel */}
        <div className="xl:col-span-1">
          {/* Metrics Panel */}
          <MetricsPanel
            spm={pumpData.spm}
            actualFillage={pumpData.actualFillage}
            warningFillage={pumpData.warningFillage}
            triggerFillage={pumpData.triggerFillage}
            initialFillage={pumpData.initialFillage}
          />
        </div>
          {/* Fluid Level Indicator */}
        <div className="xl:col-span-1">
          <FluidLevelIndicator
            actualFillage={pumpData.actualFillage}
            warningFillage={pumpData.warningFillage}
            triggerFillage={pumpData.triggerFillage}
            enabled={pumpData.enabled}
          />
        </div>
      </div>
    </div>
  );
};

export default PumpOffControl;