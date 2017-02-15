import React from 'react';
import {connect} from 'react-redux';
import styles from './../area/Inputc.scss';
import AlertWindow from '../../../KPI/AlertWindow.jsx';//提示框
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
let comps = require('./../area/datas');
let tktk =require('./../../../KPI/AlertWindow')
let ssg2 = mod.Model.ens;
let arr3 = [];
let yeares = [];
let month4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let group0 = comps.data.group0;
let pageSize = 16;//设置每页的条目数量
let page = 1;//设置初始页码
let thDate = new Date();
let thYear = thDate.getFullYear();
let month2 = thDate.getMonth();
let soam = 'http://10.68.100.32:8080/wbi';//设置接口
for (let i = 0; i <= 30; i++) {
    yeares.push(thYear - 2 + i)
}
let newData = {};

let pagingOptions = {
    showNumber: 3
}
let arr1 = ['groupid', 'wfid', 'year', 'month', 'price', 'remark',];
for (let i = 0; i < arr1.length; i++) {
    newData[arr1[i]] = '';
}
(function () {
    for (let x in ssg2) {
        arr3.push(ssg2[x].name);
    }
}());
arr3.splice(-2, 2);
let arr = [15, 16, 10, 15, 22, 13];
let arr2 = [15, 16, 6, 4, 15, 22, 8, 0, 0, 0, 0, 0];
let comp = comps.peqi.table;

