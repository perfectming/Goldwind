import React from 'react';
import {connect} from 'react-redux';
import styles from './Super.scss';
import Corner from './super/Corner.jsx';
import Block from './super/block.jsx';
import Block1 from './super/block1.jsx';
import Superleftbox from './super/superleftbox.jsx';
import Title from './super/Title.jsx';
import Pie from './chart/Pie.jsx';
<<<<<<< HEAD
import Line from './chart/line1.jsx';
import Line2 from './chart/line3.jsx';
=======
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
import Line1 from './chart/line2.jsx';
import Table from './super/table.jsx';
import Table1 from './super/table1.jsx';
import dataBase from '../../../../../config/ModelData';
import model from '../../../../../config/Model';
import matrix from '../../../../../config/MatrixModel';
import matData from '../../../../../config/MatrixData';
<<<<<<< HEAD
import icon0 from '../img/comp/icon0.png';
import icon1 from '../img/comp/icon1.png';
import icon2 from '../img/comp/icon2.png';
import icon3 from '../img/comp/icon3.png';
import icon4 from '../img/comp/icon4.png';
import icon5 from '../img/comp/icon5.png';

=======
import Login from '../../../../components/common/Loading.jsx';
var actions = require('redux/actions');
let time;
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43


let Component = React.createClass({
     componentWillMount() {
        this.props.changedate();
    },
     componentWillUnmount() {
       clearInterval(time)
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
         
        let {zhzb,bbs,all,boolsuper=false}=this.props;
       if(boolsuper){
        let data=bbs.ModelData;
        let mod=zhzb.Model;
        let  mat=matrix.Model;
        let matD=matData.ModelData;
        let datename00=bbs.ModelData[8888800].CurDayPowerCurve.Time;
        let date00=bbs.ModelData[8888800].CurDayPowerCurve.Value;
        let datename01=bbs.ModelData[8888801].CurDayWindSpeedCurve.Time;
        let date01=bbs.ModelData[8888801].CurDayWindSpeedCurve.Value;
        let datename02=bbs.ModelData[8888802].CurDayPVTSICurve.Time;
        let date02=bbs.ModelData[8888802].CurDayPVTSICurve.Value;
            let datename=zhzb.Model.ens;
            let arr=[];
            let arrname=[];
            let allnum=0;
            let num=[];

            (function(){
                for(let i in data){
                if(data[i].WTCount=='0' || data[i].InverterCount =='0'){
                arr.push(data[i].DayEgyAt/1);
                }
                }
                for(let x=0;x<arr.length;x++){
                    allnum+=arr[x]
                }  
   
            }());
            (function(){
                for(let i in datename){
                    if(datename[i].wft){
                    arrname.push(datename[i].name);
                    }
                }    
    
                play();

            }())
            function play(){
                for(let i=0;i<arr.length;i++){
                    num.push([arrname[i],arr[i]])
                }

            }
        return (
            <div className={styles.bodyBox}>

                <div className={styles.leftBox}>
<<<<<<< HEAD
                    <div  className={`${styles.states} ${styles.box_shadow}`}>
                    
                         <Title title={['综合指标']}></Title>

                         <div className={styles.wind}>
                           <span className={styles.num}><a className={styles.anum1}>{mod.dis.TActPower.name}</a><a className={styles.anum}><b>{data[8888800].TActPower}</b>{mod.dis.TActPower.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.Capacity.name}</a><a className={styles.anum}><b>{data[8888800].Capacity}</b>{mod.dis.Capacity.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>风电容量</a><a className={styles.anum}><b>{data[8888801].Capacity}</b>{mod.dis.Capacity.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>光伏容量</a><a className={styles.anum}><b>{data[8888802].Capacity}</b>{mod.dis.Capacity.unit}</a></span>
                         </div>
                          <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.YearEgyAt.name}</a><a className={styles.anum}><b>{data[8888800].YearEgyAt}</b>{mod.dis.YearEgyAt.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.MonthEgyAt.name}</a><a className={styles.anum}><b>{data[8888800].MonthEgyAt}</b>{mod.dis.MonthEgyAt.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.DayEgyAt.name}</a><a className={styles.anum}><b>{data[8888800].DayEgyAt}</b>{mod.dis.DayEgyAt.unit}</a></span>
                            
                         </div>
                    </div>
                    <div className={`${styles.states} ${styles.states2} ${styles.box_shadow}`}>
                    
                         <Title title={['风场指标',]}></Title>
                         <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.WFCount.name}</a><a className={styles.anum}><b>{data[8888800].WFCount}</b>{mod.dis.WFCount.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.WTCount.name}</a><a className={styles.anum}><b>{data[8888800].WTCount}</b>{mod.dis.WTCount.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{data[8888800].WindSpeed_DevAverValue}</b>{mod.dis.WindSpeed_DevAverValue.unit}</a></span>
                          
                         </div>
                          <div className={styles.wind}>
                             <div className={styles.box} style={{color:mod.dis.ONL.color}}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect}>{mod.dis.ONL.name}</span>
                                <span className={styles.numx}>{data[8888801].ONL}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.FaultCount.color}}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect}>{mod.dis.FaultCount.name}</span>
                                <span className={styles.numx}>{data[8888801].FaultCount}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.RepairCount.color}}>
                                <span className={styles.block}><img src={icon2}/></span>
                                <span className={styles.contect}>{mod.dis.RepairCount.name}</span>
                                <span className={styles.numx}>{data[8888801].RepairCount}</span>
                             </div>
                               <div className={styles.box} style={{color:mod.dis.OfflineCount.color}}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect}>{mod.dis.OfflineCount.name}</span>
                                <span className={styles.numx}>{data[8888801].OfflineCount}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.WFStandbyCount.color}}>
                                <span className={styles.block}><img src={icon4}/></span>
                                <span className={styles.contect}>{mod.dis.WFStandbyCount.name}</span>
                                <span className={styles.numx}>{data[8888801].WFStandbyCount}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.OfflineCount.color}}>
                                <span className={styles.block}><img src={icon5}/></span>
                                <span className={styles.contect}>{mod.dis.OfflineCount.name}</span>
                                <span className={styles.numx}>{data[8888801].OfflineCount}</span>
                             </div>


                            
                         </div>
                    </div>
                    <div className={`${styles.states} ${styles.Speed} ${styles.box_shadow}`}>
                      
                        <Title title={['光伏指标']}></Title>
                         <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.PVCount.name}</a><a className={styles.anum}><b>{data[8888802].PVCount}</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.InverterCount.name}</a><a className={styles.anum}><b>{data[8888802].InverterCount}</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{data[8888802].PVTSI_Aver}</b>W/m<sup>2</sup></a></span>
                          
                         </div>
                        <div className={styles.spedc}>


                            <div className={`${styles.box} ${styles.box1}`} style={{color:mod.dis.PVONL.color}}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect} >{mod.dis.PVONL.name}</span>
                                <span className={styles.num} >{data[8888802].PVONL}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`} style={{color:mod.dis.PVFLT.color}}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect} >{mod.dis.PVFLT.name}</span>
                                <span className={styles.num} >{data[8888802].PVFLT}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`} style={{color:mod.dis.PVOFL.color}}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect} >{mod.dis.PVOFL.name}</span>
                                <span className={styles.num} >{data[8888802].PVOFL}</span>
                             </div>




                        </div>
                        
                        
                    </div>
                     <div className={`${styles.Situation} ${styles.box_shadow}`}>
                       
                        <Title title={['发电量完成情况']}></Title>
                        <p>{mod.dis.YearEgyAt.name}({mod.dis.YearEgyAt.unit})</p>
                        <div className={styles.boxone}>
                            <div className={styles.absbox1} style={{width:((data[8888800].YearEgyAt/data[8888800].YearPlanTotEgyAt)*100).toFixed(1)+"%"}}>{data[8888800].YearEgyAt}</div>
                            <span className={styles.absnum} >{((data[8888800].YearEgyAt/data[8888800].YearPlanTotEgyAt)*100).toFixed(1)}%</span>
                        </div>
                         <p>{mod.dis.MonthEgyAt.name}({mod.dis.MonthEgyAt.unit})</p>
                        <div className={styles.boxone}>
                            <div className={`${styles.absbox1} ${styles.absbox2}`} style={{width:((data[8888800].MonthEgyAt/data[8888800].CurMonthPlanEgyAt)*100).toFixed(2)+"%"}} >{data[8888800].MonthEgyAt}</div>
                            <span className={styles.absnum}>{((data[8888800].MonthEgyAt/data[8888800].CurMonthPlanEgyAt)*100).toFixed(2)}%</span>
                        </div>
                        
                    </div>
                    <div className={`${styles.Completion} ${styles.box_shadow}`}>
                   
                       <Title title={['发电量完成率']}></Title>
                       <Column></Column>
                       
                    </div>
