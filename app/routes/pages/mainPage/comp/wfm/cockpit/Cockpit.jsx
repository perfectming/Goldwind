import React from 'react';
import {connect} from 'react-redux';
import styles from './Cockpit.scss';
import Title from '../super/Title.jsx';
import Pie2 from './pie2.jsx';
import Tuchart from './Tuchart.jsx';
import Tuchart1 from './tuchar1.jsx';
import Tuchart2 from './Tuchart2.jsx';
import Tuchart3 from './Tuchart3.jsx';

import jnjp from '../../../img/comp/jienengjp.png';
import nljys from '../../../img/comp/nianleijys.png';
import nljybm from '../../../img/comp/nianleijybm.png';
import nlcojp from '../../../img/comp/nianleicojp.png';
import nlsojp from '../../../img/comp/nianleisojp.png';
import up from '../../../img/comp/up_icon.png';
import down from '../../../img/comp/down_icon.png';
import anquan from '../../../img/comp/anquan_icon.png';
import monBoardData from '../../../../../../../config/MonitorBoardData';
import model from '../../../../../../../config/MonitorBoardModel';
import Login from '../../../../../../components/common/Loading.jsx';
let comp = require('./../runMonitor/fpinterface/date');
var {browerHistory} = require('react-router');
let parameter = require('../monitorkb/Monitorkb-parameter');//日期以及CDM场站参数文件引用//
var $ = require('jquery');
let time;
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
    //render渲染前执行的内容//
    componentWillMount() {
        //ajax调用数据并打开实时数据刷新
        this.props.changedate();
    },
    //该分页页面退出前执行的内容//
    componentWillUnmount() {
        //清除该页面的数据实时刷新
        clearInterval(time)
    },
    //render渲染后执行的内容//
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{modata,moname,bloo=false}=this.props;
        if(bloo){
            let mobd=modata.ModelData;
            let mod=moname.Model.dis;
            let datename=moname.Model.ens;
            let arrname=[];//各场站名字的数组//
            let qfl=(mobd[8888801].MonthLossElec.Sum/mobd[8888801].MonthEgyAt*100).toFixed(2);//弃风率//
            let qgl=(mobd[8888802].MonthLossElec.Sum/mobd[8888802].MonthEgyAt*100).toFixed(2);//弃光率//
            let monthTimeHandle=[];//变形后的最近的十二个月的月份数组//
            let kbnjhfdl=mobd[8888800].Last12MonthsPlanEgyAtStat.Value;//原始最近十二个月计划发电量//
            let kbnsjfdl=mobd[8888800].Last12MonthsEgyAtStat.Value;//原始最近十二个月实际发电量//
            let kbnjhfdl1=[];//运算处理后最近十二个月计划发电量//
            let kbnsjfdl1=[];//运算处理后最近十二个月实际发电量//
            let kbnfdwcl=[];//总年发电量完成率（通过运算得出）//
            let czndxly1=[];//各场站年等效利用小时数//
            let ssdlqkfx=[];//损失电量情况分析//
            let IntoCDMjp=0;//纳入CDM场站CO2减排量//
            let NotIntoCDMjp=0;//未纳入CDM场站CO2减排量//


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
                for(let i=0;i<mobd[8888800].Last12MonthsEgyAtStat.Time.length;i++){
                    monthTimeHandle.push(Number(mobd[8888800].Last12MonthsEgyAtStat.Time[i].substring(5))+'月')
                }
                for(let i in mobd){
                    if (mobd[i].PVTSI_Aver && !mobd[i].YearCO2Emissions){
                        czndxly1.push(Number((mobd[i].YearEgyAt/mobd[i].Capacity).toFixed(2)))

                    }
                }
                ssdlqkfx.push(Number((mobd[8888800].YearLossElec.Fault/1).toFixed(2)));
                ssdlqkfx.push(Number((mobd[8888800].YearLossElec.Maintain/1).toFixed(2)));
                ssdlqkfx.push(Number((mobd[8888800].YearLossElec.Limit/1).toFixed(2)));
                ssdlqkfx.push(Number((mobd[8888800].YearLossElec.NoDevReason/1).toFixed(2)));
            }());
            (function(){
                for(let i in datename){
                    if (datename[i].wft){
                        arrname.push(datename[i].name);
                    }
                }
            }());

            //计算安全天数//
            let urodz = new Date(parameter.safeDate);
            let now = new Date();let ile = now.getTime() - urodz.getTime();
            let dni = Math.floor(ile / (1000 * 60 * 60 * 24));
            return(
                <div className={styles.bodyBox}>
                    <div className={`${styles.zhzb} ${styles.box_shadow}`}>
                        <Title title={['综合指标']}></Title>
                        <div className={styles.zhzbdown}><img src={anquan} className={styles.anquan}/>安全运行
                            <span className={styles.daynum}> {dni}</span> 天
                        </div>
                        <div className={styles.zhzbtop}>
                            <div className={styles.zhzbtopbox}><div>全年发电量</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].YearEgyAt)*mod.YearEgyAt.coeff).toFixed(mod.YearEgyAt.place)}</span>{mod.YearEgyAt.unit}</div>
                            <div className={styles.zhzbtopbox}><div>弃风率</div> <span className={styles.zhzbtopboxg}>{qfl=== "NaN" ? "--": qfl}</span>%</div>
                            <div className={styles.zhzbtopbox}><div>弃光率</div> <span className={styles.zhzbtopboxg}>{qgl=== "NaN" ? "--": qgl}</span>%</div>
                            <div className={styles.zhzbtopbox}><div>上网电量</div> <span className={styles.zhzbtopboxg}>6430.45</span>万kWh</div>
                            <div className={styles.zhzbtopbox}><div>厂用电量</div> <span className={styles.zhzbtopboxg}>2255.21</span>万kWh</div>
                            <div className={styles.zhzbtopbox}><div>购网电量</div> <span className={styles.zhzbtopboxg}>1111</span>万kWh</div>

                        </div>

                    </div>
                    <div className={`${styles.zhzbgl} ${styles.box_shadow}`}>
                        <Title title={['综合指标概览']}></Title>
                        <div className={styles.zhzbglmain}>
                            <div className={styles.zhzbglbox}><img src={up}/><p>投资收益率</p><Pie2 color={['#1fe005']} num={[100]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#1fe005'}}>{126.3}%</p></span></div>
                            <div className={styles.zhzbglbox}><img src={up}/><p>年发电计划完成率</p><Pie2 color={['#fbd500','#32535C']} num={[89,11]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#fbd500'}}>{89.6}%</p></span></div>
                            <div className={styles.zhzbglbox}><img src={down}/><p>年度PBA</p><Pie2 color={['#ff0000','#32535C']} num={[68,32]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#ff0000'}}>{68}%</p></span></div>
                            <div className={styles.zhzbglbox}><img src={up}/><p>设备健康度</p><Pie2 color={['#d06960','#32535C']} num={[57,43]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#d06960'}}>{57}%</p></span></div>
                            <div className={styles.zhzbglbox}><img src={down}/><p>工单完成率</p><Pie2 color={['#fbd500','#32535C']} num={[82,18]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#fbd500'}}>{82}%</p></span></div>
                            <div className={styles.zhzbglbox}><img src={up}/><p>年度MTBF</p><Pie2 color={['#d06960','#32535C']} num={[30,70]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#d06960'}}>30h</p></span></div>
                        </div>
                    </div>
                    <div className={styles.columbox}>
                        <div className={`${styles.leftcolum} ${styles.box_shadow}`}>
                        <Title title={['月发电量完成情况']}></Title>
                            <Tuchart2 shuju={comp.jscnum.month} njhfdl={kbnjhfdl1} nsjfdl={kbnsjfdl1} nfdlwcl={kbnfdwcl} monthTime={monthTimeHandle}></Tuchart2>
                        </div>
                        <div className={`${styles.rightcolum} ${styles.box_shadow}`}>
                        <Title title={['月收益状况']}></Title>
                         <Tuchart shuju={comp.jscnum.money}></Tuchart>
                        </div>
                    </div>

                    <div className={`${styles.fgzyfx} ${styles.box_shadow}`}>

                        <Title title={['场站等效利用小时数']}></Title>
                        <div className={styles.fgzyfxmain}>
                            <Tuchart3 shuju={comp.jscnum.hour} gczmc={arrname} gczdxlyxss={czndxly1}></Tuchart3>
                        </div>
                    </div>

                    <div className={`${styles.gzsbgl} ${styles.box_shadow}`}>
                        <Title title={['场站MTBF排行']}></Title>
                        <Tuchart shuju={comp.jscnum.mtbf}></Tuchart>
                    </div>
                     <div className={`${styles.ssdlqkfx} ${styles.box_shadow}`}>
                        <Title title={['损失电量情况分析(kWh)']}></Title>
                        <Tuchart1 shuju={comp.jscnum.elect} ssdlnum={ssdlqkfx}></Tuchart1>
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
        bloo:state.vars.bloo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedate:()=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "MonitorBoard", momo, "Screen", 0);
            function momo(moname){
                if(moname.Model.dis==undefined||moname.Model.ens==undefined){
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "MonitorBoard", momo, "Screen", 0);
                }else {
                    dispatch(actions.setVars('moname', moname));
                    TY.getRtData("MonitorBoard", 8888800, ppo);
                    function ppo(modata){
                        TY.getRtData("MonitorBoard", 8888800, ppo);
                        function ppo(modata){
                            if(modata.ModelData[8888801]==undefined){
                                TY.getRtData("MonitorBoard", 8888800, ppo);
                            }else {
                                dispatch(actions.setVars('modata', modata));

                                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
                                function setData(rdata1){
                                    dispatch(actions.setVars('zhzb', rdata1));
                                    TY.getRtData("DataOverview", 8888800, setData1);
                                    function setData1(rdata2){
                                        dispatch(actions.setVars('bbs', rdata2));
                                        TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DevicesMatrix", setDatas, "Screen", 0);
                                        function setDatas(rdata3){
                                            dispatch(actions.setVars('fModel', rdata3));
                                            TY.getRtData("DevicesMatrix", 8888800, setfData);
                                            function setfData(rdata4){
                                                if(rdata4.ModelData[8888801]==undefined){

                                                    TY.getRtData("DevicesMatrix", 8888800, setfData)
                                                }else{

                                                    dispatch(actions.setVars('fData', rdata4));
                                                    setTimeout(function () {
                                                        dispatch(actions.setVars('bloo', true));
                                                    },500)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //数据刷新方法//
            time=setInterval(function(){
                TY.getRtData("MonitorBoard", 8888800, ppo);
                function ppo(modata){
                    if(modata.ModelData[8888801]==undefined){
                        TY.getRtData("MonitorBoard", 8888800, ppo);
                    }else {
                        dispatch(actions.setVars('modata', modata));
                        dispatch(actions.setVars('bloo', true));
                    }
                }
            },2000)
        },
        init: () => {
                dispatch(actions.setVars('putpage', false));
                dispatch(actions.setVars('bodypage', false));
                dispatch(actions.setVars('cssif2', false));
            var obj = {
                test:''
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
