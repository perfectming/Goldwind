import React from 'react';
import {connect} from 'react-redux';
import u865 from '../../img/comp/u865.png';
import u867 from '../../img/comp/u867.png';
import u869 from '../../img/comp/u869.png';
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
        let {blank,table, changeTableItem} = this.props;
        return (
            <div>
                <div className={styles.btn}><img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={refresh}/><img src={u865} onClick={blank}/><img src={u867} onClick={blank}/><img src={u869} onClick={blank}/></div>
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tabaleData.as.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/tabaleData.data.header.length)+"%"}} key={key}>{value}</div>
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
                                                               style={{width:(100/tabaleData.data.header.length)+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={valueC}/>
                                                    )
                                                }else{
                                                return (
                                                    <div className={styles.tableContentItem} style={{width:(100/tabaleData.data.header.length)+"%"}}
                                                         key={keyC}>{valueC}</div>
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
        blank: () => {
            window.open ("../../../../../../../simple.html", "newwindow", "height=300, width=400, top=300, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
        },
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.as.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
