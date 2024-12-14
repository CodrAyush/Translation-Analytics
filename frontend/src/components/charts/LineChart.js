import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const timestamps = data.map((log) => new Date(log.timestamp).toLocaleTimeString());
  const responseTimes = data.map((log) => log.apiResponseTime);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "API Response Times",
        data: responseTimes,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "API Response Times Over Time" },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
