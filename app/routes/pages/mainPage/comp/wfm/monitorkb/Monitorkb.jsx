import React from 'react';
import {connect} from 'react-redux';
import styles from './Monitorkb.scss';
import Title from '../super/Title.jsx';
import Pie1 from '../chart/Pie1.jsx';
import Column from '../chart/Column3.jsx';
import Column1 from '../chart/Column4.jsx';
import Column2 from '../chart/Column5.jsx';
import Polar from '../chart/Column6.jsx';
import Login from '../../../../../../components/common/Loading.jsx';
import Pie2 from '../chart/Pie2.jsx';
import jnjp from '../../../img/comp/jienengjp.png';
import nlcojp from '../../../img/comp/nianleicojp.png';
let mobdNum = require('../../urlData.js');
let mobdZero = mobdNum.mobdZero/1;
let mobdOne = mobdNum.mobdOne/1;
let mobdTwo = mobdNum.mobdTwo/1;
let parameter = require('./Monitorkb-parameter');//日期以及CDM场站参数文件引用//
var {browserHistory} = require('react-router');
let time;
let onceTime;

var $ = require('jquery');


var actions = require('redux/actions');

let Component = React.createClass({
    //render渲染前执行的内容//
    componentWillMount() {
        let{boole}=this.props;
        //ajax调用数据并打开实时数据刷新
        this.props.changedate(boole);
    },
    //该分页页面退出前执行的内容//
    componentWillUnmount() {
        //清除该页面的数据实时刷新
        clearInterval(time);
        clearTimeout(onceTime);
    },
    //render渲染后执行的内容//
    componentDidMount() {
        this.props.init();
    },

    render() {
        //moname是ajax调到的数据模型，modata是ajax调到的数据，boole是判断执行完ajax再执行dom操作的变量//
        let{moname,modata,boole=false,skinStyle}=this.props;
        if(boole && modata.ModelData[mobdZero]){
            let mobd=modata.ModelData;
            let mod=moname.Model.dis;
            let datename=moname.Model.ens;
            let arr=[];//各场站的装机容量值的数组，顺序与给出数据的顺序一致（下同）//
            let arrname=[];//各场站名字的数组//
            let num=[];//各场站的装机容量值和对应场站名的数组//
            let allnum=0;//用于计算总装机容量//
            let kbpjfs=Number((mobd[mobdZero].WindSpeed_DevAverValue)*mod.WindSpeed_DevAverValue.coeff).toFixed(mod.WindSpeed_DevAverValue.place);//平均风速//
            let kbpjfzd=Number((mobd[mobdZero].PVTSI_Aver)*mod.PVTSI_Aver.coeff).toFixed(mod.PVTSI_Aver.place);//平均辐照度（coeff为系数；place为保留位数；下同）//
            let zhzbgl1=(mobd[mobdZero].YearEgyAt/mobd[mobdZero].YearPlanTotEgyAt*100).toFixed(2);//年发电完成率//
            let zhzbgl2=(mobd[mobdZero].YearEgyAt/(mobd[mobdZero].YearEgyAt/1+(mobd[mobdZero].YearLossElec.Sum/1))*100).toFixed(2);//年度PBA//
            let zhzbgl3=(mobd[mobdZero].MonthEgyAt/mobd[mobdZero].CurMonthPlanEgyAt*100).toFixed(2);//月发电完成率//
            let zhzbgl4=(mobd[mobdOne].MonthLossElec.Sum/(mobd[mobdOne].MonthEgyAt/1+mobd[mobdOne].MonthLossElec.Sum/1)*100).toFixed(2);//弃风率//
            let zhzbgl5=(mobd[mobdTwo].MonthLossElec.Sum/(mobd[mobdTwo].MonthEgyAt/1+mobd[mobdTwo].MonthLossElec.Sum/1)*100).toFixed(2);//弃光率//
            let kbnjhfdl=mobd[mobdZero].Last12MonthsPlanEgyAtStat.Value;//原始最近十二个月计划发电量//
            let kbnsjfdl=mobd[mobdZero].Last12MonthsEgyAtStat.Value;//原始最近十二个月实际发电量//
            let kbnjhfdl1=[];//运算处理后最近十二个月计划发电量//
            let kbnsjfdl1=[];//运算处理后最近十二个月实际发电量//
            let kbnfdwcl=[];//总年发电量完成率（通过运算得出）//
            let czjhfdl=[];//各场站计划发电量//
            let czsjfdl=[];//各场站实际发电量//
            let czwcl1=[];//各场站发电完成率//
            let gswcl1;//集团发电完成率//
            let gswcl2=[];//集团发电完成率（实现直线显示）//
            let czgzss1=[];//各场站故障损失//
            let czwhss1=[];//各场站维护损失//
            let czxdss1=[];//各场站限电损失//
            let czndxly1=[];//各场站年等效利用小时数//
            let IntoCDMjp=0;//纳入CDM场站CO2减排量//
            let NotIntoCDMjp=0;//未纳入CDM场站CO2减排量//
            let monthTimeHandle=[];//变形后的最近的十二个月的月份数组//
            let gzsbglvalue=mobd[mobdZero].DevFaultOverview.Value;//所有故障设备的信息集合//
            let gzsbgltime1=[];//故障时间在2-12小时之间//
            let gzsbgltime2=[];//故障时间在12-24小时之间//
            let gzsbgltime3=[];//故障时间在24-72小时之间//
            let gzsbgltime4=[];//故障时间在72小时以上//

            let annularPlate='#39565e';//环状图底色，用于换肤//
            if(skinStyle==2){
                annularPlate='#C0E2EA';
            }
            //以下是各个数据的提取、循环、计算的方法//
            (function(){
                for(let i in kbnjhfdl){
                    kbnjhfdl1.push(Number((kbnjhfdl[i]*mod.Last12MonthsPlanEgyAtStat.coeff).toFixed(mod.Last12MonthsPlanEgyAtStat.place)));
                }
                for(let i in kbnsjfdl){
                    kbnsjfdl1.push(Number((kbnsjfdl[i]*mod.Last12MonthsEgyAtStat.coeff).toFixed(mod.Last12MonthsEgyAtStat.place)));
                }
                for(let i=0;i<kbnjhfdl1.length;i++){
                    kbnfdwcl.push(Number((kbnsjfdl1[i]/kbnjhfdl1[i]*100).toFixed(2)))
                }
                for(let i=0;i<parameter.IntoCDM.length;i++){
                    IntoCDMjp += mobd[parameter.IntoCDM[i]].YearEgyAt*mod.YearEgyAt.coeff*parameter.Coefficient*10;
                }
                for(let i=0;i<parameter.NotIntoCDM.length;i++){
                    NotIntoCDMjp += mobd[parameter.NotIntoCDM[i]].YearEgyAt*mod.YearEgyAt.coeff*parameter.Coefficient*10;
                }
                for(let i=0;i<mobd[mobdZero].Last12MonthsEgyAtStat.Time.length;i++){
                    monthTimeHandle.push(Number(mobd[mobdZero].Last12MonthsEgyAtStat.Time[i].substring(5))+'月')
                }
                for(let i in gzsbglvalue){
                    if((Number(gzsbglvalue[i].timelength)>=7200) && (Number(gzsbglvalue[i].timelength)<43200)){
                        gzsbgltime1.push(Number(gzsbglvalue[i].timelength))
                    }else if((Number(gzsbglvalue[i].timelength)>=43200) && (Number(gzsbglvalue[i].timelength)<86400)){
                        gzsbgltime2.push(Number(gzsbglvalue[i].timelength))
                    }else if((Number(gzsbglvalue[i].timelength)>=86400) && (Number(gzsbglvalue[i].timelength)<259200)){
                        gzsbgltime3.push(Number(gzsbglvalue[i].timelength))
                    }else if((Number(gzsbglvalue[i].timelength)>=259200)){
                        gzsbgltime4.push(Number(gzsbglvalue[i].timelength))
                    }
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
                        czgzss1.push(Number((mobd[i].MonthLossElec.Fault*mod.MonthLossElec.coeff/10000).toFixed(mod.MonthLossElec.place)));
                        czwhss1.push(Number((mobd[i].MonthLossElec.Maintain*mod.MonthLossElec.coeff/10000).toFixed(mod.MonthLossElec.place)));
                        czxdss1.push(Number((mobd[i].MonthLossElec.Limit*mod.MonthLossElec.coeff/10000).toFixed(mod.MonthLossElec.place)));
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
            }());
            function play(){
                for(let i=0;i<arr.length;i++){
                    num.push([arrname[i],arr[i]])
                }
            }
            for(let x=0;x<arr.length;x++){
                allnum+=arr[x]
            }

            //安全天数计算
            let urodz = new Date(parameter.safeDate);
            let now = new Date();let ile = now.getTime() - urodz.getTime();
            let dni = Math.floor(ile / (1000 * 60 * 60 * 24));
            return(
                <div className={skinStyle==1?styles.bodyBoxBlue:skinStyle==2?styles.bodyBoxWhite:styles.bodyBox}>
                    <div className={`${styles.zhzb} ${styles.box_shadow}`}>
                        <Title title={['综合指标']}></Title>
                        <div className={styles.zhzbdown}>安全运行天数
                            <span className={styles.daynum}> {dni}</span>
                            <span className={styles.danweicc}>天</span>
                        </div>
                        <div className={styles.zhzbtop}>
                            <div className={styles.zhzbtopbox}><div>当前功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[mobdZero].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span><span className={styles.danweicc}>{mod.TActPower.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.Capacity.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[mobdZero].Capacity)*mod.Capacity.coeff).toFixed(mod.Capacity.place)}</span><span className={styles.danweicc}>{mod.Capacity.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.DayEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[mobdZero].DayEgyAt)*mod.DayEgyAt.coeff).toFixed(mod.DayEgyAt.place)}</span><span className={styles.danweicc}>{mod.DayEgyAt.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>风机功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[mobdOne].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span><span className={styles.danweicc}>{mod.TActPower.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.WindSpeed_DevAverValue.name}</div> <span className={styles.zhzbtopboxg}>{ kbpjfs === "NaN" ? "--": kbpjfs}</span><span className={styles.danweicc}>{mod.WindSpeed_DevAverValue.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.MonthEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[mobdZero].MonthEgyAt)*mod.MonthEgyAt.coeff).toFixed(mod.MonthEgyAt.place)}</span><span className={styles.danweicc}>{mod.MonthEgyAt.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>光伏功率</div> <span className={styles.zhzbtopboxg}>{Number((mobd[mobdTwo].TActPower)*mod.TActPower.coeff).toFixed(mod.TActPower.place)}</span><span className={styles.danweicc}>{mod.TActPower.unit}</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.PVTSI_Aver.name}</div> <span className={styles.zhzbtopboxg}>{kbpjfzd === "NaN" ? "--": kbpjfzd}</span><span className={styles.danweicc}>W/㎡</span></div>
                            <div className={styles.zhzbtopbox}><div>{mod.YearEgyAt.name}</div> <span className={styles.zhzbtopboxg}>{Number((mobd[mobdZero].YearEgyAt)*mod.YearEgyAt.coeff).toFixed(mod.YearEgyAt.place)}</span><span className={styles.danweicc}>{mod.YearEgyAt.unit}</span></div>
                        </div>

                    </div>
                    <div className={`${styles.zhzbgl} ${styles.box_shadow}`}>
                        <Title title={['综合指标概览']}></Title>
                        <div className={styles.zhzbglmain}>
                            <div className={styles.zhzbglbox}>
                                <p>年度PBA</p>
                                <Pie2 color={zhzbgl2>90? ['#62de88',annularPlate]:zhzbgl2>80?['#e8952a',annularPlate]:zhzbgl2>60?['#a32124',annularPlate]:['#d8403d',annularPlate]} num={[Number(mobd[mobdZero].YearEgyAt),Number((mobd[mobdZero].YearEgyAt/1)+(mobd[mobdZero].YearLossElec.Sum/1)-(mobd[mobdZero].YearEgyAt/1))]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={zhzbgl2>90? {color:'#62de88'} :zhzbgl2>80?{color:'#e8952a'}:zhzbgl2>60?{color:'#a32124'}:{color:'#d8403d'}}>{zhzbgl2=== "NaN" ? "--": zhzbgl2}<span className={styles.danweicc}>%</span></p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}>
                                <p>年发电完成率</p>
                                <Pie2 color={zhzbgl1>90? ['#62de88',annularPlate]:zhzbgl1>80?['#e8952a',annularPlate]:zhzbgl1>60?['#a32124',annularPlate]:['#d8403d',annularPlate]} num={[Number(mobd[mobdZero].YearEgyAt),Number((mobd[mobdZero].YearPlanTotEgyAt/1)-(mobd[mobdZero].YearEgyAt/1))]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={zhzbgl1>90? {color:'#62de88'} :zhzbgl1>80?{color:'#e8952a'}:zhzbgl1>60?{color:'#a32124'}:{color:'#d8403d'}}>{zhzbgl1=== "NaN" ? "--": zhzbgl1}<span className={styles.danweicc}>%</span></p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}>
                                <p>月发电完成率</p>
                                <Pie2 color={zhzbgl3>90? ['#62de88',annularPlate]:zhzbgl3>80?['#e8952a',annularPlate]:zhzbgl3>60?['#a32124',annularPlate]:['#d8403d',annularPlate]} num={[Number(mobd[mobdZero].MonthEgyAt),Number(mobd[mobdZero].CurMonthPlanEgyAt/1-mobd[mobdZero].MonthEgyAt/1)]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={zhzbgl3>90? {color:'#62de88'} :zhzbgl3>80?{color:'#e8952a'}:zhzbgl3>60?{color:'#a32124'}:{color:'#d8403d'}}>{zhzbgl3=== "NaN" ? "--": zhzbgl3}<span className={styles.danweicc}>%</span></p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}>
                                <p>弃风率</p>
                                <Pie2 color={zhzbgl4>40? ['#d8403d',annularPlate]:zhzbgl4>20?['#a32124',annularPlate]:zhzbgl4>10?['#e8952a',annularPlate]:['#62de88',annularPlate]} num={[Number(mobd[mobdOne].MonthLossElec.Sum),Number(mobd[mobdOne].MonthEgyAt/1-mobd[mobdOne].MonthLossElec.Sum/1)]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={zhzbgl4>40? {color:'#d8403d'} :zhzbgl4>20?{color:'#a32124'}:zhzbgl4>10?{color:'#e8952a'}:{color:'#62de88'}}>{zhzbgl4=== "NaN" ? "--": zhzbgl4}<span className={styles.danweicc}>%</span></p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}>
                                <p>弃光率</p>
                                <Pie2 color={zhzbgl5>40? ['#d8403d',annularPlate]:zhzbgl5>20?['#a32124',annularPlate]:zhzbgl5>10?['#e8952a',annularPlate]:['#62de88',annularPlate]} num={[Number(mobd[mobdTwo].MonthLossElec.Sum),Number(mobd[mobdTwo].MonthEgyAt/1-mobd[mobdTwo].MonthLossElec.Sum/1)]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={zhzbgl5>40? {color:'#d8403d'} :zhzbgl5>20?{color:'#a32124'}:zhzbgl5>10?{color:'#e8952a'}:{color:'#62de88'}}>{zhzbgl5=== "NaN" ? "--": zhzbgl5}<span className={styles.danweicc}>%</span></p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.czrlzb} ${styles.box_shadow}`}>
                        <Title title={['场站容量占比']}></Title>
                        <div className={styles.czrlzdmain}>
                            <Pie1 arrname1={arrname} num1={num} unit={mod.Capacity.unit} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Pie1>
                            <span className={styles.chartnum}><p>{Number(allnum).toFixed(2)}</p><p className={styles.danweicc}>{mod.Capacity.unit}</p></span>
                        </div>
                    </div>
                    <div className={`${styles.nfdlwcqk} ${styles.box_shadow}`}>
                        <Title title={['集团年发电量完成情况']}></Title>
                        <div className={styles.nfdlwcqkmain}>
                            <Column njhfdl={kbnjhfdl1} nsjfdl={kbnsjfdl1} nfdlwcl={kbnfdwcl} unit={mod.Last12MonthsPlanEgyAtStat.unit} monthTime={monthTimeHandle} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Column>
                        </div>
                    </div>
                    <div className={`${styles.czydfdqk} ${styles.box_shadow}`}>
                        <Title title={['场站月度发电情况']}></Title>
                        <div className={styles.czydfdqkmain}>
                            <Column1 unit={mod.MonthEgyAt.unit}  czname={arrname} jhfdl={czjhfdl} sjfdl={czsjfdl} czwcl={czwcl1} gswcl={gswcl2} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Column1>
                        </div>
                    </div>
                    <div className={`${styles.fgzyfx} ${styles.box_shadow}`}>

                        <Title title={['场站年等效利用小时数']}></Title>
                        <div className={styles.fgzyfxmain}>
                            <Polar czname={arrname} czndxly={czndxly1} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Polar>
                        </div>
                    </div>
                    <div className={`${styles.ssdlqkfx} ${styles.box_shadow}`}>
                        <Title title={['故障设备概览']}></Title>
                        <div className={styles.ssdlqkfxmain}>
                            <span className={styles.tsstyle1}><span className={styles.tsstyled1}>{gzsbgltime1.length}</span>台</span>
                            <span className={styles.tsstyle2}><span className={styles.tsstyled2}>{gzsbgltime2.length}</span>台</span>
                            <span className={styles.tsstyle3}><span className={styles.tsstyled3}>{gzsbgltime3.length}</span>台</span>
                            <span className={styles.tsstyle4}><span className={styles.tsstyled4}>{gzsbgltime4.length}</span>台</span>
                            <span className={styles.timestyle}>
                                <span className={styles.timestylee}>2<span className={styles.danweicc}>h</span></span>
                                <span className={styles.timestylee}>12<span className={styles.danweicc}>h</span></span>
                                <span className={styles.timestylee}>24<span className={styles.danweicc}>h</span></span>
                                <span className={styles.timestylee}>72<span className={styles.danweicc}>h</span></span>
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.gzsbgl} ${styles.box_shadow}`}>
                        <Title title={['损失电量情况分析']}></Title>
                        <div className={styles.gzsbglmain}>
                            <Column2 czname={arrname} unit={"万kWh"} czgzss={czgzss1} czwhss={czwhss1} czxdss={czxdss1} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Column2>
                        </div>
                    </div>
                    <div className={`${styles.longbox} ${styles.box_shadow}`}>
                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={jnjp}/></div>
                            <div className={styles.righttext}>节能减排</div>
                        </div>
                        <div className={`${styles.navitem} ${styles.bore1}`}>
                            <div className={styles.leftimg} style={{width:'100%',textAlign:'center'}}>区域内场站数量:{parameter.IntoCDM.length + parameter.NotIntoCDM.length}个</div>
                        </div>
                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={nlcojp}/></div>
                            <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>{(IntoCDMjp+NotIntoCDMjp).toFixed(2)}</b>t</h2></div>
                        </div>
                        <div className={`${styles.navitem} ${styles.bore1}`}>
                            <div className={styles.leftimg} style={{width:'100%'}}>纳入CDM场站数量:{parameter.IntoCDM.length}个</div>
                        </div>

                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={nlcojp}/></div>
                            <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>{IntoCDMjp.toFixed(2)}</b>t</h2></div>
                        </div>
                        <div className={`${styles.navitem} ${styles.bore1}`}>
                            <div className={styles.leftimg} style={{width:'100%'}}>未纳入CDM场站数量:{parameter.NotIntoCDM.length}个</div>
                        </div>

                        <div className={styles.navitem}>
                            <div className={styles.leftimg}><img src={nlcojp}/></div>
                            <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>{NotIntoCDMjp.toFixed(2)}</b>t</h2></div>
                        </div>

                    </div>
                </div>
            )
        }else{
            return(
                <Login></Login>
            )
        }
    }
});

