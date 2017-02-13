import React from 'react';
import {connect} from 'react-redux';
import styles from './Alarm.scss';
import AlarmTable from './Alarm_table.jsx';

let comps = require('./Alarm_dorpmenu.js');

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
         let {skinStyle,searchinfo} = this.props;
        let comp = comps.comps.from;
        return (
            <div className={skinStyle==2?styles.alarmBoxWhite:styles.alarmBox}>
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
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            //初始化日期
            let date = new Date();
            let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            let yestoday = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1);
            //获取今天与昨天的日期
            $('#startTime1').val(yestoday);
            $('#endTime1').val(today)
           
        },
        searchinfo:()=>{
            let info=[];
            $('#allselect select').each(function(){
                info.push($(this).val())
            })
             info.push($('#startTime1').val())
             info.push($('#endTime1').val())
            alert(info)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
