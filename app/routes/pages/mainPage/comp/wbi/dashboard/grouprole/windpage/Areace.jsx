import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windce from './Windce.jsx';
import icono from '../../../../../img/comp/wind_logo.png';
import Month from './Month';
var $=require('jquery');
var actions = require('redux/actions');
let data=require('./../group/Profit-data3')
let Component = React.createClass({
   componentWillMount() {
        let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{width,ipUrl,btn=0,xxdwfId,xxdwfNa,actbt,changpage,wind,windP,gogogo,areaNamee,back,more,close,backtop,befor_pagee='windpage',befor_page2,areaNameN,areaRecordCostN,areaRecordProfitN}=this.props;
       
          return (
           <div className={styles.box}>
           {//遮罩层
           }
              <div className={styles.boxcover} id='boxcover'></div>
              {//弹出的更多 
           }
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{[actbt+1]+'月'+xxdwfNa+'各风机发电量'}</p>
                <div className={styles.xx} onClick={()=>close()}>x</div>
                </div>
                <div className={styles.scroll}>
  <Windce areaNameX={areaNameN}  areaRecordCostT={areaRecordCostN} areaRecordProfitO={areaRecordProfitN} pointWidth={20} width={width} height={483} ly={10} pointPlacement={0} borderRadius={4}></Windce>
                </div>

                
        
             </div>
            <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key,ipUrl,xxdwfId)} key={key}>{value.name}</li>)
                        })
                    }
        
    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>
       
                </ul>
               <div className={`${styles.bigbox} ${styles.shadow}`}>
                   
                   
                          
                                <Windce areaNameX={areaNamee}  areaRecordCostT={wind} areaRecordProfitO={windP}  pointWidth={30} height={800} text={[actbt+1]+'月'+xxdwfNa+'各风机发电量'} ly={40}  borderRadius={7}></Windce>
                          
                       
                       
                             
                <div className={styles.imgq}>
                    <img src={icono}/>
                </div>
                <div className={`${styles.buttons} ${styles.buttonss}`}>
                      <button className={btn===0? styles.btn0 : styles.btn1} onClick={()=>gogogo(actbt,ipUrl,xxdwfId)} > 前10</button>
                      <button className={btn===1? styles.btn0 : styles.btn1} onClick={()=>back(actbt,ipUrl,xxdwfId)}>后10</button>
                      <button className={btn===2? styles.btn0 : styles.btn1} onClick={()=>more(actbt,ipUrl,xxdwfId)}>更多</button>
                   </div>
                </div>   
           </div>
           
        
        );
    }
});



