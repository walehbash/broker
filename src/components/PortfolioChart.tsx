'use client';

import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface PortfolioData {
  total: number;
  change24h: number;
  breakdown: Array<{
    name: string;
    value: number;
    amount: number;
  }>;
}

interface PortfolioChartProps {
  data: PortfolioData;
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  const chartRef = useRef(null);

  // Generate mock time series data for portfolio performance
  const generateTimeSeriesData = () => {
    const now = new Date();
    const labels = [];
    const values = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Generate realistic portfolio value with some volatility
      const baseValue = data.total || 1000;
      const volatility = (Math.random() - 0.5) * 0.1; // ±5% volatility
      const trendFactor = 1 + (data.change24h / 100) * (i / 30);
      values.push(baseValue * trendFactor * (1 + volatility));
    }
    
    return { labels, values };
  };

  const timeSeriesData = generateTimeSeriesData();

  const lineChartData = {
    labels: timeSeriesData.labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: timeSeriesData.values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverBorderColor: 'rgb(255, 255, 255)',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'rgb(248, 250, 252)',
        bodyColor: 'rgb(248, 250, 252)',
        borderColor: 'rgba(51, 65, 85, 0.8)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          maxTicksLimit: 6,
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(51, 65, 85, 0.3)',
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const doughnutData = {
    labels: data.breakdown.map(item => item.name),
    datasets: [
      {
        data: data.breakdown.map(item => item.value),
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',  // Bitcoin - Amber
          'rgba(59, 130, 246, 0.8)',  // Ethereum - Blue
          'rgba(16, 185, 129, 0.8)',  // Cardano - Green
          'rgba(139, 92, 246, 0.8)',  // Solana - Purple
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(248, 250, 252)',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'rgb(248, 250, 252)',
        bodyColor: 'rgb(248, 250, 252)',
        borderColor: 'rgba(51, 65, 85, 0.8)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const amount = data.breakdown[context.dataIndex]?.amount || 0;
            return `${label}: ${value}% ($${amount.toLocaleString()})`;
          }
        }
      },
    },
    cutout: '60%',
  };

  return (
    <div className="space-y-8">
      {/* Portfolio Performance Line Chart */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">30-Day Performance</h3>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                ${data.total.toLocaleString()}
              </div>
              <div className={`text-sm ${data.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {data.change24h >= 0 ? '+' : ''}{data.change24h.toFixed(2)}% (24h)
              </div>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Portfolio Allocation Doughnut Chart */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Portfolio Allocation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="chart-container">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          <div className="space-y-3">
            {data.breakdown.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ 
                      backgroundColor: doughnutData.datasets[0].backgroundColor[index]
                    }}
                  ></div>
                  <span className="text-white font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">
                    ${item.amount.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {item.value}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}