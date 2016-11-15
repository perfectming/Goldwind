import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './Table.scss';
var {getState} = require('../../../../redux/store');

import save from '../img/comp/save.png';
import refresh from '../img/comp/refresh.png';
import _ from 'lodash';

let tabaleData = require('../../../../../config/table-data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    render() {
        let {table, changeTableItem} = this.props;
        return (
            <div>
                <div className={styles.actionBox}>
                    <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={refresh}/>
                </div>
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tabaleData.data.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(1350/tabaleData.data.header.length)-6}} key={key}>{value}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.data.content.map((value, key)=> {
                                return (
                                    <div className={styles.tableContentLine} key={key}>
                                        <div className={styles.tableLineNum}>{key + 1}</div>
                                        {
                                            value.map((valueC, keyC)=> {
                                                return (
                                                    <input className={styles.tableContentItem}
                                                           style={{width:(1350/tabaleData.data.header.length)-6}}
                                                           key={keyC} contentEditable="true"
                                                           onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                           value={valueC}/>
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
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
