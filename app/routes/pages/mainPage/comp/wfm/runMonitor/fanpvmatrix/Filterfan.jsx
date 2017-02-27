import React from 'react';
import {connect} from 'react-redux';
// import Login from '../../../../../components/common/Loading.jsx';
import styles from './Filterfan.scss';
// import Login from '../../../../components/common/Loading.jsx';
// import dataBase from '../../../../../config/ModelData';
// import matrix from '../../../../../config/MatrixModel';
var actions = require('redux/actions');
var { Router, Route, browserHistory} = require('react-router');
let mobdNum = require('../../../urlData.js');
let mobdZero = mobdNum.mobdZero/1;
let mobdOne = mobdNum.mobdOne/1;
let mobdTwo = mobdNum.mobdTwo/1;
// let fanData = require('../../../../../config/fan-data');
// let matrixdata = require('../../../../../config/MatrixData');
// let model = require('../../../../../config/Model'); 
// let modeldata = require('../../../../../config/ModelData');

//         let data=modeldata.ModelData;
//         let mod=model.Model;
//         let  mat=matrix.Model;
//         let matD=matrixdata.ModelData;

// var model_data = modeldata.ModelData;

// var arr3 = [];
// var arr4 = [];
// // var model_ens = model.Model.ens;
// for(var j in model_ens){
//     arr3.push(model_ens[j])
// }
// // arr3.map((valueE,keyE)=> {
// //     return (
// //         console.log(valueE.name)
// //         )
// // });


//  var arr1 = [];
//  var arr2 = [];
//  // var arr3 = [];
//  // var arr4 = [];
//  var obj = matrixdata;
//     var obj_wfd = obj.ModelData[mobdOne].WFDevsStatus;
//     var obj_pvd = obj.ModelData[mobdTwo].PVDevsStatus;


//     // console.log(obj_pvd);
//     for(var x in obj_wfd){
//         arr1.push(x);
//         // for(var y in obj_wfd[x]){
//         //     arr2.push(obj_wfd[x][y])
//         // }
//     }
//     for(var m in obj_pvd){
//         arr2.push(m);
//         // for(var n in obj_wfd[m]){
//         //     arr2.push(obj_wfd[m][n])
//         // }
//     }
//     // console.log(arr2);
//     // console.log(arr1);
//     // console.log(arr2);
// // arr2.map((valueZ, keyZ)=> {
// //     console.log( )
// // })


