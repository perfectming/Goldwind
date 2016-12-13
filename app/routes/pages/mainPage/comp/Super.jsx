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
import Login from '../../../../components/common/Loading.jsx';
var actions = require('redux/actions');
let time;


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
                    <Superleftbox></Superleftbox>
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
                            <Line1 date={date01} datename={datename01} height={150} name={'当前风速'} unit={mod.dis.CurDayWindSpeedCurve.unit}></Line1>
                            <Title title={[mod.dis.CurDayWindSpeedCurve.name+'('+mod.dis.CurDayWindSpeedCurve.unit+')']}></Title>
                        </div>

                         <div className={`${styles.linebox} ${styles.linebox1} ${styles.box_shadow}`}>
                            <Line1 date={date02} datename={datename02} height={150} name={'当前辐照度'} unit={['(W/㎡)']}></Line1>
                            <Title title={[mod.dis.CurDayPVTSICurve.name+'(W/㎡)']}></Title>

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
