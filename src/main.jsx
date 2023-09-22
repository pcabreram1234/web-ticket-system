import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/routes/App";
import { BrowserRouter } from "react-router-dom";
import "./i18n/index";
import "./styles/index.css";
import { AuthProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
