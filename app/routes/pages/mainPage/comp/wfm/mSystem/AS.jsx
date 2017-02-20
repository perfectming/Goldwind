import React from 'react';
import {connect} from 'react-redux';
import AlertWindow from '../../wbi/KPI/AlertWindow.jsx';//提示框
var actions = require('redux/actions');
var $ =require('jquery');
import styles from './AS.scss';
let soam='http://10.68.100.32:8080/soam';//设置接口
import Login from '../../../../../../components/common/Loading.jsx';
var {getState} = require('../../../../../../redux/store');
import del from '../../../img/icon/tabDel.png';//定义图片路径
import save from '../../../img/comp/save.png';
var pageSize=11;//设置初始页码
import refresh from '../../../img/comp/refresh.png';
import tabAdd from '../../../img/icon/tabAdd.png';
import _ from 'lodash';
let header=[
    '序号',
    '设备类型',
    '故障代码',
    '故障名称',
    '故障等级',
    '声提醒',
    '光提醒',
    '短信通知',
    '邮件提醒',
    '故障类型',
    '备注说明'
];
let arr=['wttypedefine','protocolid','blooeydescr','faultlevel','issound','isligth','ismessage','ismail','faulttype','remark'];
let tabaleData = require('./../../../../../../../config/data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {alertText,skinStyle,saveTableItem,addData,deleData,page,theOne,lastPage,nextPage,theLast,wttypedefine,protocolid,init,wfidCount,buttonAction,onFocus,inputOnChange,add,table, changeTableItem,dele} = this.props;
        let num=0;
        let newData={};
        for(let i=0;i<arr.length;i++){
            newData[arr[i]]='';
        }
        if (table) {//判断数据是否存在
            return (
                <div>
                    <AlertWindow text={alertText}></AlertWindow>
                    <div className={skinStyle==2?styles.inquireBoxWhite:styles.inquireBox}>
                        {
                            tabaleData.as.comps.map((value, key)=> {
                                if (value.type === 'input') {
                                    return (
                                        <div className={styles.inputBox} key={key}>
                                            <span>{tabaleData.as.comps[key].valueName}</span>
                                            <input id={'textContent' + key} placeholder={value.content}
                                                   onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                                   onFocus={()=>onFocus} style={{width: value.width}}/>
                                        </div>
                                    )
                                } else if (value.type === 'button') {
                                    return (
                                        <div className={styles.btnBox} key={key}>
                                            <button onClick={()=>buttonAction()}>{value.title}</button>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className={styles.btn}>
                        <img src={refresh} onClick={()=>init()}/>
                        <img src={tabAdd} onClick={()=>add(newData)}/>
                    </div>

                    <div className={skinStyle==1?styles.tableBoxBlue:skinStyle==2?styles.tableBoxWhite:styles.tableBox}>
                        <div className={styles.tableHeaderBox}>
                            {
                                header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width: (100 / (header.length + 1)) + "%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                            <div className={styles.tableHeaderItem}
                                 style={{width: (100 / (header.length + 1)) + "%"}} key={header.length}></div>
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                table.data.pagedata && table.data.pagedata.map((value, key)=> {
                                    num++;
                                    {/*if (key < wfidCount / 1) {*/}
                                        return (
                                            <div
                                                className={key % 2 === 0 ? styles.tableContentLine : styles.tableContentLine1}
                                                key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width: (100 / (header.length + 1)) + "%"}}
                                                       readOnly="true"
                                                       value={num}/>
                                                {
                                                    arr.map((valueC, keyC)=> {
                                                        if(valueC=='wttypedefine'||valueC=='protocolid'||valueC=='faulttype'){
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (header.length + 1)) + "%"}}
                                                                       key={keyC} readOnly="readOnly"
                                                                       onChange={(e)=>changeTableItem(e.target.value, table, key, keyC)}
                                                                       value={value[valueC]}/>
                                                            )
                                                        }else{
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width: (100 / (header.length + 1)) + "%"}}
                                                                       key={keyC}
                                                                       onChange={(e)=>changeTableItem(e.target.value, table, key, keyC)}
                                                                       value={value[valueC]}/>
                                                            )
                                                        }
                                                    })
                                                }
                                                <div className={styles.tableContentItem}
                                                     style={{width: (50 / (header.length + 1)) + "%"}}>
                                                    <img src={save}
                                                         onClick={()=>saveTableItem(key)}/>
                                                </div>
                                                {/*<div className={styles.tableContentItem}*/}
                                                     {/*style={{width: (50 / (header.length + 1)) + "%"}}>*/}
                                                    {/*<img src={del} onClick={(e)=>deleData(key)}/>*/}
                                                {/*</div>*/}
                                            </div>
                                        )
                                    {/*} else {*/}
                                        {/*return (*/}
                                            {/*<div*/}
                                                {/*className={key % 2 === 0 ? styles.tableContentLine : styles.tableContentLine1}*/}
                                                {/*key={key}>*/}
                                                {/*<input className={styles.tableContentItem}*/}
                                                       {/*style={{width: (100 / (header.length + 1)) + "%"}}*/}
                                                       {/*readOnly="true"*/}
                                                       {/*value={num}/>*/}
                                                {/*{*/}
                                                    {/*arr.map((valueC, keyC)=> {*/}
                                                        {/*return (*/}
                                                            {/*<input className={styles.tableContentItem}*/}
                                                                   {/*style={{width: (100 / (header.length + 1)) + "%"}}*/}
                                                                   {/*key={keyC}*/}
                                                                   {/*onChange={(e)=>changeTableItem(e.target.value, table, key, keyC)}*/}
                                                                   {/*value={value[valueC]}/>*/}
                                                        {/*)*/}
                                                    {/*})*/}
                                                {/*}*/}
                                                {/*<div className={styles.tableContentItem}*/}
                                                     {/*style={{width: (50 / (header.length + 1)) + "%"}}>*/}
                                                    {/*<img src={save}*/}
                                                         {/*onClick={()=>addData(key)}/>*/}
                                                {/*</div>*/}
                                                {/*<div className={styles.tableContentItem}*/}
                                                     {/*style={{width: (50 / (header.length + 1)) + "%"}}>*/}
                                                    {/*<img src={del} onClick={(e)=>dele(key)}/>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*)*/}
                                    {/*}*/}
                                })
                            }
                        </div>
                    </div>
                    <div className={skinStyle==2?styles.pageplusWhite:styles.pageplus}>
                        <span onClick={()=>theOne(page, wttypedefine, protocolid)}>首页</span>
                        <span onClick={()=>lastPage(page, wttypedefine, protocolid)}>上一页</span>
                        <span>{page + "/" + table.data.totalPage}</span>
                        <span onClick={()=>nextPage(page, table.data.totalRecord, pageSize, wttypedefine, protocolid)}>下一页</span>
                        <span
                            onClick={()=>theLast(page, table.data.totalRecord, pageSize, wttypedefine, protocolid)}>末页</span>
                    </div>
                </div>
            )
        }else{return(<Login></Login>)}
    }
})


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContentAS,
        page:state.vars.pageAS,
        wttypedefine:state.vars.wttypedefine,
        protocolid:state.vars.protocolid,
        ASCount:state.vars.ASCount,
        skinStyle: state.vars.skinStyle,
        alertText : state.vars.alertText,//弹框提示文字
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('pageAS', 1));
            dispatch(actions.setVars('wttypedefine', null));
            dispatch(actions.setVars('protocolid', null));
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:{pageSize:pageSize,curpage:1},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAS', data));
                    dispatch(actions.setVars('ASCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        buttonAction (){
            // 获取select 选择的内容
            var tContent = $('#textContent5')[0].value;
            var tContent1 = $('#textContent6')[0].value;
            dispatch(actions.setVars('pageAS', 1));
            dispatch(actions.setVars('wttypedefine', tContent));
            dispatch(actions.setVars('protocolid', tContent1));
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:{pageSize:pageSize,curpage:1,wttypedefine:tContent,protocolid:tContent1},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAS', data));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        saveTableItem:(line)=>{
            let tableV = _.clone(getState().objs.tableContentAS);
            let asd=tableV.data.pagedata[line];
            let wfp;
            wfp=JSON.stringify(asd);
            $.ajax({
                url: soam+'/Alarm/uppAlarm?alarm=data',
                type: 'post',
                data: wfp,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function (data) {
                    //console.log(data,'Victory');
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '保存成功'));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:{pageSize:pageSize,curpage:1},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setObjs('tableContentAS', data));
                    dispatch(actions.setVars('ASCount', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '刷新列表失败'));
                }
            });
        },
        changeTableItem: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContentAS);
            tableV.data.pagedata[i][arr[j]] = value;
            dispatch(actions.setObjs('tableContentAS', tableV));
        },
        add:(i) => {
            let tableV = _.clone(getState().objs.tableContentAS);
            tableV.data.pagedata.push(i);
            dispatch(actions.setObjs('tableContentAS', tableV));
        },
        addData:(li)=>{
            let tableV = _.clone(getState().objs.tableContentAS);
            let wfs=tableV.data.pagedata[li];
            (wfs.wfid==='') && (wfs.wfid='150801');
            let ddv;
            ddv=JSON.stringify(wfs);
            //console.log(wfs,ddv);
            $.ajax({
                url: soam+'/Alarm/addAlarm?alarm=data',
                type: 'post',
                data: ddv,
                dataType: 'json',//here,
                contentType:'application/json;charset=UTF-8',
                success:function (data) {
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '添加成功'));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:'pageSize='+pageSize+'&&curpage=1',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setVars('ASCount', data.data.pagedata.length));
                    dispatch(actions.setObjs('tableContentAS', data));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '刷新列表失败'));
                }
            });
        },
        deleData:(j) => {
            let tableV = _.clone(getState().objs.tableContentAS);
            let fid=tableV.data.pagedata[j]['id'];
            $.ajax({
                url: soam+'/Alarm/delAlarm',
                type: 'post',
                data:'id='+fid,
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data);
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '删除成功'));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
            $.ajax({
                url: soam+'/ELEC/getWfelec',
                type: 'post',
                data:'pageSize='+pageSize+'&&nowPage=1',
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data.data.pagedata.length);
                    dispatch(actions.setObjs('tableContent', data));
                    dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        dele:(j) => {
            let tableV = _.clone(getState().objs.tableContentAS);
            tableV.data.pagedata.splice(j,1);
            dispatch(actions.setObjs('tableContentAS', tableV));
        },
        inputOnChange:(value,id)=>{

        },
        lastPage:(page,x,y)=>{
            page>1 ? page--:page;
            dispatch(actions.setVars('pageAS', page));
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:{pageSize:pageSize,curpage:page,wttypedefine:x,protocolid:y},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data)
                    dispatch(actions.setObjs('tableContentAS', data));
                    dispatch(actions.setVars('ASCount', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        nextPage:(page,i,j,x,y)=>{
            (page<Math.ceil(i/j)) ? page++:page;
            console.log(page,i,j);
            dispatch(actions.setVars('pageAS', page));
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:{pageSize:pageSize,curpage:page,wttypedefine:x,protocolid:y},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data)
                    dispatch(actions.setObjs('tableContentAS', data));
                    dispatch(actions.setVars('ASCount', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });

        },
        theOne :(page,x,y)=>{
            page=1;
            dispatch(actions.setVars('pageAS', page));
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:{pageSize:pageSize,curpage:page,wttypedefine:x,protocolid:y},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data)
                    dispatch(actions.setObjs('tableContentAS', data));
                    dispatch(actions.setVars('ASCount', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
        theLast :(page,i,j,x,y)=>{
            page=Math.ceil(i / j);
            dispatch(actions.setVars('pageAS', page));
            $.ajax({
                url: soam+'/Alarm/getAlarmruleInfoList',
                type: 'post',
                data:{pageSize:pageSize,curpage:page,wttypedefine:x,protocolid:y},
                dataType: 'json',//here,
                success:function (data) {
                    //console.log(data)
                    dispatch(actions.setObjs('tableContentAS', data));
                    dispatch(actions.setVars('ASCount', data.data.pagedata.length));
                },
                error:function(){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败'));
                }
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
