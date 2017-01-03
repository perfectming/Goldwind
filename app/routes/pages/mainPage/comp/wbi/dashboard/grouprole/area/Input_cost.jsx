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
let month4=[1,2,3,4,5,6,7,8,9,10,11,12];
let group0=comps.data.group0;
let pageSize=16;//设置每页的条目数量
let page=1;//设置初始页码
let thDate=new Date();
let thYear=thDate.getFullYear();
let month2=thDate.getMonth();
let soam='http://10.68.100.32:8080/wbi';//设置接口
for(let i=0;i<=30;i++){
    yeares.push(thYear-15+i)
}
let newData={};

let pagingOptions = {
    showNumber: 3
}
let arr1=['groupid','wfid','year','month','cost','remark'];
for(let i=0;i<arr1.length;i++){
    newData[arr1[i]]='';
}
newData['datetype']=1;
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
        let {deleData,deleDate,addData,wfidCount,addDate,table,year,wtidAll,groupAll,saveTableItem, changeTableItem1,page,nextPage,lastPage,theOne,years=2016,theLast,dataenter,buttonAction,boll=false} = this.props;

        //
        let num=0;


        if (boll){//判断数据是否存在



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
                            <img src={add} onClick={()=>addData(newData,page)}/>
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
                                    table.data.pagedata.map((value, key)=> {
                                        num++;
                                        if(pageSize*(page-1)<=key&&key<(pageSize*(page-1)+pageSize)){

                                            if(key<wfidCount/1){
                                            return (
                                                <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                    <input className={styles.tableContentItem}
                                                           style={{width:8+"%"}}
                                                           readOnly="true" value={num}/>
                                                    {
                                                        arr1.map((valueC, keyC)=> {
                                                            if(keyC==0){
                                                                return(

                                                                    <input className={styles.tableContentItem}
                                                                           style={{width:arr2[keyC]+'%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                           value={value['groupname']}/>


                                                                )
                                                            }
                                                            if(keyC==1){
                                                                return(

                                                                        <input className={styles.tableContentItem}
                                                                               style={{width:arr2[keyC]+'%'}}
                                                                               key={keyC} contentEditable="true"
                                                                               onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                               value={value['wfname']}/>


                                                                )
                                                            }
                                                            if(keyC==2){
                                                                return(
                                                                    <div className={styles.tableContentItemm} style={{width:arr2[keyC]+'%'}}>
                                                                        <input className={styles.tableContentItem}
                                                                               style={{width:60+'%'}}
                                                                               key={keyC} contentEditable="true"
                                                                               onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                               value={value["startdate"].substring(6,10)}/>
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
                                                                               value={value['startdate'].substring(3,5)}/>
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
                                                                           value={value[valueC]}/>
                                                                )
                                                            }


                                                        })
                                                    }
                                                    <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                        <img src={save} onClick={(e)=>saveTableItem(key,)}/>
                                                    </div>
                                                    <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                        <img src={del} onClick={(e)=>deleData(key,)}/>
                                                    </div>
                                                </div>
                                            )}else {
                                                return (
                                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                        <input className={styles.tableContentItem}
                                                               style={{width:8+"%"}}
                                                               readOnly="true" value={num}/>
                                                        {
                                                            arr1.map((valueC, keyC)=> {
                                                                if(keyC==0){
                                                                    return(
                                                                        <select className={styles.tableContentItemm}
                                                                                style={{width:arr[keyC]+"%"}} key={keyC}
                                                                                onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}>
                                                                            {group0.map((value, key)=> {
                                                                                return (
                                                                                    <option className={styles.tableContentItem}  value={value.groupid} key={key}>{value.groupname}</option>
                                                                                )
                                                                            })
                                                                            }
                                                                        </select>
                                                                    )
                                                                }
                                                                if(keyC==1){
                                                                    return(
                                                                        <select className={styles.tableContentItemm}
                                                                                style={{width:arr[keyC]+"%"}} key={keyC}
                                                                                onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}>
                                                                            {wtidAll.data.map((value, key)=> {
                                                                                return (
                                                                                    <option className={styles.tableContentItem}  value={value.wfid} key={key}>{value.wfname}</option>
                                                                                )
                                                                            })
                                                                            }
                                                                        </select>
                                                                    )
                                                                }
                                                                if(keyC==2){
                                                                    return(
                                                                        <div className={styles.tableContentItemm} style={{width:arr2[keyC]+'%'}}>
                                                                            <select className={styles.tableContentItemm}
                                                                                    onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                                    style={{width:60+'%'}}>
                                                                                {yeares.map((value, key)=> {
                                                                                    return (
                                                                                        <option value={value} className={styles.tableContentItem} key={key}>{value}</option>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </select>
                                                                            <span>年</span>

                                                                        </div>

                                                                    )
                                                                }
                                                                if(keyC==3){
                                                                    return(
                                                                        <div className={styles.tableContentItemm} style={{width:arr2[keyC]+'%'}}>
                                                                            <select className={styles.tableContentItemm}
                                                                                    onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                                    style={{width:60+'%'}}>
                                                                                {month4.map((value, key)=> {
                                                                                    return (
                                                                                        <option value={value} className={styles.tableContentItem} key={key}>{value}</option>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </select>
                                                                            <span>月</span>

                                                                        </div>

                                                                    )
                                                                }
                                                                else {
                                                                    return(
                                                                        <input className={styles.tableContentItem}
                                                                               style={{width:arr2[keyC]+'%'}}
                                                                               key={keyC} contentEditable="true"
                                                                               onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}
                                                                               value={value[valueC]}/>
                                                                    )
                                                                }


                                                            })
                                                        }
                                                        <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                            <img src={save} onClick={(e)=>saveTableItem(key,value,wtidAll,groupAll)}/>
                                                        </div>
                                                        <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                            <img src={del} onClick={(e)=>deleDate(key,)}/>
                                                        </div>
                                                    </div>
                                                )

                                            }


                                            }

                                    })
                                }
                            </div>






                        </div>



                    </div>
                    <div className={styles.buttonss}>
                        <span  className={styles.first} onClick={()=>theOne(page,years,)}>首页</span>
                        <span className={styles.first}  onClick={()=>lastPage(page,years,)}>上一页</span>
                        <span className={styles.first}>{page+"/"+Math.ceil(table.data.pagedata.length/pageSize)}</span>
                        <span className={styles.first} onClick={()=>nextPage(page,table.data.totalRecord,pageSize,years,)}>下一页</span>
                        <span className={styles.first} onClick={()=>theLast(page,table.data.totalRecord,pageSize,years,)}>末页</span>
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
        groupAll: state.objs.groupAll,
        boll: state.vars.boll,
        years:state.vars.years
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
              //  timeout:'3000',
                success:function (data) {
                    console.log(data)
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                    getgroupid()
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            function getgroupid() {
                $.ajax({
                    url: soam+'/BaseData/getGroup',
                    type: 'post',
                    dataType: 'json',//here,
                    success: function (data) {
                        console.log(data)
                        dispatch(actions.setObjs('groupAll', data));

                        getwtid()
                    },
                    error: function () {
                        console.log('获取数据失败')
                    }
                });
            }
            function getwtid() {
                $.ajax({
                    url: 'http://10.68.100.32:8080/soam/wf/getAll',
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
                    console.log(data)
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
            tableV.data.pagedata[i][arr1[j]] = value;
            console.log(tableV.data.pagedata[i][arr1[j]]);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        addData:(i,page) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
            page=Math.ceil(tableV.data.pagedata.length/16);
            dispatch(actions.setVars('page1', page));

        },
        saveTableItem:(li,dis,wtid,groupname)=>{
            console.log(wtid)
            let tableV = _.clone(getState().objs.tableContent);
            let wfs=tableV.data.pagedata[li];
            wtid.data.map((value,key)=>{
                (value.wfid==wfs.wfid) && (wfs['wfname']=value.wfname);
            });
            wfs['groupname']=groupname.data[wfs.groupid]
            //wfs.push({groupname:"巴盟"});
            console.log(wfs);
            let ddv=JSON.stringify(wfs);

            $.ajax({
                url: soam+'/info/getSaveWfcost',
                type: 'post',
                data: {
                    ddv,
                   // "month":month2+1,
                   // "year": thYear,
                },
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function (data) {
                console.log(data)
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });

        },
        deleData:(j,) => {
            let tableV = _.clone(getState().objs.tableContent);
            let uuid=tableV.data.pagedata[j].uuid;


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
            $.ajax({
                url: soam+'/info/getWfcosts',
                type: 'post',
                data:{
                    "curpage": 1,
                    "pageSize": pageSize,
                },
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data)
                    dispatch(actions.setObjs('tableContent', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
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
                url: soam+'/info/getWfcosts',
                type: 'post',
                data:'pageSize='+pageSize+'&&curPage='+page+'&&year='+years,
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
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam+'/info/getWfcosts',
                type: 'post',
                data:'pageSize='+pageSize+'&&curPage='+page+'&&year='+years,
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data.data.pagedata.length)
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
                url: soam+'/info/getWfcosts',
                type: 'post',
                data:'pageSize='+pageSize+'&&curPage='+page+'&&year='+years,
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
                url: soam+'/info/getWfcosts',
                type: 'post',
                data:'pageSize='+pageSize+'&&curPage='+page+'&&year='+years,
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
