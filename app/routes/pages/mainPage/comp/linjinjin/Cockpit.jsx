import React from 'react';
import {connect} from 'react-redux';
import styles from './Cockpit.scss';
import Line1 from '../super/cockplit_line.jsx';
import Solidgauge from '../super/solidgauge.jsx';
import Column from '../chart/column1.jsx';
import fdl from '../../img/comp/fdl.png';
import fc from '../../img/comp/fc.png';
import fc2 from '../../img/comp/fc2.png';
import jd from '../../img/comp/jd.png';
import yue from '../../img/comp/yueicon.png';
import nian from '../../img/comp/nianicon.png';
import complet from '../../img/comp/complet.png';




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       
        return (
            <div className={styles.bodyBox}>
                <div className={styles.topbox}>
                    <div className={styles.Generating}>
                        <h6><img src={fdl}/>发电量</h6>
                        <p>并网容量<b>1400万kw</b></p>
                        <div className={styles.gbox}><img src={fc}/>1100万kw</div>
                        <div className={styles.gbox}><img src={fc2}/>300万kw</div>
                    </div>
                    <div className={styles.Plancurve}>
                        <h6><img src={jd}/>计划实际电量曲线</h6>
                        <Line1></Line1>
                    </div>
                    <div className={styles.Electric}>
                        <h6><img src={jd}/>电场发电量统计</h6>
                        <div className={styles.elediv}>
                            <a>实际发电量</a><span></span>
                            <a>计划发电量</a><span  style={{"background":"#5693d0"}}></span>
                        </div>
                        <div className={styles.elebox}>
                            <span><img src={yue}/><p>当&nbsp;月</p></span>
                            <div className={styles.speedbox}>
                                <div className={styles.spedtit}><a>10,405,54</a><b>万kW/h</b></div>
                                <div className={styles.planspeed}></div>
                                 <div className={styles.spedtit}><a>63,227</a><b>万kW/h</b></div>
                                <div className={`${styles.planspeed} ${styles.mor}`}></div>
                            </div>
                        </div>
                        <div className={styles.elebox}>
                            <span><img src={nian}/><p>当&nbsp;年</p></span>
                            <div className={styles.speedbox}>
                                <div className={styles.spedtit}><a>27,917,31</a><b>万kW/h</b></div>
                                <div className={styles.planspeed}></div>
                                 <div className={styles.spedtit}><a>626,114</a><b>万kW/h</b></div>
                                <div className={`${styles.planspeed} ${styles.mor1}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.Completion}>
                         <h6><img src={complet}/>进度完成率</h6>
                         <Solidgauge></Solidgauge>
                    </div>
                </div>
                <div className={`${styles.topbox} ${styles.bortop}`}>
                   <div className={styles.navitem}>dasd</div>
                   <div className={styles.navitem}>dasd</div>
                   <div className={styles.navitem}>dasd</div>
                   <div className={styles.navitem}>dasd</div>
                   <div className={`${styles.navitem} ${styles.bore}`}>dasd</div>
                </div>
                <div className={`${styles.topbox} ${styles.bortop}`}>
                   <div className={styles.Loss}>dasd</div>
                   <div className={styles.Fault}>dasd</div>
                  
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
