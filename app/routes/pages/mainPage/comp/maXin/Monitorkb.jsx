import React from 'react';
import {connect} from 'react-redux';
import styles from './Monitorkb.scss';
import Title from '../super/Title.jsx';
import Pie1 from '../mxx/Pie1.jsx';
import Column from '../mxx/Column.jsx';
import Column1 from '../mxx/Column1.jsx';
import Column2 from '../mxx/Column2.jsx';
import Polar from '../mxx/Polar1';
import Pie2 from '../mxx/Pie2';
import jnjp from '../../img/comp/jienengjp.png';
import nljys from '../../img/comp/nianleijys.png';
import nljybm from '../../img/comp/nianleijybm.png';
import nlcojp from '../../img/comp/nianleicojp.png';
import nlsojp from '../../img/comp/nianleisojp.png';
import dataBase from '../../../../../../config/ModelData';
import model from '../../../../../../config/Model';
import matrix from '../../../../../../config/MatrixModel';
import matData from '../../../../../../config/MatrixData';


var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let data=dataBase.ModelData;
        let mod=model.Model;
        let  mat=matrix.Model;
        let matD=matData.ModelData;
        return(
            <div className={styles.bodyBox}>
                <div className={styles.zhzb}>
                    <Title title={['综合指标']}></Title>
                    <div className={styles.zhzbtop}>
                        <div className={styles.zhzbtopbox}><div>当前功率</div> <span className={styles.zhzbtopboxg}>201</span>MW</div>
                        <div className={styles.zhzbtopbox}><div>{mod.dis.Capacity.name}</div> <span className={styles.zhzbtopboxg}>{data[8888800].Capacity}</span>{mod.dis.Capacity.unit}</div>
                        <div className={styles.zhzbtopbox}><div>{mod.dis.DayEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{data[8888800].DayEgyAt}</span>{mod.dis.DayEgyAt.unit}</div>
                        <div className={styles.zhzbtopbox}><div>风机功率</div> <span className={styles.zhzbtopboxg}>201</span>MW</div>
                        <div className={styles.zhzbtopbox}><div>风速</div> <span className={styles.zhzbtopboxg}>6.5</span>m/s</div>
                        <div className={styles.zhzbtopbox}><div>{mod.dis.MonthEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{data[8888800].MonthEgyAt}</span>{mod.dis.MonthEgyAt.unit}</div>
                        <div className={styles.zhzbtopbox}><div>光伏功率</div> <span className={styles.zhzbtopboxg}>201</span>MW</div>
                        <div className={styles.zhzbtopbox}><div>辐照度</div> <span className={styles.zhzbtopboxg}>201</span>W/㎡</div>
                        <div className={styles.zhzbtopbox}><div>{mod.dis.YearEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{data[8888800].YearEgyAt}</span>{mod.dis.YearEgyAt.unit}</div>
                    </div>
                    <div className={styles.zhzbdown}>安全运行天数
                        <span className={styles.daynum}>  1026</span> 天
                    </div>
                </div>
                <div className={styles.zhzbgl}>
                    <Title title={['综合指标概览']}></Title>
                    <div className={styles.zhzbglmain}>
                        <div className={styles.zhzbglbox}><Pie2 color={['#33BAC0','#33545C']} num={[50,50]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#33BAC0'}}>50%</p>年发电完成率</span></div>
                        <div className={styles.zhzbglbox}><Pie2 color={['#E9C75C','#A69263']} num={[73,27]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#E9C75C'}}>27%</p>年发电能力</span></div>
                        <div className={styles.zhzbglbox}><Pie2 color={['#D06960','#954A45']} num={[15,85]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#D06960'}}>85%</p>月发电完成率</span></div>
                        <div className={styles.zhzbglbox}><Pie2 color={['#70C080','#4A7A59']} num={[75,25]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#70C080'}}>25%</p>弃风率</span></div>
                        <div className={styles.zhzbglbox}><Pie2 color={['#5298D3','#537388']} num={[50,50]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#5298D3'}}>50%</p>弃光率</span></div>
                        <div className={styles.zhzbglbox}><Pie2 color={['#31BAC0','#32535C']} num={[50,50]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#31BAC0'}}>50%</p>年发电完成率</span></div>
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
                <div className={styles.fgzyfx}><lplp></lplp>
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
