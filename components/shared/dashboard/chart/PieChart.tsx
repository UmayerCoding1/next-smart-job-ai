'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const appliSuccessData = {
  TotalApplication: 40,
  interviewScheduled: 10,
  offerReceived: 5,
};

// Calculate rates
const successCount = appliSuccessData.offerReceived || 0; // success = offers received
const failCount = (appliSuccessData.TotalApplication || 0) - successCount; // failure = total - success
const total = successCount + failCount;

const successRate = total > 0 ? (successCount / total) * 100 : 0;
const failureRate = total > 0 ? (failCount / total) * 100 : 0;

// Data for pie chart
const pieData = [
  { name: 'Success Rate', value: successRate ?? 0 },
  { name: 'Failure Rate', value: failureRate ?? 0 }
];

console.log('pieData', pieData);

// Colors
const COLORS = ['#00C49F', '#FF8042'];

export default function SuccessFailurePieChart() {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <h2 className="text-lg font-bold mb-2">Application Success vs Failure Rate</h2>
      <ResponsiveContainer >
        <PieChart accessibilityLayer={false} >
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]}   />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
          
        </PieChart>
      </ResponsiveContainer>
       <div>
        <div className="flex items-center gap-2">
         <span className='block w-2 h-2 bg-green-500 rounded-full'></span>
         <p className="text-sm font-semibold">Success Rate: {successRate.toFixed(1)}%</p>
        </div>
        <div className="flex items-center gap-2">
         <span className='block w-2 h-2 bg-[#FF8042] rounded-full'></span>
          <p className="text-sm font-semibold">Failure Rate: {failureRate.toFixed(1)}%</p>
        </div>
        
       </div>
    </div>
  );
}
