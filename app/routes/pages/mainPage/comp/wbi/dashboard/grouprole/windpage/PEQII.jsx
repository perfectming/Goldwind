import React from 'react';
import {connect} from 'react-redux';
import styles from './PEQII.scss';

import save from '../../../../../img/comp/save.png';
import refresh from '../../../../../img/comp/refresh.png';
import del from '../../../../../img/icon/tabDel.png';
import add from '../../../../../img/icon/tabAdd.png';
import _ from 'lodash';
import mod from '../../../../../../../../../config/Model';
import Login from '../../../../../../../../components/common/Loading.jsx';

var $ = require("jquery");
var actions = require('redux/actions');
var {getState} = require('redux/store');
let comps = require('./data');
let ssg2=mod.Model.ens;
let arr3=[];
let years=[];
let input_url="10.9.99.90:8080";
let thDate=new Date();
let thYear=thDate.getFullYear();
for(let i=0;i<=30;i++){
    years.push(thYear-15+i)
}
(function(){
    for(let x in ssg2){
        arr3.push(ssg2[x].name);
    }}());
arr3.splice(-2,2);
let arr=[15,16,10,15,22,13];
let arr2=[15,16,6,4,15,22,8];
let comp = comps.peqi.table;
let arr1=['groupname','wfname','startdate','startdate','price','remark'];//设置每列的属性
let Component = React.createClass({
     componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {wtidAll,Go,tableT,deleData,addData,table, changeTableItem1,page=1,nextpage,lastpage,theone,thelast} = this.props;
        let newData=[];
        let num=0;
            
        let pagingOptions = {
            showNumber: 3
        }
        for(let i=0;i<comp.data.header.length;i++){
            newData.push('');
        }
        if(Go){
        return (
            <div className={styles.powerBox}>
             <div className={styles.inquireBox}>
                        <div className={styles.seleBox}>
                            <span>年度</span>
                            <select id='textContent5'>
                                {years.map((value, key)=> {
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
                        <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                        <img src={refresh}/>
                        <img src={add} onClick={()=>addData(newData)}/>
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
                                tableT.data.pagedata.map((value, key)=> {
                                    num++;
                                    if(16*(page-1)<=key&&key<(16*(page-1)+16)){
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <input className={styles.tableContentItem}
                                                   style={{width:8+"%"}}
                                                   readOnly="true" value={num}/>
                                            {
                                                arr1.map((valueC, keyC)=> {
                                                    if(keyC==0){
                                                            return(
                                                         
                                                                    <div className={styles.tableContentItemm}
                                                                         style={{width:arr2[keyC]+"%"}} key={keyC}>
                                                                        {value[valueC]}
                                                                    </div>
                                                            )
                                                        }       
                                                      if(keyC==1){
                                                            return(
                                                         <div className={styles.tableContentItemm}
                                                                         style={{width:arr2[keyC]+"%"}} key={keyC}>
                                                                        {value[valueC]}
                                                                    </div>                    

                                                            )
                                                        }                                                
                                                        if(keyC==2){
                                                            return(
                                                             
                                                             <div className={styles.tableContentItemm}
                                                                         style={{width:arr2[keyC]+"%"}} key={keyC}>
                                                                        {(new Date(value[valueC])).toISOString().slice(0,4)}
                                                                        <span>年</span>
                                                                    </div>
                                                            )
                                                        }
                                                           if(keyC==3){
                                                            return(
                                                             
                                                             <div className={styles.tableContentItemm}
                                                                         style={{width:arr2[keyC]+"%"}} key={keyC}>
                                                                        {(new Date(value[valueC])).toISOString().slice(8,9)}<span>月</span>
                                                                    </div>
                                                            )
                                                        }
                                                                 if(keyC==4){
                                                            return(
                                                            
                                                                 <div className={styles.tableContentItemm}
                                                                         style={{width:arr2[keyC]+"%"}} key={keyC}>
                                                                        {value[valueC]}
                                                                </div>
                                                            )
                                                        }
                                                          
                                                        
                                                        else{
                                                            return(
                                                         <div className={styles.tableContentItemm}
                                                                         style={{width:arr2[keyC]+"%"}} key={keyC}>
                                                                        {value[valueC]}
                                                                    </div>
                                                            )
                                                        }

                                                   
                                                })
                                            }
                                            <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.data.content[key]))}/>
                                            </div>
                                            <div className={styles.tableContentItemm} style={{width:7+"%"}}>
                                                <img src={del} onClick={(e)=>deleData(key)}/>
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
                    <span className={styles.first}>{page}/{Math.ceil(comps.peqi.table.data.content.length/16)}</span>
                    <span className={styles.first} onClick={()=>nextpage(page)}>下一页</span>
                    <span className={styles.first} onClick={()=>thelast(page)}>末页</span>
                </div>

            </div>

        )}
        else{
            return(
            <Login></Login>
            );
        }
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
        page: state.vars.page1,
        tableT:state.vars.tableContentT,
        Go:state.vars.Goo,
        wtidAll:state.vars.wtidAlll
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
         ajax: () => {
           // console.log(1);
            $.ajax({
                 url:'http://'+input_url+'/wbi/info/getStageprice',
                type: 'post',
                data:{
                    'curpage':1,
                    'pageSize':16,
                  
                },
                dataType: 'json',//here,
                success:function (data) {
          console.log(data)
                     dispatch(actions.setVars('tableContentT', data));
                      dispatch(actions.setVars('Goo', true));
                    // dispatch(actions.setVars('wfidCount', data.data.pagedata.length));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            $.ajax({
                // url: soam+'/wf/getAll',
                 url:'http://'+input_url+'/wf/getAll',
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.setVars('wtidAlll', data));
                     // dispatch(actions.setObjs('wtidAlll', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        init: (obj) => {
            dispatch(actions.setObjs('tableContent', obj));
        },
        // changeTableItem1: (value, table, i, j) => {
        //     let tableV = _.clone(getState().objs.tableContent);
        //     tableV.data.content[i][j] = value;
        //     dispatch(actions.setObjs('tableContent', tableV));

        // },
        // addData:(i,page) => {
            
        //     let tableV = _.clone(getState().objs.tableContent);
        //     tableV.data.content.push(i.splice(0,6));
        //     dispatch(actions.setObjs('tableContent', tableV));
        //     page=Math.ceil(comps.peqi.table.data.content.length/16);
        //     dispatch(actions.setVars('page1', page));
        // },
        // deleData:(j) => {
        //     let tableV = _.clone(getState().objs.tableContent);
        //     tableV.data.content.splice(j,1);
        //     dispatch(actions.setObjs('tableContent', tableV));
        // },
        // lastpage:(page)=>{
        //     page>1 ? page--:page;
        //     dispatch(actions.setVars('page1', page));
        // },
        // nextpage:(page)=>{
        //     (page<(comp.data.content.length/16)) ? page++:page;
        //     dispatch(actions.setVars('page1', page));

        // },
        // theone :(page)=>{
        //     page=1;
        //     dispatch(actions.setVars('page1', page));
        // },
        // thelast :(page)=>{
        //     page=comp.data.content.length/16;
        //     dispatch(actions.setVars('page1', page));
        // },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
