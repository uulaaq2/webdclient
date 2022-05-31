import React from 'react';
import { createRoot } from "react-dom/client";
import App from 'app'
import { GlobalStateProvider } from 'state/globalState'
import {ThemeProvider} from '@primer/react'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
      <React.StrictMode>
            <GlobalStateProvider>
                  <ThemeProvider>
                        <App />
                  </ThemeProvider>
            </GlobalStateProvider>
      </React.StrictMode>
);