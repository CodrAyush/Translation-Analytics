import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const languages = [...new Set(data.map((log) => log.language))];
  const frequencies = languages.map((lang) =>
    data.filter((log) => log.language === lang).length
  );

  const chartData = {
    labels: languages,
    datasets: [
      {
        label: "Translation Frequency by Language",
        data: frequencies,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Translation Frequency by Language" },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
