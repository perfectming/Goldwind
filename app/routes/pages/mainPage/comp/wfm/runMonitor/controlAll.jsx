import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var {getState} = require('../../../../../../redux/store');
import _ from 'lodash';
import styles from  './controlAll.scss';
var $ = require('jquery');
import Column from './Column.jsx';
import Table from './table.jsx';
import succ from '../../../img/icon/jyOn.png';
import defa from '../../../img/icon/jyOff.png';
import Login from '../../../../../../components/common/Loading.jsx';
let tabaleData = require('../../../../../../../config/RegulationData');
let model=require('../../../../../../../config/RegulationModel');
let obj=require('../../../../../../../config/MatrixData');
let data=tabaleData.ModelData;
let mode=model.Model.ens;
let nam=['AVC','AGC','PlanActPower','TActPower'];
let header=['场站名称', '有功自动控制','无功自动控制','有功计划值','出力'];
let time;
let onceTime;

let Component = React.createClass({
    componentWillMount() {
        let{booltkgl}=this.props;
        this.props.changedate(booltkgl);
    },
    componentWillUnmount() {
        clearInterval(time);
        clearTimeout(onceTime);
    },
    componentDidMount() {
        this.props.init(data);
    },
    render() {
        let {table,changeTableItem,jyname,jydata,booltkgl=false,skinStyle} = this.props;
        if(booltkgl){
            let arr1 = [];
            let arr2 = [];
            let obj_wfd = obj.ModelData[8888801].WFDevsStatus;
            let obj_pvd = obj.ModelData[8888802].PVDevsStatus;
            for(let x in obj_wfd){
                arr1.push(x)
            }
            for(let m in obj_pvd){
                arr2.push(m)
            }
            let plan=0,power=0,allC=0;
            return (
                <div className={skinStyle==1?styles.tkglBoxBlue:skinStyle==2?styles.tkglBoxWhite:styles.tkglBox}>
                    <span className={styles.mw}>(MW)</span>
                    <div className={styles.upBox}>
                        <Column model={jyname} tabaleData={jydata} lettercolor={"#555555"}></Column>
                    </div>
                    <div className={styles.downBox}>
                        <Table model={jyname} tabaleData={jydata}></Table>
                    </div>
                </div>
            );
        }else{
            return(
                <Login></Login>
            )
        }
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.vars.tableContent,
        jyname: state.vars.jyname,
        jydata: state.vars.jydata,
        booltkgl: state.vars.booltkgl,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedate:(booltkgl)=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "RegulationOverview", setDatas, "Screen", 0);
            function setDatas(rdata){
                dispatch(actions.setVars('jyname', rdata));
                TY.getRtData("RegulationOverview", 8888800, setfData)
                function setfData(rdata1){
                    dispatch(actions.setVars('jydata', rdata1));
                    setTimeout(function () {
                        dispatch(actions.setVars('booltkgl', true));
                        clearTimeout(onceTime);
                    },100)
                }
            }
            time=setInterval(function(){
                TY.getRtData("RegulationOverview", 8888800, setfData);
                function setfData(rdata1){
                    dispatch(actions.setVars('jydata', rdata1));
                }
            },2000);
            onceTime=setTimeout(function(){
                alert('数据获取失败！请重新登入');
                browserHistory.push('/app/all/page/login');
                dispatch(actions.setVars('userInfo', false));
            },7000)
        },
        init: (obj) => {
            dispatch(actions.setObjs('tableContent', obj));
        },

        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
