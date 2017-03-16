import React from 'react';
import {connect} from 'react-redux';
import styles from './Super.scss';
import Superleftbox from './superleftbox.jsx';
import Title from '../super/Title.jsx';
import Pie from '../chart/Pie.jsx';
import Line1 from '../chart/Line2.jsx';
import Table from '../super/table.jsx';
import Table1 from '../super/table1.jsx';
import Login from '../../../../../../components/common/Loading.jsx';
let mobdNum = require('../../urlData.js');
let mobdZero = mobdNum.mobdZero/1;
let mobdOne = mobdNum.mobdOne/1;
let mobdTwo = mobdNum.mobdTwo/1;
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
         
        let {zhzb,bbs,all,boolsuper=false,skinStyle}=this.props;
        if(boolsuper && bbs.ModelData){
            let data=bbs.ModelData;
            let mod=zhzb.Model;
            let date03=[];

            let datename00=bbs.ModelData[mobdZero].CurDayPowerCurve.Time;
            let date00=bbs.ModelData[mobdZero].CurDayPowerCurve.Value;
            date00.map(function(value,key){
                date03.push(Number((value/1000).toFixed(2)))
            })
          
            let datename01=bbs.ModelData[mobdOne].CurDayWindSpeedCurve.Time;
            let date01=bbs.ModelData[mobdOne].CurDayWindSpeedCurve.Value;
            let datename02=bbs.ModelData[mobdTwo].CurDayPVTSICurve.Time;
            let date02=bbs.ModelData[mobdTwo].CurDayPVTSICurve.Value;
            if(datename00==undefined || date00==undefined){
                datename00=[];
                date00=[];
            }
            if(datename01==undefined || date01==undefined){
                datename01=[];
                date02=[];
            }
            if(datename02==undefined || date02==undefined){
                datename02=[];
                date02=[];
            }
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

            let annularPlate='#39565e';//环状图底色，用于换肤//
            if(skinStyle==2){
                annularPlate='#C0E2EA';
            }
        return (
            <div className={skinStyle==1?styles.bodyBoxBlue:skinStyle==2?styles.bodyBoxWhite:styles.bodyBox}>
                <div className={styles.leftBox}>
                    <Superleftbox></Superleftbox>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.chart_pie} >
                        <div className={`${styles.ehart} ${styles.box_shadow}`}>  
                        <div className={styles.dingwei}>
                            <Pie arn={arrname} nu={num} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Pie>
                        </div>
                        <span className={styles.chartnum}><p>{(allnum/10000).toFixed(1)}</p><p>万kWh</p></span>
                            <Title title={['日发电量统计']}></Title>
                        </div>
                        <div className={`${styles.spanL} ${styles.box_shadow} ${styles.ehart}`}>
                            <Line1 date={date03} datenamel={datename00} height={220} name={'当前出力'} unit={mod.dis.CurDayPowerCurve.unit} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Line1>
                   
                            <Title title={[mod.dis.CurDayPowerCurve.name+'('+mod.dis.CurDayPowerCurve.unit+')']}></Title>
                            
                        </div>
                        <div style={{"clear":"both"}}></div>
                       
                    </div>
                    <div className={styles.chart_bar}>
                        <div className={`${styles.linebox} ${styles.box_shadow}`}>
                            <Line1 date={date01} datenamel={datename01} height={150} name={'当前风速'} unit={mod.dis.CurDayWindSpeedCurve.unit} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Line1>
                            <Title title={[mod.dis.CurDayWindSpeedCurve.name+'('+mod.dis.CurDayWindSpeedCurve.unit+')']}></Title>
                        </div>
                        <div style={{"clear":"both"}}></div>
                    </div>
                    <div className={styles.chart_bar}>
                         <div className={`${styles.linebox} ${styles.linebox1} ${styles.box_shadow}`}>
                            <Line1 date={date02} datenamel={datename02} height={150} name={'当前辐照度'} unit={['(W/㎡)']} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Line1>
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
        boolsuper: state.vars.boolsuper,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
         changedate:()=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DataOverview", setData, "Screen", 0);
                function setData(zhzb){
                    if(zhzb.Model && (zhzb.Model.ens==undefined || zhzb.Model.dis==undefined)){
                        TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DataOverview", setData, "Screen", 0);
                    }else{
                    dispatch(actions.setVars('zhzb', zhzb));
                    TY.getRtData("DataOverview", mobdZero, setData1)
                        function setData1(bbs){
                            TY.getRtData("DataOverview", mobdZero, setData1)
                                function setData1(bbs){
                                    if(!(bbs.ModelData[mobdZero] && bbs.ModelData[mobdZero] && bbs.ModelData[mobdZero])){
                                        TY.getRtData("DataOverview", mobdZero, setData1)
                                    }else {
                                        dispatch(actions.setVars('bbs', bbs));
                                        setTimeout(function () {
                                            dispatch(actions.setVars('boolsuper', true));
                                        }, 500)
                                    }
                                }
                        }
                    }
                }


                time=setInterval(function(){
                    TY.getRtData("DataOverview", mobdZero, setData1)
                        function setData1(bbs1){
                            dispatch(actions.setVars('bbs', bbs1));   
                        }
                },2000)
                                                   
            
        },
        init: () => {
            var obj = {
                test:''
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

