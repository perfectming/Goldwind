import React from 'react';
import {connect} from 'react-redux';
import styles from './Alarm.scss';
import AlarmTable from './Alarm_table.jsx';
import AlertWindow from '../../wbi/KPI/AlertWindow.jsx';//提示框
let comps = require('./Alarm_dorpmenu.js');

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {skinStyle,searchinfo,alertText} = this.props;
        let comp = comps.comps.from;
        return (
            <div className={skinStyle==2?styles.alarmBoxWhite:styles.alarmBox}>
                <AlertWindow text={alertText}></AlertWindow>
                <div className={styles.inquireBox} id='allselect'>
                    <div className={styles.seleBox}>
                        <span>告警级别</span>
                        <select>
                            <option>全部</option>    
                        </select>
                    </div>
                    <div className={styles.seleBox}>
                        <span>设备类型</span>
                        <select >
                            <option>全部</option>    
                        </select>
                    </div>
                    <div className={styles.seleBox}>
                        <span>确认</span>
                        <select >
                            <option>是</option>    
                        </select>
                    </div>
                    <div className={styles.seleBox}>
                        <span >确认人</span>
                        <select>
                            <option>刘琦</option>    
                        </select>
                    </div>
                    <div className={styles.dateBox}>
                        <span>发生时间</span><input id="startTime1" type='date'/>
                        <span>结束时间</span><input id="endTime1" type='date'/>
                    </div>
                    <div className={styles.btnBox}>
                        <button onClick={()=>searchinfo()}>查询</button>
                    </div>
                   
                </div>
                <div className={styles.tableBox}>
                    <AlarmTable></AlarmTable>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        skinStyle: state.vars.skinStyle,
        alertText:state.vars.alertText,//弹框提示文字
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            //初始化日期
            var date = new Date();
            if(date.getMonth()==0&&date.getDate()==1){
                var dateString = date.getFullYear()+"-01"+"-01";
                var dateString1 = (date.getFullYear()-1)+"-12"+"-31";
            }else{
                if(date.getMonth()<9){
                    if(date.getDate()<10){
                       var dateString = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate(); 
                    }else{
                       var dateString = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate(); 
                    }
                }else{
                    if(date.getDate()<10){
                       var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate(); 
                    }else{
                       var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(); 
                    }
                }
                if(date.getMonth()<9){
                    if(date.getDate()<11){
                       var dateString1 = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()-1); 
                    }else{
                       var dateString1 = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+(date.getDate()-1); 
                    }
                }else{
                    if(date.getDate()<11){
                       var dateString1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+(date.getDate()-1); 
                    }else{
                       var dateString1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1); 
                    }
                }
            }
            
            //获取今天与昨天的日期
            $('#startTime1').val(dateString1);
            $('#endTime1').val(dateString);
           
        },
        searchinfo:()=>{
            let info=[];
            $('#allselect select').each(function(){
                info.push($(this).val())
            })
             info.push($('#startTime1').val())
             info.push($('#endTime1').val())

            dispatch(actions.setVars('alertBool', false));//弹窗
            dispatch(actions.setVars('alertText', info));//弹窗提示信息
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
