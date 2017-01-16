import React from 'react';
import {connect} from 'react-redux';
import styles from '../group/PBATime/Profitstyle2.scss';
import Windcet from './Windcet.jsx';
import icono2 from '../../../../../img/comp/wind_logo.png';
import icono1 from '../../../../../img/comp/wind_logo2.png';
import Login from '../../../../../../../../components/common/Loading.jsx';
var actions = require('redux/actions');
var $ = require('jquery');
let data = require('./../group/Profit-data3');
let month = data.month;
let button = data.button;
let input_url = "10.9.100.38";
let x0 = [];
let x1 = [];
let x2 = [];
let x3 = [];
let windPT = data.windFJJ;
let Component = React.createClass({
    componentWillMount() {
        let {xxdwfId, xxdwfNa, ipUrl}=this.props;
        this.props.ajax(xxdwfId, xxdwfNa, ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {

        let areaPlanDay = data.areaPlanDay;
        let areaPlanDayT = data.areaPlanDayT;
        let text = data.textT;

        let {wftpowerplan, wftmonth, wftpoweract, ipUrl, xxdwfId, xxdwfNa, actbt ,  wind, windP, backtop, befor_pagee = 'windpage', areaPlan,mon,secondData,mapmonth,Go4,changpage,skinStyle,befor_page2}=this.props;
        if(Go4){
        return (
            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>


                <ul className={styles.monthbox}>
                    {
                        mapmonth.map((value, key) => {
                            return (<li className={actbt === key ? styles.red : styles.green}
                                        onClick={() => changpage(xxdwfId, xxdwfNa, value, key,  ipUrl)}
                                        key={key}>{value.yearpoweract+'月'}</li>)
                        })
                    }
                            

                    <li className={styles.back} onClick={() => backtop(befor_pagee, befor_page2)}>返回</li>
                </ul>
                {//12个 月的数据
                     }
            

                {//每天的数据
                     }
                <div className={`${styles.bigbox} ${styles.shadow}`}>


                    <Windcet areaPlan={areaPlan} areaPlanDay={wind} areaPlanDayT={windP} height={800}
                             text={mon + xxdwfNa + '每日发电量'}scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Windcet>

                    <div className={styles.imgqv}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
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
        wind: state.vars.areaRecordCostNP,
        windP: state.vars.areaRecordProfitNP,
        befor_pagee: state.vars.befor_pagee,
        xxdwfId: state.vars.xxdwfId1,
        xxdwfNa: state.vars.xxdwfNa1,
        btn: state.vars.btnn,
        areaPlan: state.vars.areaNameNP,
        ipUrl: state.vars.ipUrl,
        wftmonth: state.vars.wftmonth1,
        wftpowerplan: state.vars.wftpowerplan1,
        wftpoweract: state.vars.wftpoweract1,
        mon: state.vars.mon,
        mapmonth: state.vars.mapmonth,
        Go4: state.vars.Go4,
        secondData: state.vars.secondData,
        skinStyle: state.vars.skinStyle,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId, xxdwfNa, input_url) => {
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let date = new Date();
            let year=date.getFullYear();
            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
            let wftmonth = [];
            let wftpoweract = [];
            let wftpowerplan = [];
            let secondData=[];
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
            // 发电量12个月的
            $.ajax({
                url: 'http://' + input_url + '/wbi/ELEC/getWfieldElec',
                type: 'post',
                async: true,
                data: {'wfid': xxdwfId},
                dataType: 'json',//here
                success: function (data) {

 secondData=data.data.wfieldsMonthsElec

                    for (let i in data.data.wfieldsMonthsElec) {
                        let month = data.data.wfieldsMonthsElec[i].month;
                        wftmonth.push(month + '月');
                        let poweract = data.data.wfieldsMonthsElec[i].poweract;
                        wftpoweract.push(poweract);


                    }
                    for (let j in data.data.wfieldsMonthsPlanElec) {

                        wftpowerplan.push(data.data.wfieldsMonthsPlanElec[j]);
                    }

                    dispatch(actions.setVars('wftmonth1', wftmonth));
                    dispatch(actions.setVars('wftpowerplan1', wftpowerplan));
                    dispatch(actions.setVars('wftpoweract1', wftpoweract));
                    dispatch(actions.setVars('secondData', secondData));
                    dispatch(actions.setVars('Go4', true));
                },
                error: function () {

                },
            });
            // 初始的月每天
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/ELEC/getWtTimeAreaElec',
                async: false,
                data: {
                    'month': month,
                    'wfid': xxdwfId,
                    'year':year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    let dataa = data.data;
                    for (let i = 0; i < dataa.length; i++) {
                        // 每天
                        let xDay = data.data[i].day + '日';
                        arr1.push(xDay);
                        // 计划发电量
                        let yPowerPlan = Number(data.data[i].powerplan.toFixed(2));
                        arr2.push(yPowerPlan);
                        // 实际发电量
                        let yPowerAct = Number(data.data[i].poweract.toFixed(2));
                        arr3.push(yPowerAct);
                    }


                    dispatch(actions.setVars('areaNameNP', arr1));
                    dispatch(actions.setVars('areaRecordCostNP', arr2));
                    dispatch(actions.setVars('areaRecordProfitNP', arr3));
                    dispatch(actions.setVars('actbtt', month));
                    
                    dispatch(actions.setVars('mon', month+'月'));
                },
                error: function () {

                },
            });

        }
        ,
        init: () => {
            var obj = {
                test: ''
            }
        }
        ,
        changpage: (xxdwfId, xxdwfNa, value, key, input_url) => {
            let WSHealH = [];
            let WSHealName = [];
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let date = new Date();
            let month = date.getMonth();
            let year = date.getFullYear();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
 
let adf=value.yearpoweract;
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/ELEC/getWtTimeAreaElec',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': value.yearpoweract,
                    'year': value.year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let dataa = data.data;
              for (let i = 0; i < dataa.length; i++) {
                  let xDay = data.data[i].day + '日';
                  arr1.push(xDay);
                  let yPowerPlan = Number(data.data[i].powerplan.toFixed(1));
                  arr2.push(yPowerPlan);
                  let yPowerAct = Number(data.data[i].poweract.toFixed(1));
                  arr3.push(yPowerAct);
                    }
            dispatch(actions.setVars('areaNameNP', arr1));
            dispatch(actions.setVars('areaRecordCostNP', arr2));
            dispatch(actions.setVars('areaRecordProfitNP', arr3));;
                    dispatch(actions.setVars('actbt', key));
                    dispatch(actions.setVars('btnn', 0));
                    dispatch(actions.setVars('mon', adf+'月'))

                },
                error: function () {

                },
            });

        },
        backtop: (befor_pagee,befor_pagee2) => {
            dispatch(actions.setVars('showPage', befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
