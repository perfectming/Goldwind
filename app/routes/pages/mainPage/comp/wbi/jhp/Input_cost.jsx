import React from 'react';
import {connect} from 'react-redux';
import styles from './Inputc.scss';

import save from '../../../img/comp/save.png';
import refresh from '../../../img/comp/refresh.png';
import del from '../../../img/icon/tabDel.png';
import add from '../../../img/icon/tabAdd.png';
import _ from 'lodash';
import mod from '../../../../../../../config/Model';
var $ = require("jquery");
var actions = require('redux/actions');
let comps = require('./datas');
let ssg2=mod.Model.ens;
let arr3=[];
let years=[];
let thDate=new Date();
let thYear=thDate.getFullYear();

for(let i=0;i<=30;i++){
    years.push(thYear-15+i)
}
let arr=[12,13,22,11,26,8];
let arr2=[12,13,11,11,11,26,8];
(function(){
    for(let x in ssg2){
        arr3.push(ssg2[x].name);
    }}());
arr3.splice(-2,2);
let comp = comps.peqi.table;
let Component = React.createClass({
    componentDidMount() {
        this.props.init(comp);
    },
    buttonAction (){
        // 获取select 选择的内容
        var sType = this.refs.selectType0.value;
        var sType1 = this.refs.selectType1.value;
        var sType2 = this.refs.selectType2.value;
        var sType3 = this.refs.selectType3.value;
        //开始时间
        var sTime = this.refs.startTime.value;
        //结束时间时间
        var eTime = this.refs.endTime.value;

        var tContent = this.refs.textContent5.value;
        var tContent1 = this.refs.textContent6.value;

        if(sTime == '' || eTime == ''){
            alert('请选择开始或者结束时间');
            return false;
        }
        console.log(sType);
        alert(sType+sType1+sType2+sType3+sTime+eTime+tContent+tContent1);
        // 在这个下边获取这个时间段的数据就行了
        // 然后去更新图表
    },
    render() {
        let {buttonAction,deleData,addData,table, changeTableItem1,page=1,nextpage,lastpage,theone,thelast} = this.props;
        let newData=[];
        let num=0;
        let pagingOptions = {
            showNumber: 3
        }
        for(let i=0;i<comp.data.header.length;i++){
            newData.push('');
        }
        return (
            <div className={styles.powerBox}>
                <div className={styles.table}>
                    <div className={styles.actionBox}>
                        <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                        <img src={refresh}/>
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
                                             style={{width:arr[key]+'%'}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                comp.data.content.map((value, key)=> {
                                    num++;
                                    if(16*(page-1)<=key&&key<(16*(page-1)+16)){
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <input className={styles.tableContentItem}
                                                   style={{width:8+'%'}}
                                                   readOnly="true" value={num}/>
                                            {
                                                value.map((valueC, keyC)=> {
                                                    if(keyC<1){
                                                        return(
                                                            <select name="quyu" id=""
                                                                    className={styles.tableContentItems}
                                                                    style={{width:arr2[keyC]+'%'}}
                                                            >
                                                                <option value="volvo" className={styles.tableContentItems}>{valueC}</option>
                                                                <option value="saab" className={styles.tableContentItems}>{valueC}</option>
                                                                <option value="opel" className={styles.tableContentItems}>{valueC}</option>
                                                                <option value="audi" className={styles.tableContentItems}>{valueC}</option>
                                                            </select>
                                                        )
                                                    }
                                                    if(keyC<2){
                                                        return(
                                                            <select name="fc" id=""
                                                                    className={styles.tableContentItems}
                                                                    style={{width:arr2[keyC]+'%'}}
                                                            >
                                                                <option value="volvo" className={styles.tableContentItems}>{valueC}</option>
                                                                <option value="saab" className={styles.tableContentItems}>{valueC}</option>
                                                                <option value="opel" className={styles.tableContentItems}>{valueC}</option>
                                                                <option value="audi" className={styles.tableContentItems}>{valueC}</option>
                                                            </select>
                                                        )
                                                    }
                                                    if(keyC<3){
                                                        return(
                                                            <input type="date" ref="startTime"   placeholder={valueC}
                                                                   className={styles.tableContentItem}
                                                                   style={{width:arr2[keyC]+'%',height:40}}
                                                            />
                                                        )
                                                    }
                                                    if(keyC<4){
                                                        return(
                                                            <input type="date" ref="endTime"   placeholder={valueC}
                                                                   className={styles.tableContentItem}
                                                                   style={{width:arr2[keyC]+'%',height:40}}
                                                            />
                                                        )
                                                    }
                                                    else{
                                                    return (
                                                        <input className={styles.tableContentItem}
                                                               style={{width:arr2[keyC]+'%'}}
                                                               key={keyC} contentEditable="true"
                                                               onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                               value={valueC}/>
                                                    )}
                                                })
                                            }
                                            <div className={styles.tableContentItem} style={{width:4+"%"}}>
                                                <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.data.content[key]))}/>
                                            </div>
                                            <div className={styles.tableContentItem} style={{width:4+"%"}}>
                                                <img src={del} onClick={(e)=>deleData(key)}/>
                                            </div>
                                        </div>
                                    )}
                                })
                            }
                        </div>






                    </div>



                </div>
                <div className={styles.pageplus}>
                    <button onClick={()=>theone(page)}>首页</button>
                    <button onClick={()=>lastpage(page)}>上一页</button>
                    <button>{page+"/"+Math.ceil(comp.data.content.length / 16)}</button>
                    <button onClick={()=>nextpage(page)}>下一页</button>
                    <button onClick={()=>thelast(page)}>末页</button>
                </div>

            </div>

        );
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
        page: state.vars.page1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (obj) => {
            dispatch(actions.setObjs('tableContent', obj));
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        addData:(i,page) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.content.push(i.splice(0,6));
            dispatch(actions.setObjs('tableContent', tableV));
            page=Math.ceil(comp.data.content.length / 16);
            dispatch(actions.setVars('page1', page));
        },
        deleData:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.data.content.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
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
            page=Math.ceil(comp.data.content.length / 16);
            dispatch(actions.setVars('page1', page));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
