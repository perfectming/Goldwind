import React from 'react';
import {connect} from 'react-redux';
import styles from './Distribution.scss';
import Corner from './super/Corner.jsx';
import Title from './super/Title.jsx';
import Pie from './chart/Pie.jsx';
import Line from './chart/Line.jsx';
import Column from './chart/Column.jsx';

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        return (
            <div className={styles.bodyBox}>

                <div className={styles.leftBox}>
                    <div className={styles.states}>
                        <Corner></Corner>
                        <Title title={['风场指标','综合指标']}></Title>
                        <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>风场个数</a><a className={styles.anum}><b>3</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>风机台数</a><a className={styles.anum}><b>140</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>平均风速</a><a className={styles.anum}><b>3.31</b>m/s</a></span>
                            <span className={styles.gfzb}>光伏指标</span>
                            <span className={styles.num}><a className={styles.anum1}>电厂个数</a><a className={styles.anum}><b>3.31</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>逆变器</a><a className={styles.anum}><b>3.31</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>辐照度</a><a className={styles.anum}><b>3.31</b>m/s</a></span>
                        </div>
                        <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>3</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>装机容量</a><a className={styles.anum}><b>140</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>日发电量</a><a className={styles.anum}><b>3.31</b>m/s</a></span>
                            <span className={styles.num}><a className={styles.anum1}>月发电量</a><a className={styles.anum}><b>3.31</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>年发电量</a><a className={styles.anum}><b>3.31</b>台</a></span>

                        </div>
                    </div>
                    <div className={styles.Speed}>
                        <Corner></Corner>
                        <Title title={['机组运行状态','逆变器运行状态']}></Title>

                    </div>
                    <div className={styles.Situation}>
                        <Corner></Corner>
                        <Title title={['发电量完成情况']}></Title>

                    </div>
                    <div className={styles.Completion}>
                        <Corner></Corner>
                        <Title title={['发电量完成率']}></Title>
                        <Column></Column>

                    </div>
                </div>
                <div className={styles.rightBox}>

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
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
