import React from 'react';
import {connect} from 'react-redux';
import styles from './Cockpit.scss';
import Line1 from '../super/cockplit_line.jsx';
import Solidgauge from '../super/solidgauge.jsx';
import Elect from '../super/Loss_electricity.jsx';
import Column from '../chart/column1.jsx';
import fdl from '../../img/comp/fdl.png';
import fc from '../../img/comp/fc.png';
import fc2 from '../../img/comp/fc2.png';
import jd from '../../img/comp/jd.png';
import yue from '../../img/comp/yueicon.png';
import nian from '../../img/comp/nianicon.png';
import complet from '../../img/comp/complet.png';
import jie from '../../img/comp/jieneng.png';
import shui from '../../img/comp/jieshui.png';
import co2 from '../../img/comp/co2.png';
import sunsi from '../../img/comp/sunsi.png';
import gz from '../../img/comp/guzhang.png';
import gzbg from '../../img/comp/gzbg.png';




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
                   <div className={styles.navitem}>
                         <div className={styles.leftimg}><img src={jie}/></div>
                         <div className={styles.righttext}>节能减排</div>
                   </div>
                   <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={co2}/></div>
                        <div className={styles.righttext1}><h2>年累节约水</h2><h2><b>2569</b>万吨</h2></div>
                   </div>
                   <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={shui}/></div>
                        <div className={styles.righttext1}><h2>年累节约标煤</h2><h2><b>265 </b>万吨</h2></div>
                   </div>
                   <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={co2}/></div>
                        <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>815</b>万吨</h2></div>
                   </div>
                   <div className={`${styles.navitem} ${styles.bore}`}>
                        <div className={styles.leftimg}><img src={shui}/></div>
                        <div className={styles.righttext1}><h2>年累SO2减排</h2><h2><b>5</b>万吨</h2></div>
                   </div>
                </div>
                <div className={`${styles.topbox} ${styles.bortop}`}>
                   <div className={styles.Loss}>
                   <h6><img src={sunsi}/>损失电量</h6>
                         <Elect></Elect>
                   </div>
                   <div className={styles.Fault}>
                       <h6><img src={gz}/>故障分类统计</h6>
                       <span className={`${styles.gznum} ${styles.gzmor}`}>3台</span>
                       <span className={styles.gznum}>12台</span>
                       <span className={styles.gznum}>19台</span>
                       <span className={styles.gznum}>19台</span>
                       <a className={styles.gza}>0.2h</a>
                       <a>0.8h</a>
                       <a>24h</a>
                       <a>72h</a>

                         
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
