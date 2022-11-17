import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import { GameProvider } from "./GameProvider";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>
);
