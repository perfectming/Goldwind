import React from 'react';
import {connect} from 'react-redux';
import styles from './Cockpit.scss';
import Title from '../super/Title.jsx';
import Pie2 from './pie2.jsx';
import Tuchart1 from './tuchar1.jsx';
import Tuchart2 from './Tuchart2.jsx';
import Tuchart3 from './Tuchart3.jsx';
import Tuchart4 from './Tuchart4.jsx';
import Tuchart5 from './Tuchart5.jsx';

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
var {browserHistory} = require('react-router');
let parameter = require('../monitorkb/Monitorkb-parameter');//日期以及CDM场站参数文件引用//
var actions = require('redux/actions');
var $ = require('jquery');
let ipUrl='10.68.100.32:8080';
let time;
let onceTime;
let profit,amounts,rate,yearPro,month2,cost,incomes;
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
        let{bloo}=this.props;
        //ajax调用数据并打开实时数据刷新
        this.props.changedate(bloo);
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
        let{mmodata,mmoname,bloo=false,skinStyle}=this.props;
        if(bloo){
            let mobd=mmodata.ModelData;
            let mod=mmoname.Model.dis;
            let datename=mmoname.Model.ens;
            let arrname=[];//各场站名字的数组//
            let swdlsj=(Number(mobd[8888800].MonthPostGridEgyAt)*mod.MonthPostGridEgyAt.coeff);//上网电量//
            let gwdlsj=(Number(mobd[8888800].MonthGetGridEgyAt)*mod.MonthGetGridEgyAt.coeff);//购网电量//
            let yfdlsj=(Number(mobd[8888800].MonthEgyAt)*mod.MonthEgyAt.coeff);//月发电量//
            let qfl=(mobd[8888801].MonthLossElec.Sum/(mobd[8888801].MonthEgyAt/1+mobd[8888801].MonthLossElec.Sum/1)*100).toFixed(2);//弃风率//
            let qgl=(mobd[8888802].MonthLossElec.Sum/(mobd[8888802].MonthEgyAt/1+mobd[8888802].MonthLossElec.Sum/1)*100).toFixed(2);//弃光率//
            let nfdjhwcl=(mobd[8888800].YearEgyAt/mobd[8888800].YearPlanTotEgyAt*100).toFixed(2);//年发电计划完成率//
            let ndpba=(mobd[8888800].YearEgyAt/(mobd[8888800].YearEgyAt/1+(mobd[8888800].YearLossElec.Sum/1))*100).toFixed(2);//年度PBA//
            let zmtbf=Number(mobd[8888800].YearMTBF);//集团年MTBF//
            let monthTimeHandle=[];//变形后的最近的十二个月的月份数组//
            let kbynjhfdl=mobd[8888800].Last12MonthsPlanEgyAtStat.Value;//原始最近十二个月计划发电量//
            let kbynsjfdl=mobd[8888800].Last12MonthsEgyAtStat.Value;//原始最近十二个月实际发电量//
            let kbynjhfdl1=[];//运算处理后最近十二个月计划发电量//
            let kbynsjfdl1=[];//运算处理后最近十二个月实际发电量//
            let kbynfdwcl=[];//最近十二个月发电量完成率（通过运算得出）//
            let czndxly1=[];//各场站年等效利用小时数//
            let czmtbf=[];//各场站MTBF//
            let ssdlqkfx=[];//损失电量情况分析//
            let IntoCDMjp=0;//纳入CDM场站CO2减排量//
            let NotIntoCDMjp=0;//未纳入CDM场站CO2减排量//
            let annularPlate='#39565e';//环状图底色，用于换肤//

            if(skinStyle==2){
                annularPlate='#C0E2EA';
            }
            (function(){
                for(let i in kbynjhfdl){
                    kbynjhfdl1.push(Number((kbynjhfdl[i]*mod.Last12MonthsPlanEgyAtStat.coeff).toFixed(mod.Last12MonthsPlanEgyAtStat.place)));
                }
                for(let i in kbynsjfdl){
                    kbynsjfdl1.push(Number((kbynsjfdl[i]*mod.Last12MonthsEgyAtStat.coeff).toFixed(mod.Last12MonthsEgyAtStat.place)));
                }
                for(let i=0;i<kbynjhfdl1.length;i++){
                    kbynfdwcl.push(Number((kbynsjfdl1[i]/kbynjhfdl1[i]*100).toFixed(2)))
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
                    if (mobd[i].TActPower && !mobd[i].YearCO2Emissions){
                        czndxly1.push(Number((mobd[i].YearEgyAt/mobd[i].Capacity).toFixed(2)));
                        czmtbf.push(Number(mobd[i].MonthMTBF))
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

            //今年已经过去的小时数//
            let nowa = new Date();
            let firstDay = new Date(nowa.getFullYear(),0,1);
            //计算当前时间与本年第一天的时差(返回一串数值，代表两个日期相差的毫秒数)
            let dateDiff = nowa - firstDay;
            //一小时的毫秒数
            let msPerDay = 1000 * 60 * 60 ;
            //计算天数
            let diffDays = Math.ceil(dateDiff/ msPerDay);

            return(
                <div className={skinStyle==1?styles.bodyBoxBlue:skinStyle==2?styles.bodyBoxWhite:styles.bodyBox}>
                    <div className={`${styles.zhzb} ${styles.box_shadow}`}>
                        <Title title={['综合指标']}></Title>
                        <div className={styles.zhzbdown}><img src={anquan} className={styles.anquan}/>安全运行
                            <span className={styles.daynum}> {dni}</span> 天
                        </div>
                        <div className={styles.zhzbtop}>
                            <div className={styles.zhzbtopbox}><div>全年发电量</div> <span className={styles.zhzbtopboxg}>{Number((mobd[8888800].YearEgyAt)*mod.YearEgyAt.coeff).toFixed(2)}</span>{mod.YearEgyAt.unit}</div>
                            <div className={styles.zhzbtopbox}><div>弃风率</div> <span className={styles.zhzbtopboxg}>{qfl=="NaN"?"--":qfl}</span>%</div>
                            <div className={styles.zhzbtopbox}><div>弃光率</div> <span className={styles.zhzbtopboxg}>{qgl=="NaN"?"--":qgl}</span>%</div>
                            <div className={styles.zhzbtopbox}><div>上网电量</div> <span className={styles.zhzbtopboxg}>{swdlsj.toFixed(2)}</span>万kWh</div>
                            <div className={styles.zhzbtopbox}><div>厂用电量</div> <span className={styles.zhzbtopboxg}>{(yfdlsj-swdlsj+gwdlsj).toFixed(2)}</span>万kWh</div>
                            <div className={styles.zhzbtopbox}><div>购网电量</div> <span className={styles.zhzbtopboxg}>{gwdlsj.toFixed(2)}</span>万kWh</div>

                        </div>

                    </div>
                    <div className={`${styles.zhzbgl} ${styles.box_shadow}`}>
                        <Title title={['综合指标概览']}></Title>
                        <div className={styles.zhzbglmain}>
                            <div className={styles.zhzbglbox}><img src={up}/>
                                <p>投资收益率</p>
                                <Pie2 color={rate>0.12? ['#62de88',annularPlate]:rate>0.108?['#e8952a',annularPlate]:rate>0.096?['#a32124',annularPlate]:['#d8403d',annularPlate]} num={[profit,amounts-profit]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={rate>0.12? {color:'#62de88'} :rate>0.108?{color:'#e8952a'}:rate>0.096?{color:'#a32124'}:{color:'#d8403d'}}>{rate=="NaN"?"--":(rate*100).toFixed(1)}%</p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}><img src={up}/>
                                <p>年发电计划完成率</p>
                                <Pie2 color={nfdjhwcl>90? ['#62de88',annularPlate]:nfdjhwcl>80?['#e8952a',annularPlate]:nfdjhwcl>60?['#a32124',annularPlate]:['#d8403d',annularPlate]} num={[Number(mobd[8888800].YearEgyAt),Number((mobd[8888800].YearPlanTotEgyAt/1)-(mobd[8888800].YearEgyAt/1))]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={nfdjhwcl>90? {color:'#62de88'} :nfdjhwcl>80?{color:'#e8952a'}:nfdjhwcl>60?{color:'#a32124'}:{color:'#d8403d'}}>{nfdjhwcl}%</p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}><img src={down}/>
                                <p>年度PBA</p>
                                <Pie2 color={ndpba>90? ['#62de88',annularPlate]:ndpba>80?['#e8952a',annularPlate]:ndpba>60?['#a32124',annularPlate]:['#d8403d',annularPlate]} num={[Number(mobd[8888800].YearEgyAt),Number((mobd[8888800].YearEgyAt/1)+(mobd[8888800].YearLossElec.Sum/1)-(mobd[8888800].YearEgyAt/1))]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={ndpba>90? {color:'#62de88'} :ndpba>80?{color:'#e8952a'}:ndpba>60?{color:'#a32124'}:{color:'#d8403d'}}>{ndpba}%</p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}><img src={up}/>
                                <p>设备健康度</p>
                                <Pie2 color={['#d06960',annularPlate]} num={[57,43]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={{color:'#d06960'}}>{57}%</p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}><img src={down}/>
                                <p>工单完成率</p>
                                <Pie2 color={['#fbd500',annularPlate]} num={[82,18]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={{color:'#fbd500'}}>{82}%</p>
                                </span>
                            </div>
                            <div className={styles.zhzbglbox}><img src={up}/>
                                <p>年度MTBF</p>
                                <Pie2 color={zmtbf>diffDays*0.9? ['#62de88',annularPlate]:zmtbf>diffDays*0.8?['#e8952a',annularPlate]:zmtbf>diffDays*0.6 ?['#a32124',annularPlate]:['#d8403d',annularPlate]} num={[Number(mobd[8888800].YearMTBF),diffDays-Number(mobd[8888800].YearMTBF)]}></Pie2>
                                <span className={styles.zhzbglboxnum}>
                                    <p style={zmtbf>diffDays*0.9? {color:'#62de88'} :zmtbf>diffDays*0.8?{color:'#e8952a'}:zmtbf>diffDays*0.6?{color:'#a32124'}:{color:'#d8403d'}}>{zmtbf}h</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.columbox}>
                        <div className={`${styles.leftcolum} ${styles.box_shadow}`}>
                            <Title title={['月发电量完成情况']}></Title>
                            <Tuchart2 njhfdl={kbynjhfdl1} nsjfdl={kbynsjfdl1} nfdlwcl={kbynfdwcl} monthTime={monthTimeHandle} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Tuchart2>
                        </div>
                        <div className={`${styles.rightcolum} ${styles.box_shadow}`}>
                            <Title title={['月收益状况']}></Title>
                            <Tuchart4 cbsj={cost} srsj={incomes} monthTime={month2} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Tuchart4>
                        </div>
                    </div>

                    <div className={`${styles.fgzyfx} ${styles.box_shadow}`}>

                        <Title title={['场站年等效利用小时数']}></Title>
                        <div className={styles.fgzyfxmain}>
                            <Tuchart3 gczmc={arrname} gczdxlyxss={czndxly1} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Tuchart3>
                        </div>
                    </div>

                    <div className={`${styles.gzsbgl} ${styles.box_shadow}`}>
                        <Title title={['场站MTBF排行']}></Title>
                        <Tuchart5 gczmc={arrname} gczmtbf={czmtbf} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Tuchart5>
                    </div>
                     <div className={`${styles.ssdlqkfx} ${styles.box_shadow}`}>
                        <Title title={['损失电量情况分析(kWh)']}></Title>
                        <Tuchart1 ssdlnum={ssdlqkfx} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Tuchart1>
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
        mmoname:state.vars.mmoname,
        mmodata:state.vars.mmodata,
        bloo:state.vars.bloo,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedate:(bloo)=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "Cockpit", momo, "Screen", 0);
            function momo(mmoname){
                if(mmoname.Model.dis==undefined||mmoname.Model.ens==undefined){
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "Cockpit", momo, "Screen", 0);
                }else {
                    dispatch(actions.setVars('mmoname', mmoname));
                    TY.getRtData("Cockpit", 8888800, ppo);
                    function ppo(mmodata){
                            if(mmodata.ModelData==undefined||mmodata.ModelData[8888800]==undefined){
                                TY.getRtData("Cockpit", 8888800, ppo);
                            }else {
                                dispatch(actions.setVars('mmodata', mmodata));

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
                                                if(rdata4.ModelData==undefined || rdata4.ModelData[8888800]==undefined){
                                                    TY.getRtData("DevicesMatrix", 8888800, setfData)
                                                }else{
                                                    dispatch(actions.setVars('fData', rdata4));

                                                    $.ajax({
                                                        url:'http://'+ipUrl+'/wbi/yield/getMaxYie',//收益率饼图
                                                        type: 'post',
                                                        async:true,
                                                        dataType: 'json',
                                                        success:function (data) {
                                                            profit = (data.data.incomes/10000).toFixed(1)/1;
                                                            amounts =(data.data.amounts/10000).toFixed(1)/1;
                                                            rate = data.data.rate;
                                                        },
                                                        complete : function(XMLHttpRequest,status){
                                                            $.ajax({
                                                                url:'http://'+ipUrl+'/wbi/yield/getAllRate',//年收益表
                                                                type: 'post',
                                                                async:true,
                                                                dataType: 'json',
                                                                success:function (data) {
                                                                    yearPro=data.data;
                                                                    month2=[],cost=[],incomes=[];
                                                                    for(let i in yearPro){
                                                                        month2.push(yearPro[i].month+"月");
                                                                        cost.push(Number((yearPro[i].costs).toFixed(1)/1));
                                                                        incomes.push(Number((yearPro[i].earning).toFixed(1)/1));
                                                                    }
                                                                    setTimeout(function () {
                                                                        dispatch(actions.setVars('bloo', true));
                                                                        clearTimeout(onceTime);
                                                                    },100)
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                    }
                }
            }
            onceTime=setTimeout(function(){
                alert('数据获取失败！请重新登入');
                browserHistory.push('/app/all/page/login');
                dispatch(actions.setVars('userInfo', false));
            },10000)
            //数据刷新//
            time=setInterval(function(){
                TY.getRtData("Cockpit", 8888800, ppo);
                function ppo(mmodata){
                    if(mmodata.ModelData[8888800]==undefined){
                        TY.getRtData("Cockpit", 8888800, ppo);
                    }else {
                        dispatch(actions.setVars('mmodata', mmodata));
                    }
                }
            },2000)
        },
        // ajax: () => {
        //     $.ajax({
        //         url:'http://'+ipUrl+'/wbi/yield/getMaxYie',//收益率饼图
        //         type: 'post',
        //         async:true,
        //         dataType: 'json',
        //         success:function (data) {
        //             profit = (data.data.incomes/10000).toFixed(1)/1;
        //             amounts =(data.data.amounts/10000).toFixed(1)/1;
        //             rate = data.data.rate;
        //         },
        //         complete : function(XMLHttpRequest,status){
        //             $.ajax({
        //                 url:'http://'+ipUrl+'/wbi/yield/getAllRate',//年收益表
        //                 type: 'post',
        //                 async:true,
        //                 dataType: 'json',
        //                 success:function (data) {
        //                     yearPro=data.data;
        //                     month2=[],cost=[],incomes=[];
        //                     for(let i in yearPro){
        //                         month2.push(yearPro[i].month+"月");
        //                         cost.push(Number((yearPro[i].costs).toFixed(1)/1));
        //                         incomes.push(Number((yearPro[i].earning).toFixed(1)/1));
        //                     }
        //                 }
        //             })
        //         }
        //     })
        // },
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
