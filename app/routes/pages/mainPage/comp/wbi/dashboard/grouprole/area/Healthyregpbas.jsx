import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_tsa from './Hly_tsa.jsx';
import Login from '../../../../../../../../components/common/Loading.jsx';
import Hly_ds from './Hly_ds.jsx';
var actions = require('redux/actions');
let bmId = require("../../../../urlData").groupId;
let data = require('./Healthy-data');
let text222 = data.data.line_date;

let Component = React.createClass({
    componentWillMount() {
        let {ipUrl,areaId}=this.props
        this.props.ajax(ipUrl,areaId);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {mapmonth,mon,w0="巴盟",areaId,w10,skinStyle,width0,jhp=false,hhdata3,changecolor, befor_pages = 'area',bt0, ipUrl, wfid,actbt=10, returnit,ip="10.68.100.32",runtime,downtime,tba0,name0,name2,runtime2,downtime2,tba2,gogogo,back,more,hideit} = this.props;
        if(jhp){
        return (

            <div className={skinStyle==1?styles.boxBlue:skinStyle==2?styles.boxWhite:styles.box}>
                {/*返回按钮*/}
                <div className={styles.light} id="light"> </div>
                <div className={`${styles.boxhidden} ${styles.box_shadow}`}   id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo3}></div>
                        <div className={styles.logo30}>
                            {mon+w10+"各风机TBA"}
                        </div>
                        <span onClick={()=>hideit(hhdata3,bt0)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                        <Hly_ds text={''}
                                jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                height={450}
                                widths={width0}
                                names={'TBA'}
                                name2={name2}
                                runtime2={runtime2}
                                downtime2={downtime2}
                                tba2={tba2 }></Hly_ds>
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
                <div className={styles.tbox}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_tsa text={"巴盟各风场TBA"}
                                 jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                 names={'TBA'}
                                 name0={name0}
                                 runtime={runtime}
                                 downtime={downtime}
                                 tba0={tba0}></Hly_tsa>
                        <div className={styles.logo3}>
                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={` ${styles.box_shadow} ${styles.fbox2}`}>
                        <div className={styles.rbox33}>
                            <button className={bt0===0? styles.button:styles.button22} onClick={() => gogogo(bt0, ipUrl, wfid,actbt,mapmonth,areaId,bmId)}>前10</button>
                            <button className={bt0===1? styles.button:styles.button22} onClick={() => back(bt0, ipUrl, wfid,actbt,mapmonth,areaId,bmId)}>后10</button>
                            <button className={styles.button22} onClick={() => more(hhdata3, wfid)}>更多</button>
                        </div>
                        <Hly_ds text={mon +w10+ "每日TBA"}
                                jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
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
        );}else {
            return (<Login></Login>)
        }
    }
});