=======
                    <Superleftbox></Superleftbox>
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.chart_pie} >
                        <div className={`${styles.ehart} ${styles.box_shadow}`}>  
                        <div className={styles.dingwei}>
                            <Pie arn={arrname} nu={num}></Pie>
                        </div>
                        <span className={styles.chartnum}><p>{(allnum/10000).toFixed(1)}</p><p>万kWh</p></span>
                            <Title title={['日发电量统计(kWh)']}></Title>
                        </div>
                        <div className={`${styles.spanL} ${styles.box_shadow} ${styles.ehart}`}>
                            <Line1 date={date00} datename={datename00} height={220} name={'当前出力'} unit={mod.dis.CurDayPowerCurve.unit}></Line1>
                   
                            <Title title={[mod.dis.CurDayPowerCurve.name+'('+mod.dis.CurDayPowerCurve.unit+')']}></Title>
                            
                        </div>
                        <div style={{"clear":"both"}}></div>
                       
                    </div>
                    <div className={styles.chart_bar}>
                        <div className={`${styles.linebox} ${styles.box_shadow}`}>
<<<<<<< HEAD
                            <Line2></Line2>
=======
                            <Line1 date={date01} datename={datename01} height={150} name={'当前风速'} unit={mod.dis.CurDayWindSpeedCurve.unit}></Line1>
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                            <Title title={[mod.dis.CurDayWindSpeedCurve.name+'('+mod.dis.CurDayWindSpeedCurve.unit+')']}></Title>
                        </div>

                         <div className={`${styles.linebox} ${styles.linebox1} ${styles.box_shadow}`}>
