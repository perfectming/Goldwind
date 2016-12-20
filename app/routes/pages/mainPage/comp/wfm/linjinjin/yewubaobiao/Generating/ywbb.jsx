import React from 'react';
import {connect} from 'react-redux';
import styles from './ywbb.scss';
import jian from '../../../../../img/comp/jian_icon.png';
import add from '../../../../../img/comp/add_icon.png';
import drop from '../../../../../img/comp/drop2.gif';
import Column from './colum.jsx';
import Login from '../../../../../../../../components/common/Loading.jsx';
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
        
            console.log(devtype)
            console.log(one)
            console.log(two)
            console.log(three)



    showtree(devurl,alltree,alltree1,firstname);
    //初始化jquery方法
        setTimeout(function(){
            playjq();
        },1000)
   },

    render() {
         let {devtype,boolywbb=false,showtree,playjq,firstname,select_list,select_list1,secondtree,threetree} = this.props;
           let treetype=[];
           let lefttree=[];

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
                    
                </div>


                <div className={styles.leftlist} id='leftlist'>
                  {
                     select_list !== undefined && lefttree.map((valueC,keyC)=>{
                        return(
                          <div key={keyC} className={styles.place} >
                            <a className={styles.ca}>
                              <img src={add} />
                              <b><img src={'http://'+url+'/'+valueC.img}/>{valueC.text}</b>
                              <input type='checkbox' onClick={(e)=>sent_info(valueC.args.wfid,e.target)} />
                            </a>
                            {
                                secondtree[keyC].map((valueD,keyD)=>{
                                    return(
                                        <div className={styles.placename} key={keyD}>
                                            <a className={styles.da}>
                                              <img src={add} />
                                              <b><img src={'http://'+url+'/'+valueD.img}/>{valueD.text}</b>
                                              <input type='checkbox' onClick={(e)=>sent_info(valueD,e.target)} />
                                            </a>

                                            {
                                                threetree[keyD].map((valueE,keyE)=>{
                                                    return(
                                                        <div className={styles.placeline} key={keyE}>
                                                            <a className={styles.ea}>
                                                               <b><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                              <input type='checkbox' onClick={(e)=>sent_info(valueE,e.target)}/>
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
                <div className={styles.righttable}></div>

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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax:()=>{
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
       
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
