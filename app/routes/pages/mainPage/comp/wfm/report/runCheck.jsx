import React from 'react';
import {connect} from 'react-redux';
import styles from './stateCountStyle.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import drop from '../../../img/comp/drop2.gif';
import LineChart from './lineChart.jsx';
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
    showTree (devurl){
        let{playjq,showtree,select_list,firstname,devtype}=this.props;
        //点击切换下拉选择项
            for(let id in devtype.list){
                if(devtype.list[id].id==devurl){
                    firstname=devtype.list[id];
                }
            }
    showtree(devurl,firstname);
        //初始化jquery方法
        setTimeout(function(){
            playjq();
        },1500)
    },

    render() {
            let {skinStyle,alertText,devtype,boolywbb=false,showtree,playjq,firstname,select_list,devurls='WindTurbine',searchnum,runCheckData} = this.props;
            let treetype=[];//设备类型
            let one=[]; //一级菜单
            let two=[]; //二级菜单
            let three=[]; //三级菜单
            let stateArr=[];//状态数组
            let numberArr=[];//时间数组
            let timeArr=[];//时长数组
            let timeDescribe=[];//时长描述
            let stateCode=[];//状态代码
            let beiZhu=[];//备注
            let yTime=[];//原时间
            let yModle=[];//原模型
            let cycle=[];//周期
            let cycleDescribe=[];//周期描述
            //获取设备类型对应的左侧树形二级和三级数据
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
            if(runCheckData!==undefined && runCheckData.rectime!==undefined){
                let arrString0,arrString1,arrString2,arrString3,arrString4,arrString5,arrString6,arrString7,arrString8,arrString9;
                arrString0=runCheckData.blooeydescr.Values.split(',');//代码解释
                arrString1=runCheckData.WTUR0Other0Wn0I160StopModeWord.Values.split(',');//停机模式字
                arrString2=runCheckData.dateperiod.Values.split(',');//周期描述
                arrString3=runCheckData.datelength.Values.split(',');//时长描述
                arrString4=runCheckData.rectime.Values.split(',');//时间
                arrString5=runCheckData.remark.Values.split(',');//备注
                arrString6=runCheckData.srcblooeydescr.Values.split(',');//原模式
                arrString7=runCheckData.srcrectime.Values.split(',');//原时间
                arrString8=runCheckData.timelength.Values.split(',');//时长
                arrString9=runCheckData.timeperiod.Values.split(',');//周期
                for (var i=0 ; i< arrString0.length ; i++){
                    stateArr.push(arrString0[i]);//代码解释
                }
                for (var i=0 ; i< arrString1.length ; i++){
                    stateCode.push(arrString1[i]/1);//停机模式字
                }
                for (var i=0 ; i< arrString4.length ; i++){
                    numberArr.push(new Date(arrString4[i]/1).toLocaleDateString()+' '+new Date(arrString4[i]/1).toLocaleTimeString());//时间
                }
                for (var i=0 ; i< arrString3.length ; i++){
                    timeDescribe.push(arrString3[i]);//时长描述
                }
                for (var i=0 ; i< arrString2.length ; i++){
                    cycleDescribe.push(arrString2[i]);//周期描述
                }
                for (var i=0 ; i< arrString5.length ; i++){
                    beiZhu.push(arrString5[i]);//备注
                }
                for (var i=0 ; i< arrString6.length ; i++){
                    yModle.push(arrString6[i]);//原模式
                }
                for (var i=0 ; i< arrString7.length ; i++){
                    yTime.push(arrString7[i]);//原时间
                }
                for (var i=0 ; i< arrString8.length ; i++){
                    timeArr.push(arrString8[i]);//时长
                }
                for (var i=0 ; i< arrString9.length ; i++){
                    cycle.push(arrString9[i]);//周期
                }
            }else{
                runCheckData=undefined;
            }
            if(boolywbb){
                //获取设备类型数组
                for(let arg in devtype.list){
                    if(devtype.list[arg].args.name){
                        treetype.push(devtype.list[arg])
                    }
                }

                //初始化显示设备类型
                if(firstname==undefined){
                    firstname=devtype.list._WindTurbine;
                }
            
                return (
                    <div className={skinStyle==1? styles.faultBoxBlue:skinStyle==2? styles.faultBoxWhite:styles.faultBox}>
                        <AlertWindow text={alertText}></AlertWindow>
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
                        <div className={styles.leftlist} id='leftlist'>
                            {
                                select_list !== undefined && one.map((valueC,keyC)=>{
                                    return(
                                        <div key={keyC} className={styles.place} >
                                            <a className={styles.ca}>
                                                <img src={add}/>
                                                <b><img src={'http://'+url+'/'+valueC.img}/>{valueC.text}</b>
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
                                                                    {valueD.children==undefined && <input type='radio' name='radioBox' value={valueD.id} />}
                                                                </a>
                                                                { 
                                                                    three.map((valueE,keyE)=>{
                                                                        if(valueE.parentid==valueD.id && valueE.args.wfid==valueC.id){
                                                                            return(
                                                                                <div className={styles.placeline} key={keyE}>
                                                                                    <a className={styles.ea} >
                                                                                        <b style={{cursor:'auto'}}><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                                                        <input type='radio' name='radioBox' value={valueE.id}  />
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
                                                                    <input type='radio' name='222' value={valueE.id}  />
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
                                {runCheckData!==undefined && <LineChart title={'设备状态查询用例规划'} month={numberArr} data={stateCode} unit1={'状态代码'}></LineChart>}
                            </div>
                            <div className={styles.tablebox} id='tablebox'>
                                {runCheckData!==undefined &&
                                <table>
                                    <tbody>
                                        <tr className={styles.runCheck}><th>序号</th><th>原时间</th><th>原模式</th><th>时间</th><th>停机模式字</th><th>代码解释</th><th>时长(s)</th><th>时长描述(h)</th><th>周期(s)</th><th>周期描述(h)</th><th>备注</th></tr>
                                        {
                                            stateCode.map((value,key)=>{
                                                return(
                                                    <tr key={key} className={styles.runCheck}><th>{key+1}</th><th>{yTime[key]}</th><th>{yModle[key]}</th><th>{numberArr[key]}</th><th>{value}</th><th>{stateArr[key]}</th><th>{timeArr[key]}</th><th>{timeDescribe[key]}</th><th>{cycle[key]}</th><th>{cycleDescribe[key]}</th><th>{beiZhu[key]}</th></tr>
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
        devtype:state.objs.devtype,
        boolywbb:state.vars.boolywbb,
        firstname:state.objs.firstname,
        select_list:state.vars.select_list,
        devurls:state.vars.devurls,
        runCheckData:state.objs.runCheckData,
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
                timeout:5000,       
                success:function(json,textStatus){  
                    dispatch(actions.appendObjs('devtype',json));
                    gettreedata(); 
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){ 
                    console.log('请求超时！') 
                }    
            });


            function gettreedata(){
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
            $('#endTime').val(dateString);
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
        showtree:(devurl,firstname)=>{
            dispatch(actions.setVars('boolywbb', false));
            dispatch(actions.appendObjs('firstname',firstname));
            //获取对应设备的数据
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=GetWFInfoByMonNoWfType&devtype='+devurl+'&crossDomain=true&zip=false',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:5000,       
                success:function(json,textStatus){  
                    dispatch(actions.setVars('select_list',json));
                    dispatch(actions.setVars('devurls',devurl));
                    dispatch(actions.setVars('boolywbb', true));
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){    
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '请求超时！'));    
                }    
            });
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
            if(all.length>1){
                all.splice(0,all.length-1);
            }
            if(all.length==0){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请选择设备！'));
                return;
            }
            $.ajax({    
                url:'http://'+url+'/RealTimeInfo/xml.aspx',    
                data:'functionname=GetStatData&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&iec=WTUR.Other.Wn.I16.StopModeWord&proid=1467&BTZ=480&crossDomain=true&zip=false',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:5000,       
                success:function(json,textStatus){ 
                    if(json.rectime==undefined){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '无符合条件数据'));
                        return;
                    } 
                    dispatch(actions.setObjs('runCheckData',json));
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
