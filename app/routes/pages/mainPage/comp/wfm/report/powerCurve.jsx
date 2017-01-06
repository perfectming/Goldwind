import React from 'react';
import {connect} from 'react-redux';
import styles from './stateCountStyle.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import drop from '../../../img/comp/drop2.gif';
import OneColumn from './oneColumn.jsx';
import Login from '../../../../../../components/common/Loading.jsx';
let type = require('./ywbb_date');
let btype = type.comps.from;
var $ =require('jquery');
var actions = require('redux/actions');
var {browserHistory} = require('react-router');
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

    render() {
            let {boolywbb=false,playjq,select_list,searchnum,powerCurveData} = this.props;
            let treetype=[];//设备类型
            let one=[]; //一级菜单
            let two=[]; //二级菜单
            let three=[]; //三级菜单
            let stateArr=[];//风速区间数组
            let timeArr=[];//时长数组
            let windSpeed=[];//平均风速
            let frequency=[];//频次
            let percentArr=[];//百分比数组
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
            if(powerCurveData!==undefined&&powerCurveData.areadescr!==undefined){
                let arrString1,arrString2,arrString3,arrString4,arrString5;
                arrString1=powerCurveData.areadescr.Values.split(',');//风速区间
                arrString2=powerCurveData.windhour.Values.split(',');//累计时长
                arrString3=powerCurveData.averspeed.Values.split(',');//平均风速
                arrString4=powerCurveData.frecount.Values.split(',');//频次
                arrString5=powerCurveData.percent.Values.split(',');//百分比
                for (var i=0 ; i< arrString1.length ; i++){
                        stateArr.push(arrString1[i]);
                }
                for (var i=0 ; i< arrString2.length ; i++){
                        timeArr.push((arrString2[i]/1).toFixed(2));
                }
                for (var i=0 ; i< arrString3.length ; i++){
                        windSpeed.push((arrString3[i]/1).toFixed(2));
                }
                for (var i=0 ; i< arrString4.length ; i++){
                        frequency.push(arrString4[i]/1);
                }
                for (var i=0 ; i< arrString5.length ; i++){
                        percentArr.push((arrString5[i]/1).toFixed(2));
                }
            }else{
                powerCurveData=undefined;
            }
            if(boolywbb){
                return (
                    <div className={styles.faultBox}>
                        <div className={styles.search_tit}>
                            
                            <div className={styles.seleBox}>
                                <div className={styles.dateBox}>
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
                                {powerCurveData!==undefined && <OneColumn month={stateArr} arr1={frequency} unit1={'次'} nameOne={'频次'} title={'风频图'}></OneColumn>}
                            </div>
                            <div className={styles.tablebox} id='tablebox'>
                                {powerCurveData!==undefined &&
                                <table>
                                    <tbody>
                                        <tr className={styles.thState}><th>序号</th><th>风速区间</th><th>频次</th><th>平均风速(m/s)</th><th>累计时长(h)</th><th>百分比(%)</th></tr>
                                        {
                                            stateArr.map((value,key)=>{
                                                return(
                                                    <tr key={key} className={styles.thState}><th>{key+1}</th><th>{value}</th><th>{frequency[key]}</th><th>{windSpeed[key]}</th><th>{timeArr[key]}</th><th>{percentArr[key]}</th></tr>
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
        boolywbb:state.vars.boolywbb,
        select_list:state.vars.select_list,
        powerCurveData:state.objs.powerCurveData,
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
                    timeout:3000,       
                    success:function(json,textStatus){    
                        dispatch(actions.setVars('select_list',json));
                        dispatch(actions.setVars('boolywbb', true));
                    },    
                    error:function(XMLHttpRequest,textStatus,errorThrown){    
                        alert('获取数据失败！');    
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
                alert('设备数据获取失败！')
                return;
            }
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=DrawFrequency&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&groupbydevice=0&BTZ=480&crossDomain=true&zip=false',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:3000,       
                success:function(json,textStatus){ 
                    if(json.areadescr==undefined){
                        alert('无数据');
                        return;
                    } 
                    dispatch(actions.setObjs('powerCurveData',json));
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){    
                    alert('获取数据失败！');    
                }    
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
