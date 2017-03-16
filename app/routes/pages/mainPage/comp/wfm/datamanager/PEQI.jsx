import React from 'react';//计划电量录入，含有翻页，增删改查等功能
import {connect} from 'react-redux';
import styles from './PEQI.scss';
import save from '../../../img/comp/save.png';
import del from '../../../img/icon/tabDel.png';
import refresh from '../../../img/comp/refresh.png';
import add from '../../../img/icon/tabAdd.png';
import AlertWindow from '../report/AlertWindow.jsx';//提示框
import api from '../../../../../../lib/apiClient';
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
let soam=require('../../urlData').soam1;//设置接口
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
    render() {//j为删除传递参数
        let {j,deleteBool=true,buttonConcel,buttonClose,alertText,checkDate,skinStyle,userNameT,init,wfidCount,wtidAll,theOne,lastPage,nextPage,theLast,page=1,saveTableItem,buttonAction,deleData,deleDate,addData,addDate,table,years,changeTableItem1,wfids} = this.props;
        let newData={};
        let num=0;
        //console.log(wfidCount);
        let arr=[16,16,16,16,16,10];
        for(let i=0;i<arr1.length;i++){
            newData[arr1[i]]='';
        }
        newData['datetype']=1;
        if (table && wtidAll && table.data){//判断数据是否存在
            return (
                <div className={skinStyle==1?styles.powerBoxBlue:(skinStyle==2?styles.powerBoxWhite:styles.powerBox)}>
                    <AlertWindow text={alertText}></AlertWindow>
                    <div className={deleteBool==true? styles.hideBox:styles.container}>
                        <div className={styles.alertBox}>
                            <div className={styles.header}>提示<span className={styles.clickBox} onClick={()=>buttonConcel(deleteBool)}>×</span></div>
                            <div className={styles.warning}>确定删除数据吗？点击关闭可取消</div>
                            <div className={styles.close}><span onClick={()=>buttonClose(deleteBool,j)}>确定</span></div>
                        </div>
                    </div>

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
        table: state.objs.tableContentJy,
        page: state.vars.page2,
        skinStyle:state.vars.skinStyle,
        userNameT: state.vars.userNameT,
        wtidAll: state.objs.wtidAll1,
        wfidCount:state.vars.wfidCount1,
        wfids:state.vars.wfids1,
        years:state.vars.years,
        alertText : state.vars.alertText1,//提示框文字
        deleteBool : state.vars.deleteBool1,//是否删除
        j : state.vars.j,//删除操作的参数
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('wfids1', null));
            dispatch(actions.setVars('years', null));
            dispatch(actions.setVars('page2', 1));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage='+1+'&&year=&&wfids=',
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data.data.pagedata.length);
                    dispatch(actions.setObjs('tableContentJy', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
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
                    //console.log(data);
                    dispatch(actions.setObjs('wtidAll1', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        checkDate(value,newData,key,keyC){

            let dialog=value.slice(0,8)+'01';
            let tableV = _.clone(getState().objs.tableContentJy);
            let yearDate=value.slice(0,4);//输入年份
            let monthDate=value.slice(5,7);//输入月份
            let myDate = new Date();
            let yearDateNow=myDate.getFullYear(); //获取当前年份
            let monthDateNow=myDate.getMonth()+1;//获取当前月份

            let numDate=value.slice(8,10);
            if(numDate!=='01'){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText1', '系统默认开始时间为每月的第一天'));
            }
            tableV.data.pagedata[key][keyC]=dialog;
            dispatch(actions.setObjs('tableContentJy', tableV));
        },
        checkNewDate(value,newData,key,keyC){
            let dialog=value.slice(0,8)+'01';
            let tableV = _.clone(getState().objs.tableContentJy);
            //console.log(dialog);
            dispatch(actions.setVars('alertBool', false));
            dispatch(actions.setVars('alertText1', '开始时间为每月的第一天')); 
            tableV.data.pagedata[key][keyC]=dialog;
            dispatch(actions.setObjs('tableContentJy', tableV));


        },
        buttonAction (sit){
            // 获取select 选择的内容
            var tContent = $('#textContent5')[0].value;
            var tContent1 = $('#textContent6')[0].value;
            dispatch(actions.setVars('page2', 1));
            dispatch(actions.setVars('years', tContent));
            dispatch(actions.setVars('wfids1', tContent1));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage='+1+'&&year='+tContent+'&&wfids='+tContent1,
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentJy', data));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败')); 
                }
            });
        },
        saveTableItem:(line)=> {//更改
            let tableV = _.clone(getState().objs.tableContentJy);
            let horizon = _.clone(getState().vars.userNameT);
            let asd = tableV.data.pagedata[line];
            let wfp;
            asd['operator'] = horizon;
            if (asd.planelec / 1){
                wfp = JSON.stringify(asd);
            $.ajax({
                url: soam + '/ELEC/uppWfelec?newwfp=data',
                type: 'post',
                data: wfp,
                dataType: 'json',//here,
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    //console.log(data);
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '保存成功'));
                    $.ajax({
                        url: soam + '/ELEC/getWfelec',
                        type: 'post',
                        data: 'pageSize=' + pageSize + '&&nowPage=1',
                        dataType: 'json',//here,
                        success: function (data) {
                            dispatch(actions.setObjs('tableContentJy', data));
                        },
                        error: function () {
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText1', '获取数据失败'));
                        }
                    });
                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });
        }else{
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText1', '计划电量为具体数值'));
            }
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContentJy);
            tableV.data.pagedata[i][arr1[j]] = value;
            //console.log(tableV.data.pagedata[i][arr1[j]]);
            dispatch(actions.setObjs('tableContentJy', tableV));
        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContentJy);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContentJy', tableV));
        },
        addDate:(li)=>{//添加
            let tableV = _.clone(getState().objs.tableContentJy);
            let horizon = _.clone(getState().vars.userNameT);
            let wfs=tableV.data.pagedata[li];
            (wfs.wfid==='') && (wfs.wfid='150801');
            let ddv;
            wfs['operator']=horizon;
            ddv=JSON.stringify(wfs);
            $.ajax({
                url: soam+'/ELEC/addWfelec?wfp=data',
                type: 'post',
                data: ddv,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function (data) {
                    console.log(data);
                    if (data.data){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '添加成功'));
                    }else {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText1', '添加失败，该数据已存在'));
                    }
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                    dispatch(actions.setObjs('tableContentJy', data));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });
        },
        //删除
        buttonClose:(deleteBool,j) => {
            dispatch(actions.setVars('deleteBool1', true));
            let tableV = _.clone(getState().objs.tableContentJy);
            let fid=tableV.data.pagedata[j]['wfid'];
            let rection=tableV.data.pagedata[j]['rectime'];
            let daytype=tableV.data.pagedata[j]['datetype'];
            //console.log('wfid='+fid+'&rectime='+rection+'&datetype='+daytype);
            $.ajax({
                url: soam+'/ELEC/delWfelec',
                type: 'post',
                data:'wfid='+fid+'&rectime='+rection+'&datetype='+daytype,
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '删除成功'));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data.data.pagedata.length);
                    dispatch(actions.setObjs('tableContentJy', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            })
        },
        buttonConcel:(deleteBool) => {
            dispatch(actions.setVars('deleteBool1', true));
        },
        deleData:(j) => {
            dispatch(actions.setVars('deleteBool1', false));
            dispatch(actions.setVars('j', j));
        },
        deleDate:(j) => {
            let tableV = _.clone(getState().objs.tableContentJy);
            tableV.data.pagedata.splice(j,1);
            dispatch(actions.setObjs('tableContentJy', tableV));
        },
        lastPage:(page,years,wfids)=>{//上一页
            page>1 ? page--:page;
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data)
                    dispatch(actions.setObjs('tableContentJy', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });
        },
        nextPage:(page,i,j,years,wfids)=>{//下一页
            (page<Math.ceil(i/j)) ? page++:page;
            //console.log(page,years,wfids);
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data.data.pagedata.length);
                    dispatch(actions.setObjs('tableContentJy', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });

        },
        theOne :(page,years,wfids)=>{//首页
            page=1;
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data)
                    dispatch(actions.setObjs('tableContentJy', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });
        },
        theLast :(page,i,j,years,wfids)=>{//末页
            page=Math.ceil(i / j);
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:{pageSize:pageSize,nowPage:page,year:years,wfids:wfids},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data)
                    dispatch(actions.setObjs('tableContentJy', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText1', '获取数据失败'));
                }
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
