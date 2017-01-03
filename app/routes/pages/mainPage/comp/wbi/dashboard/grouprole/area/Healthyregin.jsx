import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';

import Hly_rone from './Hly_rone.jsx';
import Hly_rtwo from './Hly_rtwo.jsx';
var $ = require('jquery');
var actions = require('redux/actions');
let ip="10.68.100.32";

let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barLoTime1 = data.data.bar_lotime;
let barLoPowerValue1 = data.data.bar_loPower;
let text0 = data.data.line_date;
let text2 = data.data.text3;
let text3 = data.data.text4;
let barRotime1 = data.data.bar_rotime;
let barLoPowerValue2 = data.data.bar_loPower;
let barLtPowerValue = data.data.bar_ltPower;

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
        let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {ipUrl,befor_pages='area',width0,mon,w0,w10,wfid,hhdata,bt0, returnit,hideit,namex2,namex3,healthy2,healthy3,gogogo,back,more,wind,buttonAction, actbt=0,changecolor,inputOnChange, onFocus} = this.props;
        return (




            <div className={styles.box}>
                <div className={styles.light} id="light"> </div>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo1}></div>
                        <div className={styles.logo30}>{mon+"巴盟"+w10+"风场各风机健康度"}</div>
                        <span onClick={()=>hideit(healthy3,namex3)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                    <Hly_rtwo height={450}
                              namex3={namex3}
                              healthy3={healthy3}
                              widths={width0}
                            text={""}></Hly_rtwo>
                    </div>

                </div>


                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key} onClick={()=>changecolor(value,key,ipUrl)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={()=>returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_rone  height={400}
                                   namex2={namex2}
                                   healthy2={healthy2}
                                   text={mon+"各风场健康度"}></Hly_rone>

                        <div className={styles.logo1}>

                        </div>
                    </div>
                </div>

                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow} ${styles.fbox2}`}>
                        <div className={styles.rbox31}>

                            {/*<span>{text0[actbt]+"月"+text0[5]+"区域"+text0[5]+"风场各风机健康度"}</span>*/}
                        </div>
                        <div className={styles.rbox33}>
                            <button className={bt0===0? styles.button:styles.button22} onClick={() => gogogo(bt0, actbt, hhdata,ipUrl,wfid)}>前10</button>
                            <button className={bt0===1? styles.button:styles.button22} onClick={() => back(bt0, actbt, hhdata,ipUrl,wfid)}>后10</button>
                            <button className={styles.button22} onClick={() => more(bt0, actbt, hhdata,ipUrl,wfid)}>更多</button>
                        </div>
                        <Hly_rtwo height={390}
                                  namex3={namex3}
                                  text={mon+w10+"各风机健康度"}
                                  healthy3={healthy3} ></Hly_rtwo>

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
        arr: state.vars.arr,
        arr2: state.vars.arr2,
        namex2:state.vars.namex2,
        namex3:state.vars.namex3,
        healthy3:state.vars.healthy3,
        healthy2:state.vars.healthy2,
        hhdata:state.vars.hhdata,
        w0 : state.vars.w1,
        w10 : state.vars.w11,
        mon : state.vars.mon,
        windplan : state.vars.windplan,
        bt0: state.vars.bt0,
        ipUrl:state.vars.ipUrl,
        wfid:state.vars.wfid,
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
            let date=new Date();
            let year=date.getFullYear()
            let month2=date.getMonth();

            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getAreaRoleHealth',
                async:false,
                data:{
                    "month":month2,
                    "year":'',
                    "groupid":  '201612121721151',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    dispatch(actions.setVars('hhdata',  data));
                    dispatch(actions.setVars('actbt',  10));
                    dispatch(actions.setVars('mon',  month2+"月"));


                    let barlopowers2 = [];
                    let barlopowerp2 = [];

                    for (var i in data.data[1]) {
                        barlopowers2.push(data.data[1][i].wfHealth);    //区域的横坐标
                        barlopowerp2.push(data.data[1][i].wfname);    //区域的横坐标

                    }


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i =0;i<10;i++) {
                        barlopowers3.push(data.data[0][i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[0][i].wtname);    //区域的横坐标

                    }

                    dispatch(actions.setVars('healthy2', barlopowers2));
                    dispatch(actions.setVars('namex2', barlopowerp2));
                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));


                    let w10=data.data[1][0].wfname;

                    dispatch(actions.setVars('w11', w10));




                },
                error:function(){

                },
            })
        },
        init: () => {

            var obj = {
                test: ''
            }
        },
        changecolor:(value,key,ipUrl)=>{
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('windplan',value.plan ));
            dispatch(actions.setVars('windplan1', value.plan));

            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getAreaRoleHealth',
                async:false,
                data:{
                    "month":key+1,
                    "year":'',
                    "groupid":  '201612121721151',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    dispatch(actions.setVars('hhdata',  data));

                    let barlopowers2 = [];
                    let barlopowerp2 = [];

                    for (var i in data.data[1]) {
                        barlopowers2.push(data.data[1][i].wfHealth);    //区域的横坐标
                        barlopowerp2.push(data.data[1][i].wfname);    //区域的横坐标

                    }


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i =0;i<10;i++) {
                        barlopowers3.push(data.data[0][i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[0][i].wtname);    //区域的横坐标

                    }

                    dispatch(actions.setVars('healthy2', barlopowers2));
                    dispatch(actions.setVars('namex2', barlopowerp2));
                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));


                    let w10=data.data[1][0].wfname;
                    dispatch(actions.setVars('w11', w10));


                },
                error:function(){

                },
            })
        },
        gogogo: (bt0, actbt, hhdata,ipUrl,wfid) => {
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getPageSize',
                async:false,
                data:{
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid==undefined? '150801':wfid,
                    "type":"0",
                    "year":""

                },
                dataType:'json',
                timeout:'3000',
                success:function(data){


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i =0;i<10;i++) {
                        barlopowers3.push(data.data[i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[i].wtname);    //区域的横坐标
                    }

                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));

                },
                error:function(){

                },
            })


        },
        back: (bt0, actbt, hhdata,ipUrl,wfid) => {
            dispatch(actions.setVars('bt0', 1));
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getPageSize',
                async:false,
                data:{
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid==undefined? '150801':wfid,
                    "type":"1",
                    "year":""

                },
                dataType:'json',
                timeout:'3000',
                success:function(data){


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i =0;i<10;i++) {
                        barlopowers3.push(data.data[i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[i].wtname);    //区域的横坐标
                    }

                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));

                },
                error:function(){

                },
            })
        },
        more: (bt0, actbt, hhdata,ipUrl,wfid) => {
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getPageSize',
                async:false,
                data:{
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid==undefined? '150801':wfid,
                    "type":"2",
                    "year":""

                },
                dataType:'json',
                timeout:'3000',
                success:function(data){


                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i in data.data) {
                        barlopowers3.push(data.data[i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[i].wtname);    //区域的横坐标
                    }

                    let width0=barlopowers3.length*60;
                    dispatch(actions.setVars('width0', width0));
                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));

                },
                error:function(){

                },
            })



            $("#boxhidden").show();
            $("#light").show();
        },
        hideit: (healthy3,namex3) =>{
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c=[];
            for (var i=0;i<10;i++) {

                barLotime3c[i] = healthy3[i];    //区域的横坐标
                power3c[i] = namex3[i];
            }
            dispatch(actions.setVars('healthy3', barLotime3c))
            dispatch(actions.setVars('namex3', power3c))



            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit:(befor_pages)=>{
            dispatch(actions.setVars('showPage',befor_pages));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
