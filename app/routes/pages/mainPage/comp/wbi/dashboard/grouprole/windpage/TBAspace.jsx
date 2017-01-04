import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import TBAspacechart from './TBAspacechart.jsx';
import icono from '../../../../../img/comp/TBA.png';
var actions = require('redux/actions');
let data = require('./../group/Profit-data3');
let input_url = "10.9.100.38";
let month = data.month;
let button = data.button;
let machine = data.machine;
let x0 = [];
let x1 = [];
let x2 = [];
let x3 = [];
let text = data.text;
let windFF = data.windFF;
let fanCost = data.fanCost;
let fanProfitQ = data.fanProfitQ;

let Component = React.createClass({
    componentWillMount() {
        let {xxdwfId, xxdwfNa, ipUrl}=this.props;
        this.props.ajax(xxdwfId, xxdwfNa, ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {

        let {width, ipUrl, wTBATM, wTBADownM, wTBARunM, wTBANaM, btn, wTBAT, wTBADown, wTBARun, wTBANa, xxdwfId, xxdwfNa, actbt = 0, changpage, wind, windP, gogogo, back, machinee, more, close, backtop, befor_pagee = 'windpage', befor_page2}=this.props;
        return (

            <div className={styles.box}>
                {//遮罩层
                }
                <div className={styles.boxcover} id='boxcover'></div>
                {//更多弹出框
                }
                <div className={styles.more} id="sss">
                    <div className={styles.moretitle}>
                        <img src={icono}/>
                        <p>{[actbt + 1] + '月' + xxdwfNa + '各风机TBA'}</p>
                        <div onClick={() => close()}>x</div>
                    </div>
                    <div className={styles.scroll}>
                        <TBAspacechart fanCost={wTBADownM} machine={wTBANaM} fanProfitQ={wTBARunM} TBA={wTBATM}
                                       height={481} width={width} ty={0} pointWidth={20} borderRadius={4}
                                       pointPlacement={0.07}></TBAspacechart></div>

                </div>
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value, key) => {
                            return (<li className={actbt === key ? styles.red : styles.green}
                                        onClick={() => changpage(value, key, xxdwfId, ipUrl)}
                                        key={key}>{value.name}</li>)
                        })
                    }
                    <li className={styles.back} onClick={() => backtop(befor_pagee, befor_page2)}>返回</li>


                </ul>

                <div className={styles.bigbox}>


                    <div>
                        <TBAspacechart fanCost={wTBADown} machine={wTBANa} fanProfitQ={wTBARun} TBA={wTBAT} height={800}
                                       text={[actbt + 1] + '月' + xxdwfNa + '各风机TBA'} ty={50} pointWidth={30}
                                       borderRadius={7} pointPlacement={-0.07}></TBAspacechart>
                    </div>


                    <div className={styles.imgcq}>
                        <img src={icono}/>
                    </div>

                    <div className={styles.buttons}>
                        <button onClick={() => gogogo(xxdwfId, actbt, btn, ipUrl)}
                                className={btn === 0 ? styles.btn0 : styles.btn1}> 前10
                        </button>
                        <button onClick={() => back(xxdwfId, actbt, btn, ipUrl)}
                                className={btn === 1 ? styles.btn0 : styles.btn1}>后10
                        </button>
                        <button onClick={() => more(xxdwfId, actbt, btn, ipUrl)}
                                className={btn === 2 ? styles.btn0 : styles.btn1}>更多
                        </button>
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
        windP: state.vars.windP,
        machinee: state.vars.machinee,
        befor_pagee: state.vars.befor_pagee,
        befor_page2: state.vars.befor_page2,
        xxdwfId: state.vars.xxdwfId1,
        xxdwfNa: state.vars.xxdwfNa1,
        wTBANa: state.vars.wTBANa1q,
        wTBARun: state.vars.wTBARun1q,
        wTBADown: state.vars.wTBADown1q,
        wTBAT: state.vars.wTBAT1q,
        // 更多
        wTBANaM: state.vars.wTBANa1qM,
        wTBARunM: state.vars.wTBARun1qM,
        wTBADownM: state.vars.wTBADown1qM,
        wTBATM: state.vars.wTBAT1qM,
        btn: state.vars.btnn,
        ipUrl: state.vars.ipUrl,
        width: state.vars.width1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId, xxdwfNa, input_url) => {
            let date = new Date();
            let month = date.getMonth();
            if (month == 0) {
                month = 12;
            }
            let wTBANa = [];
            let wTBADown = [];
            let wTBARun = [];
            let wTBAT = [];
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/TBA/getWfAllWtByM',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': month,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    let WTSpace = data.data
                    for (let i = 0; i < 10; i++) {
                        // 风场名字
                        let wtname = WTSpace[i].wtname;
                        wTBANa.push(wtname);
                        // 初始停机时间
                        let downtimes = WTSpace[i].downtimes;
                        wTBADown.push(downtimes);
// 初始运行时间
                        let runtimes = WTSpace[i].runtimes;
                        wTBARun.push(runtimes);
// 初始TBA
                        let tba = WTSpace[i].tba * 100;
                        wTBAT.push(Number(tba.toFixed(2)));
                    }


                },
                error: function () {

                },
            });
            dispatch(actions.setVars('wTBANa1q', wTBANa));
            dispatch(actions.setVars('wTBARun1q', wTBARun));
            dispatch(actions.setVars('wTBADown1q', wTBADown));
            dispatch(actions.setVars('wTBAT1q', wTBAT));
            dispatch(actions.setVars('actbt', month - 1));
            dispatch(actions.setVars('btnn', 0));

        }
        ,
        init: () => {
            var obj = {
                test: ''
            }
        }
        ,
        // 点击月份gaibian
        changpage: (value, key, xxdwfId, input_url) => {
            let wTBANa = [];
            let wTBADown = [];
            let wTBARun = [];
            let wTBAT = [];
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/TBA/getWfAllWtByM',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': key + 1,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    let WTSpace = data.data
                    for (let i = 0; i < 10; i++) {
                        // 风场名字
                        let wtname = WTSpace[i].wtname;
                        wTBANa.push(wtname);
                        // 停机时间
                        let downtimes = WTSpace[i].downtimes;
                        wTBADown.push(downtimes);
// 运行时间
                        let runtimes = WTSpace[i].runtimes;
                        wTBARun.push(runtimes);
// TBA
                        let tba = WTSpace[i].tba * 100;
                        wTBAT.push(Number(tba.toFixed(2)));
                    }


                },
                error: function () {

                },
            });
            dispatch(actions.setVars('wTBANa1q', wTBANa));
            dispatch(actions.setVars('wTBARun1q', wTBARun));
            dispatch(actions.setVars('wTBADown1q', wTBADown));
            dispatch(actions.setVars('wTBAT1q', wTBAT));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('btnn', 0));

            // dispatch(actions.setVars('actbt',key ));
            // dispatch(actions.setVars('wind',value.plan));
            // dispatch(actions.setVars('windP',value.actrul));
        },
        // 前十
        gogogo: (xxdwfId, actbt, btn, input_url) => {
            let wTBANa = [];
            let wTBADown = [];
            let wTBARun = [];
            let wTBAT = [];
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/TBA/getPageSize',
                async: false,
                data: {
                    'type': 0,
                    'wfid': xxdwfId,
                    'month': actbt + 1,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {


                    let WTSpace = data.data
                    for (let i = 0; i < 10; i++) {

                        let wtname = WTSpace[i].wtname;
                        wTBANa.push(wtname);
                        let downtimes = WTSpace[i].downtimes;
                        wTBADown.push(downtimes);

                        let runtimes = WTSpace[i].runtimes;
                        wTBARun.push(runtimes);

                        let tba = WTSpace[i].tba * 100;
                        wTBAT.push(Number(tba.toFixed(2)));
                    }

                },
                error: function () {

                },
            });
            dispatch(actions.setVars('wTBANa1q', wTBANa));
            dispatch(actions.setVars('wTBARun1q', wTBARun));
            dispatch(actions.setVars('wTBADown1q', wTBADown));
            dispatch(actions.setVars('wTBAT1q', wTBAT));
            dispatch(actions.setVars('btnn', 0));


        },
        // 后十
        back: (xxdwfId, actbt, btn, input_url) => {
            let wTBANa = [];
            let wTBADown = [];
            let wTBARun = [];
            let wTBAT = [];
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/TBA/getPageSize',
                async: false,
                data: {
                    'type': 1,
                    'wfid': xxdwfId,
                    'month': actbt + 1,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let WTSpace = data.data
                    for (let i = 0; i < 10; i++) {

                        let wtname = WTSpace[i].wtname;
                        wTBANa.push(wtname);
                        let downtimes = WTSpace[i].downtimes;
                        wTBADown.push(downtimes);

                        let runtimes = WTSpace[i].runtimes;
                        wTBARun.push(runtimes);

                        let tba = WTSpace[i].tba * 100;
                        wTBAT.push(Number(tba.toFixed(2)));
                    }
                },
                error: function () {


                },
            });
            dispatch(actions.setVars('wTBANa1q', wTBANa));
            dispatch(actions.setVars('wTBARun1q', wTBARun));
            dispatch(actions.setVars('wTBADown1q', wTBADown));
            dispatch(actions.setVars('wTBAT1q', wTBAT));
            dispatch(actions.setVars('btnn', 1));

        },
        // 更多
        more: (xxdwfId, actbt, btn, input_url) => {
            $("#sss").show();
            $('#boxcover').show();
            let wTBANaM = [];
            let wTBADownM = [];
            let wTBARunM = [];
            let wTBATM = [];
            let width = 0;
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/TBA/getWfAllWtByM',
                async: false,
                data: {
                    'wfid': xxdwfId,
                    'month': actbt + 1,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let WTSpace = data.data
                    for (let i in WTSpace) {

                        let wtname = WTSpace[i].wtname;
                        wTBANaM.push(wtname);
                        let downtimes = WTSpace[i].downtimes;
                        wTBADownM.push(downtimes);

                        let runtimes = WTSpace[i].runtimes;
                        wTBARunM.push(runtimes);

                        let tba = WTSpace[i].tba * 100;
                        wTBATM.push(Number(tba.toFixed(2)));
                    }

                    let length = wTBANaM.length;
                    width = length * 60;
                },
                error: function () {

                },
            });
            dispatch(actions.setVars('wTBANa1qM', wTBANaM));
            dispatch(actions.setVars('wTBARun1qM', wTBARunM));
            dispatch(actions.setVars('wTBADown1qM', wTBADownM));
            dispatch(actions.setVars('wTBAT1qM', wTBATM));

            dispatch(actions.setVars('width1', width));

        },
        // 关闭更多的
        close: () => {
            $("#sss").hide();
            $('#boxcover').hide();
        },
        // 返回
        backtop: (befor_pagee, befor_page2) => {
            dispatch(actions.setVars('showPage', befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
