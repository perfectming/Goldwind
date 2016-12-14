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
              <span>用户名</span><input className={css.int} id="qq" type="text" name="username"/><br/>
              <span>密码</span><input className={css.int} type="password" name="password"/><br/>
              <input className={css.submit} type="submit " value='登陆' readOnly="true" onClick={()=>login(123)}/>
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
      dispatch(actions.setVars('userInfo', true));
      $.cookie('token','123123');
       // browserHistory.push('/app/all/page/main')  ;
    },
    login:(value)=>{
      !value?
      alert('请输入账号'):
       browserHistory.push('/app/all/page/main')  ;
      dispatch(actions.setVars('userInfo', value));
      login();
      try { Base.returnPlay(); } catch (e) { };
      try { if (TY == null) { } } catch (e) { alert("配置文件加载失败!"); return; }
      //
      TY.dataUrl = "http://54.223.200.134/System/data.aspx";
      TY.crossDomain = true;
      TY.Zip = true;
      TY.TT.timeOutlength = 1000*60*1;


      var st = null, et = null, th = null, re = null;

      function login() {
        $.ajax({
          url: "http://54.223.200.134/System/mlogin.aspx",
          async: false,
          data: 'loginType=4&P_username=bmjk&P_password=1',
          type: "post",
          dataType: "text",
          complete: function () {

          },
          success: function (data, state) {
            if (TY.Zip == true) {
              eval("data=" + utf8to16(zip_inflate(base64decode(data))));
            }
            else {
              eval("data=" + data);
            }
            if (data.f === false)
              alert(data);
          },
          error: function (a, b, c) {
            // alert(a + ":" + b + ":" + c);

          }
        });
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
