import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('redux/store');
import del from '../../../img/icon/tabDel.png';
import add from '../../../img/icon/tabAdd.png';
var actions = require('redux/actions');
import styles from './Ms.scss';
var $ = require('jquery');
let soamMs='http://10.68.100.32:8080/soam';
import Abox from './boxA';
import Bbox from './boxB';
import Login from '../../../../../../components/common/Loading.jsx';
import save from '../../../img/comp/save.png';
import close from '../../../img/comp/close_down.png';
import refresh from '../../../img/comp/refresh.png';
import _ from 'lodash';
let pageSize=3;
let arr=['id','name','descr','',''];
let roleCenterArr=['wfid','wfname','wtid','wtname','queryrights','controlrights','superviseright'];
let roleCenterTitle=['风场id','风场名称','风机id','风机名称','查询权','控制权','监控权'];
let tabaleData = require('./data');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {

        let {changeBoxItem,boxRoleArr,deleDate,fits,centerControl,addDate,changeRole,boxRoleId,roleList,boxRoleList,init,nextPage,lastPage,theOne,theLast,boxRole,boxCenter,page,ids,msCount,uName,remark,deleData,addData,buttonAction, inputOnChange, onFocus,table, changeTableItem1} = this.props;
        let num1=0;
        let num2=0;
        let newData={};
        let num=0;
        for(let i=0;i<arr.length-2;i++){
            newData[arr[i]]='';
        }
        newData['typeid']=1;
        newData['ids']=false;
        let comp=tabaleData.comps.from;
        if(table){
        return (

            <div className={styles.bodyBox}>
                <div className={styles.roleputBox}>
                    <div className={styles.inquireBox} key='0'>
                        {
                            comp.map((value, key)=> {
                                if (value.type === 'input') {
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
                                            <button onClick={()=>buttonAction()}>{value.title}</button>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className={styles.actionBox} key='1'>
                        <img src={refresh} onClick={()=>init()}/>
                        <img src={add} onClick={()=>addData(newData)}/>
                    </div>
                    <div className={styles.tableBox} key='2'>
                        <div className={styles.tableHeaderBox}>
                            <div className={styles.tableHeaderItem}
                                 style={{width:(100/(tabaleData.msData.header.length+2))+"%"}}>序号</div>
                            {
                                tabaleData.msData.header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:(100/(tabaleData.msData.header.length+2))+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                table.data.pagedata && table.data.pagedata.map((value, key)=> {
                                    num++;
                                    if(key<msCount/1) {
                                        return (
                                            <div
                                                className={key % 2 === 0 ? styles.tableContentLine : styles.tableContentLine1}
                                                key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                       readOnly="true" value={num}/>
                                                {
                                                    arr.map((valueC, keyC)=> {
                                                        if (keyC == 3) {
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                                       key={keyC} type="button" value='设置'
                                                                       onClick={()=>roleList(value.id)}/>
                                                            )
                                                        } else if (keyC == 4) {
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                                       key={keyC} type="button" value='设置'
                                                                       onClick={()=>centerControl(value.id)}/>
                                                            )
                                                        } else {
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                                       key={keyC} contentEditable="true"
                                                                       onChange={(e)=>changeTableItem1(e.target.value, table, key, keyC)}
                                                                       value={value[valueC]}/>
                                                            )
                                                        }
                                                    })
                                                }
                                                <div className={styles.tableContentItem}
                                                     style={{width: (50 / (tabaleData.msData.header.length + 2)) + "%"}}>
                                                    <img src={save}
                                                         onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.content[key]))}/>
                                                </div>
                                                <div className={styles.tableContentItem}
                                                     style={{width: (50 / (tabaleData.msData.header.length + 2)) + "%"}}>
                                                    <img src={del} onClick={(e)=>deleData(key,value.id)}/>
                                                </div>
                                            </div>
                                        )}else{
                                        return (
                                            <div
                                                className={key % 2 === 0 ? styles.tableContentLine : styles.tableContentLine1}
                                                key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                       readOnly="true" value={num}/>
                                                {
                                                    arr.map((valueC, keyC)=> {
                                                        if (keyC == 3) {
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                                       key={keyC} type="button" value='设置'
                                                                       onClick={()=>roleList(value.id)}/>
                                                            )
                                                        } else if (keyC == 4) {
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                                       key={keyC} type="button" value='设置'
                                                                       onClick={()=>centerControl(value.id)}/>
                                                            )
                                                        } else {
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (tabaleData.msData.header.length + 2)) + "%"}}
                                                                       key={keyC} contentEditable="true"
                                                                       onChange={(e)=>changeTableItem1(e.target.value, table, key, keyC)}
                                                                       value={value[valueC]}/>
                                                            )
                                                        }
                                                    })
                                                }
                                                <div className={styles.tableContentItem}
                                                     style={{width: (50 / (tabaleData.msData.header.length + 2)) + "%"}}>
                                                    <img src={save}
                                                         onClick={()=>addDate(key,value.id)}/>
                                                </div>
                                                <div className={styles.tableContentItem}
                                                     style={{width: (50 / (tabaleData.msData.header.length + 2)) + "%"}}>
                                                    <img src={del} onClick={(e)=>deleDate(key)}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.tanC} id="aids" key='3' style={{top: 200, left:400}}>
                        <div className={styles.upName}>角色菜单<img src={close} className={styles.wrong} onClick={()=>{$('#aids').css('display','none')}}/></div>
                        <div className={styles.tableHeaderBox}>
                            <div className={styles.tableHeaderItem}
                                 style={{width:(100/(tabaleData.msData.aids.header.length+1)-10)+"%"}}>序号</div>
                            {
                                tabaleData.msData.aids.header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:(100/(tabaleData.msData.aids.header.length+1))+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.newBox}>
                            <div className={styles.tableContentBox}>
                                {
                                    (boxRoleList && boxRoleList.data) && boxRoleList.data.map((value, key)=> {
                                        num1++;
                                        return (
                                            <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width:(100/(tabaleData.msData.aids.header.length+1)-10)+"%"}}
                                                       readOnly="true" value={num1}/>
                                                <input className={styles.tableContentItem}
                                                       style={{width:(100/(tabaleData.msData.aids.header.length+1))+"%"}}
                                                       readOnly="true" value={value.languagecn}/>
                                                <input className={styles.tableContentItem} value={value.rightstype}
                                                       style={{width:(100/(tabaleData.msData.aids.header.length+1))+"%"}}
                                                       onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}/>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div className={styles.downCount}>
                            <span>{'记录合计：'+num1}</span>
                            <span onClick={()=>changeRole(boxRoleId)}>点击</span>
                        </div>
                    </div>
                    <div className={styles.tanC} id="center3" key='4' style={{width:1000,top: 100, left:400,paddingLeft:300}}>
                        <div className={styles.upName}>角色权限<img src={close} className={styles.wrong} onClick={()=>{$('#center3').css('display','none')}}/></div>
                        <div className={styles.tableHeaderBox}>
                            <div className={styles.tableHeaderItem}
                                 style={{width:(100/(tabaleData.msData.center.header.length+1)-12)+"%"}}>序号</div>
                            {
                                roleCenterTitle.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:(100/(roleCenterTitle.length+1))+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.newBox}>
                            <div className={styles.tableContentBox}>
                                {
                                    (boxCenter && boxCenter.data) && boxCenter.data.map((value, key)=> {
                                        num2++;
                                        return (
                                            <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width:(100/(roleCenterTitle.length)-6)+"%"}}
                                                       readOnly="true" value={num2}/>
                                                {
                                                    roleCenterArr.map((valueC, keyC)=> {
                                                        if(keyC<4){
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width:(100/(roleCenterTitle.length+1))+"%"}}
                                                                       key={keyC} readOnly="true" value={value[valueC]}/>
                                                            )
                                                        }else {
                                                                return (
                                                                    <div
                                                                        style={{width: (100 / (roleCenterTitle.length + 1)) + "%"}}
                                                                        className={styles.tableContentItem} key={keyC}>
                                                                        <input type="checkbox" onChange={(e)=>changeBoxItem(e.target,boxCenter,key,keyC)}
                                                                               name={value[valueC]==0?'checkItIn':'checkItOut'}/>
                                                                    </div>
                                                                )
                                                        }
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.downCount}>
                            <span>{'记录合计：'+num2}</span>
                        </div>
                        <Bbox></Bbox>
                    </div>
                    <Abox></Abox>
                    <div className={styles.pageplus}>
                        <span onClick={()=>theOne(page,uName,remark)}>首页</span>
                        <span onClick={()=>lastPage(page,uName,remark)}>上一页</span>
                        <span>{page+"/"+table.data.totalPage}</span>
                        <span onClick={()=>nextPage(page,table.data.totalRecord,pageSize,uName,remark)}>下一页</span>
                        <span onClick={()=>theLast(page,table.data.totalRecord,pageSize,uName,remark)}>末页</span>
                    </div>
                </div>
            </div>
        );}else {return(<Login></Login>)}
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContentMs,
        boxRole: state.objs.boxRole,
        boxRoleArr: state.vars.boxRoleArr,
        boxRoleId: state.vars.boxRoleId,
        boxRoleList: state.objs.boxRoleList,
        boxCenter: state.objs.boxCenter,
        boxCenterId: state.objs.boxCenterId,
        msCount:state.vars.msCount,
        ids:state.vars.rolePower,
        remark:state.vars.remarkMs,
        page:state.vars.pageMs,
        uName:state.vars.nameMs
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('remarkMs', null));
            dispatch(actions.setVars('nameMs', null));
            dispatch(actions.setVars('pageMs', 1));
            $.ajax({
                url: soamMs+'/role/likeRole',
                type: 'post',
                data:{curpage:1,pageSize:pageSize},
                dataType: 'json',//here,
                success:function (data) {
                    // console.log(data);
                    dispatch(actions.setObjs('tableContentMs', data));
                    dispatch(actions.setVars('msCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            $.ajax({
                url: soamMs+'/role/getAddRoleAddMenu',
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('boxRole', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });

            // $.ajax({
            //     url: soam+'/role/getByRoleidAllMenu?roleid=1',
            //     type: 'post',
            //     dataType: 'json',//here,
            //     success:function (data) {
            //         console.log(data);
            //         dispatch(actions.appendObjs('boxData', data));
            //         $('#boxAm').parent().css('display','block');
            //     },
            //     error:function(){
            //         console.log('获取数据失败')
            //     }
            // });
        },
        centerControl(i){
            dispatch(actions.setObjs('boxCenterId', i));
            $('#center3').css('display','block');

            $.ajax({
                url: soamMs+'/roleright/getRolerRightMapList',
                type: 'post',
                data:{roleid:i},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('boxCenter', data));
                        $("#center3 input[name='checkItOut']").prop('checked', true);
                        $("#center3 input[name='checkItIn']").prop('checked', false);
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });

        },
        changeRole(j){
            console.log(j);
            $('#box1').parent().css('display','block');
            $.ajax({
                url: soamMs+'/role/getByRoleidAllMenu',
                type: 'post',
                data:{roleid:j},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    data.data && dispatch(actions.setObjs('boxRole', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        roleList(i){
            dispatch(actions.setVars('boxRoleId', i));
            $('#aids').css('display','block');
            $.ajax({
                url: soamMs+'/role/getRoleMenuList?roleid='+i,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('boxRoleList', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        checkId(id,i,j){
            $.ajax({
                url: soamMs+'/role/getByIDUserAuthentication?id='+id.value,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    if(data.data==true){alert('用户编号重复');
                        let tableV = _.clone(getState().objs.tableContentMs);
                        tableV.data.pagedata[i][arr[j]] = '';
                        dispatch(actions.setObjs('tableContentMs', tableV));
                    }
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        checkName(name,i,j){
            $.ajax({
                url: soamMs+'/role/getByNameUserAuthentication?name='+name.value,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    if(data.data==true){alert('用户名重复');
                        let tableV = _.clone(getState().objs.tableContentMs);
                        tableV.data.pagedata[i][arr[j]] = '';
                        dispatch(actions.setObjs('tableContentMs', tableV));
                    }
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContentMs);
            tableV.data.pagedata[i][arr[j]] = value;
            dispatch(actions.setObjs('tableContentMs', tableV));
        },
        changeBoxItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.boxCenter);
            value.checked ? tableV.data[i][roleCenterArr[j]] = 1 : tableV.data[i][roleCenterArr[j]]=0 ;
            console.log(tableV.data[i][roleCenterArr[j]]);
            dispatch(actions.setObjs('boxCenter', tableV));
        },
        inputOnChange:(value,id)=>{

        },
        addDate:(li,ids)=>{
            let tableV = _.clone(getState().objs.tableContentMs);
            let boxArr = _.clone(getState().vars.boxRoleArr);
            let cenAdd = _.clone(getState().objs.boxCenter);
            let addArr=[];
            boxArr && boxArr.map((value, key)=> {
                addArr.push(value.menuid)
            });
            let addCen=[];
            // console.log(cenAdd);
            cenAdd && cenAdd.data.map((value, key)=> {
                let cost={};
                cost['wfid']=value.wfid;
                cost['wtid']=value.wtid;
                cost['controlrights']=value.controlrights;
                cost['queryrights']=value.queryrights;
                cost['superviseright']=value.superviseright;
                cost['roleid']=ids;
                addCen.push(cost);
            });
            let wfs=tableV.data.pagedata[li];
            wfs['ids']=false;
            wfs['typeid']=1;
            // console.log(addCen);
            let ddv=JSON.stringify(wfs);
            $.ajax({
                url: soamMs+'/role/getSaveRoleInfo?roleInfo=data',
                type: 'post',
                data: ddv,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function () {
                    let cosin={};
                    cosin['roleid']=wfs.id;
                    cosin['rightstype']=1;
                    cosin['menuids']=addArr;
                    let built=JSON.stringify(cosin);
                    $.ajax({
                        url: soamMs+'/rolemenu/getByRoleIdAddMenu?roleInfoVO=data',
                        type: 'post',
                        data: built,
                        dataType: 'json',//here,
                        contentType:'application/json;charset=UTF-8',
                        success:function () {
                            let builtY=JSON.stringify(addCen);
                            // console.log(addCen);
                            $.ajax({
                                url: soamMs+'/roleright/saveRolerRight?rights=data',
                                type: 'post',
                                data: builtY,
                                dataType: 'json',//here,
                                contentType:'application/json;charset=UTF-8',
                                success:function () {
                                    alert('保存成功');
                                },
                                error:function(){
                                    console.log('获取三级失败')
                                }
                            });
                        },
                        error:function(){
                            console.log('获取二级失败')
                        }
                    });
                },
                error:function(){
                    console.log('获取一级失败')
                }
            });
            console.log(addArr,wfs.id)



            $.ajax({
                url: soamMs+'/role/likeRole',
                type: 'post',
                data:{curpage:1,pageSize:pageSize},
                dataType: 'json',//here,
                success:function (data) {
                    // console.log(data);
                    dispatch(actions.setObjs('tableContentMs', data));
                    dispatch(actions.setVars('msCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContentMs);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContentMs', tableV));
        },
        deleDate:(j) => {
            let tableV = _.clone(getState().objs.tableContentMs);
            tableV.data.pagedata.splice(j,1);
            dispatch(actions.setObjs('tableContentMs', tableV));
        },
        deleData:(j,k) => {
            $.ajax({
                url: soamMs+'/role/getDeleteRoleInfo?roleid='+k,
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setVars('remarkMs', null));
                    dispatch(actions.setVars('nameMs', null));
                    dispatch(actions.setVars('pageMs', 1));
                    // dispatch(actions.appendObjs('boxData', data));
                    $.ajax({
                        url: soamMs+'/role/likeRole',
                        type: 'post',
                        data:{curpage:1,pageSize:pageSize},
                        dataType: 'json',//here,
                        success:function (data) {
                            // console.log(data);
                            dispatch(actions.setObjs('tableContentMs', data));
                            dispatch(actions.setVars('msCount', data.data.pagedata.length));
                        },
                        error:function(){
                            console.log('获取数据失败')
                        }
                    });
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        buttonAction (){

            var tContent = $('#textContent5')[0].value;
            var tContent1 =  $('#textContent6')[0].value;
            dispatch(actions.setVars('pageMs', 1));
            dispatch(actions.setVars('nameMs', tContent));
            dispatch(actions.setVars('remarkMs', tContent1));
            $.ajax({
                url: soamMs+'/role/likeRole',
                type: 'post',
                data:{curpage:1,pageSize:pageSize,name:tContent,remark:tContent1},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContentMs', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            // 在这个下边获取这个时间段的数据就行了
            // 然后去更新图表
        },
        lastPage:(page,name,remark)=>{
            page>1 ? page--:page;
            dispatch(actions.setVars('pageMs', page));
            $.ajax({
                url: soamMs+'/role/likeRole',
                type: 'post',
                data:{curpage:page,pageSize:pageSize,name:name,remark:remark},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContentMs', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        nextPage:(page,i,j,name,remark)=>{
            (page<Math.ceil(i/j)) ? page++:page;
            console.log(page,name);
            dispatch(actions.setVars('pageMs', page));
            $.ajax({
                url: soamMs+'/role/likeRole',
                type: 'post',
                data:{curpage:page,pageSize:pageSize,name:name,remark:remark},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContentMs', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        theOne :(page,name,remark)=>{
            page=1;
            dispatch(actions.setVars('pageMs', page));
            $.ajax({
                url: soamMs+'/role/likeRole',
                type: 'post',
                data:{curpage:page,pageSize:pageSize,name:name,remark:remark},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContentMs', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        theLast :(page,i,j,name,remark)=>{
            page=Math.ceil(i / j);
            dispatch(actions.setVars('pageMs', page));
            $.ajax({
                url: soamMs+'/role/likeRole',
                type: 'post',
                data:{curpage:page,pageSize:pageSize,name:name,remark:remark},
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setObjs('tableContentMs', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);