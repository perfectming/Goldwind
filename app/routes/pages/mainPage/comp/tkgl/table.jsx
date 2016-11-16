import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './table.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';
let tabaleData = require('../../../../../../config/RegulationData');
let model=require('../../../../../../config/Model');
let data=tabaleData.ModelData;
let mode=model.Model.ens;
let nam=['name','TransformerStatus','AVC','AGC','PlanActPower','Capacity','Transformer_P'];
let header=['场站名称','升压站状态', 'AVC状态','AGC状态','计划功率MW','装机容量MW','负荷MW'];
let narr=[];
let num=[];
for(let key in data){
    num.push(key);
}
num.pop();
for(let j=0;j<num.length;j++){
    let arr=[];
    for(let i=0;i<nam.length;i++){
        if(i==0){
            arr.push(mode[num[j]][nam[0]]);
        }else{
            arr.push(data[num[j]][nam[i]])
        }
    }
    narr.push(arr);
}
let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    render() {
        let {table} = this.props;
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
                            narr.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                if(keyC==1){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                               style={{width:(100/header.length)+'%'}}
                                                               key={keyC}><div className={valueC?styles.succ:styles.defa}></div></div>
                                                    )
                                                }else if(keyC==2||keyC==3){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                             style={{width:(100/header.length)+'%'}}
                                                             key={keyC}><div className={valueC=='#669999'?styles.succ:(valueC=='#FF0000'?styles.defa:styles.cutD)}></div></div>
                                                    )
                                                }
                                                else{
                                                return (
                                                    <div className={styles.tableContentItem}
                                                           style={{width:(100/header.length)+'%'}}
                                                           key={keyC}>{valueC}</div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
