import React from 'react';
import {connect} from 'react-redux';
import styles from './Monitorkb.scss';
import Title from '../super/Title.jsx';
import Pie1 from '../mxx/Pie1.jsx';
import Column from '../mxx/Column.jsx';
import Column1 from '../mxx/Column1.jsx';
import Column2 from '../mxx/Column2.jsx';
import Tuchart from '../linjinjin/Tuchart.jsx';

import Pie2 from '../mxx/Pie2.jsx';
import jnjp from '../../img/comp/jienengjp.png';
import nlcojp from '../../img/comp/nianleicojp.png';


import monBoardData from '../../../../../../config/MonitorBoardData';
import model from '../../../../../../config/MonitorBoardModel';
var $ = require('jquery');
let comp = require('../linjinjin/date');


let arr=[];
let arrname=[];
let allnum=0;
let num=[];
for(let i in monBoardData.ModelData){
    arr.push(monBoardData.ModelData[i].DayEgyAt/1);
}
arr.pop();
for(let x=0;x<arr.length;x++){
    allnum+=arr[x]
};

var actions = require('redux/actions');

let Component = React.createClass({

    componentDidMount() {
        this.props.init();
    },

    render() {
        let{moname,modata}=this.props;
        let mobd=modata.ModelData;
        let mod=moname.Model.dis;
        console.log(mobd);
        console.log(mod);
        let urodz = new Date("11/12/2015");
        let now = new Date();let ile = now.getTime() - urodz.getTime();
        let dni = Math.floor(ile / (1000 * 60 * 60 * 24));
        return(
            <div className={styles.bodyBox}>
                <div className={`${styles.zhzb} ${styles.box_shadow}`}>
                    <Title title={['综合指标']}></Title>
                    <div className={styles.zhzbdown}>安全运行天数
                        <span className={styles.daynum}> {dni}</span> 天
                    </div>
                    <div className={styles.zhzbtop}>
                        <div className={styles.zhzbtopbox}><div>当前功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span>{mod.TActPower.unit}</div>
                        <div className={styles.zhzbtopbox}><div>{mod.Capacity.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].Capacity)*mod.Capacity.coeff).toFixed(mod.Capacity.place)}</span>{mod.Capacity.unit}</div>
                        <div className={styles.zhzbtopbox}><div>{mod.DayEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].DayEgyAt)*mod.DayEgyAt.coeff).toFixed(mod.DayEgyAt.place)}</span>{mod.DayEgyAt.unit}</div>
                        <div className={styles.zhzbtopbox}><div>风机功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888801].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span>{mod.TActPower.unit}</div>
                        <div className={styles.zhzbtopbox}><div>{mod.WindSpeed_DevAverValue.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].WindSpeed_DevAverValue)*mod.WindSpeed_DevAverValue.coeff).toFixed(mod.WindSpeed_DevAverValue.place)}</span>{mod.WindSpeed_DevAverValue.unit}</div>
                        <div className={styles.zhzbtopbox}><div>{mod.MonthEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888801].MonthEgyAt)*mod.MonthEgyAt.coeff).toFixed(mod.MonthEgyAt.place)}</span>{mod.MonthEgyAt.unit}</div>
                        <div className={styles.zhzbtopbox}><div>光伏功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888802].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span>{mod.TActPower.unit}</div>
                        <div className={styles.zhzbtopbox}><div>{mod.PVTSI_Aver.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888801].PVTSI_Aver)*mod.PVTSI_Aver.coeff).toFixed(mod.PVTSI_Aver.place)}</span>W/㎡</div>
                        <div className={styles.zhzbtopbox}><div>{mod.YearEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888801].YearEgyAt)*mod.YearEgyAt.coeff).toFixed(mod.YearEgyAt.place)}</span>{mod.YearEgyAt.unit}</div>
                    </div>

                </div>
                <div className={`${styles.zhzbgl} ${styles.box_shadow}`}>
                    <Title title={['综合指标概览']}></Title>
                    <div className={styles.zhzbglmain}>
                        <div className={styles.zhzbglbox}><p>年发电完成率</p><Pie2 color={['#33BAC0','#33545C']} num={[50,50]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#33BAC0'}}>{(mobd[8888800].YearEgyAt/mobd[8888800].YearPlanTotEgyAt*100).toFixed(2)}%</p></span></div>
                        <div className={styles.zhzbglbox}><p>年发电能力</p><Pie2 color={['#E9C75C','#A69263']} num={[27,73]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#E9C75C'}}>{(mobd[8888800].YearEgyAt/(mobd[8888800].YearPlanTotEgyAt/1+(mobd[8888800].YearLossElec.Sum/1))*100).toFixed(2)}%</p></span></div>
                        <div className={styles.zhzbglbox}><p>月发电完成率</p><Pie2 color={['#D06960','#954A45']} num={[85,15]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#D06960'}}>{(mobd[8888800].MonthEgyAt/mobd[8888800].CurMonthPlanEgyAt*100).toFixed(2)}%</p></span></div>
                        <div className={styles.zhzbglbox}><p>弃风率</p><Pie2 color={['#70C080','#4A7A59']} num={[25,75]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#70C080'}}>{(mobd[8888801].MonthLossElec.Sum/mobd[8888801].MonthEgyAt*100).toFixed(2)}%</p></span></div>
                        <div className={styles.zhzbglbox}><p>弃光率</p><Pie2 color={['#5298D3','#537388']} num={[50,50]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#5298D3'}}>{(mobd[8888802].MonthLossElec.Sum/mobd[8888802].MonthEgyAt*100).toFixed(2)}%</p></span></div>
                    </div>
                </div>
                <div className={`${styles.czrlzb} ${styles.box_shadow}`}>
                    <Title title={['场站容量占比']}></Title>
                    <div className={styles.czrlzdmain}>
                        <Pie1></Pie1>
                        <span className={styles.chartnum}><p>{allnum}</p><p>kWh</p></span>
                    </div>
                </div>
                <div className={`${styles.nfdlwcqk} ${styles.box_shadow}`}>
                    <Title title={['年发电量完成情况']}></Title>
                    <div className={styles.nfdlwcqkmain}>
                        <Column></Column>
                    </div>
                </div>
                <div className={`${styles.czydfdqk} ${styles.box_shadow}`}>
                    <Title title={['场站月度发电情况']}></Title>
                    <div className={styles.czydfdqkmain}>
                        <Column1></Column1>
                    </div>
                </div>
                <div className={`${styles.fgzyfx} ${styles.box_shadow}`}>

                    <Title title={['场站等效利用小时数']}></Title>
                    <div className={styles.fgzyfxmain}>
                        <Tuchart shuju={comp.jscnum.hour}></Tuchart>
                    </div>
                </div>
                <div className={`${styles.ssdlqkfx} ${styles.box_shadow}`}>
                    <Title title={['故障设备概览']}></Title>
                    <div className={styles.ssdlqkfxmain}>
                        <span className={styles.tsstyle1}>3<span className={styles.tsstyled1}>台</span></span>
                        <span className={styles.tsstyle2}>12<span className={styles.tsstyled2}>台</span></span>
                        <span className={styles.tsstyle3}>13<span className={styles.tsstyled3}>台</span></span>
                        <span className={styles.tsstyle4}>19<span className={styles.tsstyled4}>台</span></span>
                        <span className={styles.timestyle}><span>0.2h</span><span>12h</span><span>36h</span><span>72h</span></span>
                    </div>
                </div>
                <div className={`${styles.gzsbgl} ${styles.box_shadow}`}>
                    <Title title={['损失电量情况分析']}></Title>
                    <div className={styles.gzsbglmain}>
                        <Column2></Column2>
                    </div>
                </div>
                <div className={`${styles.longbox} ${styles.box_shadow}`}>
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={jnjp}/></div>
                        <div className={styles.righttext}>节能减排</div>
                    </div>
                    <div className={styles.navitem}>
                        <div className={styles.leftimg} style={{width:'100%',textAlign:'center'}}>区域内场站数量:12个</div>
                    </div>
                    <div className={`${styles.navitem} ${styles.bore1}`}>
                        <div className={styles.leftimg} style={{width:'100%'}}>纳入CDM场站数量:8个</div>
                    </div>

                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nlcojp}/></div>
                        <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>{mobd[8888800].YearSO2Emissions}</b>万吨</h2></div>
                    </div>
                    <div className={`${styles.navitem} ${styles.bore1}`}>
                        <div className={styles.leftimg} style={{width:'100%'}}>未纳入CDM场站数量:4个</div>
                    </div>

                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nlcojp}/></div>
                        <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>24408</b>万吨</h2></div>
                    </div>

                </div>
            </div>
        )
    }
});


const mapStateToProps = (state) => {
    return {
        moname:state.vars.moname,
        modata:state.vars.modata,
        bool:state.vars.bool,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // changedate:(bool)=>{
        //     console.log(bool)

        //     if(!bool){
        //         dispatch(actions.setVars('showPage','cs'));
        //     }
        //      dispatch(actions.setVars('numtype','monitor'));
        //     dispatch(actions.setVars('pagename','monitorkb'));
        // },
        init: () => {
            dispatch(actions.setVars('navhide', false));
            dispatch(actions.setVars('putpage', true));
            dispatch(actions.setVars('bodypage', true));
            var obj = {
                test:''
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
