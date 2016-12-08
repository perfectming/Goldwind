import React from 'react';
import {connect} from 'react-redux';
import styles from './PEQI.scss';
import save from '../../img/comp/save.png';
import refresh from '../../img/comp/refresh.png';
import del from '../../img/icon/tabDel.png';
import add from '../../img/icon/tabAdd.png';
var {getState} = require('../../../../../redux/store');
import _ from 'lodash';
import mod from '../../../../../../config/Model'
var actions = require('redux/actions');
let comps = require('./data');
let ssg2=mod.Model.ens;
let arr3=[];
let years=[];
let thDate=new Date();
let thYear=thDate.getFullYear();
for(let i=0;i<=30;i++){
    years.push(thYear-15+i)
}
(function(){
    for(let x in ssg2){
        arr3.push(ssg2[x].name);
    }}());
arr3.splice(-2,2);
let comp = comps.peqi.table;
let Component = React.createClass({
    componentDidMount() {
        this.props.init(comp);
    },
    buttonAction (){
        // 获取select 选择的内容
        var tContent = this.refs.textContent5.value;
        var tContent1 = this.refs.textContent6.value;
        alert(tContent+tContent1);
    },
    render() {
        let {buttonAction,deleData,addData,table, changeTableItem1} = this.props;
        let arr1=['datetype','wfid','operationtime','rectime','operator','planelec'];
        let newData=[];
        let num=0;
        let arr=[13,13,13,13,10,24,6];
        for(let i=0;i<comp.data.header.length;i++){
            newData.push('');
        };
        if (table){
        return (
            <div className={styles.powerBox}>
                <div className={styles.inquireBox}>
                    <div className={styles.seleBox}>
                        <span>年度</span>
                        <select ref='textContent5'>
                            {years.map((value, key)=> {
                                    return (
                                    <option value={value} key={key}>{value}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.seleBox}>
                        <span>场站</span>
                        <select ref='textContent6'>
                            {arr3.map((value, key)=> {
                                return (
                                    <option className={styles.opt} value={value} key={key}>{value}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className={styles.inputBox}>
                    <button onClick={this.buttonAction}>查询</button>
                    </div>
                    <div className={styles.btnBox}>
                        <div>单位：万kWh</div>
                    </div>
                </div>
                <div className={styles.table}>
                    <div className={styles.actionBox}>
                        <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.data))}/>
                        <img src={add} onClick={()=>addData(newData)}/>
                    </div>
                    <div className={styles.tableBox}>
                        <div className={styles.tableHeaderBox}>
                            <div className={styles.tableHeaderItem}
                                 style={{width:8+"%"}}>序号</div>
                            {
                                comp.data.header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:arr[key]+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                table.data.map((value, key)=> {
                                    num++;
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <input className={styles.tableContentItem}
                                                   style={{width:8+"%"}}
                                                   readOnly="true" value={num}/>
                                            {
                                                arr1.map((valueC, keyC)=> {
                                                    if(keyC<2){
                                                        return(
                                                            <select className={styles.tableContentItem}
                                                                    style={{width:arr[keyC]+"%"}} key={keyC}
                                                                    onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}>
                                                                <option value="">{value[valueC]}</option>
                                                            </select>
                                                        )
                                                    }else if(keyC<4){
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                          style={{width:arr[keyC]+"%"}} key={keyC}>
                                                            <input onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                   type="date" value={value[valueC].slice(0,10)}/>
                                                            </div>
                                                        )
                                                    }else{
                                                    return (
                                                        <input className={styles.tableContentItem}
                                                               style={{width:arr[keyC]+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                               value={value[valueC]}/>
                                                    )}
                                                })
                                            }
                                            <div className={styles.tableContentItem} style={{width:3+"%"}}>
                                                <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.data.content[key]))}/>
                                            </div>
                                            <div className={styles.tableContentItem} style={{width:3+"%"}}>
                                                <img src={del} onClick={(e)=>deleData(key)}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className={styles.tableContentLine1}>
                                <input className={styles.tableContentItem}
                                       style={{width:8+"%"}}
                                       readOnly="true" value={num+1}/>
                                {
                                    arr1.map((valueC, keyC)=> {
                                        if(keyC<2){
                                            return(
                                                <select className={styles.tableContentItem}
                                                        style={{width:arr[keyC]+"%"}} key={keyC}
                                                        onChange={(e)=>changeTableItem1(e.target.value,table,keyC)}>
                                                    <option value=""></option>
                                                </select>
                                            )
                                        }else if(keyC<4){
                                            return (
                                                <div className={styles.tableContentItem}
                                                     style={{width:arr[keyC]+"%"}} key={keyC}>
                                                    <input onChange={(e)=>changeTableItem1(e.target.value,table,keyC)}
                                                           type="date"/>
                                                </div>
                                            )
                                        }else{
                                            return (
                                                <input className={styles.tableContentItem}
                                                       style={{width:arr[keyC]+"%"}}
                                                       key={keyC} contentEditable="true"
                                                       onChange={(e)=>changeTableItem1(e.target.value,table,keyC)}/>
                                            )}
                                    })
                                }
                                <div className={styles.tableContentItem} style={{width:3+"%"}}>
                                    <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.data[key+1]))}/>
                                </div>
                                <div className={styles.tableContentItem} style={{width:3+"%"}}>
                                    <img src={del} onClick={(e)=>deleData(key)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );}else{return(<div></div>)}
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            $.ajax({
                url: 'http://10.9.99.213:8080/soam/ELEC/getWfelec',
                type: 'post',
                data:'pageSize=6&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContent', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContent);
            $.ajax({
                url: 'http://10.9.99.213:8080/soam/ELEC/addWfelec',
                type: 'post',
                data:'wfp={}',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContent', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            table.data.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        deleData:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.content.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
