import React from 'react';
import {connect} from 'react-redux';
import styles from './Fan.scss';

import Login from '../../../../components/common/Loading.jsx';
import Superleftbox from './super/superleftbox.jsx';    // 左侧组件
import Unfilterfan from './xym/Unfilterfan.jsx';    //右侧组件

import Filterfan from './xym/Filterfan.jsx';
import Filterpv from './xym/Filterpv.jsx';
// import dataBase from '../../../../../config/ModelData';
// import matrix from '../../../../../config/MatrixModel';
var actions = require('redux/actions');
var { Router, Route, browserHistory} = require('react-router');
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
//     var obj_wfd = obj.ModelData[8888801].WFDevsStatus;
//     var obj_pvd = obj.ModelData[8888802].PVDevsStatus;


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


let time;
let Component = React.createClass({
    componentWillMount() {
        this.props.getfanpvdata(); // 获取该页面数据
    },
     componentWillUnmount() {
       clearInterval(time)  // 离开页面清除定时器
    },
    componentDidMount() {
        this.props.init();
    },
    
    render() {
        let {zhzb,fModel,fData,fanbool=false}=this.props;
        // console.log(fModel);
        // console.log(fData);
        // console.log(zhzb);
        if(fanbool){
        let model_ens = zhzb.Model.ens;
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

            <div className={styles.bodyBox}>

                <div className={styles.leftBox}>
                    <Superleftbox></Superleftbox>
                </div>
                <div className={styles.listrightBox}>
                    <div className={styles.listbodyBox1}>
                        <Unfilterfan></Unfilterfan> 
                        
                    
                
                    </div>
                </div>
            </div>
        );
        }else{
        return (
            <Login></Login>
        )
        }
    }
});


const mapStateToProps = (state) => {
    return {   
            zhzb: state.vars.zhzb,
            // bbs: state.vars.bbs,
            fModel: state.vars.fModel,
            fData: state.vars.fData,    
            fanbool: state.vars.fanbool,   
            // choosepage: state.vars.choosepage,   
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getfanpvdata: () => {
            // time = setInterval(function(){
                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
                function setData(rdata){
                    dispatch(actions.setVars('zhzb', rdata));
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DevicesMatrix", setDatas, "Screen", 0);
                    function setDatas(rdata){
                        dispatch(actions.setVars('fModel', rdata));
                        TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(rdata){
                            TY.getRtData("DevicesMatrix", 8888800, setfData1)
                            function setfData1(rdata){
                                dispatch(actions.setVars('fData', rdata));
                                setTimeout(function(){
                                    dispatch(actions.setVars('fanbool', true));
                                },500)
                                
                            }
                        }
                    }
                }
            // },3000)
            time = setInterval(function(){
                // TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
                // function setData(rdata){
                //     dispatch(actions.setVars('zhzb', rdata));
                //     TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DevicesMatrix", setDatas, "Screen", 0);
                //     function setDatas(rdata){
                //         dispatch(actions.setVars('fModel', rdata));
                        TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(rdata){
                            dispatch(actions.setVars('fData', rdata));

                            TY.getRtData("DataOverview", 8888800, setfData1)

                            function setfData1(rdata){
                                
                                // setTimeout(function(){
                                    dispatch(actions.setVars('bbs', rdata));
                                // },100)
                               // console.log(1) 
                            }
                        }
                    // }
                // }
            },3000)
            
        },
        init: () => {
            
        },

        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

