import React, { useEffect, useState } from 'react';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const AnalyticsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [filters, setFilters] = useState({
    language: '',
    startDate: '',
    endDate: '',
    searchQuery: '',
  });

  const [availableLanguages, setAvailableLanguages] = useState([]);

  // Fetch all logs
  const fetchLogs = () => {
    fetch('http://localhost:5000/api/logs')
      .then((response) => response.json())
      .then((data) => {
        setLogs(data);

        // Extract unique languages dynamic
        const languages = [...new Set(data.map((log) => log.language))];
        setAvailableLanguages(languages);
      });
  };

  // Fetch analytics data
  const fetchAnalytics = () => {
    fetch('http://localhost:5000/api/logs/analytics')
      .then((response) => response.json())
      .then((data) => setAnalytics(data));
  };

  // Fetch logs with filters
  const fetchFilteredLogs = () => {
    const queryParams = new URLSearchParams({
      language: filters.language,
      startDate: filters.startDate,
      endDate: filters.endDate,
      searchQuery: filters.searchQuery,
    }).toString();

    fetch(`http://localhost:5000/api/logs/filter?${queryParams}`)
      .then((response) => response.json())
      .then((data) => setLogs(data));
  };

  // Handle input changes for filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    fetchFilteredLogs();
  };

  useEffect(() => {
    // Initial fetch
    fetchLogs();
    fetchAnalytics();

    // Periodic updates
    const interval = setInterval(() => {
      fetchLogs();
      fetchAnalytics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Prepare data for the heatmap
  const heatmapData = logs.reduce((acc, log) => {
    const date = new Date(log.timestamp).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1; // Count activity per day
    return acc;
  }, {});

  const formattedHeatmapData = Object.entries(heatmapData).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics</h2>

      {/* Filter Section */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">Filters & Search</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Language Filter */}
          <div>
            <label htmlFor="language" className="block font-medium mb-1">
              Language:
            </label>
            <select
              id="language"
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded"
            >
              <option value="">All</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label htmlFor="startDate" className="block font-medium mb-1">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-medium mb-1">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Search Query */}
          <div className="col-span-2">
            <label htmlFor="searchQuery" className="block font-medium mb-1">
              Search (by API Response or Timestamp):
            </label>
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
              placeholder="Search logs..."
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Apply Filters
        </button>
      </div>

      {/* Heatmap Section */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">User Activity Heatmap</h3>
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // Past year
          endDate={new Date()}
          values={formattedHeatmapData}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return `color-scale-${Math.min(value.count, 4)}`; // Map intensity to 4 levels
          }}
          tooltipDataAttrs={(value) => ({
            'data-tip': value ? `${value.date}: ${value.count} actions` : 'No data',
          })}
        />
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <BarChart data={logs} />
      </div>
      <div>
        <LineChart data={logs} />
      </div>

      {/* Analytics Section */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Analytics Summary:</h3>
        {analytics && (
          <div>
            <p>Total Logs: {analytics.totalLogs}</p>
            <p>Average Response Time: {analytics.avgResponseTime.toFixed(2)} ms</p>
            <h4 className="font-semibold mt-4">User Action Frequencies:</h4>
            <ul>
              {analytics.activityFrequency.map((action, index) => (
                <li key={index}>
                  {action._id}: {action.count} times
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel;
