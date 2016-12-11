import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './table.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';
let obj=require('../../../../../../config/MatrixData');

let nam=['TransformerStatus','AVC','AGC','PlanActPower','Capacity','TActPower','Transformer_P'];
let header=['场站名称','升压站状态', 'AVC状态','AGC状态','计划功率MW','装机容量MW','出力MW','负荷MW'];
// let obj_wfd = obj.ModelData[8888801].WFDevsStatus;
// let obj_pvd = obj.ModelData[8888802].PVDevsStatus;
//
// for(let x in obj_wfd){
//     arr1.push(x)
// }
// for(let m in obj_pvd){
//     arr2.push(m)
// }
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {table,changepage2,changepage3,model,tabaleData} = this.props;
        if(model&&tabaleData) {
            let arr1 = [];
            let arr2 = [];
            let data = tabaleData.ModelData;
            let mode = model.Model.ens;
            for (let i in mode){
                if(mode[i].wft=='Gf'){
                    arr1.push(i);
                }
                if(mode[i].wft=='Wf'){
                    arr2.push(i);
                }
            }
        return (
            <div>
                <div className={styles.actionBox}>
                    <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={refresh}/>
                </div>
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/header.length)+'%'}} key={key}>{value}</div>
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
                                             style={{width:(100/header.length)+'%',cursor:'pointer'}}
                                             key={key} onClick={()=>changepage3(value,key)}>{mode[value]['name']}</div>
                                        {
                                            nam.map((valueC, keyC)=> {
                                                if(keyC==0){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                               style={{width:(100/header.length)+'%'}}
                                                               key={keyC}><div className={data[value][valueC]/1?styles.succ:styles.defa}></div></div>
                                                    )
                                                }else if(keyC==1||keyC==2){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                             style={{width:(100/header.length)+'%'}}
                                                             key={keyC}><div className={data[value][valueC]=='#669999'?styles.succ:(data[value][valueC]=='#FF0000'?styles.defa:styles.cutD)}></div></div>
                                                    )
                                                }
                                                else{
                                                return (
                                                    <div className={styles.tableContentItem}
                                                           style={{width:(100/header.length)+'%'}}
                                                           key={keyC}>{data[value][valueC]*10%1==0?data[value][valueC]:(data[value][valueC]/1).toFixed(2)}</div>
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
                                     style={{width:(100/header.length)+'%',cursor:'pointer'}}
                                     key={key} onClick={()=>changepage2(value,key)}>{mode[value]['name']}</div>
                                {
                                nam.map((valueC, keyC)=> {
                                    if(keyC==0){
                                        return (
                                            <div className={styles.tableContentItem}
                                                 style={{width:(100/header.length)+'%'}}
                                                 key={keyC}><div className={data[value][valueC]?styles.succ:styles.defa}></div></div>
                                        )
                                    }else if(keyC==1||keyC==2){
                                        return (
                                            <div className={styles.tableContentItem}
                                                 style={{width:(100/header.length)+'%'}}
                                                 key={keyC}><div className={data[value][valueC]=='#669999'?styles.succ:(data[value][valueC]=='#FF0000'?styles.defa:styles.cutD)}></div></div>
                                        )
                                    }
                                    else{
                                        return (
                                            <div className={styles.tableContentItem}
                                                 style={{width:(100/header.length)+'%'}}
                                                 key={keyC}>{data[value][valueC]*10%1==0?data[value][valueC]:(data[value][valueC]/1).toFixed(2)}</div>
                                        )}
                                })
                            }
                            </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );}else {return(<div></div>)}
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (obj) => {
            dispatch(actions.setObjs('tableContent', obj));
        },
        changepage2:(value,key)=>{
            dispatch(actions.setVars('Changnav', 0));
            dispatch(actions.setVars('numpage', 'fanmatrix'));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('actbt1','' ));
            dispatch(actions.setVars('befor_page','tkgl' ));
            dispatch(actions.setVars('fc_info', value));
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'fan_matrix'));
        },
        changepage3:(value,key)=>{
            dispatch(actions.setVars('Changnav', 0));
            dispatch(actions.setVars('numpage', 'pvmatrix'));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage1', value));
            dispatch(actions.setVars('actbt1',key ));
            dispatch(actions.setVars('actbt',''));
            dispatch(actions.setVars('befor_page','tkgl' ));
            dispatch(actions.setVars('fc_info', value));
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'fan_matrix'));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
