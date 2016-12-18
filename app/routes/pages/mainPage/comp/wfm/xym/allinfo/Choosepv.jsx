import React from 'react';
import {connect} from 'react-redux';
import styles from './Choosepv.scss';
var actions = require('redux/actions');
// import dataBase from '../../../../../config/ModelData';
let obj = require('../../../../../../../../config/MatrixData');
let model = require('../../../../../../../../config/Model');
let modeldata = require('../../../../../../../../config/ModelData');
var model_data = modeldata.ModelData;
var model_ens = model.Model.ens;
var arr1 = [];
var arr2 = [];
var obj_wfd = obj.ModelData[8888801].WFDevsStatus;
var obj_pvd = obj.ModelData[8888802].PVDevsStatus;
    for(var x in obj_wfd){
        arr1.push(x)
        // for(var y in obj_wfd[x]){
        //     arr2.push(obj_wfd[x][y])
        // }
    }
    for(var m in obj_pvd){
        arr2.push(m)
        // for(var n in obj_wfd[m]){
        //     arr2.push(obj_wfd[m][n])
        // }
    }
    // console.log(arr1);
    // console.log(arr2);
// arr1.map((valueZ, keyZ)=> {
//     // console.log(valueZ)
// })  



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{valuepage1,Topvinfo,choosefans1,fData}=this.props;
        let obj_pvd = fData.ModelData[8888802].PVDevsStatus;

        return (
            <div className={styles.slistbodyBox}>
                {
                obj_pvd[valuepage1].map((value, key)=> {
                    let x;
                    let code = value.WTStateCode;
                    switch(code)
                        {
                            case "DisComForPre":
                                x = "离线";
                                break;
                            case "DisComForPlc":
                                x = "离线";
                                break;
                            case "Unknown":
                                x = "离线";
                                break;
                            case "Online":
                                x = "正常发电";
                                break;
                            case "LimitPow":
                                x = "正常发电";
                                break;
                            case "Alarm":
                                x = "告警";
                                break;
                            case "Fault":
                                x = "故障停机";
                                break;
                            case "Offline":
                                x = "待机";
                                break;
                            case "ProtoectStop":
                                x = "待机";
                                break;
                            case "LimitPowStop":
                                x = "待机";
                                break;
                            default:
                                x = "维护";
                                break;
                        }
                    if(choosefans1 == "PVONL" && (code== "Online" || code== "LimitPow")){
                        return (
                        <div className={`${styles.slistBox} ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.discomfor : (code === "Alarm" ? styles.discomfor : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={key} onClick = {()=> Topvinfo(value, key)}>
                            <div className={styles.slistitemR}>
                                <span className={styles.slistitemT}>
                                        <p className={styles.slistitemTT}>{value.Wtname}</p>
                                        <p className={styles.slistitemTB}>{x}</p>
                                </span>
                                <span className={styles.slistitemB}>
                                    <span className={styles.slistitemBL}>
                                        <p>辐照度:</p>
                                        <p><span className={styles.slistitemBLL}>{value.PVTSI_Aver == undefined ? '--' : (Math.ceil(value.PVTSI_Aver)).toFixed(2)}</span><span className={styles.slistitemBLR}>W/㎡</span></p>
                                    </span>
                                    <span className={styles.slistitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.slistitemBLL}>{(Number(value.ActPwr)).toFixed(2)}</span><span className={styles.slistitemBLR}>KW</span></p>
                                    </span>
                                </span>
                            </div>          
                        </div>  
                        )
                    }else if(choosefans1 == "PVFLT" && code== "Fault"){
                        return (
                        <div className={`${styles.slistBox} ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.discomfor : (code === "Alarm" ? styles.discomfor : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={key} onClick = {()=> Topvinfo(value, key)}>
                            <div className={styles.slistitemR}>
                                <span className={styles.slistitemT}>
                                        <p className={styles.slistitemTT}>{value.Wtname}</p>
                                        <p className={styles.slistitemTB}>{x}</p>
                                </span>
                                <span className={styles.slistitemB}>
                                    <span className={styles.slistitemBL}>
                                        <p>辐照度:</p>
                                        <p><span className={styles.slistitemBLL}>{value.PVTSI_Aver == undefined ? '--' : (Math.ceil(value.PVTSI_Aver)).toFixed(2)}</span><span className={styles.slistitemBLR}>W/㎡</span></p>
                                    </span>
                                    <span className={styles.slistitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.slistitemBLL}>{(Number(value.ActPwr)).toFixed(2)}</span><span className={styles.slistitemBLR}>KW</span></p>
                                    </span>
                                </span>
                            </div>          
                        </div>  
                        )
                    }else if(choosefans1 == "PVOFL" && (code== "DisComForPre" || code== "Offline")){
                        return (
                        <div className={`${styles.slistBox} ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.discomfor : (code === "Alarm" ? styles.discomfor : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.offline : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={key} onClick = {()=> Topvinfo(value, key)}>
                            <div className={styles.slistitemR}>
                                <span className={styles.slistitemT}>
                                        <p className={styles.slistitemTT}>{value.Wtname}</p>
                                        <p className={styles.slistitemTB}>{x}</p>
                                </span>
                                <span className={styles.slistitemB}>
                                    <span className={styles.slistitemBL}>
                                        <p>辐照度:</p>
                                        <p><span className={styles.slistitemBLL}>{value.PVTSI_Aver == undefined ? '--' : (Math.ceil(value.PVTSI_Aver)).toFixed(2)}</span><span className={styles.slistitemBLR}>W/㎡</span></p>
                                    </span>
                                    <span className={styles.slistitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.slistitemBLL}>{(Number(value.ActPwr)).toFixed(2)}</span><span className={styles.slistitemBLR}>KW</span></p>
                                    </span>
                                </span>
                            </div>          
                        </div>  
                        )
                    }else if(choosefans1 == "PVOFL" && code== "DisComForPlc"){
                        return (
                        <div className={`${styles.slistBox} ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.discomfor : (code === "Alarm" ? styles.discomfor : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={key} onClick = {()=> Topvinfo(value, key)}>
                            <div className={styles.slistitemR}>
                                <span className={styles.slistitemT}>
                                        <p className={styles.slistitemTT}>{value.Wtname}</p>
                                        <p className={styles.slistitemTB}>{x}</p>
                                </span>
                                <span className={styles.slistitemB}>
                                    <span className={styles.slistitemBL}>
                                        <p>辐照度:</p>
                                        <p><span className={styles.slistitemBLL}>{value.PVTSI_Aver == undefined ? '--' : (Math.ceil(value.PVTSI_Aver)).toFixed(2)}</span><span className={styles.slistitemBLR}>W/㎡</span></p>
                                    </span>
                                    <span className={styles.slistitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.slistitemBLL}>{(Number(value.ActPwr)).toFixed(2)}</span><span className={styles.slistitemBLR}>KW</span></p>
                                    </span>
                                </span>
                            </div>          
                        </div>  
                        )
                    }else if(choosefans1 == "PVOFL" && code== "Unknown"){
                        return (
                        <div className={`${styles.slistBox} ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.discomfor : (code === "Alarm" ? styles.discomfor : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={key} onClick = {()=> Topvinfo(value, key)}>
                            <div className={styles.slistitemR}>
                                <span className={styles.slistitemT}>
                                        <p className={styles.slistitemTT}>{value.Wtname}</p>
                                        <p className={styles.slistitemTB}>{x}</p>
                                </span>
                                <span className={styles.slistitemB}>
                                    <span className={styles.slistitemBL}>
                                        <p>辐照度:</p>
                                        <p><span className={styles.slistitemBLL}>{value.PVTSI_Aver == undefined ? '--' : (Math.ceil(value.PVTSI_Aver)).toFixed(2)}</span><span className={styles.slistitemBLR}>W/㎡</span></p>
                                    </span>
                                    <span className={styles.slistitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.slistitemBLL}>{(Number(value.ActPwr)).toFixed(2)}</span><span className={styles.slistitemBLR}>KW</span></p>
                                    </span>
                                </span>
                            </div>          
                        </div>  
                        )
                    }
                    
                        
                })
                }
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        valuepage1 : state.vars.valuepage1,
        choosefans1 : state.vars.choosefans1,
        fData : state.vars.fData,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        Topvinfo: (value)=> {
            dispatch(actions.setVars('value', value));
            dispatch(actions.setVars('fan_page', 'pvinfo'));
            dispatch(actions.setVars('befor_page2', 'allpage'));
            dispatch(actions.setVars('npage', 'choosepv'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
