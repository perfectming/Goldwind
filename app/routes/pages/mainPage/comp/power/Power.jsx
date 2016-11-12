import React from 'react';
import {connect} from 'react-redux';
import styles from './Power.scss';
import Bar_l from './Bar_l.jsx';
import Bar_r from './Bar_r.jsx';
import Line_l from './Line_l.jsx';
import Line_r from './Line_r.jsx';

var actions = require('redux/actions');
let comps = require('../../../../../../config/comp');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    buttonAction (){
        // 获取select 选择的内容

        var sType = this.refs.selectType.value
        //开始时间
        var sTime = this.refs.startTime.value
        //结束时间时间
        var eTime = this.refs.endTime.value
        if(sTime == '' || eTime == ''){
            alert('请选择开始或者结束时间');
            return false;
        }
        alert(sType+sTime+eTime);
        // 在这个下边获取这个时间段的数据就行了
        // 然后去更新图表
    },
    render() {
         let {buttonAction, inputOnChange, onFocus} = this.props;
        let comp = comps.comps.from;
        return (
            <div className={styles.powerBox}>
                <div className={styles.inquireBox}>
                    {
                        comp.map((value, key)=> {
                            if (value.type === 'date') {
                                return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input ref="startTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input ref="endTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                            } else if (value.type === 'select') {
                                return (
                                    <div className={styles.seleBox} key={key}>
                                        <select ref="selectType">
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
                <div className={styles.chartBox}>
                    <div className={styles.barOne}>
                        <Bar_l></Bar_l>
                    </div>
                    <div className={styles.barTwo}>
                        <Bar_r></Bar_r>
                    </div>
                    <div className={styles.lineOne}>
                        <Line_l></Line_l>
                    </div>
                    <div className={styles.lineTwo}>
                        <Line_r></Line_r>
                    </div>
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
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
