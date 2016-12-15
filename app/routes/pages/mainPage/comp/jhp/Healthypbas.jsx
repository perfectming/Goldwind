import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_tsa from './Hly_tsa.jsx';

import Hly_ds from './Hly_ds.jsx';
var actions = require('redux/actions');
let ip="10.68.100.32";

let data = require('./Healthy-data');
let month = data.data.line_month;
let barLoTime1 = data.data.line_month;
let barLoPowerValue1 = data.data.bar_loPower;
let barRoPowerValue1 = data.data.bar_roPowers;
let barRoPowerValues1 = data.data.bar_roPowerses;
let barLdpowerValue2 = data.data.line_date;
let barLpdpowerValue2 = data.data.line_pdate;
let barlinepdats2 = data.data.line_pdates;
let barlinepdat2 = data.data.line_pdatess;
let text222 = data.data.line_date;

let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {hhdata, befor_pages = 'group', returnit,ip="10.68.100.32",runtime,downtime,tba0,name0,name2,runtime2,downtime2,tba2} = this.props;
        console.log(hhdata)
        return (




            <div className={styles.box}>
                {/*返回按钮*/}
                <div className={styles.return2} onClick={() => returnit(befor_pages)}>返回</div>
                <div className={styles.tbox2}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_tsa text={"区域每月TBA"}

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
                <div className={`${styles.fbox} `}>
                    <div className={` ${styles.logofa} ${styles.box_shadow}`}>
                        <Hly_ds text={"集团" + text222[4] + "月每日TBA"} names={'TBA'}
                                name0={name2}
                                runtime={runtime2}
                                downtime={downtime2}
                                tba0={tba2}></Hly_ds>
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
        hhdata: state.vars.hhdata,
        runtime: state.vars.runtime1,
        downtime: state.vars.downtime1,
        pba0: state.vars.pba1,
        runtime2: state.vars.runtime2,
        downtime2: state.vars.downtime2,
        pba2: state.vars.pba2,
        name2: state.vars.name2,
        name0: state.vars.name1,

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
                    "month":1,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    console.log(data)
                    dispatch(actions.setVars('hhdata',  data));
                     //各区域   一区域二区域
                    let runtime1=[];       //实际发电量
                    let downtime1=[];       //故障损失
                    let tba1=[];       //维护损失
                    let name1=[];
                    for (var i in data.data[0]) {
                         //区域的横坐标
                        name1.push(data.data[0][i].wfname)
                        runtime1.push(data.data[0][i].runtime);   //实际发电量
                        downtime1.push(data.data[0][i].downtime);   //故障损失
                        tba1.push(data.data[0][i].pba0);   //维护损失

                    }
                    dispatch(actions.setVars('runtime1', runtime1));
                    dispatch(actions.setVars('name1', name1));
                    dispatch(actions.setVars('downtime1', downtime1));
                    dispatch(actions.setVars('tba1', tba1));

                    let runtime2=[];       //实际发电量
                    let downtime2=[];       //故障损失
                    let tba2=[];       //维护损失
                    let name2=[];
                    for (var i in data.data[1]) {
                        //区域的横坐标
                        name2.push(data.data[1][i].wtname)
                        runtime2.push(data.data[1][i].runtime);   //实际发电量
                        downtime2.push(data.data[1][i].downtime);   //故障损失
                        tba2.push(data.data[1][i].pba0);   //维护损失

                    }
                    dispatch(actions.setVars('runtime1', runtime1));
                    dispatch(actions.setVars('downtime1', downtime1));
                    dispatch(actions.setVars('tba1', tba1));
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
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
