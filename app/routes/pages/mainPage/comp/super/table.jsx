<<<<<<< HEAD
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
let header=require('./tabledate');
let headername=header.header;
let date=dataBase.ModelData;
let arrname=[];
let point=[];

(function(){
  for(let key in date){
    let arr=[];
    for(let i=0;i<headername.length;i++){
         if(i==0){
            arr.push(((date[key].TActPower/date[key].Capacity)*100).toFixed(1)+"%");
        }
        if(i==6){
            arr.push(((date[key].TActPower/date[key].Capacity)*100).toFixed(1)+"%");
        }
           arr.push(date[key][headername[i]]);
            }
            arrname.push(arr);
         }
          arrname.pop();
        console.log(arrname)
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
                                         style={{width:(100/tabaleData.data.header.length)+"%"}} key={key}>{value}</div>
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
                                                    <div className={styles.tableContentItem}style={{width:(100/tabaleData.data.header.length)+"%"}}
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
=======
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
let header=require('./tabledate');
let headername=header.header;
let fcnum=[];

let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData);
    },
    render() {
        let {table, changeTableItem,changepage,zhzb,bbs} = this.props;
        let date=bbs.ModelData;
        let placename=zhzb.Model.ens;
        let arrname=[];
        let point=[];

(function(){
        let o=0;
    for(let name in placename){ 
      if(placename[name].wft=='Wf')  {  
            point.push(placename[name].name)
        }
           
    }
  for(let key in date){
    
    let arr=[];
  if(date[key].WTCount!='0' && date[key].InverterCount=='0'){
    fcnum.push(key)
    for(let i=0;i<headername.length;i++){
         if(i==0){
             arr.push(point[o]);
            o++;
        }


        if(i==4){
            arr.push(((date[key].TActPower/date[key].Capacity)*100).toFixed(1));
             }
             arr.push(date[key][headername[i]]);
            }
            
            arrname.push(arr);
         }
       }

}());












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

                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key} onClick={()=>changepage(key)}>
                                        {
                                            value.map((valueC, keyC)=> {
                                                 if(keyC==3){
                                                    if(valueC=='null'){
                                                        return(
                                                                <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%"}}
                                                           key={keyC}>--</div>
                                                            )
                                                    }
                                                 }
                                                 if(keyC==4){
                                                    if(valueC==''){
                                                        return(
                                                                <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%"}}
                                                           key={keyC}>--</div>
                                                            )
                                                    }
                                                 }
                                                 if(keyC==5){
                                                        if(valueC<60){
                                                             return (
                                                            <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%",color:'#e72727'}}
                                                           key={keyC}>{valueC+'%'}</div>

                                                                )
                                                        }else if(valueC>=60 && valueC<80){
                                                             return (
                                                            <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%",color:'#ec9e9e'}}
                                                           key={keyC}>{valueC+'%'}</div>

                                                                )
                                                        }else if(valueC>=80 && valueC<90){
                                                             return (
                                                            <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%",color:'#f2d46c'}}
                                                           key={keyC}>{valueC+'%'}</div>

                                                                )
                                                        }else if(valueC>90){
                                                             return (
                                                            <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%",color:'#1fe005'}}
                                                           key={keyC}>{valueC+'%'}</div>

                                                                )
                                                        }
                                                       
                                                    
                                                }

                                                if(keyC==9){

                                                     return (

                                                    <div className={styles.tableContentItem}style={{width:(tabaleData.data.width[keyC])+"%",color:'#f00'}}
                                                           key={keyC}>{valueC}</div>

                                                     )
                                                }

                                              
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
        zhzb: state.vars.zhzb,
        bbs: state.vars.bbs,
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
        },
        changepage:(key) => {
           dispatch(actions.setVars('showPage', 'fan_matrix'));
           dispatch(actions.setVars('numpage', 'fanmatrix'));
           dispatch(actions.setVars('fan_page', 'allpage'));
          dispatch(actions.setVars('actbt',key ));
          dispatch(actions.setVars('actbt1','' ));
           dispatch(actions.setVars('valuepage', fcnum[key]));
          dispatch(actions.setVars('befor_page','super' ));
           dispatch(actions.setVars('fc_info', fcnum[key]));
          dispatch(actions.setVars('Changnav', 0));

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
