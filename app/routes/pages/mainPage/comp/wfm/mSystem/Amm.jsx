import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('redux/store');
var actions = require('redux/actions');
var $ =require('jquery');
import styles from './Amm.scss';
let pageSize=11;

import save from '../../../img/comp/save.png';
import refresh from '../../../img/comp/refresh.png';
import del from '../../../img/icon/tabDel.png';
import add from '../../../img/icon/tabAdd.png';
import _ from 'lodash';
import Login from '../../../../../../components/common/Loading.jsx';
import Ambox from './boxAm.jsx';
let soam='http://10.68.100.32:8080/soam';
let tabaleData = require('./data');
let arr=['id','name','loginname','password','phonecode','mailbox','logintype','dogcode','remark','roleids'];
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {page,uName,lastPage,nextPage,theOne,theLast,init,checkId,checkName,ids,addDate,deleDate,ammCount,boxData,jump,deleData,addData,buttonAction, inputOnChange, onFocus,table, changeTableItem} = this.props;
        let newData={};
        let num=0;
        for(let i=0;i<arr.length-1;i++){
            newData[arr[i]]='';
        }
        let comp=tabaleData.comps.from;
        if(table&&boxData){
        return (
        <div className={styles.bodyBox}>
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
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={value[valueC]}/>
                                                    )
                                                }
                                                if (keyC==3){
                                                    return(
                                                        <input className={styles.tableContentItem}
                                                               style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                               value={value[valueC]} type="password"/>
                                                    )
                                                }else if (keyC==tabaleData.ammData.header.length-1){
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
                                            <img src={save} onClick={()=>alert("您保存的数据123为:" + JSON.stringify(table.content[key]))}/>
                                        </div>
                                        <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                            <img src={del} onClick={(e)=>deleData(key,value.id)}/>
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
                                                    }else if (keyC==3){
                                                        return(
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                   key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                   value={value[valueC]} type="password"/>
                                                        )
                                                    }else if (keyC==tabaleData.ammData.header.length-1){
                                                        return (
                                                            <input className={styles.tableContentItem} key={keyC}
                                                                   style={{width:(100/(tabaleData.ammData.header.length+2))+"%"}}
                                                                   onClick={()=>{jump(value['id'])}}
                                                                   type="button" value='设  置'/>
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
                                                <img src={save} onClick={(e)=>addDate(key,ids)}/>
                                            </div>
                                            <div className={styles.tableContentItem} style={{width:(50/(tabaleData.ammData.header.length+2))+"%"}}>
                                                <img src={del} onClick={(e)=>deleDate(key)}/>
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
        ammCount:state.vars.ammCount,
        ids:state.vars.roleIds,
        page:state.vars.pageAmm,
        uName:state.vars.nameAmm
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('nameAmm', null));
            dispatch(actions.setVars('pageAmm', 1));
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:'pageSize='+pageSize+'&&page='+1+'&&username=',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
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
                    console.log('获取数据失败')
                }
            });

        },
        checkId(id,i,j){
            $.ajax({
                url: soam+'/user/getByIDUserAuthentication?id='+id.value,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    if(data.data==true){alert('用户编号重复');
                        let tableV = _.clone(getState().objs.tableContentAmm);
                        tableV.data.pagedata[i][arr[j]] = '';
                        dispatch(actions.setObjs('tableContentAmm', tableV));
                    }
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        checkName(name,i,j){
            $.ajax({
                url: soam+'/user/getByNameUserAuthentication?name='+name.value,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    if(data.data==true){alert('用户名重复');
                        let tableV = _.clone(getState().objs.tableContentAmm);
                        tableV.data.pagedata[i][arr[j]] = '';
                        dispatch(actions.setObjs('tableContentAmm', tableV));
                    }
                },
                error:function(){
                    console.log('获取数据失败')
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
                    },
                    error:function(){
                        console.log('获取数据失败')
                    }
            });
            // 然后去更新图表
        },
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContentAmm);
            tableV.data.pagedata[i][arr[j]] = value;
            dispatch(actions.setObjs('tableContentAmm', tableV));
        },
        jump: (id) => {
            $.ajax({
                url: soam+'/user/getUserRoleList?id='+id,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.appendObjs('boxData', data));
                    $('#boxAm').parent().css('display','block');
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        addDate:(li,ids)=>{
            let tableV = _.clone(getState().objs.tableContentAmm);
            let wfs=tableV.data.pagedata[li];
            wfs['roleids']=ids;
            let ddv=JSON.stringify(wfs);
            $.ajax({
                url: soam+'/user/addUser?userinfo=data',
                type: 'post',
                data: ddv,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function () {
                    alert('保存成功');
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:'pageSize='+11+'&&page='+1+'&&username=',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        deleDate:(j) => {
            let tableV = _.clone(getState().objs.tableContentAmm);
            tableV.data.pagedata.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        inputOnChange:(value,id)=>{

        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContentAmm);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContentAmm', tableV));
        },
        deleData:(j,k) => {
            let tableV = _.clone(getState().objs.tableContentAmm);
            $.ajax({
                url: soam+'/user/getByIDDeleteUser?id='+k,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.appendObjs('boxData', data));
                    $('#boxAm').parent().css('display','block');
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            alert('已删除');
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:'pageSize='+11+'&&page='+1+'&&username=',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
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
                    console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        nextPage:(page,i,j,name)=>{
            (page<Math.ceil(i/j)) ? page++:page;
            console.log(page,name);
            dispatch(actions.setVars('pageAmm', page));
            $.ajax({
                url: soam+'/user/getAllUser',
                type: 'post',
                data:{pageSize:pageSize,page:page,username:name},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
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
                    console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
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
                    console.log(data);
                    dispatch(actions.setObjs('tableContentAmm', data));
                    dispatch(actions.setVars('ammCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
