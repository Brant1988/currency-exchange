import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../context/currencyContext";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

const InputPanel = () => {
  const { currentRates } = useCurrencyRates();
  const [amount, setAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const { selectedCurrency } = useContext(CurrencyContext);

  useEffect(() => {
    setMultiplier(currentRates[selectedCurrency.to]);
  }, [selectedCurrency.to, selectedCurrency.from, currentRates]);

  return (
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
  );
};

export default InputPanel;
