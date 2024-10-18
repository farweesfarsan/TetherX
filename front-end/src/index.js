import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './global.css'
import { BrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";
import { Provider } from "react-redux"; // Import Provider
import store from '../src/redux/store'; // Import your Redux store

import "./global.css";

const muiTheme = createTheme();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}> {/* Wrap the app with Provider */}
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </Provider>
);