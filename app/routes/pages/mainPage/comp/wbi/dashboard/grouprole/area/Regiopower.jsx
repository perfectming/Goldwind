import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Login from '../../../../../../../../components/common/Loading.jsx';
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



let Component = React.createClass({
    componentWillMount() {
        let {ipUrl,areaId}=this.props
        this.props.ajax(ipUrl,areaId);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {befor_pages='area',boll5=false,skinStyle,areaId,w0,w10,width0,mapmonth, wc1,wc2,bt0=0, ipUrl, wfid,returnit,hideit,arr,arr2,gogogo,back,more,hhdata,actbt=10,changecolor,barlotimes1,barlopowers1,barlopowerp1,barlotimes2,barlopowers2,barlopowerp2,mon = "十一月份",} = this.props;
        if(boll5){


        return (

            <div className={skinStyle==1?styles.boxBlue:skinStyle==2?styles.boxWhite:styles.box}>

                <div className={styles.light} id="light"> </div>


                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo5}></div>
                        <div className={styles.logo30}>{mon+w10+"各风机PBA"}</div>
                        <span onClick={()=>hideit(barlotimes2,barlopowers2,barlopowerp2,bt0)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                    <Hly_gentwo    widths={width0}  height={450}
                                   jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                   name0={barlotimes2}
                                   powerplan1={barlopowers2}
                                   poweract2={barlopowerp2}
                                   text={""}></Hly_gentwo>
                     </div>

                </div>


                <div className={styles.onmonth}>
                    {
                        mapmonth.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={()=>changecolor(value,key,ipUrl,areaId)}>
                                    {value.yearpoweract+"月"}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={()=>returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_genone height={400}
                                    jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                    name0={barlotimes1}
                                    powerplan1={barlopowers1}
                                    poweract2={barlopowerp1}
                                    text={mon+"各风场发电量"}></Hly_genone>
                        <div className={styles.logo5}>

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
                            <button className={bt0===0? styles.button:styles.button22} onClick={() => gogogo( bt0,actbt, hhdata,ipUrl, wfid,mapmonth,areaId)}>前10</button>
                            <button className={bt0===1? styles.button:styles.button22} onClick={() => back(bt0, actbt, hhdata,ipUrl, wfid,mapmonth,areaId)}>后10</button>
                            <button className={styles.button22} onClick={() => more(bt0, actbt, hhdata, ipUrl, wfid,mapmonth,areaId)}>更多</button>
                        </div>
                        <Hly_gentwo    height={390}
                                       jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                       name0={barlotimes2}
                                       powerplan1={barlopowers2}
                                       poweract2={barlopowerp2}
                                       text={mon+w10+"各风机PBA"}></Hly_gentwo>
                        <div className={styles.logomini5}>

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
        w10: state.vars.w11,
        wc2: state.vars.wc2,
        ipUrl: state.vars.ipUrl,
        wfid:state.vars.wfid,
        mon:state.vars.mon,
        width0:state.vars.width0,
        areaId: state.vars.areaId,
        skinStyle: state.vars.skinStyle,
        mapmonth: state.vars.mapmonth,
        boll5: state.vars.boll5,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl,areaId) => {
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
            }

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
                    dispatch(actions.setVars('mon',  data.data[10].yearpoweract+"月"));
                    jiang(data.data);
                },
                error: function () {
                    console.log("数据获取失败");
                },
            });

            dispatch(actions.setVars('bt0',  0));

            function jiang(year) {


            areaId=areaId[0];
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/ELEC/getAreaSpaceElec',
                async:false,
                data:{
                    "groupid":areaId==undefined? '201612121721151':areaId,
                    "wfid":'',
                    "year": year[10].year,
                    "month": year[10].yearpoweract,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata',  data));

                    let barlotimes1 = [];
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data.AreaWtids) {
                        barlotimes1.push(data.data.AreaWtids[i].wfname);    //区域的横坐标
                        barlopowers1.push(Number((data.data.AreaWtids[i].powerplan).toFixed(2)));   //计划发电量
                        barlopowerp1.push(Number((data.data.AreaWtids[i].poweract).toFixed(2)));   //实际发电量
                    }

                    let w10=data.data.AreaWtids[0].wfname;

                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i=0;i<10;i++) {
                        barlotimes2.push(data.data.wfElecs[i].wtname);    //区域的横坐标
                        barlopowers2.push(Number((data.data.wfElecs[i].powerplan).toFixed(2)));   //计划发电量
                        barlopowerp2.push(Number((data.data.wfElecs[i].poweract).toFixed(2)));   //实际发电量
                    }

                    dispatch(actions.setVars('barlotimes1', barlotimes1));
                    dispatch(actions.setVars('barlopowers1', barlopowers1));
                    dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));

                    dispatch(actions.setVars('w11',w10 ));
                    dispatch(actions.setVars('boll5',true ));

                },
                error:function(){
                    console.log("数据获取失败");
                },
            })
            }




            var obj = {
                test: ''
            }
        },
        init: () => {


        },
        changecolor:(value,key,ipUrl,areaId)=>{

            dispatch(actions.setVars('bt0',  0));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('mon', value.yearpoweract+"月"));


            areaId=areaId[0];
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/ELEC/getAreaSpaceElec',
                async:false,
                data:{

                    "groupid":areaId==undefined? '201612121721151':areaId,
                    "wfid":'',
                    "year":value.year,
                    "month": value.yearpoweract,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata',  data));
                    let w10=data.data.AreaWtids[0].wfname;

                    let barlotimes1 = [];
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data.AreaWtids) {
                        barlotimes1.push(data.data.AreaWtids[i].wfname);    //区域的横坐标
                        barlopowers1.push(Number((data.data.AreaWtids[i].powerplan).toFixed(2)));     //计划发电量
                        barlopowerp1.push(Number((data.data.AreaWtids[i].poweract).toFixed(2)));   //实际发电量
                    }

                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i=0;i<10;i++) {
                        barlotimes2.push(data.data.wfElecs[i].wtname);    //区域的横坐标
                        barlopowers2.push(Number((data.data.wfElecs[i].powerplan).toFixed(2)));   //计划发电量
                        barlopowerp2.push(Number((data.data.wfElecs[i].poweract).toFixed(2)));     //实际发电量
                    }


                    dispatch(actions.setVars('barlotimes1', barlotimes1));
                    dispatch(actions.setVars('barlopowers1', barlopowers1));
                    dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));
                    dispatch(actions.setVars('w11', w10));


                },
                error:function(){
                    console.log("数据获取失败");
                },
            })

        },
        gogogo: (bt0, actbt, hhdata, ipUrl, wfid,mapmonth,areaId) => {
            dispatch(actions.setVars('bt0', 0));
            areaId=areaId[0];
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "groupid":areaId==undefined? '201612121721151':areaId,
                    "wfid":wfid == undefined ? '150828' : wfid,
                    "type":"0",
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c=[];       //计划发电量
                    let wrong30c=[];       //实际发电量

                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(Number((data.data[i].powerplan).toFixed(2)));     //实际发电量
                        wrong30c.push(Number((data.data[i].poweract).toFixed(2)));    //故障损失

                    }

                    dispatch(actions.setVars('barlotimes2', barLotime3c))
                    dispatch(actions.setVars('barlopowers2', power3c))
                    dispatch(actions.setVars('barlopowerp2', wrong30c))


                },
                error: function () {
                    console.log("数据获取失败");
                },
            });






        },
        back: (bt0, actbt, hhdata, ipUrl, wfid,mapmonth,areaId) => {
            dispatch(actions.setVars('bt0', 1));
            areaId=areaId[0];
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "groupid":areaId==undefined? '201612121721151':areaId,
                    "wfid":wfid == undefined ? '150828' : wfid,
                    "type":"1",
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c=[];       //计划发电量
                    let wrong30c=[];       //实际发电量

                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(Number((data.data[i].powerplan).toFixed(2)));     //实际发电量
                        wrong30c.push(Number((data.data[i].poweract).toFixed(2)));   //故障损失

                    }

                    dispatch(actions.setVars('barlotimes2', barLotime3c))
                    dispatch(actions.setVars('barlopowers2', power3c))
                    dispatch(actions.setVars('barlopowerp2', wrong30c))


                },
                error: function () {
                    console.log("数据获取失败");
                },
            });
        },
        more: (bt0, actbt, hhdata, ipUrl, wfid,mapmonth,areaId) => {
            areaId=areaId[0];
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/ELEC/getPageSize',
                async: false,
                data: {
                    "groupid":areaId==undefined? '201612121721151':areaId,
                    "wfid":wfid == undefined ? '150828' : wfid,
                    "type":"2",
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c=[];       //计划发电量
                    let wrong30c=[];       //实际发电量

                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(Number((data.data[i].powerplan).toFixed(2)));     //实际发电量
                        wrong30c.push(Number((data.data[i].poweract).toFixed(2)));   //故障损失

                    }
                    let width0=barLotime3c.length*60;
                    dispatch(actions.setVars('width0', width0));
                    dispatch(actions.setVars('barlotimes2', barLotime3c))
                    dispatch(actions.setVars('barlopowers2', power3c))
                    dispatch(actions.setVars('barlopowerp2', wrong30c))


                },
                error: function () {
                    console.log("数据获取失败");
                },
            });
            $("#light").show();
            $("#boxhidden").show();
        },
        hideit: (barlotimes2,barlopowers2,barlopowerp2,bt0) =>{
            dispatch(actions.setVars('bt0', 0));
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c=[];       //计划发电量
            let wrong30c=[];       //实际发电量


            for (var i=0;i<10;i++) {

                barLotime3c[i]=barlotimes2[i];    //区域的横坐标
                power3c[i]=barlopowers2[i];  //实际发电量
                wrong30c[i]=barlopowerp2[i];   //故障损失

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
