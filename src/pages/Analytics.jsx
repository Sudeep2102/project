import { useState, useEffect } from 'react';
import axios from 'axios';
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
import environmentalData from './data.json';

function Analytics() {
  const [timeframe, setTimeframe] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions from OpenAI API
  useEffect(() => {
    const fetchSuggestions = async () => {
      const summary = calculateSummary();
      const prompt = `
        Based on the following environmental metrics, suggest practical ways to reduce emissions, energy consumption, and waste. 
        Provide up to 3 recommendations with a title, description, and impact (low, medium, high):
        - Average Emissions: ${summary.emissions} kg CO2e
        - Average Energy Consumption: ${summary.energy} kWh
        - Average Waste Consumption: ${summary.waste} kg.
      `;
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: ``, // Replace with your OpenAI API key
              'Content-Type': 'application/json',
            },
          }
        );
        // Parse suggestions from the response
        const output = response.data.choices[0].text.trim();
        const parsedSuggestions = output
          .split('\n')
          .filter((line) => line.trim() !== '')
          .map((line) => {
            const [title, description] = line.split(':');
            return {
              title: title.trim(),
              description: description.trim(),
              impact: 'medium', // Assume medium for this example
            };
          });
        setSuggestions(parsedSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        // Use fallback suggestions in case of an error
        setSuggestions([
          {
            title: 'Reduce Manufacturing Emissions',
            description: 'Upgrade equipment efficiency to lower emissions.',
            impact: 'low',
          },
          {
            title: 'Optimize Energy Usage',
            description: 'Implementing smart lighting systems to save energy.',
            impact: 'medium',
          },
          {
            title: 'Improve Waste Management',
            description: 'Review waste segregation to improve recycling rates.',
            impact: 'high',
          },
        ]);
      }
    };

    fetchSuggestions();
  }, []);

  // Process data for yearly averages
  const yearlyAverages = environmentalData.reduce((acc, item) => {
    const year = item['Year of reporting'];
    if (!acc[year]) {
      acc[year] = {
        year,
        emissions: 0,
        energy: 0,
        waste: 0,
        count: 0,
      };
    }
    acc[year].emissions += item["Product's carbon footprint (PCF, kg CO2e)"];
    acc[year].energy += item["Energy Consumption (kWh)"];
    acc[year].waste += item["Waste Consumption (kg)"];
    acc[year].count += 1;
    return acc;
  }, {});

  // Convert to array and calculate averages
  const yearlyData = Object.values(yearlyAverages)
    .map((item) => ({
      name: item.year.toString(),
      emissions: Math.round(item.emissions / item.count),
      energy: Math.round(item.energy / item.count),
      waste: Math.round(item.waste / item.count),
    }))
    .sort((a, b) => a.name - b.name);

  // Calculate emissions by company type
  const companyEmissions = environmentalData.reduce((acc, item) => {
    const company = item.Company;
    acc[company] = (acc[company] || 0) + item["Product's carbon footprint (PCF, kg CO2e)"];
    return acc;
  }, {});

  // Convert to pie chart data format and get top 5 companies
  const pieData = Object.entries(companyEmissions)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Calculate summary statistics
  const calculateSummary = () => {
    const average = (key) => {
      const sum = environmentalData.reduce((acc, item) => {
        switch (key) {
          case 'emissions':
            return acc + item["Product's carbon footprint (PCF, kg CO2e)"];
          case 'energy':
            return acc + item["Energy Consumption (kWh)"];
          case 'waste':
            return acc + item["Waste Consumption (kg)"];
          default:
            return acc;
        }
      }, 0);
      return Math.round(sum / environmentalData.length);
    };

    return {
      emissions: average('emissions'),
      energy: average('energy'),
      waste: average('waste'),
    };
  };

  const summary = calculateSummary();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Environmental Analytics Dashboard</h2>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <option value="all">All Metrics</option>
          <option value="emissions">Emissions</option>
          <option value="energy">Energy</option>
          <option value="waste">Waste</option>
        </select>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Yearly Environmental Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {filterType === 'all' || filterType === 'emissions' ? (
                <Bar dataKey="emissions" fill="#3B82F6" name="Carbon Footprint (kg CO2e)" />
              ) : null}
              {filterType === 'all' || filterType === 'energy' ? (
                <Bar dataKey="energy" fill="#10B981" name="Energy (kWh)" />
              ) : null}
              {filterType === 'all' || filterType === 'waste' ? (
                <Bar dataKey="waste" fill="#F59E0B" name="Waste (kg)" />
              ) : null}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Companies by Carbon Footprint</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value.toFixed(1)} kg CO2e)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-blue-800 font-medium">Average Carbon Footprint</h4>
              <p className="text-2xl font-bold text-blue-900">{summary.emissions.toLocaleString()} kg CO2e</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-green-800 font-medium">Average Energy Consumption</h4>
              <p className="text-2xl font-bold text-green-900">{summary.energy.toLocaleString()} kWh</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-yellow-800 font-medium">Average Waste Production</h4>
              <p className="text-2xl font-bold text-yellow-900">{summary.waste.toLocaleString()} kg</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Suggested Improvements</h3>
          <ul className="list-disc pl-5">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="mb-4">
                <h4 className="font-bold text-lg">{suggestion.title}</h4>
                <p className="text-sm text-gray-700">{suggestion.description}</p>
                <span className="text-xs font-medium text-gray-500">
                  Impact: {suggestion.impact.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
