import React from 'react';
import { TrendingUp, Gauge, AlertCircle } from 'lucide-react';

interface MetricsPanelProps {
  spm: number;
  actualFillage: number;
  warningFillage: number;
  triggerFillage: number;
  initialFillage: number;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({
  spm,
  actualFillage,
  warningFillage,
  triggerFillage,
  initialFillage
}) => {
  const getFillageBadge = (value: number, threshold: number, label: string, color: string) => (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <AlertCircle className="w-4 h-4 text-gray-500" />
      </div>
      <div className={`text-2xl font-bold ${color} transition-all duration-300`}>
        {threshold.toFixed(1)}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-400 border-b border-slate-600 pb-2">
        System Metrics
      </h3>

      {/* SPM */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm font-medium">Actual SPM</span>
          <Gauge className="w-4 h-4 text-gray-500" />
        </div>
        <div className="text-3xl font-bold text-blue-400 transition-all duration-300">
          {spm.toFixed(2)}
        </div>
      </div>

      {/* Actual Fillage */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm font-medium">Actual Fillage %</span>
          <TrendingUp className="w-4 h-4 text-gray-500" />
        </div>
        <div className={`text-3xl font-bold transition-all duration-300 ${
          actualFillage <= triggerFillage ? 'text-red-400' :
          actualFillage <= warningFillage ? 'text-orange-400' : 'text-green-400'
        }`}>
          {actualFillage.toFixed(1)}
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              actualFillage <= triggerFillage ? 'bg-red-500' :
              actualFillage <= warningFillage ? 'bg-orange-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(100, actualFillage)}%` }}
          ></div>
        </div>
      </div>

      {/* Thresholds */}
      <div className="grid grid-cols-1 gap-3">
        {getFillageBadge(actualFillage, warningFillage, 'Warning Fillage %', 'text-orange-400')}
        {getFillageBadge(actualFillage, triggerFillage, 'Trigger Fillage %', 'text-red-400')}
      </div>

      {/* Initial Fillage */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm font-medium">Initial Fillage %</span>
        </div>
        <div className="text-xl font-bold text-gray-300">
          {initialFillage.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;