import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './data_table.scss';

let tabledata = require('../jy/data');
let tab =tabledata.peqi.table;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        return (
            <div>
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
                                                    <div className={styles.tableContentItem}style={{width:(100/tab.data.header.length)+"%"}}
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
                                                    <div className={styles.tableContentItem}style={{width:(100/tab.da.header.length)+"%"}}
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
