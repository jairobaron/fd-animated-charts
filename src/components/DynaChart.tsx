import React, { useMemo } from 'react';

interface DynaChartProps {
  dynaPoints: Array<{ x: number; y: number }>;
  actualPoints: Array<{ x: number; y: number }>;
  enabled: boolean;
}

const DynaChart: React.FC<DynaChartProps> = ({ dynaPoints, actualPoints, enabled }) => {
  const chartDimensions = {
    width: 650,
    height: 600,
    marginTop: 40,
    marginBottom: 60,
    marginLeft: 80,
    marginRight: 40
  };

  const { chartWidth, chartHeight } = useMemo(() => ({
    chartWidth: chartDimensions.width - chartDimensions.marginLeft - chartDimensions.marginRight,
    chartHeight: chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom
  }), []);

  // Scale functions
  const scaleX = (x: number) => (x / 94.1) * chartWidth;
  const scaleY = (y: number) => chartHeight - ((y + 0.5) / 3.5) * chartHeight;

  const createPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return '';
    
    const startPoint = points[0];
    let path = `M ${scaleX(startPoint.x)} ${scaleY(startPoint.y)}`;
    
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      path += ` L ${scaleX(point.x)} ${scaleY(point.y)}`;
    }
    
    // Close the path to create the characteristic dynagram loop
    path += ' Z';
    
    return path;
  };

  const generateGridLines = () => {
    const lines = [];
    
    // Vertical grid lines
    for (let x = 0; x <= 94.1; x += 20) {
      lines.push(
        <line
          key={`v-${x}`}
          x1={scaleX(x)}
          y1={0}
          x2={scaleX(x)}
          y2={chartHeight}
          stroke="#374151"
          strokeWidth="0.5"
        />
      );
    }
    
    // Horizontal grid lines
    for (let y = 0; y <= 3; y += 0.5) {
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={scaleY(y)}
          x2={chartWidth}
          y2={scaleY(y)}
          stroke="#374151"
          strokeWidth="0.5"
        />
      );
    }
    
    return lines;
  };

  const xAxisLabels = [0, 20, 40, 60, 80, 94.1];
  const yAxisLabels = [-0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3];

  return (
    <div className="bg-slate-600 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-400">Downhole Dynagram</h2>
        
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-yellow-500"></div>
            <span className="text-gray-300">First Dynagram</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gray-500"></div>
            <span className="text-gray-300">Actual Dynagram</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <svg 
          width={chartDimensions.width} 
          height={chartDimensions.height}
          className="bg-slate-500 rounded-lg"
        >
          <g transform={`translate(${chartDimensions.marginLeft}, ${chartDimensions.marginTop})`}>
            {/* Grid */}
            {generateGridLines()}
            
            {/* Chart border */}
            <rect
              x={0}
              y={0}
              width={chartWidth}
              height={chartHeight}
              fill="none"
              stroke="#4b5563"
              strokeWidth="1"
            />

            {/* First Dynagram (ideal curve) */}
            {dynaPoints.length > 0 && (
              <path
                d={createPath(dynaPoints)}
                fill="none"
                stroke="#eab308"
                strokeWidth="2"
                className={`transition-opacity duration-500 ${enabled ? 'opacity-100' : 'opacity-70'}`}
                style={{
                  filter: enabled ? 'drop-shadow(0 0 4px rgba(234, 179, 8, 0.3))' : 'none'
                }}
              />
            )}

            {/* Actual Dynagram */}
            {actualPoints.length > 0 && (
              <path
                d={createPath(actualPoints)}
                fill="none"
                stroke="#1f2937"
                strokeWidth="2"
                className={`transition-opacity duration-500 ${enabled ? 'opacity-100' : 'opacity-50'}`}
                style={{
                  filter: enabled ? 'drop-shadow(0 0 2px rgba(31, 41, 55, 0.4))' : 'none'
                }}
              />
            )}

            {/* Vertical reference lines */}
            {[60, 80].map(x => (
              <line
                key={`ref-${x}`}
                x1={scaleX(x)}
                y1={0}
                x2={scaleX(x)}
                y2={chartHeight}
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                className={enabled ? 'opacity-80' : 'opacity-40'}
              />
            ))}
          </g>

          {/* X-axis labels */}
          {xAxisLabels.map(label => (
            <text
              key={`x-${label}`}
              x={chartDimensions.marginLeft + scaleX(label)}
              y={chartDimensions.height - 20}
              textAnchor="middle"
              className="fill-blue-400 text-sm font-semibold"
            >
              {label}
            </text>
          ))}

          {/* Y-axis labels */}
          {yAxisLabels.map(label => (
            <text
              key={`y-${label}`}
              x={30}
              y={chartDimensions.marginTop + scaleY(label) + 4}
              textAnchor="middle"
              className="fill-blue-300 text-sm font-semibold"
            >
              {label.toFixed(1)}
            </text>
          ))}

          {/* Axis labels */}
          <text
            x={chartDimensions.marginLeft + chartWidth / 2}
            y={chartDimensions.height - 5}
            textAnchor="middle"
            className="fill-gray-300 text-sm font-medium"
          >
            Plunger Pos. (in)
          </text>
          
          <text
            x={15}
            y={chartDimensions.marginTop + chartHeight / 2}
            textAnchor="middle"
            className="fill-gray-300 text-sm font-medium"
            transform={`rotate(-90, 15, ${chartDimensions.marginTop + chartHeight / 2})`}
          >
            Load (K-Lbs)
          </text>
        </svg>
      </div>
    </div>
  );
};

export default DynaChart;