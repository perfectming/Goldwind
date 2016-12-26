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
        },1000)
    },
   showTree (devurl){
    let{playjq,showtree,select_list,firstname,devtype}=this.props;
    let one=[];
    let two=[];
    let three=[];  
    let alltree=[];
    let alltree1=[];
            //点击切换下来选择项
            for(let id in devtype.list){
              if(devtype.list[id].id==devurl){
                firstname=devtype.list[id];
              }

            }
              //获取设备类型对应的左侧树形二级和三级数据
              for(let arg2 in select_list){
                if(select_list[arg2].id &&select_list[arg2].id!=''){
                    if(select_list[arg2].type=='wf'){
                      one.push(select_list[arg2])
                     }else if(select_list[arg2].type=='wl'){
                      two.push(select_list[arg2])
                     }else if(select_list[arg2].type=='wt' && select_list[arg2].args.devtype==devurl){
                        three.push(select_list[arg2])
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



    showtree(devurl,alltree,alltree1,firstname);
    //初始化jquery方法
        setTimeout(function(){
            playjq();
        },1000)
   },

    render() {
         let {devtype,boolywbb=false,showtree,playjq,firstname,select_list,select_list1,secondtree,threetree,tabledata,clickitem,chart,chartname,chartTitle} = this.props;
           let treetype=[];
           let lefttree=[];
           let Tarr=[];
           let Barr=[];
           let Carr=[];
           let Darr=[];
           //表格数据处理
           if(tabledata!=undefined){
            console.log(tabledata)
              //获取标题
              for(let title in tabledata){
                if(tabledata[title].Unit!=''){
                Tarr.push(tabledata[title].Caption+'('+tabledata[title].Unit+')')
                }else{
                  Tarr.push(tabledata[title].Caption)
                }
              }
               //获取统计
              for(let title in tabledata){
                  if(tabledata[title].OK!='wtid' && tabledata[title].OK!='wtname')
                  Darr.push(tabledata[title].Count)
                
              }
              var len;
              //获取数据
               for(let val in tabledata){

                Barr.push(tabledata[val].Values.split(','))
                len=tabledata[val].Values.split(',').length

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

            if(boolywbb){
                //获取设备类型数组
            for(let arg in devtype.list){
                if(devtype.list[arg].args.name){
                    treetype.push(devtype.list[arg])
                }
            }
              //获取设备类型对应的左侧树形一级数据
            for(let arg2 in select_list1){
                if(select_list1[arg2].id &&　select_list1[arg2].id!=''){
                    lefttree.push(select_list1[arg2])
                }
            }

            //初始化显示设备类型
            if(firstname==undefined){
            firstname=devtype.list._WindTurbine;
            }

        return (
            <div className={styles.faultBox}>
                <div className={styles.search_tit}>
                    <div className={styles.seleBox}>
                        <span>设备类型:</span>
                        <div className={styles.select}>
                            <span id='showitem'><img src={'http://'+url+'/'+firstname.img}/>{firstname.args.name}</span>
                            <img src={drop} id='slide' className={styles.topimg}/>
                            <div className={styles.selectye} id='selectye'>
                            {
                                    treetype.map((value, key)=> {
                        
                                    return (
                                        <div className={styles.item} key={key} onClick={()=>{this.showTree(value.id)}}><img src={'http://'+url+'/'+value.img}/>{value.args.name}</div>
                                        )
                                })
                            }
                            </div>
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
                     select_list !== undefined && lefttree.map((valueC,keyC)=>{
                        return(
                          <div key={keyC} className={styles.place} >
                            <a className={styles.ca}>
                              <img src={add} />
                              <b><img src={'http://'+url+'/'+valueC.img}/>{valueC.text}</b>
                              <input type='checkbox' value='value'   />
                            </a>
                            {
                                secondtree[keyC].map((valueD,keyD)=>{
                                    return(
                                        <div className={styles.placename} key={keyD}>
                                            <a className={styles.da}>
                                              <img src={add} />
                                              <b><img src={'http://'+url+'/'+valueD.img}/>{valueD.text}</b>
                                              <input type='checkbox' value='value'  />
                                            </a>

                                            {
                                                threetree[keyD].map((valueE,keyE)=>{
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
                <div className={styles.righttable}>
                  <div className={styles.tablebox} id='tablebox'>
                       
                          <div className={styles.tabtit} id='tabtit' >
                          {
                            tabledata!=undefined && Tarr.map((value,key)=>{

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
                          <div className={styles.tabody} id='tabody'>
                          <table id='tablist'>
                          <tbody>
                           {
                            tabledata!=undefined && Carr.map((value,key)=>{
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
                        <div className={styles.bot}>
                        <span style={{width:'360px'}}>统计</span>
                        
                           {
                            tabledata!=undefined && Darr.map((value,key)=>{
                                  return(
                                      <span key={key}>{value.toFixed(2)}</span>
                                      ) 
                            })
                          }
                        </div>
                  </div>

                  <div className={styles.columnbox} id='colum'>
                     { chart !==undefined && <Column cnum={chart} cname={chartname} ctit={chartTitle} ></Column> }
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
        devtype:state.objs.devtype,
        boolywbb:state.vars.boolywbb,
        firstname:state.objs.firstname,
        select_list:state.objs.select_list,
        select_list1:state.objs.select_list1,
        secondtree:state.objs.secondtree,
        threetree:state.objs.threetree,
        tabledata:state.objs.tabledata,
        chart:state.vars.chart,
        chartname:state.vars.chartname,
        chartTitle:state.vars.chartTitle,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax:()=>{
          dispatch(actions.setVars('boolywbb', false));
          dispatch(actions.setObjs('tabledata',undefined));
            //获取设备类型信息
        $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=GetDevTypeTree&crossDomain=true&zip=false&menuid=1DD28544-7805-4D86-8E39-09404726214A&sysid=1',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){    
                   dispatch(actions.appendObjs('devtype',json));
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
                dispatch(actions.appendObjs('select_list',json));
                dispatch(actions.setVars('boolywbb', true));
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
               data:'functionname=CountDay&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&modelid=1DD28544-7805-4D86-8E39-09404726214A&devtype=WindTurbine&CountColumn=true&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){  
                let shu=[];
                for(let i in json){
                  shu.push(json[i])
                }
                if(shu.length==0){
                  alert('没有符合条件的数据！')
                }
                
                dispatch(actions.appendObjs('tabledata',json));
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });

            })




        },
        showtree:(devurl,alltree,alltree1,firstname)=>{
            dispatch(actions.setVars('boolywbb', false));
            dispatch(actions.appendObjs('secondtree',alltree));
            dispatch(actions.appendObjs('threetree',alltree1));
            dispatch(actions.appendObjs('firstname',firstname));
            //获取对应设备的数据
        $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=GetWFInfoByMon&devtype='+devurl+'&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){  
                dispatch(actions.appendObjs('select_list1',json));
                dispatch(actions.setVars('boolywbb', true));
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });
      


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
          dispatch(actions.setVars('chart', knum));
          dispatch(actions.setVars('chartname', Tname));
          dispatch(actions.setVars('chartTitle', even.innerHTML));
          $('#colum').show();
        },

       
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);