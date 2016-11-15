import React from "react";
import ReactDom from "react-dom";
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
let store = require('../app/redux/store');
let routes = require("../app/routes");

ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById("content"));