let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init(comp);
    },
    render() {//x,y,z为删除数据确认弹窗传递参数
        let {x,y,z,deleteBool=true,buttonConcel,buttonClose,alertText,deleData, deleDate, addData, num = 0, wfidCount,changeTableItem12, addDate, wfids, table, ajax, wtidAll, groupAll, totalpage, saveTableItem, saveTableItem2, changeTableItem1, page, nextPage, lastPage, theOne, years0 = null, theLast, dataenter, buttonAction, boll2 = false,skinStyle} = this.props;
        
        


        if (boll2) {//判断数据是否存在


            return (

               <div className={skinStyle == 1 ? styles.powerBlueBox : skinStyle == 2 ? styles.powerWhiteBox : styles.powerBox}>
                    <AlertWindow text={alertText}></AlertWindow>
                    
                    <div className={deleteBool==true? styles.hideBox:styles.container}>
                        <div className={styles.alertBox}>
                            <div className={styles.header}>提示<span className={styles.clickBox} onClick={()=>buttonConcel(deleteBool)}>×</span></div>
                            <div className={styles.warning}>确定删除数据吗？点击关闭可取消</div>
                            <div className={styles.close}><span onClick={()=>buttonClose(deleteBool,x,y,z)}>确定</span></div>
                        </div>
                    </div>

                    <div className={styles.inquireBox}>
                        <div className={styles.seleBox}>
                            <span>年度</span>
                            <select id='textContent5'>
                                {yeares.map((value, key) => {
                                    if(key==1){
                                        return (
                                            <option name="selectOpt"  value={value} key={key}>{value}</option>
                                        )
                                    }
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
                                {wtidAll.data.map((value, key) => {
                                    if(key==0){
                                        return (
                                            <option name="selectOpt" value={value.wfid} key={key}>{value.wfname}</option>
                                        )
                                    }
                                    return (
                                        <option value={value.wfid} key={key}>{value.wfname}</option>
                                    )
                                })
                                }
                            </select>{/*map遍历年度*/}
                        </div>
                        <div className={styles.inputBox}>
                            <button onClick={(e) => {
                                buttonAction(e.target)
                            }}>查询
                            </button>
                        </div>
                        <div className={styles.btnBox}>
                            <div>单 位：万元</div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.actionBox}>
                            <img src={refresh} onClick={() => ajax()}/>
                            <img src={add} onClick={() => addData(newData, totalpage, years0, wfids)}/>
                        </div>
                        <div className={styles.cx}></div>
                        <div className={styles.tableBox}>
                            <div className={styles.tableHeaderBox}>
                                <div className={styles.tableHeaderItem}
                                     style={{width: 8 + '%'}}>序号
                                </div>
                                {
                                    comp.data.header2.map((value, key) => {
                                        return (
                                            <div className={styles.tableHeaderItem}
                                                 style={{width: arr[key] + "%"}} key={key}>{value}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.tableContentBox}>
                                {
                                    table.data.pagedata !==undefined &&
                                    table.data.pagedata.map((value, key) => {
                                        {/*遍历已经有的后台数据*/}

                                        num++;


                                        if (key < wfidCount / 1) {
                                            return (
                                                <div
                                                    className={key % 2 === 0 ? styles.tableContentLine : styles.tableContentLine1}
                                                    key={key}>
                                                    <input className={styles.tableContentItem}
                                                           style={{width: 8 + "%"}}
                                                           readOnly="true" value={num}/>
                                                    {
                                                        arr1.map((valueC, keyC) => {
                                                            if (keyC == 0) {
                                                                return (

                                                                    <input className={styles.tableContentItem}
                                                                           style={{width: arr2[keyC] + '%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e) => changeTableItem1(e.target.value, table, key, keyC)}
                                                                           value={value['groupname']}/>


                                                                )
                                                            }
                                                            if (keyC == 1) {
                                                                return (

                                                                    <input className={styles.tableContentItem}
                                                                           style={{width: arr2[keyC] + '%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e) => changeTableItem1(e.target.value, table, key, keyC)}
                                                                           value={value['wfname']}/>


                                                                )
                                                            }
                                                            if (keyC == 2) {
                                                                return (
                                                                    <div className={styles.tableContentItemm}
                                                                         style={{width: arr2[keyC] + '%'}} key={keyC}>
                                                                        <input className={styles.tableContentItem}
                                                                               style={{width: 60 + '%'}}
                                                                               key={keyC} contentEditable="true"
                                                                               onChange={(e) => changeTableItem1(e.target.value, table, key, keyC)}
                                                                               value={value["startdate"].substring(6, 10)}/>
                                                                        <span>年</span>

                                                                    </div>

                                                                )
                                                            }
                                                            if (keyC == 3) {
                                                                return (
                                                                    <div className={styles.tableContentItemm}
                                                                         style={{width: arr2[keyC] + '%'}} key={keyC}>
                                                                        <input className={styles.tableContentItem}
                                                                               style={{width: 60 + '%'}}
                                                                               key={keyC} contentEditable="true"
                                                                               onChange={(e) => changeTableItem1(e.target.value, table, key, keyC)}
                                                                               value={value['startdate'].substring(3, 5)}/>
                                                                        <span>月</span>

                                                                    </div>

                                                                )
                                                            }
                                                            if(keyC==4){
                                                                return (
                                                                    <input className={styles.tableContentItem}
                                                                           style={{width: arr2[keyC] + '%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e) => changeTableItem12(e.target.value, table, key, keyC)}
                                                                           value={value[valueC]}/>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <input className={styles.tableContentItem}
                                                                           style={{width: arr2[keyC] + '%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e) => changeTableItem1(e.target.value, table, key, keyC)}
                                                                           value={value[valueC]}/>
                                                                )
                                                            }


                                                        })
                                                    }
                                                    <div className={styles.tableContentItemm} style={{width: 7 + "%"}}>
                                                        {/*保存*/}
                                                        <img src={save}
                                                             onClick={(e) => saveTableItem2(key, value, wtidAll, groupAll, page)}/>
                                                    </div>
                                                    <div className={styles.tableContentItemm} style={{width: 7 + "%"}}>
                                                        {/*删除*/}
                                                        <img src={del} onClick={(e) => deleData(deleteBool,key,page,num)}/>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div
                                                    className={key % 2 === 0 ? styles.tableContentLine : styles.tableContentLine1}
                                                    key={key}>
                                                    <input className={styles.tableContentItem}
                                                           style={{width: 8 + "%"}}
                                                           readOnly="true" value={num}/>

                                                    {/*遍历新增的数据*/}
                                                    {
                                                        arr1.map((valueC, keyC) => {
                                                            if (keyC == 0) {
                                                                return (
                                                                    <select className={styles.tableContentItemm}
                                                                            style={{width: arr[keyC] + "%"}} key={keyC}
                                                                            onChange={(e) => changeTableItem1(e.target.value, newData, key, keyC)}>
                                                                        {group0.map((value, key) => {
                                                                            return (
                                                                                <option
                                                                                    className={styles.tableContentItem}
                                                                                    value={value.groupid}
                                                                                    key={key}>{value.groupname}</option>
                                                                            )
                                                                        })
                                                                        }
                                                                    </select>
                                                                )
                                                            }
                                                            if (keyC == 1) {
                                                                return (
                                                                    <select className={styles.tableContentItemm}
                                                                            style={{width: arr[keyC] + "%"}} key={keyC}
                                                                            onChange={(e) => changeTableItem1(e.target.value, newData, key, keyC)}>
                                                                        {wtidAll.data.map((value, key) => {
                                                                            return (
                                                                                <option
                                                                                    className={styles.tableContentItem}
                                                                                    value={value.wfid}
                                                                                    key={key}>{value.wfname}</option>
                                                                            )
                                                                        })
                                                                        }
                                                                    </select>
                                                                )
                                                            }
                                                            if (keyC == 2) {
                                                                return (
                                                                    <div className={styles.tableContentItemm}
                                                                         style={{width: arr2[keyC] + '%'}} key={keyC}> 
                                                                        <select className={styles.tableContentItemm}
                                                                                onChange={(e) => changeTableItem1(e.target.value, table, key, keyC)}
                                                                                style={{width: 60 + '%'}}>
                                                                            {yeares.map((value, key) => {
                                                                                if(key==1){
                                                                                    return (
                                                                                        <option value={value}
                                                                                                name="selectOpt2"
                                                                                                className={styles.tableContentItem}
                                                                                                key={key}>{value}</option>

                                                                                    )
                                                                                }
                                                                                return (
                                                                                    <option value={value}
                                                                                            className={styles.tableContentItem}
                                                                                            key={key}>{value}</option>
                                                                                )
                                                                            })
                                                                            }
                                                                        </select>
                                                                        <span>年</span>

                                                                    </div>

                                                                )
                                                            }
                                                            if (keyC == 3) {
                                                                return (
                                                                    <div className={styles.tableContentItemm}
                                                                         style={{width: arr2[keyC] + '%'}}  key={keyC}>
                                                                        <select className={styles.tableContentItemm}
                                                                                onChange={(e) => changeTableItem1(e.target.value, table, key, keyC)}
                                                                                style={{width: 60 + '%'}}>
                                                                            {month4.map((value, key) => {
                                                                                return (
                                                                                    <option value={value}
                                                                                            className={styles.tableContentItem}
                                                                                            key={key}>{value}</option>
                                                                                )
                                                                            })
                                                                            }
                                                                        </select>
                                                                        <span>月</span>

                                                                    </div>

                                                                )
                                                            }
                                                            if(keyC==4){
                                                                return (
                                                                    <input className={styles.tableContentItem}
                                                                           style={{width: arr2[keyC] + '%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e) => changeTableItem12(e.target.value, table, key, keyC)}
                                                                           value={value[valueC]}/>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <input className={styles.tableContentItem}
                                                                           style={{width: arr2[keyC] + '%'}}
                                                                           key={keyC} contentEditable="true"
                                                                           onChange={(e) => changeTableItem1(e.target.value, newData, key, keyC)}
                                                                           value={value[valueC]}/>
                                                                )
                                                            }


                                                        })
                                                    }
                                                    <div className={styles.tableContentItemm} style={{width: 7 + "%"}}>
                                                        {/*保存*/}
                                                        <img src={save}
                                                             onClick={(e) => saveTableItem(key, value, wtidAll, groupAll, page,num)}/>
                                                    </div>
                                                    <div className={styles.tableContentItemm} style={{width: 7 + "%"}}>
                                                        {/*删除*/}
                                                        <img src={del} onClick={(e) => deleDate(key,)}/>
                                                    </div>
                                                </div>
                                            )

                                        }


                                    })
                                }
                            </div>


                        </div>


                    </div>
                    <div className={styles.buttonss}>
                        <span className={styles.first} onClick={() => theOne(page, years0, wfids)}>首页</span>
                        <span className={styles.first} onClick={() => lastPage(page, years0, wfids)}>上一页</span>
                        <span className={styles.first}>{page + "/" + totalpage}</span>
                        <span className={styles.first}
                              onClick={() => nextPage(page, table.data.totalRecord, pageSize, years0, wfids)}>下一页</span>
                        <span className={styles.first}
                              onClick={() => theLast(page, table.data.totalRecord, pageSize, years0, wfids)}>末页</span>
                    </div>

                </div>
            );
        } else {
            return (<Login></Login>)
        }


    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
        page: state.vars.page1,
        dataenter: state.vars.dataenter,
        wfidCount: state.vars.wfidCount,
        wtidAll: state.objs.wtidAll,
        groupAll: state.objs.groupAll,
        boll2: state.vars.boll2,
        years0: state.vars.years0,
        wfids: state.vars.wfids,
        totalpage: state.vars.totalpage,
        skinStyle: state.vars.skinStyle,
        alertText : state.vars.alertText,//弹框提示文字
        deleteBool : state.vars.deleteBool,//是否删除
        x : state.vars.x,//x,y,z为三个删除操作的参数
        y : state.vars.y,
        z : state.vars.z,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // 刚加载页面获取数据
        ajax: () => {
            var obj = {
                test: ''
            }
            dispatch(actions.setVars('page1', 1));

            $.ajax({
                url: soam + '/info/getStageprice',
                type: 'post',
                data: {
                    "curpage": 1,
                    "pageSize": pageSize,
                },
                dataType: 'json',//here,
                //  timeout:'3000',
                success: function (data) {
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('totalpage', data.data.totalPage));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));

                    getgroupid()
                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
          //  获取区域
            function getgroupid() {
                $.ajax({
                    url: soam + '/BaseData/getGroup',
                    type: 'post',
                    dataType: 'json',//here,
                    success: function (data) {

                        dispatch(actions.setObjs('groupAll', data));

                        getwtid()
                    },
                    error: function () {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败'));
                    }
                });
            }
            //获取风场
            function getwtid() {
                $.ajax({
                    url: 'http://10.68.100.32:8080/soam/wf/getAll',
                    type: 'post',
                    dataType: 'json',//here,
                    success: function (data) {

                        dispatch(actions.setObjs('wtidAll', data));
                        dispatch(actions.setVars('boll2', true));
                    },
                    error: function () {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败'));
                    }
                });
            }
        },
        init: () => {
            $("option[name='selectOpt']").prop('selected',true);
            //dispatch(actions.setObjs('tableContent', obj));
        },
        //查询
        buttonAction (sit,){
            // 获取select 选择的内容
            var tContent = $('#textContent5')[0].value;
            var tContent1 = $('#textContent6')[0].value;
            dispatch(actions.setVars('page1', 1));
            dispatch(actions.setVars('years0', tContent));
            dispatch(actions.setVars('wfids', tContent1));

            $.ajax({
                url: soam + '/info/getStageprice',
                type: 'post',
                data: {
                    "curpage": 1,
                    "pageSize": pageSize,
                    "year": tContent,
                    "wfid": tContent1,

                },
                dataType: 'json',//here,
                success: function (data) {
                    if(data.data==null){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '找不到您想要的数据'));
                    }else{
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('totalpage', data.data.totalPage));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                    }
                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        //修改页面的内容

        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.pagedata[i][arr1[j]] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        changeTableItem12: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.pagedata[i][arr1[j]] = value;
            let reyz = /^[0-9]+.?[0-9]*$/;
            if (!reyz.test(value)){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请输入数字类型的成本(例:0.02)'));
                tableV.data.pagedata[i][arr1[j]]='';
            }
            dispatch(actions.setObjs('tableContent', tableV));
        },
        //增加
        addData: (i, totalpage, years0, wfids) => {
            page = totalpage;
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam + '/info/getStageprice',
                type: 'post',
                data: {
                    "curpage": page,
                    "pageSize": pageSize,
                    "year": years0,
                    "wfid": wfids,

                },
                dataType: 'json',//here,
                success: function (data) {
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('totalpage', data.data.totalPage));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));

                    jiang();
                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
            function jiang() {
                let tableV = _.clone(getState().objs.tableContent);
                i.price='';
                i.remark='';
                i.year='';
                i.month='';
                tableV.data.pagedata.push(i);
                dispatch(actions.setObjs('tableContent', tableV));
                $("option[name='selectOpt2']").prop('selected',true);
            }

        },
       // 新增内容的保存
        saveTableItem: (li, dis, wtid, groupname, page,num) => {

            let tableV = _.clone(getState().objs.tableContent);
            let wfs = tableV.data.pagedata[li];
            wtid.data.map((value, key) => {
                (value.wfid == wfs.wfid) && (wfs['wfname'] = value.wfname);
            });
            wfs['groupname'] = groupname.data[wfs.groupid];
            wfs['startdate'] = null;
            wfs['enddate'] = null;
            wfs['costtype'] = null;
            wfs['uuid'] = null;
            wfs['day'] = null;
            wfs['id'] = null;
            //wfs.push({groupname:"巴盟"});
            if (wfs.groupid==''){
                wfs.groupid="201612121721151"
                wfs.groupname="巴盟"
            }
            if (wfs.wfid==''){
                wfs.wfid="150801"
                wfs.wfname="川井风电场"
            }
            if (wfs.year==''){
                wfs.year="2016"
            }
            if (wfs.month==''){
                wfs.month="1"
            }
            if(wfs.price==null||wfs.price==''){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '成本不能为空'));
            }else {
                let ddv = JSON.stringify(wfs);

                $.ajax({
                    url: soam + '/info/getSaveStageprice',
                    type: 'post',
                    data: ddv,
                    dataType: 'json',//here,
                    contentType: 'application/json;charset=UTF-8',
                    success: function (data) {
                        dispatch(actions.setVars('years0', null));
                        dispatch(actions.setVars('wfids', null));
                        if(data.data==true){
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '保存成功'));
                        }
                        if(data.code=="0000100"){
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '该月已有值'));
                        }
                        jiang2(num);
                    },
                    error: function () {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败'));
                    }
                });
                function jiang2(num) {
                    //保存后重新加载
                    if (num>pageSize){
                        page=page+1;
                    }
                    $.ajax({
                        url: soam + '/info/getStageprice',
                        type: 'post',
                        data: {
                            "curpage": page,
                            "pageSize": pageSize,
                        },
                        dataType: 'json',//here,
                        //  timeout:'3000',
                        success: function (data) {

                            dispatch(actions.setObjs('tableContent', data));
                            dispatch(actions.setVars('totalpage', data.data.totalPage));
                            dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                            dispatch(actions.setVars('page1', page));

                        },
                        error: function () {
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '获取数据失败'));
                        }
                    });
                }
            }
        },
        //修改之后的保存
        saveTableItem2: (li, dis, wtid, groupname, page) => {

            let tableV = _.clone(getState().objs.tableContent);
            let uuid = tableV.data.pagedata[li].uuid;
            let id = tableV.data.pagedata[li].id;
            let wfs = tableV.data.pagedata[li];

            wtid.data.map((value, key) => {
                (value.wfid == wfs.wfid) && (wfs['wfname'] = value.wfname);
            });
            wfs['groupname'] = groupname.data[wfs.groupid];
            wfs['startdate'] = null;
            wfs['enddate'] = null;
            wfs['costtype'] = null;
            wfs['uuid'] = uuid;
            wfs['day'] = null;
            wfs['id'] = id;
            //wfs.push({groupname:"巴盟"});

            if (wfs.price == null || wfs.price == '') {
                wfs.price = 0.0;
            }


                let ddv = JSON.stringify(wfs);

                $.ajax({
                    url: soam + '/StagePrice/update',
                    type: 'post',
                    data: ddv,
                    dataType: 'json',//here,
                    contentType: 'application/json;charset=UTF-8',
                    success: function (data) {
                        dispatch(actions.setVars('years0', null));
                        dispatch(actions.setVars('wfids', null));
                        if(data.data===true){
                            dispatch(actions.setVars('alertText', '修改成功'));
                            dispatch(actions.setVars('alertBool', false));
                            
                            jiang2();
                        }
                        else{
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '修改失败,请重试'));
                        }


                    },
                    error: function () {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败'));
                    }
                });
                function jiang2() {

                    //修改后的重新加载
                    $.ajax({
                        url: soam + '/info/getStageprice',
                        type: 'post',
                        data: {
                            "curpage": page,
                            "pageSize": pageSize,
                        },
                        dataType: 'json',//here,
                        //  timeout:'3000',
                        success: function (data) {

                            dispatch(actions.setObjs('tableContent', data));
                            dispatch(actions.setVars('totalpage', data.data.totalPage));
                            dispatch(actions.setVars('wfidCount', data.data.pagedata.length));

                        },
                        error: function () {
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '获取数据失败'));
                        }
                    });
                }

        },
       // 删除
        buttonClose:(deleteBool,x,y,z) => {
            dispatch(actions.setVars('deleteBool', true));
            let tableV = _.clone(getState().objs.tableContent);
                let uuid = tableV.data.pagedata[x].uuid;

                $.ajax({
                    url: soam + '/StagePrice/delete',
                    type: 'post',
                    data: {
                        "uuid": uuid,
                    },
                    dataType: 'json',//here,
                    success: function (data) {

                        if(data.data==1){
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '删除成功'));
                        }
                        jiang4(z);
                    },
                    error: function () {
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败'));
                    }
                });
                function jiang4(z) {
                    if(z==1){
                        page=page-1;
                    }
                    $.ajax({
                        url: soam + '/info/getStageprice',
                        type: 'post',
                        data: {
                            "curpage": y,
                            "pageSize": pageSize,
                        },
                        dataType: 'json',//here,
                        success: function (data) {

                            dispatch(actions.setObjs('tableContent', data));
                        },
                        error: function () {
                            dispatch(actions.setVars('alertBool', false));
                            dispatch(actions.setVars('alertText', '获取数据失败'));
                        }
                    });
                }
        },
        buttonConcel:(deleteBool) => {
            dispatch(actions.setVars('deleteBool', true));
        },
        deleData: (deleteBool,key,page,num) => {
            dispatch(actions.setVars('deleteBool', false));
            dispatch(actions.setVars('x', key));
            dispatch(actions.setVars('y', page));
            dispatch(actions.setVars('z', num));
        },
        // 新增的删除
        deleDate: (j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.pagedata.splice(j, 1);
            dispatch(actions.setObjs('tableContent', tableV));
        },

        //上一页
        lastPage: (page, years0, wfids) => {
            page > 1 ? page-- : page;
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam + '/info/getStageprice',
                type: 'post',
                data: {
                    "curpage": page,
                    "pageSize": pageSize,
                    "year": years0,
                    "wfid": wfids,

                },
                dataType: 'json',//here,
                success: function (data) {

                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        //下一页
        nextPage: (page, i, j, years0, wfids) => {
            (page < Math.ceil(i / j)) ? page++ : page;
            dispatch(actions.setVars('page1', page));
            if (wfids == undefined) {
                wfids = null;
            }


            $.ajax({
                url: soam + '/info/getStageprice',
                type: 'post',

                data: {
                    "curpage": page,
                    "pageSize": pageSize,
                    "year": years0,
                    "wfid": wfids,

                },
                dataType: 'json',//here,
                success: function (data) {

                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));

                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });

        },
        //第一页
        theOne: (page, years0, wfids) => {
            page = 1;
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam + '/info/getStageprice',
                type: 'post',
                data: {
                    "curpage": page,
                    "pageSize": pageSize,
                    "year": years0,
                    "wfid": wfids,

                },
                dataType: 'json',//here,
                success: function (data) {

                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
       // 末页
        theLast: (page, i, j, years0, wfids) => {
            page = Math.ceil(i / j);
            dispatch(actions.setVars('page1', page));
            $.ajax({
                url: soam + '/info/getStageprice',
                type: 'post',
                data: {
                    "curpage": page,
                    "pageSize": pageSize,
                    "year": years0,
                    "wfid": wfids,

                },
                dataType: 'json',//here,
                success: function (data) {

                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error: function () {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
