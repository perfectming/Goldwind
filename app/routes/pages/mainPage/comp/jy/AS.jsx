import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './AS.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';

let tabaleData = require('./data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData.as);
    },
    render() {
        let {add,table, changeTableItem} = this.props;
        let newData=[];
        for(let i=0;i<tabaleData.as.header.length;i++){
            newData.push('');
        }
        return (
            <div>
                <div className={styles.btn}><img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={refresh}/>
                    <img src={save} onClick={()=>add(newData)}/>
                    <img src={save} onClick={()=>dele()}/>
                </div>

                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tabaleData.as.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/tabaleData.as.header.length)+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
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
                                                               style={{width:(100/tabaleData.as.header.length)+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={valueC}/>
                                                    )
                                                }else{
                                                return (
                                                    <input className={styles.tableContentItem}
                                                           style={{width:(100/tabaleData.as.header.length)+"%"}}
                                                           key={keyC} readOnly="true"
                                                           onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                           value={valueC}/>
                                                );}
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
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        add:(i) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
