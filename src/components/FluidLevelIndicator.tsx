import React from 'react';
import { Droplets } from 'lucide-react';

interface FluidLevelIndicatorProps {
  actualFillage: number;
  warningFillage: number;
  triggerFillage: number;
  enabled: boolean;
}

const FluidLevelIndicator: React.FC<FluidLevelIndicatorProps> = ({
  actualFillage,
  warningFillage,
  triggerFillage,
  enabled
}) => {
  const containerHeight = 300;
  
  // Calculate positions (inverted because high fillage = high level)
  const fluidHeight = (actualFillage / 100) * containerHeight;
  const warningPosition = containerHeight - (warningFillage / 100) * containerHeight;
  const triggerPosition = containerHeight - (triggerFillage / 100) * containerHeight;

  const getFluidColor = () => {
    if (actualFillage <= triggerFillage) return 'from-red-500 to-red-700';
    if (actualFillage <= warningFillage) return 'from-orange-500 to-orange-700';
    return 'from-green-500 to-green-700';
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-400">Fluid Level</h3>
        <Droplets className="w-5 h-5 text-blue-400" />
      </div>

      <div className="flex justify-center">
        <div className="relative">
          {/* Fluid container */}
          <div 
            className="w-16 bg-slate-700 border-2 border-slate-500 rounded-lg relative overflow-hidden"
            style={{ height: `${containerHeight}px` }}
          >
            {/* Fluid level */}
            <div 
              className={`absolute bottom-0 w-full bg-gradient-to-t ${getFluidColor()} transition-all duration-1000 ease-out ${
                enabled ? 'opacity-100' : 'opacity-60'
              }`}
              style={{ 
                height: `${fluidHeight}px`,
                boxShadow: enabled ? `0 0 10px rgba(34, 197, 94, 0.3)` : 'none'
              }}
            >
              {/* Animated surface */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-white opacity-20 animate-pulse"></div>
            </div>

            {/* Warning level line */}
            <div 
              className="absolute left-0 right-0 h-0.5 bg-orange-500 z-10"
              style={{ top: `${warningPosition}px` }}
            >
              <div className="absolute -right-1 top-0 w-2 h-0.5 bg-orange-500"></div>
            </div>

            {/* Trigger level line */}
            <div 
              className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
              style={{ top: `${triggerPosition}px` }}
            >
              <div className="absolute -right-1 top-0 w-2 h-0.5 bg-red-500"></div>
            </div>

            {/* Scale markers */}
            {[0, 25, 50, 75, 100].map(percentage => {
              const position = containerHeight - (percentage / 100) * containerHeight;
              return (
                <div key={percentage} className="absolute left-0 w-1 h-0.5 bg-gray-400" style={{ top: `${position}px` }}></div>
              );
            })}
          </div>

          {/* Scale labels */}
          <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-1">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Level indicators */}
          <div className="absolute -right-16 top-0 h-full flex flex-col text-xs">
            <div 
              className="absolute text-orange-400 font-semibold"
              style={{ top: `${warningPosition - 8}px` }}
            >
              W: {warningFillage}%
            </div>
            <div 
              className="absolute text-red-400 font-semibold"
              style={{ top: `${triggerPosition - 8}px` }}
            >
              T: {triggerFillage}%
            </div>
          </div>
        </div>
      </div>

      {/* Current level display */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400 mb-1">Current Level</div>
        <div className={`text-2xl font-bold transition-colors duration-300 ${
          actualFillage <= triggerFillage ? 'text-red-400' :
          actualFillage <= warningFillage ? 'text-orange-400' : 'text-green-400'
        }`}>
          {actualFillage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default FluidLevelIndicator;