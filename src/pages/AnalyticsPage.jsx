import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/analytics";
import Navbar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7days'); // '24hours', '7days', '30days'
  const { data = [], isLoading, isError, error } = useQuery({ 
    queryKey: ['events', timeRange], 
    queryFn: () => fetchEvents(timeRange)
  });

  // Process data for visualization
  const processChartData = () => {
    const eventCounts = {};
    
    data.forEach(event => {
      const dateKey = new Date(event.timestamp).toLocaleDateString();
      eventCounts[dateKey] = (eventCounts[dateKey] || 0) + 1;
    });

    return Object.entries(eventCounts).map(([date, count]) => ({
      date,
      count
    }));
  };

  const chartData = processChartData();

  if (isLoading) return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );

  if (isError) return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>Error loading analytics data: {error.message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeRange('24hours')}
              className={`px-3 py-1 rounded ${timeRange === '24hours' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              24 Hours
            </button>
            <button 
              onClick={() => setTimeRange('7days')}
              className={`px-3 py-1 rounded ${timeRange === '7days' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              7 Days
            </button>
            <button 
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1 rounded ${timeRange === '30days' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              30 Days
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Event Frequency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Recent Events</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 10).map((event) => (
                  <tr key={event._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.eventType || event.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.userId || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {JSON.stringify(event.metadata || {})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length > 10 && (
            <div className="mt-4 text-sm text-gray-500">
              Showing 10 of {data.length} events
            </div>
          )}
        </div>
      </div>
    </div>
  );
}