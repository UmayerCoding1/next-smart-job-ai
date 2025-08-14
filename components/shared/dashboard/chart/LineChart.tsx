'use client';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ApplicationData {
  month?: string;
  year?: string;
  pending: number;
  approved: number;
  reject: number;
  viewApply: number;
  downloadResume: number;
}

const monthlyData: ApplicationData[] = [
  { month: 'Jan', pending: 5, approved: 12, reject: 3, viewApply: 1, downloadResume: 2 },
  { month: 'Feb', pending: 8, approved: 20, reject: 13, viewApply: 3, downloadResume: 10 },
  { month: 'Mar', pending: 4, approved: 15, reject: 5, viewApply: 2, downloadResume: 6 },
  // add more months...
];

const yearlyData: ApplicationData[] = [
  { year: '2022', pending: 50, approved: 120, reject: 30, viewApply: 15, downloadResume: 20 },
  { year: '2023', pending: 60, approved: 150, reject: 40, viewApply: 20, downloadResume: 30 },
  { year: '2024', pending: 70, approved: 180, reject: 50, viewApply: 25, downloadResume: 35 },
];

const ApplicationLineChart = () => {
  const [filter, setFilter] = useState<'monthly' | 'yearly'>('monthly');

  const data = filter === 'monthly' ? monthlyData : yearlyData;

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Applications Overview</h2>
        <div>
          <button
            onClick={() => setFilter('monthly')}
            className={`px-3 py-1 rounded-l-md ${
              filter === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setFilter('yearly')}
            className={`px-3 py-1 rounded-r-md ${
              filter === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={filter === 'monthly' ? 'month' : 'year'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pending" stroke="#2563eb" strokeWidth={2} />
          <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="reject" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="viewApply" stroke="#f59e0b" strokeWidth={2} />
          <Line type="monotone" dataKey="downloadResume" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationLineChart;
