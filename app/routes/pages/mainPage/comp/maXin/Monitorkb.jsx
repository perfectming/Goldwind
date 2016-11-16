import React from 'react';
import {connect} from 'react-redux';
import styles from './Monitorkb.scss';
import Title from '../super/Title.jsx';


var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        return(
            <div className={styles.bodyBox}>
                <div className={styles.zhzb}>
                    <Title title={['综合指标']}></Title>
                    <div className={styles.zhzbtop}></div>
                    <div className={styles.zhzbdown}>安全运行天数
                        <span className={styles.daynum}>  1026</span> 天
                    </div>
                </div>
                <div className={styles.zhzbgl}>
                    <Title title={['综合指标概览']}></Title>
                </div>
                <div className={styles.czrlzb}>
                    <Title title={['场站容量占比']}></Title>
                </div>
                <div className={styles.nfdlwcqk}>
                    <Title title={['年发电量完成情况']}></Title>
                </div>
                <div className={styles.czydfdqk}>
                    <Title title={['场站月度发电情况']}></Title>
                </div>
                <div className={styles.longbox}>

                </div>
                <div className={styles.fgzyfx}>
                    <Title title={['风/光资源分析']}></Title>
                </div>
                <div className={styles.ssdlqkfx}>
                    <Title title={['故障设备概览']}></Title>
                </div>
                <div className={styles.gzsbgl}>
                    <Title title={['损失电量情况分析']}></Title>
                </div>
            </div>
        )
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
