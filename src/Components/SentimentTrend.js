import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SentimentTrend = ({ trendData }) => {
  const renderTrendChart = () => {
    if (!trendData || Object.keys(trendData).length === 0) {
      return <div className="text-muted text-center py-3">No trend data available</div>;
    }

    // Convert the object to an array of { date, count }
    const chartData = Object.entries(trendData).map(([key, count]) => {
      const match = key.match(/datetime\.date\((\d+), (\d+), (\d+)\)/);
      if (match) {
        const [_, year, month, day] = match;
        const date = new Date(year, month - 1, day).toLocaleDateString(); // Format to a readable string
        return { date, count };
      }
      return null;
    }).filter(Boolean);  // Remove any null entries

    return (
      <div style={{ width: '100%', height: '300px' }}> {/* Set fixed height */}
        <LineChart data={chartData} width={800} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#007bff" />
        </LineChart>
      </div>
    );
  };

  return (
    <div className="col-md-8">
      <div className="card p-3 shadow-sm">
        <h2 className="h6">Sentiment Trend</h2>
        <div className="py-3">{renderTrendChart()}</div>
      </div>
    </div>
  );
};

export default SentimentTrend;
