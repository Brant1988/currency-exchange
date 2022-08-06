import React from "react";
import ControlPanel from "./components/controlPanel";
import Chart from "./components/currencyChart";
import { CurrencyProvider } from "./context/currencyContext";

const App = () => {
  return (
    <CurrencyProvider>
      <div className="app">
        <ControlPanel />
        <Chart />
      </div>
    </CurrencyProvider>
  );
};

export default App;
