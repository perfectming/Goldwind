import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
import styles from './table.scss';
var {getState} = require('../../../../../redux/store');
import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import _ from 'lodash';
import $ from 'jquery';

let tabaleData = require('../../../../../../config/super_table');
let dataBase=require('../../../../../../config/ModelData');
let place=require('../../../../../../config/Model');
let header=require('./tabledate');
let headername=header.header;
let date=dataBase.ModelData;
let placename=place.Model.ens;
let arrname=[];
let point=[];

(function(){
    let o=0;
    for(let name in placename){     
               point.push(placename[name].name)
            }
  for(let key in date){
    let arr=[];
    for(let i=0;i<headername.length;i++){
         if(i==0){
             arr.push(point[o]);
            o++;
        }
        if(i==6){
            arr.push(((date[key].TActPower/date[key].Capacity)*100).toFixed(1)+"%");
        }
           arr.push(date[key][headername[i]]);
            }
            arrname.push(arr);
         }
          arrname.pop();
        
}());



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
                                         style={{width:(tabaleData.data.width[key])+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            arrname.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                
                                              
                                                return (
                                                    <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%"}}
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
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);