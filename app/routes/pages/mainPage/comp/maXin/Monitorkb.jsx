import React from 'react';
import {connect} from 'react-redux';
import styles from './Monitorkb.scss';
import Title from '../super/Title.jsx';
import Pie1 from '../mxx/Pie1.jsx';
import Column from '../mxx/Column.jsx';
import Column1 from '../mxx/Column1.jsx';
import Column2 from '../mxx/Column2.jsx';
import Polar from '../mxx/Polar1';
import jnjp from '../../img/comp/jienengjp.png';
import nljys from '../../img/comp/nianleijys.png';
import nljybm from '../../img/comp/nianleijybm.png';
import nlcojp from '../../img/comp/nianleicojp.png';
import nlsojp from '../../img/comp/nianleisojp.png';


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
                    <div className={styles.zhzbtop}>
                        <div className={styles.zhzbtopbox}><div>当前功率</div> <span className={styles.zhzbtopboxg}>201</span>MW</div>
                        <div className={styles.zhzbtopbox}><div>装机容量</div> <span className={styles.zhzbtopboxg}>201</span>MW</div>
                        <div className={styles.zhzbtopbox}><div>日发电量</div> <span className={styles.zhzbtopboxg}>201</span>万MW</div>
                        <div className={styles.zhzbtopbox}><div>风机功率</div> <span className={styles.zhzbtopboxg}>201</span>MW</div>
                        <div className={styles.zhzbtopbox}><div>风速</div> <span className={styles.zhzbtopboxg}>6.5</span>m/s</div>
                        <div className={styles.zhzbtopbox}><div>月发电量</div> <span className={styles.zhzbtopboxg}>201</span>万MW</div>
                        <div className={styles.zhzbtopbox}><div>光伏功率</div> <span className={styles.zhzbtopboxg}>201</span>MW</div>
                        <div className={styles.zhzbtopbox}><div>辐照度</div> <span className={styles.zhzbtopboxg}>201</span>W/㎡</div>
                        <div className={styles.zhzbtopbox}><div>年发电量</div> <span className={styles.zhzbtopboxg}>201</span>万MW</div>
                    </div>
                    <div className={styles.zhzbdown}>安全运行天数
                        <span className={styles.daynum}>  1026</span> 天
                    </div>
                </div>
                <div className={styles.zhzbgl}>
                    <Title title={['综合指标概览']}></Title>
                    <div className={styles.zhzbglmain}>
                        <div className={styles.zhzbglbox}></div>
                        <div className={styles.zhzbglbox}></div>
                        <div className={styles.zhzbglbox}></div>
                        <div className={styles.zhzbglbox}></div>
                        <div className={styles.zhzbglbox}></div>
                        <div className={styles.zhzbglbox}></div>
                    </div>
                </div>
                <div className={styles.czrlzb}>
                    <Title title={['场站容量占比']}></Title>
                    <div className={styles.czrlzdmain}>
                        <Pie1></Pie1>
                        <span className={styles.chartnum}><p>25360</p><p>kWh</p></span>
                    </div>
                </div>
                <div className={styles.nfdlwcqk}>
                    <Title title={['年发电量完成情况']}></Title>
                    <div className={styles.nfdlwcqkmain}>
                        <Column></Column>
                    </div>
                </div>
                <div className={styles.czydfdqk}>
                    <Title title={['场站月度发电情况']}></Title>
                    <div className={styles.czydfdqkmain}>
                        <Column1></Column1>
                    </div>
                </div>
                <div className={styles.longbox}>
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={jnjp}/></div>
                        <div className={styles.righttext}>节能减排</div>
                    </div>
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nljys}/></div>
                        <div className={styles.righttext1}><h2>年累节约水</h2><h2><b>2569</b>万吨</h2></div>
                    </div>
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nljybm}/></div>
                        <div className={styles.righttext1}><h2>年累节约标煤</h2><h2><b>265 </b>万吨</h2></div>
                    </div>
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nlcojp}/></div>
                        <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>815</b>万吨</h2></div>
                    </div>
                    <div className={`${styles.navitem} ${styles.bore}`}>
                        <div className={styles.leftimg}><img src={nlsojp}/></div>
                        <div className={styles.righttext1}><h2>年累SO2减排</h2><h2><b>5</b>万吨</h2></div>
                    </div>
                </div>
                <div className={styles.fgzyfx}>
                    <Title title={['风/光资源分析']}></Title>
                    <div className={styles.fgzyfxmain}>
                        <Polar></Polar>
                    </div>
                </div>
                <div className={styles.ssdlqkfx}>
                    <Title title={['故障设备概览']}></Title>
                    <div className={styles.ssdlqkfxmain}>
                        <span className={styles.tsstyle1}>3<span className={styles.tsstyled1}>台</span></span>
                        <span className={styles.tsstyle2}>12<span className={styles.tsstyled2}>台</span></span>
                        <span className={styles.tsstyle3}>13<span className={styles.tsstyled3}>台</span></span>
                        <span className={styles.tsstyle4}>19<span className={styles.tsstyled4}>台</span></span>
                        <span className={styles.timestyle}><span>0.2h</span><span>12h</span><span>36h</span><span>72h</span></span>
                    </div>
                </div>
                <div className={styles.gzsbgl}>
                    <Title title={['损失电量情况分析']}></Title>
                    <div className={styles.gzsbglmain}>
                        <Column2></Column2>
                    </div>
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
