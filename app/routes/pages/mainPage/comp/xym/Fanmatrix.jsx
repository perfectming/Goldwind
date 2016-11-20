import React from 'react';
import {connect} from 'react-redux';
import Corner from '../super/Corner.jsx';
import fmatrix from '../../img/comp/fmatrix.png';
import styles from './Fanmatrix.scss';
// import dataBase from '../../../../../config/ModelData';
let matrixdata = require('../../../../../../config/MatrixData');
let model = require('../../../../../../config/Model');
let modeldata = require('../../../../../../config/ModelData');

       

var model_data = modeldata.ModelData;
console.log(model_data);
var arrdata = model_data[valuepage].WindSpeed_DevAverValue;

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


    // console.log(obj_wfd);
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
        let{valuepage=650107}=this.props;
        return (
            <div className={styles.listbodyBox}>
                {
                obj_wfd[valuepage].map((value, key)=> {
                    return (
                        <div className={styles.listBox} key={key}>
                            <div className={styles.listitemL}><img src={fmatrix}/>
                            </div>
                            <div className={styles.listitemR}>
                                <span className={styles.listitemT}>
                                        <p className={styles.listitemTT}>{value.Wtname}</p>
                                        <p className={styles.listitemTB}>正常发电</p>
                                </span>
                                <span className={styles.listitemB}>
                                    <span className={styles.listitemBL}>
                                        <p>风速:</p>
                                        <p><span className={styles.listitemBLL}>{Math.ceil(model_data[650123].WindSpeed_DevAverValue/3600)}</span><span className={styles.listitemBLR}>m/s</span></p>
                                    </span>
                                    <span className={styles.listitemBR}>
                                        <p>功率:</p>
                                        <p><span className={styles.listitemBLL}>{Number(model_data[650123].WindSpeed_DevAverValue).toFixed(2)}</span><span className={styles.listitemBLR}>KW</span></p>
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
