import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('redux/store');
var actions = require('redux/actions');
var $ =require('jquery');
import styles from './Amm.scss';
let pageSize=10;
// onClick={()=>jump(value['id'])}
import AlertWindow from '../../wbi/KPI/AlertWindow.jsx';//提示框
import save from '../../../img/comp/save.png';
import refresh from '../../../img/comp/refresh.png';
import del from '../../../img/icon/tabDel.png';
import add from '../../../img/icon/tabAdd.png';
import _ from 'lodash';
import Login from '../../../../../../components/common/Loading.jsx';
import Ambox from './boxAm.jsx';
import Load from './load';
let soam='http://10.68.100.32:8080/soam';
let tabaleData = require('./data');
let arr=['id','name','loginname','password','phonecode','mailbox','logintype','dogcode','remark','roleids'];
let logintypeArr=['密码验证','手机验证','加密狗验证'];
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {//j,k为删除弹窗传递参数
        let {j,k,deleteBool=true,buttonConcel,buttonClose,alertText,skinStyle,saveDataAmm,page,uName,lastPage,nextPage,theOne,theLast,init,checkId,checkName,addDate,deleDate,ammCount,boxData,jump,deleData,addData,buttonAction, inputOnChange, onFocus,table, changeTableItem} = this.props;
        let newData={};
        let num=0;
        for(let i=0;i<arr.length-1;i++){
            newData[arr[i]]='';
        }
        let comp=tabaleData.comps.from;
        if(table&&boxData){
        return (
        <div className={skinStyle==1?styles.bodyBoxBlue:(skinStyle==2?styles.bodyBoxWhite:styles.bodyBox)}>
            <Load></Load>
            <AlertWindow text={alertText}></AlertWindow>

            <div className={deleteBool==true? styles.hideBox:styles.container}>
                <div className={styles.alertBox}>
                    <div className={styles.header}>提示<span className={styles.clickBox} onClick={()=>buttonConcel(deleteBool)}>×</span></div>
                    <div className={styles.warning}>确定删除数据吗？点击关闭可取消</div>
                    <div className={styles.close}><span onClick={()=>buttonClose(deleteBool,j,k)}>确定</span></div>
                </div>
            </div>

            <div className={styles.roleputBox}>
                <div className={styles.inquireBox}>
                    {
                        comp.map((value, key)=> {
                            if (key == 5) {
                                return (
                                    <div className={styles.inputBox} key={key}>
                                        <span>{comp[key].valueName}</span>
                                        <input id={'textContent'+key} placeholder={value.content}
                                               onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                               onFocus={()=>onFocus} style={{width:value.width}}/>
                                    </div>
                                )
                            }else if (value.type === 'button') {
                                return (
                                    <div className={styles.btnBox} key={key}>
                                        <button onClick={()=>{buttonAction()}}>{value.title}</button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className={styles.actionBox}>
                    <img src={refresh} onClick={()=>init()}/>
                    <img src={add} onClick={()=>addData(newData)}/>
                </div>
                <div className={styles.tableBox}>
                    <div className={styles.tableHeaderBox}>
                        <div className={styles.tableHeaderItem}
                             style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}>序 号</div>
                        {
                            tabaleData.ammData.header.map((value, key)=> {
                                return (
                                    <div className={styles.tableHeaderItem}
                                         style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}} key={key}>{value}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.tableContentBox}>
                        {
                            table.data.pagedata.map((value, key)=> {
                                num++;
                                if(key<ammCount/1){
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        <input className={styles.tableContentItem}
                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                               readOnly="true" value={num}/>
                                        {
                                            arr.map((valueC, keyC)=> {
                                                if(keyC<2){
                                                    return(
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                               key={keyC} contentEditable="true" readOnly="readOnly"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={value[valueC]}/>
                                                    )
                                                }else if (valueC=='logintype'){
                                                    return (
                                                        <select className={styles.tableContentItem} key={keyC}
                                                                onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                type="button">
                                                            {
                                                                logintypeArr.map((valueD,keyD)=>{
                                                                return(
                                                                    < option className={styles.opt} name={value[valueC]==keyD?"selectOpt":'seleOpt'} value={keyD} key={keyD}>{valueD}</option>
                                                                )
                                                                })
                                                            }
                                                        </select>
                                                    )
                                                }else if (valueC=='password'){
                                                    return(
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={value[valueC]} type="password"/>
                                                    )
                                                }else if (valueC=='roleids'){
                                                    return (
                                                        <input className={styles.tableContentItem} key={keyC}
                                                           style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                               onClick={()=>jump(value['id'])}
                                                           type="button" value='设置'/>
                                                    )
                                                }else {
                                                    return(
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={value[valueC]}/>
                                                    )
                                                }
                                            })
                                        }
                                        <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                            <img style={{cursor:'pointer'}} src={save} onClick={()=>saveDataAmm(key)}/>
                                        </div>
                                        <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                            <img style={{cursor:'pointer'}} src={del} onClick={(e)=>deleData(key,value.id)}/>
                                        </div>
                                    </div>
                                )}else {
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <input className={styles.tableContentItem}
                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                   readOnly="true" value={num}/>
                                            {
                                                arr.map((valueC, keyC)=> {
                                                    if (keyC==0){
                                                        return(
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                   key={keyC} contentEditable="true" onBlur={(e)=>checkId(e.target,key,keyC)}
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                   value={value[valueC]}/>
                                                        )
                                                    }else if (keyC==1){
                                                        return(
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                   key={keyC} contentEditable="true" onBlur={(e)=>checkName(e.target,key,keyC)}
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                   value={value[valueC]}/>
                                                        )
                                                    }else if (valueC=='password'){
                                                        return(
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                   key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                   value={value[valueC]} type="password"/>
                                                        )
                                                    }else if (valueC=='logintype'){
                                                        return (
                                                            <select className={styles.tableContentItem} key={keyC}
                                                                    onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                    style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                    type="button">
                                                                {
                                                                    logintypeArr.map((valueD,keyD)=>{
                                                                        return(
                                                                            < option className={styles.opt} value={keyD} key={keyD}>{valueD}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        )
                                                    }else if (valueC=='roleids'){
                                                        return (
                                                            <input className={styles.tableContentItem} key={keyC}
                                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                   onClick={()=>{jump(value['id'])}}
                                                                   type="button" value='设置'/>
                                                        )
                                                    }else {
                                                        return(
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                   key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                   value={value[valueC]}/>
                                                        )
                                                    }
                                                })
                                            }
                                            <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                                <img style={{cursor:'pointer'}} src={save} onClick={(e)=>addDate(key)}/>
                                            </div>
                                            <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                                <img style={{cursor:'pointer'}} src={del} onClick={(e)=>deleDate(key)}/>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <Ambox></Ambox>
                <div className={styles.pageplus}>
                    <span onClick={()=>theOne(page,uName)}>首页</span>
                    <span onClick={()=>lastPage(page,uName)}>上一页</span>
                    <span>{page+"/"+table.data.totalPage}</span>
                    <span onClick={()=>nextPage(page,table.data.totalRecord,pageSize,uName)}>下一页</span>
                    <span onClick={()=>theLast(page,table.data.totalRecord,pageSize,uName)}>末页</span>
                </div>

            </div>
        </div>
        );}else {return(<Login></Login>)}
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContentAmm,
        boxData: state.objs.boxData,
        skinStyle:state.vars.skinStyle,
        ammCount:state.vars.ammCount,
        ids:state.vars.roleIds,
        page:state.vars.pageAmm,
        uName:state.vars.nameAmm,
        alertText:state.vars.alertText,//弹框提示文字
        j:state.vars.j,//删除按钮传递参数
        k:state.vars.k,//删除按钮传递参数
        deleteBool:state.vars.deleteBool//是否删除
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            $("option[name='selectOpt']").prop('selected',true);
            dispatch(actions.setVars('roleIds', null));
            dispatch(actions.setVars('nameAmm', null));
            dispatch(actions.setVars('pageAmm', 1));
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:'pageSize='+pageSize+'&&page='+1+'&&username=',
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
            $.ajax({
                url: soam+'/user/getRoleList',
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.appendObjs('boxData', data));
                    dispatch(actions.appendObjs('initData', data));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });

        },
        checkId(id,i,j){
            $.ajax({
                url: soam+'/user/getByIDUserAuthentication?id='+id.value,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    if(data.data==true){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '用户编号重复'));
                        let tableV = _.clone(getState().objs.tableContentAmm);
                        tableV.data.pagedata[i][arr[j]] = '';
                        dispatch(actions.setObjs('tableContentAmm', tableV));
                    }
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        checkName(name,i,j){
            $.ajax({
                url: soam+'/user/getByNameUserAuthentication?name='+name.value,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    if(data.data==true){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '用户名重复'));
                        let tableV = _.clone(getState().objs.tableContentAmm);
                        tableV.data.pagedata[i][arr[j]] = '';
                        dispatch(actions.setObjs('tableContentAmm', tableV));
                    }
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        buttonAction (){
            var tContent = $('#textContent5')[0].value;
            // 在这个下边获取这个时间段的数据就行了
            dispatch(actions.setVars('pageAmm', 1));
            dispatch(actions.setVars('nameAmm', tContent));
            $.ajax({
                    url: soam+'/user/getAllUser',
                    type: 'post',
                    data:'pageSize='+pageSize+'&&page='+1+'&&username='+tContent,
                    dataType: 'json',//here,
                    success:function (data) {
                        dispatch(actions.setObjs('tableContentAmm', data));
                        dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                        $("option[name='selectOpt']").prop('selected',true);
                    },
                    error:function(){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败'));
                    }
            });
            // 然后去更新图表
        },
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContentAmm);
            tableV.data.pagedata[i][arr[j]] = value;
            dispatch(actions.setObjs('tableContentAmm', tableV));
        },
        saveDataAmm:(li)=>{
            let pass;
            let tableV = _.clone(getState().objs.tableContentAmm);
            let ids = _.clone(getState().vars.roleIds);
            if(ids instanceof Array){pass='pass'}
            //console.log(pass);
            let wfs=tableV.data.pagedata[li];
            wfs['roleids']=ids;
            let roleObj={};
            roleObj['userid']=wfs.id;
            roleObj['roleids']=ids;
            roleObj['pass']=pass;
            let ddv=JSON.stringify(wfs);
            let idsString=JSON.stringify(roleObj);
            //console.log(ids,roleObj);
            dispatch(actions.setVars('boolAlert', false));
            $.ajax({
                url: soam+'/user/updateUserInfo?userInfo=data',
                type: 'post',
                data: ddv,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function () {
                    $.ajax({
                        url: soam+'/user/getSetUpUserRole?roleVO=data',
                        type: 'post',
                        data: idsString,
                        dataType: 'json',//here,
                        contentType:'application/json;charset=UTF-8',
                        success:function () {
                            dispatch(actions.setVars('pageAmm', 1));
                            $.ajax({
                                url: soam+'/user/getAllUser',
                                type: 'post',
                                data:'pageSize='+pageSize+'&&page='+1+'&&username=',
                                dataType: 'json',//here,
                                success:function (data) {
                                    dispatch(actions.setVars('roleIds', null));
                                    dispatch(actions.setObjs('tableContentAmm', data));
                                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                                    dispatch(actions.setVars('boolAlert', true));
                                },
                                error:function(){
                                    dispatch(actions.setVars('boolAlert', true));
                                    dispatch(actions.setVars('alertBool', false));
                                    dispatch(actions.setVars('alertText', '获取数据失败'));
                                }
                            });
                        },
                        error:function(){
                            dispatch(actions.setVars('boolAlert', true));
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '获取数据失败'));
                        }
                    });
                },
                error:function(){
                    dispatch(actions.setVars('boolAlert', true));
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        jump: (id) => {
            if(id){
                $.ajax({
                    url: soam+'/user/getUserRoleList?id='+id,
                    type: 'post',
                    dataType: 'json',//here,
                    success:function (data) {
                        dispatch(actions.appendObjs('boxData', data));
                        $('#boxAm').parent().css('display','block');
                        $("#boxAm input[title='checkedIn']").prop('checked',true);
                        $("#boxAm input[title='checkedOut']").prop('checked',false);
                    },
                    error:function(){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败'));
                    }
                });
            }else {
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入用户ID'));
            }
        },
        addDate:(li)=>{
            let phone=/^1\d{10}$/;
            let mail=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            let tableV = _.clone(getState().objs.tableContentAmm);
            let ids = _.clone(getState().vars.roleIds);
            let wfs=tableV.data.pagedata[li];
            wfs['roleids']=ids;
            (!wfs['logintype']) && (wfs['logintype']=0);
            if(!wfs.id){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入用户编号'));
            }
            else if(!phone.test(wfs.phonecode) && wfs.phonecode){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入正确的手机号码'));
                tableV.data.pagedata[li]['phonecode'] = '';
                dispatch(actions.setObjs('tableContentAmm', tableV));
            }else if(!mail.test(wfs.mailbox) && wfs.mailbox){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入正确的邮箱'));
                tableV.data.pagedata[li]['mailbox'] = '';
                dispatch(actions.setObjs('tableContentAmm', tableV));
            }
            else if(!wfs.name){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入用户名'));
            }
            else if(!wfs.password){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入用户密码'));
            }
            else if(!wfs.loginname){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入用户别名'));
            }
            else if(!ids){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请选择对应角色'));
            }
            else {
            let ddv=JSON.stringify(wfs);
            dispatch(actions.setVars('boolAlert', false));
            $.ajax({
                url: soam+'/user/addUser?userinfo=data',
                type: 'post',
                data: ddv,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function () {
                    dispatch(actions.setVars('pageAmm', 1));
                    $.ajax({
                        url: soam+'/user/getAllUser',
                        type: 'post',
                        data:'pageSize='+pageSize+'&&page='+1+'&&username=',
                        dataType: 'json',//here,
                        success:function (data) {
                            dispatch(actions.setVars('boolAlert', true));
                            dispatch(actions.setObjs('tableContentAmm', data));
                            dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '添加成功'));
                        },
                        error:function(){
                            dispatch(actions.setVars('boolAlert', true));
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '获取数据失败'));
                        }
                    });
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });}
        },
        deleDate:(j) => {
            let tableV = _.clone(getState().objs.tableContentAmm);
            tableV.data.pagedata.splice(j,1);
            dispatch(actions.setObjs('tableContentAmm', tableV));
        },
        inputOnChange:(value,id)=>{

        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContentAmm);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContentAmm', tableV));
        },
        buttonConcel:(deleteBool) => {
            dispatch(actions.setVars('deleteBool', true));
        },
        buttonClose:(deleteBool,j,k) => {
            dispatch(actions.setVars('deleteBool', true));
            
            let tableV = _.clone(getState().objs.tableContentAmm);
            dispatch(actions.setVars('boolAlert', false));
            $.ajax({
                url: soam+'/user/getByIDDeleteUser?id='+k,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.appendObjs('boxData', data));
                    $('#boxAm').parent().css('display','block');
                    dispatch(actions.setVars('pageAmm', 1));
                    $.ajax({
                        url: soam+'/user/getAllUser',
                        type: 'post',
                        data:'pageSize='+pageSize+'&&page='+1+'&&username=',
                        dataType: 'json',//here,
                        success:function (data) {
                            dispatch(actions.setVars('boolAlert', true));
                            dispatch(actions.setObjs('tableContentAmm', data));
                            dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '删除成功'));
                        },
                        error:function(){
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '获取数据失败'));
                        }
                    });
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        deleData:(j,k) => {
            dispatch(actions.setVars('deleteBool', false));
            dispatch(actions.setVars('j', j));
            dispatch(actions.setVars('k', k));
        },
        lastPage:(page,name)=>{
            page>1 ? page--:page;
            dispatch(actions.setVars('pageAmm', page));
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:{pageSize:pageSize,page:page,username:name},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                    $("option[name='selectOpt']").prop('selected',true);
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        nextPage:(page,i,j,name)=>{
            (page<Math.ceil(i/j)) ? page++:page;
            //console.log(page,name);
            dispatch(actions.setVars('pageAmm', page));
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:{pageSize:pageSize,page:page,username:name},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                    $("option[name='selectOpt']").prop('selected',true);
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        theOne :(page,name)=>{
            page=1;
            dispatch(actions.setVars('pageAmm', page));
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:{pageSize:pageSize,page:page,username:name},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                    $("option[name='selectOpt']").prop('selected',true);
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        theLast :(page,i,j,name)=>{
            page=Math.ceil(i / j);
            dispatch(actions.setVars('pageAmm', page));
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:{pageSize:pageSize,page:page,username:name},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                    $("option[name='selectOpt']").prop('selected',true);
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
