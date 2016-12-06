
import React from 'react';
import {connect} from 'react-redux';
import styles from './superleftbox.scss';
import Title from './Title.jsx';
import dataBase from '../../../../../../config/ModelData';
import model from '../../../../../../config/Model';
import matrix from '../../../../../../config/MatrixModel';
import matData from '../../../../../../config/MatrixData';
import icon0 from '../../img/comp/icon0.png';
import icon1 from '../../img/comp/icon1.png';
import icon2 from '../../img/comp/icon2.png';
import icon3 from '../../img/comp/icon3.png';
import icon4 from '../../img/comp/icon4.png';
import icon5 from '../../img/comp/icon5.png';
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
        let {all,zhzb,bbs}=this.props;
        let mod1=zhzb.Model;
        let data2=bbs.ModelData;

        return (

            <div className={styles.bodyBox}>

                
                    <div  className={`${styles.states} ${styles.box_shadow}`}>
                    
                         <Title title={['综合指标']}></Title>
                         <div className={styles.wind}>

                           <span className={styles.num}><a className={styles.anum1}>{mod1.dis.TActPower.name}</a><a className={styles.anum}><b>{data[8888800].TActPower}</b>{mod.dis.TActPower.unit}</a></span>
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
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{Number(data2[8888800].WindSpeed_DevAverValue).toFixed(2)}</b>{mod.dis.WindSpeed_DevAverValue.unit}</a></span>
                          
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

                             <div className={styles.box} style={{color:mod.dis.WFLIMCount.color}}>
                                <span className={styles.block}><img src={icon5}/></span>
                                <span className={styles.contect}>{mod.dis.WFLIMCount.name}</span>
                                <span className={styles.numx}>{data[8888801].WFLIMCount}</span>
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
                        <p>{mod.dis.YearEgyAt.name}<span className={styles.pspan}>({mod.dis.YearEgyAt.unit})</span></p>
                        <div className={styles.boxone}>
                            <div className={styles.absbox1} style={{width:((data[8888800].YearEgyAt/data[8888800].YearPlanTotEgyAt)*100).toFixed(1)+"%"}}>{data[8888800].YearEgyAt}</div>
                            <span className={styles.absnum} >{((data[8888800].YearEgyAt/data[8888800].YearPlanTotEgyAt)*100).toFixed(1)}%</span>
                        </div>
                         <p>{mod.dis.MonthEgyAt.name}<span className={styles.pspan}>({mod.dis.MonthEgyAt.unit})</span></p>
                        <div className={styles.boxone}>
                            <div className={`${styles.absbox1} ${styles.absbox2}`} style={{width:((data[8888800].MonthEgyAt/data[8888800].CurMonthPlanEgyAt)*100).toFixed(2)+"%"}} >{data[8888800].MonthEgyAt}</div>
                            <span className={styles.absnum}>{((data[8888800].MonthEgyAt/data[8888800].CurMonthPlanEgyAt)*100).toFixed(2)}%</span>
                        </div>
                        
                    </div>
                    <div className={`${styles.Completion} ${styles.box_shadow}`}>
                   
                       <Title title={['发电量完成率']}></Title>
                       <Column></Column>
                       
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

        

        
            
        
        




            var obj = {
                test:''
            }
        },

       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