const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbt,
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
        w0:state.vars.w1,
        w10:state.vars.w11,
        ipUrl: state.vars.ipUrl,
        wfid:state.vars.wfid,
        bt0: state.vars.bt0,
        jhp: state.vars.jhp,
        width0: state.vars.width0,
        skinStyle: state.vars.skinStyle,
        mapmonth: state.vars.mapmonth,
        areaId: state.vars.areaId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl,areaId,bmId) => {


            areaId=areaId[0];
            dispatch(actions.setVars('bt0',  0));

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
            function jiang(year) {

            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/TBA/getGroupAllWfByM',
                async:false,
                data:{
                    "groupid":areaId==undefined? bmId:areaId,
                    "year": year[10].year,
                    "month": year[10].yearpoweract,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata2',  data));
                    dispatch(actions.setVars('w11', data.data[0].wfname));

                    //各区域   一区域二区域
                    let runtime1=[];       //实际发电量
                    let downtime1=[];       //故障损失
                    let tba1=[];             //维护损失
                    let name1=[];
                    let wfid1=[];
                    for (var i in data.data) {
                        //区域的横坐标
                        name1.push(data.data[i].wfname)
                        runtime1.push(data.data[i].runtimes);   //实际发电量
                        downtime1.push(data.data[i].downtimes);   //故障损失
                        tba1.push(Number((data.data[i].tba*100).toFixed(2)));   //维护损失
                        wfid1.push(data.data[0].wfid);   //维护损失

                    }

                    dispatch(actions.setVars('name1', name1));
                    dispatch(actions.setVars('runtime1', runtime1));
                    dispatch(actions.setVars('downtime1', downtime1));
                    dispatch(actions.setVars('tba1', tba1));


                },
                error:function(){

                },
            })
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/TBA/getWfAllWtByM',
                async:false,
                data:{
                    "groupid":areaId==undefined? bmId:areaId,
                    "year": year[10].year,
                    "month": year[10].yearpoweract,
                    "wfid":'150801',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata3',  data));
                    //各区域   一区域二区域


                    let runtime2=[];       //实际发电量
                    let downtime2=[];       //故障损失
                    let tba2=[];       //维护损失
                    let name2=[];
                    for (var i=0;i<10;i++) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname)
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(Number((data.data[i].tba*100).toFixed(2))); //维护损失

                    }
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('jhp', true));

                },
                error:function(){
                    console.log("数据获取失败");
                },
            })
            }
        },

        init: () => {
            var obj = {
                test: ''
            }
        },
        changecolor:(value,key,ipUrl,areaId,bmId)=> {
            areaId=areaId[0];
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('mon', value.yearpoweract+"月"));


            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/TBA/getGroupAllWfByM',
                async:false,
                data:{
                    "groupid":areaId==undefined? bmId:areaId,
                    "year":value.year,
                    "month": value.yearpoweract,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    dispatch(actions.setVars('hhdata2',  data));
                    //各区域   一区域二区域
                    let runtime1=[];       //实际发电量
                    let downtime1=[];       //故障损失
                    let tba1=[];       //维护损失
                    let name1=[];
                    for (var i in data.data) {
                        //区域的横坐标
                        name1.push(data.data[i].wfname)
                        runtime1.push(data.data[i].runtimes);   //实际发电量
                        downtime1.push(data.data[i].downtimes);   //故障损失
                        tba1.push(Number((data.data[i].tba*100).toFixed(2))); //维护损失

                    }
                    dispatch(actions.setVars('w11', data.data[0].wfname));
                    dispatch(actions.setVars('name1', name1));
                    dispatch(actions.setVars('runtime1', runtime1));
                    dispatch(actions.setVars('downtime1', downtime1));
                    dispatch(actions.setVars('tba1', tba1));


                },
                error:function(){
                    console.log("数据获取失败");
                },
            })
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/TBA/getWfAllWtByM',
                async:false,
                data:{
                    "groupid":areaId==undefined? bmId:areaId,
                    "year":value.year,
                    "month": value.yearpoweract,
                    "wfid":'150801',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata3',  data));
                    //各区域   一区域二区域


                    let runtime2=[];       //实际发电量
                    let downtime2=[];       //故障损失
                    let tba2=[];       //维护损失
                    let name2=[];
                    for (var i=0;i<10;i++) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname)
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(Number((data.data[i].tba*100).toFixed(2)));  //维护损失

                    }
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('name2', name2));

                },
                error:function(){
                    console.log("数据获取失败");
                },
            })
        },
        gogogo: (bt0, ipUrl, wfid,actbt,mapmonth,areaId,bmId) => {
            areaId=areaId[0];
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getPageSize',
                async: false,
                data: {

                    "groupid":areaId==undefined? bmId:areaId,
                    "wfid": wfid == undefined ? '150828' : wfid,
                    "type": "0",
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
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
                        tba2.push(Number((data.data[i].tba*100).toFixed(2))); //维护损失

                    }
                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error: function () {
                    console.log("数据获取失败");
                },
            });


        },
        back: (bt0, ipUrl, wfid,actbt,mapmonth,areaId,bmId) => {
            areaId=areaId[0];
            dispatch(actions.setVars('bt0', 1));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/TBA/getPageSize',
                async: false,
                data: {

                    "groupid":areaId==undefined? bmId:areaId,
                    "wfid": wfid == undefined ? '150828' : wfid,
                    "type": "1",
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
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
                        tba2.push(Number((data.data[i].tba*100).toFixed(2))); //维护损失
                    }

                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error: function () {
                    console.log("数据获取失败");
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
                wrong31c.push(Number((hhdata3.data[i].tba*100).toFixed(2))); //故障损失

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
            for (var i=0;i<10;i++) {
                //区域的横坐标
                name2.push(hhdata3.data[i].wtname)
                runtime2.push(hhdata3.data[i].runtimes);   //实际发电量
                downtime2.push(hhdata3.data[i].downtimes);   //故障损失
                tba2.push(Number((hhdata3.data[i].tba*100).toFixed(2)));   //维护损失

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
