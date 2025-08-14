'use client';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

interface ApplicationData {
  month: string;
  year: number;
  pending: number;
  approved: number;
  reject: number;
  viewApply: number;
  downloadResume: number;
}

const applications: ApplicationData[] = [
  { month: "Jan", year: 2025, pending: 5, approved: 12, reject: 3, viewApply: 1, downloadResume: 2 },
  { month: "Feb", year: 2025, pending: 8, approved: 20, reject: 13, viewApply: 3, downloadResume: 10 },
  { month: "Mar", year: 2025, pending: 4, approved: 15, reject: 5, viewApply: 2, downloadResume: 6 },
];

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const MultiBarChartWithLabels = () => {
  const [filter, setFilter] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const currentYear = new Date().getFullYear();

  const filteredData =
    filter === 'monthly'
      ? applications.filter(item => item.month === selectedMonth && item.year === currentYear)
      : applications.filter(item => item.year === currentYear);

  const metrics = ["pending","approved","reject","viewApply","downloadResume"];

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Applications Overview</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setFilter('monthly')}
            className={`px-3 py-1 rounded-md ${filter==='monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setFilter('yearly')}
            className={`px-3 py-1 rounded-md ${filter==='yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Yearly
          </button>
          {filter === 'monthly' && (
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="ml-2 px-2 py-1 border rounded-md"
            >
              {months.map(month => <option key={month} value={month}>{month}</option>)}
            </select>
          )}
        </div>
      </div>

    
  <ResponsiveContainer width="100%" height="85%">
        <BarChart data={filteredData} barGap={13}  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={filter==='monthly' ? 'month' : 'year'} />
          <YAxis />
          
          {metrics.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              barSize={15}
              fill="#1e40af"
              radius={[10,10,0,0]}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}-${key}`} fill="#1e40af" />
              ))}
              <LabelList
                dataKey={key}
                position="top"
                formatter={(value) => `${key}: ${value}`}
                style={{ fontSize: 9, fill: "#000", fontWeight: 500 }}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
};

export default MultiBarChartWithLabels;
