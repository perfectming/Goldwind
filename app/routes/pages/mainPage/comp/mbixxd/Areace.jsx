import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windce from './Windce.jsx';
import icono from './img/ele.png';
import Month from './Month';
var $=require('jquery');
var actions = require('redux/actions');
let data=require('./Profit-data')
let button=data.button;
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaRecordProfit=data.areaRecordProfit[0];
let text=data.textF;
let colorO='#5B9BD5';
let colorT='#ED7D31';
let input_url="10.68.100.32";
let pointWidth=30;
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let windPT=data.windareace;
let Component = React.createClass({
   componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{actbt,changpage,wind,windP,gogogo,areaNamee,back,more,close,backtop,befor_pagee='windpage',befor_page2,areaNameN,areaRecordCostN,areaRecordProfitN}=this.props;
          return (
           <div className={styles.box}>
              <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{text[actbt]+'月份各风机发电量'}</p>
                <div className={styles.xx} onClick={()=>close()}>x</div>
                </div>
                <div className={styles.scroll}>
  <Windce areaNameX={areaNameN}  areaRecordCostT={areaRecordCostN} areaRecordProfitO={areaRecordProfitN} colorO={colorO} colorT={colorT} pointWidth={pointWidth} width={12000} height={440}></Windce>
                </div>

                
        
             </div>
            <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>
       
                </ul>
               <div className={`${styles.bigbox} ${styles.shadow}`}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <Windce areaNameX={areaNamee==null?areaName:areaNamee}  areaRecordCostT={wind==undefined? areaRecordCost:wind} areaRecordProfitO={windP==undefined?areaRecordProfit:windP} colorO={colorO} colorT={colorT} pointWidth={pointWidth} height={750}></Windce>
                            </div>
                        </div>
                         <div className={styles.tik}>
                        <p className={styles.Ff}>{text[actbt]+'月份各风机发电量'}</p>
                    </div>
                    </div>          
                <div className={styles.imgq}>
                    <img src={icono}/>
                </div>
                <div className={`${styles.buttons} ${styles.buttonss}`}>
                      <button onClick={()=>gogogo(actbt)} > 前10</button>
                      <button onClick={()=>back(actbt)}>后10</button>
                      <button  onClick={()=>more(actbt)}>更多</button>
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
         areaNameN:state.vars.areaNameNb,
         areaRecordCostN:state.vars.areaRecordCostNb,
         areaRecordProfitN:state.vars.areaRecordProfitN,
         areaNamee:state.vars.areaNamee,

           befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       ajax: () => {
         
            let arr1=[];
            let arr2=[];
            let arr3=[];
          
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/ELEC/getWtAreaElec',  
             async:false,
            data:{
             'year':2016,
             'month':11,
             'wfid':150828
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
            
             // 获取x轴的值内蒙达茂天润风电场
             let dataa=data.data;
             for(let i=0;i<10;i++){
                 let xWild=data.data[i].wtname;
                 arr1.push(xWild);
                 let yPowerPlan=data.data[i].powerplan;
                 arr2.push(yPowerPlan);
                 let yPowerAct=data.data[i].poweract;
                 arr3.push(yPowerAct);
             }
            
             },
             error:function(){
                
             },
           });
           dispatch(actions.setVars('actbt',10 ));
           dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));

          
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(value,key)=>{
            
            var arr1=[];
            var arr2=[];
            var arr3=[];
            var areaids=[];
            var windids=[];
            var monthh=key+1;
            //获取所有的区域
            $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/BaseData/getGroup',  
             async:false,
             dataType:'json',
             timeout:'3000',
             success:function(data){
              
                for(var i in data.data){
                       areaids.push(i);
                }
              
             // 获取x轴的值内蒙达茂天润风电场
            
             },
             error:function(){
              
             },
           });
           //获取所有的风场
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/BaseData/getWfsByGroupid',  
             async:false,
            data:{
             'groupid':areaids[0],
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
               
                for(var i in data.data){
                       windids.push(i);
                }
                

             // 获取x轴的值内蒙达茂天润风电场
            
             },
             error:function(){
              
             },
           });
         //获取对应风场下面的数据
          $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/ELEC/getWtAreaElec',  
             async:false,
            data:{
             'year':2016,
             'month':monthh,
             'wfid':windids[1]
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
             // 获取x轴的值内蒙达茂天润风电场
             var dataa=data.data;
             for(var i=0;i<10;i++){
                 var xWild=data.data[i].wtname;
                 arr1.push(xWild);
                 var yPowerPlan=data.data[i].powerplan;
                 arr2.push(yPowerPlan);
                 var yPowerAct=data.data[i].poweract;
                 arr3.push(yPowerAct);
             }
            
             },
             error:function(){
                 
             },
           });
           dispatch(actions.setVars('actbt',key ));
           dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));
        },
        gogogo:(actbt)=>{
    
        var arr1=[];
            var arr2=[];
            var arr3=[];
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/ELEC/getPageSize',  
             async:false,
            data:{
             'year':2016,
             'month':actbt+1,
             'wfid':150828,
             'type':0,
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
                 var yPowerPlan=data.data[i].powerplan;
                 arr2.push(yPowerPlan);
                 var yPowerAct=data.data[i].poweract;
                 arr3.push(yPowerAct);
             }
            
             },
             error:function(){
              
             },
           });
               dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));
           

        },
        back:(actbt)=>{
             var arr1=[];
            var arr2=[];
            var arr3=[];
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/ELEC/getPageSize',  
             async:false,
            data:{
             'year':2016,
             'month':actbt+1,
             'wfid':150828,
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
                 var yPowerPlan=data.data[i].powerplan;
                 arr2.push(yPowerPlan);
                 var yPowerAct=data.data[i].poweract;
                 arr3.push(yPowerAct);
             }
            
             },
             error:function(){
                
             },
           });
               dispatch(actions.setVars('areaNamee',arr1));
             dispatch(actions.setVars('wind',arr3));
             dispatch(actions.setVars('windP',arr2));
        },
        more:(actbt)=>{
             $("#sss").show();
             $('#boxcover').show();
             var arr4=[];
            var arr5=[];
            var arr6=[];
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/ELEC/getPageSize',  
             async:false,
            data:{
             'year':2016,
             'month':actbt+1,
             'wfid':150828,
             'type':2,
             'groupid':'',
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
             
             // 获取x轴的值内蒙达茂天润风电场
             var dataa=data.data;
             for(var i=0;i<dataa.length;i++){
                 var xWild=data.data[i].wtname;
                 arr4.push(xWild);
                 var yPowerPlan=data.data[i].powerplan;
                 arr5.push(yPowerPlan);
                 var yPowerAct=data.data[i].poweract;
                 arr6.push(yPowerAct);
             }
          
             },
             error:function(){
               
             },
           });
               dispatch(actions.setVars('areaNamenb',arr4));
               dispatch(actions.setVars('areaRecordCostNb',arr6));
               dispatch(actions.setVars('areaRecordProfitNb',arr5));
        },
        close:()=>{
            $("#sss").hide();
              $('#boxcover').hide();
        },
         backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);