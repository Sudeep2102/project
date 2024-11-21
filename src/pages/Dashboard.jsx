import { useState } from 'react';
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
import RiskAlert from '../components/RiskAlert';

function Dashboard() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [exportFormat, setExportFormat] = useState('csv');
  
  // Sample data
  const data = [
    { name: 'Jan', emissions: 4000, energy: 2400, waste: 2400 },
    { name: 'Feb', emissions: 3000, energy: 1398, waste: 2210 },
    { name: 'Mar', emissions: 2000, energy: 9800, waste: 2290 },
    { name: 'Apr', emissions: 2780, energy: 3908, waste: 2000 },
    { name: 'May', emissions: 1890, energy: 4800, waste: 2181 },
    { name: 'Jun', emissions: 2390, energy: 3800, waste: 2500 },
  ];

  const metrics = [
    {
      title: 'Carbon Emissions',
      value: '2,345',
      unit: 'tons',
      change: '-12%',
      trend: 'decrease',
    },
    {
      title: 'Energy Usage',
      value: '1,234',
      unit: 'kWh',
      change: '-8%',
      trend: 'decrease',
    },
    {
      title: 'Waste Generated',
      value: '987',
      unit: 'kg',
      change: '+2%',
      trend: 'increase',
    },
    {
      title: 'Water Usage',
      value: '45,678',
      unit: 'liters',
      change: '-5%',
      trend: 'decrease',
    },
  ];

  const risks = [
    {
      id: 1,
      severity: 'high',
      message: 'Supplier A has exceeded carbon emission limits by 25%. Immediate action required.',
    },
    {
      id: 2,
      severity: 'medium',
      message: 'Potential supply chain disruption: 3 suppliers in region X affected by new environmental regulations.',
    },
    {
      id: 3,
      severity: 'low',
      message: 'Minor delay in sustainability report submissions from 2 suppliers.',
    },
  ];

  const handleExport = () => {
    // In a real application, this would trigger an API call to generate
    // and download the file in the selected format
    console.log(`Exporting data in ${exportFormat} format`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <option value="csv">CSV</option>
            <option value="xlsx">Excel</option>
            <option value="pdf">PDF</option>
          </select>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Risk Alerts Section */}
      <div className="mt-8 space-y-4">
        {risks.map((risk) => (
          <RiskAlert key={risk.id} risk={risk} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {metric.title}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {metric.value}
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      {metric.unit}
                    </span>
                  </p>
                </div>
                <div
                  className={`${
                    metric.trend === 'decrease'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  } inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium`}
                >
                  {metric.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">
            Environmental Impact Overview
          </h3>
          <div className="mt-4" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="waste"
                  stroke="#F59E0B"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Supplier Risk Analysis */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Supply Chain Risk Analysis
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800">Supplier Compliance</h4>
                <p className="text-2xl font-bold text-blue-900 mt-2">85%</p>
                <p className="text-sm text-blue-700 mt-1">
                  15 out of 100 suppliers require attention
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">Environmental Score</h4>
                <p className="text-2xl font-bold text-green-900 mt-2">B+</p>
                <p className="text-sm text-green-700 mt-1">
                  Above industry average
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800">Risk Level</h4>
                <p className="text-2xl font-bold text-yellow-900 mt-2">Medium</p>
                <p className="text-sm text-yellow-700 mt-1">
                  3 high-priority issues identified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;