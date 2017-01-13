import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Reg_tbat from './Reg_tbat.jsx';
import Reg_tbats from './Reg_tbats.jsx';
var actions = require('redux/actions');
let ip="10.68.100.32";



let Component = React.createClass({
    componentWillMount() {
        let {ipUrl,areaId}=this.props
        this.props.ajax(ipUrl,areaId);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {befor_pages = 'area',skinStyle, returnit,name0,ipUrl,runtime,downtime,tba0,name2,runtime2,downtime2,tba2,actbt,hhdata,w0,mon} = this.props;
        let data = require('./Healthy-data');
        let month=data.data.line_month;
        let text0=data.data.line_date;
        return (




            <div className={skinStyle==1?styles.boxBlue:skinStyle==2?styles.boxWhite:styles.box}>
                <div className={styles.paddingtop}>
                <div className={styles.return2} onClick={() => returnit(befor_pages)}>返回</div>
                </div>
                <div className={styles.tbox2}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Reg_tbat
                                    name0={name0}
                                    jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                    runtime={runtime}
                                    downtime={downtime}
                                    tba0={tba0}
                                    text={"巴盟区域各月份TBA"}></Reg_tbat>
                        <div className={styles.logo3}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>

                <div className={`${styles.fbox} ${styles.logofa} `}>
                    <div className={` ${styles.box_shadow}  ${styles.fbox2}`}>
                        <Reg_tbats height={450}
                                   jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                   name2={name2}
                                   runtime2={runtime2}
                                   downtime2={downtime2}
                                   tba2={tba2}
                                   text={mon+"每日TBA"}></Reg_tbats>
                        <div className={styles.logomini3}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
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
        actbt:state.vars.actbt,
        hhdata: state.vars.hhdata,
        ipUrl: state.vars.ipUrl,
        wfid:state.vars.wfid,
        skinStyle: state.vars.skinStyle,
        areaId: state.vars.areaId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl,areaId) => {
            areaId=areaId[0];
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
                year=year-1;
            }
            dispatch(actions.setVars('bt0',  0));
            dispatch(actions.setVars('actbt',  month2-1));
            dispatch(actions.setVars('mon',  month2+"月"));

            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/TBA/getMonthsTBAByG',
                async:false,
                data:{
                    "year":year,
                    "month":month2,
                    "groupid":areaId==undefined? '201612121721151':areaId,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata',  data));
                    let runtime1=[];       //实际发电量
                    let downtime1=[];       //故障损失
                    let tba1=[];       //维护损失
                    let name1=[];
                    let wfid1=[];
                    for (var i in data.data) {
                        //区域的横坐标
                        name1.push(data.data[i].month+"月")
                        runtime1.push(data.data[i].runtimes);   //实际发电量
                        downtime1.push(data.data[i].downtimes);   //故障损失
                        tba1.push(Number((data.data[i].tba*100).toFixed(2)));     //维护损失
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
                url:'http://'+ipUrl+'/wbi/TBA/getDaysTBAByG',
                async:false,
                data:{
                    "year":year,
                    "month":month2,
                    "groupid":areaId==undefined? '201612121721151':areaId,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    //各区域   一区域二区域


                    let runtime2=[];       //实际发电量
                    let downtime2=[];       //故障损失
                    let tba2=[];       //维护损失
                    let name2=[];
                    for (var i in data.data) {
                        //区域的横坐标
                        name2.push(data.data[i].day+"日");
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(Number((data.data[i].tba*100).toFixed(2)));     //维护损失
                    }
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('name2', name2));
                },
                error:function(){

                },
            })


            var obj = {
                test:''
            }
        },
        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test:''
            }
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
