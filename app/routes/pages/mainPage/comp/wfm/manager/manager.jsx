import React from 'react';//计划电量录入，含有翻页，增删改查等功能
import {connect} from 'react-redux';
import styles from './manager.scss';
import save from '../../../img/comp/save.png';
import del from '../../../img/icon/tabDel.png';
import refresh from '../../../img/comp/refresh.png';
import add from '../../../img/icon/tabAdd.png';
import AlertWindow from '../report/AlertWindow.jsx';//提示框
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
let arr1=['wfid','wfleader','mobile','telephone'];//设置每列的属性
let comp = comps.manager.table;
let Component = React.createClass({
    componentDidMount() {
        this.props.init(page);
    },
    render() {//j为删除传递参数
        let {j,deleteBool=true,buttonConcel,buttonClose,alertText,skinStyle,init,wfidCount,wtidAll,theOne,lastPage,nextPage,theLast,page=1,saveTableItem,deleData,deleDate,addData,addDate,table,changeTableItem1} = this.props;
        let newData={};
        let num=0;
        //console.log(wfidCount);
        let arr=[16,16,16,16,16,10];
        for(let i=0;i<arr1.length;i++){
            newData[arr1[i]]='';
        }
        console.log(wfidCount)
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
                    <div className={styles.table}>
                        <div className={styles.actionBox}>
                            <img src={refresh} onClick={()=>init()}/>
                            <img src={add} onClick={()=>addData(newData)}/>
                        </div>
                        <div className={styles.tableBox}>
                            <div className={styles.tableHeaderBox}>
                                <div className={styles.tableHeaderItem}
                                     style={{width:20+"%"}}>序 号</div>
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
                                                           style={{width:20+"%"}}
                                                           readOnly="true" value={num}/>
                                                    {
                                                        arr1.map((valueC, keyC)=> {
                                                            if(keyC==0){
                                                                return (
                                                                    <div className={styles.tableContentItem}
                                                                         style={{width:arr[keyC]+"%"}} key={keyC}>
                                                                        {value['wfname']}
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
                                                    <div className={styles.tableContentItem} style={{width:8+"%"}}>
                                                        <img src={save} onClick={(e)=>saveTableItem(key,wtidAll)}/>
                                                    </div>
                                                    <div className={styles.tableContentItem} style={{width:8+"%"}}>
                                                        <img src={del} onClick={(e)=>deleData(key)}/>
                                                    </div>
                                                </div>
                                            )}else {
                                            return(
                                                <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                    <input className={styles.tableContentItem}
                                                           style={{width:20+"%"}}
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
                                                            }else{
                                                                return (
                                                                    <input className={styles.tableContentItem}
                                                                           style={{width:arr[keyC]+"%"}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e)=>changeTableItem1(e.target.value,newData,key,keyC)}/>
                                                                )}
                                                        })
                                                    }
                                                    <div className={styles.tableContentItem} style={{width:8+"%"}}>
                                                        <img src={save} onClick={(e)=>addDate(key,wtidAll)}/>
                                                    </div>
                                                    <div className={styles.tableContentItem} style={{width:8+"%"}}>
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
                        <span onClick={()=>theOne(page)}>首页</span>
                        <span onClick={()=>lastPage(page)}>上一页</span>
                        <span>{page+"/"+table.data.totalPage}</span>
                        <span onClick={()=>nextPage(page,table.data.totalRecord,pageSize)}>下一页</span>
                        <span onClick={()=>theLast(page,table.data.totalRecord,pageSize)}>末页</span>
                    </div>
                </div>
            );}else{return(<div></div>)}
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContentMan,
        page: state.vars.page2,
        skinStyle:state.vars.skinStyle,
        wtidAll: state.objs.wtidAll1,
        wfidCount:state.vars.wfidCount1,
        alertText : state.vars.alertTextMan,//提示框文字
        deleteBool : state.vars.deleteBoolMan,//是否删除
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
                url: soam+'/wcc/getWfcontacterList',
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContentMan', data));
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
        saveTableItem:(line,wtAll)=> {//更改
            let mobile = /^1\d{10}$/;
            let telephone = /^[0-9]*$/;
            let tableV = _.clone(getState().objs.tableContentMan);
            let asd = tableV.data.pagedata[line];
            wtAll.data.map((value, key)=> {
                (asd.wfid == value.wfid) && (asd.wfname = value.wfname)
            });
            if ((!mobile.test(asd.mobile)) && (asd.mobile)) {
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertTextMan', '请输入正确的手机号码'));
                tableV.data.pagedata[line]['mobile'] = '';
                dispatch(actions.setObjs('tableContentMan', tableV));
            } else if (!telephone.test(asd.telephone)) {
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertTextMan', '请输入正确的电话号码'));
                tableV.data.pagedata[line]['telephone'] = '';
                dispatch(actions.setObjs('tableContentMan', tableV));
            } else{
                let wfp;
                wfp = JSON.stringify(asd);
                $.ajax({
                    url: soam + '/wcc/update?wfcontacterInfo=data',
                    type: 'post',
                    data: wfp,
                    dataType: 'json',//here,
                    contentType: 'application/json;charset=UTF-8',
                    success: function (data) {
                        //console.log(data);
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertTextMan', '保存成功'));
                        $.ajax({
                            url: soam + '/wcc/getWfcontacterList',
                            type: 'post',
                            dataType: 'json',//here,
                            success: function (data) {
                                dispatch(actions.setObjs('tableContentMan', data));
                                dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                            },
                            error: function () {
                                dispatch(actions.setVars('alertBool', false));
                                dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                            }
                        });
                    },
                    error: function () {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                    }
                });
            }
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContentMan);
            tableV.data.pagedata[i][arr1[j]] = value;
            //console.log(tableV.data.pagedata[i][arr1[j]]);
            dispatch(actions.setObjs('tableContentMan', tableV));
        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContentMan);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContentMan', tableV));
        },
        addDate:(li,wtAll)=> {//添加
            let mobile = /^1\d{10}$/;
            let telephone = /^[0-9]*$/;
            let tableV = _.clone(getState().objs.tableContentMan);
            let wfs = tableV.data.pagedata[li];
            (wfs.wfid === '') && (wfs.wfid = '150801');
            if(!mobile.test(wfs.mobile) && wfs.mobile){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertTextMan', '请输入正确的手机号码'));
                tableV.data.pagedata[li]['mobile'] = '';
                dispatch(actions.setObjs('tableContentMan', tableV));
            }else if(!telephone.test(wfs.telephone)){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertTextMan', '请输入正确的电话号码'));
                tableV.data.pagedata[li]['telephone'] = '';
                dispatch(actions.setObjs('tableContentMan', tableV));
            }else{
                $.ajax({
                    url: soam + '/wcc/getOneWcontacterByWfid?wfid=' + wfs.wfid,
                    type: 'post',
                    dataType: 'json',//here,
                    success: function (data) {
                        if (data.data) {
                            wtAll.data.map((value, key)=> {
                                (wfs.wfid == value.wfid) && (wfs.wfname = value.wfname)
                            });
                            console.log(wfs);
                            let ddv;
                            ddv = JSON.stringify(wfs);
                            $.ajax({
                                url: soam + '/wcc/addWfcontacter?wfcontacterInfo=data',
                                type: 'post',
                                data: ddv,
                                dataType: 'json',//here,
                                contentType: 'application/json;charset=UTF-8',
                                success: function (data) {
                                    console.log(data);
                                    if (data.data) {
                                        dispatch(actions.setVars('alertBool', false));
                                        dispatch(actions.setVars('alertTextMan', '添加成功'));
                                    } else {
                                        dispatch(actions.setVars('alertBool', false));
                                        dispatch(actions.setVars('alertTextMan', '添加失败，该数据已存在'));
                                    }
                                    $.ajax({
                                        url: soam + '/wcc/getWfcontacterList',
                                        type: 'post',
                                        dataType: 'json',//here,
                                        success: function (data) {
                                            dispatch(actions.setObjs('tableContentMan', data));
                                            dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                                        },
                                        error: function () {
                                            dispatch(actions.setVars('alertBool', false));
                                            dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                                        }
                                    });
                                },
                                error: function () {
                                    dispatch(actions.setVars('alertBool', false));
                                    dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                                }
                            });
                        } else {
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertTextMan', '该数据已存在'));
                        }
                    },
                    error: function () {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                    }
                });
            }
        },
        //删除
        buttonClose:(deleteBool,j) => {
            dispatch(actions.setVars('deleteBoolMan', true));
            let tableV = _.clone(getState().objs.tableContentMan);
            let fid=tableV.data.pagedata[j]['wfid'];
            //console.log('wfid='+fid+'&rectime='+rection+'&datetype='+daytype);
            $.ajax({
                url: soam+'/wcc/delete',
                type: 'post',
                data:'wfid='+fid,
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertTextMan', '删除成功'));
                    $.ajax({
                        url: soam+'/wcc/getWfcontacterList',
                        type: 'post',
                        dataType: 'json',//here,
                        success:function (data) {
                            dispatch(actions.setObjs('tableContentMan', data));
                            dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                        },
                        error:function(){
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                        }
                    });
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                }
            });

        },
        buttonConcel:(deleteBool) => {
            dispatch(actions.setVars('deleteBoolMan', true));
        },
        deleData:(j) => {
            dispatch(actions.setVars('deleteBoolMan', false));
            dispatch(actions.setVars('j', j));
        },
        deleDate:(j) => {
            let tableV = _.clone(getState().objs.tableContentMan);
            tableV.data.pagedata.splice(j,1);
            dispatch(actions.setObjs('tableContentMan', tableV));
        },
        lastPage:(page)=>{//上一页
            page>1 ? page--:page;
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/wcc/getWfcontacterList',
                type: 'post',
                data:{curPage:page},
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContentMan', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                }
            });
        },
        nextPage:(page,i,j)=>{//下一页
            (page<Math.ceil(i/j)) ? page++:page;
            //console.log(page,years,wfids);
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/wcc/getWfcontacterList',
                type: 'post',
                data:{curPage:page},
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContentMan', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                }
            });

        },
        theOne :(page)=>{//首页
            page=1;
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/wcc/getWfcontacterList',
                type: 'post',
                data:{curPage:page},
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContentMan', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                }
            });
        },
        theLast :(page,i,j)=>{//末页
            page=Math.ceil(i / j);
            dispatch(actions.setVars('page2', page));
            $.ajax({
                url: soam+'/wcc/getWfcontacterList',
                type: 'post',
                data:{curPage:page},
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContentMan', data));
                    dispatch(actions.setVars('wfidCount1', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertTextMan', '获取数据失败'));
                }
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
