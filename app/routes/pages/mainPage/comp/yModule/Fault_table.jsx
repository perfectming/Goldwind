import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './Fault_table.scss';
var {getState} = require('../../../../../redux/store');

import _ from 'lodash';

let tabaleData = require('../yAll/Fault_table.js');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    render() {
        let {table, changeTableItem} = this.props;
        return (
            <div>
                
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tabaleData.data.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:tabaleData.data.length[key]}} key={key}>
                                         {value}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.data.content.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        
                                         {
                                            value.map((valueC, keyC)=> {
                                                if(keyC <= 12){
                                                    return (
                                                        <div className={styles.tableContentItem}style={{width:tabaleData.data.length[keyC]}} key={keyC}>
                                                             {valueC}
                                                        </div>
                                                    )
                                                }else{
                                                    return (
                                                        <input maxLength="15" className={styles.tableContentItem}
                                                           style={{width:tabaleData.data.length[keyC]}}
                                                           key={keyC} contentEditable="true"
                                                           onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                           value={valueC}/>
                                                    )
                                                    
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
            tableV.data.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
