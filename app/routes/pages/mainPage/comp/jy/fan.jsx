import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './table.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';
let tabaleData = require('../../../../../../config/RegulationData');
let model=require('../../../../../../config/RegulationModel');
let obj=require('../../../../../../config/MatrixData');
let data=tabaleData.ModelData;
let mode=model.Model.ens;
let nam=['TransformerStatus','AVC','AGC','PlanActPower','Capacity','TActPower','Transformer_P'];
let header=['发电机转速','发电机定子U组烧组温度','发电机定子V组烧组温度','发电机定子W组烧组温度','发电机转子烧组温度1','发电机转子烧组温度2','发电机转子烧组温度3','发电机驱动端轴承温度','发电机非驱动端轴承温度','发电机冷却空气(水)入口温度','发电机滑环温度','A相电压','B相电压','C相电压','A相电流','B相电流','C相电流'];
let content=['发电机超速','有功功率超限','发电机烧组1过热','过大压','发电机烧组温度高','风机转子转速与发电机转速不一致','发电机烧组2过热','低电压','发电机轴承温度高','发电机碳刷磨损','发电机烧组3过热','功率低','变频不同步','风机转子旋转方向错误','发电机转速突变','相电压瞬时过高'];
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
let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    render() {
        let {table,changepage2,changepage3} = this.props;
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
                                             style={{width:(100/header.length)+'%'}}
                                             key={key} onClick={()=>changepage2(value,key)}>{mode[value]['name']}</div>
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
                    </div>
                </div>
            </div>
        );
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
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('numpage', 'fanmatrix'));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('actbt1','' ));
        },
        changepage3:(value,key)=>{
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('numpage', 'pvmatrix'));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage1', value));
            dispatch(actions.setVars('actbt1',key ));
            dispatch(actions.setVars('actbt',''));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
