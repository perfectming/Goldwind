import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_tsa from './Hly_tsa.jsx';

import Hly_ds from './Hly_ds.jsx';
var actions = require('redux/actions');
let ip="10.9.101.15";

let data = require('./Healthy-data');
let text222 = data.data.line_date;

let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {hhdata,mon,w0,changecolor, befor_pages = 'group',actbt=10, returnit,ip="10.68.100.32",runtime,downtime,tba0,name0,name2,runtime2,downtime2,tba2} = this.props;

        return (




            <div className={styles.box}>
                {/*返回按钮*/}
                <div className={styles.light} id="light"> </div>


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
                <div className={styles.tbox}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_tsa text={"巴盟区域各风场TBA"}
                                 names={'TBA'}
                                 name0={name0}
                                 runtime={runtime}
                                 downtime={downtime}
                                 tba0={tba0*100}></Hly_tsa>
                        <div className={styles.logo3}>
                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox} `}>
                    <div className={` ${styles.logofa} ${styles.box_shadow}`}>
                        <Hly_ds text={"集团" + text222[4] + "月每日TBA"}
                                names={'TBA'}
                                name0={name2}
                                runtime={runtime2}
                                downtime={downtime2}
                                tba0={tba2*100}></Hly_ds>
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
        actbt:state.vars.actbt,
        hhdata: state.vars.hhdata,
        name0: state.vars.name1,
        runtime: state.vars.runtime1,
        downtime: state.vars.downtime1,
        pba0: state.vars.pba1,
        name2: state.vars.name2,
        runtime2: state.vars.runtime2,
        downtime2: state.vars.downtime2,
        pba2: state.vars.pba2,
        mon: state.vars.mon,
        w0:state.vars.w1,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {
            var obj = {
                test: ''
            }
            $.ajax({
                type:'post',
                url:'http://'+ip+':8080/wbi/TBA/getGroupAllWfByM',
                async:false,
                data:{
                    "groupid":  '201612121721151',
                    "month":11,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata',  data));
                    console.log(data)
                    //各区域   一区域二区域
                    let runtime1=[];       //实际发电量
                    let downtime1=[];       //故障损失
                    let tba1=[];       //维护损失
                    let name1=[];
                    let wfid1=[];
                    for (var i in data.data) {
                        //区域的横坐标
                        name1.push(data.data[i].wfname)
                        runtime1.push(data.data[i].runtimes);   //实际发电量
                        downtime1.push(data.data[i].downtimes);   //故障损失
                        tba1.push(data.data[i].tba);   //维护损失
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
                url:'http://'+ip+':8080/wbi/TBA/getWfAllWtByM',
                async:false,
                data:{
                    "groupid":  '201612121721151',
                    "month":'11',
                    "wfid":'150828',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    console.log(data)
                    //各区域   一区域二区域


                    let runtime2=[];       //实际发电量
                    let downtime2=[];       //故障损失
                    let tba2=[];       //维护损失
                    let name2=[];
                    for (var i in data.data) {
                        //区域的横坐标
                        name2.push(data.data[i].wtname)
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(data.data[i].tba);   //维护损失

                    }
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('name2', name2));

                },
                error:function(){

                },
            })
        },

        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test: ''
            }
        },
        changecolor:(value,key)=> {
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind', value.plan));
            dispatch(actions.setVars('winds', value.actrul));
            dispatch(actions.setVars('windss', value.actruls));

            $.ajax({
                type:'post',
                url:'http://'+ip+':8080/wbi/TBA/getGroupAllWfByM',
                async:false,
                data:{
                    "groupid":  '201612121721151',
                    "month":key+1,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    dispatch(actions.setVars('hhdata',  data));
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
                        tba1.push(data.data[i].tba);   //维护损失

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
                url:'http://'+ip+':8080/wbi/TBA/getWfAllWtByM',
                async:false,
                data:{
                    "groupid":  '201612121721151',
                    "month":key+1,
                    "wfid":'150828',
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
                        name2.push(data.data[i].wtname)
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(data.data[i].tba);   //维护损失

                    }
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));
                    dispatch(actions.setVars('name2', name2));

                },
                error:function(){

                },
            })
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
