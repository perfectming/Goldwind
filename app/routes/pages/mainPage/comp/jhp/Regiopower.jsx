import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';

import Hly_genone from './Hly_genone.jsx';
import Hly_gentwo from './Hly_gentwo.jsx';

var actions = require('redux/actions');
var $ = require('jquery');
let ip="10.68.100.32";
let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barlotimes1 = data.data.bar_lotime;
let barlopowers1 = data.data.bar_loPowers;
let barlopowerp1 = data.data.bar_loPowerp;
let text0=data.data.line_date;
let barRotime2 = data.data.bar_rotime;
let barlopowers2 = data.data.bar_loPowers;
let barlopowerp2 = data.data.bar_loPowerp;
let barRotime3 = data.data.bar_rotimes;
let barlopowers3 = data.data.bar_loPowers;
let barlopowerp3 = data.data.bar_loPowerp;

let sort0=data.data.sort1;
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let x4=[];
let x5=[];
let x6=[];
let x7=[];
(function () {

    for(var i=0;i<12;i++){
        x4[i]=sort0[i].name;
        x5[i]=sort0[i].time;
    }
    for(var i=0;i<sort0.length;i++){
        x6[i]=sort0[i].name;
        x7[i]=sort0[i].time;
    }


})();


let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {befor_pages='area',w0, wc1,wc2,bt0=0,returnit,hideit,arr,arr2,gogogo,back,more,hhdata,actbt=10,changecolor,barlotimes1,barlopowers1,barlopowerp1,barlotimes2,barlopowers2,barlopowerp2,mon = "十一月份",} = this.props;
        return (




            <div className={styles.box}>

                <div className={styles.light} id="light"> </div>


                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo3}>{"各风机健康度"}</div>
                        <span onClick={()=>hideit(hhdata,bt0)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                    <Hly_gentwo    widths={4500}  height={450}
                                   name0={barlotimes2}
                                   powerplan1={barlopowers2}
                                   poweract2={barlopowerp2}
                                   text={""}></Hly_gentwo>
                     </div>

                </div>


                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key} onClick={()=>changecolor(value,key)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={()=>returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_genone height={400}
                                    name0={barlotimes1}
                                    powerplan1={barlopowers1}
                                    poweract2={barlopowerp1}
                                    text={text0[3]+"月"+text0[1]+"区域发电量"}></Hly_genone>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow} ${styles.fbox2}`}>
                        <div className={styles.rbox31}>

                        </div>
                        <div className={styles.rbox33}>
                            <button className={bt0===0? styles.button:styles.button22} onClick={() => gogogo( bt0,actbt, hhdata)}>前10</button>
                            <button className={bt0===1? styles.button:styles.button22} onClick={() => back(bt0, actbt, hhdata)}>后10</button>
                            <button className={styles.button22} onClick={() => more(hhdata)}>更多</button>
                        </div>
                        <Hly_gentwo    height={390}
                                       name0={barlotimes2}
                                       powerplan1={barlopowers2}
                                       poweract2={barlopowerp2}
                                       text={text0[3]+"月"+text0[3]+"区域各风机发电量"}></Hly_gentwo>
                        <div className={styles.logomini}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbt,
        wind:state.vars.wind,
        winds:state.vars.winds,
        arr: state.vars.arr,
        arr2: state.vars.arr2,
        hhdata:state.vars.hhdata,
        barlotimes1: state.vars.barlotimes1,
        barlopowers1: state.vars.barlopowers1,
        barlopowerp1: state.vars.barlopowerp1,
        barlotimes2: state.vars.barlotimes2,
        barlopowers2: state.vars.barlopowers2,
        barlopowerp2: state.vars.barlopowerp2,
        bt0: state.vars.bt0,
        wc1: state.vars.wc1,
        w0: state.vars.w0,
        wc2: state.vars.wc2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {
            $.ajax({
                type:'post',
                url:'http://'+ip+':8080/wbi/ELEC/getSpaceElec',
                async:false,
                data:'month=11',
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    dispatch(actions.setVars('hhdata',  data));

                    let barlotimes1 = [];
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[1]) {
                        barlotimes1.push(data.data[1][i].wfname);    //区域的横坐标
                        barlopowers1.push(data.data[1][i].powerplan);   //计划发电量
                        barlopowerp1.push(data.data[1][i].poweract);   //实际发电量
                    }
                    let w0=data.data[2][0].groupname;
                    let w10=data.data[1][0].wfname;

                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i=0;i<=10;i++) {
                        barlotimes2.push(data.data[0][i].wtname);    //区域的横坐标
                        barlopowers2.push(data.data[0][i].powerplan);   //计划发电量
                        barlopowerp2.push(data.data[0][i].poweract);   //实际发电量
                    }

                    dispatch(actions.setVars('barlotimes1', barlotimes1));
                    dispatch(actions.setVars('barlopowers1', barlopowers1));
                    dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));




                    dispatch(actions.setVars('w1', w10));




                },
                error:function(){

                },
            })




            var obj = {
                test: ''
            }
        },
        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test: ''
            }
        },
        changecolor:(value,key)=>{

            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind',value.plan ));
            dispatch(actions.setVars('winds',value.actrul ));
            $.ajax({
                type:'post',
                url:'http://'+ip+':8080/wbi/ELEC/getSpaceElec',
                async:false,
                data:{"month":key+1},
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata',  data));


                    let barlotimes1 = [];
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[1]) {
                        barlotimes1.push(data.data[1][i].wfname);    //区域的横坐标
                        barlopowers1.push(data.data[1][i].powerplan);   //计划发电量
                        barlopowerp1.push(data.data[1][i].poweract);   //实际发电量
                    }
                    let w0=data.data[2][0].groupname;
                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i=0;i<=10;i++) {
                        barlotimes2.push(data.data[0][i].wtname);    //区域的横坐标
                        barlopowers2.push(data.data[0][i].powerplan);   //计划发电量
                        barlopowerp2.push(data.data[0][i].poweract);   //实际发电量
                    }


                    dispatch(actions.setVars('barlotimes1', barlotimes1));
                    dispatch(actions.setVars('barlopowers1', barlopowers1));
                    dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));


                },
                error:function(){

                },
            })

        },
        gogogo: (bt0, actbt, hhdata) => {
            dispatch(actions.setVars('bt0', 0));

            console.log(bt0)
            console.log(actbt)

            $.ajax({
                type: 'post',
                url: 'http://192.168.31.148:8080/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": '150828',
                    "type":"0",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    console.log(data)
                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c=[];       //计划发电量
                    let wrong30c=[];       //实际发电量

                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(data.data[i].powerplan);   //实际发电量
                        wrong30c.push(data.data[i].poweract);   //故障损失

                    }

                    dispatch(actions.setVars('barlotimes2', barLotime3c))
                    dispatch(actions.setVars('barlopowers2', power3c))
                    dispatch(actions.setVars('barlopowerp2', wrong30c))


                },
                error: function () {

                },
            });






        },
        back: (bt0, actbt, hhdata) => {
            dispatch(actions.setVars('bt0', 1));
            $.ajax({
                type: 'post',
                url: 'http://192.168.31.148:8080/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": '150828',
                    "type":"1",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c=[];       //计划发电量
                    let wrong30c=[];       //实际发电量

                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(data.data[i].powerplan);   //实际发电量
                        wrong30c.push(data.data[i].poweract);   //故障损失

                    }

                    dispatch(actions.setVars('barlotimes2', barLotime3c))
                    dispatch(actions.setVars('barlopowers2', power3c))
                    dispatch(actions.setVars('barlopowerp2', wrong30c))


                },
                error: function () {

                },
            });
        },
        more: (hhdata) => {
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c=[];       //计划发电量
            let wrong30c=[];       //实际发电量


            for (var i in hhdata.data[0]) {

                barLotime3c.push(hhdata.data[0][i].wtname)   //区域的横坐标
                power3c.push(hhdata.data[0][i].powerplan) //实际发电量
                wrong30c.push(hhdata.data[0][i].poweract);   //故障损失

            }

            dispatch(actions.setVars('barlotimes2', barLotime3c))
            dispatch(actions.setVars('barlopowers2', power3c))
            dispatch(actions.setVars('barlopowerp2', wrong30c))


            $("#boxhidden").show();
            $("#light").show();
        },
        hideit: (hhdata) =>{
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c=[];       //计划发电量
            let wrong30c=[];       //实际发电量


            for (var i=0;i<=10;i++) {

                barLotime3c[i]=hhdata.data[0][i].wtname;    //区域的横坐标
                power3c[i]=hhdata.data[0][i].powerplan;  //实际发电量
                wrong30c[i]=hhdata.data[0][i].poweract;   //故障损失

            }

            dispatch(actions.setVars('barlotimes2', barLotime3c))
            dispatch(actions.setVars('barlopowers2', power3c))
            dispatch(actions.setVars('barlopowerp2', wrong30c))
            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit:(befor_pages)=>{
            dispatch(actions.setVars('showPage',befor_pages));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
