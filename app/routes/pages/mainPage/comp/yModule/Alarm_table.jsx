import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
<<<<<<< HEAD

=======
var $ = require('jquery');
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
import styles from './Alarm_table.scss';
var {getState} = require('../../../../../redux/store');

import _ from 'lodash';

let tabaleData = require('../yAll/Alarm_table.js');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    render() {
<<<<<<< HEAD
        let {table, changeTableItem} = this.props;
=======
        let {table, changeTableItem,btnIf} = this.props;
        let num=0;
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
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
<<<<<<< HEAD
                    <div className={styles.tableContentBox}>
                        {
                            tabaleData.data.content.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                return (
                                                    <div className={styles.tableContentItem}style={{width:tabaleData.data.length[keyC]}} key={keyC}>
                                                        {valueC}
                                                    </div>
                                                )
=======
                    <div className={styles.tableContentBox} id="alarmTable">
                        {
                            tabaleData.data.content.map((value, key)=> {
                                num++;
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}
                                    style={{color:value[2]=='故障'}}>
                                        
                                         {
                                            value.map((valueC, keyC)=> {
                                                if(keyC==0){
                                                    return (
                                                        <div className={styles.tableContentItem} style={{width:tabaleData.data.length[keyC]}} key={keyC}>
                                                            {num}
                                                        </div>
                                                    )
                                                }else if(keyC <= 12&&keyC!=10){
                                                    return (
                                                        <div className={styles.tableContentItem} style={{width:tabaleData.data.length[keyC]}} key={keyC}>
                                                             {valueC}
                                                        </div>
                                                    )
                                                }else if(keyC==10){
                                                    return (
                                                        <input className={styles.tableContentItem}
                                                               style={{width:tabaleData.data.length[keyC]}}
                                                               key={keyC} type="button" onClick={(e)=>btnIf(key)} value={valueC==0?'否':'是'}/>
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
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                                            })
                                        }
                                    </div>
                                )
                            })
<<<<<<< HEAD
                        }
=======
                         }   
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
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
<<<<<<< HEAD
=======
        },
        btnIf:(i)=>{
            $('#alarmTable :button')[i].value=="是"?
                $('#alarmTable :button')[i].value="否":
                $('#alarmTable :button')[i].value="是";
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
