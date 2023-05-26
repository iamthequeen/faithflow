import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import { UserContextProvider } from './utils/UserContext';
import { FormStepContextProvider } from './utils/FormStepContext';
import { BrowserRouter as Router } from "react-router-dom"



ReactDOMClient.createRoot(document.getElementById("root")).render(
    <FormStepContextProvider>
    <UserContextProvider>
    <Router>
    <App />
    </Router>
    </UserContextProvider>
     </FormStepContextProvider>
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
