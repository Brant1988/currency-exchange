import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CurrencyContext } from "../context/currencyContext";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

const CurrencySelect = () => {
  const { currency } = useCurrencyRates();
  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext);

  return (
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
  );
};

export default CurrencySelect;
