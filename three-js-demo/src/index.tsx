/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Home from "./Home";
import Line from "./examples/Line";
import Text from "./examples/Text";
import Models from "./examples/3D_models";

const root = document.getElementById("root");

render(
  () => (
    // https://github.com/solidjs/solid-router
    <Router>
      <Route path="/" component={Home} />
      <Route path="/line" component={Line} />
      <Route path="/text" component={Text} />
      <Route path="/3d-models" component={Models} />
    </Router>
  ),
  root!
);