const mapStateToProps = (state) => {

    return {
        actbt:state.vars.actbt,
         wind:state.vars.wind,
         windP:state.vars.windP,
         areaNameN:state.vars.areaNamenb,
         areaRecordCostN:state.vars.areaRecordCostNb,
         areaRecordProfitN:state.vars.areaRecordProfitNb,
         areaNamee:state.vars.areaNamee,

           befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
         xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
         btn:state.vars.btnn,
        // 传过来的ip
        ipUrl:state.vars.ipUrl,
        width:state.vars.width1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       ajax: (xxdwfId,xxdwfNa,input_url) => {
           // 风场名字
            let arr1=[];
           // 风场计划发电量
            let arr2=[];
           // 实际发电量
            let arr3=[];
            // 获取当前年
            let date =new Date();
            let year =date.getFullYear();
            // 上个月
            let month= date.getMonth();
           // adsas
           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/ELEC/getWtAreaElec',  
             async:false,
            data:{
             'year':year,
             'month':month,
             'wfid':xxdwfId
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
             
             let dataa=data.data;
             for(let i=0;i<10;i++){
                 let xWild=data.data[i].wtname;
                 arr1.push(xWild);
                 let yPowerPlan=Number(data.data[i].powerplan.toFixed(1));
                 arr2.push(yPowerPlan);
                 let yPowerAct=Number(data.data[i].poweract.toFixed(1));
                 arr3.push(yPowerAct);
             }
            
             },
             error:function(){
                
             },
           });
           // 月份高亮
           dispatch(actions.setVars('actbt',month-1 ));
           dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));
             //前十高亮
              dispatch(actions.setVars('btnn',0));

          
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(value,key,input_url,xxdwfId)=>{
            
            var arr1=[];
            var arr2=[];
            var arr3=[];
            var areaids=[];
            var windids=[];
           
            let date = new Date();
            let monthh=date.getMonth();
            let year= date.getFullYear();
           
         //获取对应风场下面的数据
          $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/ELEC/getWtAreaElec',  
             async:false,
            data:{
             'year':year,
             'month':key+1,
             'wfid':xxdwfId,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){


            
          
             for(var i=0;i<10;i++){
                 var xWild=data.data[i].wtname;
                 // 风场名字
                 arr1.push(xWild);
                 // 计划发电量
                 var yPowerPlan=Number(data.data[i].powerplan.toFixed(1));
                 arr2.push(yPowerPlan);
                 // 实际发电量
                 var yPowerAct=Number(data.data[i].poweract.toFixed(1));
                 arr3.push(yPowerAct);
             }

             },
             error:function(){
                 
             },
           });
          // 月份高亮显示
           dispatch(actions.setVars('actbt',key));
           dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));
             // 前10高亮显示
             dispatch(actions.setVars('btnn',0));
            
        },
        // 前十
        gogogo:(actbt,input_url,xxdwfId)=>{
       let date=new Date();
       let year= date.getFullYear();
        var arr1=[];
            var arr2=[];
            var arr3=[];
           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/ELEC/getPageSize',  
             async:false,
            data:{
             'year':year,
             'month':actbt+1,
             'wfid':xxdwfId,
             'type':0,
             'groupid':'',
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
          
            
             var dataa=data.data;
             for(var i=0;i<10;i++){
                 var xWild=data.data[i].wtname;
                 // 名字
                 arr1.push(xWild);
                 // 计划发电量
                 var yPowerPlan=Number(data.data[i].powerplan.toFixed(1));
                 arr2.push(yPowerPlan);
                 // 实际发电量
                 var yPowerAct=Number(data.data[i].poweract.toFixed(1));
                 arr3.push(yPowerAct);
             }
            
             },
             error:function(){
              
             },
           });
               dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));
              dispatch(actions.setVars('btnn',0));
           

        },
        // 后十
        back:(actbt,input_url,xxdwfId)=>{
             var arr1=[];
            var arr2=[];
            var arr3=[];
             let date=new Date();
       let year= date.getFullYear();
           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/ELEC/getPageSize',  
             async:false,
            data:{
             'year':year,
             'month':actbt+1,
             'wfid':xxdwfId,
             'type':1,
             'groupid':'',
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
            
             // 获取x轴的值内蒙达茂天润风电场
             var dataa=data.data;
             for(var i=0;i<10;i++){
                 var xWild=data.data[i].wtname;
                 arr1.push(xWild);
                 var yPowerPlan=Number(data.data[i].powerplan.toFixed(1));
                 arr2.push(yPowerPlan);
                 var yPowerAct=Number(data.data[i].poweract.toFixed(1));
                 arr3.push(yPowerAct);
             }
            
             },
             error:function(){
                
             },
           });
               dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));
              dispatch(actions.setVars('btnn',1));
        },
        // 更多
        more:(actbt,input_url,xxdwfId)=>{
            // 弹框弹出
             $("#sss").show();
             // 遮罩层弹出
             $('#boxcover').show();
              let date=new Date();

       let year= date.getFullYear();
       // 风场名字
             let arr4=[];
             // 计划发电量
            let arr5=[];
            // 实际发电量
            let arr6=[];
            // 设置弹出框的宽度
            let width=0;

           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/ELEC/getPageSize',  
             async:false,
            data:{
             'year':year,
             'month':actbt+1,
             'wfid':xxdwfId,
             'type':2,
             'groupid':'',
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
             
            
             let dataa=data.data;
             for(var i=0;i<dataa.length;i++){
                     // 名字
                 var xWild=data.data[i].wtname;
                 arr4.push(xWild);
                 var yPowerPlan=Number(data.data[i].powerplan.toFixed(1));
                 arr5.push(yPowerPlan);//计划发电量

                 var yPowerAct=Number(data.data[i].poweract.toFixed(1));
                 arr6.push(yPowerAct);//实际发电量


             }


            let length=arr4.length;
              width =length*60;
           

             },
             error:function(){
               
             },
           });
               dispatch(actions.setVars('areaNamenb',arr4));
               dispatch(actions.setVars('areaRecordCostNb',arr6));
               dispatch(actions.setVars('areaRecordProfitNb',arr5));
             
                dispatch(actions.setVars('width1',width));
        },
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