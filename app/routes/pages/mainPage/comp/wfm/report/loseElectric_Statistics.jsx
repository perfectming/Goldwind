import React from 'react';
import {connect} from 'react-redux';
import styles from './ywbb.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import drop from '../../../img/comp/drop2.gif';
import Column from './colum.jsx';
import Login from '../../../../../../components/common/Loading.jsx';
let type = require('./ywbb_date');
let btype = type.comps.from;
var $ =require('jquery');
var actions = require('redux/actions');
let url='54.223.200.134';

let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
         let{playjq}=this.props;
        //初始化jquery方法
        setTimeout(function(){
            playjq();
        },2500)
    },

    render() {
         let {devtype2,boolywbb2=false,showtree,playjq,select_list3,select_list31,tabledata2,clickitem,chart2,chart2name,chart2Title} = this.props;
           let treetype=[];
           let lefttree=[];
           let Tarr=[];
           let Barr=[];
           let Carr=[];
           let Darr=[];
          let one=[];
          let two=[];
          let three=[];  
          let alltree=[];
          let alltree1=[];
           if(select_list3!=undefined){

              //获取设备类型对应的左侧树形二级和三级数据
              for(let arg2 in select_list3){
                if(select_list3[arg2].id &&select_list3[arg2].id!=''){
                    if(select_list3[arg2].type=='wf'){
                      one.push(select_list3[arg2])
                     }else if(select_list3[arg2].type=='wl'){
                      two.push(select_list3[arg2])
                     }else if(select_list3[arg2].type=='wt' && select_list3[arg2].args.devtype=='WindTurbine'){
                        three.push(select_list3[arg2])
                    }
                }
              }
             //二级菜单
          for(let i=0; i<one.length;i++){
            let two1=[];
            two.map((value,key)=>{
            if(value.parentid==one[i].id){
              two1.push(value)
            }
          })
          alltree.push(two1)
        }
       
          //三级菜单
        alltree.map(function(value,key){
          for(let i=0; i<value.length;i++){
            let two4=[];
            three.map((valueC,keyC)=>{
              if(valueC.parentid==value[i].id){
              two4.push(valueC)
              }
            })
            alltree1.push(two4)
          }
        })
     
           }

           //表格数据处理
           if(tabledata2!=undefined){

              //获取标题
              for(let title in tabledata2){
                   if(tabledata2[title].Caption!=''){
                     Tarr.push(tabledata2[title].Caption)
                   
                  }
                }
                //获取统计
              for(let title in tabledata2){
                  if(tabledata2[title].OK!='wtid' && tabledata2[title].OK!='wtname')
                  Darr.push(tabledata2[title].Count)
                
              }
              
             
              var len;
              //获取数据
               for(let val in tabledata2){
                if(tabledata2[val].Caption!=''){
                Barr.push(tabledata2[val].Values.split(','))
                len=tabledata2[val].Values.split(',').length
                }

              }
               
               for(let i=0;i<len;i++){
                let num=[];
                Barr.map(function(value,key){
                  num.push(value[i])
                })
                Carr.push(num)
               }
               // console.log(Barr)
               // console.log(Carr)
           }

            if(boolywbb2){
                //获取设备类型数组
            for(let arg in devtype2.list){
                if(devtype2.list[arg].args.name){
                    treetype.push(devtype2.list[arg])
                }
            }

        return (
            <div className={styles.faultBox}>
               
                <div className={`${styles.leftlist} ${styles.leftlist1}`} id='leftlist'>
                  {
                     select_list3 !== undefined && one.map((valueC,keyC)=>{
                        return(
                          <div key={keyC} className={styles.place} >
                            <a className={styles.ca}>
                              <img src={add} />
                              <b><img src={'http://'+url+'/'+valueC.img}/>{valueC.text}</b>
                              <input type='checkbox' value='value'   />
                            </a>
                            {
                                alltree[keyC].map((valueD,keyD)=>{
                                    return(
                                        <div className={styles.placename} key={keyD}>
                                            <a className={styles.da}>
                                              <img src={add} />
                                              <b><img src={'http://'+url+'/'+valueD.img}/>{valueD.text}</b>
                                              <input type='checkbox' value='value'  />
                                            </a>

                                            {
                                                alltree1[keyD].map((valueE,keyE)=>{
                                                    return(
                                                        <div className={styles.placeline} key={keyE}>
                                                            <a className={styles.ea} >
                                                               <b style={{cursor:'auto'}}><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                              <input type='checkbox' value={valueE.id}  />
                                                            </a>
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
                <div className={`${styles.righttable} ${styles.righttable1}`}>
                   <div className={`${styles.search_tit} ${styles.search_tit1}`}>
                    <div className={styles.seleBox}>
                      <div className={styles.dateBox}>
                        <span>开始时间</span><input id="startTime"   type='date'/>
                        <span>结束时间</span><input id="endTime"   type='date'/>
                      </div>
                    </div>

                    <div className={styles.btnBox}>
                        <button id='searchall'><img src={'http://'+url+'/images/button/search.gif'}/>查询</button>
                    </div>
                    <div className={styles.btnBox}>
                        <button><img src={'http://'+url+'/images/button/outbox.gif'}/>导出Excel</button>
                    </div>

                </div>
                  <div className={styles.tablebox} id='tablebox'>
                       
                          <div className={`${styles.tabtit} ${styles.tabtit1}`} id='tabtit' >
                          {
                            tabledata2!=undefined && Tarr.map((value,key)=>{

                             if(key==0){
                                    return(
                                        <span key={key} style={{width:'140px'}}>{value}</span>
                                        ) 
                                    }else if(key==1){
                                        return(
                                        <span key={key} style={{width:'200px'}}>{value}</span>
                                        ) 
                                    }else if(key==2){
                                        return(
                                        <span key={key}>{value}</span>
                                        ) 
                                    }else{
                                        return(
                                        <span key={key} style={{cursor:'pointer'}} id={'e'+key} onClick={(e)=>clickitem(key,e.target)}>{value}</span>
                                        ) 
                                    }
                            })
                          }
                          </div>
                          <div className={`${styles.tabody} ${styles.tabody2}`} id='tabody'>
                          <table id='tablist'>
                          <tbody>
                           {
                            tabledata2!=undefined && Carr.map((value,key)=>{
                              return(
                                  <tr className={key%2==0 ? styles.tabline :styles.tabline1} key ={key}>
                                    {
                                      value.map((valueC,keyC)=>{
                                        
                                             if(keyC==0){
                                              return(
                                                <td key={keyC} style={{width:'140px'}}>{valueC}</td>
                                                ) 
                                              }else if(keyC==1){
                                                return(
                                                  <td key={keyC} style={{width:'200px'}}>{valueC}</td>
                                                ) 
                                              }else if(keyC==2){
                                                return(
                                                  <td key={keyC}>{valueC}</td>
                                                ) 
                                              }else{
                                                return(
                                                  <td key={keyC} style={{cursor:'pointer'}}>{Number(valueC).toFixed(2)}</td>
                                               ) 
                                              }
                                          
                                      })
                                    }
                                  </tr>
                                )
                            })
                          }
                          </tbody>
                        </table>
                        </div>
                        <div className={`${styles.bot} ${styles.bot1}`}>

                        <span style={{width:'360px'}}>统计</span>
                        
                           {
                            tabledata2!=undefined && Darr.map((value,key)=>{
                                  return(
                                      <span key={key}>{value.toFixed(2)}</span>
                                      ) 
                            })
                          }
                       
                        </div>
                  </div>

                  <div className={styles.columnbox} id='colum'>
                     { chart2 !==undefined && <Column cnum={chart2} cname={chart2name} ctit={chart2Title} ></Column> }
                  </div>
                </div>

            </div>
        );
        }else{
            return(
                <Login></Login>
                )
        }
    }
});


const mapStateToProps = (state) => {
    return {
        devtype2:state.objs.devtype2,
        boolywbb2:state.vars.boolywbb2,
        select_list3:state.objs.select_list3,
        select_list31:state.objs.select_list31,
        tabledata2:state.objs.tabledata2,
        chart2:state.vars.chart2,
        chart2name:state.vars.chart2name,
        chart2Title:state.vars.chart2Title,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax:()=>{
          dispatch(actions.setVars('boolywbb2', false));
          dispatch(actions.setObjs('tabledata2',undefined));
            //获取设备信息
         $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=GetWFInfoByMon&devtype=WindTurbine&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){  
        
                dispatch(actions.appendObjs('devtype2',json));
                gettreedata()
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });

          function gettreedata(){
           $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=getDevtree&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){    
          
                dispatch(actions.appendObjs('select_list3',json));
                dispatch(actions.setVars('boolywbb2', true));
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });
        }





        },
        
        init: () => {
        },
        playjq:()=>{
          //初始化日期
            var date = new Date();
            if(date.getMonth()==0&&date.getDate()==1){
                var dateString = date.getFullYear()+"-01"+"-01";
                var dateString1 = (date.getFullYear()-1)+"-12"+"-31";
            }else{
                if(date.getMonth()<9){
                    if(date.getDate()<10){
                       var dateString = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate(); 
                    }else{
                       var dateString = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate(); 
                    }
                }else{
                    if(date.getDate()<10){
                       var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate(); 
                    }else{
                       var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(); 
                    }
                }
                if(date.getMonth()<9){
                    if(date.getDate()<11){
                       var dateString1 = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()-1); 
                    }else{
                       var dateString1 = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+(date.getDate()-1); 
                    }
                }else{
                    if(date.getDate()<11){
                       var dateString1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+(date.getDate()-1); 
                    }else{
                       var dateString1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1); 
                    }
                }
            }

          //获取今天与昨天的日期
            $('#startTime').val(dateString1);
            $('#endTime').val(dateString)
            //显示下拉菜单
        $('#slide').on('click',function(){
            $('#selectye').show();
        })
        //鼠标移出隐藏下拉菜单
        $('#selectye').mouseleave(function(){
            $(this).hide()
        })
        //选择显示设备类型并隐藏下拉菜单
        $('#selectye>div').on('click',function(){
            $('#showitem').html($(this).html());
            $('#selectye').hide();
        })



         //复选框状态跟随
            $("#leftlist input").change(function(){
                $(this).parent().siblings().find('input').prop('checked',$(this).prop('checked'))
            })
            //下拉点击事件
            $("#leftlist b").on('click',function(){
                $(this).parent().siblings().toggle();
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
            })
              var all=[];
             
              //查询按钮功能
            $('#searchall').on('click',function(){
              $('#tabtit span').css('background','none');
              $('#tablist td').css('background','none');
             
              //显示表格
              $('#tablebox').show();
              //清空数组
               all.splice(0,all.length);//字段

               //获取查询时间
               var startTime=$('#startTime').val();
               var endTime=$('#endTime').val();
              $('#leftlist input').each(function(){
                 if($(this).prop('checked')==true){
                    if($(this).val()!=='value'){
                      all.push($(this).val())
                    }
                  }

              })
              if(all.length>50){
                all.splice(50,all.length);
              }
              if(all.length==0){
                alert('设备数据获取失败！')
                return;
              }

               $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=GetLostPower&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&proid=null&CountColumn=true&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){  
                dispatch(actions.appendObjs('tabledata2',json));
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });

            })




        },

        clickitem:(kk,even)=>{
          let knum=[];
          let Tname=[];
          $('#'+even.id).css('background','#369').siblings().css('background','none')
          $('#tabody tr').each(function(){
            $(this).children('td').eq(kk).css('background','#369').siblings().css('background','none');
            knum.push(Number($(this).children('td').eq(kk).text()))
            Tname.push($(this).children('td').eq(1).text())
          })
          dispatch(actions.setVars('chart2', knum));
          dispatch(actions.setVars('chart2name', Tname));
          dispatch(actions.setVars('chart2Title', even.innerHTML));
          $('#colum').show();
        },

       
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
