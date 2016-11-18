import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('../../../../../redux/store');
var actions = require('redux/actions');
import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import styles from './data_table.scss';
import _ from 'lodash';
let tabaleData = require('../jy/data');
let tab =tabaleData.peqi.table;
let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData.peqi);
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
                            tab.data.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/tab.data.header.length)+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tab.data.content.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                
                                              
                                                return (
                                                    <div className={styles.tableContentItem} style={{width:(100/tab.data.header.length)+"%"}}
                                                           key={keyC}>{valueC}</div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tab.da.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/tab.da.header.length)+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tab.da.content.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {


                                                return (
                                                    <div className={styles.tableContentItem} style={{width:(100/tab.da.header.length)+"%"}}
                                                         key={keyC}>{valueC}</div>
                                                )
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
