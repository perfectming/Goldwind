import React from 'react';
import {connect} from 'react-redux';
import styles from './Fan.scss';

import Login from '../../../../../../../components/common/Loading.jsx';
import Superleftbox from '../superleftbox.jsx';    // 左侧组件
import Unfilterfan from './Unfilterfan.jsx';    //右侧组件

var actions = require('redux/actions');
let mobdNum = require('../../../urlData.js');
let mobdZero = mobdNum.mobdZero/1;
let mobdOne = mobdNum.mobdOne/1;
let mobdTwo = mobdNum.mobdTwo/1;

let fan_time; // 该页面定时器
let Component = React.createClass({
    componentWillMount() {
        this.props.getfanpvdata(); // 获取该页面数据方法
    },
     componentWillUnmount() {
       clearInterval(fan_time)  // 离开页面清除定时器
    },
    componentDidMount() {
        this.props.init();
    },
    
    render() {
        let {zhzb,fModel,fData,fanbool=false}=this.props;
        // fModel:风机光伏矩阵模型, fData:风机光伏矩阵数据。fanbool：页面挂载控制
        if(fanbool){
        let model_ens = zhzb.Model.ens;
        let obj_wfd = fData.ModelData[mobdOne].WFDevsStatus;
        let obj_pvd = fData.ModelData[mobdTwo].PVDevsStatus;
        let arr1 = []; // 接收风场集合
        let arr2 = []; // 接收光伏场集合
        for(var i in obj_wfd){
            arr1.push(i);
        }
        for(var j in obj_pvd){
            arr2.push(j);
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
                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DataOverview", setData, "Screen", 0);
                function setData(leftData){
                    if(leftData.Model == undefined){
                        TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DataOverview", setData, "Screen", 0);
                    }else{
                        dispatch(actions.setVars('zhzb', leftData));
                        TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DevicesMatrix", setDatas, "Screen", 0);
                        function setDatas(MatrixModel){
                            if(MatrixModel.Model == undefined){
                                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DevicesMatrix", setDatas, "Screen", 0);
                            }else{
                                dispatch(actions.setVars('fModel', MatrixModel));
                                TY.getRtData("DevicesMatrix", mobdZero, setfDatas)
                                function setfDatas(MatrixData){
                                    if(MatrixData.ModelData == undefined){
                                        TY.getRtData("DevicesMatrix", mobdZero, setfDatas)
                                    }else{
                                        dispatch(actions.setVars('fData', MatrixData));
                                        setTimeout(function(){
                                            dispatch(actions.setVars('fanbool', true));
                                        },200)
                                    }


                                }
                            }
                        }
                    }

                }
            // },3000)
            fan_time = setInterval(function(){
                // TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DataOverview", setData, "Screen", 0);
                // function setData(rdata){
                //     dispatch(actions.setVars('zhzb', rdata));
                //     TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", mobdZero, "DevicesMatrix", setDatas, "Screen", 0);
                //     function setDatas(rdata){
                //         dispatch(actions.setVars('fModel', rdata));
                        TY.getRtData("DevicesMatrix", mobdZero, setfData);
                        function setfData(rdata){
                            rdata.ModelData && dispatch(actions.setVars('fData', rdata));

                            TY.getRtData("DataOverview", mobdZero, setfDatas);

                            function setfDatas(rdata){
                                
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

