import React from "react";
import ReactDOM from "react-dom/client";

import { Grommet } from "grommet";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Grommet>
      <App />
    </Grommet>
  </React.StrictMode>
);
