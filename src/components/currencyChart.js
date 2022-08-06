import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
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
import axios from "axios";
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

  const date = new Date();
  const fromDate = format(date.setMonth(date.getMonth() - 1), "yyyy-MM-dd ");
  const toDate = format(Date.now(), "yyyy-MM-dd ");
  const URL = `https://api.exchangerate.host/timeseries?start_date=${fromDate}&end_date=${toDate}&base=${selectedCurrency.from}`;
  const [rateList, setRateList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [rates, setRates] = useState([]);

  const getData = async () => {
    const response = await axios.get(URL);
    setRateList(response.data.rates);
  };

  useEffect(() => {
    setDateList(Object.keys(rateList));
  }, [rateList]);

  useEffect(() => {
    if (selectedCurrency.from) getData();
  }, [selectedCurrency.from]);

  useEffect(() => {
    if (selectedCurrency.to)
      setRates(
        Object.values(rateList).map((el) => el[selectedCurrency.to].toFixed(2))
      );
  }, [rateList, selectedCurrency.to]);

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
