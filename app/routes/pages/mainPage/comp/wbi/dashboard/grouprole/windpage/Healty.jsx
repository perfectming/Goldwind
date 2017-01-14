import React from 'react';
import {connect} from 'react-redux';
import styles from '../group/PBATime/Profitstyle2.scss';
import Healtychart from './healtychart.jsx';
import icono2 from '../../../../../img/comp/HEA.png';
import icono1 from '../../../../../img/comp/HEA2.png';
import Login from '../../../../../../../../components/common/Loading.jsx';
var $ = require('jquery');
var actions = require('redux/actions');
let data = require('./../group/Profit-data3');
let Component = React.createClass({
    componentWillMount() {
        // 引入风场id 和全局变量ip
        let {xxdwfId, xxdwfNa, ipUrl}=this.props;
        this.props.ajax(xxdwfId, xxdwfNa, ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {width, ipUrl, xxdwfNa, xxdwfId, back, actbt, btn = 0, changpage, wind, gogogo, windP, windPP, windd, more, close, backtop, befor_pagee = 'windpage', befor_page2,mapmonth,Go=false,mon,skinStyle}=this.props;
        if(Go){
        return (

            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
                <div className={styles.boxcover} id='boxcover'></div>
                {// 更多弹出的表格
                }
                <div className={styles.more} id="sss">
                    <div className={styles.moretitle}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                        <p>{mon + xxdwfNa + '各风机健康度'}</p>
                        <div onClick={() => close()}>x</div>
                    </div>
                    <div className={styles.scroll}>
                        <Healtychart machineE={windPP} areaRecordProfit={windd} width={width} height={483} ty={20}
                                     pointWidth={20} borderRadius={4} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Healtychart>
                    </div>
                </div>
                {// 导航的月份
                }
                <ul className={styles.monthbox}>
                    {
                        mapmonth.map((value, key) => {
                            return (<li className={actbt === key ? styles.red : styles.green}
                                        onClick={() => changpage(xxdwfId, xxdwfNa, value, key, btn, ipUrl)}
                                        key={key}>{value.yearpoweract+'月'}</li>)
                        })
                    }
                            

                    <li className={styles.back} onClick={() => backtop(befor_pagee, befor_page2)}>返回</li>
                </ul>


                { // 就一个大表部分
                }
                <div className={`${styles.bigbox} ${styles.shadow}`}>


                    <Healtychart machineE={windP} areaRecordProfit={wind} height={800}
                                 text={mon + xxdwfNa + '各风机健康度'} ty={35} pointWidth={30}
                                 borderRadius={7} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Healtychart>


                    <div className={styles.imgqvg}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                    <div className={styles.buttonsh}>
                        <button className={btn === 0 ? styles.btn0 : styles.btn1}
                                onClick={() => gogogo(actbt, btn, ipUrl, xxdwfId,mapmonth)}> 前10
                        </button>
                        <button onClick={() => back(xxdwfNa, xxdwfId, actbt, btn, ipUrl,mapmonth)}
                                className={btn === 1 ? styles.btn0 : styles.btn1}>后10
                        </button>
                        <button onClick={() => more(xxdwfNa, xxdwfId, actbt, btn, ipUrl,mapmonth)}
                                className={btn === 2 ? styles.btn0 : styles.btn1}>更多
                        </button>
                    </div>
                </div>
            </div>




        );
}
else{
    return(
        <Login></Login>
        )
}
    
}
});


const mapStateToProps = (state) => {
    return {
        // 控制点击对应的月份高亮显示
        actbt: state.vars.actbt,
        // 图标数据
        wind: state.vars.WSHealH1,
        windP: state.vars.WSHealName1,
        windd: state.vars.WSHealH11,
        windPP: state.vars.WSHealName11,
        // 返回的页面
        befor_pagee: state.vars.befor_pagee,
        befor_page2: state.vars.befor_page2,
        // 控制前十 后十高亮显示
        btn: state.vars.btnn,
        //从windpage里传过来的风场id，风场名字，和ip
        xxdwfId: state.vars.xxdwfId1,
        xxdwfNa: state.vars.xxdwfNa1,
        ipUrl: state.vars.ipUrl,
        width: state.vars.width1,
        mapmonth: state.vars.mapmonth,
        Go:state.vars.Go,
        mon:state.vars.mon,
        skinStyle:state.vars.skinStyle,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        // 页面预加载
        ajax: (xxdwfId, xxdwfNa, input_url) => {


            let WSHealH = [];
            let WSHealName = [];
            // 获取当前月的上一个月
            let date = new Date();
            let month = date.getMonth();
            let year = date.getFullYear();
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
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/Health/getWfieldHealth',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': 12,
                    'year': 2016
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
               
                    let WSHeal = data.data;
                    for (var i = 0; i < 10; i++) {
                        let fanHealth = WSHeal[i].fanHealth;
                        WSHealH.push(fanHealth);

                        let wtname = WSHeal[i].wtname;
                        WSHealName.push(wtname);

                    }
                    dispatch(actions.setVars('WSHealH1', WSHealH));
                    dispatch(actions.setVars('WSHealName1', WSHealName));
                    
                    dispatch(actions.setVars('btnn', 0));
                     dispatch(actions.setVars('Go', true));

                },
                error: function () {
dispatch(actions.setVars('Go', true));
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
        // 点击月份改变
        changpage: (xxdwfId, xxdwfNa, value, key, btn, input_url) => {
            let WSHealH = [];
            let WSHealName = [];
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
                url: 'http://' + input_url + '/wbi/Health/getWfieldHealth',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': value.yearpoweract,
                    'year': value.year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let WSHeal = data.data;
                    for (var i = 0; i < 10; i++) {
                        let fanHealth = WSHeal[i].fanHealth;
                        WSHealH.push(fanHealth);
                        let wtname = WSHeal[i].wtname;
                        WSHealName.push(wtname);
                    }
                    dispatch(actions.setVars('WSHealH1', WSHealH));
                    dispatch(actions.setVars('WSHealName1', WSHealName));
                    dispatch(actions.setVars('actbt', key));
                    dispatch(actions.setVars('btnn', 0));
                    dispatch(actions.setVars('mon', adf+'月'))

                },
                error: function () {

                },
            });

        },
        // 前十
        gogogo: (key, btn, input_url, xxdwfId,value) => {
            let date = new Date();
            let year = date.getFullYear()

            let WSHealH = [];
            let WSHealName = [];

            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }

            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/Health/getWfieldHealth',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': value[key].yearpoweract,
                    'year': value[key].year,
                },
                dataType: 'json',
                timeout: '3000',

                success: function (data) {
                    let WSHeal = data.data;
                    for (var i = 0; i < 10; i++) {
                        let fanHealth = WSHeal[i].fanHealth;
                        WSHealH.push(fanHealth);

                        let wtname = WSHeal[i].wtname;
                        WSHealName.push(wtname);
                    }
                    dispatch(actions.setVars('WSHealH1', WSHealH));
                    dispatch(actions.setVars('WSHealName1', WSHealName));
                    dispatch(actions.setVars('btnn', 0));

                },
                error: function () {

                },
            });
        },
        back: (xxdwfNa, xxdwfId, key, btn, input_url,value) => {
            let date = new Date();
            let year = date.getFullYear()
            let WSHealH = [];
            let WSHealName = [];

            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
         
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/Health/getWfieldHealth',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': value[key].yearpoweract,
                    'year': value[key].year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let WSHeal = data.data;
                    let length = WSHeal.length - 1;
                    for (let i = length; i > length - 10; i--) {
                        let fanHealth = WSHeal[i].fanHealth;
                        WSHealH.push(fanHealth);

                        let wtname = WSHeal[i].wtname;
                        WSHealName.push(wtname);
                    }
                    dispatch(actions.setVars('WSHealH1', WSHealH));
                    dispatch(actions.setVars('WSHealName1', WSHealName));
                    dispatch(actions.setVars('btnn', 1));

                },
                error: function () {

                },
            });
        },
        // 更多
        more: (xxdwfNa, xxdwfId, key, btn, input_url,value) => {
            $("#sss").show();
            $('#boxcover').show();
            let date = new Date();
            let year = date.getFullYear();

            let WSHealH = [];
            let WSHealName = [];
            let width = 0;
            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
          
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/Health/getWfieldHealth',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': value[key].yearpoweract,
                    'year': value[key].year,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let WSHeal = data.data;
                    for (var i in WSHeal) {
                        let fanHealth = WSHeal[i].fanHealth;
                        WSHealH.push(fanHealth);

                        let wtname = WSHeal[i].wtname;
                        WSHealName.push(wtname);
                    }
                    let length = WSHealName.length;
                    // 更多表格的宽度
                    width = length * 45;
                    dispatch(actions.setVars('WSHealH11', WSHealH));
                    dispatch(actions.setVars('WSHealName11', WSHealName));

                    dispatch(actions.setVars('width1', width));

                },
                error: function () {

                },
            });
        },
        // 表格关闭按钮
        close: () => {
            $("#sss").hide();
            $('#boxcover').hide();
        },
        // 页面返回按钮
        backtop: (befor_pagee, befor_page2) => {
            dispatch(actions.setVars('showPage', befor_pagee));
        },

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Component);