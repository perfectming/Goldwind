import React from 'react';
import {connect} from 'react-redux';
import styles from './stateCountStyle.scss';
import drop from '../../../img/comp/drop2.gif';
import Login from '../../../../../../components/common/Loading.jsx';
import AlertWindow from './AlertWindow.jsx';
let type = require('./ywbb_date');

var $ =require('jquery');
var actions = require('redux/actions');
var {browserHistory} = require('react-router');
let url=require('../../urlData').url;

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
    

    render() {
            let {skinStyle,logType,alertText,devtype,AlertBool=false,showType,showTypeId,playjq,searchnum} = this.props;
            if(AlertBool){
                //获取设备类型数组
                let treetype=[],logTypeArr=[];//设备类型
                for(let arg in devtype.wfs){
                    if(devtype.wfs[arg].name){
                        treetype.push(devtype.wfs[arg])
                    }
                }
                if(logType!==undefined){
                    for(let i in logType){
                        logTypeArr.push(logType[i])
                    }
                }
                return (
                    <div className={skinStyle==1? styles.faultBoxBlue:skinStyle==2? styles.faultBoxWhite:styles.faultBox}>
                        <AlertWindow text={alertText}></AlertWindow>
                        <div className={styles.search_tit}>
                            <div className={styles.seleBox}>
                                <span>电厂:</span>
                                <div className={styles.select}>
                                    <span id='showitem'>{treetype[0].name}</span>
                                    <img src={drop} id='slide' className={styles.topimg}/>
                                    <div className={styles.selectye} id='selectye'>
                                        {
                                            treetype.map((value, key)=> {
                                                return (
                                                    <div className={styles.item} key={key} onClick={()=>{showType(value.id)}}><span>{value.name}</span></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div> 
                            </div>
                            <div className={styles.seleBox}>
                                <span>日志类型:</span>
                                <div className={styles.select}>
                                    <span id='showitem2'>{logTypeArr[0].name}</span>
                                    <img src={drop} id='slide2' className={styles.topimg}/>
                                    <div className={styles.selectye} id='selectye2'>
                                        {
                                            logType!==undefined && logTypeArr.map((value, key)=> {
                                                return (
                                                    <div className={styles.item} key={key} onClick={()=>{showTypeId(value.id)}}><span>{value.name}</span></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div> 
                            </div>
                            <div className={styles.seleBox}>
                                <div className={styles.dateBox}>
                                    <span>发生时间</span><input id="startTime" type='date'/>
                                    <span>结束时间</span><input id="endTime" type='date'/>
                                </div>
                            </div>

                            <div className={styles.btnBox}>
                                <button id='searchall' onClick={()=>searchnum()}><img src={'http://'+url+'/images/button/search.gif'}/>查询</button>
                            </div>
                            <div className={styles.btnBox}>
                                <button><img src={'http://'+url+'/images/button/outbox.gif'}/>导出Excel</button>
                            </div>
                        </div>
                        <div className={styles.bottomtable}>
                            
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
        skinStyle: state.vars.skinStyle, //全局换肤
        alertText : state.vars.alertText,
        devtype:state.objs.devtype,
        logType:state.objs.logType,
        AlertBool:state.vars.AlertBool,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax:()=>{
            dispatch(actions.setVars('AlertBool', false));
            //获取设备类型信息
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=GetWfForLog&type=1&BTZ=480&crossDomain=true&zip=false&',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:5000,       
                success:function(json,textStatus){  
                    dispatch(actions.appendObjs('devtype',json));
                    
                    let idArr=[];
                    for(let i in json.wfs){
                        idArr.push(json.wfs[i].id)
                    }
                    $.ajax({    
                        url:'http://'+url+'/Monitor/xml.aspx',    
                        data:'functionname=GetSysByWf&type=1&wfid='+idArr[0]+'&BTZ=480&crossDomain=true&zip=false&',    
                        dataType:"jsonp",    
                        jsonp:"callback",    
                        jsonpCallback:"testCall",    
                        timeout:5000,       
                        success:function(json,textStatus){  
                            //console.log(json)
                            dispatch(actions.appendObjs('logType',json));
                            dispatch(actions.setVars('AlertBool', true));
                        },    
                        error:function(XMLHttpRequest,textStatus,errorThrown){    
                            console.log('请求超时！')   
                        }    
                    });
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){    
                    console.log('请求超时！')
                }    
            });
        },
        init: () => {

        },
        showType :(v) => {
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=GetSysByWf&type=1&wfid='+v+'&BTZ=480&crossDomain=true&zip=false&',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:5000,       
                success:function(json,textStatus){  
                    //console.log(json)
                    dispatch(actions.setObjs('logType',json));
                    
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){    
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '请求超时！'));   
                }    
            });
        },
        showTypeId:(v) =>{

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
            $('#endTime').val(dateString);
            //显示下拉菜单
            $('#slide').on('click',function(){
                $('#selectye').show();
            });
            //鼠标移出隐藏下拉菜单
            $('#selectye').mouseleave(function(){
                $(this).hide()
            });
            //显示下拉菜单
            $('#slide2').on('click',function(){
                $('#selectye2').show();
            });
            //鼠标移出隐藏下拉菜单
            $('#selectye2').mouseleave(function(){
                $(this).hide()
            });
            //选择显示设备类型并隐藏下拉菜单
            $('#selectye2>div').on('click',function(){
                $('#showitem2').html($(this).html());
                $('#selectye2').hide();
            });
            //选择显示设备类型并隐藏下拉菜单
            $('#selectye>div').on('click',function(){
                $('#showitem').html($(this).html());
                $('#selectye').hide();
            });
            //查询按钮功能
            $('#searchall').on('click',function(){
                $('#tabtit span').css('background','none');
                $('#tablist td').css('background','none');
             
                //显示表格
                $('#tablebox').show();
            })
        },
        searchnum:()=>{
            //获取查询时间
            var startTime=$('#startTime').val();
            var endTime=$('#endTime').val();
            var all=[];
            //清空数组
            all.splice(0,all.length);//字段
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
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请选择设备！')); 
                return;
            }
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=CountStationInfo&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&groupbydevice=0&crossDomain=true&zip=false',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:5000,       
                success:function(json,textStatus){ 
                    if(json.wtid==undefined){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '无符合条件数据'));
                        return;
                    } 
                    dispatch(actions.setObjs('chartData',json));
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){    
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '请求超时！'));   
                }    
            });
            
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
