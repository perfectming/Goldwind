import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('redux/store');
import del from '../../../img/icon/tabDel.png';
import add from '../../../img/icon/tabAdd.png';
var actions = require('redux/actions');
import styles from './Ms.scss';
var $ = require('jquery');
let soam='http://10.9.99.68:8080/soam';
import Abox from './boxA';
import Bbox from './boxB';
import Cbox from './boxC';
import save from '../../../img/comp/save.png';
import close from '../../../img/comp/close_down.png';
import refresh from '../../../img/comp/refresh.png';
import _ from 'lodash';

let tabaleData = require('./data');
let Component = React.createClass({
    componentDidMount() {
        this.props.init(tabaleData.msData);
    },
    buttonAction (){

        var tContent = this.refs.textContent5.value;
        var tContent1 = this.refs.textContent6.value;
        alert(tContent+tContent1);
        // 在这个下边获取这个时间段的数据就行了
        // 然后去更新图表
    },
    render() {

        let {deleData,addData,buttonAction, inputOnChange, onFocus,table, changeTableItem1} = this.props;
        let newData=[];
        let num=0;
        let num1=0;
        let num2=0;
        for(let i=0;i<tabaleData.msData.header.length;i++){
            newData.push('');
        }
        let comp=tabaleData.comps.from;
        return (

            <div className={styles.bodyBox}>
                <div className={styles.roleputBox}>
                    <div className={styles.inquireBox} key='0'>
                        {
                            comp.map((value, key,valueName)=> {
                                if (value.type === 'input') {
                                    return (
                                        <div className={styles.inputBox} key={key}>
                                            <span>{comp[key].valueName}</span>
                                            <input ref={'textContent'+key} placeholder={value.content}
                                                   onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                                   onFocus={()=>onFocus} style={{width:value.width}}/>
                                        </div>
                                    )
                                }else if (value.type === 'button') {
                                    return (
                                        <div className={styles.btnBox} key={key}>
                                            <button onClick={this.buttonAction}>{value.title}</button>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className={styles.actionBox} key='1'>
                        <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table))}/>
                        <img src={add} onClick={()=>addData(newData)}/>
                    </div>
                    <div className={styles.tableBox} key='2'>
                        <div className={styles.tableHeaderBox}>
                            <div className={styles.tableHeaderItem}
                                 style={{width:(100/(tabaleData.msData.header.length+2))+"%"}}>角色编号</div>
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
                                tabaleData.msData.content.map((value, key)=> {
                                    num++;
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <input className={styles.tableContentItem}
                                                   style={{width:(100/(tabaleData.msData.header.length+2))+"%"}}
                                                   readOnly="true" value={num}/>
                                            {
                                                value.map((valueC, keyC)=> {
                                                    if(keyC<2){
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.msData.header.length+2))+"%"}}
                                                                   key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}
                                                                   value={valueC}/>
                                                        )
                                                    }else if(keyC==2) {
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.msData.header.length+2))+"%"}}
                                                                   key={keyC} type="button" value='设置'
                                                                   onClick={()=>{$('#aids').css('display','block');}}/>
                                                        )
                                                    }else if(keyC==3){
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.msData.header.length+2))+"%"}}
                                                                   key={keyC} type="button" value='设置'
                                                                   onClick={()=>{$('#center3').css('display','block')}}/>
                                                        )
                                                    }else{
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/(tabaleData.msData.header.length+2))+"%"}}
                                                                   key={keyC} type="button" value='设置'
                                                                   onClick={()=>{$('#box3').parent().css('display','block')}}/>
                                                        )
                                                    }
                                                })
                                            }
                                            <div className={styles.tableContentItem} style={{width:(50/(tabaleData.msData.header.length+2))+"%"}}>
                                                <img src={save} onClick={()=>alert("您保存的数据为:" + JSON.stringify(table.content[key]))}/>
                                            </div>
                                            <div className={styles.tableContentItem} style={{width:(50/(tabaleData.msData.header.length+2))+"%"}}>
                                                <img src={del} onClick={(e)=>deleData(key)}/>
                                            </div>
                                        </div>
                                    )
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
                                    tabaleData.msData.aids.content.map((value, key)=> {
                                        num1++;
                                        return (
                                            <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width:(100/(tabaleData.msData.aids.header.length+1)-10)+"%"}}
                                                       readOnly="true" value={num1}/>
                                                {
                                                    value.map((valueC, keyC)=> {
                                                        if(keyC==0){
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width:(100/(tabaleData.msData.aids.header.length+1))+"%"}}
                                                                       key={keyC} readOnly="true" value={valueC}/>
                                                            )
                                                        }else {
                                                            return (
                                                                <input className={styles.tableContentItem} key={keyC} value={valueC}
                                                                       style={{width:(100/(tabaleData.msData.aids.header.length+1))+"%"}}
                                                                       onChange={(e)=>changeTableItem1(e.target.value,table,key,keyC)}/>
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
                            <span>{'记录合计：'+num1}</span>
                            <span onClick={()=>{$('#box1').parent().css('display','block')}}>点击</span>
                        </div>
                    </div>
                    <div className={styles.tanC} id="center3" key='4' style={{top: 100, left:300}}>
                        <div className={styles.upName}>角色权限<img src={close} className={styles.wrong} onClick={()=>{$('#center3').css('display','none')}}/></div>
                        <div className={styles.tableHeaderBox}>
                            <div className={styles.tableHeaderItem}
                                 style={{width:(100/(tabaleData.msData.center.header.length+1)-10)+"%"}}>序号</div>
                            {
                                tabaleData.msData.center.header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:(100/(tabaleData.msData.center.header.length+1))+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.newBox}>
                            <div className={styles.tableContentBox}>
                                {
                                    tabaleData.msData.center.content.map((value, key)=> {
                                        num2++;
                                        return (
                                            <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                                <input className={styles.tableContentItem}
                                                       style={{width:(100/(tabaleData.msData.center.header.length+1)-10)+"%"}}
                                                       readOnly="true" value={num1}/>
                                                {
                                                    value.map((valueC, keyC)=> {
                                                        if(keyC==0){
                                                            return (
                                                                <input className={styles.tableContentItem}
                                                                       style={{width:(100/(tabaleData.msData.center.header.length+1))+"%"}}
                                                                       key={keyC} readOnly="true" value={valueC}/>
                                                            )
                                                        }else {
                                                            return (
                                                                <div style={{width:(100/(tabaleData.msData.center.header.length+1))+"%"}}
                                                                     className={styles.tableContentItem} key={keyC}>
                                                                    <input type="checkbox"/>
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
                            <span onClick={()=>{$('#box2').parent().css('display','block')}}>点击</span>
                        </div>
                    </div>
                    <Abox></Abox>
                    <Bbox></Bbox>
                    <Cbox></Cbox>
                </div>
            </div>

         
        );
    }
});


const mapStateToProps = (state) => {
    return {
        table: state.objs.tableContent,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (obj) => {
            dispatch(actions.setObjs('tableContent', obj));
            $.ajax({
                url: soam+'/role/getByRoleidAllMenu',
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    console.log(data);
                    dispatch(actions.appendObjs('boxData', data));
                    $('#boxAm').parent().css('display','block');
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        changeTableItem1: (value, table, i, j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content[i][j] = value;
            dispatch(actions.setObjs('tableContent', tableV));
        },
        inputOnChange:(value,id)=>{

        },
        addData:(i) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.push(i);
            dispatch(actions.setObjs('tableContent', tableV));
        },
        deleData:(j) => {
            let tableV = _.clone(getState().objs.tableContent);
            tableV.content.splice(j,1);
            dispatch(actions.setObjs('tableContent', tableV));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);