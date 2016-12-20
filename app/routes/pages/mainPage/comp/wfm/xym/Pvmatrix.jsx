import React from 'react';
import {connect} from 'react-redux';
import Corner from '../super/Corner.jsx';
import styles from './Pvmatrix.scss';
var actions = require('redux/actions');
// import dataBase from '../../../../../config/ModelData';



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
         let{valuepage1,Topvinfo,zhzb,fModel,fData}=this.props;
        // let model_ens = zhzb.Model.ens;
        let obj_wfd = fData.ModelData[8888801].WFDevsStatus;
        let obj_pvd = fData.ModelData[8888802].PVDevsStatus;
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
                                x = "正常发电";
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
                 
                        return (
                        <div className={`${styles.slistBox} ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.online : (code === "Alarm" ? styles.online : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={key} onClick = {()=> Topvinfo(value, valuepage1)}>
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
                    
                    
                        
                })
                }
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        valuepage1 : state.vars.valuepage1,
        zhzb : state.vars.zhzb,
        fModel : state.vars.fModel,
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
        Topvinfo: (value,valuepage1)=> {
    
            dispatch(actions.setVars('value', value));
            dispatch(actions.setVars('valueid', valuepage1));
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('fan_page', 'pvinfo')); 
            dispatch(actions.setVars('befor_page2', 'allpage'));
            
            // dispatch(actions.setVars('fan_page', 'pvinfo'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
