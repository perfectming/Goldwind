import React from 'react';
import {connect} from 'react-redux';
import styles from './Monitorkb.scss';
import Title from '../super/Title.jsx';
<<<<<<< HEAD
=======
import Pie1 from '../mxx/Pie1.jsx';
import Column from '../mxx/Column.jsx';
import Column1 from '../mxx/Column1.jsx';
import Column2 from '../mxx/Column2.jsx';
import Polar from '../mxx/Polar1.jsx';
import Login from '../../../../../components/common/Loading.jsx';
import Pie2 from '../mxx/Pie2.jsx';
import jnjp from '../../img/comp/jienengjp.png';
import nlcojp from '../../img/comp/nianleicojp.png';
let time;

var $ = require('jquery');
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43


var actions = require('redux/actions');

let Component = React.createClass({
<<<<<<< HEAD
=======
    componentWillMount() {
        this.props.changedate();
    },
    componentWillUnmount() {
        clearInterval(time)
    },

>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
    componentDidMount() {
        this.props.init();
    },

    render() {
<<<<<<< HEAD
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
=======

        let{moname,modata,boole=false}=this.props;
        if(boole){
            let mobd=modata.ModelData;
            let mod=moname.Model.dis;
            let datename=moname.Model.ens;
            let arr=[];
            let arrname=[];
            let num=[];
            let allnum=0;
            let kbpjfs=Number((mobd[8888800].WindSpeed_DevAverValue)*mod.WindSpeed_DevAverValue.coeff).toFixed(mod.WindSpeed_DevAverValue.place);
            let kbpjfzd=Number((mobd[8888800].PVTSI_Aver)*mod.PVTSI_Aver.coeff).toFixed(mod.PVTSI_Aver.place);
            let zhzbgl1=(mobd[8888800].YearEgyAt/mobd[8888800].YearPlanTotEgyAt*100).toFixed(2);
            let zhzbgl2=(mobd[8888800].YearEgyAt/(mobd[8888800].YearPlanTotEgyAt/1+(mobd[8888800].YearLossElec.Sum/1))*100).toFixed(2);
            let zhzbgl3=(mobd[8888800].MonthEgyAt/mobd[8888800].CurMonthPlanEgyAt*100).toFixed(2);
            let zhzbgl4=(mobd[8888801].MonthLossElec.Sum/mobd[8888801].MonthEgyAt*100).toFixed(2);
            let zhzbgl5=(mobd[8888802].MonthLossElec.Sum/mobd[8888802].MonthEgyAt*100).toFixed(2);
            let kbnjhfdl=mobd[8888800].Last12MonthsPlanEgyAtStat.Value;
            let kbnsjfdl=mobd[8888800].Last12MonthsEgyAtStat.Value;
            let kbnjhfdl1=[];
            let kbnsjfdl1=[];
            let czjhfdl=[];
            let czsjfdl=[];
            let czwcl1=[];
            let gswcl1;
            let gswcl2=[];
            let czgzss1=[];
            let czwhss1=[];
            let czxdss1=[];
            let czndxly1=[];

            (function(){
                for(let i in kbnjhfdl){
                    kbnjhfdl1.push(Number((kbnjhfdl[i]*mod.Last12MonthsPlanEgyAtStat.coeff).toFixed(mod.Last12MonthsPlanEgyAtStat.place)));
                }
                for(let i in kbnsjfdl){
                    kbnsjfdl1.push(Number((kbnsjfdl[i]*mod.Last12MonthsEgyAtStat.coeff).toFixed(mod.Last12MonthsEgyAtStat.place)));
                }
            }());
            (function(){
                for(let i in mobd){
                    if(mobd[i].YearCO2Emissions){
                        gswcl1=(Number((mobd[i].MonthEgyAt/mobd[i].CurMonthPlanEgyAt*100).toFixed(2)));
                    }
                }
            }());
            (function(){
                for(let i in mobd){
                    if (mobd[i].PVTSI_Aver && !mobd[i].YearCO2Emissions){
                        arr.push(Number((mobd[i].Capacity*mod.Capacity.coeff).toFixed(mod.Capacity.place)));
                        czjhfdl.push(Number((mobd[i].CurMonthPlanEgyAt*mod.CurMonthPlanEgyAt.coeff).toFixed(mod.CurMonthPlanEgyAt.place)));
                        czsjfdl.push(Number((mobd[i].MonthEgyAt*mod.MonthEgyAt.coeff).toFixed(mod.MonthEgyAt.place)));
                        czwcl1.push(Number((mobd[i].MonthEgyAt/mobd[i].CurMonthPlanEgyAt*100).toFixed(2)));
                        gswcl2.push(gswcl1);
                        czgzss1.push(Number((mobd[i].MonthLossElec.Fault*mod.MonthLossElec.coeff).toFixed(mod.MonthLossElec.place)));
                        czwhss1.push(Number((mobd[i].MonthLossElec.Maintain*mod.MonthLossElec.coeff).toFixed(mod.MonthLossElec.place)));
                        czxdss1.push(Number((mobd[i].MonthLossElec.Limit*mod.MonthLossElec.coeff).toFixed(mod.MonthLossElec.place)));
                        czndxly1.push(Number((mobd[i].YearEgyAt/mobd[i].Capacity).toFixed(2)))

                    }
                }
            }());
            (function(){
                for(let i in datename){
                    if (datename[i].wft){
                        arrname.push(datename[i].name);
                    }
                }

                play();
            }())
            function play(){
                for(let i=0;i<arr.length;i++){
                    num.push([arrname[i],arr[i]])
                }
            };
            for(let x=0;x<arr.length;x++){
                allnum+=arr[x]
            };
            let urodz = new Date("11/12/2015");
            let now = new Date();let ile = now.getTime() - urodz.getTime();
            let dni = Math.floor(ile / (1000 * 60 * 60 * 24));
            return(
                <div className={styles.bodyBox}>
                    <div className={`${styles.zhzb} ${styles.box_shadow}`}>
                        <Title title={['综合指标']}></Title>
                        <div className={styles.zhzbdown}>安全运行天数
                            <span className={styles.daynum}> {dni}</span>
                            <span className={styles.danweicc}>天</span>
                        </div>
                        <div className={styles.zhzbtop}>
                            <div className={styles.zhzbtopbox}><div>当前功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span><span className={styles.danweicc}>{mod.TActPower.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.Capacity.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].Capacity)*mod.Capacity.coeff).toFixed(mod.Capacity.place)}</span><span className={styles.danweicc}>{mod.Capacity.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.DayEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].DayEgyAt)*mod.DayEgyAt.coeff).toFixed(mod.DayEgyAt.place)}</span><span className={styles.danweicc}>{mod.DayEgyAt.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>风机功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888801].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span><span className={styles.danweicc}>{mod.TActPower.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.WindSpeed_DevAverValue.name}</div> <span className={styles.zhzbtopboxg}>{ kbpjfs === "NaN" ? "--": kbpjfs}</span><span className={styles.danweicc}>{mod.WindSpeed_DevAverValue.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.MonthEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888801].MonthEgyAt)*mod.MonthEgyAt.coeff).toFixed(mod.MonthEgyAt.place)}</span><span className={styles.danweicc}>{mod.MonthEgyAt.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>光伏功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888802].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span><span className={styles.danweicc}>{mod.TActPower.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.PVTSI_Aver.name}</div> <span className={styles.zhzbtopboxg}>{kbpjfzd === "NaN" ? "--": kbpjfzd}</span><span className={styles.danweicc}>W/㎡</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.YearEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888801].YearEgyAt)*mod.YearEgyAt.coeff).toFixed(mod.YearEgyAt.place)}</span><span className={styles.danweicc}>{mod.YearEgyAt.unit}</span></div>
                        </div>

                    </div>
                    <div className={`${styles.zhzbgl} ${styles.box_shadow}`}>
                        <Title title={['综合指标概览']}></Title>
                        <div className={styles.zhzbglmain}>
                            <div className={styles.zhzbglbox}><p>年发电完成率</p><Pie2 color={zhzbgl1>100? ['#1fe005','#39565e']:zhzbgl1>80?['#fbd500','#39565e']:zhzbgl1>60?['#ff0000','#39565e']:['#d06960','#39565e']} num={[Number(mobd[8888800].YearEgyAt),Number(mobd[8888800].YearPlanTotEgyAt/1-mobd[8888800].YearEgyAt/1)]}></Pie2><span className={styles.zhzbglboxnum}><p style={zhzbgl1>100? {color:'#1fe005'} :zhzbgl1>80?{color:'#fbd500'}:zhzbgl1>60?{color:'#ff0000'}:{color:'#d06960'}}>{zhzbgl1}<span className={styles.danweicc}>%</span></p></span></div>
                            <div className={styles.zhzbglbox}><p>年发电能力</p><Pie2 color={zhzbgl2>100? ['#1fe005','#39565e']:zhzbgl2>80?['#fbd500','#39565e']:zhzbgl2>60?['#ff0000','#39565e']:['#d06960','#39565e']} num={[Number(mobd[8888800].YearEgyAt),Number(mobd[8888800].YearPlanTotEgyAt/1+mobd[8888800].YearLossElec.Sum/1-mobd[8888800].YearEgyAt/1)]}></Pie2><span className={styles.zhzbglboxnum}><p style={zhzbgl2>100? {color:'#1fe005'} :zhzbgl2>80?{color:'#fbd500'}:zhzbgl2>60?{color:'#ff0000'}:{color:'#d06960'}}>{zhzbgl2}<span className={styles.danweicc}>%</span></p></span></div>
                            <div className={styles.zhzbglbox}><p>月发电完成率</p><Pie2 color={zhzbgl3>100? ['#1fe005','#39565e']:zhzbgl3>80?['#fbd500','#39565e']:zhzbgl3>60?['#ff0000','#39565e']:['#d06960','#39565e']} num={[Number(mobd[8888800].MonthEgyAt),Number(mobd[8888800].CurMonthPlanEgyAt/1-mobd[8888800].MonthEgyAt/1)]}></Pie2><span className={styles.zhzbglboxnum}><p style={zhzbgl3>100? {color:'#1fe005'} :zhzbgl3>80?{color:'#fbd500'}:zhzbgl3>60?{color:'#ff0000'}:{color:'#d06960'}}>{zhzbgl3}<span className={styles.danweicc}>%</span></p></span></div>
                            <div className={styles.zhzbglbox}><p>弃风率</p><Pie2 color={zhzbgl4>100? ['#d06960','#39565e']:zhzbgl4>80?['#ff0000','#39565e']:zhzbgl4>60?['#fbd500','#39565e']:['#1fe005','#39565e']} num={[Number(mobd[8888801].MonthLossElec.Sum),Number(mobd[8888801].MonthEgyAt/1-mobd[8888801].MonthLossElec.Sum/1)]}></Pie2><span className={styles.zhzbglboxnum}><p style={zhzbgl4>100? {color:'#d06960'} :zhzbgl4>80?{color:'#ff0000'}:zhzbgl4>60?{color:'#fbd500'}:{color:'#1fe005'}}>{zhzbgl4}<span className={styles.danweicc}>%</span></p></span></div>
                            <div className={styles.zhzbglbox}><p>弃光率</p><Pie2 color={zhzbgl5>100? ['#d06960','#39565e']:zhzbgl5>80?['#ff0000','#39565e']:zhzbgl5>60?['#fbd500','#39565e']:['#1fe005','#39565e']} num={[Number(mobd[8888802].MonthLossElec.Sum),Number(mobd[8888802].MonthEgyAt/1-mobd[8888802].MonthLossElec.Sum/1)]}></Pie2><span className={styles.zhzbglboxnum}><p style={zhzbgl5>100? {color:'#d06960'} :zhzbgl5>80?{color:'#ff0000'}:zhzbgl5>60?{color:'#fbd500'}:{color:'#1fe005'}}>{zhzbgl5}<span className={styles.danweicc}>%</span></p></span></div>
                        </div>
                    </div>
                    <div className={`${styles.czrlzb} ${styles.box_shadow}`}>
                        <Title title={['场站容量占比']}></Title>
                        <div className={styles.czrlzdmain}>
                            <Pie1 arrname1={arrname} num1={num} unit={mod.Capacity.unit}></Pie1>
                            <span className={styles.chartnum}><p>{Number(allnum)}</p><p className={styles.danweicc}>{mod.Capacity.unit}</p></span>
                        </div>
                    </div>
                    <div className={`${styles.nfdlwcqk} ${styles.box_shadow}`}>
                        <Title title={['年发电量完成情况']}></Title>
                        <div className={styles.nfdlwcqkmain}>
                            <Column njhfdl={kbnjhfdl1} nsjfdl={kbnsjfdl1} unit={mod.Last12MonthsPlanEgyAtStat.unit}></Column>
                        </div>
                    </div>
                    <div className={`${styles.czydfdqk} ${styles.box_shadow}`}>
                        <Title title={['场站月度发电情况']}></Title>
                        <div className={styles.czydfdqkmain}>
                            <Column1 unit={mod.MonthEgyAt.unit}  czname={arrname} jhfdl={czjhfdl} sjfdl={czsjfdl} czwcl={czwcl1} gswcl={gswcl2}></Column1>
                        </div>
                    </div>
                    <div className={`${styles.fgzyfx} ${styles.box_shadow}`}>

                        <Title title={['场站年等效利用小时数']}></Title>
                        <div className={styles.fgzyfxmain}>
                            <Polar czname={arrname} czndxly={czndxly1}></Polar>
                        </div>
                    </div>
                    <div className={`${styles.ssdlqkfx} ${styles.box_shadow}`}>
                        <Title title={['故障设备概览']}></Title>
                        <div className={styles.ssdlqkfxmain}>
                            <span className={styles.tsstyle1}>3<span className={styles.tsstyled1}>台</span></span>
                            <span className={styles.tsstyle2}>12<span className={styles.tsstyled2}>台</span></span>
                            <span className={styles.tsstyle3}>13<span className={styles.tsstyled3}>台</span></span>
                            <span className={styles.tsstyle4}>19<span className={styles.tsstyled4}>台</span></span>
                            <span className={styles.timestyle}>
                                <span className={styles.timestylee}>0.2<span className={styles.danweicc}>h</span></span>
                                <span className={styles.timestylee}>12<span className={styles.danweicc}>h</span></span>
                                <span className={styles.timestylee}>36<span className={styles.danweicc}>h</span></span>
                                <span className={styles.timestylee}>72<span className={styles.danweicc}>h</span></span>
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.gzsbgl} ${styles.box_shadow}`}>
                        <Title title={['损失电量情况分析']}></Title>
                        <div className={styles.gzsbglmain}>
                            <Column2 czname={arrname} unit={mod.MonthLossElec.unit} czgzss={czgzss1} czwhss={czwhss1} czxdss={czxdss1}></Column2>
                        </div>
                    </div>
                    <div className={`${styles.longbox} ${styles.box_shadow}`}>
                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={jnjp}/></div>
                            <div className={styles.righttext}>节能减排</div>
                        </div>
                        <div className={`${styles.navitem} ${styles.bore1}`}>
                            <div className={styles.leftimg} style={{width:'100%',textAlign:'center'}}>区域内场站数量:12个</div>
                        </div>
                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={nlcojp}/></div>
                            <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>{Number((mobd[8888800].YearCO2Emissions)*mod.YearCO2Emissions.coeff).toFixed(mod.YearCO2Emissions.place)}</b>{mod.YearCO2Emissions.unit}</h2></div>
                        </div>
                        <div className={`${styles.navitem} ${styles.bore1}`}>
                            <div className={styles.leftimg} style={{width:'100%'}}>纳入CDM场站数量:8个</div>
                        </div>

                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={nlcojp}/></div>
                            <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>{Number((mobd[8888800].YearCO2Emissions)*mod.YearCO2Emissions.coeff).toFixed(mod.YearCO2Emissions.place)}</b>{mod.YearCO2Emissions.unit}</h2></div>
                        </div>
                        <div className={`${styles.navitem} ${styles.bore1}`}>
                            <div className={styles.leftimg} style={{width:'100%'}}>未纳入CDM场站数量:4个</div>
                        </div>

                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={nlcojp}/></div>
                            <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>0</b>t</h2></div>
                        </div>

                    </div>
                </div>
            )
        }else{
            return(
                <Login></Login>
            )

        }
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
    }
});


const mapStateToProps = (state) => {
<<<<<<< HEAD
    return {}
=======
    return {
        moname:state.vars.moname,
        modata:state.vars.modata,
        boole:state.vars.boole,
    }
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
};

const mapDispatchToProps = (dispatch) => {
    return {
<<<<<<< HEAD
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
=======
        changedate:()=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "MonitorBoard", momo, "Screen", 0);
            function momo(rdata){
                dispatch(actions.setVars('moname', rdata));
                TY.getRtData("MonitorBoard", 8888800, ppo);
                function ppo(rdata){
                    TY.getRtData("MonitorBoard", 8888800, ppo);
                    function ppo(rdata){
                        dispatch(actions.setVars('modata', rdata));
                        setTimeout(function () {
                            dispatch(actions.setVars('boole', true));
                        },100)
                    }
                }
            }
            time=setInterval(function(){
                TY.getRtData("MonitorBoard", 8888800, ppo);
                function ppo(rdata){
                    dispatch(actions.setVars('modata', rdata));
                    dispatch(actions.setVars('boole', true));
                }
            },1000)
        },
        init: () => {
            dispatch(actions.setVars('navhide', false));
            dispatch(actions.setVars('putpage', true));
            dispatch(actions.setVars('bodypage', true));
            var obj = {
                test:''
            }
        },
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
