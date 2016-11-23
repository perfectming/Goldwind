import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './AS.scss';
var {getState} = require('../../../../../redux/store');
import del from '../../img/icon/tabDel.png';
import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import tabAdd from '../../img/icon/tabAdd.png';
import _ from 'lodash';

let tabaleData = require('./data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData.as);
    },
    render() {
        let {add,table, changeTableItem,dele} = this.props;
        let newData=[];
        for(let i=0;i<tabaleData.as.header.length;i++){
            newData.push('')
        }
        return (
            <div>
                <div className={styles.btn}><img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={refresh}/>
                    <img src={tabAdd} onClick={()=>add(newData)}/>
                </div>

                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tabaleData.as.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/(tabaleData.as.header.length+1))+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
                        <div className={styles.tableHeaderItem}
                             style={{width:(100/(tabaleData.as.header.length+1))+"%"}} key={tabaleData.as.header.length}>删除</div>
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.as.content.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                if(keyC==value.length-1){
                                                    return (
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.as.header.length+1))+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={valueC}/>
                                                    )
                                                }else{
                                                return (
                                                    <input className={styles.tableContentItem}
                                                           style={{width:(100/(tabaleData.as.header.length+1))+"%"}}
                                                           key={keyC} readOnly="true"
                                                           onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                           value={valueC}/>
                                                )}
                                            })
                                        }
                                        <div className={styles.tableContentItem} style={{width:(100/(tabaleData.as.header.length+1))+"%"}}>
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
            console.log(j);
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