// let time;
let Component = React.createClass({
    // componentWillMount() {
    //     this.props.changedate();
    // },
    //  componentWillUnmount() {
    //    clearInterval(time)
    // },
    componentDidMount() {
        this.props.init();
    },
    
    render() {
       


        let {pageTo_1,pageTo_2,Tofaninfo1,Topvinfo1,zhzb,fModel,fData,chooses ='all'}=this.props;
        // console.log(fModel);
        // console.log(fData);
        // console.log(zhzb);
        // if(fanbool){
        let model_ens = zhzb.Model.ens;
        let obj_wfd = fData.ModelData[mobdOne].WFDevsStatus;
        let obj_pvd = fData.ModelData[mobdTwo].PVDevsStatus;
        let arr1 = [];
        let arr2 = [];
        for(var x in obj_wfd){
            arr1.push(x);
            // for(var y in obj_wfd[x]){
            //     arr2.push(obj_wfd[x][y])
            // }
        }
        for(var m in obj_pvd){
            arr2.push(m);
            // for(var n in obj_wfd[m]){
            //     arr2.push(obj_wfd[m][n])
            // }
        }
        // console.log(arr1,arr2)
        return (

            // <div className={styles.bodyBox}>

            //     <div className={styles.leftBox}>
            //         <Superleftbox></Superleftbox>
            //     </div>
            //     <div className={styles.listrightBox}>
                    
                    <div>
                    {
                    arr1.map((value, key)=> {
                        return (
                            <div className={styles.listheaderBox} key={key}>
                                <button className={styles.listbtn} onClick={()=>pageTo_1(value,key,fData)}>{model_ens[value].name}</button>
                                <div className={styles.listopt}>
                                    {
                                        obj_wfd[value].map((valueA, keyA)=> {
                                            let i;
                                            let code = valueA.WTStateCode;
                                            // console.log(code);
                                            switch(code)
                                                {
                                                    case "DisComForPre":
                                                        i = "离线";
                                                        break;
                                                    case "DisComForPlc":
                                                        i = "离线";
                                                        break;
                                                    case "Unknown":
                                                        i = "离线";
                                                        break;
                                                    case "Online":
                                                        i = "正常发电";
                                                        break;
                                                    case "LimitPow":
                                                        i = "限功率";
                                                        break;
                                                    case "Alarm":
                                                        i = "告警";
                                                        break;
                                                    case "Fault":
                                                        i = "故障停机";
                                                        break;
                                                    case "Offline":
                                                        i = "待机";
                                                        break;
                                                    case "ProtoectStop":
                                                        i = "待机";
                                                        break;
                                                    case "LimitPowStop":
                                                        i = "待机";
                                                        break;
                                                    default:
                                                        i = "暂无状态";
                                                        break;
                                                }
                                            if(chooses == "all"){      
                                                return (
                                                        <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.discomforpre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                            <div className={styles.listoptinfo}>
                                                                <span>{valueA.Wtname}</span>
                                                                    <p>{'风速:'+Number(valueA.WindSpeed)+'m/s'}</p>
                                                                    <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                            </div>
                                                        </div>
                                                )
                                            }else if(chooses == "RunCount_SOAM" && (code == "Online" || code == "Alarm")){
                                                return (
                                                        <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.discomforpre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                            <div className={styles.listoptinfo}>
                                                                <span>{valueA.Wtname}</span>
                                                                    <p>{'风速:'+Number(valueA.WindSpeed).toFixed(2)+'m/s'}</p>
                                                                    <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                            </div>
                                                        </div>
                                                )
                                            }else if(chooses == "Fault" && code == "Fault"){
                                                return (
                                                        <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.discomforpre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                            <div className={styles.listoptinfo}>
                                                                <span>{valueA.Wtname}</span>
                                                                    <p>{'风速:'+Number(valueA.WindSpeed).toFixed(2)+'m/s'}</p>
                                                                    <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                            </div>
                                                        </div>
                                                )
                                            }else if(chooses == "Repair" && valueA.WTStateColor == "#c7b88c"){
                                                return (
                                                        <div className={`${styles.listoptbtn_2} ${styles.repair} ${code == "DisComForPre" ? styles.discomforpre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                            <div className={styles.listoptinfo}>
                                                                <span>{valueA.Wtname}</span>
                                                                    <p>{'风速:'+Number(valueA.WindSpeed).toFixed(2)+'m/s'}</p>
                                                                    <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                            </div>
                                                        </div>
                                                )
                                            }else if(chooses == "Offline1" && (code == "DisComForPre" || code == "DisComForPlc" || code == "Unknown")){
                                                return (
                                                        <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.discomforpre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                            <div className={styles.listoptinfo}>
                                                                <span>{valueA.Wtname}</span>
                                                                    <p>{'风速:'+Number(valueA.WindSpeed).toFixed(2)+'m/s'}</p>
                                                                    <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                            </div>
                                                        </div>
                                                )
                                            }else if(chooses == "WFStandby" && (code == "Offline" || code == "ProtoectStop" || code == "LimitPowStop")){
                                                return (
                                                        <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.dispre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                            <div className={styles.listoptinfo}>
                                                                <span>{valueA.Wtname}</span>
                                                                    <p>{'风速:'+Number(valueA.WindSpeed).toFixed(2)+'m/s'}</p>
                                                                    <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                            </div>
                                                        </div>
                                                )
                                            }else if(chooses == "WFLIM" && code == "LimitPow"){
                                                return (
                                                        <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.dispre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                            <div className={styles.listoptinfo}>
                                                                <span>{valueA.Wtname}</span>
                                                                    <p>{'风速:'+Number(valueA.WindSpeed).toFixed(2)+'m/s'}</p>
                                                                    <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                            </div>
                                                        </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        )
                        
                    })
                  
                    }
                </div>
            //     </div>
            // </div>
        );
        // }else{
        // return (
        //     <Login></Login>
        // )
        // }
    }
});


const mapStateToProps = (state) => {
    return {   
            zhzb: state.vars.zhzb,
            // bbs: state.vars.bbs,
            fModel: state.vars.fModel,
            fData: state.vars.fData,    
            chooses: state.vars.chooses,   
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        init: () => {
            
        },

        pageTo_1:(value,key,fData)=>{
          dispatch(actions.setVars('numpage', 'fanmatrix'));
          dispatch(actions.setVars('valuepage', value));
          dispatch(actions.setVars('actbt',key ));
          dispatch(actions.setVars('actbt1','' ));
          dispatch(actions.setVars('fan_page', 'allpage'));
          dispatch(actions.setVars('befor_page','fan' ));
          dispatch(actions.setVars('fc_info', value));
          dispatch(actions.setVars('showPage', 'fan_matrix'));
          dispatch(actions.setVars('fData', fData));
          

        },
        pageTo_2:(value,key,fData)=>{
          dispatch(actions.setVars('numpage', 'pvmatrix'));
          dispatch(actions.setVars('valuepage1', value));
          dispatch(actions.setVars('actbt1',key ));
          dispatch(actions.setVars('actbt',''));
          dispatch(actions.setVars('fan_page', 'allpage'));
          dispatch(actions.setVars('befor_page','fan' ));
          dispatch(actions.setVars('fc_info', value));
          dispatch(actions.setVars('showPage', 'fan_matrix'));
          dispatch(actions.setVars('fData', fData));

        },
        Tofaninfo1: (value,valueA,key)=> {
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('value', valueA));
            dispatch(actions.setVars('valueid', value));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('befor_page','fan' ));
                
            dispatch(actions.setVars('showPage', 'turning'));
            dispatch(actions.setVars('pagename', 'fan_matrix')); 
            dispatch(actions.setVars('numtype', 'faninfo'));     
        },
        Topvinfo1: (value,valueA,key)=> {
            console.log(value,valueA,key)
            // dispatch(actions.setVars('valuepage1', value));
            dispatch(actions.setVars('value', valueA));
            dispatch(actions.setVars('valueid', value));
            dispatch(actions.setVars('actbt1',key ));
            dispatch(actions.setVars('actbt',''));
            dispatch(actions.setVars('befor_page','fan' ));


            dispatch(actions.setVars('showPage', 'turning'));
            dispatch(actions.setVars('pagename', 'fan_matrix')); 
            dispatch(actions.setVars('numtype', 'pvinfo')); 
            
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

