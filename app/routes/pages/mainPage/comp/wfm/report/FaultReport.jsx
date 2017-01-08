import React from 'react';
import {connect} from 'react-redux';
import styles from './stateCountStyle.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import drop from '../../../img/comp/drop2.gif';
import ColumnState from './ColumnState.jsx';
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
            let {alertText,devtype,boolywbb=false,showtree,playjq,firstname,select_list,devurls='WindTurbine',searchnum,faultData} = this.props;
            let treetype=[];//设备类型
            let one=[]; //一级菜单
            let two=[]; //二级菜单
            let three=[]; //三级菜单
            let stateArr=[];//状态数组
            let numberArr=[];//次数数组
            let timeArr=[];//时长数组
            let timeDescribe=[];//时长描述
            let stateCode=[];//状态代码
            let devState=[];//设备状态
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
            if(faultData!==undefined&&faultData.wtid!==undefined){
                let arrString0,arrString1,arrString2,arrString3,arrString4;
                arrString0=faultData.blooeydescr.Values.split(',');
                arrString1=faultData.happencount.Values.split(',');
                arrString2=faultData.timelength.Values.split(',');
                arrString3=faultData.datelength.Values.split(',');
                arrString4=faultData.code.Values.split(',');
                for (var i=0 ; i< arrString0.length ; i++){
                    stateArr.push(arrString0[i]);//故障描述
                }
                for (var i=0 ; i< arrString1.length ; i++){
                        numberArr.push(arrString1[i]/1);//发生次数
                }
                for (var i=0 ; i< arrString2.length ; i++){
                        timeArr.push(arrString2[i]/1);//故障时长
                }
                for (var i=0 ; i< arrString3.length ; i++){
                        timeDescribe.push(arrString3[i]/1);//时长描述
                }
                for (var i=0 ; i< arrString4.length ; i++){
                        stateCode.push(arrString4[i]);//状态代码
                }
            }else{
                faultData=undefined;
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
                    <div className={styles.faultBox}>
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
                                {faultData!==undefined && <ColumnState month={stateArr} arr1={numberArr} arr2={timeArr} unit1={'次'} unit2={'s'} nameOne={'发生次数'} nameTwo={'状态时长'} title={'故障统计'}></ColumnState>}
                            </div>
                            <div className={styles.tablebox} id='tablebox'>
                                {faultData!==undefined &&
                                <table>
                                    <tbody>
                                        <tr className={styles.thState}><th>序号</th><th>故障描述</th><th>状态代码</th><th>发生次数</th><th>状态时长(s)</th><th>时长描述(h)</th></tr>
                                        {
                                            stateCode.map((value,key)=>{
                                                return(
                                                    <tr key={key} className={styles.thState}><th>{key+1}</th><th>{stateArr[key]}</th><th>{value}</th><th>{numberArr[key]}</th><th>{timeArr[key]}</th><th>{timeDescribe[key]}</th></tr>
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
        alertText : state.vars.alertText,
        devtype:state.objs.devtype,
        boolywbb:state.vars.boolywbb,
        firstname:state.objs.firstname,
        select_list:state.vars.select_list,
        devurls:state.vars.devurls,
        faultData:state.objs.faultData,
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
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败！')); 
                }    
            });


            function gettreedata(){
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
                timeout:3000,       
                success:function(json,textStatus){  
                    dispatch(actions.setVars('select_list',json));
                    dispatch(actions.setVars('devurls',devurl));
                    dispatch(actions.setVars('boolywbb', true));
                },    
                error:function(XMLHttpRequest,textStatus,errorThrown){    
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('alertText', '获取数据失败！'));     
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
            if(all.length>50){
                all.splice(50,all.length);
            }
            if(all.length==0){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '获取设备数据失败！')); 
                return;
            }
            $.ajax({    
                url:'http://'+url+'/Monitor/xml.aspx',    
                data:'functionname=CountFailureInfo&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&groupbydevice=0&farea=true&crossDomain=true&zip=false',    
                dataType:"jsonp",    
                jsonp:"callback",    
                jsonpCallback:"testCall",    
                timeout:3000,       
                success:function(json,textStatus){ 
                    if(json.wtid==undefined){
                        dispatch(actions.setVars('alertBool', false));
                        dispatch(actions.setVars('alertText', '无数据！')); 
                        return;
                    } ;
                    dispatch(actions.setObjs('faultData',json));
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