const mapStateToProps = (state) => {
    return {
        moname:state.vars.moname,
        modata:state.vars.modata,
        boole:state.vars.boole,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        //接口调用方法//
        changedate:(boole)=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "MonitorBoard", momo, "Screen", 0);
            function momo(moname){
                if( moname.Model == undefined){
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "MonitorBoard", momo, "Screen", 0);
                }else {
                    dispatch(actions.setVars('moname', moname));
                    TY.getRtData("MonitorBoard", mobdZero, ppo);
                    function ppo(modata){
                        if (modata.ModelData==undefined || modata.ModelData[mobdZero].YearLossElec==undefined || modata.ModelData[mobdZero].YearLossElec.Sum==undefined){
                            TY.getRtData("MonitorBoard", mobdZero, ppo);
                        }else{
                            dispatch(actions.setVars('modata', modata));
                            setTimeout(function () {
                                dispatch(actions.setVars('boole', true));
                                clearTimeout(onceTime);
                            },100)
                        }
                    }
                }
            }
            onceTime=setTimeout(function(){
                alert('数据获取失败！请重新登入');
                browserHistory.push('/app/all/page/login');
                dispatch(actions.setVars('userInfo', false));
            },30000);
            //数据刷新方法//
            time=setInterval(function(){
                TY.getRtData("MonitorBoard", mobdZero, ppoo);
                function ppoo(modata){
                    if(modata.ModelData==undefined || modata.ModelData[mobdZero].YearLossElec==undefined || modata.ModelData[mobdZero].YearLossElec.Sum==undefined){
                        TY.getRtData("MonitorBoard", mobdZero, ppoo);
                    }else {
                        dispatch(actions.setVars('modata', modata));
                        dispatch(actions.setVars('bloo', true));
                    }
                }
            },2000)
        },
        init: () => {
            //当前页面下需要变化的全局变量，"navhide"控制三级菜单；"putpage"控制；"bodypage"控制//
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
