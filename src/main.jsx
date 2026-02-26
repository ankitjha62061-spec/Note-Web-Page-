import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/css/global.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { UpsertNote } from "./components/UpsertNote.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
   {/* <UpsertNote/> */}
      <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

  
