import React from 'react';
import {connect} from 'react-redux';

import Block from './super/block.jsx';
import Title from './super/Title.jsx';
import Column from './chart/Column.jsx';
import Pie from './chart/Pie.jsx';
import Line from './chart/Line.jsx';
import styles from './Fan.scss';
import Login from '../../../../components/common/Loading.jsx';
import Superleftbox from './super/superleftbox.jsx';
import Unfilterfan from './xym/Unfilterfan.jsx';
import Filterfan from './xym/Filterfan.jsx';
import Filterpv from './xym/Filterpv.jsx';
// import dataBase from '../../../../../config/ModelData';
import matrix from '../../../../../config/MatrixModel';
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
        this.props.changedate();
    },
     componentWillUnmount() {
       clearInterval(time)
    },
    componentDidMount() {
        this.props.init();
    },
    
    render() {
        let {pageTo_1,pageTo_2,Tofaninfo1,Topvinfo1,zhzb,fModel,fData,fanbool=false,choosepage = 'unfilterfan'}=this.props;
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
                        {choosepage == 'unfilterfan' && <Unfilterfan></Unfilterfan>}  
                        {choosepage == 'filterfan' && <Filterfan></Filterfan>}
                        {choosepage == 'filterpv' && <Filterpv></Filterpv>}
                    
                
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
            choosepage: state.vars.choosepage,   
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedate: () => {
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
                               console.log(1) 
                            }
                        }
                    // }
                // }
            },2000)
            
        },
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

