import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Pro_one from './Pro_one.jsx';
import Pro_two from './Pro_two.jsx';

var actions = require('redux/actions');
let ip = "10.9.101.15";

let data = require('./Healthy-data');
let text222 = data.data.line_date;

let Component = React.createClass({
    componentWillMount() {
        let {ipUrl}=this.props
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {hhdata, mon, w0 = "巴盟", w10, hhdata1, width0, hhdata2, hhdata3, changecolor, befor_pages = 'area', bt0, ipUrl, wfid, actbt = 10, returnit, ip = "10.68.100.32", runtime, downtime, tba0, name0, name2, runtime2, downtime2, tba2, gogogo, back, more, hideit} = this.props;

        return (




            <div className={styles.box}>
                {/*返回按钮*/}
                <div className={styles.light} id="light"></div>
                <div className={`${styles.boxhidden} ${styles.box_shadow}`} id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo4}></div>
                        <div className={styles.logo30}>
                            {mon + w10 + "各风机年收益"}
                        </div>
                        <span onClick={() => hideit(hhdata3, bt0)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                        <Pro_two text={''}
                                 height={450}
                                 widths={width0}
                                 names={'TBA'}
                                 name2={name2}
                                 runtime2={runtime2}
                                 downtime2={downtime2}
                                 tba2={tba2 }></Pro_two>
                    </div>

                </div>

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
                <div className={styles.tbox}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Pro_one text={mon + "巴盟各风场年收益"}
                                 names={''}
                                 name0={name0}
                                 runtime={runtime}
                                 downtime={downtime}
                                 tba0={tba0}></Pro_one>
                        <div className={styles.logo4}>
                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox} ${styles.logofa}`}>
                    <div className={`  ${styles.box_shadow}  ${styles.fbox2}`}>
                        <div className={styles.rbox33}>
                            <button className={bt0 === 0 ? styles.button : styles.button22}
                                    onClick={() => gogogo(bt0, ipUrl, wfid, actbt)}>前10
                            </button>
                            <button className={bt0 === 1 ? styles.button : styles.button22}
                                    onClick={() => back(bt0, ipUrl, wfid, actbt)}>后10
                            </button>
                            <button className={styles.button22} onClick={() => more(bt0, ipUrl, wfid, actbt)}>更多</button>
                        </div>
                        <Pro_two text={mon + w10 + "各风机年收益"}
                                 names={'TBA'}
                                 name2={name2}
                                 runtime2={runtime2}
                                 downtime2={downtime2}
                                 tba2={tba2}></Pro_two>
                        <div className={styles.logomini4}>

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
        hhdata1: state.vars.hhdata1,
        hhdata2: state.vars.hhdata2,
        hhdata3: state.vars.hhdata3,
        name0: state.vars.name1,
        runtime: state.vars.runtime1,
        downtime: state.vars.downtime1,
        tba0: state.vars.tba1,
        name2: state.vars.name2,
        runtime2: state.vars.runtime2,
        downtime2: state.vars.downtime2,
        tba2: state.vars.tba2,
        mon: state.vars.mon,
        w0: state.vars.w1,
        w10: state.vars.w11,
        ipUrl: state.vars.ipUrl,
        wfid: state.vars.wfid,
        bt0: state.vars.bt0,
        width0: state.vars.width0,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            var obj = {
                test: ''
            }

            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
                year=year-1;
            }
            let day = new Date(year, month2, 0);
            let daycountT = day.getDate();

            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('actbt', month2-1));
            dispatch(actions.setVars('mon', month2 + "月"));
            $.ajax({
                type: 'post',
                url: 'http://'+ipUrl+'/wbi/yield/getYieldByGroupid',
                async: false,
                data: {
                    'startdate': year + "-" + month2 + "-" + '1',
                    'enddate': year + "-" + month2 + "-" + daycountT,
                    'groupid': '201612121721151',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    dispatch(actions.setVars('hhdata2', data));
                    dispatch(actions.setVars('w11', data.data[0].wfname));

                    //各区域   一区域二区域
                    let runtime1 = [];       //实际发电量
                    let downtime1 = [];       //故障损失
                    let tba1 = [];       //维护损失
                    let name1 = [];
                    let wfid1 = [];
                    for (var i in data.data) {
                        //区域的横坐标
                        name1.push(data.data[i].wfname)
                        runtime1.push(data.data[i].earning);   //实际发电量
                        downtime1.push(data.data[i].costs);   //故障损失//维护损失
                        tba1.push(Number((data.data[i].rate * 100).toFixed(2)));     //故障损失//维护损失
                        wfid1.push(data.data[0].wfid);   //维护损失

                    }


                    dispatch(actions.setVars('name1', name1));
                    dispatch(actions.setVars('runtime1', runtime1));
                    dispatch(actions.setVars('downtime1', downtime1));
                    dispatch(actions.setVars('tba1', tba1));


                },
                error: function () {

                },
            })

            $.ajax({
                type: 'post',
                url: 'http://'+ipUrl+'/wbi/yield/getYieldByWfid',
                async: false,
                data: {
                    'wfid': '150828',
                    'startdate': year + "-" + month2 + "-" + '1',
                    'enddate': year + "-" + month2 + "-" + daycountT,
                    'methods': 'desc',

                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('hhdata3', data));
                    //各区域   一区域二区域


                    let runtime2 = [];       //实际发电量
                    let downtime2 = [];       //故障损失
                    let tba2 = [];       //维护损失
                    let name2 = [];
                    for (var i = 0; i < 10; i++) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname);
                        runtime2.push(data.data[i].earning);   //实际发电量//故障损失
                        downtime2.push(data.data[i].costs); //维护损失
                        tba2.push(Number((data.data[i].rate * 100).toFixed(2))); //维护损失

                    }
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('name2', name2));

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
        changecolor: (value, key, ipUrl) => {
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind', value.plan));
            dispatch(actions.setVars('winds', value.actrul));
            dispatch(actions.setVars('windss', value.actruls));


            let monthh = key + 1;
            let datee = new Date;
            let year = datee.getFullYear();
            let month2=datee.getMonth();
            if(month2==0){
                    year=year-1;
            }
            let day = new Date(year, monthh, 0);
            let daycount = day.getDate();    //获取天数：

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/yield/getYieldByGroupid',
                async: false,
                data: {
                    'startdate': year + "-" + (key + 1) + "-" + '1',
                    'enddate': year + "-" + (key + 1) + "-" + daycount,
                    'groupid': '201612121721151',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('hhdata2', data));
                    //先定义一个空数组
                    let runtime1 = [];
                    let downtime1 = [];
                    let tba1 = [];
                    let name1 = [];
                    for (var i in data.data) {
                        //区域的横坐标
                        name1.push(data.data[i].wfname)
                        runtime1.push(data.data[i].earning);   //收益
                        downtime1.push(data.data[i].costs);   //成本
                        tba1.push(Number((data.data[i].rate * 100).toFixed(2)));       //收益率(小数点后两位)

                    }
                    dispatch(actions.setVars('w11', data.data[0].wfname));
                    dispatch(actions.setVars('name1', name1));
                    dispatch(actions.setVars('runtime1', runtime1));
                    dispatch(actions.setVars('downtime1', downtime1));
                    dispatch(actions.setVars('tba1', tba1));


                },
                error: function () {

                },
            })
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/yield/getYieldByWfid',
                async: false,
                data: {
                    'startdate': year + "-" + (key + 1) + "-" + '1',
                    'enddate': year + "-" + (key + 1) + "-" + daycount,
                    'wfid': '150828',
                    'methods': 'desc',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('hhdata3', data));
                    //各区域   一区域二区域


                    let runtime2 = [];
                    let downtime2 = [];
                    let tba2 = [];
                    let name2 = [];
                    for (var i = 0; i < 10; i++) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname);
                        runtime2.push(data.data[i].earning);   //成本
                        downtime2.push(data.data[i].costs); //收益
                        tba2.push(Number((data.data[i].rate * 100).toFixed(2))); //收益率

                    }
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('name2', name2));

                },
                error: function () {

                },
            })
        },
        gogogo: (bt0, ipUrl, wfid, actbt) => {
            dispatch(actions.setVars('bt0', 0));
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
                year=year-1;
            }
            let day = new Date(year, actbt+1, 0);
            let daycount = day.getDate();

            console.log(year)
            console.log(month2)
            console.log(wfid)
            console.log(daycount)
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/yield/getYieldByWfid',
                async: false,
                data: {
                    'startdate':year+"-"+(actbt+1)+"-"+'1',
                    'enddate':year+"-"+(actbt+1)+"-"+daycount,
                    "wfid": wfid == undefined ? '150828' : wfid,
                    'methods':'desc',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    console.log(data)
                    let name2 = [];
                    let runtime2 = [];       //实际发电量
                    let downtime2 = [];       //故障损失
                    let tba2 = [];       //维护损失

                    for (let i = 0; i < 10; i++) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname);
                        runtime2.push(data.data[i].earning);   //实际发电量
                        downtime2.push(data.data[i].costs);   //故障损失
                        tba2.push(Number((data.data[i].rate * 100).toFixed(2)));   //维护损失

                    }
                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error: function () {

                },
            });


        },
        back: (bt0, ipUrl, wfid, actbt) => {
            dispatch(actions.setVars('bt0', 1));
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
                year=year-1;
            }
            let day = new Date(year, actbt+1, 0);
            let daycount = day.getDate();
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/yield/getYieldByWfid',
                async: false,
                data: {
                    'startdate':year+"-"+(actbt+1)+"-"+'1',
                    'enddate':year+"-"+(actbt+1)+"-"+daycount,
                    "wfid": wfid == undefined ? '150828' : wfid,
                    'methods':'asc',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    let name2 = [];
                    let runtime2 = [];       //实际发电量
                    let downtime2 = [];       //故障损失
                    let tba2 = [];       //维护损失


                    for (let i = 0; i < 10; i++) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname);
                        runtime2.push(data.data[i].earning);   //实际发电量
                        downtime2.push(data.data[i].costs);   //故障损失
                        tba2.push(Number((data.data[i].rate * 100).toFixed(2)));   //维护损失

                    }
                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error: function () {

                },
            });
        },
        more: (bt0, ipUrl, wfid, actbt) => {
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
                year=year-1;
            }
            let day = new Date(year, actbt+1, 0);
            let daycount = day.getDate();

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/yield/getYieldByWfid',
                async: false,
                data: {
                    'startdate':year+"-"+(actbt+1)+"-"+'1',
                    'enddate':year+"-"+(actbt+1)+"-"+daycount,
                    "wfid": wfid == undefined ? '150828' : wfid,
                    'methods':'all',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    let name2 = [];
                    let runtime2 = [];       //实际发电量
                    let downtime2 = [];       //故障损失
                    let tba2 = [];       //维护损失

                    dispatch(actions.setVars('hhdata3', data));
                    for (let i in data.data) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname);
                        runtime2.push(data.data[i].earning);   //实际发电量
                        downtime2.push(data.data[i].costs);   //故障损失
                        tba2.push(Number((data.data[i].rate * 100).toFixed(2)));   //维护损失

                    }
                    let width0=name2.length*60;
                    dispatch(actions.setVars('width0', width0));
                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error: function () {

                },
            });


            $("#boxhidden").show();
            $("#light").show();
        },
        hideit: (hhdata3, bt0) => {


            let runtime2 = [];       //实际发电量
            let downtime2 = [];       //故障损失
            let tba2 = [];       //维护损失
            let name2 = [];
            for (let i = 0; i < 10; i++) {
                //区域的横坐标
                name2.push(hhdata3.data[i].wtname);
                runtime2.push(hhdata3.data[i].earning);   //实际发电量
                downtime2.push(hhdata3.data[i].costs);   //故障损失
                tba2.push(Number((hhdata3.data[i].rate * 100).toFixed(2)));   //维护损失

            }

            dispatch(actions.setVars('name2', name2));
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('runtime2', runtime2));
            dispatch(actions.setVars('downtime2', downtime2));
            dispatch(actions.setVars('tba2', tba2));


            $("#boxhidden").hide();
            $("#light").hide();
        },

        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
