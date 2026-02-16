import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BudgetData } from '../types';

interface AnalyticsProps {
  budgetData: BudgetData;
  totals: {
    income: number;
    expenses: number;
    savings: number;
    balance: number;
  };
}

const Analytics: React.FC<AnalyticsProps> = ({ totals }) => {
  const chartData = [
    { name: 'Expenses', value: totals.expenses, color: '#F43F5E' },
    { name: 'Savings', value: totals.savings, color: '#0EA5E9' },
    { name: 'Remaining Balance', value: Math.max(0, totals.balance), color: '#6366F1' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Budget Allocation Breakdown</h3>
      <div 
        className="chart-shell" 
        style={{ 
          width: '100%', 
          height: '256px', 
          minWidth: 0, 
          minHeight: 0, 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <ResponsiveContainer 
          width="100%" 
          height="100%"
          initialDimension={{ width: 120, height: 80 }}
        >
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toFixed(2)}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;