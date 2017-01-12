import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './table.scss';
var {getState} = require('redux/store');

import save from '../../../img/comp/save.png';
import refresh from '../../../img/comp/refresh.png';

let nam=['Capacity','AGCState','StatusCode','AGCActPower','Transformer_P','AVCState','StatusCode','AVCGoalValue','Transformer_Q'];
let header=['场站名称','装机容量MW','AGC系统','AVC系统'];
let headerSize=[14,14,36,36];
let contentSize=[14,9,9,9,9,9,9,9,9];
let agc=['AGC状态','有功自动状态','有功计划值','上网有功负荷'];
let avc=['AVC状态','无功自动状态','无功计划值','上网无功负荷'];
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {table,changepage2,changepage3,model,tabaleData,skinStyle} = this.props;
        if(model!= null &&tabaleData != null) {
            let arr1 = [];
            let arr2 = [];
            let arrAll=[];
            let mutable;
            let data = tabaleData.ModelData;
            let mode = model.Model.ens;
            for (let i in mode){
                if(mode[i].wft=='Gf'){
                    arr1.push(i);
                }else if(mode[i].wft=='Wf'){
                    arr2.push(i);
                    arrAll.push(mode[i]);
                }else{
                    arrAll.push(mode[i]);
                }
            }
            if (data[150801]){
        return (
            <div>
                <div className={styles.actionBox}>
                    <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={refresh}/>
                </div>
                <div className={skinStyle==1?styles.tableBoxBlue:skinStyle==2?styles.tableBoxWhite:styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            header.map((value, key)=> {
                                if (key==2){
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:headerSize[key]+'%'}} key={key}>
                                            <div className={styles.tableHeaderAGCItem}
                                                 style={{width:100+'%'}}>{value}</div>
                                            {
                                                agc.map((valueC,keyC)=>{
                                                    return(
                                                        <div className={styles.tableAGCItem} key={keyC}
                                                             style={{width:(100/agc.length)+'%'}}>{valueC}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }else if(key==3){
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:headerSize[key]+'%'}} key={key}>
                                            <div className={styles.tableHeaderAGCItem}
                                                 style={{width:100+'%'}}>{value}</div>
                                            {
                                                avc.map((valueC,keyC)=>{
                                                    return(
                                                        <div className={styles.tableAGCItem} key={keyC}
                                                             style={{width:(100/avc.length)+'%'}}>{valueC}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }else {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:headerSize[key]+'%'}} key={key}>{value}</div>
                                )}
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            arr1.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        <div className={styles.tableContentItem}
                                             style={{width:'14%',cursor:'pointer'}}
                                             key={key} onClick={()=>changepage3(value,key)}>{mode[value]['name']}</div>
                                        {
                                            nam.map((valueC, keyC)=> {
                                                if(keyC>5){
                                                    arrAll.map((valueD,keyD)=>{
                                                        ((valueD.pid == value) && (valueD.det=='AVC')) && (mutable=valueD.cis);
                                                    });
                                                    if(keyC==6){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                             style={{width:contentSize[keyC]+'%'}}
                                                             key={keyC}><div className={data[mutable]?(data[mutable][valueC]=='#669999'?styles.succ:(data[mutable][valueC]=='#FF0000'?styles.defa:styles.cutD)):styles.cutD}></div></div>
                                                    )}else {
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                 style={{width:contentSize[keyC]+'%'}}
                                                                 key={keyC}>{(data[mutable]&&data[mutable][valueC])?data[mutable][valueC]:'--'}</div>
                                                        )
                                                    }
                                                }else if(keyC==4){
                                                    arrAll.map((valueD,keyD)=>{
                                                        ((valueD.pid == value) && (valueD.det=="TransSubstation")) && (mutable=valueD.cis);
                                                    });
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                             style={{width:contentSize[keyC]+'%'}}
                                                             key={keyC}>{(data[mutable]&&data[mutable][valueC])?data[mutable][valueC]:'--'}</div>
                                                    )
                                                }else if(keyC==0){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                             style={{width:contentSize[keyC]+'%'}}
                                                             key={keyC}>{(data[value]&&data[value][valueC])?data[value][valueC]:'--'}</div>
                                                    )
                                                }else{
                                                    arrAll.map((valueD,keyD)=>{
                                                        ((valueD.pid == value) && (valueD.det=="EnergyManager")) && (mutable=valueD.cis);
                                                    });
                                                    if(keyC==3){
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                 style={{width:contentSize[keyC]+'%'}}
                                                                 key={keyC}>{(data[mutable]&&data[mutable][valueC])?data[mutable][valueC]:'--'}</div>
                                                        )
                                                    }else{
                                                        return(
                                                            <div className={styles.tableContentItem}
                                                                 style={{width:contentSize[keyC]+'%'}}
                                                                 key={keyC}><div className={data[mutable]?(data[mutable][valueC]=='#669999'?styles.succ:(data[mutable][valueC]=='#FF0000'?styles.defa:styles.cutD)):styles.cutD}></div></div>
                                                        )
                                                    }
                                                }

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
                                     style={{width:14+'%',cursor:'pointer'}}
                                     key={key} onClick={()=>changepage2(value,key)}>{mode[value]['name']}</div>
                                {
                                    nam.map((valueC, keyC)=> {
                                        if(keyC>5){
                                            arrAll.map((valueD,keyD)=>{
                                                ((valueD.pid == value) && (valueD.det=='AVC')) && (mutable=valueD.cis);
                                            });
                                            if(keyC==6){
                                                return (
                                                    <div className={styles.tableContentItem}
                                                         style={{width:contentSize[keyC]+'%'}}
                                                         key={keyC}><div className={data[mutable]?(data[mutable][valueC]=='#669999'?styles.succ:(data[mutable][valueC]=='#FF0000'?styles.defa:styles.cutD)):styles.cutD}></div></div>
                                                )}else {
                                                return (
                                                    <div className={styles.tableContentItem}
                                                         style={{width:contentSize[keyC]+'%'}}
                                                         key={keyC}>{(data[mutable]&&data[mutable][valueC])?data[mutable][valueC]:'--'}</div>
                                                )
                                            }
                                        }else if(keyC==4){
                                            arrAll.map((valueD,keyD)=>{
                                                ((valueD.pid == value) && (valueD.det=="TransSubstation")) && (mutable=valueD.cis);
                                            });
                                            return (
                                                <div className={styles.tableContentItem}
                                                     style={{width:contentSize[keyC]+'%'}}
                                                     key={keyC}>{(data[mutable]&&data[mutable][valueC])?data[mutable][valueC]:'--'}</div>
                                            )
                                        }else if(keyC==0){
                                            return (
                                                <div className={styles.tableContentItem}
                                                     style={{width:contentSize[keyC]+'%'}}
                                                     key={keyC}>{(data[value]&&data[value][valueC])?data[value][valueC]:'--'}</div>
                                            )
                                        }else{
                                            arrAll.map((valueD,keyD)=>{
                                                ((valueD.pid == value) && (valueD.det=="EnergyManager")) && (mutable=valueD.cis);
                                            });
                                            if(keyC==3){
                                                return (
                                                    <div className={styles.tableContentItem}
                                                         style={{width:contentSize[keyC]+'%'}}
                                                         key={keyC}>{(data[mutable]&&data[mutable][valueC])?data[mutable][valueC]:'--'}</div>
                                                )
                                            }else{
                                                return(
                                                    <div className={styles.tableContentItem}
                                                         style={{width:contentSize[keyC]+'%'}}
                                                         key={keyC}><div className={data[mutable]?(data[mutable][valueC]=='#669999'?styles.succ:(data[mutable][valueC]=='#FF0000'?styles.defa:styles.cutD)):styles.cutD}></div></div>
                                                )
                                            }
                                        }

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
    }else {return(<div></div>)}
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
        skinStyle: state.vars.skinStyle
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
