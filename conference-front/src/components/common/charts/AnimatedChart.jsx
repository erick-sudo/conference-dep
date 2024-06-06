import React from "react";
import { Doughnut, Pie, Bar, PolarArea, Line } from "react-chartjs-2";
import { Report } from "../../dashboard/Reports";

const generateRandomNumber = (max = 10) => {
  return Math.floor(Math.random() * 100) % 5;
};

  const lime_800 = "rgb(63 98 18)";
  const red_800 = "#dc2626";

const AnimatedChart = () => {
  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: true,
        },
      },
    },
    legend: false,
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  const labels = new Array(20).fill(0).map(() => generateRandomNumber());

  const data = {
    options: options,
    data: {
      labels: labels,
      datasets: [
        {
          data: labels.sort(),
          borderWidth: 0.5,
          backgroundColor: "rgba(63, 98, 18, 0.2)",
          borderColor: "",
        },
      ],
    },
  };

  return (
    <div className="min-h-[15vh] bg-white">
      {/* <Report data /> */}
    </div>
  );
};

const SimpleLineGraph = ({ dt }) => {
  const data = {
    labels: dt.slice(0, 10),
    datasets: [
      {
        data: dt.slice(0, 10),
        backgroundColor: red_800,
        borderColor: lime_800,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          display: false,
        },
        beginAtZero: true,
      },
      y: {
        ticks: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: false,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export { SimpleLineGraph, AnimatedChart };
