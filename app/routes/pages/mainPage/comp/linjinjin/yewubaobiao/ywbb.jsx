import React from 'react';
import {connect} from 'react-redux';
import styles from './ywbb.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
let type = require('./ywbb_date');
let btype = type.comps.from;
var actions = require('redux/actions');
var $ =require('jquery');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
     buttonAction (){
        //开始时间
        var sTime = this.refs.startTime.value;
        //结束时间时间
        var eTime = this.refs.endTime.value;

        if(sTime == '' || eTime == ''){
            alert('请选择开始或者结束时间');
            return false;
        }
        
    },
   

    render() {
         let {changeselect,select_list,sent_info,tabarr} = this.props;
        return (
            <div className={styles.faultBox}>
                <div className={styles.search_tit}>


                    {
                        btype.map((value, key,valueName)=> {
                            if (value.type === 'date') {
                                return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input ref="startTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input ref="endTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                            } else  if (value.type === 'input') {
                                return (
                                    <div className={styles.inputBox} key={key}>
                                        <span>{btype[key].valueName}</span>
                                        <input ref={'textContent'+key} placeholder={value.content}
                                               onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                               onFocus={()=>onFocus} style={{width:value.width}}/>
                                    </div>
                                )
                            }else if (value.type === 'select') {
                                return (
                                    <div className={styles.seleBox} key={key}>
                                        <span>{btype[key].valueName}</span>
                                        <select ref={'selectType'+key} onChange={()=>changeselect(value.select)} id='selectop'>
                                            {value.select.map((value, key)=> {
                        
                                                return (
                                                    <option value={key} key={key}>{value.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                )
                            }
                                   
                           
                        })
                    }
                     <div className={styles.btnBox}>
                        <button onClick={this.buttonAction}>查询</button>
                    </div>
                    <div className={styles.btnBox}>
                        <button>设置参数</button>
                    </div>
                    <div className={styles.btnBox}>
                        <button>导出Excel</button>
                    </div>
                </div>
                <div className={styles.leftlist} id='leftlist'>
                    {
                      select_list !== undefined && select_list.arr.map((valueC,keyC)=>{
                        return(
                            <div key={keyC} className={styles.place}>
                            <a className={styles.ca}><img src={add} /><span>{valueC.name}</span><input type='checkbox' onClick={(e)=>sent_info(valueC,e.target)} /></a>
                            {
                                valueC.arr.map((valueD,keyD)=>{
                                    return(
                                        <div className={styles.placename} key={keyD}>
                                            <a className={styles.da}><img src={add} /><span>{valueD.name}</span><input type='checkbox' onClick={(e)=>sent_info(valueD,e.target)} /></a>
                                             {
                                                valueD.arr.map((valueE,keyE)=>{
                                                    return(
                                                        <div className={styles.placeline} key={keyE}>
                                                            <a className={styles.ea}><img src={add} /><span>{valueE.name}</span><input type='checkbox' onClick={(e)=>sent_info(valueE,e.target)}/></a>
                                                                {
                                                                    valueE.arr.map((valueF,keyF)=>{
                                                                        return(
                                                                            <div className={styles.placefan} key={keyF}>
                                                                                <a className={styles.fa}><span>{valueF.name}</span><input type='checkbox' onClick={(e)=>sent_info(valueF,e.target)} /></a>
                                            
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        )
                                })
                            }
                            </div>
                            )
                      })
                        
                    }
                </div>
                <div className={styles.righttable}>
                    <div className={styles.tablebox}>
                        <div className={styles.tabtit} id='tablist'>
                        {
                            select_list !== undefined && select_list.param.map((value,key)=>{
                                if(key==0){
                                        return(
                                        <span key={key} style={{width:'80px'}}>{value}</span>
                                        ) 
                                    }else if(key==1){
                                        return(
                                        <span key={key} style={{width:'300px'}}>{value}</span>
                                        ) 
                                    }else{
                                        return(
                                        <span key={key}>{value}</span>
                                        ) 
                                    }
                            })
                        }
                        </div>
                        <div className={styles.tabline} id='tabline'>
                            {
                                console.log(tabarr),
                               tabarr!== undefined && tabarr.map((value,key)=>{
                                    if(key==0){
                                        return(
                                        <span key={key} style={{width:'80px'}}>{value}</span>
                                        ) 
                                    }else if(key==1){
                                        return(
                                        <span key={key} style={{width:'300px'}}>{value}</span>
                                        ) 
                                    }else{
                                        return(
                                        <span key={key}>{value}</span>
                                        ) 
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        select_list:state.vars.select_list,
        tabarr:state.vars.tabarr,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            //select选择事件隐藏DIV
            $('#selectop').change(function(){
                $("#leftlist>div div").hide();
                $("#leftlist>div img").attr('src', add);
            })
            //表格宽度等于span宽度的和
            var i=$('#tablist span').length;
            $('#tablist').width((i-2)*150+380)
            $('#tabline').width((i-2)*150+380)
            //复选框状态跟随
            $("#leftlist input").change(function(){
                $(this).parent().siblings().find('input').prop('checked',$(this).prop('checked'))
            })
            //select下拉事件
            $("#leftlist span").on('click',function(){
                $(this).parent().siblings().toggle();
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
            })
            //select初始化option个数
            dispatch(actions.setVars('select_list', btype[0].select[0]));
        },
         inputOnChange:(value,id)=>{
           console.log(value,id)
        },
        changeselect:(value)=>{
            dispatch(actions.setVars('select_list', value[$('#selectop').val()]));
        },
        sent_info:(value,even)=>{
            if(even.checked){
            let num=[];

            if(value.name){
                value.arr.map((valueA,keyA)=>{
                    if(valueA.name){
                       valueA.arr.map((valueB,keyB)=>{
                          if(valueB.name){
                            valueB.arr.map((valueC,keyC)=>{
                                if(valueC.name){  
                                    valueC.arr.map((valueD,keyD)=>{
                                        num.push(valueD);

                                       if(keyD==valueC.arr.length-1){
                                        console.log(num);
                                        dispatch(actions.setVars('tabarr', num));
                                         num=[];
                                       }
                                    })
                                }else{
                                    num.push(valueC);
                                     if(keyC==valueB.arr.length-1){
                                        console.log(num);
                                        dispatch(actions.setVars('tabarr', num));
                                         num=[];
                                       }
                                }
                            }) 
                            }else{
                                    num.push(valueB);
                                    if(keyB==valueA.arr.length-1){
                                        console.log(num);
                                        dispatch(actions.setVars('tabarr', num));
                                         num=[];
                                       }
                                }
                        }) 
                    }else{
                                    num.push(valueA);
                                    if(keyA==value.arr.length-1){
                                        console.log(num);
                                        dispatch(actions.setVars('tabarr', num));
                                         num=[];
                                       }
                                }
                })
            }
            
           }
          
        }
    
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
