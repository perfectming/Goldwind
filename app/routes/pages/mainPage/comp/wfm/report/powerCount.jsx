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
            let {alertText,selectType,lineType=1,boolywbb=false,playjq,select_list,searchnum,powerCountData} = this.props;
            let treetype=[];//设备类型
            let one=[]; //一级菜单
            let two=[]; //二级菜单
            let three=[]; //三级菜单
            let stateArr=[];//风速区间数组
            let timeArr=[];//名称数组
            let windSpeed=[];//平均风速
            let frequency=[];//频次
            let percentArr=[];//平均功率

            let JwindSpeed=[];//矫正风速
            let Jfrequency=[];//矫正频次
            let JpercentArr=[];//矫正功率
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
            if(powerCountData!==undefined&&powerCountData.wtid!==undefined){
                if(lineType==1){//原始曲线
                    let arrString1,arrString2,arrString3,arrString4,arrString5;
                    arrString1=powerCountData.areadescr.Values.split(',');//风速区间
                    arrString2=powerCountData.wtname.Values.split(',');//名称
                    arrString3=powerCountData.averspeed.Values.split(',');//平均风速
                    arrString4=powerCountData.frecount.Values.split(',');//频次
                    arrString5=powerCountData.averpower.Values.split(',');//平均功率
                    for (var i=0 ; i< arrString1.length ; i++){
                            stateArr.push(arrString1[i]);
                    }
                    for (var i=0 ; i< arrString2.length ; i++){
                            timeArr.push(arrString2[i]);
                    }
                    for (var i=0 ; i< arrString3.length ; i++){
                            windSpeed.push((arrString3[i]/1).toFixed(2));
                    }
                    for (var i=0 ; i< arrString4.length ; i++){
                            frequency.push(arrString4[i]);
                    }
                    for (var i=0 ; i< arrString5.length ; i++){
                            percentArr.push((arrString5[i]/1).toFixed(2));
                    }
                }else if(lineType==2){//矫正曲线
                    let arrString1,arrString2,arrString3,arrString4,arrString5;
                    arrString1=powerCountData.areadescr.Values.split(',');//风速区间
                    arrString2=powerCountData.wtname.Values.split(',');//名称
                    arrString3=powerCountData.emaverspeed.Values.split(',');//矫正风速
                    arrString4=powerCountData.emfrecount.Values.split(',');//校正频次
                    arrString5=powerCountData.emaverpower.Values.split(',');//校正功率
                    for (var i=0 ; i< arrString1.length ; i++){
                            stateArr.push(arrString1[i]);
                    }
                    for (var i=0 ; i< arrString2.length ; i++){
                            timeArr.push(arrString2[i]);
                    }
                    for (var i=0 ; i< arrString3.length ; i++){
                            JwindSpeed.push((arrString3[i]/1).toFixed(2));
                    }
                    for (var i=0 ; i< arrString4.length ; i++){
                            Jfrequency.push(arrString4[i]);
                    }
                    for (var i=0 ; i< arrString5.length ; i++){
                            JpercentArr.push((arrString5[i]/1).toFixed(2));
                    }
                }else if(lineType==3){//对比曲线
                    let arrString1,arrString2,arrString3,arrString4,arrString5,arrString6,arrString7,arrString8;
                    arrString1=powerCountData.areadescr.Values.split(',');//风速区间
                    arrString2=powerCountData.wtname.Values.split(',');//名称
                    arrString3=powerCountData.averspeed.Values.split(',');//平均风速
                    arrString4=powerCountData.frecount.Values.split(',');//频次
                    arrString5=powerCountData.averpower.Values.split(',');//平均功率

                    arrString6=powerCountData.emaverspeed.Values.split(',');//矫正风速
                    arrString7=powerCountData.emfrecount.Values.split(',');//矫正频次
                    arrString8=powerCountData.emaverpower.Values.split(',');//校正功率

                    for (var i=0 ; i< arrString1.length ; i++){
                            stateArr.push(arrString1[i]);
                    }
                    for (var i=0 ; i< arrString2.length ; i++){
                            timeArr.push(arrString2[i]);
                    }
                    for (var i=0 ; i< arrString3.length ; i++){
                            windSpeed.push((arrString3[i]/1).toFixed(2));
                    }
                    for (var i=0 ; i< arrString4.length ; i++){
                            frequency.push(arrString4[i]);
                    }
                    for (var i=0 ; i< arrString5.length ; i++){
                            percentArr.push((arrString5[i]/1).toFixed(2));
                    }
                    for (var i=0 ; i< arrString6.length ; i++){
                            JwindSpeed.push((arrString6[i]/1).toFixed(2));
                    }
                    for (var i=0 ; i< arrString7.length ; i++){
                            Jfrequency.push(arrString7[i]);
                    }
                    for (var i=0 ; i< arrString8.length ; i++){
                            JpercentArr.push((arrString8[i]/1).toFixed(2));
                    }
                }else if(lineType==4){//分析曲线
                    let arrString1,arrString2,arrString3,arrString4,arrString5,arrString6;
                    arrString1=powerCountData.wtname.Values.split(',');//名称
                    arrString2=powerCountData.rectime.Values.split(',');//时间
                    arrString3=powerCountData.winspeed.Values.split(',');//风速
                    arrString4=powerCountData.tbpow.Values.split(',');//功率
                    arrString5=powerCountData.emwinspeed.Values.split(',');//矫正风速
                    arrString6=powerCountData.emtbpow.Values.split(',');//矫正功率
                    for (var i=0 ; i< arrString1.length ; i++){
                            stateArr.push(arrString1[i]);
                    }
                    for (var i=0 ; i< arrString2.length ; i++){
                            timeArr.push(arrString2[i]);
                    }
                    for (var i=0 ; i< arrString3.length ; i++){
                            windSpeed.push((arrString3[i]/1).toFixed(2));
                    }
                    for (var i=0 ; i< arrString4.length ; i++){
                            percentArr.push(arrString4[i]);
                    }
                    for (var i=0 ; i< arrString5.length ; i++){
                            JwindSpeed.push((arrString5[i]/1).toFixed(2));
                    }
                    for (var i=0 ; i< arrString6.length ; i++){
                            JpercentArr.push(arrString6[i]);
                    }
                }
                
            }else{
                powerCountData=undefined;
            }
            if(boolywbb){
                let treetype=["原始曲线","矫正曲线","对比曲线","分析曲线"];
                return (
                    <div className={styles.faultBox}>
                        <AlertWindow text={alertText}></AlertWindow>
                        <div className={styles.search_tit}>
                            <div className={styles.seleBox}>
                                <span>曲线种类:</span>
                                <div className={styles.select}>
                                    <span id='showitem'>原始曲线</span>
                                    <img src={drop} id='slide' className={styles.topimg}/>
                                    <div className={styles.selectye} id='selectye'>
                                        {
                                            treetype.map((value, key)=> {
                                                return (
                                                    <div className={styles.item} key={key} onClick={()=>selectType(key)}><span>{value}</span></div>
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
                                <button id='searchall' onClick={()=>searchnum(lineType)}><img src={'http://'+url+'/images/button/search.gif'} />查询</button>
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
                                                <input type='checkbox' value={valueC.children? 'value':valueC.id} name='firstId'/>
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
                                                                    <input type='checkbox' value={valueD.children? 'value':valueD.id} name='secondId'/>
                                                                </a>
                                                                { 
                                                                    three.map((valueE,keyE)=>{
                                                                        if(valueE.parentid==valueD.id && valueE.args.wfid==valueC.id){
                                                                            return(
                                                                                <div className={styles.placeline} key={keyE}>
                                                                                    <a className={styles.ea} >
                                                                                        <b style={{cursor:'auto'}}><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                                                        <input type='checkbox' value={valueE.id}  name='thirdId'/>
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
                                {powerCountData==undefined && <OneColumn month={timeArr} arr1={frequency} unit1={'次'} nameOne={'频次'} title={'风频图'}></OneColumn>}
                            </div>
                            <div className={styles.tablebox} id='tablebox'>
                                {powerCountData!==undefined &&
                                <table>
                                    {lineType==1&&
                                        <tbody>
                                            <tr className={styles.thState}><th>序号</th><th>名称</th><th>风速区间(m/s)</th><th>平均风速(m/s)</th><th>平均功率(kW)</th><th>频次</th></tr>
                                            {
                                                stateArr.map((value,key)=>{
                                                    return(
                                                        <tr key={key} className={styles.thState}><th>{key+1}</th><th>{timeArr[key]}</th><th>{value}</th><th>{windSpeed[key]}</th><th>{percentArr[key]}</th><th>{frequency[key]}</th></tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    }
                                    {lineType==2&&
                                        <tbody>
                                            <tr className={styles.thState}><th>序号</th><th>名称</th><th>风速区间(m/s)</th><th>矫正风速(m/s)</th><th>校正功率(kW)</th><th>矫正频次</th></tr>
                                            {
                                                stateArr.map((value,key)=>{
                                                    return(
                                                        <tr key={key} className={styles.thState}><th>{key+1}</th><th>{timeArr[key]}</th><th>{value}</th><th>{JwindSpeed[key]}</th><th>{JpercentArr[key]}</th><th>{Jfrequency[key]}</th></tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    }
                                    {lineType==3&&
                                        <tbody>
                                            <tr className={styles.PowCouTh}><th>序号</th><th>名称</th><th>风速区间(m/s)</th><th>平均风速(m/s)</th><th>矫正风速(m/s)</th><th>平均功率(kW)</th><th>矫正功率(kW)</th><th>频次</th><th>矫正频次</th></tr>
                                            {
                                                stateArr.map((value,key)=>{
                                                    return(
                                                        <tr key={key} className={styles.PowCouTh}><th>{key+1}</th><th>{timeArr[key]}</th><th>{value}</th><th>{windSpeed[key]}</th><th>{JwindSpeed[key]}</th><th>{percentArr[key]}</th><th>{JpercentArr[key]}</th><th>{frequency[key]}</th><th>{Jfrequency[key]}</th></tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    }
                                    {lineType==4&&
                                        <tbody>
                                            <tr className={styles.thState}><th>序号</th><th>名称</th><th>时间</th><th>风速(m/s)</th><th>矫正风速(m/s)</th><th>功率(kW)</th><th>矫正功率</th></tr>
                                            {
                                                stateArr.map((value,key)=>{
                                                    return(
                                                        <tr key={key} className={styles.thState}><th>{key+1}</th><th>{value}</th><th>{timeArr}</th><th>{windSpeed[key]}</th><th>{JwindSpeed[key]}</th><th>{percentArr[key]}</th><th>{JpercentArr[key]}</th></tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    }
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
        alertText : state.vars.alertText,
        boolywbb:state.vars.boolywbb,
        select_list:state.vars.select_list,
        powerCountData:state.objs.powerCountData,
        lineType:state.vars.lineType,
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
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '获取数据失败！'));  
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
            })
            //下拉点击事件
            $("#leftlist b").on('click',function(){
                $(this).parent().siblings().toggle();
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
            });
            //显示下拉菜单
            $('#slide').on('click',function(){
                $('#selectye').show();
            });
            //鼠标移出隐藏下拉菜单
            $('#selectye').mouseleave(function(){
                $(this).hide()
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
        selectType:(key)=>{
            dispatch(actions.setVars('lineType',key+1));
            dispatch(actions.setObjs('powerCountData',undefined));
        },
        searchnum:(lineType)=>{
            var firstId=[],secondId=[],thirdId=[];
            //获取查询时间
            var startTime=$('#startTime').val();
            var endTime=$('#endTime').val();
            
            $('#leftlist input').each(function(){
                 if($(this).prop('checked')==true){
                    if($(this).val()!=='value'){
                      firstId.push($(this).val())
                    }
                  }

              })
              if(firstId.length>50){
                firstId.splice(50,firstId.length);
              }
              if(firstId.length==0){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请选择设备！'));  
                return;
              }
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=DrawPowCurve&wtid='+firstId+'&wfid='+secondId+'&wlid='+thirdId+'&starttime='+startTime+'&endtime='+endTime+'&outputype='+lineType+'&BTZ=480&crossDomain=true&zip=false',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:3000,       
                success:function(json,textStatus){ 
                    if(json.wtid==undefined){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '无数据！'));  
                        return;
                    } 
                    dispatch(actions.setObjs('powerCountData',json));
                    console.log(json)
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){    
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败！'));  
                }    
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
