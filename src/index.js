import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import themex from "./libs/MUITheme";
import { createTheme } from "@mui/material/styles";
import { IntlProvider } from 'react-intl'
import App from "./App";

const theme = createTheme(themex);

const rootElement = document.getElementById("root");
ReactDOM.render(<StrictMode >
  <IntlProvider messages={{}} locale="en" defaultLocale="en">
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>
  </IntlProvider>
</StrictMode >,
  rootElement
);