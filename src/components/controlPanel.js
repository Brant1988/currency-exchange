import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CurrencyContext } from "../context/currencyContext";

const ControlPanel = () => {
  const [currency, setCurrency] = useState([]);
  const [currentRates, setCurrentRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext);

  const getCurrencyList = useCallback(async () => {
    const response = await axios.get("https://api.exchangerate.host/symbols");
    setCurrency(Object.keys(response.data.symbols));
  });

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
  });
  useEffect(() => {
    getCurrencyList();
  }, []);

  useEffect(() => {
    getRates(selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    setMultiplier(currentRates[selectedCurrency.to]);
  }, [selectedCurrency.to, selectedCurrency.from]);

  console.log(selectedCurrency);
  return (
    <div className="control_panel">
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
          value={selectedCurrency.from}
          onChange={(event, newValue) =>
            setSelectedCurrency({
              ...selectedCurrency,
              from: newValue,
            })
          }
          options={currency}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="From" />}
        />
        <Autocomplete
          value={selectedCurrency.to}
          onChange={(event, newValue) =>
            setSelectedCurrency({
              ...selectedCurrency,
              to: newValue,
            })
          }
          options={currency}
          sx={{ width: 250, mt: 2 }}
          renderInput={(params) => <TextField {...params} label="To" />}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
