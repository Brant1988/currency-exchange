import React, { useCallback, useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import { CurrencyContext } from "../context/currencyContext";
import { useChartData } from "../hooks/useChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { selectedCurrency } = useContext(CurrencyContext);
  const { dateList, rates } = useChartData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    position: "relative",
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = dateList;

  const data = {
    labels,
    datasets: [
      {
        label: `${selectedCurrency.from || ""} to ${selectedCurrency.to || ""}`,
        data: rates,
        borderColor: "lightblue",
        backgroundColor: "lightblue",
      },
    ],
  };
  return (
    <div className="chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
