import React from "react";
import ReactDOM from "react-dom/client";
import ForecastApp from "./forecastApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./forecastIndex.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ForecastApp />
  </React.StrictMode>
);
