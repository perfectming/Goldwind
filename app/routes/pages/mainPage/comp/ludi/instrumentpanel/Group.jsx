import React from 'react';
import {connect} from 'react-redux';
import styles from './Groupstyle.scss';
import Yearelectric from './Yearelectric.jsx';
import Pie2 from '../../mxx/Pie2';

let ipUrl='10.68.100.32:8080';



var actions = require('redux/actions');
var $ =require("jQuery");
// let data=Instrumentdata;
// let sort1=data.sort2;

let profit,amounts,rate,yearPro,month2,cost,incomes,shouldElec,actrulElec,sortArr,yearELec,yearPlanELec,monthElec,monthPlanElec,dayelec,dayPlanElec,arrPlan=[],month1=[],arrAct=[],runTime,downTime,tba;

var actions = require('redux/actions');

let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let{flag1=true,flagPba1=true,flagTime1=true,changepageProS,changepageProT,changepageSort1,changepageSort,changepageProfitS,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        return (
            <div className={styles.box}>
                <div className={styles.left}>
                    <div className={`${styles.firstfloor} ${styles.boxShadow}`}>
                        <div className={styles.section}>
                            <div className={styles.text1}>收益:{profit}万元·投资:{amounts}万元</div>
                            <div className={styles.alink}>
                                <a className={styles.space} onClick={()=>changepageProfitS()}></a>
                            </div>
                            <div className={styles.sectionBox}>
                                <span className={styles.numBox}><p style={{color:'#e9c75c'}}>{(rate*100).toFixed(1)}%</p>收益率</span>
                                <Pie2 color={rate>1? ['#1fe005','#fbd500']:rate>0.8?['#fbd500','#39565e']:rate>0.6?['#ff0000','#39565e']:['#d06960','#39565e']} num={[profit,amounts-profit]}></Pie2>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.border}></div>
                            <div className={styles.text1}>当前30分·总分100分</div>
                            <div className={styles.alink}>
                                <a className={styles.space} onClick={()=>changepageHealthyS()}></a><br/><br/>
                                <a className={styles.time} onClick={()=>changepageHealthyT()}></a>
                            </div>
                            <div className={styles.sectionBox}>
                                <span className={styles.numBox}><p style={{color:'#e9c75c'}}>{82}%</p>健康度</span>
                                <Pie2 color={.81>1? ['#1fe005','#fbd500']:.81>0.8?['#fbd500','#39565e']:.81>0.6?['#ff0000','#39565e']:['#d06960','#39565e']} num={[53,13]}></Pie2>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.border}></div>
                            <div className={styles.text1}>实发{(actrulElec/10000).toFixed(1)}万kWh·应发{(shouldElec/10000).toFixed(1)}万kWh</div>
                            <div className={styles.alink}>
                                <a className={styles.space} onClick={()=>changepagePBAS()}></a><br/><br/>
                                <a className={styles.time} onClick={()=>changepagePBAT()}></a>
                            </div>
                            <div className={styles.sectionBox}>
                                <span className={styles.numBox}><p style={{color:'#e9c75c'}}>{shouldElec==0? 0:((actrulElec/shouldElec)*100).toFixed(1)}%</p>PBA</span>
                                <Pie2 color={actrulElec/shouldElec>1? ['#1fe005','#fbd500']:actrulElec/shouldElec>0.8?['#fbd500','#39565e']:actrulElec/shouldElec?['#ff0000','#39565e']:['#d06960','#39565e']} num={[actrulElec,shouldElec-actrulElec]}></Pie2>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.border}></div>
                            <div className={styles.text1}>可用{downTime}h·统计{runTime}h</div>
                            <div className={styles.alink}>
                                <a className={styles.space} onClick={()=>changepageTBAS()}></a><br/><br/>
                                <a className={styles.time} onClick={()=>changepageTBAT()}></a>
                            </div>
                            <div className={styles.sectionBox}>
                                <span className={styles.numBox}><p style={{color:'#e9c75c'}}>{(tba*100).toFixed(1)}%</p>TBA</span>
                                <Pie2 color={tba>1? ['#1fe005','#fbd500']:tba>0.8?['#fbd500','#39565e']:tba>0.6?['#ff0000','#39565e']:['#d06960','#39565e']} num={[runTime,downTime]}></Pie2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.secondfloor}>
                        <div className={`${styles.electric} ${styles.boxShadow}`}>
                            <div className={styles.electricHeader}><a></a>发电量</div>
                            <div className={styles.electricFirst}>
                                <a></a><span>年累计发电量</span>
                                <div className={styles.electricTotal}>{(yearELec/10000).toFixed(1)}万kWh</div>
                                <div className={styles.electricPercent}>
                                    <div className={yearELec/yearPlanELec>1? styles.green:yearELec/yearPlanELec>.8? styles.yellow:yearELec/yearPlanELec>.6? styles.red:styles.redS} style={{width:((yearELec/yearPlanELec*100))+"%"}}>{(yearELec/yearPlanELec*100).toFixed(1)}%</div>
                                </div>
                            </div>
                            <div className={styles.electricSecond}>
                                <a></a><span>月累计发电量</span>
                                <div className={styles.electricTotal}>{(monthElec/10000).toFixed(1)}万kWh</div>
                                <div className={styles.electricPercent}>
                                    <div className={monthElec/monthPlanElec>1? styles.green:monthElec/monthPlanElec>.8? styles.yellow:monthElec/monthPlanElec>.6? styles.red:styles.redS} style={{width:(monthElec/monthPlanElec*100)+"%"}}>{(monthElec/monthPlanElec*100).toFixed(1)}%</div>
                                </div>
                            </div>
                            <div className={styles.electricThird}>
                                <a></a><span>日累计发电量</span>
                                <div className={styles.electricTotal}>{(dayelec/10000).toFixed(1)}万kWh</div>
                                <div className={styles.electricPercent}>
                                    <div className={dayelec/dayPlanElec>1? styles.green:dayelec/dayPlanElec>.8? styles.yellow:dayelec/dayPlanElec>.6? styles.red:styles.redS} style={{width:(dayelec/dayPlanElec*100)+"%"}}>{(dayelec/dayPlanElec*100).toFixed(1)}%</div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.yearelectric} ${styles.boxShadow}`}>
                            <div className={styles.header}>
                                <div className={styles.logo}><a></a><span>年发电量</span></div>
                                <div className={styles.linkBox}>
                                    <div className={styles.links}><a className={styles.space} onClick={()=>changepageEleS()}></a></div>
                                    <div className={styles.links}><a className={styles.time} onClick={()=>changepageEleT()}></a></div>
                                </div>
                            </div>
                            <Yearelectric month={month1} plan={arrPlan} actrul={arrAct} unit={'万kWh'} nameOne={'计划电量'} nameTwo={'实际电量'}></Yearelectric>
                        </div>
                        <div className={`${styles.yearprofit} ${styles.boxShadow}`}>
                            <div className={styles.header}>
                                <div className={styles.logo}><a></a><span>年收益</span></div>
                                <div className={styles.linkBox}>
                                    <div className={styles.links}><a className={styles.space} onClick={()=>changepageProS()}></a></div>
                                    <div className={styles.links}><a className={styles.time} onClick={()=>changepageProT()}></a></div>
                                </div>
                            </div>
                            <div className={styles.index}><Yearelectric month={month2} plan={incomes} actrul={cost} unit={"万元"} nameOne={"收入"} nameTwo={"成本"}></Yearelectric></div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.right} ${styles.boxShadow}`}>
                    <h3>
                        <a></a><span>PBA排序</span>
                    </h3>
                    <table>
                        <tbody>
                        <tr>
                            <th>排名</th>
                            <th>区域名</th>
                            <th onClick={()=>changepageSort1(flag1,flagPba1,sortArr)} className={flag1==true? styles.clickPba1:styles.clickPba4} >PBA <span className={flagPba1==true? styles.arrow:styles.bottom}></span></th>
                            <th onClick={()=>changepageSort(flag1,flagTime1,sortArr)} className={flag1==true? styles.clickTime1:styles.clickTime4}>停机时间 <span className={flagTime1==true? styles.arrow:styles.bottom}></span></th>
                        </tr>
                        {
                            sortArr.slice(0,15).map((value,key)=>{
                                return(<tr key={key}><th>{key+1}</th><th>{value.groupname}</th><th>{(value.everyAreaPba*100).toFixed(1)}%</th><th>{value.downtime}小时</th></tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});



const mapStateToProps = (state) => {
    return{
        sortArr : state.vars.sortArr,
        flag1 : state.vars.flag1,
        flagPba1 : state.vars.flagPba1,
        flagTime1 : state.vars.flagTime1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {
            $.ajax({
                url:'http://'+ipUrl+'/wbi/yield/getMaxYie',//收益率饼图
                type: 'post',
                async:false,
                dataType: 'json',
                timeout : 3000,
                success:function (data) {
                    profit = (data.data.incomes/10000).toFixed(1)/1;
                    amounts =(data.data.amounts/10000).toFixed(1)/1;
                    rate = data.data.rate;
                },
                complete : function(XMLHttpRequest,status){
                    if(status=='timeout'){
                        console.log('超时');
                    }
                },
            });

            $.ajax({
                url:'http://'+ipUrl+'/wbi/yield/getAllRate',//年收益表
                type: 'post',
                async:false,
                dataType: 'json',
                timeout : 3000,
                success:function (data) {
                    yearPro=data.data;
                    month2=[],cost=[],incomes=[];
                    for(var i in yearPro){
                        month2.push(yearPro[i].month+"月");
                        cost.push(yearPro[i].costs/10000);
                        incomes.push(yearPro[i].earning/10000);
                    }
                },
                complete : function(XMLHttpRequest,status){
                    if(status=='timeout'){
                        console.log('超时');
                    }
                },
            });

            $.ajax({
                url:'http://'+ipUrl+'/wbi/PBA/getPBA',//PBA表格
                type: 'post',
                async:false,
                dataType: 'json',
                data:'type=0',
                timeout : 60000,
                success:function (data) {
                    shouldElec=data.data.scale[0].powertheory;
                    actrulElec=data.data.scale[0].poweract;
                    sortArr=data.data.Areatabulation;
                },
                complete : function(XMLHttpRequest,status){
                    if(status=='timeout'){
                        console.log('超时');
                    }
                },
            });

            $.ajax({
                url:'http://'+ipUrl+'/wbi/ELEC/getKongElec',//发电量4数据
                type: 'post',
                async:false,
                dataType: 'json',
                timeout : 60000,
                success:function (data) {
                    yearELec = data.data.yearELec;
                    yearPlanELec=data.data.yearplanElec;
                    monthElec = data.data.monthElec;
                    monthPlanElec=data.data.monthplanElec;
                    dayelec = data.data.dayelec;
                    dayPlanElec=data.data.dayelecPlanElec;
                    arrPlan=[],month1=[],arrAct=[];
                    for(var i=0;i<data.data.wtKongMonthsElec.length;i++){
                        month1.push(data.data.wtKongMonthsElec[i].month+"月");
                        arrAct.push(data.data.wtKongMonthsElec[i].poweract/10000);
                    }
                    for(var i in data.data.wtKongMonthsPlanElec){
                        arrPlan.push(data.data.wtKongMonthsPlanElec[i]/10000);
                    }
                },
                complete : function(XMLHttpRequest,status){
                    if(status=='timeout'){
                        console.log('超时');
                    }
                },
            });

            $.ajax({
                url:'http://'+ipUrl+'/wbi/TBA/getLastMonthTBA',//TBA饼图
                type: 'post',
                async:false,
                dataType: 'json',
                timeout : 60000,
                success:function (data) {
                    runTime=data.data[0].runtimes;
                    downTime=data.data[0].downtimes;
                    tba=data.data[0].tba;

                },
                complete : function(XMLHttpRequest,status){
                    if(status=='timeout'){
                        console.log('超时');
                    }
                },
            });
        },
        init: () => {
            dispatch(actions.setVars('ipUrl', ipUrl));
        },

        changepageSort:(flag1,flagTime1,sortArr)=>{
            flagTime1==false? dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return a.downtime-b.downtime}))):dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return b.downtime-a.downtime})));
            dispatch(actions.setVars('flag1',false ));
            dispatch(actions.setVars('flagTime1',!flagTime1 ));

        },
        changepageSort1:(flag1,flagPba1,sortArr)=>{
            flagPba1==true? dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return a.everyAreaPba-b.everyAreaPba}))):dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return b.everyAreaPba-a.everyAreaPba})));
            dispatch(actions.setVars('flag1',true ));
            dispatch(actions.setVars('flagPba1',!flagPba1 ));
        },
        changepageProfitS:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'profits'));
        },
        changepageHealthyT:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthy'));
        },
        changepageHealthyS:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthy_one'));
        },
        changepageTBAT:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'profitsss'));
        },
        changepageTBAS:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthypbas'));
        },
        changepagePBAT:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'profitss'));
        },
        changepagePBAS:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthypba'));
        },
        changepageEleT:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthygens'));
        },
        changepageEleS:()=>{
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthygen'));
        },
        changepageProT:()=>{

        },
        changepageProS:()=>{

        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);