import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CurrencyContext } from "../context/currencyContext";

export const useCurrencyRates = () => {
  const [currency, setCurrency] = useState([]);
  const [currentRates, setCurrentRates] = useState({});
  const { selectedCurrency } = useContext(CurrencyContext);

  const getCurrencyList = useCallback(async () => {
    const response = await axios.get("https://api.exchangerate.host/symbols");
    setCurrency(Object.keys(response.data.symbols));
  }, []);

  const getRates = useCallback(async (selectedCurrency) => {
    const response = await axios.get(
      "https://api.exchangerate.host/latest",
      {
        params: {
          base: selectedCurrency.from,
        },
      },
      [selectedCurrency.from]
    );

    setCurrentRates(response.data.rates);
  }, []);

  useEffect(() => {
    getCurrencyList();
  }, [getCurrencyList]);

  useEffect(() => {
    getRates(selectedCurrency);
  }, [selectedCurrency, getRates]);

  return { currency, currentRates };
};
