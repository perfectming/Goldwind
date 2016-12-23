import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_tsa from './Hly_tsa.jsx';
import Hly_tsb from './Hly_tsb.jsx';
import Hly_ds from './Hly_ds.jsx';

var actions = require('redux/actions');
var $ = require('jquery');


let Component = React.createClass({
    componentWillMount() {
        let {ipUrl}=this.props
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {wfid, ipUrl, bt0 = 0,width0, hhdata,hhdata2,hhdata3, w0 = "巴盟", w10 , mon, befor_pages = 'group', returnit, hideit, arr, arr2, arr3, gogogo, back, more, actbt = 10, changecolor, wc1, wc2, runtime, downtime, tba0, name0, name2, runtime2, downtime2, tba2, name3, runtime3, downtime3, tba3} = this.props;

        let data = require('./Healthy-data');
        let month = data.data.line_month;
        let button = data.data.button;


        return (




            <div className={styles.box}>
                <div className={styles.light} id="light"></div>
                <div className={`${styles.boxhidden} ${styles.box_shadow}`} id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo3}></div>
                        <div className={styles.logo30}>
                            {mon + w0 + w10 + "各风机TBA"}
                        </div>
                        <span onClick={() => hideit(hhdata3, bt0)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                        <Hly_ds text={''}
                                height={450}
                                widths={width0}
                                names={'TBA'}
                                name2={name2}
                                runtime2={runtime2}
                                downtime2={downtime2}
                                tba2={tba2}></Hly_ds>
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


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_tsb text={mon + "巴盟TBA"}
                                 names={'TBA'}
                                 name3={name3}
                                 runtime3={runtime3}
                                 downtime3={downtime3}
                                 tba3={tba3}></Hly_tsb>
                        <div className={styles.logo3}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_tsa text={mon+"巴盟各风场TBA"}
                                 height={400}
                                 names={'TBA'}
                                 name0={name0}
                                 runtime={runtime}
                                 downtime={downtime}
                                 tba0={tba0}></Hly_tsa>
                        <div className={styles.logomini3}>

                        </div>
                    </div>

                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox30}>

                        </div>
                        <div className={styles.rbox3}>
                            <button className={bt0 === 0 ? styles.button : styles.button22}
                                    onClick={() => gogogo(bt0, ipUrl, wfid,actbt)}>前10
                            </button>
                            <button className={bt0 === 1 ? styles.button : styles.button22}
                                    onClick={() => back(bt0, ipUrl, wfid,actbt)}>后10
                            </button>
                            <button className={styles.button22} onClick={() => more(hhdata3, wfid)}>更多</button>
                        </div>


                        <div className={styles.rbox4}>
                            <Hly_ds text={mon + w0 + w10 + "各风机TBA"}
                                    names={'TBA'}
                                    name2={name2}
                                    runtime2={runtime2}
                                    downtime2={downtime2}
                                    tba2={tba2}></Hly_ds>
                            <div className={styles.logomini3}>

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
        hhdata: state.vars.hhdata,
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
        name3: state.vars.name3,
        runtime3: state.vars.runtime3,
        downtime3: state.vars.downtime3,
        tba3: state.vars.tba3,
        mon: state.vars.mon,
        w0: state.vars.w1,
        w10: state.vars.w11,
        ipUrl: state.vars.ipUrl,
        wfid:state.vars.wfid,
        bt0:state.vars.bt0,
        width0:state.vars.width0,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            var obj = {
                test: ''
            }
            dispatch(actions.setVars('bt0', 0));
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();

            dispatch(actions.setVars('actbt',  10));
            dispatch(actions.setVars('mon',  month2+"月"));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getAllGByM',
                async: false,
                data: {
                    "month": month2,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    dispatch(actions.setVars('hhdata1', data));

                    //各区域   一区域二区域
                    let runtime3 = [];       //实际发电量
                    let downtime3 = [];       //故障损失
                    let tba3 = [];       //维护损失
                    let name3 = [];
                    let wfid1 = [];
                    for (let i in data.data) {
                        //区域的横坐标

                        name3.push(data.data[i].groupname)
                        runtime3.push(data.data[i].runtimes);   //实际发电量
                        downtime3.push(data.data[i].downtimes);   //故障损失
                        tba3.push(data.data[i].tba.toFixed(3)*100);      //维护损失

                    }

                    dispatch(actions.setVars('name3', name3));
                    dispatch(actions.setVars('runtime3', runtime3));
                    dispatch(actions.setVars('downtime3', downtime3));
                    dispatch(actions.setVars('tba3', tba3));


                },
                error: function () {

                },
            })
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getGroupAllWfByM',
                async: false,
                data: {
                    "groupid": '201612121721151',
                    "month": month2,
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
                        runtime1.push(data.data[i].runtimes);   //实际发电量
                        downtime1.push(data.data[i].downtimes);   //故障损失
                        tba1.push(data.data[i].tba.toFixed(3)*100);     //维护损失
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
                url: 'http://' + ipUrl + '/wbi/TBA/getWfAllWtByM',
                async: false,
                data: {
                    "groupid": '201612121721151',
                    "month": month2,
                    "wfid": '150801',
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

                    for (var i =0;i<=10;i++) {
                        //区域的横坐标

                        name2.push(data.data[i].wtname)
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(data.data[i].tba.toFixed(3)*100);    //维护损失
                    }

                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error: function () {

                },
            })
        },
        init: () => {
            // dispatch(actions.setVars('ip', ip));
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

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getAllGByM',
                async: false,
                data: {
                    "month": key+1,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    dispatch(actions.setVars('hhdata1', data));

                    //各区域   一区域二区域
                    let runtime3 = [];       //实际发电量
                    let downtime3 = [];       //故障损失
                    let tba3 = [];       //维护损失
                    let name3 = [];
                    let wfid1 = [];
                    for (let i in data.data) {
                        //区域的横坐标

                        name3.push(data.data[i].groupname)
                        runtime3.push(data.data[i].runtimes);   //实际发电量
                        downtime3.push(data.data[i].downtimes);   //故障损失
                        tba3.push(data.data[i].tba.toFixed(3)*100);  //维护损失

                    }

                    dispatch(actions.setVars('name3', name3));
                    dispatch(actions.setVars('runtime3', runtime3));
                    dispatch(actions.setVars('downtime3', downtime3));
                    dispatch(actions.setVars('tba3', tba3));


                },
                error: function () {

                },
            })
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getGroupAllWfByM',
                async: false,
                data: {
                    "groupid": '201612121721151',
                    "month": key+1,
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
                        runtime1.push(data.data[i].runtimes);   //实际发电量
                        downtime1.push(data.data[i].downtimes);   //故障损失
                        tba1.push(data.data[i].tba.toFixed(3)*100);   //维护损失
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
                url: 'http://' + ipUrl + '/wbi/TBA/getWfAllWtByM',
                async: false,
                data: {
                    "groupid": '201612121721151',
                    "month": key+1,
                    "wfid": '150801',
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

                    for (var i =0;i<=10;i++) {
                        //区域的横坐标

                        name2.push(data.data[i].wtname)
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(data.data[i].tba.toFixed(3)*100);   //维护损失
                    }

                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error: function () {

                },
            })

        },
        gogogo: (bt0, ipUrl, wfid,actbt) => {
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150828' : wfid,
                    "type": "0",
                    "year": '2016',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    let name2 = [];
                    let runtime2 = [];       //实际发电量
                    let downtime2 = [];       //故障损失
                    let tba2 = [];       //维护损失


                    for (let i =0;i<10;i++) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname);
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(data.data[i].tba.toFixed(3)*100);   //维护损失

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
        back: (bt0, ipUrl, wfid,actbt) => {

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150828' : wfid,
                    "type": "1",
                    "year": '2016',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let runtime2 = [];       //实际发电量
                    let downtime2 = [];       //故障损失
                    let tba2 = [];       //维护损失
                    let name2 = [];      //故障损失


                    for (var i =0;i<10;i++) {
                        //区域的横坐标

                        name2.push(data.data[i].wtname)
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(data.data[i].tba.toFixed(3)*100);  //维护损失
                    }

                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('bt0', 1));

                },
                error: function () {

                },
            });
        },
        more: (hhdata3,wfid) => {
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c = [];       //计划发电量
            let wrong30c = [];       //实际发电量
            let wrong31c = [];       //实际发电量


            for (var i in hhdata3.data) {

                barLotime3c.push(hhdata3.data[i].wtname)   //区域的横坐标
                power3c.push(hhdata3.data[i].runtimes) //实际发电量
                wrong30c.push(hhdata3.data[i].downtimes);   //故障损失
                wrong31c.push(hhdata3.data[i].tba.toFixed(3)*100);  //故障损失

            }
            let width0=barLotime3c.length*60;
            dispatch(actions.setVars('width0', width0));
            dispatch(actions.setVars('name2', barLotime3c))
            dispatch(actions.setVars('runtime2', power3c))
            dispatch(actions.setVars('downtime2', wrong30c))
            dispatch(actions.setVars('tba2', wrong31c))


            $("#boxhidden").show();
            $("#light").show();
        },
        hideit: (hhdata3, bt0) => {





            let runtime2=[];       //实际发电量
            let downtime2=[];       //故障损失
            let tba2=[];       //维护损失
            let name2=[];
            for (var i=0;i<=10;i++) {
                //区域的横坐标
                name2.push(hhdata3.data[i].wtname)
                runtime2.push(hhdata3.data[i].runtimes);   //实际发电量
                downtime2.push(hhdata3.data[i].downtimes);   //故障损失
                tba2.push(hhdata3.data[i].tba.toFixed(3)*100);    //维护损失

            }

            dispatch(actions.setVars('name2', name2));
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
