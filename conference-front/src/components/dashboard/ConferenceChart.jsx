import React, { useState, useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

function ConferenceChart({ plot_data }) {
  const canvasRef = useRef();

  const wrapperRef = useRef();

  const [canvasRefresher, setCanvasRefresher] = useState(0);

  Chart.defaults.color = 'rgb(63 98 18)';
  Chart.defaults.font = {
    size: 12,     // Set the font size (in pixels)
    weight: 'bold',  // Set the font weight to bold
    family: "'Arial', sans-serif",  // Set the font family
  };

  async function loadChart(data) {
    new Chart(canvasRef.current, {
      type: data.graph_type ? data.graph_type : "line",
      options: {
        ...data.options,
        responsive: true,
        elements: {
          line: {
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ...data.options?.scales?.x,
          },
          y: {
            beginAtZero: false,
            suggestedMax: 10,
            ...data.options?.scales?.y,
          },
          ...data.options?.scales,
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "easeInOutCubic",
            from: 1,
            to: 0,
          },
          ...data.options?.animations,
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
          ...data.options?.plugins,
        },
      },
      data: data.data,
    });
  }

  window.addEventListener("resize", () => {
    setCanvasRefresher(canvasRefresher + 1);
  });

  function createCanvas() {
    // Remove the current canvas
    if (canvasRef.current) {
      canvasRef.current.remove();
    }
    // Create a new canvas
    const canvas = document.createElement("canvas");
    canvas.style.backgroundColor = "transparent";
    canvas.width = wrapperRef.current.offsetWidth;
    if(plot_data.enlargeHeight) {
      canvas.height = plot_data.expandXL ? wrapperRef.current.offsetWidth * 1.2 : wrapperRef.current.offsetWidth;
    }
    wrapperRef.current.appendChild(canvas);
    canvasRef.current = canvas;
  }

  useEffect(() => {
    createCanvas();
    loadChart(plot_data);
  }, [canvasRefresher]);

  return (
    <div className="p-2 rounded flex-grow flex justify-center items-center flex-col">
      <h2 className="text-xl text-center font-mono px-4 text-lime-900 italic">{plot_data.title}</h2>
      <div
        ref={wrapperRef}
        className="flex-grow rounded-lg w-[100%]"
      ></div>
    </div>
  );
}

export default ConferenceChart;
