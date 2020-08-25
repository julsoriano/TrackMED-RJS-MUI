import React from "react";
import ReactDOM from "react-dom";

/* See https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md
  "history" manages session history in JavaScript
  "browser history" - A DOM-specific implementation, useful in web browsers that support the HTML5 history API
*/
import { createBrowserHistory } from "history";

import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";

// this import will not work without jsconfig.json
import "assets/css/material-dashboard-react.css?v=1.7.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);