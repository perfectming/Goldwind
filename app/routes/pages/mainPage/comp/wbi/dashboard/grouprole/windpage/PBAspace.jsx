import React from 'react';
import {connect} from 'react-redux';
import styles from '../group/PBATime/Profitstyle2.scss';
import PBAspacechart from './PBAspacechart.jsx';
import icono2 from '../../../../../img/comp/PBA.png';
import icono1 from '../../../../../img/comp/PBA2.png';
import Login from '../../../../../../../../components/common/Loading.jsx';
var $ = require('jquery');
var actions = require('redux/actions');
let data=require('./../group/Profit-data3');
let button=data.button;
let fanCost=data.fanCost;
let fanCostA=data.fanCostA;
let fanCostB=data.fanCostB;
let fanCostC=data.fanCostC;
let PBA=data.PBA;
let height=700;
let moree;
 let datee=new Date;
let month=datee.getMonth();
if (month == 0) {
    month = 12;
}

  let key=month;
let Component = React.createClass({
     componentWillMount() {
       let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{width,ipUrl,xxdwfId,xxdwfNa,btn=0,PBASpaceMorePba,PBASpaceMoreNodevreasonloss,PBASpaceMoreLimitloss,PBASpaceMoreMaintainloss,PBASpaceMoreFaultloss,PBASpaceMorePoweract,PBASpaceMoreWtname2,back,gogogo,PBASpaceFirstWtname,PBASpaceFirstPba,PBASpaceFirstNodevreasonloss,PBASpaceFirstLimitloss,PBASpaceFirstMaintainloss,PBASpaceFirstFaultloss,PBASpaceFirstPoweract,actbt,changpage,wind,windP,more,moree,close,backtop,befor_pagee='windpage',befor_page2,mapmonth,mon,Go1=false,skinStyle}=this.props;
        if(Go1){
        return (
            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
                {//遮罩层
                     }
            <div className={styles.boxcover} id='boxcover'></div>
                {//更多弹出框
                     }
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
               <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                <p>{ mon+xxdwfNa+'各风机PBA'}</p>
                <div onClick={()=>close()}>x</div>
                </div>
                 <div className={styles.scroll}>
                  <PBAspacechart fanProfitQ={PBASpaceMorePoweract}
                   machine={PBASpaceMoreWtname2} 
                   fanCost={PBASpaceMoreFaultloss} 
                   fanCostA={PBASpaceMoreMaintainloss} 
                   fanCostB={PBASpaceMoreLimitloss} 
                   fanCostC={PBASpaceMoreNodevreasonloss} 
                   PBA={PBASpaceMorePba} height={483} width={width} ty={10} pointWidth={20} pointPlacement={0.07} borderRadius={4}scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></PBAspacechart>
                 </div>
             </div>
               
                <ul className={styles.monthbox}>
                    {
                        mapmonth.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key,xxdwfId,ipUrl)} key={key}>{value.yearpoweract+'月'}</li>)
                        })
                    }
     }
 
    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>

                </ul>
          
               <div className={`${styles.bigbox} ${styles.shadow}`}>
                
                    
                         
                                <PBAspacechart fanProfitQ={PBASpaceFirstPoweract} machine={PBASpaceFirstWtname} fanCost={PBASpaceFirstFaultloss} fanCostA={PBASpaceFirstMaintainloss} fanCostB={PBASpaceFirstLimitloss} fanCostC={PBASpaceFirstNodevreasonloss} PBA={PBASpaceFirstPba} height={800} width={1735} text={mon+xxdwfNa+'各风机PBA'} ty={40} pointWidth={30}  pointPlacement={-0.07} borderRadius={7} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></PBAspacechart>
                        
                    
                       
                  
                    <div className={styles.imgqv}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                    <div className={styles.buttonsh}>
                        <button className={btn===0? styles.btn0 : styles.btn1}onClick={()=>gogogo(actbt,xxdwfId,ipUrl,mapmonth)} > 前10</button>
                        <button className={btn===1? styles.btn0 : styles.btn1}onClick={()=>back(actbt,xxdwfId,ipUrl,mapmonth)}>后10</button>
                        <button className={btn===2? styles.btn0 : styles.btn1} onClick={()=>more(actbt,xxdwfId,ipUrl,mapmonth)}>更多</button>
                    </div>
                </div>
                
            </div>


        );}
