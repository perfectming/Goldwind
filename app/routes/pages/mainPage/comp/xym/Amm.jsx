import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './Amm.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import del from '../../img/icon/tabDel.png';
import add from '../../img/icon/tabAdd.png';
import _ from 'lodash';
import Ambox from '../jy/boxAm.jsx';
let tabaleData = require('./data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData.ammData);
    },
    buttonAction (){
        var tContent = this.refs.textContent5.value;
        alert(tContent);
        // 在这个下边获取这个时间段的数据就行了
        // 然后去更新图表
    },
    render() {
        let {deleData,addData,buttonAction, inputOnChange, onFocus,table, changeTableItem} = this.props;
        let newData=[];
        let num=0;
        for(let i=0;i<tabaleData.msData.header.length;i++){
            newData.push('');
        }
        let comp=tabaleData.comps.from;
        return (
        <div className={styles.bodyBox}>
            <div className={styles.roleputBox}>
                <div className={styles.inquireBox}>
                    {
                        comp.map((value, key,valueName)=> {
                            if (key == 5) {
                                return (
                                    <div className={styles.inputBox} key={key}>
                                        <span>{comp[key].valueName}</span>
                                        <input ref={'textContent'+key} placeholder={value.content}
                                               onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                               onFocus={()=>onFocus} style={{width:value.width}}/>
                                    </div>
                                )
                            }else if (value.type === 'button') {
                                return (
                                    <div className={styles.btnBox} key={key}>
                                        <button onClick={this.buttonAction}>{value.title}</button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className={styles.actionBox}>
                    <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={add} onClick={()=>addData(newData)}/>
                </div>
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        <div className={styles.tableHeaderItem}
                             style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}>序号</div>
                        {
                            tabaleData.ammData.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.ammData.content.map((value, key)=> {
                                num++;
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        <input className={styles.tableContentItem}
                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                               readOnly="true" value={num}/>
                                        {
                                            value.map((valueC, keyC)=> {
                                                if (keyC==3){
                                                    return(
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={valueC} type="password"/>
                                                    )
                                                }else if (keyC==tabaleData.ammData.header.length-1){
                                                return (
                                                    <input className={styles.tableContentItem} key={keyC}
                                                           style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                           onClick={()=>{$('#boxAm').parent().css('display','block')}}
                                                           type="button" value='设置'/>
                                                    )
                                                }else {
                                                    return(
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={valueC}/>
                                                    )
                                                }
                                            })
                                        }
                                        <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                            <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.content[key]))}/>
                                        </div>
                                        <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                            <img src={del} onClick={(e)=>deleData(key)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Ambox></Ambox>
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
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        inputOnChange:(value,id)=>{

        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        deleData:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
