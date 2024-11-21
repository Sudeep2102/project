import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function Analytics() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [filterType, setFilterType] = useState('all');

  // Monthly data
  const monthlyData = [
    { name: 'Jan', emissions: 4000, energy: 2400, waste: 2400 },
    { name: 'Feb', emissions: 3000, energy: 1398, waste: 2210 },
    { name: 'Mar', emissions: 2000, energy: 9800, waste: 2290 },
    { name: 'Apr', emissions: 2780, energy: 3908, waste: 2000 },
    { name: 'May', emissions: 1890, energy: 4800, waste: 2181 },
    { name: 'Jun', emissions: 2390, energy: 3800, waste: 2500 },
  ];

  // Yearly data
  const yearlyData = [
    { name: '2020', emissions: 48000, energy: 29000, waste: 29000 },
    { name: '2021', emissions: 46000, energy: 32000, waste: 30000 },
    { name: '2022', emissions: 50000, energy: 31000, waste: 27000 },
    { name: '2023', emissions: 49000, energy: 30000, waste: 28000 },
  ];

  const data = timeframe === 'monthly' ? monthlyData : yearlyData;

  const pieData = [
    { name: 'Manufacturing', value: 400 },
    { name: 'Transportation', value: 300 },
    { name: 'Office', value: 200 },
    { name: 'Other', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const governmentCriteria = {
    emissions: 3000, // Emissions should be below this value
    energy: 2500, // Energy usage should be below this value
    waste: 2000, // Waste should be below this value
  };

  // Calculate summary
  const calculateSummary = () => {
    const average = (key) =>
      data.reduce((sum, entry) => sum + entry[key], 0) / data.length;

    const emissionsAvg = average('emissions');
    const energyAvg = average('energy');
    const wasteAvg = average('waste');

    return {
      emissions: {
        value: emissionsAvg,
        meetsCriteria: emissionsAvg <= governmentCriteria.emissions,
      },
      energy: {
        value: energyAvg,
        meetsCriteria: energyAvg <= governmentCriteria.energy,
      },
      waste: {
        value: wasteAvg,
        meetsCriteria: wasteAvg <= governmentCriteria.waste,
      },
    };
  };

  const summary = calculateSummary();

  const recommendations = [
    {
      title: 'Reduce Manufacturing Emissions',
      description:
        'Current emissions are 15% above industry standard. Consider upgrading equipment efficiency.',
      impact: summary.emissions.meetsCriteria ? 'low' : 'high',
    },
    {
      title: 'Optimize Energy Usage',
      description:
        'Implementing smart lighting systems could reduce energy consumption by 25%.',
      impact: summary.energy.meetsCriteria ? 'low' : 'medium',
    },
    {
      title: 'Waste Management',
      description:
        'Current recycling rate is 45%. Industry leaders achieve 75%. Review waste segregation processes.',
      impact: summary.waste.meetsCriteria ? 'low' : 'medium',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Analytics
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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <option value="all">All Metrics</option>
            <option value="emissions">Emissions</option>
            <option value="energy">Energy</option>
            <option value="waste">Waste</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Environmental Metrics Trend
          </h3>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {filterType === 'all' || filterType === 'emissions' ? (
                  <Bar dataKey="emissions" fill="#3B82F6" />
                ) : null}
                {filterType === 'all' || filterType === 'energy' ? (
                  <Bar dataKey="energy" fill="#10B981" />
                ) : null}
                {filterType === 'all' || filterType === 'waste' ? (
                  <Bar dataKey="waste" fill="#F59E0B" />
                ) : null}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Emissions by Source
          </h3>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
          <div className="space-y-2">
            <p>
              <strong>Emissions:</strong>{' '}
              {summary.emissions.value.toFixed(2)}{' '}
              {summary.emissions.meetsCriteria
                ? '(Meets criteria)'
                : '(Above criteria)'}
            </p>
            <p>
              <strong>Energy:</strong> {summary.energy.value.toFixed(2)}{' '}
              {summary.energy.meetsCriteria
                ? '(Meets criteria)'
                : '(Above criteria)'}
            </p>
            <p>
              <strong>Waste:</strong> {summary.waste.value.toFixed(2)}{' '}
              {summary.waste.meetsCriteria
                ? '(Meets criteria)'
                : '(Above criteria)'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recommendations
          </h3>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.title}
                className="border-l-4 border-blue-500 bg-blue-50 p-4"
              >
                <div className="flex justify-between">
                  <h4 className="text-base font-medium text-blue-800">
                    {rec.title}
                  </h4>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rec.impact === 'high'
                        ? 'bg-red-100 text-red-800'
                        : rec.impact === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {rec.impact} impact
                  </span>
                </div>
                <p className="mt-1 text-sm text-blue-700">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
