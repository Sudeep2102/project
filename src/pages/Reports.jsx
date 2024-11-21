import React, { useState } from 'react';
import { saveAs } from 'file-saver'; // For downloading files

function Reports() {
  const [reportData] = useState([
    {
      id: 1,
      reportName: 'Monthly Environmental Impact',
      type: 'Environmental',
      date: '2024-03-01',
      status: 'completed',
    },
    {
      id: 2,
      reportName: 'Q1 2024 Compliance Report',
      type: 'Compliance',
      date: '2024-03-15',
      status: 'pending',
    },
    {
      id: 3,
      reportName: 'Energy Efficiency Analysis',
      type: 'Energy',
      date: '2024-02-28',
      status: 'completed',
    },
  ]);

  const downloadReport = (reportId) => {
    const url = `/api/reports/download/${reportId}`; // Modify this based on your logic
    saveAs(url, `report_${reportId}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div>
        <div className="flex justify-between mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
            Generate Report
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md">Filter</button>
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md">Date Range</button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Available Reports</h2>
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Report Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.reportName}</td>
                  <td className="border px-4 py-2">{item.type}</td>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        item.status === 'completed'
                          ? 'bg-green-200 text-green-800'
                          : item.status === 'pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => downloadReport(item.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5v14m7-7H5"
                        />
                      </svg>
                    </button>
                    <button className="text-blue-500 hover:text-blue-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7-7 7M5 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
