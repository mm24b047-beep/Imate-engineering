import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

// VITE_ROUTER=hash is used for single-file previews; production uses clean URLs.
const Router = import.meta.env.VITE_ROUTER === "hash" ? HashRouter : BrowserRouter;
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
