import React from 'react';
import {connect} from 'react-redux';
import styles from './SelectTwoStyle.scss';


let data = require('./TimeSelect-data.js');

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
    buttonAction (){
        // 获取select 选择的内容
        //开始时间
        var sTime = this.refs.startTime.value;
        //结束时间时间
        var eTime = this.refs.endTime.value;

        if(sTime == '' || eTime == ''){
            alert('请选择开始或者结束时间');
            return false;
        }
        
        // 在这个下边获取这个时间段的数据就行了
        // 然后去更新图表
    },

    render() {
        let {buttonAction, inputOnChange, onFocus} = this.props;
        let comp = data.list;
        return (	
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
                        }else if (value.type === 'select') {
                            return (
                                    <div className={styles.seleBox} key={key}>
                                        <span>选择KPI损失电量对象</span>
                                        <select ref={'selectType'+key}>
                                            {value.select.map((value, key)=> {
                                                return (
                                                    <option value={value} key={key}>{value}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                )
                        }else if (value.type === 'button') {
                            return (
                                    <div className={styles.btnBox} key={key}>
	                                    <div className={styles.bBox}>
	                                        <button onClick={this.buttonAction}>{value.title}</button>
	                                    </div>
	                                    <div className={styles.bBox}>
	                                        <button onClick={this.buttonAction}>{"重置"}</button>
	                                    </div>
                                    </div>
                                )
                        }else if (value.type === 'radio') {
                            return (
                                    <div className={styles.radioBox} key={key}>
	                                    <span>指标项选择</span>
	                                    <input type={value.type} name={value.type}/>
	                                    <span>损失电量</span>
	                                    <input type={value.type} name={value.type}/>
	                                    <span>损失收入</span>
                                    </div>
                                )
                        }
                        })
                    }
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