import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './table.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';

let tabaleData = require('../../../../../../config/tkgl-table');
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
                            tabaleData.data.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/tabaleData.data.header.length-1)+'%'}} key={key}>{value}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.data.content.map((value, key)=> {
                                return (
                                    <div className={styles.tableContentLine} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                if(valueC<=1){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                               style={{width:(100/tabaleData.data.header.length-1)+'%'}}
                                                               key={keyC}><div className={valueC?styles.succ:styles.defa}></div></div>
                                                    )
                                                }
                                                else{
                                                return (
                                                    <div className={styles.tableContentItem}
                                                           style={{width:(100/tabaleData.data.header.length-1)+'%'}}
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
