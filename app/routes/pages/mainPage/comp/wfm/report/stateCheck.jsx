//设备状态统计用例规划
import React from 'react';
import {connect} from 'react-redux';
import styles from './stateCountStyle.scss';
import Column from './colum.jsx';
import Login from '../../../../../../components/common/Loading.jsx';

var actions = require('redux/actions');
var $ =require('jquery');
let url='54.223.200.134';

let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidlMount() {
        this.props.init();
    },
    render() {
        let {searchData}=this.props;
        return(
            <div className={styles.bodyBox}>
                <div className={styles.searchBox}> 
                    <div className={styles.selectBox}>

                    </div>
                    <div className={styles.timeBox}>
                        <span>发生时间</span><input id="startTime" type='date'/>
                        <span>结束时间</span><input id="endTime" type='date'/>
                    </div>
                    <div className={styles.btnBox}>
                        <button id='searchall' onClick={()=>searchData()}><img src={'http://'+url+'/images/button/search.gif'}/>查询</button>
                    </div>
                    <div className={styles.btnBox}>
                        <button><img src={'http://'+url+'/images/button/outbox.gif'}/>附加数据</button>
                    </div>
                    <div className={styles.btnBox}>
                        <button><img src={'http://'+url+'/images/button/outbox.gif'}/>导出Excel</button>
                    </div>
                </div>
                <div className={styles.leftBox}>

                </div>
                <div className={styles.rightBox}>
                    <div className={styles.columnBox}>
                        <Column cnum={chart} cname={chartname} ctit={chartTitle}></Column>
                    </div>
                    <div className={styles.tableBox}>

                    </div>
                </div>
            </div>
        )
    }
});
const mapStateToProps = (state) => {
    return{
        
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {

        },
        init: () => {

        },
        searchData: () => {

        },
    }
};        