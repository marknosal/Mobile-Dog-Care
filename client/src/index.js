import React from "react";
// import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// ReactDOM.render(
//     <Router>
//       <App />
//     </Router>,
//     document.getElementById("root")
//   );

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Router>
        <App />
    </Router>
    );
