import React from "react";
import {connect} from 'react-redux';

var actions = require('../../redux/actions');
var {dispatch} = require('../../redux/store');
require('./BaseApplication.gscss');

class Application extends React.Component {

  constructor(props) {
    super(props);
    dispatch(actions.setVars('landingUrl', location.href));
    // read token & set token
  }

  componentDidUpdate(preProps) {
    let prePage = preProps.location.pathname + preProps.location.search;
  }

  render() {
    return this.props.children;
  }
}

export default connect()(Application);
