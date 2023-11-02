import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
//! REDUX!//
import { Provider } from "react-redux";
import store from "./Redux/store";

//import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

//ReactDOM.createRoot(document.getElementById("root")).render(
root.render(
  <Provider store={store}>
    {/*  <React.StrictMode> */}
    <HashRouter>
      <App />
      {/*   </React.StrictMode> */}
    </HashRouter>
  </Provider>
);
