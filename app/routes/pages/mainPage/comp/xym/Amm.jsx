import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './Amm.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';

let tabaleData = require('./amm-data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    render() {
        let {table, changeTableItem} = this.props;
        return (
           
        <div className={styles.bodyBox}> 
            <div className={styles.roleputBox}>
                <ul>
                    <li>
                        角色名称：<input type="text" size='20' maxLength='10'/>
                        
                        <input type="button" value="搜索" className={styles.serchbox}/>
                    </li>
                    
                </ul>
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
                                         style={{width:(1450/tabaleData.data.header.length)}} key={key}><span>{value}</span></div>
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
                                                if(keyC <= 7){
                                                    return (
                                                        <input maxLength="15" className={styles.tableContentItem}
                                                           style={{width:(1450/tabaleData.data.header.length)}}
                                                           key={keyC} contentEditable="true"
                                                           onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                           value={valueC}/>

                                                    )
                                                
                                                }else{
                                                    return (
                                                        <div className={styles.tableContentItemdiv}
                                                           style={{width:(1450/tabaleData.data.header.length)}}
                                                           key={keyC}>
                                                            <input type="button" value="设置" style={{width:(1450/tabaleData.data.header.length)}} />
                                                        </div>
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
