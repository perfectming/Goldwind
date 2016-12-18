
import React from 'react';
import {connect} from 'react-redux';
import styles from './superleftbox.scss';
import Title from './Title.jsx';
import icon0 from '../../../img/comp/icon0.png';
import icon1 from '../../../img/comp/icon1.png';
import icon2 from '../../../img/comp/icon2.png';
import icon3 from '../../../img/comp/icon3.png';
import icon4 from '../../../img/comp/icon4.png';
import icon5 from '../../../img/comp/icon5.png';
import Column from '../chart/column1.jsx';
var $ = require('jquery');
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
        let {all,zhzb,bbs,chooseONL,chooseALL,chooseFault,chooseRepair,chooseOffline,chooseWFStandby,chooseWFLIM,choosePVALL,choosePVONL,choosePVFLT,choosePVOFL}=this.props;
        let mod1=zhzb.Model;
        let data2=bbs.ModelData;
        return (

            <div className={styles.bodyBox}>

                
                    <div  className={`${styles.states} ${styles.box_shadow}`}>
                    
                         <Title title={['综合指标']}></Title>
                         <div className={styles.wind}>

                           <span className={styles.num}><a className={styles.anum1}>{mod1.dis.TActPower.name}</a><a className={styles.anum}><b>{Number((data2[8888800].TActPower)*zhzb.Model.dis.TActPower.coeff).toFixed(zhzb.Model.dis.TActPower.place)}</b>{mod1.dis.TActPower.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod1.dis.Capacity.name}</a><a className={styles.anum}><b>{Number((data2[8888800].Capacity)*zhzb.Model.dis.Capacity.coeff).toFixed(zhzb.Model.dis.Capacity.place)}</b>{mod1.dis.Capacity.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>风电容量</a><a className={styles.anum}><b>{Number((data2[8888801].Capacity)*zhzb.Model.dis.Capacity.coeff).toFixed(zhzb.Model.dis.Capacity.place)}</b>{mod1.dis.Capacity.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>光伏容量</a><a className={styles.anum}><b>{Number((data2[8888802].Capacity)*zhzb.Model.dis.Capacity.coeff).toFixed(zhzb.Model.dis.Capacity.place)}</b>{mod1.dis.Capacity.unit}</a></span>
                         </div>
                          <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>{mod1.dis.YearEgyAt.name}</a><a className={styles.anum}><b>{Number((data2[8888800].YearEgyAt)*zhzb.Model.dis.YearEgyAt.coeff).toFixed(zhzb.Model.dis.YearEgyAt.place)}</b>{mod1.dis.YearEgyAt.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod1.dis.MonthEgyAt.name}</a><a className={styles.anum}><b>{Number((data2[8888800].MonthEgyAt)*zhzb.Model.dis.MonthEgyAt.coeff).toFixed(zhzb.Model.dis.MonthEgyAt.place)}</b>{mod1.dis.MonthEgyAt.unit}</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod1.dis.DayEgyAt.name}</a><a className={styles.anum}><b>{Number((data2[8888800].DayEgyAt)*zhzb.Model.dis.DayEgyAt.coeff).toFixed(zhzb.Model.dis.DayEgyAt.place)}</b>{mod1.dis.DayEgyAt.unit}</a></span>
                            
                         </div>
                    </div>
                    <div className={`${styles.states} ${styles.states2} ${styles.box_shadow}`}>
                    
                         <Title title={['风场指标',]}></Title>
                         <div className={styles.wind}>
                            <span className={styles.num2}><a className={styles.anum1}>{mod1.dis.WFCount.name}</a><a className={styles.anum}><b>{data2[8888801].WFCount}</b>个</a></span>
                            <span className={styles.num2} id='allwi' style={{cursor:'pointer'}} onClick = {()=> chooseALL()}><a className={styles.anum1}>{mod1.dis.WTCount.name}</a><a className={styles.anum}><b>{data2[8888800].WTCount}</b>台</a></span>
                            <span className={styles.num2}><a className={styles.anum1}>{mod1.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{Number(data2[8888800].WindSpeed_DevAverValue).toFixed(2)=='NaN' ? '--' : Number(data2[8888800].WindSpeed_DevAverValue).toFixed(2)}</b>{mod1.dis.WindSpeed_DevAverValue.unit}</a></span>
                          
                         </div>
                          <div className={styles.wind} id='wind'>
                             <div className={styles.box} style={{color:mod.dis.ONL.color}} onClick = {()=> chooseONL()}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect}>{mod.dis.ONL.name}</span>
                                <span className={styles.numx}>{data2[8888801].RunCount_SOAM}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.FaultCount.color}} onClick ={()=> chooseFault()}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect}>{mod1.dis.FaultCount.name}</span>
                                <span className={styles.numx}>{data2[8888801].FaultCount}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.RepairCount.color}} onClick ={()=> chooseRepair()}>
                                <span className={styles.block}><img src={icon2}/></span>
                                <span className={styles.contect}>{mod1.dis.RepairCount.name}</span>
                                <span className={styles.numx}>{data2[8888801].RepairCount}</span>
                             </div>
                               <div className={styles.box} style={{color:mod.dis.OfflineCount.color}} onClick ={()=> chooseOffline()}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect}>{mod1.dis.OfflineCount.name}</span>
                                <span className={styles.numx}>{data2[8888801].OfflineCount}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.WFStandbyCount.color}} onClick ={()=> chooseWFStandby()}>
                                <span className={styles.block}><img src={icon4}/></span>
                                <span className={styles.contect}>{mod1.dis.WFStandbyCount.name}</span>
                                <span className={styles.numx}>{data2[8888801].WFStandbyCount}</span>
                             </div>

                             <div className={styles.box} style={{color:mod.dis.WFLIMCount.color}} onClick ={()=> chooseWFLIM()}>
                                <span className={styles.block}><img src={icon5}/></span>
                                <span className={styles.contect}>{mod1.dis.WFLIMCount.name}</span>
                                <span className={styles.numx}>{data2[8888801].WFLIMCount}</span>
                             </div>


                            
                         </div>
                    </div>
                    <div className={`${styles.states} ${styles.Speed} ${styles.box_shadow}`}>
                      
                        <Title title={['光伏指标']}></Title>
                         <div className={styles.wind}>
                            <span className={styles.num2}><a className={styles.anum1}>{mod1.dis.PVCount.name}</a><a className={styles.anum}><b>{data2[8888802].PVCount}</b>个</a></span>
                            <span className={styles.num2} id='allpv' style={{cursor:'pointer'}} onClick = {()=> choosePVALL()}><a className={styles.anum1}>{mod1.dis.InverterCount.name}</a><a className={styles.anum}><b>{data2[8888802].InverterCount}</b>台</a></span>
                            <span className={styles.num2}><a className={styles.anum1}>{mod1.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{data2[8888802].PVTSI_Aver ==='null' ? '--':Number(data2[8888802].PVTSI_Aver).toFixed(2)}</b>W/㎡</a></span>
                          
                         </div>
                        <div className={styles.spedc} id='specd'>


                            <div className={`${styles.box} ${styles.box1}`} style={{color:mod.dis.PVONL.color}} onClick ={()=> choosePVONL()}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect} >{mod1.dis.PVONL.name}</span>
                                <span className={styles.num} >{data2[8888802].PVONL}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`} style={{color:mod.dis.PVFLT.color}} onClick ={()=> choosePVFLT()}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect} >{mod1.dis.PVFLT.name}</span>
                                <span className={styles.num} >{data2[8888802].PVFLT}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`} style={{color:mod.dis.PVOFL.color}} onClick ={()=> choosePVOFL()}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect} >{mod1.dis.PVOFL.name}</span>
                                <span className={styles.num} >{data2[8888802].PVOFL}</span>
                             </div>




                        </div>
                        
                        
                    </div>
                     <div className={`${styles.Situation} ${styles.box_shadow}`}>
                       
                        <Title title={['发电量完成情况']}></Title>
                        <p>{mod1.dis.YearEgyAt.name}<span className={styles.pspan}>({mod1.dis.YearEgyAt.unit})</span></p>
                        <div className={styles.boxone}>
                            <div className={styles.absbox1} style={{width:((data2[8888800].YearEgyAt/data2[8888800].YearPlanTotEgyAt)*100).toFixed(1)+"%"}}>{Number((data2[8888800].YearEgyAt)*zhzb.Model.dis.YearEgyAt.coeff).toFixed(zhzb.Model.dis.YearEgyAt.place)}</div>
                            <span className={styles.absnum} >{((data2[8888800].YearEgyAt/data2[8888800].YearPlanTotEgyAt)*100).toFixed(1)}%</span>
                        </div>
                         <p>{mod1.dis.MonthEgyAt.name}<span className={styles.pspan}>({mod1.dis.MonthEgyAt.unit})</span></p>
                        <div className={styles.boxone}>
                            <div className={`${styles.absbox1} ${styles.absbox2}`} style={{width:((data2[8888800].MonthEgyAt/data2[8888800].CurMonthPlanEgyAt)*100).toFixed(2)+"%"}} >{Number((data2[8888800].MonthEgyAt)*zhzb.Model.dis.MonthEgyAt.coeff).toFixed(zhzb.Model.dis.MonthEgyAt.place)}</div>
                            <span className={styles.absnum}>{((data2[8888800].MonthEgyAt/data2[8888800].CurMonthPlanEgyAt)*100).toFixed(2)}%</span>
                        </div>
                        
                    </div>
                    <div className={`${styles.Completion} ${styles.box_shadow}`}>
                   
                       <Title title={['月发电量完成率']}></Title>
                       <Column mod={mod1} date={data2}></Column>
                       
                    </div>
              
               
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        all: state.vars.allnumber,
        zhzb: state.vars.zhzb,
        bbs: state.vars.bbs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        init: () => {
            $('#wind>div').on('click',function(){
                $(this).css('font-size','16px').siblings().css('font-size','14px')
            })
             $('#specd>div').on('click',function(){
                $(this).css('font-size','16px').siblings().css('font-size','14px')
            })
              $('#allpv').on('click',function(){
                $('#specd>div').css('font-size','14px')
            })
             $('#allwi').on('click',function(){
                $('#wind>div').css('font-size','14px')
            })
             
            var obj = {
                test:''
            }
        },
        chooseALL: () => {
            dispatch(actions.setVars('chooses', 'all'));
            dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan'));           
        },
        chooseONL: () => {
            dispatch(actions.setVars('chooses', 'RunCount_SOAM'));
            // dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan'));           
        },
        chooseFault: () => {
            dispatch(actions.setVars('chooses', 'Fault'));
            // dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },
        chooseRepair: () => {
            dispatch(actions.setVars('chooses', 'Repair'));
            // dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },
        chooseOffline: () => {
            dispatch(actions.setVars('chooses', 'Offline1'));
            // dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan'));  
        },
        chooseWFStandby: () => {
            dispatch(actions.setVars('chooses', 'WFStandby'));
            // dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },
        chooseWFLIM: () => {
            dispatch(actions.setVars('chooses', 'WFLIM'));
            // dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },


        choosePVALL: () => {
            dispatch(actions.setVars('chooses2', 'PVall'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },
        choosePVONL: () => {
            dispatch(actions.setVars('chooses2', 'PVONL'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },
        choosePVFLT: () => {
            dispatch(actions.setVars('chooses2', 'PVFLT'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },
        choosePVOFL: () => {
            dispatch(actions.setVars('chooses2', 'PVOFL'));
            dispatch(actions.setVars('choosepage', 'unfilterfan')); 
        },
        
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
