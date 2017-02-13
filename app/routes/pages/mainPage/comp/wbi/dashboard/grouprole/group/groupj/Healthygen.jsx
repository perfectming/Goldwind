import React from 'react';
import {connect} from 'react-redux';
import styles from '../../area/Hindex.scss';
import Hly_gen from './Hly_gen.jsx';
import Hly_gens from '../../area/Hly_gens.jsx';
import Hly_genp from '../../area/Hly_genp.jsx';
import Login from '../../../../../../../../../components/common/Loading.jsx';
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
        let {wfid, ipUrl,boll3=false, barlotimes1, skinStyle, bt0 = 0, width0,mapmonth, barlopowers1, barlopowerp1, barlotimes2, barlopowers2, barlopowerp2, barlotimes3, barlopowers3, barlopowerp3, hhdata, hhdata1, w0, w10, mon, befor_pages = 'group', returnit, hideit, arr, arr2, arr3, gogogo, back, more, actbt = 10, changecolor, wc1, wc2} = this.props;

        let data = require('./../../area/Healthy-data');
        let month = data.data.line_month;
        let button = data.data.button;

        if(boll3){
        return (
            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
                <div className={styles.light} id="light"></div>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`} id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo5}></div>
                        <div className={styles.logo30}>
                            {mon + w0 + w10 + "各风机发电量"}
                        </div>
                        <span onClick={() => hideit(hhdata, bt0)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                        <Hly_genp height={450} widths={width0}
                                  name0={barlotimes3}
                                  power1={barlopowers3}
                                  power2={barlopowerp3}
                                  text={''}></Hly_genp>
                    </div>

                </div>


                <div className={styles.onmonth}>
                    {
                        mapmonth.map((value, key) => {
                            return (
                                <div className={actbt === key ? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={() => changecolor(mapmonth, key, ipUrl)}>
                                    {value.yearpoweract+"月"}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={() => returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_gen text={mon + "集团各区域发电量"}
                                 jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                 name0={barlotimes1}
                                 power1={barlopowers1}
                                 power2={barlopowerp1}
                                 pengpeng={hhdata}></Hly_gen>
                        <div className={styles.logo5}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_gens height={400}
                                  jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                  name0={barlotimes2}
                                  power1={barlopowers2}
                                  power2={barlopowerp2}
                                  text={mon + w0 + "各风场发电量" }></Hly_gens>
                        <div className={styles.logomini5}>

                        </div>
                    </div>

                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox30}>

                        </div>
                        <div className={styles.rbox3}>
                            <button className={bt0 === 0 ? styles.button : styles.button22}
                                    onClick={() => gogogo(bt0, w0, wc1, wc2, actbt, hhdata, ipUrl, wfid,mapmonth)}>前10
                            </button>
                            <button className={bt0 === 1 ? styles.button : styles.button22}
                                    onClick={() => back(bt0, w0, wc1, wc2, actbt, hhdata, ipUrl, wfid,mapmonth)}>后10
                            </button>
                            <button className={styles.button22}
                                    onClick={() => more(bt0, w0, wc1, wc2, actbt, hhdata, ipUrl, wfid,mapmonth)}>更多
                            </button>
                        </div>


                        <div className={styles.rbox4}>
                            <Hly_genp height={400}
                                      jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                      name0={barlotimes3}
                                      power1={barlopowers3}
                                      power2={barlopowerp3}
                                      text={mon + w0 + w10 + "各风机发电量"}></Hly_genp>
                            <div className={styles.logomini5}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );}else {
            return (<Login></Login>)
        }
    }
});


const mapStateToProps = (state) => {
    return {
        hhdata: state.vars.hhdata,
        hhdata1: state.vars.hhdata1,
        actbt: state.vars.actbt,
        wind: state.vars.wind,
        winds: state.vars.winds,
        arr: state.vars.arr,
        arr2: state.vars.arr2,
        arr3: state.vars.arr3,
        w0: state.vars.w1,
        w10: state.vars.w11,
        wc1: state.vars.wc1,
        wc2: state.vars.wc2,
        mon: state.vars.mon,
        windplan: state.vars.windplan,
        barlotimes1: state.vars.barlotimes1,
        barlopowers1: state.vars.barlopowers1,
        barlopowerp1: state.vars.barlopowerp1,
        barlotimes2: state.vars.barlotimes2,
        barlopowers2: state.vars.barlopowers2,
        barlopowerp2: state.vars.barlopowerp2,
        barlotimes3: state.vars.barlotimes3,
        barlopowers3: state.vars.barlopowers3,
        barlopowerp3: state.vars.barlopowerp3,
        bt0: state.vars.bt0,
        ipUrl: state.vars.ipUrl,
        wfid: state.vars.wfid,
        width0: state.vars.width0,
        skinStyle: state.vars.skinStyle,
        mapmonth: state.vars.mapmonth,
        boll3: state.vars.boll3,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/BaseData/getYearAndMonthList',
                async: false,
                data: {},
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    
                    dispatch(actions.setVars('mapmonth', data.data));
                    dispatch(actions.setVars('actbt', 10));
                    jiang(data.data);
                },
                error: function () {
                    console.log("数据获取失败");
                },
            });


            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if (month2 == 0) {
                month2 = 12;
            }
            function jiang(year) {

                
                $.ajax({
                    type: 'post',
                    url: 'http://' + ipUrl + '/wbi/ELEC/getSpaceElec',
                    async: false,
                    data: {
                        "year": year[10].year,
                        "month": year[10].yearpoweract,
                    },
                    dataType: 'json',
                    timeout: '3000',
                    success: function (data) {
                        dispatch(actions.setVars('hhdata', data));
                        dispatch(actions.setVars('mon', year[10].yearpoweract + "月"));

                        let barlotimes1 = [];
                        let barlopowers1 = [];
                        let barlopowerp1 = [];
                        for (var i in data.data[2]) {
                            barlotimes1.push(data.data[2][i].groupname);    //区域的横坐标
                            barlopowers1.push(Number((data.data[2][i].powerplan).toFixed(2)));   //计划发电量
                            barlopowerp1.push(Number((data.data[2][i].poweract).toFixed(2)));  //实际发电量
                        }

                        let barlotimes2 = [];
                        let barlopowers2 = [];
                        let barlopowerp2 = [];
                        for (var i in data.data[1]) {
                            barlotimes2.push(data.data[1][i].wfname);    //区域的横坐标
                            barlopowers2.push(Number((data.data[1][i].powerplan).toFixed(2)));   //计划发电量
                            barlopowerp2.push(Number((data.data[1][i].poweract).toFixed(2)));  //实际发电量
                        }
                        let barlotimes3 = [];
                        let barlopowers3 = [];
                        let barlopowerp3 = [];
                        for (var i = 0; i < 10; i++) {
                            barlotimes3.push(data.data[0][i].wtname);    //区域的横坐标
                            barlopowers3.push(Number((data.data[0][i].powerplan).toFixed(2)));   //计划发电量
                            barlopowerp3.push(Number((data.data[0][i].poweract).toFixed(2)));   //实际发电量
                        }

                        dispatch(actions.setVars('barlotimes1', barlotimes1));
                        dispatch(actions.setVars('barlopowers1', barlopowers1));
                        dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                        dispatch(actions.setVars('barlotimes2', barlotimes2));
                        dispatch(actions.setVars('barlopowers2', barlopowers2));
                        dispatch(actions.setVars('barlopowerp2', barlopowerp2));

                        dispatch(actions.setVars('barlotimes3', barlotimes3));
                        dispatch(actions.setVars('barlopowers3', barlopowers3));
                        dispatch(actions.setVars('barlopowerp3', barlopowerp3));

                        let w0 = data.data[2][0].groupname;
                        let w10 = data.data[1][0].wfname;
                        dispatch(actions.setVars('w1', w0));
                        dispatch(actions.setVars('w11', w10));
                        dispatch(actions.setVars('boll3', true));


                    },
                    error: function () {

                    },
                })
            }

        },
        init: () => {
            var obj = {
                test: ''
            }
        },
        changecolor: (value, key, ipUrl) => {
            dispatch(actions.setVars('mon', value[key].yearpoweract+"月"));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('bt0', 0));


            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/ELEC/getSpaceElec',
                async: false,
                data: {
                    "year":value[key].year,
                    "month": value[key].yearpoweract,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    dispatch(actions.setVars('hhdata', data));


                    let barlotimes1 = [];
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[2]) {
                        barlotimes1.push(data.data[2][i].groupname);    //区域的横坐标
                        barlopowers1.push(Number((data.data[2][i].powerplan).toFixed(2)));   //计划发电量
                        barlopowerp1.push(Number((data.data[2][i].poweract).toFixed(2))); //实际发电量
                    }

                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i in data.data[1]) {
                        barlotimes2.push(data.data[1][i].wfname);    //区域的横坐标
                        barlopowers2.push(Number((data.data[1][i].powerplan).toFixed(2)));   //计划发电量
                        barlopowerp2.push(Number((data.data[1][i].poweract).toFixed(2)));   //实际发电量
                    }
                    let barlotimes3 = [];
                    let barlopowers3 = [];
                    let barlopowerp3 = [];
                    for (var i = 0; i < 10; i++) {
                        barlotimes3.push(data.data[0][i].wtname);    //区域的横坐标
                        barlopowers3.push(Number((data.data[0][i].powerplan).toFixed(2)));  //计划发电量
                        barlopowerp3.push(Number((data.data[0][i].poweract).toFixed(2)));   //实际发电量
                    }

                    dispatch(actions.setVars('barlotimes1', barlotimes1));
                    dispatch(actions.setVars('barlopowers1', barlopowers1));
                    dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));

                    dispatch(actions.setVars('barlotimes3', barlotimes3));
                    dispatch(actions.setVars('barlopowers3', barlopowers3));
                    dispatch(actions.setVars('barlopowerp3', barlopowerp3));

                    let w0 = data.data[2][0].groupname;
                    let w10 = data.data[1][0].wfname;
                    dispatch(actions.setVars('w1', w0));
                    dispatch(actions.setVars('w11', w10));
                },
                error: function () {

                },
            })

        },
        gogogo: (bt0, w0, wc1, wc2, actbt, hhdata, ipUrl, wfid,mapmonth) => {
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "month": mapmonth[actbt].yearpoweract,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type": "0",
                    "year": mapmonth[actbt].year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失


                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(Number((data.data[i].powerplan).toFixed(2)));   //实际发电量
                        wrong30c.push(Number((data.data[i].poweract).toFixed(2)));  //故障损失

                    }

                    dispatch(actions.setVars('barlotimes3', barLotime3c))
                    dispatch(actions.setVars('barlopowers3', power3c))
                    dispatch(actions.setVars('barlopowerp3', wrong30c))


                },
                error: function () {

                },
            });


        },
        back: (bt0, w0, wc1, wc2, actbt, hhdata, ipUrl, wfid,mapmonth) => {
            dispatch(actions.setVars('bt0', 1));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "month": mapmonth[actbt].yearpoweract,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type": "1",
                    "year": mapmonth[actbt].year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失


                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(Number((data.data[i].powerplan).toFixed(2)));   //实际发电量
                        wrong30c.push(Number((data.data[i].poweract).toFixed(2)));  //故障损失

                    }

                    dispatch(actions.setVars('barlotimes3', barLotime3c))
                    dispatch(actions.setVars('barlopowers3', power3c))
                    dispatch(actions.setVars('barlopowerp3', wrong30c))


                },
                error: function () {

                },
            });
        },
        more: (bt0, w0, wc1, wc2, actbt, hhdata, ipUrl, wfid,mapmonth) => {
            dispatch(actions.setVars('bt0', 2));

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "month": mapmonth[actbt].yearpoweract,
                    "groupid": '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type": "2",
                    "year": mapmonth[actbt].year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失


                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(Number((data.data[i].powerplan).toFixed(2)));  //实际发电量
                        wrong30c.push(Number((data.data[i].poweract).toFixed(2)));   //故障损失

                    }
                    let width0 = barLotime3c.length * 60;
                    dispatch(actions.setVars('width0', width0));


                    dispatch(actions.setVars('barlotimes3', barLotime3c))
                    dispatch(actions.setVars('barlopowers3', power3c))
                    dispatch(actions.setVars('barlopowerp3', wrong30c))


                },
                error: function () {

                },
            });


            $("#boxhidden").show();
            $("#light").show();
        },
        hideit: (hhdata, bt0) => {
            dispatch(actions.setVars('bt0', 0));
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c = [];       //计划发电量
            let wrong30c = [];       //实际发电量


            for (var i = 0; i < 10; i++) {

                barLotime3c[i] = hhdata.data[0][i].wtname;    //区域的横坐标
                power3c[i] = hhdata.data[0][i].powerplan;  //实际发电量
                wrong30c[i] = hhdata.data[0][i].poweract;   //故障损失

            }

            dispatch(actions.setVars('barlotimes3', barLotime3c))
            dispatch(actions.setVars('barlopowers3', power3c))
            dispatch(actions.setVars('barlopowerp3', wrong30c))
            dispatch(actions.setVars('bt0', 0))


            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));

        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
