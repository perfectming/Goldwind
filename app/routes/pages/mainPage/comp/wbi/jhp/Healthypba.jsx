import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_a from './Hly_a.jsx';
import Hly_pba from './Hly_pba.jsx';
import Hly_pbas from './Hly_pbas.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
import Hly_d from './Hly_d.jsx';
var actions = require('redux/actions');
var $ = require('jquery');
let ip = "10.68.100.32";
var date=new Date
var year=date.getFullYear();
var month11=date.getMonth();
var day = new Date(year,11,0);
//获取天数：
var daycount = day.getDate();


let Component = React.createClass({
    componentWillMount() {
        let {ipUrl}=this.props
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {hhdata3,ipUrl,wfid, hhdata1,wc1,wc2,bt0=0, pba3 = [], wrong32 = [], wrong33 = [], wrong31 = [], wrong30 = [], power3 = [], barLotime3 = [], hhdata, w0, w10, mon, win, windplan = win, befor_pages = 'group', returnit, hideit, wind, winds, windss, buttonAction, actbt = 10, changecolor, gogogo, back, more, power2 = [], wrong20 = [], wrong21 = [], wrong22 = [], wrong23 = [], pba2 = [], barLotime2 = [], power1 = [], wrong10 = [], wrong11 = [], wrong12 = [], wrong13 = [], pba1 = [], barLotime1 = []} = this.props;


        let data = require('./Healthy-data');
        let month = data.data.line_month;
        let button = data.data.button;
        let text0 = data.data.line_date;


        return (




            <div className={styles.box}>

                <div className={styles.light} id="light"></div>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`} id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo30}>
                            {mon + w0 + w10 + "各风机PBA"}
                        </div>
                        <span
                            onClick={() => hideit(bt0,barLotime3, power3, wrong30, wrong31, wrong32, wrong33, pba3)}>×</span>
                    </div>

                    <div className={styles.hidden_bottom}>

                        <Hly_pbas text={""}
                                  widths={4500}
                                  height={450}
                                  barLotime3={barLotime3}
                                  power3={power3}
                                  wrong30={ wrong30}
                                  wrong31={ wrong31}
                                  wrong32={wrong32}
                                  wrong33={wrong33}
                                  pba3={pba3}
                        ></Hly_pbas>

                    </div>
                </div>


                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt === key ? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={() => changecolor(value, key,ipUrl)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={() => returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_a text={mon + "集团各区域PBA"}
                               barLotime={barLotime1}
                               power1={power1}
                               wrong10={wrong10}
                               wrong11={wrong11}
                               wrong12={wrong12}
                               wrong13={wrong13}
                               pba1={pba1}
                               actbt={actbt}
                               hhdata2={hhdata}
                        ></Hly_a>
                        <div className={styles.logo2}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        {/*<Hly_pba text={mon+w0 + "各风场PBA"}*/}
                        {/*barLotime2={barLotime2}*/}
                        {/*power2={power2}*/}
                        {/*wrong20={wrong20}*/}
                        {/*wrong21={wrong21}*/}
                        {/*wrong22={wrong22}*/}
                        {/*wrong23={wrong23}*/}
                        {/*pba2={pba2}*/}

                        {/*></Hly_pba>*/}
                        <Hly_pba text={mon + w0 + "各风场PBA"}
                                 barLotime2={barLotime2 == null ? barLotime21 : barLotime2}
                                 power2={power2 == null ? power21 : power2}
                                 wrong20={wrong20 == null ? wrong201 : wrong20}
                                 wrong21={wrong21 == null ? wrong211 : wrong21}
                                 wrong22={wrong22 == null ? wrong221 : wrong22}
                                 wrong23={wrong23 == null ? wrong231 : wrong23}
                                 pba2={pba2 == null ? pba21 : pba2}
                                 actbt={actbt}
                                 hhdata2={hhdata}
                                 hhdata1={hhdata1}
                        ></Hly_pba>
                        <div className={styles.logomini2}>

                        </div>
                    </div>

                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox30}>

                        </div>
                        <div className={styles.rbox3}>

                            <button className={bt0===0? styles.button : styles.button22}
                                    onClick={() => gogogo(bt0,w0, win, wc1,wc2, actbt, hhdata,ipUrl,wfid)}>
                                前10
                            </button>
                            <button className={bt0===1? styles.button : styles.button22}
                                    onClick={() => back(bt0,w0, win, wc1,wc2, actbt, hhdata,ipUrl,wfid)}>
                                后10
                            </button>
                            <button className={bt0===2? styles.button : styles.button22} onClick={() => more(bt0,w0, win, wc1,wc2, actbt, hhdata,ipUrl,wfid)}>更多</button>
                        </div>


                        <div className={styles.rbox4}>
                            <Hly_pbas text={mon + w0 + w10 + "各风机PBA"}
                                      barLotime3={barLotime3 == null ? barLotime31 : barLotime3}
                                      power3={power3 == null ? power31 : power3}
                                      wrong30={ wrong30 == null ? wrong301 : wrong30}
                                      wrong31={ wrong31 == null ? wrong311 : wrong31}
                                      wrong32={wrong32 == null ? wrong321 : wrong32}
                                      wrong33={wrong33 == null ? wrong331 : wrong33}
                                      pba3={pba3 == null ? pba31 : pba3}
                            ></Hly_pbas>
                            <div className={styles.logomini2}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        actbt: state.vars.actbt,
        wind: state.vars.wind,
        winds: state.vars.winds,
        windss: state.vars.windss,
        mon: state.vars.mon,
        windplan: state.vars.windplan,
        hhdata: state.vars.hhdata,
        hhdata2: state.vars.hhdata2,
        hhdata3: state.vars.hhdata3,
        hhdata1: state.vars.hhdata1,
        barLotime2: state.vars.barLotime2a,
        power2: state.vars.power2a,
        wrong20: state.vars.wrong20a,
        wrong21: state.vars.wrong21a,
        wrong22: state.vars.wrong22a,
        wrong23: state.vars.wrong23a,
        pba2: state.vars.pba2a,
        barLotime3: state.vars.barLotime3a,
        power3: state.vars.power3a,
        wrong30: state.vars.wrong30a,
        wrong31: state.vars.wrong31a,
        wrong32: state.vars.wrong32a,
        wrong33: state.vars.wrong33a,
        pba3: state.vars.pba3a,
        w0: state.vars.w1,
        wc1: state.vars.wc1,
        wc2: state.vars.wc2,
        w10: state.vars.w11,
        barLotime1: state.vars.barLotime1a,
        power1: state.vars.power1a,
        wrong10: state.vars.wrong10a,
        wrong11: state.vars.wrong11a,
        wrong12: state.vars.wrong12a,
        wrong13: state.vars.wrong13a,
        pba1: state.vars.pba1a,
        bt0: state.vars.bt0,
        ipUrl: state.vars.ipUrl,
        wfid:state.vars.wfid,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('actbt',  10));
            dispatch(actions.setVars('mon',  month2+"月"));

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getCompanySpacePBA',
                async: false,
                data: 'month=11',
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let w0 = data.data[2][0].groupname;
                    let w10 = data.data[1][0].wfname;
                    dispatch(actions.setVars('w1', w0));
                    dispatch(actions.setVars('w11', w10));
                    dispatch(actions.setVars('hhdata', data));

                    let barLotime1 = [];    //各区域   一区域二区域
                    let power1 = [];       //实际发电量
                    let wrong10 = [];       //故障损失
                    let wrong11 = [];       //维护损失
                    let wrong12 = [];       //限功率损失
                    let wrong13 = [];       //非设备原因损失
                    let pba1 = [];

                    for (var i in data.data[2]) {
                        barLotime1.push(data.data[2][i].groupname);    //区域的横坐标
                        power1.push(data.data[2][i].poweract);   //实际发电量
                        wrong10.push(data.data[2][i].faultloss);   //故障损失
                        wrong11.push(data.data[2][i].maintainloss);   //维护损失
                        wrong12.push(data.data[2][i].limitloss);   //限功率损失
                        wrong13.push(data.data[2][i].nodevreasonloss);   //非设备原因损失
                        pba1.push(data.data[2][i].pba.toFixed(3)*100); //非设备原因损失
                    }
                    let barLotime2 = [];    //各区域   一区域二区域
                    let power2 = [];       //实际发电量
                    let wrong20 = [];       //故障损失
                    let wrong21 = [];       //维护损失
                    let wrong22 = [];       //限功率损失
                    let wrong23 = [];       //非设备原因损失
                    let pba2 = [];
                    for (var i in data.data[1]) {
                        barLotime2.push(data.data[1][i].wfname);    //区域的横坐标
                        power2.push(data.data[1][i].poweract);   //实际发电量
                        wrong20.push(data.data[1][i].faultloss);   //故障损失
                        wrong21.push(data.data[1][i].maintainloss);   //维护损失
                        wrong22.push(data.data[1][i].limitloss);   //限功率损失
                        wrong23.push(data.data[1][i].nodevreasonloss);   //非设备原因损失
                        pba2.push(data.data[1][i].pba.toFixed(3)*100);   //非设备原因损失
                    }
                    let barLotime3 = [];    //各区域   一区域二区域
                    let power3 = [];       //实际发电量
                    let wrong30 = [];       //故障损失
                    let wrong31 = [];       //维护损失
                    let wrong32 = [];       //限功率损失
                    let wrong33 = [];       //非设备原因损失
                    let pba3 = [];
                    for (var i = 0; i <= 10; i++) {
                        barLotime3.push(data.data[0][i].wtname);    //区域的横坐标
                        power3.push(data.data[0][i].poweract);   //实际发电量
                        wrong30.push(data.data[0][i].faultloss);   //故障损失
                        wrong31.push(data.data[0][i].maintainloss);   //维护损失
                        wrong32.push(data.data[0][i].limitloss);   //限功率损失
                        wrong33.push(data.data[0][i].nodevreasonloss);   //非设备原因损失
                        pba3.push(data.data[0][i].pba.toFixed(3)*100);   //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime3a', barLotime3))
                    dispatch(actions.setVars('power3a', power3))
                    dispatch(actions.setVars('wrong30a', wrong30))
                    dispatch(actions.setVars('wrong31a', wrong31))
                    dispatch(actions.setVars('wrong32a', wrong32))
                    dispatch(actions.setVars('wrong33a', wrong33))
                    dispatch(actions.setVars('pba3a', pba3))

                    dispatch(actions.setVars('barLotime2a', barLotime2))
                    dispatch(actions.setVars('power2a', power2))
                    dispatch(actions.setVars('wrong20a', wrong20))
                    dispatch(actions.setVars('wrong21a', wrong21))
                    dispatch(actions.setVars('wrong22a', wrong22))
                    dispatch(actions.setVars('wrong23a', wrong23))
                    dispatch(actions.setVars('pba2a', pba2))

                    dispatch(actions.setVars('barLotime1a', barLotime1))
                    dispatch(actions.setVars('power1a', power1))
                    dispatch(actions.setVars('wrong10a', wrong10))
                    dispatch(actions.setVars('wrong11a', wrong11))
                    dispatch(actions.setVars('wrong12a', wrong12))
                    dispatch(actions.setVars('wrong13a', wrong13))
                    dispatch(actions.setVars('pba1a', pba1))

                },
                error: function () {

                },
            })


        },
        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test: ''
            }
        },

        changecolor: (value, key,ipUrl) => {
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind', value.plan));
            dispatch(actions.setVars('winds', value.actrul));
            dispatch(actions.setVars('windss', value.actruls));
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getCompanySpacePBA',
                async: false,
                data: {"month": key + 1},
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    dispatch(actions.setVars('hhdata', data));
                    let barLotime1 = [];    //各区域   一区域二区域
                    let power1 = [];       //实际发电量
                    let wrong10 = [];       //故障损失
                    let wrong11 = [];       //维护损失
                    let wrong12 = [];       //限功率损失
                    let wrong13 = [];       //非设备原因损失
                    let pba1 = [];

                    for (var i in data.data[2]) {
                        barLotime1.push(data.data[2][i].groupname);    //区域的横坐标
                        power1.push(data.data[2][i].poweract);   //实际发电量
                        wrong10.push(data.data[2][i].faultloss);   //故障损失
                        wrong11.push(data.data[2][i].maintainloss);   //维护损失
                        wrong12.push(data.data[2][i].limitloss);   //限功率损失
                        wrong13.push(data.data[2][i].nodevreasonloss);   //非设备原因损失
                        pba1.push(data.data[2][i].pba.toFixed(3)*100);   //非设备原因损失
                    }
                    let barLotime2 = [];    //各区域   一区域二区域
                    let power2 = [];       //实际发电量
                    let wrong20 = [];       //故障损失
                    let wrong21 = [];       //维护损失
                    let wrong22 = [];       //限功率损失
                    let wrong23 = [];       //非设备原因损失
                    let pba2 = [];
                    for (var i in data.data[1]) {
                        barLotime2.push(data.data[1][i].wfname);    //区域的横坐标
                        power2.push(data.data[1][i].poweract);   //实际发电量
                        wrong20.push(data.data[1][i].faultloss);   //故障损失
                        wrong21.push(data.data[1][i].maintainloss);   //维护损失
                        wrong22.push(data.data[1][i].limitloss);   //限功率损失
                        wrong23.push(data.data[1][i].nodevreasonloss);   //非设备原因损失
                        pba2.push(data.data[1][i].pba.toFixed(3)*100);    //非设备原因损失
                    }
                    let barLotime3 = [];    //各区域   一区域二区域
                    let power3 = [];       //实际发电量
                    let wrong30 = [];       //故障损失
                    let wrong31 = [];       //维护损失
                    let wrong32 = [];       //限功率损失
                    let wrong33 = [];       //非设备原因损失
                    let pba3 = [];
                    for (var i = 0; i <= 10; i++) {
                        barLotime3.push(data.data[0][i].wtname);    //区域的横坐标
                        power3.push(data.data[0][i].poweract);   //实际发电量
                        wrong30.push(data.data[0][i].faultloss);   //故障损失
                        wrong31.push(data.data[0][i].maintainloss);   //维护损失
                        wrong32.push(data.data[0][i].limitloss);   //限功率损失
                        wrong33.push(data.data[0][i].nodevreasonloss);   //非设备原因损失
                        pba3.push(data.data[0][i].pba.toFixed(3)*100);   //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime3a', barLotime3))
                    dispatch(actions.setVars('power3a', power3))
                    dispatch(actions.setVars('wrong30a', wrong30))
                    dispatch(actions.setVars('wrong31a', wrong31))
                    dispatch(actions.setVars('wrong32a', wrong32))
                    dispatch(actions.setVars('wrong33a', wrong33))
                    dispatch(actions.setVars('pba3a', pba3))

                    dispatch(actions.setVars('barLotime2a', barLotime2))
                    dispatch(actions.setVars('power2a', power2))
                    dispatch(actions.setVars('wrong20a', wrong20))
                    dispatch(actions.setVars('wrong21a', wrong21))
                    dispatch(actions.setVars('wrong22a', wrong22))
                    dispatch(actions.setVars('wrong23a', wrong23))
                    dispatch(actions.setVars('pba2a', pba2))

                    dispatch(actions.setVars('barLotime1a', barLotime1))
                    dispatch(actions.setVars('power1a', power1))
                    dispatch(actions.setVars('wrong10a', wrong10))
                    dispatch(actions.setVars('wrong11a', wrong11))
                    dispatch(actions.setVars('wrong12a', wrong12))
                    dispatch(actions.setVars('wrong13a', wrong13))
                    dispatch(actions.setVars('pba1a', pba1))

                },
                error: function () {

                },
            })

        },
        gogogo: (bt0,w0, win, wc1,wc2, actbt, hhdata,ipUrl,wfid) => {
            dispatch(actions.setVars('bt0', 0));
          //  let grid = hhdata.data[2][0].groupid;

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type":"0",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失
                    let wrong31c = [];       //维护损失
                    let wrong32c = [];       //限功率损失
                    let wrong33c = [];       //非设备原因损失
                    let pba3c = [];

                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(data.data[i].poweract);   //实际发电量
                        wrong30c.push(data.data[i].faultloss);   //故障损失
                        wrong31c.push(data.data[i].maintainloss);   //维护损失
                        wrong32c.push(data.data[i].limitloss);   //限功率损失
                        wrong33c.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba3c.push(data.data[i].pba.toFixed(3)*100);   //非设备原因损失
                    }

                    dispatch(actions.setVars('barLotime3a', barLotime3c))
                    dispatch(actions.setVars('power3a', power3c))
                    dispatch(actions.setVars('wrong30a', wrong30c))
                    dispatch(actions.setVars('wrong31a', wrong31c))
                    dispatch(actions.setVars('wrong32a', wrong32c))
                    dispatch(actions.setVars('wrong33a', wrong33c))
                    dispatch(actions.setVars('pba3a', pba3c))

                },
                error: function () {

                },
            });



        },
        back: (bt0,w0, win, wc1,wc2, actbt, hhdata,ipUrl,wfid) => {

            dispatch(actions.setVars('bt0', 1));

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type":"1",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失
                    let wrong31c = [];       //维护损失
                    let wrong32c = [];       //限功率损失
                    let wrong33c = [];       //非设备原因损失
                    let pba3c = [];

                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(data.data[i].poweract);   //实际发电量
                        wrong30c.push(data.data[i].faultloss);   //故障损失
                        wrong31c.push(data.data[i].maintainloss);   //维护损失
                        wrong32c.push(data.data[i].limitloss);   //限功率损失
                        wrong33c.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba3c.push(data.data[i].pba.toFixed(3)*100);  //非设备原因损失
                    }

                    dispatch(actions.setVars('barLotime3a', barLotime3c))
                    dispatch(actions.setVars('power3a', power3c))
                    dispatch(actions.setVars('wrong30a', wrong30c))
                    dispatch(actions.setVars('wrong31a', wrong31c))
                    dispatch(actions.setVars('wrong32a', wrong32c))
                    dispatch(actions.setVars('wrong33a', wrong33c))
                    dispatch(actions.setVars('pba3a', pba3c))

                },
                error: function () {

                },
            });

        },
        more: (bt0,w0, win, wc1,wc2, actbt, hhdata,ipUrl,wfid) => {
            dispatch(actions.setVars('bt0', 2));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type":"2",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失
                    let wrong31c = [];       //维护损失
                    let wrong32c = [];       //限功率损失
                    let wrong33c = [];       //非设备原因损失
                    let pba3c = [];

                    for (var i in data.data) {

                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(data.data[i].poweract);   //实际发电量
                        wrong30c.push(data.data[i].faultloss);   //故障损失
                        wrong31c.push(data.data[i].maintainloss);   //维护损失
                        wrong32c.push(data.data[i].limitloss);   //限功率损失
                        wrong33c.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba3c.push(data.data[i].pba.toFixed(3)*100);  //非设备原因损失
                    }

                    dispatch(actions.setVars('barLotime3a', barLotime3c))
                    dispatch(actions.setVars('power3a', power3c))
                    dispatch(actions.setVars('wrong30a', wrong30c))
                    dispatch(actions.setVars('wrong31a', wrong31c))
                    dispatch(actions.setVars('wrong32a', wrong32c))
                    dispatch(actions.setVars('wrong33a', wrong33c))
                    dispatch(actions.setVars('pba3a', pba3c))

                },
                error: function () {

                },
            });
            $("#light").show();
            $("#boxhidden").show();
        },
        hideit: (bt0,barLotime3, power3, wrong30, wrong31, wrong32, wrong33, pba3) => {
            dispatch(actions.setVars('bt0', 0));

            let barLotime3c = [];    //各区域   一区域二区域
            let power3c = [];       //实际发电量
            let wrong30c = [];       //故障损失
            let wrong31c = [];       //维护损失
            let wrong32c = [];       //限功率损失
            let wrong33c = [];       //非设备原因损失
            let pba3c = [];

            for (var i = 0; i <= 10; i++) {

                barLotime3c[i] = barLotime3[i];    //区域的横坐标
                power3c[i] = power3[i];   //实际发电量
                wrong30c[i] = wrong30[i];   //故障损失
                wrong31c[i] = wrong31[i];   //维护损失
                wrong32c[i] = wrong32[i];   //限功率损失
                wrong33c[i] = wrong33[i];   //非设备原因损失
                pba3c[i] = pba3[i];    //非设备原因损失

            }

            dispatch(actions.setVars('barLotime3a', barLotime3c))
            dispatch(actions.setVars('power3a', power3c))
            dispatch(actions.setVars('wrong30a', wrong30c))
            dispatch(actions.setVars('wrong31a', wrong31c))
            dispatch(actions.setVars('wrong32a', wrong32c))
            dispatch(actions.setVars('wrong33a', wrong33c))
            dispatch(actions.setVars('pba3a', pba3c))

            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
