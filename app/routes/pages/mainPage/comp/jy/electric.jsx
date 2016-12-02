import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './electric.scss';
var {getState} = require('../../../../../redux/store');
import del from '../../img/icon/tabDel.png';
import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import tabAdd from '../../img/icon/tabAdd.png';
import _ from 'lodash';

let tabaleData = require('./data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData.electric);
    },
    render() {
        let {add,table, changeTableItem,dele} = this.props;
        let num=0;
        let newData=[];
        for(let i=0;i<tabaleData.electric.header.length;i++){
            newData.push('')
        }
        return (
            <div>
                <div className={styles.inquireBox}>
                    {
                        tabaleData.electric.comps.map((value, key,valueName)=> {
                            if (value.type === 'date') {
                                return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input ref="startTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input ref="endTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                            } else  if (value.type === 'input') {
                                return (
                                    <div className={styles.inputBox} key={key}>
                                        <span>{comp[key].valueName}</span>
                                        <input ref={'textContent'+key} placeholder={value.content}
                                               onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                               onFocus={()=>onFocus} style={{width:value.width}}/>
                                    </div>
                                )
                            }else if (value.type === 'select') {
                                return (
                                    <div className={styles.seleBox} key={key}>
                                        <span>{comp[key].valueName}</span>
                                        <select ref={'selectType'+key}>
                                            {value.select.map((value, key)=> {
                                                return (
                                                    <option value={value} key={key}>{value}</option>
                                                )
                                            })}
                                        </select>
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
                <div className={styles.btn}>
                    <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.content))}/>
                    <img src={refresh}/>
                    <img src={tabAdd} onClick={()=>add(newData)}/>
                </div>

                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tabaleData.electric.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/(tabaleData.electric.header.length+1))+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
                        <div className={styles.tableHeaderItem}
                             style={{width:(100/(tabaleData.electric.header.length+1))+"%"}} key={tabaleData.electric.header.length}>删除</div>
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.electric.content.map((value, key)=> {
                                num++;
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                if(keyC==0){
                                                    return (
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.electric.header.length+1))+"%"}}
                                                               key={keyC} readOnly="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={num}/>
                                                    )
                                                }else{
                                                    return (
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.electric.header.length+1))+"%"}}
                                                               key={keyC}
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={valueC}/>
                                                    )}
                                            })
                                        }
                                        <div className={styles.tableContentItem} style={{width:(50/(tabaleData.electric.header.length+1))+"%"}}>
                                            <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.content[key]))}/>
                                        </div>
                                        <div className={styles.tableContentItem} style={{width:(50/(tabaleData.electric.header.length+1))+"%"}}>
                                            <img src={del} onClick={(e)=>dele(key)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
})


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
        add:(i) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        dele:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
