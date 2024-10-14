import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ data }: { data: any }) => {
  const series = [
    {
      name: "Total Interactions",
      data: data.map((entry: any) => entry.count),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: data.map((entry: any) => entry.date),
      title: {
        text: "Date",
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    yaxis: {
      title: {
        text: "Interactions",
      },
    },
  };

  return (
    <div className="line-chart">
      {/* @ts-ignore */}
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
