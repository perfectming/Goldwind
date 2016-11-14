import React from 'react';
import {connect} from 'react-redux';
import styles from './Super.scss';
import Corner from './super/Corner.jsx';
import Block from './super/block.jsx';
import Block1 from './super/block1.jsx';
import Title from './super/Title.jsx';
import Pie from './chart/Pie.jsx';
import Line from './chart/line1.jsx';
import Line1 from './chart/line2.jsx';
import Column from './chart/column1.jsx';
import Table from './super/table.jsx';
import dataBase from '../../../../../config/ModelData';
import model from '../../../../../config/Model';
import matrix from '../../../../../config/MatrixModel';
import matData from '../../../../../config/MatrixData';
import icon0 from '../img/comp/icon0.png';
import icon1 from '../img/comp/icon1.png';
import icon2 from '../img/comp/icon2.png';
import icon3 from '../img/comp/icon3.png';
import icon4 from '../img/comp/icon4.png';
import icon5 from '../img/comp/icon5.png';



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
         let data=dataBase.ModelData;
        let mod=model.Model;
        let  mat=matrix.Model;
        let matD=matData.ModelData;
        return (
            <div className={styles.bodyBox}>

                <div className={styles.leftBox}>
                    <div  className={`${styles.states} ${styles.box_shadow}`}>
                    
                         <Title title={['综合指标']}></Title>
                         <Title title={['综合指标']}></Title>
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
                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect} style={{"color":"#1fe005"}}>运行</span>
                                <span className={styles.numx} style={{"color":"#1fe005"}}>{data[8888801].ONL}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect} style={{"color":"#ff0000"}}>故障</span>
                                <span className={styles.numx} style={{"color":"#ff0000"}}>{data[8888801].FaultCount}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon2}/></span>
                                <span className={styles.contect} style={{"color":"#fbd500"}}>检测</span>
                                <span className={styles.numx} style={{"color":"#fbd500"}}>{data[8888801].RepairCount}</span>
                             </div>
                               <div className={styles.box}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect} style={{"color":"#929396"}}>离线</span>
                                <span className={styles.numx} style={{"color":"#929396"}}>{data[8888801].OfflineCount}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon4}/></span>
                                <span className={styles.contect} style={{"color":"#2189ff"}}>待机</span>
                                <span className={styles.numx} style={{"color":"#2189ff"}}>{data[8888801].WFStandbyCount}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon5}/></span>
                                <span className={styles.contect} style={{"color":"#dddcdc"}}>限电</span>
                                <span className={styles.numx} style={{"color":"#dddcdc"}}>{data[8888802].PVOFL}</span>
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


                            <div className={`${styles.box} ${styles.box1}`}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect} style={{"color":"#1fe005"}}>运行</span>
                                <span className={styles.num} style={{"color":"#1fe005"}}>{data[8888802].PVONL}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect} style={{"color":"#ff0000"}}>故障</span>
                                <span className={styles.num} style={{"color":"#ff0000"}}>{data[8888802].PVFLT}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect} style={{"color":"#929396"}}>离线</span>
                                <span className={styles.num} style={{"color":"#929396"}}>{data[8888802].PVOFL}</span>
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
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.chart_pie} >
                        <div className={`${styles.ehart} ${styles.box_shadow}`}>  
                        <div className={styles.dingwei}>
                            <Pie></Pie>
                        </div>
                        <span className={styles.chartnum}><p>25360</p><p>kWh</p></span>
                            <Title title={['日发电量统计']}></Title>
                        </div>
                        <div className={`${styles.spanL} ${styles.box_shadow} ${styles.ehart}`}>
                            <Line1></Line1>
                   
                            <Title title={['风场指标']}></Title>
                            
                        </div>
                        <div style={{"clear":"both"}}></div>
                       
                    </div>
                    <div className={styles.chart_bar}>
                        <div className={`${styles.linebox} ${styles.box_shadow}`}>
                            <Line></Line>
                            <Title title={['风场指标']}></Title>
                        </div>

                         <div className={`${styles.linebox} ${styles.linebox1} ${styles.box_shadow}`}>
                            <Line></Line>
                            <Title title={['风场指标']}></Title>

                        </div>
                        <div style={{"clear":"both"}}></div>
                        
                   
                        
                       
                    </div>
                    <div className={`${styles.table} ${styles.box_shadow}`}>
                   
                       
                        <Table></Table>
                        <Table></Table>
                        
                    </div>
                </div>
            </div>
        );
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
