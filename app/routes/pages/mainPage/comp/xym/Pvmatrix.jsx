import React from 'react';
import {connect} from 'react-redux';
import Corner from '../super/Corner.jsx';
import smatrix from '../../img/comp/smatrix.png';
import styles from './Pvmatrix.scss';
var actions = require('redux/actions');
// import dataBase from '../../../../../config/ModelData';
let matrixdata = require('../../../../../../config/MatrixData');
let model = require('../../../../../../config/Model');
let modeldata = require('../../../../../../config/ModelData');

       

var model_data = modeldata.ModelData;
// console.log(model_data);
// var arrdata = model_data[650107].PVTSI_Aver;
// console.log(arrdata);
// var arr3 = [];
// var arr4 = [];
var model_ens = model.Model.ens;
// for(var j in model_ens){
//     arr3.push(model_ens[j])
// }
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


    // console.log(obj_pvd[652303]);
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
        let{valuepage1=652303,Tofaninfo,hiden}=this.props;
        return (
            <div className={styles.slistbodyBox}>
                {
                obj_pvd[valuepage1].map((value, key)=> {
                    return (
                        <div className={styles.slistBox} key={key} onClick = {()=> Tofaninfo(value, key)}>
                            <div className={styles.slistitemL}><img src={smatrix}/>
                            </div>
                            <div className={styles.slistitemR}>
                                <span className={styles.slistitemT}>
                                        <p className={styles.slistitemTT}>{value.Wtname}</p>
                                        <p className={styles.slistitemTB}>正常发电</p>
                                </span>
                                <span className={styles.slistitemB}>
                                    <span className={styles.slistitemBL}>
                                        <p>辐照度:</p>
                                        <p><span className={styles.slistitemBLL}>{Math.floor((model_data[valuepage1].PVTSI_Aver))}</span><span className={styles.slistitemBLR}>W/㎡</span></p>
                                    </span>
                                    <span className={styles.slistitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.slistitemBLL}>{(Number(model_data[valuepage1].TActPower)/100).toFixed(2)}</span><span className={styles.slistitemBLR}>KW</span></p>
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
        hiden : state.vars.hiden,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        Tofaninfo: (value)=> {
            dispatch(actions.setVars('hiden', false));
            dispatch(actions.setVars('value', value));
            
            dispatch(actions.setVars('numpage', 'faninfo'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
