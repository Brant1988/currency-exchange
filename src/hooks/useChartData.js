import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { CurrencyContext } from "../context/currencyContext";

export const useChartData = () => {
  const { selectedCurrency } = useContext(CurrencyContext);

  const date = new Date();
  const fromDate = format(date.setMonth(date.getMonth() - 1), "yyyy-MM-dd ");
  const toDate = format(Date.now(), "yyyy-MM-dd ");
  const URL = `https://api.exchangerate.host/timeseries?start_date=${fromDate}&end_date=${toDate}&base=${selectedCurrency.from}`;
  const [rateList, setRateList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [rates, setRates] = useState([]);

  const getRateList = useCallback(async () => {
    const response = await axios.get(URL);
    setRateList(response.data.rates);
  }, []);

  useEffect(() => {
    setDateList(Object.keys(rateList));
  }, [rateList]);

  useEffect(() => {
    if (selectedCurrency.from) getRateList();
  }, [selectedCurrency]);

  useEffect(() => {
    if (selectedCurrency.to)
      setRates(
        Object.values(rateList).map((el) => el[selectedCurrency.to].toFixed(2))
      );
  }, [rateList, selectedCurrency.to]);

  return { dateList, rates };
};
