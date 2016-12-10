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
let arr1=[
    // 'name',
    'wfid','rectime','operationtime','operator','planelec'];
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
        let {pageSize,zhzb,saveTableItem,buttonAction,deleData,deleDate,addData,addDate,table, changeTableItem1} = this.props;
        let newData={};
        let countPage=table.count;
        console.log(countPage);
        let opti=[];
        let num=0;
        let arr=[16,16,16,16,16,10];
        for(let i=0;i<arr1.length;i++){
            newData[arr1[i]]='';
        };
        newData['datetype']=1;
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
                                    if(key<9){
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <input className={styles.tableContentItem}
                                                   style={{width:8+"%"}}
                                                   readOnly="true" value={num}/>
                                            {
                                                arr1.map((valueC, keyC)=> {
                                                    if(keyC==0){
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                    style={{width:arr[keyC]+"%"}} key={keyC}>
                                                               {value[valueC]}
                                                            </div>
                                                        )
                                                    }else if(keyC==1){
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                 style={{width:arr[keyC]+"%",paddingLeft:30}} key={keyC}>
                                                                <input onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                       type="date" readOnly="readOnly" value={value[valueC].slice(0,10)}/>
                                                            </div>
                                                        )
                                                    }else if(keyC<3){
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                          style={{width:arr[keyC]+"%",paddingLeft:30}} key={keyC}>
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
                                            <div className={styles.tableContentItem} style={{width:5+"%"}}>
                                                <img src={save} onClick={(e)=>saveTableItem(key)}/>
                                            </div>
                                            <div className={styles.tableContentItem} style={{width:5+"%"}}>
                                                <img src={del} onClick={(e)=>deleData(key)}/>
                                            </div>
                                        </div>
                                    )}else {
                                        return(
                                            <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width:8+"%"}}
                                                       readOnly="true" value={num}/>
                                                {
                                                    arr1.map((valueC, keyC)=> {
                                                        if(keyC<1){
                                                            return(
                                                                <select className={styles.tableContentItem}
                                                                        style={{width:arr[keyC]+"%"}} key={keyC}
                                                                        onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}>
                                                                    <option value="422803">422803</option>
                                                                    <option value="422804">422804</option>
                                                                </select>
                                                            )
                                                        }else if(keyC<3){
                                                            return (
                                                                <div className={styles.tableContentItem}
                                                                     style={{width:arr[keyC]+"%",paddingLeft:30}} key={keyC}>
                                                                    <input onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}
                                                                           type="date"/>
                                                                </div>
                                                            )
                                                        }else{
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width:arr[keyC]+"%"}}
                                                                       key={keyC} contentEditable="true"
                                                                       onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}/>
                                                            )}
                                                    })
                                                }
                                                <div className={styles.tableContentItem} style={{width:5+"%"}}>
                                                    <img src={save} onClick={(e)=>addDate(key,newData)}/>
                                                </div>
                                                <div className={styles.tableContentItem} style={{width:5+"%"}}>
                                                    <img src={del} onClick={(e)=>deleDate(key)}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
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
        zhzb: state.vars.zhzb,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            $.ajax({
                url: 'http://10.9.0.7:8081/soam/ELEC/getWfelec',
                type: 'post',
                data:'pageSize=9&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContent', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        saveTableItem:(line)=>{
            let tableV = _.clone(getState().objs.tableContent);
            let asd=tableV.data[line];
            let wfp;
            wfp=JSON.stringify(asd);
            $.ajax({
                url: 'http://10.9.99.213:8080/soam/ELEC/uppWfelec?newwfp=data',
                type: 'post',
                data: wfp,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function (data) {
                    console.log(data);
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data[i][arr1[j]] = value;
            console.log(tableV.data[i][arr1[j]]);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        changeTableItem2: (value, table, i, j) => {
            table.data[i][arr1[j]] = value;
            console.log(value);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        addDate:(li)=>{
            let tableV = _.clone(getState().objs.tableContent);
            let wfs=tableV.data[li];
            let ddv;
            ddv=JSON.stringify(wfs);
            console.log(wfs,ddv);
            $.ajax({
                url: 'http://10.9.0.7:8081/soam/ELEC/addWfelec?wfp=data',
                type: 'post',
                data: ddv,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function (data) {
                    console.log(data);
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            $.ajax({
                url: 'http://10.9.0.7:8081/soam/ELEC/getWfelec',
                type: 'post',
                data:'pageSize=9&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContent', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        deleData:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            let fid=tableV.data[j]['wfid'];
            let rection=tableV.data[j]['rectime'];
            let daytype=tableV.data[j]['datetype'];
            console.log('wfid='+fid+'&rectime='+rection+'&datetype='+daytype);
            $.ajax({
                url: 'http://10.9.99.213:8080/soam/ELEC/delWfelec',
                type: 'post',
                data:'wfid='+fid+'&rectime='+rection+'&datetype='+daytype,
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
        deleDate:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
