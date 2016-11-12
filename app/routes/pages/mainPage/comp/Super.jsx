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
                         <div className={styles.wind}>
                           <span className={styles.num}><a className={styles.anum1}>{mod.dis.WFCount.name}</a><a className={styles.anum}><b>{data.a8888800.WFCount}</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.WTCount.name}</a><a className={styles.anum}><b>{data.a8888800.WTCount}</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{data.a8888800.WindSpeed_DevAverValue}</b>m/s</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.PVCount.name}</a><a className={styles.anum}><b>{data.a8888800.PVCount}</b>个</a></span>
                         </div>
                          <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.TActPower.name}</a><a className={styles.anum}><b>{data.a8888800.TActPower}</b>MW</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.Capacity.name}</a><a className={styles.anum}><b>{data.a8888800.Capacity}</b>MW</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.DayEgyAt.name}</a><a className={styles.anum}><b>{data.a8888800.DayEgyAt}</b>万kwh</a></span>
                            
                         </div>
                    </div>
                    <div className={`${styles.states} ${styles.states2} ${styles.box_shadow}`}>
                    
                         <Title title={['风场指标',]}></Title>
                         <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>风场个数</a><a className={styles.anum}><b>3</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>风机台数</a><a className={styles.anum}><b>140</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>平均风速</a><a className={styles.anum}><b>3.31</b>m/s</a></span>
                          
                         </div>
                          <div className={styles.wind}>
                           <Block></Block>
                            
                         </div>
                    </div>
                    <div className={`${styles.states} ${styles.Speed} ${styles.box_shadow}`}>
                      
                        <Title title={['机组运行状态','逆变器运行状态']}></Title>
                         <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>风场个数</a><a className={styles.anum}><b>3</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>风机台数</a><a className={styles.anum}><b>140</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>平均风速</a><a className={styles.anum}><b>3.31</b>m/s</a></span>
                          
                         </div>
                        <div className={styles.spedc}>
                             <Block1></Block1>
                        </div>
                        
                        
                    </div>
                     <div className={`${styles.Situation} ${styles.box_shadow}`}>
                       
                        <Title title={['发电量完成情况']}></Title>
                        <p>年发电量(万kWh)</p>
                        <div className={styles.boxone}>
                            <div className={styles.absbox1}>288000.50</div>
                            <span className={styles.absnum}>73.1%</span>
                        </div>
                         <p>月发电量(万kWh)</p>
                        <div className={styles.boxone}>
                            <div className={`${styles.absbox1} ${styles.absbox2}`}>24000.50</div>
                            <span className={styles.absnum}>73.1%</span>
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
                   
                        <Title title={['风场指标','综合指标']}></Title>
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
