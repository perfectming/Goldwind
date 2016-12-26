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
        },1500)
    },
   showTree (devurl){
    let{playjq,showtree,select_list2,devtype1}=this.props;
   
           
             
            
       

        

    showtree(devurl,alltree,alltree1);
    //初始化jquery方法
        setTimeout(function(){
            playjq();
        },1000)
   },

    render() {
         let {devtype1,boolywbb1=false,showtree,playjq,select_list2,select_list21,secondtree1,threetree1,tabledata1,clickitem,chart1,chart1name,chart1Title} = this.props;
           let treetype=[];
           let lefttree=[];
           let Tarr=[];
           let Barr=[];
           let Carr=[];
            let one=[];
            let two=[];
            let three=[];  
            let alltree=[];
            let alltree1=[];    
            if(select_list2!=undefined){
           //获取设备类型对应的左侧树形二级和三级数据
              for(let arg2 in select_list2){
                if(select_list2[arg2].id &&select_list2[arg2].id!=''){
                    if(select_list2[arg2].type=='wf'){
                      one.push(select_list2[arg2])
                     }else if(select_list2[arg2].type=='wl'){
                      two.push(select_list2[arg2])
                     }else if(select_list2[arg2].type=='wt' && select_list2[arg2].args.devtype=='EnergyMeter'){

                        three.push(select_list2[arg2])
                    }
                }
              }
                //二级菜单
          for(let i=0; i<one.length;i++){
            let two1=[];
            three.map((value,key)=>{
            if(value.parentid==one[i].id){
              two1.push(value)
            }
          })
          alltree.push(two1)
        }

            }
           //表格数据处理
           if(tabledata1!=undefined){








              //获取标题
              for(let title in tabledata1){
                if(tabledata1[title].Unit!=''){
                Tarr.push(tabledata1[title].Caption+'('+tabledata1[title].Unit+')')
                }else{
                  Tarr.push(tabledata1[title].Caption)
                }
              }
              var len;
              //获取数据
               for(let val in tabledata1){

                Barr.push(tabledata1[val].Values.split(','))
                len=tabledata1[val].Values.split(',').length

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

            if(boolywbb1){
                //获取设备类型数组
            for(let arg in devtype1.list){
                if(devtype1.list[arg].args.name){
                    treetype.push(devtype1.list[arg])
                }
            }
              //获取设备类型对应的左侧树形一级数据
            for(let arg2 in select_list21){
                if(select_list21[arg2].id &&　select_list21[arg2].id!=''){
                    lefttree.push(select_list21[arg2])
                }
            }



        return (
            <div className={styles.faultBox}>
                <div className={styles.search_tit}>
                    <div className={styles.seleBox}>
                        <span>设备类型:</span>
                        <div className={styles.select}>
                            <span id='showitem'><img src={'http://'+url+'/'+devtype1.list._EnergyMeter.img}/>{devtype1.list._EnergyMeter.args.name}</span>
                            
                           
                        </div> 
                    </div>
                    <div className={styles.seleBox}>
                      <div className={styles.dateBox}>
                        <span>发生时间</span><input id="startTime"   type='date'/>
                        <span>结束时间</span><input id="endTime"   type='date'/>
                      </div>
                    </div>

                    <div className={styles.btnBox}>
                        <button id='searchall'><img src={'http://'+url+'/images/button/search.gif'}/>查询</button>
                    </div>
                    <div className={styles.btnBox}>
                        <button><img src={'http://'+url+'/images/button/set.gif'}/>设置参数</button>
                    </div>
                    <div className={styles.btnBox}>
                        <button><img src={'http://'+url+'/images/button/outbox.gif'}/>导出Excel</button>
                    </div>

                </div>
                <div className={styles.leftlist} id='leftlist'>
                  {
                     select_list2 !== undefined && lefttree.map((valueC,keyC)=>{
                        return(
                          <div key={keyC} className={styles.place} >
                            <a className={styles.ca}>
                              <img src={add} />
                              <b><img src={'http://'+url+'/'+valueC.img}/>{valueC.text}</b>
                              <input type='checkbox' value='value'   />
                            </a>
                             {
                                alltree[keyC].map((valueE,keyE)=>{
                                    return(
                                        <div className={styles.placename} key={keyE}>
                                            <a className={styles.da} >
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
                <div className={styles.righttable}>
                  <div className={styles.tablebox} id='tablebox1'>
                       
                          <div className={styles.tabtit} id='tabtit' >
                          {
                            tabledata1!=undefined && Tarr.map((value,key)=>{

                             if(key==0){
                                    return(
                                        <span key={key} style={{width:'140px'}}>{value}</span>
                                        ) 
                                    }else if(key==1){
                                        return(
                                        <span key={key} style={{width:'200px'}}>{value}</span>
                                        ) 
                                    }else{
                                        return(
                                        <span key={key} style={{cursor:'pointer'}} id={'e'+key} onClick={(e)=>clickitem(key,e.target)}>{value}</span>
                                        ) 
                                    }
                            })
                          }
                          </div>
                          <div className={styles.tabody1} id='tabody'>
                          <table id='tablist'>
                          <tbody>
                           {
                            tabledata1!=undefined && Carr.map((value,key)=>{
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
                  </div>

                  <div className={styles.columnbox} id='colum'>
                     { chart1 !==undefined && <Column cnum={chart1} cname={chart1name} ctit={chart1Title} ></Column> }
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
        devtype1:state.objs.devtype1,
        boolywbb1:state.vars.boolywbb1,
        select_list2:state.objs.select_list2,
        select_list21:state.objs.select_list21,
        secondtree1:state.objs.secondtree1,
        threetree1:state.objs.threetree1,
        tabledata1:state.objs.tabledata1,
        chart1:state.vars.chart1,
        chart1name:state.vars.chart1name,
        chart1Title:state.vars.chart1Title,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax:()=>{
          dispatch(actions.setObjs('tabledata1',undefined));
          dispatch(actions.setVars('boolywbb1', false));

            //获取设备类型信息
        $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=GetDevTypeTree&crossDomain=true&zip=false&menuid=1DD28544-7805-4D86-8E39-09404726214A&sysid=1',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){
 
                   dispatch(actions.appendObjs('devtype1',json));
                   gettreedata(); 
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
                dispatch(actions.appendObjs('select_list2',json));
                gettabdata();
                
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });
        }

        function gettabdata(){
              //获取对应设备的数据
        $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=GetWFInfoByMon&devtype=EnergyMeter&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){
 
                dispatch(actions.appendObjs('select_list21',json));
                
                dispatch(actions.setVars('boolywbb1', true));
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
            var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            var dateString1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1);
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
              //隐藏column
              $('#colum').hide();
              //显示表格
              $('#tablebox1').show();
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
               data:'functionname=CountDay&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&modelid=1DD28544-7805-4D86-8E39-09404726214A&devtype=EnergyMeter&CountColumn=true&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){ 
                dispatch(actions.appendObjs('tabledata1',json));
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });

            })




        },
        showtree:(devurl,alltree,alltree1)=>{
            dispatch(actions.appendObjs('secondtree1',alltree));
            dispatch(actions.appendObjs('threetree1',alltree1));
  
       
      


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
          dispatch(actions.setVars('chart1', knum));
          dispatch(actions.setVars('chart1name', Tname));
          dispatch(actions.setVars('chart1Title', even.innerHTML));
          $('#colum').show();
        }
       
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
