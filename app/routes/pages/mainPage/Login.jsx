import React from "react";
import {connect} from 'react-redux';
import FixedContent from '../../../components/common/FixedContent.jsx';
var {browserHistory} = require('react-router');
var actions = require('redux/actions');
var $ = require('jquery');
let page = require('../../../../config/page');
let comp = require('../../../../config/comp');
import css from './Login.scss';
require('jquery.cookie');
let tabaleData = require('../../../../config/table-data');

let Component = React.createClass({
  componentDidMount() {
    this.props.init(this.props.userInfo);
  },
  render() {
    let {login,}=this.props;
    return (
        <FixedContent mode="fullWidth" width={1920}>
          {
            <div className={css.whole}>
            <form className={css.loginBox}>
              <span>用户名: </span><input className={css.int} type="text" name="name"/><br/>
              <span>密码: </span><input className={css.int} type="text" name="password"/><br/>
              <input className={css.submit} type="submit" value='登陆' onClick={login}/>
            </form>
          </div>
          }
        </FixedContent>
    )
  }
});
const mapStateToProps = (state) => {
  return {
    userInfo: state.vars.userInfo,

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {
      console.log('login');
      dispatch(actions.setVars('userInfo', true));
      $.cookie('token','123123');
       // browserHistory.push('/app/all/page/main')  ;
    },
    login:()=>{
      browserHistory.push('/app/all/page/main')  ;
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
