import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var {getState} = require('../../../../redux/store');
import _ from 'lodash';
import styles from  './Tkgl.scss';
var $ = require('jquery');
import Column from './tkgl/Column.jsx';
import Table from './tkgl/table.jsx';
import succ from '../img/icon/jyOn.png';
import defa from '../img/icon/jyOff.png';
import Login from '../../../../components/common/Loading.jsx';
let tabaleData = require('../../../../../config/RegulationData');
let model=require('../../../../../config/RegulationModel');
let obj=require('../../../../../config/MatrixData');
let data=tabaleData.ModelData;
let mode=model.Model.ens;
let nam=['AVC','AGC','PlanActPower','TActPower'];
let header=['场站名称', '有功自动控制','无功自动控制','计划值','出力'];
let time;

let Component = React.createClass({
    componentWillMount() {
        this.props.changedate();
    },
    componentWillUnmount() {
        clearInterval(time)
    },
    componentDidMount() {
        this.props.init(data);
    },
    render() {
        let {change,change1,table,openAGC,closeAGC,changeTableItem,jyname,jydata,booltkgl=false} = this.props;
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
                <div className={styles.tkglBox}>
                    <span className={styles.mw}>(MW)</span><span onClick={openAGC} className={styles.agc}>AGC调节</span>
                    <div className={styles.tableBox} id="AGC">
                        <div className={styles.tableHeaderBox}>
                            {
                                header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:1000/header.length}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                arr1.map((value, key)=> {
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <div className={styles.tableContentItem}
                                                 style={{width:1000/header.length}}
                                                 key={key} onClick={()=>changepage2(value,key)}>{mode[value]['name']}</div>
                                            {
                                                nam.map((valueC, keyC)=> {
                                                    if(keyC<2){
                                                        return (
                                                            <div className={styles.tableContentItem} onClick={(e)=>change(key,keyC)}
                                                                 style={{width:1000/header.length}} key={keyC}>
                                                                <img src={data[value][valueC]!=='#669999'?succ:defa} className={styles.turn}/>
                                                                <img src={data[value][valueC]=='#669999'?succ:defa} className={styles.turn}
                                                                     id={"jy"+key+keyC}/>
                                                            </div>
                                                        )
                                                    }
                                                    else{
                                                        keyC==2?plan+=(data[value][valueC]/1):power+=(data[value][valueC]/1);
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:1000/header.length}} key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,value,valueC)}
                                                                   value={data[value][valueC]*10%1==0?data[value][valueC]:(data[value][valueC]/1).toFixed(2)}/>
                                                        )}
                                                })
                                            }
                                        </div>
                                    )
                                })}
                            {
                                arr2.map((value, key)=> {
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <div className={styles.tableContentItem}
                                                 style={{width:1000/header.length}}
                                                 key={key} onClick={()=>changepage3(value,key)}>{mode[value]['name']}</div>
                                            {
                                                nam.map((valueC, keyC)=> {
                                                    if(keyC<2){
                                                        return (
                                                            <div className={styles.tableContentItem} onClick={(e)=>change1(key,keyC)}
                                                                 style={{width:1000/header.length}} key={keyC}>
                                                                <img src={data[value][valueC]!=='#669999'?succ:defa} className={styles.turn}/>
                                                                <img src={data[value][valueC]=='#669999'?succ:defa} className={styles.turn}
                                                                     id={"jd"+key+keyC}/>
                                                            </div>
                                                        )
                                                    }
                                                    else{
                                                        keyC==2?plan+=(data[value][valueC]/1):power+=(data[value][valueC]/1);
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:1000/header.length}} key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,value,valueC)}
                                                                   value={data[value][valueC]*10%1==0?data[value][valueC]:(data[value][valueC]/1).toFixed(2)}/>
                                                        )}
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                            <div className={arr2.length%2===0? styles.tableContentLine : styles.tableContentLine1}>
                                <div className={styles.tableContentItem}
                                     style={{width:2000/header.length}}>
                                    <button className={styles.close} onClick={closeAGC}>确定</button>
                                </div>
                                {
                                    nam.map((valueC, keyC)=> {
                                        if(keyC==0){
                                            return (
                                                <div className={styles.tableContentItem} style={{width:1000/header.length}} key={keyC}>合计</div>
                                            )
                                        }else if(keyC<3){
                                            keyC==1? allC=plan : allC=power;
                                            return (
                                                <div className={styles.tableContentItem}
                                                     style={{width:1000/header.length}} key={keyC}>
                                                    {allC.toFixed(2)}
                                                </div>
                                            )}
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.columnTitle}></div>
                    <div className={styles.upBox}>
                        <Column model={jyname} tabaleData={jydata}></Column>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedate:()=>{
            time=setInterval(function(){
                //     console.log('刷新')

                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "RegulationOverview", setDatas, "Screen", 0);
                function setDatas(rdata){
                    dispatch(actions.setVars('jyname', rdata));
                    TY.getRtData("RegulationOverview", 8888800, setfData)
                    function setfData(rdata){
                        dispatch(actions.setVars('jydata', rdata));
                        dispatch(actions.setVars('booltkgl', true));

                    }
                }


            },2000)
        },
        init: (obj) => {
            dispatch(actions.setObjs('tableContent', obj));
        },
        openAGC: () => {
            $('#AGC').css('display','block');
        },
        closeAGC: () => {
            $('#AGC').css('display','none');
        },
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        change:(i,j)=>{
            document.getElementById("jy"+i+j).style.display=='none'?
                document.getElementById("jy"+i+j).style.display='block':
                document.getElementById("jy"+i+j).style.display='none';
        },
        change1:(i,j)=>{
            document.getElementById("jd"+i+j).style.display=='none'?
                document.getElementById("jd"+i+j).style.display='block':
                document.getElementById("jd"+i+j).style.display='none';
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
