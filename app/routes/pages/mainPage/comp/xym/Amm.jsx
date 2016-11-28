import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './Amm.scss';
var {getState} = require('../../../../../redux/store');

import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';

let tabaleData = require('./data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    buttonAction (){

        var tContent = this.refs.textContent5.value;
        alert(tContent);
        // 在这个下边获取这个时间段的数据就行了
        // 然后去更新图表
    },
    render() {
        let {buttonAction, inputOnChange, onFocus,table, changeTableItem} = this.props;
        let num=0;
        let comp=tabaleData.comps.from;
        return (
           
        <div className={styles.bodyBox}> 
            <div className={styles.roleputBox}>
                <div className={styles.inquireBox}>
                    {
                        comp.map((value, key,valueName)=> {
                            if (key == 5) {
                                return (
                                    <div className={styles.inputBox} key={key}>
                                        <span>{comp[key].valueName}</span>
                                        <input ref={'textContent'+key} placeholder={value.content}
                                               onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                               onFocus={()=>onFocus} style={{width:value.width}}/>
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
                <div className={styles.actionBox}>
                    <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                    <img src={refresh}/>
                </div>
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        {
                            tabaleData.ammData.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(1450/tabaleData.ammData.header.length)}} key={key}><span>{value}</span></div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.ammData.content.map((value, key)=> {
                                num++;
                                return (
                                    <div className={styles.tableContentLine} key={key}>
                                        
                                        {
                                            value.map((valueC, keyC)=> {
                                                if(keyC==0){
                                                    return (
                                                        <input maxLength="15" className={styles.tableContentItem}
                                                               style={{width:(1450/tabaleData.ammData.header.length)}}
                                                               key={keyC} readOnly="true" value={num}/>
                                                    )
                                                }else if(keyC <= 7){
                                                    return (
                                                        <input maxLength="15" className={styles.tableContentItem}
                                                           style={{width:(1450/tabaleData.ammData.header.length)}}
                                                           key={keyC} contentEditable="true"
                                                           onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                           value={valueC}/>
                                                    )
                                                }else{
                                                    return (
                                                        <div className={styles.tableContentItemdiv}
                                                           style={{width:(1450/tabaleData.ammData.header.length)}}
                                                           key={keyC}>
                                                            <input type="button" value="设置" style={{width:(1450/tabaleData.ammData.header.length)}} />
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
            tableV.ammData.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        inputOnChange:(value,id)=>{

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
