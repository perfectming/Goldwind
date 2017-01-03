import React from 'react';
import {connect} from 'react-redux';
import styles from '../../area/Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
var $ = require('jquery');
let ip = "10.68.100.32";

var actions = require('redux/actions');

let data = require('./../../area/Healthy-data');
let month = data.data.line_month;
let button = data.data.button;

let Component = React.createClass({
    componentWillMount() {
        let {ipUrl}=this.props;
        this.props.ajax(ipUrl);  //页面加载之前先获取数据
    },
    componentDidMount() {
        this.props.init();
    },
    render() {

        let {w0, w10, mon, ipUrl, width0, bt0 = 0, hhdata, befor_pages = 'group', namex3, healthy3, namex2, healthy2, wfid, namex1, healthy1, returnit, hideit, actbt = 0, changecolor, gogogo, back, more} = this.props;
//从左到右依次的变量  :

// 区域名字 风场名字  月份名字  全局ip  宽度  前十后十更多的高亮   ajax返回的数据   点击返回返回的页面   风场名  健康度  风机名 健康度 全局风场id  风场名  健康度  返回的方法   点击更多的小× 月份高亮值   改变月份高亮的方法   前十的方法  后十的方法  更多的方法

        return (
            <div className={styles.box}>

               {/*点击更多的组件 */}

                <div className={styles.light} id="light"></div>
                <div className={`${styles.boxhidden} ${styles.box_shadow}`} id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo1}></div>
                        <div className={styles.logo30}>{mon + w0 + w10 + "各风机健康度"}</div>
                        <span onClick={() => hideit(healthy3, namex3)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                        <Hly_rs height={450}
                                powerValue={healthy3}
                                barRotimes={namex3} widths={width0}
                                text={''}></Hly_rs>
                    </div>
                </div>

                {/*遍历月份,数据来源于Healthy-data.js */}

                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt === key ? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={() => changecolor(value, key, ipUrl)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={() => returnit(befor_pages)}>返回</div>
                </div>

                {/*导入第一个健康度的组件t */}

                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_t
                            barLoTime={namex1}
                            barLoPowerValue={healthy1}
                            text={mon + "各区域健康度"}></Hly_t>
                        <div className={styles.logo1}>
                        </div>
                    </div>
                </div>

                 {/*导入第二个和第三个健康度的组件t */}

                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_r height={400}
                               barRotime={namex2}
                               barLoPowerValue={healthy2}
                               text={mon + w0 + "各风场健康度" }></Hly_r>
                        <div className={styles.logomini}>

                        </div>
                    </div>
                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox30}>
                        </div>

                        {/* 前十后十更多 */}

                        <div className={styles.rbox3}>
                            <button className={bt0 === 0 ? styles.button : styles.button22}
                                    onClick={() => gogogo(bt0, actbt, hhdata, ipUrl, wfid)}>前10
                            </button>
                            <button className={bt0 === 1 ? styles.button : styles.button22}
                                    onClick={() => back(bt0, actbt, hhdata, ipUrl, wfid)}>后10
                            </button>
                            <button className={styles.button22} onClick={() => more(bt0, actbt, hhdata, ipUrl, wfid)}>
                                更多
                            </button>
                        </div>
                        <div className={styles.rbox4}>
                            <Hly_rs height={400}
                                    powerValue={healthy3}
                                    barRotimes={namex3}
                                    text={mon + w0 + w10 + "各风机健康度"}></Hly_rs>
                            <div className={styles.logomini}>
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
        actbt: state.vars.actbt,        //前十后十的高亮
        wind: state.vars.wind,          //月份数据来源
        w0: state.vars.w1,              //区域名
        w10: state.vars.w11,            //风场名
        mon: state.vars.mon,            //月份名
        bt0: state.vars.bt0,            //前十后十高亮
        ipUrl: state.vars.ipUrl,        //数据ip
        wfid: state.vars.wfid,          //风场ID
        healthy1: state.vars.healthy1,  //健康度
        namex1: state.vars.namex1,      //区域名
        healthy2: state.vars.healthy2,  //健康度
        namex2: state.vars.namex2,      //风场名
        namex3: state.vars.namex3,      //风机名
        healthy3: state.vars.healthy3,  //健康度
        hhdata: state.vars.hhdata,      //整体数据
        width0: state.vars.width0,      //组件宽度


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {    //进入页面获取数据
            var obj = {
                test: ''
            }
            dispatch(actions.setVars('bt0', 0));
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/Health/getCompanyAreaHealth',
                async: false,
                data: {
                    "month": month2,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('hhdata', data));
                    dispatch(actions.setVars('actbt', 10));
                    dispatch(actions.setVars('mon', month2 + "月"));
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[2]) {
                        barlopowerp1.push(data.data[2][i].groupname);    //区域的横坐标
                        barlopowers1.push(data.data[2][i].areaHealth);   //计划发电量

                    }

                    let barlopowers2 = [];
                    let barlopowerp2 = [];

                    for (var i in data.data[1]) {
                        barlopowers2.push(data.data[1][i].wfHealth);    //区域的横坐标
                        barlopowerp2.push(data.data[1][i].wfname);    //区域的横坐标

                    }
                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i = 0; i < 10; i++) {
                        barlopowers3.push(data.data[0][i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[0][i].wtname);    //区域的横坐标

                    }
                    dispatch(actions.setVars('healthy1', barlopowers1));
                    dispatch(actions.setVars('namex1', barlopowerp1));
                    dispatch(actions.setVars('healthy2', barlopowers2));
                    dispatch(actions.setVars('namex2', barlopowerp2));
                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));

                    let w0 = data.data[2][0].groupname;
                    let w10 = data.data[1][0].wfname;
                    dispatch(actions.setVars('w1', w0));
                    dispatch(actions.setVars('w11', w10));


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
        changecolor: (value, key, ipUrl) => {    //点击月份获取数据
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('windplan', value.plan));
            dispatch(actions.setVars('windplan1', value.plan));

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/Health/getCompanyAreaHealth',
                async: false,
                data: {
                    "month": key + 1,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('hhdata', data));

                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[2]) {
                        barlopowerp1.push(data.data[2][i].groupname);    //区域的横坐标
                        barlopowers1.push(data.data[2][i].areaHealth);   //计划发电量

                    }

                    let barlopowers2 = [];
                    let barlopowerp2 = [];

                    for (var i in data.data[1]) {
                        barlopowers2.push(data.data[1][i].wfHealth);    //区域的横坐标
                        barlopowerp2.push(data.data[1][i].wfname);    //区域的横坐标

                    }
                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i = 0; i < 10; i++) {
                        barlopowers3.push(data.data[0][i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[0][i].wtname);    //区域的横坐标

                    }
                    let w10 = data.data[1][0].wfname;
                    dispatch(actions.setVars('w11', w10));
                    dispatch(actions.setVars('healthy1', barlopowers1));
                    dispatch(actions.setVars('namex1', barlopowerp1));
                    dispatch(actions.setVars('healthy2', barlopowers2));
                    dispatch(actions.setVars('namex2', barlopowerp2));
                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));


                },
                error: function () {

                },
            })
        },
        gogogo: (bt0, actbt, hhdata, ipUrl, wfid) => {    //点击前十获取数据
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/Health/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type": "0",
                    "year": ""

                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i = 0; i < 10; i++) {
                        barlopowers3.push(data.data[i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[i].wtname);    //区域的横坐标
                    }

                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));

                },
                error: function () {

                },
            })


        },
        back: (bt0, actbt, hhdata, ipUrl, wfid) => {    //点击后十获取数据
            dispatch(actions.setVars('bt0', 1));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/Health/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type": "1",
                    "year": ""

                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i = 0; i < 10; i++) {
                        barlopowers3.push(data.data[i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[i].wtname);    //区域的横坐标
                    }

                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));

                },
                error: function () {

                },
            })
        },
        more: (bt0, actbt, hhdata, ipUrl, wfid) => {     //点击更多获取数据
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/Health/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type": "2",
                    "year": ""

                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i in data.data) {
                        barlopowers3.push(data.data[i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[i].wtname);    //区域的横坐标
                    }
                    let width0 = barlopowerp3.length * 60;
                    dispatch(actions.setVars('width0', width0));
                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));
                },
                error: function () {

                },
            })

            $("#boxhidden").show();
            $("#light").show();


        },
        hideit: (healthy3, namex3) => {    //点击×获取数据
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c = [];
            for (var i = 0; i < 10; i++) {

                barLotime3c[i] = healthy3[i];    //区域的横坐标
                power3c[i] = namex3[i];
            }
            dispatch(actions.setVars('healthy3', barLotime3c))
            dispatch(actions.setVars('namex3', power3c))


            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit: (befor_pages) => {     //返回上级页面
            dispatch(actions.setVars('showPage', befor_pages));

        },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
