import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/css/global.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ErrorBoundary>

     <NoteProvider>
      <App />
       </NoteProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

  