else{
    return(
<Login></Login>
    )

    }
}
});



const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbt,
        wind:state.vars.wind,
        windP:state.vars.windP,
        moree:state.vars.moree,
        befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
        // 将上个月的数据赋值
        PBASpaceFirstWtname: state.vars.PBASpaceWtname1,
        PBASpaceFirstPoweract: state.vars.PBASpaceFirstPoweract1,
        PBASpaceFirstFaultloss: state.vars.PBASpaceFirstFaultloss1,
        PBASpaceFirstMaintainloss: state.vars.PBASpaceFirstMaintainloss1,
        PBASpaceFirstLimitloss: state.vars.PBASpaceFirstLimitloss1,
        PBASpaceFirstNodevreasonloss: state.vars.PBASpaceFirstNodevreasonloss1,
        PBASpaceFirstPba: state.vars.PBASpaceFirstPba12,
        //弹出的更多赋值
        PBASpaceMoreWtname2: state.vars.PBASpaceWtname111,
        PBASpaceMorePoweract: state.vars.PBASpaceFirstPoweract11,
        PBASpaceMoreFaultloss: state.vars.PBASpaceFirstFaultloss11,
        PBASpaceMoreMaintainloss: state.vars.PBASpaceFirstMaintainloss11,
        PBASpaceMoreLimitloss: state.vars.PBASpaceFirstLimitloss11,
        PBASpaceMoreNodevreasonloss: state.vars.PBASpaceFirstNodevreasonloss11,
        PBASpaceMorePba: state.vars.PBASpaceFirstPba121,
        //获取上面的id
        xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
        btn:state.vars.btnn,
        ipUrl:state.vars.ipUrl,
        width:state.vars.width1,
        mapmonth:state.vars.mapmonth,
        mon:state.vars.mon,
        Go1:state.vars.Go1,
        skinStyle:state.vars.skinStyle,

    
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId,xxdwfNa,input_url) => {
            let areaIds=[];
            let windIds=[];
            let date = new Date();
            let month = date.getMonth();
            let year = date.getFullYear();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
            // 初始化上个月的数据
            let PBASpaceFirstWtname=[];
            let PBASpaceFirstPoweract=[];
            let PBASpaceFirstFaultloss=[];
            let PBASpaceFirstMaintainloss=[];
            let PBASpaceFirstLimitloss=[];
            let PBASpaceFirstNodevreasonloss=[];
            let PBASpaceFirstPbaP=[];
          //新建
             $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/BaseData/getYearAndMonthList',
                async: false,
                data: {},
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('mapmonth', data.data));
                    dispatch(actions.setVars('actbt', 10));
                    dispatch(actions.setVars('mon', data.data[10].yearpoweract + "月"));
                    // jiang(data.data);
                },
                error: function () {
                    console.log("数据获取失败");
                },
            });
             
             //结束
            // 获取上面的区域
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/BaseData/getGroup',
                async:false,
                dataType:'json',
                timeout:'3000',
                success:function(data){
               
                    for(let i in data.data){
                        areaIds.push(i);
                    }
               

            
                },
                error:function(){
            
                },
            });
            //获取所有的风场
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/BaseData/getWfsByGroupid',
                async:false,
                data:{
                    'groupid':areaIds[0],
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
             
                    for(let i in data.data){
                        windIds.push(i);
                    }
                

                    // 获取x轴的值内蒙达茂天润风电场
            
                },
                error:function(){
                  
                },
            });
            // 根据风场找PBA空间
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':month,
                    'year':year,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
           
                    let PBASpaceFirstPba=data.data;
                    for ( let  i=0;i<10;i++){
                        // 风场名字
                        let wtname=PBASpaceFirstPba[i].wtname;
                        PBASpaceFirstWtname.push(wtname);
                        // 实际发电量
                        let poweract=PBASpaceFirstPba[i].poweract;
                        PBASpaceFirstPoweract.push(poweract);
                        // 故障损失
                        let faultloss=PBASpaceFirstPba[i].faultloss;
                        PBASpaceFirstFaultloss.push(faultloss);
                        // 维护损失
                        let maintainloss=PBASpaceFirstPba[i].maintainloss;
                        PBASpaceFirstMaintainloss.push(maintainloss);
                        // 限功率损失
                        let limitloss=PBASpaceFirstPba[i].limitloss;
                        PBASpaceFirstLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpaceFirstPba[i].nodevreasonloss;
                        PBASpaceFirstNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpaceFirstPba[i].pba*100;
                        // PBA
                        PBASpaceFirstPbaP.push(Number(pba.toFixed(2)));
                    }


               
            
                },
                error:function(){
               
                },
            });
            // 将初始化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceFirstWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpaceFirstPoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceFirstMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceFirstLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFirstFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceFirstNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpaceFirstPbaP ));
            dispatch(actions.setVars('btnn',0));
            dispatch(actions.setVars('Go1',true));
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(value,key,xxdwfId,input_url)=>{
            //切换月份传值
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];
            let PBASpacePba=[];
            let PBASpacePbaPBA=[];
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':value.yearpoweract,
                    'year':value.year,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
           
                    let PBASpacePba=data.data;
                    for  ( let  i=0;i<10;i++){
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpacePba[i].pba*100;
                        PBASpacePbaPBA.push(Number(pba.toFixed(2)));
                    }
               

                },
                error:function(){
               
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpacePbaPBA ));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('btnn',0));
            dispatch(actions.setVars('mon',value.yearpoweract+'月'));
          
        },
        // 前十
        gogogo:(actbt,xxdwfId,input_url,value)=>{
           
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];
            let PBASpacePba=[];
            let PBASpacePbaPBA=[];
            let PBAsMonth=value[actbt].yearpoweract;
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':value[actbt].yearpoweract,
                    'year':value[actbt].year,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
             
                    let PBASpacePba=data.data;
                    for  ( let  i=0;i<10;i++){
                        // 风场名字
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        // 计划发电量
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        // 故障损失
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        // 维护损失
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        // 限功率损失
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        // 非设备原因损失
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        // PBA
                        let pba=PBASpacePba[i].pba*100;

                        PBASpacePbaPBA.push(Number(pba.toFixed(2)));
                    }
               
             
          
            
                },
                error:function(){
                
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpacePbaPBA ));
            dispatch(actions.setVars('btnn',0));
            // dispatch(actions.setVars('mon',PBAsMonth));
         
            // $('.box').css('opacity',".5")
        },
        // 后十
        back:(actbt,xxdwfId,input_url,value)=>{
           
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];

            let PBASpacePbaPBA=[];
            let PBAsMonth=value[actbt].yearpoweract;         
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':value[actbt].yearpoweract,
                    'year':value[actbt].year,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
            

                    let PBASpacePba=data.data;
                
                    let length=PBASpacePba.length-10;

                    for  ( let i = length;i>length-10;i--){
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpacePba[i].pba*100;

                        PBASpacePbaPBA.push(Number(pba.toFixed(2)));
                    }
               

            
            
            
                },
                error:function(){
                  
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpacePbaPBA ));
            dispatch(actions.setVars('btnn',1));

         
            // $('.box').css('opacity',".5")
        },
        // 更多
        more:(actbt,xxdwfId,input_url,value)=>{
            $("#sss").show();
            $('#boxcover').show();
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];
            let PBASpacePba=[];
            let PBASpacePbaPBA=[];
            let width =0;
                        let PBAsMonth=value[actbt].yearpoweract;
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':value[actbt].yearpoweract,
                    'year':value[actbt].year,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                
                    let PBASpacePba=data.data;
                    for  ( let i in PBASpacePba){
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpacePba[i].pba*100;

                        PBASpacePbaPBA.push(Number(pba.toFixed(2)));
                    }
        
             let length =PBASpaceWtname.length;
              width=length*60;
           
      
            
            
                },
                error:function(){
                  
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname111',PBASpaceWtname));
       
            // dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract11',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss11',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss11',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss11',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss11',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba121',PBASpacePbaPBA ));
           
            dispatch(actions.setVars('width1',width));

         
            // $('.box').css('opacity',".5")
        },
        // 关闭更多弹出
        close:()=>{
            $("#sss").hide();
            $('#boxcover').hide();
        },
        // 返回
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
