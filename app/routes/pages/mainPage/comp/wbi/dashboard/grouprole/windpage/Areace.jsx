import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle3.scss';
import Windce from './Windce.jsx';
import icono2 from '../../../../../img/comp/wind_logo.png';
import icono1 from '../../../../../img/comp/wind_logo2.png';
import AlertWindow from '../../../KPI/AlertWindow';
import Login from '../../../../../../../../components/common/Loading.jsx';
var $ = require('jquery');
var actions = require('redux/actions');
let data = require('./../group/Profit-data3')
let Component = React.createClass({
    componentWillMount() {
        let {xxdwfId, xxdwfNa, ipUrl}=this.props;

        this.props.ajax(xxdwfId, xxdwfNa, ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {alertText,width, ipUrl, btn = 0, xxdwfId, xxdwfNa, actbt, changpage, wind, windP, gogogo, areaNamee, back, more, close, backtop, befor_pagee = 'windpage',  areaNameN, areaRecordCostN, areaRecordProfitN,mapmonth,mon,Go2=false,skinStyle}=this.props;
if(Go2){
        return (
             <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
                {//遮罩层
                     }

                <div className={styles.boxcover} id='boxcover'></div>
                {//更多弹出框
                }
                <AlertWindow text={alertText}></AlertWindow>
                <div className={styles.more} id="sss">
                    <div className={styles.moretitle}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                        <p>{mon + xxdwfNa + '各风机发电量'}</p>
                        <div className={styles.xx} onClick={() => close()}>x</div>
                    </div>
                    <div className={styles.scroll}>
                        <Windce areaNameX={areaNameN} areaRecordCostT={areaRecordCostN}
                                areaRecordProfitO={areaRecordProfitN} pointWidth={20} width={width} height={483} ly={10}
                                pointPlacement={0} borderRadius={4} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Windce>
                    </div>


                </div>
                <ul className={styles.monthbox}>
                    {
                        mapmonth.map((value, key) => {
                            return (<li className={actbt === key ? styles.red : styles.green}
                                        onClick={() => changpage(value, key, ipUrl, xxdwfId)}
                                        key={key}>{value.yearpoweract+'月'}</li>)
                        })
                    }

                    <li className={styles.back} onClick={() => backtop(befor_pagee,)}>返回</li>

                </ul>
                <div className={`${styles.bigbox} ${styles.shadow}`}>


                    <Windce areaNameX={areaNamee} areaRecordCostT={wind} areaRecordProfitO={windP} pointWidth={30}
                            height={800} text={mon+ xxdwfNa + '各风机发电量'} ly={40}
                            borderRadius={7} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Windce>


                    <div className={styles.imgqv}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                    <div className={`${styles.buttonsh} ${styles.buttonss}`}>
                        <button className={btn === 0 ? styles.btn0 : styles.btn1}
                                onClick={() => gogogo(actbt, ipUrl, xxdwfId,mapmonth)}> 前10
                        </button>
                        <button className={btn === 1 ? styles.btn0 : styles.btn1}
                                onClick={() => back(actbt, ipUrl, xxdwfId,mapmonth)}>后10
                        </button>
                        <button className={btn === 2 ? styles.btn0 : styles.btn1}
                                onClick={() => more(actbt, ipUrl, xxdwfId,mapmonth)}>更多
                        </button>
                    </div>
                </div>
            </div>


        );
}
else{
    return(
        <Login></Login>)
}
    }

});


const mapStateToProps = (state) => {

    return {
        actbt: state.vars.actbt,
        wind: state.vars.wind,
        windP: state.vars.windP,
        areaNameN: state.vars.areaNamenb,
        areaRecordCostN: state.vars.areaRecordCostNb,
        areaRecordProfitN: state.vars.areaRecordProfitNb,
        areaNamee: state.vars.areaNamee,
        befor_pagee: state.vars.befor_pagee,
        xxdwfId: state.vars.xxdwfId1,
        xxdwfNa: state.vars.xxdwfNa1,
        btn: state.vars.btnn,
        // 传过来的ip
        ipUrl: state.vars.ipUrl,
        width: state.vars.width1,
        mapmonth: state.vars.mapmonth,
        mon: state.vars.mon,
        Go2: state.vars.Go2,
        skinStyle: state.vars.skinStyle,
        alertText : state.vars.alertText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId, xxdwfNa, input_url) => {

            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
          //新建
             $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/BaseData/getYearAndMonthList',
                async: false,
                data: {},
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('mapmonth', data.data));
                    dispatch(actions.setVars('actbt', 10));
                    dispatch(actions.setVars('mon', data.data[10].yearpoweract + "月"));
                    // jiang(data.data);
                },
                error: function () {
                    console.log("数据获取失败");
                },
            });
             
             //结束            
            // 初始数据
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/ELEC/getWtAreaElec',
                async: false,
                data: {
                    'year': year,
                    'month': month,
                    'wfid': xxdwfId
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    let dataa = data.data;
                    for (let i = 0; i < 10; i++) {
                        // 风场名字
                        let xWild = data.data[i].wtname;
                        arr1.push(xWild);
                        // 计划发电量
                        let yPowerPlan = Number(data.data[i].powerplan.toFixed(2));
                        arr2.push(yPowerPlan);
                        // 实际发电量
                        let yPowerAct = Number(data.data[i].poweract.toFixed(2));
                        arr3.push(yPowerAct);
                    }

                },
                error: function () {

                },
            });
            dispatch(actions.setVars('areaNamee', arr1));
            dispatch(actions.setVars('wind', arr3));
            dispatch(actions.setVars('windP', arr2));
            dispatch(actions.setVars('btnn', 0));
            dispatch(actions.setVars('Go2', true));


        }
        ,
        init: () => {
            let obj = {
                test: ''
            }
        }
        ,
        // 点击月份变化
        changpage: (value, key, input_url, xxdwfId) => {

            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let areaids = [];
            let windids = [];

            let date = new Date();
            let monthh = date.getMonth();
            let year = date.getFullYear();
            let amonth=value.yearpoweract;
            if (monthh == 0) {
                monthh = 12;
                year = year - 1;
            }
            //获取对应风场下面的数据
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/ELEC/getWtAreaElec',
                async: false,
                data: {
                    'year': value.year,
                    'month': value.yearpoweract,
                    'wfid': xxdwfId,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    if(data.data.length==0){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '暂无数据'));
                    }else{
                        for (let i = 0; i < 10; i++) {
                            // 风场时间
                            let xWild = data.data[i].wtname;
                            arr1.push(xWild);
                            // 计划发电量
                            let yPowerPlan = Number(data.data[i].powerplan.toFixed(2));
                            arr2.push(yPowerPlan);
                            // 实际发电量
                            let yPowerAct = Number(data.data[i].poweract.toFixed(2));
                            arr3.push(yPowerAct);
                        }
                        dispatch(actions.setVars('actbt', key));
                        dispatch(actions.setVars('areaNamee', arr1));
                        dispatch(actions.setVars('wind', arr3));
                        dispatch(actions.setVars('windP', arr2));
                        dispatch(actions.setVars('btnn', 0));
                        dispatch(actions.setVars('mon', amonth+'月'));
                    }

                    

                },
                error: function () {

                },
            });
            

        },
        // 前十
        gogogo: (actbt, input_url, xxdwfId,value) => {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];

            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    'year': value[actbt].year,
                    'month': value[actbt].yearpoweract,
                    'wfid': xxdwfId,
                    'type': 0,
                    'groupid': '',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {



                    let dataa = data.data;
                    for (let i = 0; i < 10; i++) {
                        // 风场名字
                       
                        let xWild = data.data[i].wtname;
                        arr1.push(xWild);

                        let yPowerPlan = Number(data.data[i].powerplan.toFixed(2));
                        arr2.push(yPowerPlan);
                        let yPowerAct = Number(data.data[i].poweract.toFixed(2));
                        arr3.push(yPowerAct);
                    }

                },
                error: function () {

                },
            });
            dispatch(actions.setVars('areaNamee', arr1));
            dispatch(actions.setVars('wind', arr3));
            dispatch(actions.setVars('windP', arr2));
            dispatch(actions.setVars('btnn', 0));


        },
        // 后十
        back: (actbt, input_url, xxdwfId,value) => {
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let date = new Date();
            let year = date.getFullYear();

            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    'year': value[actbt].year,
                    'month': value[actbt].yearpoweract,
                    'wfid': xxdwfId,
                    'type': 1,
                    'groupid': '',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    // 获取x轴的值内蒙达茂天润风电场
                    let dataa = data.data;
                    for (let i = 0; i < 10; i++) {
                        let xWild = data.data[i].wtname;
                        arr1.push(xWild);
                        let yPowerPlan = Number(data.data[i].powerplan.toFixed(2));
                        arr2.push(yPowerPlan);
                        let yPowerAct = Number(data.data[i].poweract.toFixed(2));
                        arr3.push(yPowerAct);
                    }

                },
                error: function () {

                },
            });
            dispatch(actions.setVars('areaNamee', arr1));
            dispatch(actions.setVars('wind', arr3));
            dispatch(actions.setVars('windP', arr2));
            dispatch(actions.setVars('btnn', 1));
        },
        // 更多
        more: (actbt, input_url, xxdwfId,value) => {
            $("#sss").show();
            $('#boxcover').show();
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
            let arr4 = [];
            let arr5 = [];
            let arr6 = [];
            let width = 0;

            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    'year': value[actbt].year,
                    'month': value[actbt].yearpoweract,
                    'wfid': xxdwfId,
                    'type': 2,
                    'groupid': '',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    // 获取x轴的值内蒙达茂天润风电场
                    let dataa = data.data;
                    for (let i = 0; i < dataa.length; i++) {
                        let xWild = data.data[i].wtname;
                        arr4.push(xWild);
                        let yPowerPlan = Number(data.data[i].powerplan.toFixed(2));
                        arr5.push(yPowerPlan);
                        let yPowerAct = Number(data.data[i].poweract.toFixed(2));
                        arr6.push(yPowerAct);


                    }


                    let length = arr4.length;
                    width = length * 60;


                },
                error: function () {

                },
            });
            dispatch(actions.setVars('areaNamenb', arr4));
            dispatch(actions.setVars('areaRecordCostNb', arr6));
            dispatch(actions.setVars('areaRecordProfitNb', arr5));

            dispatch(actions.setVars('width1', width));
        },
        close: () => {
            $("#sss").hide();
            $('#boxcover').hide();
        },
        backtop: (befor_pagee,) => {
            dispatch(actions.setVars('showPage', befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);