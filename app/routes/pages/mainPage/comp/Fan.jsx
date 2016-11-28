import React from 'react';
import {connect} from 'react-redux';

import Block from './super/block.jsx';
import Title from './super/Title.jsx';
import Column from './chart/Column.jsx';
import Pie from './chart/Pie.jsx';
import Line from './chart/Line.jsx';
import styles from './Fan.scss';
import Superleftbox from './super/superleftbox.jsx';
// import dataBase from '../../../../../config/ModelData';
import matrix from '../../../../../config/MatrixModel';
var actions = require('redux/actions');
var { Router, Route, browserHistory} = require('react-router');
// let fanData = require('../../../../../config/fan-data');
let matrixdata = require('../../../../../config/MatrixData');
let model = require('../../../../../config/Model');
let modeldata = require('../../../../../config/ModelData');

        let data=modeldata.ModelData;
        let mod=model.Model;
        let  mat=matrix.Model;
        let matD=matrixdata.ModelData;

var model_data = modeldata.ModelData;

var arr3 = [];
var arr4 = [];
var model_ens = model.Model.ens;
for(var j in model_ens){
    arr3.push(model_ens[j])
}
// arr3.map((valueE,keyE)=> {
//     return (
//         console.log(valueE.name)
//         )
// });


 var arr1 = [];
 var arr2 = [];
 // var arr3 = [];
 // var arr4 = [];
 var obj = matrixdata;
    var obj_wfd = obj.ModelData[8888801].WFDevsStatus;
    var obj_pvd = obj.ModelData[8888802].PVDevsStatus;


    // console.log(obj_pvd);
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
    // console.log(arr2);
    // console.log(arr1);
    // console.log(arr2);
// arr2.map((valueZ, keyZ)=> {
//     console.log( )
// })



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {pageTo_1,pageTo_2,Tofaninfo1,Tofaninfo2}=this.props;
        return (
            <div className={styles.bodyBox}>
                <div className={styles.leftBox}>
                    <Superleftbox></Superleftbox>
                </div>
                <div className={styles.listrightBox}>
                    <div className={styles.listbodyBox1}>
                    <div>
                    {
                    arr1.map((value, key)=> {
                        return (
                            <div className={styles.listheaderBox} key={key}>
                                <button className={styles.listbtn} onClick={()=>pageTo_1(value,key)}>{model_ens[value].name}</button>
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
                                                        i = "正常发电";
                                                        break;
                                                    case "Alarm":
                                                        i = "正常发电";
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
                                                        i = "维护";
                                                        break;
                                                }
                                            return (
                                                
                                                    <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.online : (code === "Alarm" ? styles.online : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                        <div className={styles.listoptinfo}>
                                                            <span>{valueA.Wtname}</span>
                                                                <p>{'风速:'+Math.ceil(model_data[value].WindSpeed_DevAverValue/3600)+'m/s'}</p>
                                                                <p>{'功率:'+Number(model_data[value].TActPower).toFixed(2)+'KW'}</p>
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                        
                    })
                  
                    }
                    </div>
                    <div>
                    {
                    arr2.map((value, key)=> {
                        return (
                            <div className={styles.listheaderBox} key={key}>
                                <button className={styles.listbtn} onClick={()=>pageTo_2(value,key)}>{model_ens[value].name}</button>
                                <div className={styles.listopt}>
                                    {
                                        obj_pvd[value].map((valueA, keyA)=> {
                                            return (
                                                
                                                    <div className={styles.listoptbtn_3}  key={keyA} onClick = {()=> Tofaninfo2(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                        <div className={styles.listoptinfo}>
                                                            <span>{valueA.Wtname}</span>
                                                                <p>{'辐照度:'+Math.ceil(model_data[value].PVTSI_Aver)+'W/㎡'}</p>
                                                                <p>{'功率:'+Number(model_data[value].TActPower).toFixed(2)+'KW'}</p>
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                        
                    })
                  
                    }
                    </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {         
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        init: () => {
            var obj = {
                test:''
            }
        },
        pageTo_1:(value,key)=>{
          dispatch(actions.setVars('showPage', 'fan_matrix'));
          dispatch(actions.setVars('numpage', 'fanmatrix'));
          dispatch(actions.setVars('valuepage', value));
          dispatch(actions.setVars('actbt',key ));
          dispatch(actions.setVars('actbt1','' ));
          dispatch(actions.setVars('fan_page', 'allpage'));
          dispatch(actions.setVars('befor_page','fan' ));
        },
        pageTo_2:(value,key)=>{
          dispatch(actions.setVars('showPage', 'fan_matrix'));
          dispatch(actions.setVars('numpage', 'pvmatrix'));
          dispatch(actions.setVars('valuepage1', value));
          dispatch(actions.setVars('actbt1',key ));
          dispatch(actions.setVars('actbt',''));
          dispatch(actions.setVars('fan_page', 'allpage'));
          dispatch(actions.setVars('befor_page','fan' ));
        },
        Tofaninfo1: (value,valueA,key)=> {
            dispatch(actions.setVars('value', valueA));
            dispatch(actions.setVars('valueid', value));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('fan_page', 'faninfo'));
            dispatch(actions.setVars('befor_page','fan' ));
        },
        Tofaninfo2: (value,valueA,key)=> {
            dispatch(actions.setVars('value', valueA));
            dispatch(actions.setVars('valueid', value));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('fan_page', 'faninfo'));
            dispatch(actions.setVars('befor_page','fan' ));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
