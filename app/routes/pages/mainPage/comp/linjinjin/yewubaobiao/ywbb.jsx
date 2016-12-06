import React from 'react';
import {connect} from 'react-redux';
import styles from './ywbb.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import Column from './colum.jsx';
let type = require('./ywbb_date');
let btype = type.comps.from;
var $ =require('jquery');
var actions = require('redux/actions');

let allnum=[];
let chartnum=[];
let chartname=[];

let Component = React.createClass({
    componentDidMount() {
        this.props.init();

    },
   

    render() {
         let {changeselect,select_list,sent_info,tabarr,clickitem,chtnum,chtname,chtit} = this.props;
        return (
            <div className={styles.faultBox}>
                <div className={styles.search_tit}>


                    {
                        btype.map((value, key,valueName)=> {
                            if (value.type === 'date') {
                                return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input id="startTime"  placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input id="endTime"  placeholder={value.content} type={value.type} style={{width:value.width}}/>
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
                        <button id='searchall'>查询</button>
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
                    <div className={styles.tablebox} id='tablebox'>
                        <div className={styles.tabtit} id='tablist'>
                        {
                            select_list !== undefined && select_list.param.map((value,key)=>{
                                if(key==0){
                                        return(
                                        <span key={key} style={{width:'81px'}}>{value}</span>
                                        ) 
                                    }else if(key==1){
                                        return(
                                        <span key={key} style={{width:'301px'}}>{value}</span>
                                        ) 
                                    }else{
                                        return(
                                        <span key={key} style={{cursor:'pointer'}} id={'poin'+key} onClick={(e)=>clickitem(key,e.target)}>{value}</span>
                                        ) 
                                    }
                            })
                        }
                        </div>
                        <div  className={styles.tabline} id='tabline'></div>
                    </div>
                    <div className={styles.columnbox}>
                     { chtnum !==undefined && <Column cnum={chtnum} cname={chtname} ctit={chtit} ></Column> }
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
        chtnum:state.vars.chtnum,
        chtname:state.vars.chtname,
        chtit:state.vars.chtit,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

            console.log('执行init()函数')
             //select选择事件隐藏DIV
            $('#selectop').change(function(){
                $("#leftlist>div div").hide();
                $("#leftlist>div img").attr('src', add);
                $("#leftlist input").prop('checked', false);
            })

            //复选框状态跟随
            $("#leftlist input").change(function(){
                console.log('点击了input')
                $(this).parent().siblings().find('input').prop('checked',$(this).prop('checked'))
            })
            //select下拉事件
            $("#leftlist span").on('click',function(){
                console.log('点击了span')
                $(this).parent().siblings().toggle();
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
            })
            //查询按钮功能
            $('#searchall').on('click',function(){
                console.log('点击了查询')
                $('#tabline').empty();
                $('#tablist span').css('background','#464c58');
                if($('#startTime').val() == '' || $('#endTime').val() == ''){
                    alert('请选择开始或者结束时间');
                }else{
                allnum.map(function(value,key){
                    $('#tabline').append('<div></div>');
                   
                    value.map(function(valueC,keyC){
                        $('#tabline>div').eq(key).append('<span>'+valueC+'</span>')
                        $('#tabline>div').eq(key).find('span').eq(0).width(80);
                        $('#tabline>div').eq(key).find('span').eq(1).width(300);
                    })
                    if(key%2==0){
                        $('#tabline>div').eq(key).css('background','#30343f')
                    }else{
                        $('#tabline>div').eq(key).css('background','#272b34')
                    }
                
                     
                })
            }

            })
            //初始化highchart数据与表格数据
                dispatch(actions.setVars('chtnum',''));
                 dispatch(actions.setVars('chtname',''));
                 dispatch(actions.setVars('tabarr',''));
                 dispatch(actions.setVars('chtit',''));
           
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
                                        allnum.push(num);
                                        
                                         num=[];
                                       }
                                    })
                                }else{
                                    num.push(valueC);
                                     if(keyC==valueB.arr.length-1){
                                        allnum.push(num);
                                        
                                         num=[];
                                       }
                                }
                            }) 
                            }else{
                                    num.push(valueB);
                                    if(keyB==valueA.arr.length-1){
                                        allnum.push(num);
                                       
                                         num=[];
                                       }
                                }
                        }) 
                    }else{
                                    num.push(valueA);
                                    if(keyA==value.arr.length-1){
                                        allnum.push(num);
                                        
                                         num=[];
                                       }
                                }
                })
            }
           
            // console.log(allnum)
           }else{
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
                                        allnum.pop(num);
                                        
                                         num=[];
                                       }
                                    })
                                }else{
                                    num.push(valueC);
                                     if(keyC==valueB.arr.length-1){
                                        allnum.pop(num);
                                        
                                         num=[];
                                       }
                                }
                            }) 
                            }else{
                                    num.push(valueB);
                                    if(keyB==valueA.arr.length-1){
                                        allnum.pop(num);
                                       
                                         num=[];
                                       }
                                }
                        }) 
                    }else{
                                    num.push(valueA);
                                    if(keyA==value.arr.length-1){
                                        allnum.pop(num);
                                        
                                         num=[];
                                       }
                                }
                })
            }

            
            // console.log(allnum)
           }
           // for(var one=0;one<allnum.length-1;one++){
           //      for(var two=one+1;two<allnum.length;two++){
           //         if( allnum[one][0]===allnum[two][0]){
           //          allnum.splice(allnum[two],1);
           //        }
           //      }
                
           //  }
          dispatch(actions.setVars('tabarr', allnum));
        },
        clickitem:(kk,even)=>{
            //点击初始化数据
            dispatch(actions.setVars('chtnum',''));
            dispatch(actions.setVars('chtname',''));

            //初始化对应数组
            chartnum=[];
            chartname=[];
            allnum.map((valueC,keyC)=>{
               
                 chartnum.push(valueC[kk]);
                 chartname.push(valueC[1]);
                  // console.log(chartnum);
                  // console.log(chartname) 
                 dispatch(actions.setVars('chtnum',chartnum));
                 dispatch(actions.setVars('chtname',chartname));
                 dispatch(actions.setVars('chtit',$('#'+even.id).text()));  
                
            })
            $('#'+even.id).css('background','#333').siblings('span').css('background','#464c58')

        }
    
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
