import React from 'react';
import {connect} from 'react-redux';
import styles from './Alarm.scss';
import AlarmTable from '../yModule/Alarm_table.jsx';

let comps = require('./Alarm_dorpmenu.js');

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
    buttonAction (){
        // 获取select 选择的内容
        var sType = this.refs.selectType0.value;
        var sType1 = this.refs.selectType1.value;
        var sType2 = this.refs.selectType2.value;
        var sType3 = this.refs.selectType3.value;
        //开始时间
        var sTime = this.refs.startTime.value;
        //结束时间时间
        var eTime = this.refs.endTime.value;

        var tContent = this.refs.textContent5.value;
        var tContent1 = this.refs.textContent6.value;

       

        if(sTime == '' || eTime == ''){
            alert('请选择开始或者结束时间');
            return false;
        }
        console.log(sType);
        alert(sType+sType1+sType2+sType3+sTime+eTime+tContent+tContent1);
        // 在这个下边获取这个时间段的数据就行了
        // 然后去更新图表
    },

    render() {
         let {buttonAction, inputOnChange, onFocus} = this.props;
        let comp = comps.comps.from;
        return (
            <div className={styles.alarmBox}>
                <div className={styles.inquireBox}>
                    {
                        comp.map((value, key,valueName)=> {
                            if (value.type === 'date') {
                                return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input ref="startTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input ref="endTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                            } else  if (value.type === 'input') {
                                return (
                                    <div className={styles.inputBox} key={key}>
                                        <span>{comp[key].valueName}</span>
                                        <input ref={'textContent'+key} placeholder={value.content}
                                               onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                               onFocus={()=>onFocus} style={{width:value.width}}/>
                                    </div>
                                )
                            }else if (value.type === 'select') {
                                return (
                                    <div className={styles.seleBox} key={key}>
                                        <span>{comp[key].valueName}</span>
                                        <select ref={'selectType'+key}>
                                            {value.select.map((value, key)=> {
                                                return (
                                                    <option value={value} key={key}>{value}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                )
                            } else if (value.type === 'button') {
                                return (
                                    <div className={styles.btnBox} key={key}>
                                        <button onClick={this.buttonAction}>{value.title}</button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className={styles.tableBox}>
                    <AlarmTable></AlarmTable>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        inputOnChange:(value,id)=>{
           
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
