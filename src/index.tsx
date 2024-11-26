import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GameProvider } from "./context/GameProvider";
import './styles/global.css';

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container); 
  root.render(
    <React.StrictMode>
      <GameProvider>
        <App />
      </GameProvider>
    </React.StrictMode>
  );
}
