import React from 'react';
import {connect} from 'react-redux';
import styles from './Inputc.scss';

import Login from '../../../../../../../../components/common/Loading.jsx';
import save from '../../../../../img/comp/save.png';
import refresh from '../../../../../img/comp/refresh.png';
import del from '../../../../../img/icon/tabDel.png';
import add from '../../../../../img/icon/tabAdd.png';
import _ from 'lodash';
import mod from '../../../../../../../../../config/Model';
var $ = require("jquery");
var actions = require('redux/actions');
var {getState} = require('redux/store');
let comps = require('./datas');
let ssg2=mod.Model.ens;
let arr3=[];
let yeares=[];
let pageSize=16;//设置每页的条目数量
let page=1;//设置初始页码
let thDate=new Date();
let thYear=thDate.getFullYear();
let month2=thDate.getMonth();
let soam='http://10.9.99.68:8080/wbi';//设置接口
for(let i=0;i<=30;i++){
    yeares.push(thYear-15+i)
}
(function(){
    for(let x in ssg2){
        arr3.push(ssg2[x].name);
    }}());
arr3.splice(-2,2);
let arr=[15,16,10,15,22,13];
let arr2=[15,16,6,4,15,22,8];
let comp = comps.peqi.table;
let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init(comp);
    },
    render() {
        let {deleData,addData,addDate,table,wtidAll, changeTableItem1,page,nextpage,lastpage,theone,thelast,dataenter,buttonAction,boll=false} = this.props;
        let newData=[];
        let num=0;
        let pagingOptions = {
            showNumber: 3
        }
        //



        if (boll){//判断数据是否存在

            let arr1=['wfname','rectime','operationtime','operator','planelec'];
            for(let i=0;i<arr1.length;i++){
                newData[arr1[i]]='';
            }
            console.log(newData)
            newData['datetype']=1;

            return (

                <div className={styles.powerBox}>
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
                                        <option  value={value.wfid} key={key}>{value.wfname}</option>
                                    )
                                })
                                }
                            </select>{/*map遍历年度*/}
                        </div>
                        <div className={styles.inputBox}>
                            <button onClick={(e)=>{buttonAction(e.target)}}>查询</button>
                        </div>
                        <div className={styles.btnBox}>
                            <div>单 位：万元</div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.actionBox}>
                            <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.data))}/>
                            <img src={refresh}/>
                            <img src={add} onClick={()=>addData(newData,page,dataenter)}/>
                        </div>
                        <div  className={styles.cx}></div>
                        <div className={styles.tableBox}>
                            <div className={styles.tableHeaderBox}>
                                <div className={styles.tableHeaderItem}
                                     style={{width:8+'%'}}>序号</div>
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
                                    dataenter.map((value, key)=> {
                                        num++;
                                        if(pageSize*(page-1)<=key&&key<(pageSize*(page-1)+pageSize)){
                                            return (
                                                <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                    <input className={styles.tableContentItem}
                                                           style={{width:8+"%"}}
                                                           readOnly="true" value={num}/>
                                                    {
                                                        value.map((valueC, keyC)=> {
                                                            if(keyC==2){
                                                                return(
                                                                    <div className={styles.tableContentItemm} style={{width:arr2[keyC]+'%'}}>
                                                                        <input className={styles.tableContentItem}
                                                                               style={{width:60+'%'}}
                                                                               key={keyC} contentEditable="true"
                                                                               onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                               value={valueC}/>
                                                                        <span>年</span>

                                                                    </div>

                                                                )
                                                            }
                                                            if(keyC==3){
                                                                return(
                                                                    <div className={styles.tableContentItemm} style={{width:arr2[keyC]+'%'}}>
                                                                        <input className={styles.tableContentItem}
                                                                               style={{width:60+'%'}}
                                                                               key={keyC} contentEditable="true"
                                                                               onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                               value={valueC}/>
                                                                        <span>月</span>

                                                                    </div>

                                                                )
                                                            }
                                                            else {
                                                                return(
                                                                    <input className={styles.tableContentItem}
                                                                           style={{width:arr2[keyC]+'%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                           value={valueC}/>
                                                                )
                                                            }


                                                        })
                                                    }
                                                    <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                        <img src={save} onClick={(e)=>addDate(key,newData)}/>
                                                    </div>
                                                    <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                        <img src={del} onClick={(e)=>deleData(key,dataenter)}/>
                                                    </div>
                                                </div>
                                            )}
                                    })
                                }
                            </div>






                        </div>



                    </div>
                    <div className={styles.buttonss}>
                        <span  className={styles.first} onClick={()=>theone(page)}>首页</span>
                        <span className={styles.first}  onClick={()=>lastpage(page)}>上一页</span>
                        <span className={styles.first}>{page}/{Math.ceil(comp.data.content.length/pageSize)}</span>
                        <span className={styles.first} onClick={()=>nextpage(page)}>下一页</span>
                        <span className={styles.first} onClick={()=>thelast(page)}>末页</span>
                    </div>

                </div>
            );}else{return(<Login></Login>)}


    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
        page: state.vars.page1,
        dataenter: state.vars.dataenter,
        wfidCount:state.vars.wfidCount,
        wtidAll: state.objs.wtidAll,
        boll: state.vars.boll,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {
            var obj = {
                test: ''
            }
            alert("准备获取数据")
            dispatch(actions.setVars('page1', 1));


            $.ajax({
                url: soam+'/info/getWfcosts',
                type: 'post',
                data:{
                    "curpage": 1,
                    "pageSize": pageSize,

                },
                dataType: 'json',//here,
                timeout:'3000',
                success:function (data) {

                    let dataenter=[];
                    let group0=[];
                    let wf0=[];
                    let cost0=[];
                    let remark0=[];
                    let month3=[];
                    let thYear3=[];
                    for(var i in data.data.pagedata){
                        group0.push(data.data.pagedata[i].groupname);
                        wf0.push(data.data.pagedata[i].wfname);
                        cost0.push(data.data.pagedata[i].cost);
                        remark0.push(data.data.pagedata[i].remark);
                        thYear3.push(data.data.pagedata[i].startdate.substring(6,10));
                        month3.push(data.data.pagedata[i].startdate.substring(3,5));
                    }
                    for(var j=0;j<group0.length;j++){
                        dataenter.push([group0[j],wf0[j],thYear3[j],month3[j],cost0[j],remark0[j]]);
                    }

                    dispatch(actions.setVars('dataenter', dataenter));
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                    getwtid()
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            function getwtid() {
                $.ajax({
                    url: 'http://10.9.99.68:8080/soam/wf/getAll',
                    type: 'post',
                    dataType: 'json',//here,
                    success: function (data) {

                        dispatch(actions.setObjs('wtidAll', data));
                        dispatch(actions.setVars('boll', true));
                    },
                    error: function () {
                        console.log('获取数据失败')
                    }
                });
            }
        },
        init: () => {

            var obj = {
                test: ''
            }
            dispatch(actions.setObjs('tableContent', obj));
        },
        buttonAction (sit){
            // 获取select 选择的内容
            var tContent = $('#textContent5')[0].value;
            var tContent1 = $('#textContent6')[0].value;
            dispatch(actions.setVars('page1', 1));
            dispatch(actions.setVars('years', tContent));
            dispatch(actions.setVars('wfids', tContent1));

            $.ajax({
                url: soam+'/info/getWfcosts',
                type: 'post',
                data:'pageSize='+pageSize+'&&curpage='+page+'&&year='+tContent+'&&wfids='+tContent1,
                dataType: 'json',//here,
                success:function (data) {

                    let dataenter=[];
                    let group0=[];
                    let wf0=[];
                    let cost0=[];
                    let remark0=[];
                    let month3=[];
                    let thYear3=[];
                    for(var i in data.data.pagedata){
                        group0.push(data.data.pagedata[i].groupname);
                        wf0.push(data.data.pagedata[i].wfname);
                        cost0.push(data.data.pagedata[i].cost);
                        remark0.push(data.data.pagedata[i].remark);
                        thYear3.push(data.data.pagedata[i].startdate.substring(6,10));
                        month3.push(data.data.pagedata[i].startdate.substring(3,5));
                    }
                    for(var j=0;j<group0.length;j++){
                        dataenter.push([group0[j],wf0[j],thYear3[j],month3[j],cost0[j],remark0[j]]);
                    }

                    dispatch(actions.setVars('dataenter', dataenter));
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
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
        addData:(i,page,dataenter) => {

            let tableV = _.clone(getState().objs.tableContent);
            dataenter.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
            page=Math.ceil(dataenter.length/16);
            dispatch(actions.setVars('page1', page));
        },
        addDate:(li)=>{
            let tableV = _.clone(getState().objs.tableContent);
            let wfs=tableV.data.pagedata[li];
            let ddv;
            ddv=JSON.stringify(wfs);
            console.log(wfs,ddv);
            $.ajax({
                url: soam+'/info/getUpdateOneWfcost',
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
                url: soam+'/info/getUpdateWfcost',
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
        deleData:(j,dataenter) => {

            let uuid=tableV.data.pagedata[j].uuid;
            if( uuid==undefined) {
                let tableV = _.clone(getState().objs.tableContent);
                dataenter.splice(j,1);
            }
            console.log(uuid)
            console.log(tableV)
            console.log(j)
            dispatch(actions.setObjs('tableContent', tableV));
            $.ajax({
                url: soam+'/info/getDeleteWfcost',
                type: 'post',
                data:{
                    "uuid":uuid,
                },
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data)

                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        lastpage:(page)=>{
            page>1 ? page--:page;
            dispatch(actions.setVars('page1', page));
        },
        nextpage:(page)=>{
            (page<(comp.data.content.length/16)) ? page++:page;
            dispatch(actions.setVars('page1', page));

        },
        theone :(page)=>{
            page=1;
            dispatch(actions.setVars('page1', page));
        },
        thelast :(page)=>{
            page=comp.data.content.length/16;
            dispatch(actions.setVars('page1', page));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
