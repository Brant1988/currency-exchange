import { createContext, useState } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState({
    from: null,
    to: null,
  });

  console.log(selectedCurrency.from, selectedCurrency.to);
  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