<<<<<<< HEAD
                            <Line></Line>
                            <Title title={[mod.dis.CurDayPVTSICurve.name+'('+mod.dis.CurDayPVTSICurve.unit+')']}></Title>
=======
                            <Line1 date={date02} datename={datename02} height={150} name={'当前辐照度'} unit={['(W/㎡)']}></Line1>
                            <Title title={[mod.dis.CurDayPVTSICurve.name+'(W/㎡)']}></Title>
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43

                        </div>
                        <div style={{"clear":"both"}}></div>
                        
                   
                        
                       
                    </div>
<<<<<<< HEAD
                    <div className={`${styles.table} ${styles.box_shadow}`}>
                   
                       
                        <Table></Table>
                        
                        
=======
                    <div className={styles.box_shadow}>
                        <div className={styles.table}>
                            <Table></Table> 
                        </div>
                        <div className={`${styles.table} ${styles.bot}`}>
                            <Table1></Table1> 
                        </div>
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                    </div>
                </div>
            </div>
        );
        }else{
            return(
                <Login></Login>
                )
        }
    }
});


const mapStateToProps = (state) => {
    return {
        zhzb: state.vars.zhzb,
        bbs: state.vars.bbs,
        boolsuper:state.vars.boolsuper,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
         changedate:()=>{

              // time=setInterval(function(){
            //     console.log('刷新')

            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
                function setData(rdata){
                    dispatch(actions.setVars('zhzb', rdata));
                    TY.getRtData("DataOverview", 8888800, setData1)
                        function setData1(rdata){
                            TY.getRtData("DataOverview", 8888800, setData1)
                                function setData1(rdata){
                                    dispatch(actions.setVars('bbs', rdata));
                                    setTimeout(function(){
                                       dispatch(actions.setVars('boolsuper', true));  

                                   },500)
                                     
                                }
                        }
                }


                time=setInterval(function(){
                    TY.getRtData("DataOverview", 8888800, setData1)
                        function setData1(rdata){
                            dispatch(actions.setVars('bbs', rdata));
   
                        }
                },2000)
                                                   
              // },500)
        },
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
