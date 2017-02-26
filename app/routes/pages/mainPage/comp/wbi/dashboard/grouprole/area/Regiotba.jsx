import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_pbath from './Hly_pbath.jsx';
import Hly_pbatwo from './Hly_pbatwo.jsx';
import Login from '../../../../../../../../components/common/Loading.jsx';
var actions = require('redux/actions');
var $ = require("jquery");
let bmId = require("../../../../urlData").groupId;//id
let Component = React.createClass({
    componentWillMount() {
        let {ipUrl,areaId}=this.props
        this.props.ajax(ipUrl,areaId,bmId);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {areaId,ipUrl,befor_pages='area',jhp=false,skinStyle,mapmonth,hhdata,w0,mon="十一月份", returnit,barLotime1,actbt=10,changecolor, hhdata4, hideit,gogogo,back,more,arr,arr2,power1, wrong10, wrong11, wrong12, wrong13, pba1, barRotimes,barRotime, power2, wrong20, wrong21, wrong22, wrong23, pba2, barLotime2,} = this.props;
        let data = require('./Healthy-data');
        let month = data.data.line_month;
        let button=data.data.button;

        let text0=data.data.line_date;

        if(jhp){


        return (

            <div className={skinStyle==1?styles.boxBlue:skinStyle==2?styles.boxWhite:styles.box}>
                <div className={styles.paddingtop}>
                <div className={styles.return2} onClick={() => returnit(befor_pages)}>返回</div>
                </div>
                <div className={styles.tbox2}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_pbath height={400} text={'巴盟每月PBA'}
                                   jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                    barRotime={barLotime2}
                                    power2={power2}
                                    wrong20={wrong20}
                                    wrong21={wrong21}
                                    wrong22={wrong22}
                                    wrong23={wrong23}
                                    pba2={pba2}
                        ></Hly_pbath>
                        <div className={styles.logo2}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>

                <div className={`${styles.fbox} ${styles.logofa} `}>
                    <div className={` ${styles.box_shadow}  ${styles.fbox2}`}>
                        <Hly_pbatwo height={450} text={mon+"每日PBA"}
                                    jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                    barRotimes={barLotime1}
                                    power1={power1}
                                    wrong10={wrong10}
                                    wrong11={wrong11}
                                    wrong12={wrong12}
                                    wrong13={wrong13}
                                    pba1={pba1}
                        ></Hly_pbatwo>
                        <div className={styles.logomini2}>

                        </div>
                    </div>
                </div>
            </div>
        );     }else {
            return (<Login></Login>)
        }
    }
});


const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbt,
        wind:state.vars.wind,
        winds:state.vars.winds,
        windss:state.vars.windss,
        arr: state.vars.arr,
        arr2: state.vars.arr2,
        barLotime2: state.vars.barLotime21,
        power2: state.vars.power21,
        wrong20: state.vars.wrong201,
        wrong21: state.vars.wrong211,
        wrong22: state.vars.wrong221,
        wrong23: state.vars.wrong231,
        pba2: state.vars.pba21,
        barLotime1: state.vars.barLotime1,
        power1: state.vars.power1,
        wrong10: state.vars.wrong10,
        wrong11: state.vars.wrong11,
        wrong12: state.vars.wrong12,
        wrong13: state.vars.wrong13,
        pba1: state.vars.pba1,
        hhdata4: state.vars.hhdata4,
        mon: state.vars.mon,
        w0: state.vars.w1,
        wc1: state.vars.wc1,
        wc2: state.vars.wc2,
        hhdata: state.vars.hhdata,
        bt0: state.vars.bt0,
        ipUrl: state.vars.ipUrl,
        wfid: state.vars.wfid,
        width0: state.vars.width0,
        areaId: state.vars.areaId,
        skinStyle: state.vars.skinStyle,
        jhp: state.vars.jhp,
        mapmonth: state.vars.mapmonth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl,areaId,bmId) => {
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
                year=year-1;
            }
            areaId=areaId[0];
            dispatch(actions.setVars('actbt',  month2-1));
            dispatch(actions.setVars('mon',  month2+"月"));
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/PBA/getCompanyByGroupidMonthPBA',
                async:false,
                data:{
                    "year":year,
                    "month":month2,
                    "groupid":areaId==undefined? bmId:areaId,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata4',  data));

                    let barLotime21 = [];    //各区域   一区域二区域
                    let power21=[];       //实际发电量
                    let wrong201=[];       //故障损失
                    let wrong211=[];       //维护损失
                    let wrong221=[];       //限功率损失
                    let wrong231=[];       //非设备原因损失
                    let pba21=[];
                    for (var i in data.data) {
                        barLotime21.push(data.data[i].month+"月");    //区域的横坐标
                        power21.push(data.data[i].poweract);   //实际发电量
                        wrong201.push(data.data[i].faultloss);   //故障损失
                        wrong211.push(data.data[i].maintainloss);   //维护损失
                        wrong221.push(data.data[i].limitloss);   //限功率损失
                        wrong231.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba21.push(Number((data.data[i].pba*100).toFixed(2)));    //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime21', barLotime21));
                    dispatch(actions.setVars('power21', power21));
                    dispatch(actions.setVars('wrong201', wrong201));
                    dispatch(actions.setVars('wrong211', wrong211));
                    dispatch(actions.setVars('wrong221', wrong221));
                    dispatch(actions.setVars('wrong231', wrong231));
                    dispatch(actions.setVars('pba21', pba21));
                    dispatch(actions.setVars('jhp', true));


                },
                error:function(){
                    console.log("数据获取失败");
                },
            })
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/PBA/getCompanyByGroupidDayPBA',
                async:false,
                data:{
                    "year":year,
                    "month":month2,
                    "groupid":areaId==undefined? bmId:areaId,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    let barLotime21q = [];    //各区域   一区域二区域
                    let power21q=[];       //实际发电量
                    let wrong201q=[];       //故障损失
                    let wrong211q=[];       //维护损失
                    let wrong221q=[];       //限功率损失
                    let wrong231q=[];       //非设备原因损失
                    let pba21q=[];
                    for (var i in data.data) {
                        barLotime21q.push(data.data[i].day+"日");    //区域的横坐标
                        power21q.push(data.data[i].poweract);   //实际发电量
                        wrong201q.push(data.data[i].faultloss);   //故障损失
                        wrong211q.push(data.data[i].maintainloss);   //维护损失
                        wrong221q.push(data.data[i].limitloss);   //限功率损失
                        wrong231q.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba21q.push(Number((data.data[i].pba*100).toFixed(2)));    //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime1', barLotime21q));
                    dispatch(actions.setVars('power1', power21q));
                    dispatch(actions.setVars('wrong10', wrong201q));
                    dispatch(actions.setVars('wrong11', wrong211q));
                    dispatch(actions.setVars('wrong12', wrong221q));
                    dispatch(actions.setVars('wrong13', wrong231q));
                    dispatch(actions.setVars('pba1', pba21q));


                },
                error:function(){
                    console.log("数据获取失败");
                },
            })
            var obj = {
                test: ''
            }
        },
        init: () => {
            var obj = {
                test: ''
            }
        },


        returnit:(befor_pages)=>{
            dispatch(actions.setVars('showPage',befor_pages));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
