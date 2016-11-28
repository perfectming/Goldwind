import React from 'react';
import {connect} from 'react-redux';
import styles from './Super.scss';
import Corner from './super/Corner.jsx';
import Block from './super/block.jsx';
import Block1 from './super/block1.jsx';
import Superleftbox from './super/superleftbox.jsx';
import Title from './super/Title.jsx';
import Pie from './chart/Pie.jsx';
import Line1 from './chart/line2.jsx';
import Table from './super/table.jsx';
import Table1 from './super/table1.jsx';
import dataBase from '../../../../../config/ModelData';
import model from '../../../../../config/Model';
import matrix from '../../../../../config/MatrixModel';
import matData from '../../../../../config/MatrixData';
let datename00=dataBase.ModelData[8888800].CurDayPowerCurve.Time;
let date00=dataBase.ModelData[8888800].CurDayPowerCurve.Value;
let datename01=dataBase.ModelData[8888801].CurDayWindSpeedCurve.Time;
let date01=dataBase.ModelData[8888801].CurDayWindSpeedCurve.Value;
let datename02=dataBase.ModelData[8888802].CurDayPVTSICurve.Time;
let date02=dataBase.ModelData[8888802].CurDayPVTSICurve.Value;



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
         let data=dataBase.ModelData;
        let mod=model.Model;
        let  mat=matrix.Model;
        let matD=matData.ModelData;
        let {all}=this.props;
        return (
            <div className={styles.bodyBox}>

                <div className={styles.leftBox}>
                    <Superleftbox></Superleftbox>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.chart_pie} >
                        <div className={`${styles.ehart} ${styles.box_shadow}`}>  
                        <div className={styles.dingwei}>
                            <Pie></Pie>
                        </div>
                        <span className={styles.chartnum}><p>{all}</p><p>kWh</p></span>
                            <Title title={['日发电量统计']}></Title>
                        </div>
                        <div className={`${styles.spanL} ${styles.box_shadow} ${styles.ehart}`}>
                            <Line1 date={date00} datename={datename00} height={220} name={'当日24小时功率曲线'}></Line1>
                   
                            <Title title={[mod.dis.CurDayPowerCurve.name+'('+mod.dis.CurDayPowerCurve.unit+')']}></Title>
                            
                        </div>
                        <div style={{"clear":"both"}}></div>
                       
                    </div>
                    <div className={styles.chart_bar}>
                        <div className={`${styles.linebox} ${styles.box_shadow}`}>
                            <Line1 date={date01} datename={datename01} height={150} name={'当日风速曲线'}></Line1>
                            <Title title={[mod.dis.CurDayWindSpeedCurve.name+'('+mod.dis.CurDayWindSpeedCurve.unit+')']}></Title>
                        </div>

                         <div className={`${styles.linebox} ${styles.linebox1} ${styles.box_shadow}`}>
                            <Line1 date={date02} datename={datename02} height={150} name={'当日辐照度曲线'}></Line1>
                            <Title title={[mod.dis.CurDayPVTSICurve.name+'('+mod.dis.CurDayPVTSICurve.unit+')']}></Title>

                        </div>
                        <div style={{"clear":"both"}}></div>
                        
                   
                        
                       
                    </div>
                    <div className={styles.box_shadow}>
                        <div className={styles.table}>
                            <Table></Table> 
                        </div>
                        <div className={`${styles.table} ${styles.bot}`}>
                            <Table1></Table1> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        all: state.vars.allnumber,
    }
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
