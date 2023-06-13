import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
  </Provider>
);

reportWebVitals();
