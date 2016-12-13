import React from "react";
import {connect} from 'react-redux';
import Header from './module/Header';
import Tree from './module/Tree';
import Body from './module/Body';
import FixedContent from '../../../components/common/FixedContent.jsx';
var {browserHistory} = require('react-router');
var actions = require('redux/actions');
var $ = require('jquery');
let page = require('../../../../config/page');
let comp = require('../../../../config/comp');
require('jquery.cookie');
let tabaleData = require('../../../../config/table-data');

let Component = React.createClass({
  componentDidMount() {
    this.props.init(this.props.userInfo);
  },
  render() {
    let {itemHeaderActive, itemTreeAct, flag=true}=this.props;
    return (
        <FixedContent mode="fullWidth" width={1920}>
          123123123
        </FixedContent>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    itemHeaderActive: state.vars.headerItemActive,
    itemTreeAct: state.vars.treeItemActive,
    userInfo: state.vars.userInfo,
    flag: state.vars.putpage,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
