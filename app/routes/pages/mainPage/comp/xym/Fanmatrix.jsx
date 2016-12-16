import React from 'react';
import {connect} from 'react-redux';
import Corner from '../super/Corner.jsx';
// import fmatrix from '../../img/comp/fmatrix.png';
import styles from './Fanmatrix.scss';
import fan_matrix from '../linjinjin/Fan_matrix.jsx';
var actions = require('redux/actions');
// import dataBase from '../../../../../config/ModelData';
// let matrixdata = require('../../../../../../config/MatrixData');
// let model = require('../../../../../../config/Model');
// let modeldata = require('../../../../../../config/ModelData');

       

// var model_data = modeldata.ModelData;
// // console.log(model_data);
// var arrdata = model_data[650107].WindSpeed_DevAverValue;

// var arr3 = [];
// var arr4 = [];
// var model_ens = model.Model.ens;
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
//     var obj_wfd = obj.ModelData[8888801].WFDevsStatus;
//     var obj_pvd = obj.ModelData[8888802].PVDevsStatus;


//     // console.log(obj_wfd);
//     for(var x in obj_wfd){
//         arr1.push(x)
//         // for(var y in obj_wfd[x]){
//         //     arr2.push(obj_wfd[x][y])
//         // }
//     }
//     for(var m in obj_pvd){
//         arr2.push(m)
//         // for(var n in obj_wfd[m]){
//         //     arr2.push(obj_wfd[m][n])
//         // }
//     }
//     // console.log(arr1);
//     // console.log(arr2);
// // arr1.map((valueZ, keyZ)=> {
// //     // console.log(valueZ)
// // })  



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{valuepage,Tofaninfo,zhzb,fData,fModel}=this.props;
        // console.log(fData);
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
        // console.log(arr1,arr2)
        
        return (
            <div className={styles.listbodyBox}>
                {
                obj_wfd[valuepage].map((value, key)=> {
                    // let bordercolor = value.WTStateColor;
                    let x;
                    let code = value.WTStateCode;
                    // console.log(code);
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
                                x = "限功率";
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
                        <div className={`${styles.listBox} ${value.WTStateColor == "#c7b88c" ? styles.repair : styles.default}  ${code == "DisComForPre" ? styles.discomfor : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.discomfor : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.offline : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={key} onClick = {()=> Tofaninfo(value,valuepage)}>
                           
                            <div className={styles.listitemR}>
                                <span className={styles.listitemT}>
                                        <p className={styles.listitemTT}>{value.Wtname}</p>
                                        <p className={styles.listitemTB}>{x}</p>
                                </span>
                                <span className={styles.listitemB}>
                                    <span className={styles.listitemBL}>
                                        <p>风速:</p>
                                        <p><span className={styles.listitemBLL}>{Number(value.WindSpeed).toFixed(2)}</span><span className={styles.listitemBLR}>m/s</span></p>
                                    </span>
                                    <span className={styles.listitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.listitemBLL}>{Number(value.ActPwr).toFixed(2)}</span><span className={styles.listitemBLR}>KW</span></p>
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
        valuepage : state.vars.valuepage,
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
        Tofaninfo: (value,valuepage)=> {
            dispatch(actions.setVars('value', value));
            dispatch(actions.setVars('valueid', valuepage));
            

            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('fan_page', 'faninfo')); 
            dispatch(actions.setVars('faninfobool', false));
            dispatch(actions.setVars('befor_page2', 'allpage')); 
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
