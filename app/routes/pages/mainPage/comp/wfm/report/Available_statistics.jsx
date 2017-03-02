import React from 'react';
import {connect} from 'react-redux';
import styles from './stateCountStyle.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import drop from '../../../img/comp/drop2.gif';
import OneColumn from './oneColumn.jsx';
import Login from '../../../../../../components/common/Loading.jsx';
import AlertWindow from './AlertWindow.jsx';
let type = require('./ywbb_date');
let btype = type.comps.from;
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
            let {skinStyle,alertText,boolywbb=false,playjq,select_list,searchnum,AvaData} = this.props;
            let treetype=[];//设备类型
            let one=[]; //一级菜单
            let two=[]; //二级菜单
            let three=[]; //三级菜单
            let wfname=[];//风场名
            let avaPercent=[];//可利用率
            let name=[];//名称
            let type=[];//机组类型
            let timeS=[];//开始时间
            let timeE=[];//结束时间
            let timeFault=[];//故障时长
            let timeRemain=[];//剩余可控时间
            let result=[];//监控结果
            //获取左侧树形二级和三级数据
            for(let arg2 in select_list){
                if(select_list[arg2].id &&select_list[arg2].id!=''){
                    if(select_list[arg2].type=='wf'){
                        one.push(select_list[arg2])
                    }else if(select_list[arg2].type=='wl' || select_list[arg2].parentid.length==6){
                        two.push(select_list[arg2])
                    }else if(select_list[arg2].type=='wt' && select_list[arg2].parentid.length>6){
                        three.push(select_list[arg2])
                    }
                }
            }
            //表格数据处理
            if(AvaData!==undefined&&AvaData.wfid!==undefined){
                let arrString1,arrString2,arrString3,arrString4,arrString5,arrString6,arrString7,arrString8,arrString9;
                arrString1=AvaData.wfname.Values.split(',');//风场名
                arrString2=AvaData.usepercent.Values.split(',');//可利用率
                arrString3=AvaData.wtname.Values.split(',');//名称
                arrString4=AvaData.wttypedefine.Values.split(',');//机组类型
                arrString5=AvaData.databeginTime.Values.split(',');//开始时间
                arrString6=AvaData.dataendTime.Values.split(',');//结束时间
                arrString7=AvaData.faulttime.Values.split(',');//故障时长
                arrString8=AvaData.controltime.Values.split(',');//剩余可控时间
                arrString9=AvaData.monitorresult.Values.split(',');//监控结果
                for (var i=0 ; i< arrString1.length ; i++){
                        wfname.push(arrString1[i]);
                }
                for (var i=0 ; i< arrString2.length ; i++){
                        avaPercent.push(arrString2[i]/1);
                }
                for (var i=0 ; i< arrString3.length ; i++){
                        name.push(arrString3[i]);
                }
                for (var i=0 ; i< arrString4.length ; i++){
                        type.push(arrString4[i]);
                }
                for (var i=0 ; i< arrString5.length ; i++){
                        timeS.push(new Date(arrString5[i]/1).toLocaleDateString()+' '+new Date(arrString5[i]/1).toLocaleTimeString());
                }
                for (var i=0 ; i< arrString6.length ; i++){
                        timeE.push(new Date(arrString6[i]/1).toLocaleDateString()+' '+new Date(arrString6[i]/1).toLocaleTimeString());
                }
                for (var i=0 ; i< arrString7.length ; i++){
                        timeFault.push(arrString7[i]);
                }
                for (var i=0 ; i< arrString8.length ; i++){
                        timeRemain.push(arrString8[i]);
                }
                for (var i=0 ; i< arrString9.length ; i++){
                        result.push(arrString9[i]);
                }
            }else{
                AvaData=undefined;
            }
            if(boolywbb){
                return (
                    <div className={skinStyle==1? styles.faultBoxBlue:skinStyle==2? styles.faultBoxWhite:styles.faultBox}>
                        <AlertWindow text={alertText}></AlertWindow>
                        <div className={styles.search_tit}>
                            <div className={styles.seleBox}>
                                <div className={styles.dateBox}>
                                    <span>日期维度</span><input id="timeLenth" type='date'/>
                                    <span>发生时间</span><input id="startTime" type='date'/>
                                    <span>结束时间</span><input id="endTime" type='date'/>
                                </div>
                            </div>

                            <div className={styles.btnBox}>
                                <button id='searchall' onClick={()=>searchnum()}><img src={'http://'+url+'/images/button/search.gif'} />查询</button>
                            </div>
                            <div className={styles.btnBox}>
                                <button><img src={'http://'+url+'/images/button/outbox.gif'}/>导出Excel</button>
                            </div>
                        </div>
                        <div className={styles.leftlist} id='leftlist'>
                            {
                                select_list !== undefined && one.map((valueC,keyC)=>{
                                    return(
                                        <div key={keyC} className={styles.place} >
                                            <a className={styles.ca}>
                                                <img src={add}/>
                                                <b><img src={'http://'+url+'/'+valueC.img}/>{valueC.text}</b>
                                                <input type='checkbox' value='value'/>
                                            </a>
                                            {
                                                two.length>0 ?
                                                two.map((valueD,keyD)=>{
                                                    if(valueD.parentid==valueC.id){
                                                        return(
                                                            <div className={styles.placename} key={keyD}>
                                                                <a className={styles.da}>
                                                                    <img src={add} />
                                                                    <b><img src={'http://'+url+'/'+valueD.img}/>{valueD.text}</b>
                                                                    <input type='checkbox' value={valueD.children ? 'value' : valueD.id}/>
                                                                </a>
                                                                { 
                                                                    three.map((valueE,keyE)=>{
                                                                        if(valueE.parentid==valueD.id && valueE.args.wfid==valueC.id){
                                                                            return(
                                                                                <div className={styles.placeline} key={keyE}>
                                                                                    <a className={styles.ea} >
                                                                                        <b style={{cursor:'auto'}}><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                                                        <input type='checkbox' value={valueE.id}  />
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })
                                                                  
                                                                }
                                                            </div>
                                                        )
                                                    }     
                                                }) : three.map((valueE,keyE)=>{
                                                    if(valueE.args.wfid==valueC.id){
                                                        return(
                                                            <div className={styles.placename} key={keyE}>
                                                                <a className={styles.da} >
                                                                    <b style={{cursor:'auto'}}><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                                    <input type='checkbox' value={valueE.id}  />
                                                                </a>
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
                        <div className={styles.righttable}>
                            <div className={styles.columnbox} id='colum'>
                                {AvaData!==undefined && <OneColumn month={name} arr1={avaPercent} unit1={'%'} nameOne={'可利用率'} title={'可利用率统计分析'}></OneColumn>}
                            </div>
                            <div className={styles.tablebox} id='tablebox'>
                                {AvaData!==undefined &&
                                <table>
                                    <tbody>
                                        <tr className={styles.thTen}><th>序号</th><th>电场名称</th><th>可利用率</th><th>名称</th><th>机组类型</th><th>开始时间</th><th>结束时间</th><th>故障时长(h)</th><th>剩余可控时间(h)</th><th>监控结果</th></tr>
                                        {
                                            wfname.map((value,key)=>{
                                                return(
                                                    <tr key={key} className={styles.thTen}><th>{key+1}</th><th>{wfname[key]}</th><th>{avaPercent[key]}</th><th>{name[key]}</th><th>{type[key]}</th><th>{timeS[key]}</th><th>{timeE[key]}</th><th>{timeFault[key]}</th><th>{timeRemain[key]}</th><th>{result[key]}</th></tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                }
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
        skinStyle: state.vars.skinStyle, //全局换肤
        alertText : state.vars.alertText,
        boolywbb:state.vars.boolywbb,
        select_list:state.vars.select_list,
        AvaData:state.objs.AvaData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax:()=>{
            dispatch(actions.setVars('boolywbb', false));
            $.ajax({    
                    url:'http://'+url+'/Monitor/xml.aspx',    
                    data:'functionname=GetWFInfoByMonNoWfType&devtype=WindTurbine&crossDomain=true&zip=false',    
                    dataType:"jsonp",    
                    jsonp:"callback",    
                    jsonpCallback:"testCall",    
                    timeout:5000,       
                    success:function(json,textStatus){    
                        dispatch(actions.setVars('select_list',json));
                        dispatch(actions.setVars('boolywbb', true));
                    },    
                    error:function(XMLHttpRequest,textStatus,errorThrown){
                        console.log('请求超时！')    
                    }    
            });
            
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
            $('#endTime').val(dateString);
            $('#timeLenth').val(dateString1);
            //复选框状态跟随
            $("#leftlist input").change(function(){
                $(this).parent().siblings().find('input').prop('checked',$(this).prop('checked'))
            });
            //下拉点击事件
            $("#leftlist b").on('click',function(){
                $(this).parent().siblings().toggle();
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
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
            var all=[];
            //获取查询时间
            var startTime=$('#startTime').val();
            var endTime=$('#endTime').val();
            $('#leftlist input').each(function(){
                if($(this).prop('checked')==true){
                    if($(this).val()!=='value'){
                        all.push($(this).val())
                    }
                }
            });
            if(all.length>50){
                all.splice(50,all.length);
            }
            if(all.length==0){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请选择设备或线路！'));  
                return;
            }
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=GetUsepercentStat&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&stype=1&avli=100&BTZ=480&crossDomain=true&zip=false',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:5000,       
                success:function(json,textStatus){ 
                    if(json.wfid==undefined){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '无符合条件数据！'));  
                        return;
                    } 
                    dispatch(actions.setObjs('AvaData',json));
                    console.log(json)
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
