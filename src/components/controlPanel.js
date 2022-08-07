import React from "react";
import InputPanel from "./inputPanel";
import CurrencySelect from "./currencySelect";

const ControlPanel = () => {
  return (
    <div className="control_panel">
      <InputPanel />
      <CurrencySelect />
    </div>
  );
};

export default ControlPanel;
