import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getFormHelperTextUtilityClasses } from "@mui/material";

const App = () => {
  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [currentRates, setCurrentRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  // const [result, setResult] = useState("");

  const getCurrencyList = useCallback(async () => {
    const response = await axios.get("https://api.exchangerate.host/symbols");
    setCurrency(Object.keys(response.data.symbols));
  });

  const getRates = useCallback(async (fromCurrency) => {
    const response = await axios.get(
      "https://api.exchangerate.host/latest",
      {
        params: {
          base: fromCurrency,
        },
      },
      [fromCurrency]
    );
    setCurrentRates(response.data.rates);
  });
  useEffect(() => {
    getCurrencyList();
  }, []);

  useEffect(() => {
    getRates(fromCurrency);
  }, [fromCurrency]);

  useEffect(() => {
    setMultiplier(currentRates[toCurrency]);
  }, [toCurrency, fromCurrency]);

  return (
    <div className="app">
      <div className="amount">
        <input
          type="number"
          autoComplete="off"
          placeholder="Enter amount"
          value={+amount.toFixed(2) || ""}
          onChange={(event) => {
            setAmount(event.target.valueAsNumber);
          }}
        ></input>
        <input
          type="number"
          autoComplete="off"
          value={+(amount * multiplier).toFixed(2) || ""}
          onChange={(event) => setAmount(event.target.value / multiplier)}
        ></input>
      </div>
      <div className="options">
        <Autocomplete
          value={fromCurrency}
          onChange={(event, newValue) => {
            setFromCurrency(newValue);
          }}
          options={currency}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="From" />}
        />
        <Autocomplete
          value={toCurrency}
          onChange={(event, newValue) => {
            setToCurrency(newValue);
          }}
          options={currency}
          sx={{ width: 250, mt: 2 }}
          renderInput={(params) => <TextField {...params} label="To" />}
        />
      </div>
    </div>
  );
};

export default App;
