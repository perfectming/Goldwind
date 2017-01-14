import React from 'react';//计划电量录入，含有翻页，增删改查等功能
import {connect} from 'react-redux';
import styles from './PEQI.scss';
import save from '../../../img/comp/save.png';
import del from '../../../img/icon/tabDel.png';
import refresh from '../../../img/comp/refresh.png';
import add from '../../../img/icon/tabAdd.png';
var {getState} = require('../../../../../../redux/store');
var $ = require('jquery');
import _ from 'lodash';
import mod from '../../../../../../../config/Model';
var actions = require('redux/actions');
let comps = require('./../../../../../../../config/data');
let ssg2=mod.Model.ens;
let arr3=[];
let yeares=[];
var pageSize=11;//设置每页的条目数量
let page=1;//设置初始页码
let soam='http://10.68.100.32:8080/soam';//设置接口
let thDate=new Date();
let thYear=thDate.getFullYear();//定义变量，路径
for(let i=0;i<=30;i++){
    yeares.push(thYear-15+i)
}
(function(){
    for(let x in ssg2){
        arr3.push(ssg2[x].name);
    }}());
arr3.splice(-2,2);//清理数据格式
let arr1=['wfid','rectime','operationtime','operator','planelec'];//设置每列的属性
let comp = comps.peqi.table;
let Component = React.createClass({
    componentDidMount() {
        this.props.init(page);
    },
    render() {
        let {checkDate,skinStyle,userNameT,init,wfidCount,wtidAll,theOne,lastPage,nextPage,theLast,page=1,saveTableItem,buttonAction,deleData,deleDate,addData,addDate,table,years,changeTableItem1,wfids} = this.props;
        let newData={};
        let num=0;
        console.log(wfidCount);
        let arr=[16,16,16,16,16,10];
        for(let i=0;i<arr1.length;i++){
            newData[arr1[i]]='';
        }
        newData['datetype']=1;
        if (table && wtidAll){//判断数据是否存在
            return (
                <div className={skinStyle==1?styles.powerBoxBlue:(skinStyle==2?styles.powerBoxWhite:styles.powerBox)}>
                    <div className={styles.inquireBox}>
                        <div className={styles.seleBox}>
                            <span>年度</span>
                            <select id='textContent5'>
                                {yeares.map((value, key)=> {
                                    return (
                                        <option value={value} key={key}>{value}</option>
                                    )
                                })
                                }
                            </select>{/*map遍历年度*/}
                        </div>
                        <div className={styles.seleBox}>
                            <span>场站</span>
                            <select id='textContent6'>
                                {wtidAll.data.map((value, key)=> {
                                    return (
                                        <option className={styles.opt} value={value.wfid} key={key}>{value.wfname}</option>
                                    )
                                })
                                }
                            </select>{/*map遍历年度*/}
                        </div>
                        <div className={styles.inputBox}>
                            <button onClick={(e)=>{buttonAction(e.target)}}>查询</button>
                        </div>
                        <div className={styles.btnBox}>
                            <div>单 位：kWh</div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.actionBox}>
                            <img src={refresh} onClick={()=>init()}/>
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
                                    table.data.pagedata && table.data.pagedata.map((value, key)=> {
                                        num++;
                                        if(key<wfidCount/1){
                                            return (
                                                <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                    <input className={styles.tableContentItem}
                                                           style={{width:8+"%"}}
                                                           readOnly="true" value={num}/>
                                                    {
                                                        arr1.map((valueC, keyC)=> {
                                                            if(valueC=='operator'){
                                                                return (
                                                                    <div className={styles.tableContentItem}
                                                                         style={{width:arr[keyC]+"%"}} key={keyC}>
                                                                        {value[valueC]}
                                                                    </div>
                                                                )
                                                            }else
                                                            if(keyC==0){
                                                                return (
                                                                    <div className={styles.tableContentItem}
                                                                         style={{width:arr[keyC]+"%"}} key={keyC}>
                                                                        {value['wfname']}
                                                                    </div>
                                                                )
                                                            }else if(keyC==2){
                                                                return (
                                                                    <div className={styles.tableContentItem}
                                                                         style={{width:arr[keyC]+"%",paddingLeft:30}} key={keyC}>
                                                                        <input onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                               type="date" readOnly="readOnly" value={value[valueC].slice(0,10)}/>
                                                                    </div>
                                                                )
                                                            }else if(keyC==1){
                                                                return (
                                                                    <div className={styles.tableContentItem}
                                                                         style={{width:arr[keyC]+"%",paddingLeft:30}} key={keyC}>
                                                                        <input onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                               onBlur={(e)=>checkDate(e.target.value,newData,key,valueC)}
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
                                                            if(keyC==0){
                                                                return(
                                                                    <select className={styles.tableContentItem}
                                                                            style={{width:arr[keyC]+"%"}} key={keyC}
                                                                            onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}>
                                                                        {wtidAll.data.map((value, key)=> {
                                                                            return (
                                                                                <option className={styles.opt} value={value[valueC]} key={key}>{value.wfname}</option>
                                                                            )
                                                                        })
                                                                        }
                                                                    </select>
                                                                )
                                                            }else if(keyC==1){
                                                                return (
                                                                    <div className={styles.tableContentItem}
                                                                         style={{width:arr[keyC]+"%",paddingLeft:30}} key={keyC}>
                                                                        <input onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}
                                                                               onBlur={(e)=>checkDate(e.target.value,newData,key,valueC)}
                                                                               type="date"/>
                                                                    </div>
                                                                )
                                                            }else if(keyC==2){
                                                                return (
                                                                    <div className={styles.tableContentItem}
                                                                         style={{width:arr[keyC]+"%",paddingLeft:30}} key={keyC}>
                                                                        <input readOnly="readOnly"
                                                                               type="date" value={new Date().getFullYear()+'-'+(new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1)+'-'+(new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate())}/>
                                                                    </div>
                                                                )
                                                            }else if(keyC==3){
                                                                return (
                                                                    <input className={styles.tableContentItem} style={{width:arr[keyC]+"%"}}
                                                                           readOnly="readOnly" value={userNameT}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}/>
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
                    <div className={styles.pageplus}>
                        <span onClick={()=>theOne(page,years,wfids)}>首页</span>
                        <span onClick={()=>lastPage(page,years,wfids)}>上一页</span>
                        <span>{page+"/"+table.data.totalPage}</span>
                        <span onClick={()=>nextPage(page,table.data.totalRecord,pageSize,years,wfids)}>下一页</span>
                        <span onClick={()=>theLast(page,table.data.totalRecord,pageSize,years,wfids)}>末页</span>
                    </div>
                </div>
            );}else{return(<div></div>)}
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
        page: state.vars.page1,
        skinStyle:state.vars.skinStyle,
        userNameT: state.vars.userNameT,
        wtidAll: state.objs.wtidAll,
        wfidCount:state.vars.wfidCount,
        wfids:state.vars.wfids,
        years:state.vars.years
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('wfids', null));
            dispatch(actions.setVars('years', null));
            dispatch(actions.setVars('page1', 1));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage='+1+'&&year=&&wfids=',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data.data.pagedata.length);
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            $.ajax({
                url: soam+'/wf/getAll',
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('wtidAll', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        checkDate(value,newData,key,keyC){
            let dialog=value.slice(0,8)+'01';
            let tableV = _.clone(getState().objs.tableContent);
            console.log(tableV);
            alert('开始时间为每月的第一天');
            tableV.data.pagedata[key][keyC]=dialog;
            dispatch(actions.setObjs('tableContent', tableV));


        },
        checkNewDate(value,newData,key,keyC){
            let dialog=value.slice(0,8)+'01';
            let tableV = _.clone(getState().objs.tableContent);
            console.log(dialog);
            alert('开始时间为每月的第一天');
            tableV.data.pagedata[key][keyC]=dialog;
            dispatch(actions.setObjs('tableContent', tableV));


        },
        buttonAction (sit){
            // 获取select 选择的内容
            var tContent = $('#textContent5')[0].value;
            var tContent1 = $('#textContent6')[0].value;
            dispatch(actions.setVars('page1', 1));
            dispatch(actions.setVars('years', tContent));
            dispatch(actions.setVars('wfids', tContent1));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage='+1+'&&year='+tContent+'&&wfids='+tContent1,
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
        saveTableItem:(line)=>{
            let tableV = _.clone(getState().objs.tableContent);
            let horizon = _.clone(getState().vars.userNameT);
            let asd=tableV.data.pagedata[line];
            let wfp;
            asd['operator']=horizon;
            wfp=JSON.stringify(asd);
            $.ajax({
                url: soam+'/ELEC/uppWfelec?newwfp=data',
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
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContent', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.pagedata[i][arr1[j]] = value;
            console.log(tableV.data.pagedata[i][arr1[j]]);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        addDate:(li)=>{
            let tableV = _.clone(getState().objs.tableContent);
            let wfs=tableV.data.pagedata[li];
            (wfs.wfid==='') && (wfs.wfid='150801');
            let ddv;
            ddv=JSON.stringify(wfs);
            console.log(wfs,ddv);
            $.ajax({
                url: soam+'/ELEC/addWfelec?wfp=data',
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
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                    dispatch(actions.setObjs('tableContent', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        deleData:(j) => {
            if(confirm("确定要删除数据吗？")){
            let tableV = _.clone(getState().objs.tableContent);
            let fid=tableV.data.pagedata[j]['wfid'];
            let rection=tableV.data.pagedata[j]['rectime'];
            let daytype=tableV.data.pagedata[j]['datetype'];
            console.log('wfid='+fid+'&rectime='+rection+'&datetype='+daytype);
            $.ajax({
                url: soam+'/ELEC/delWfelec',
                type: 'post',
                data:'wfid='+fid+'&rectime='+rection+'&datetype='+daytype,
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    alert('删除成功');
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data.data.pagedata.length);
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });}
        },
        deleDate:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.pagedata.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        lastPage:(page,years,wfids)=>{
            page>1 ? page--:page;
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data)
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        nextPage:(page,i,j,years,wfids)=>{
            (page<Math.ceil(i/j)) ? page++:page;
            console.log(page,years,wfids);
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data.data.pagedata.length);
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });

        },
        theOne :(page,years,wfids)=>{
            page=1;
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data)
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        theLast :(page,i,j,years,wfids)=>{
            page=Math.ceil(i / j);
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data)
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
