import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import WFTprofitchart from './WFTprofitchart.jsx';
import icono from './img/wind_logo.png';
import Month from './Month';
var $=require('jquery');
var actions = require('redux/actions');
let data=require('./Profit-dataq')
let button=data.button;
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaRecordProfit=data.areaRecordProfit[0];
let text=data.textF;
let colorO='#5B9BD5';
let colorT='#ED7D31';
// let input_url="10.68.100.32";
let pointWidth=30;
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let windPT=data.windareace;
let Component = React.createClass({
   componentWillMount() {
        let{xxdwfId,xxdwfNa,ipUrl}=this.props;

        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{rate,width,ipUrl,btn=0,xxdwfId,xxdwfNa,actbt,changpage,wind,windP,gogogo,areaNamee,back,more,close,backtop,befor_pagee='windpage',befor_page2,areaNameN,areaRecordCostN,areaRecordProfitN}=this.props;
       
          return (
           <div className={styles.box}>
              <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{[actbt+1]+'月'+xxdwfNa+'各风机发电量'}</p>
                <div className={styles.xx} onClick={()=>close()}>x</div>
                </div>
                <div className={styles.scroll}>
  <WFTprofitchart areaNameX={areaNameN}  areaRecordCostT={areaRecordCostN} areaRecordProfitO={areaRecordProfitN} colorO={colorO} colorT={colorT} pointWidth={20} width={width} height={483} ly={10} pointPlacement={0} borderRadius={3}></WFTprofitchart>
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
                   
                   
                          
                                <WFTprofitchart areaNameX={areaNamee}  areaRecordCostT={wind} areaRecordProfitO={windP} colorO={colorO} colorT={colorT} pointWidth={30} height={800} text={[actbt+1]+'月'+xxdwfNa+'各风机收益'}  rate={rate}ly={40} pointPlacement={-0.07} borderRadius={7}></WFTprofitchart>
                          
                       
                       
                             
                <div className={styles.imgq}>
                    <img src={icono}/>
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
        rate:state.vars.arr4,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       ajax: (xxdwfId,xxdwfNa,input_url) => {
    
            let arr1=[];
            let arr2=[];
            let arr3=[];
            let arr4=[];
            let date =new Date();
            let year =date.getFullYear();
            let month= date.getMonth();
          
           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/yield/getWfieldMaxYieBayDay',  
             async:false,
            data:{
             'year':year,
             'month':month,
             'wfid':xxdwfId,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             
            
        
             let dataa=data.data;
             for(let i in dataa){
                 let day=dataa[i].day;
                 arr1.push(day+'日');
                 let incomes=dataa[i].incomes;
                 arr2.push(incomes);
                 let amounts=dataa[i].amounts;
                 arr3.push(amounts);
                 let rate=dataa[i].rate*100;
                 arr4.push(Number(rate.toFixed(1)));

             }
         
             },
             error:function(){
          
             },
           });
            dispatch(actions.setVars('actbt',month-1 ));
            dispatch(actions.setVars('areaNamee',arr1));
              dispatch(actions.setVars('wind',arr2));
              dispatch(actions.setVars('windP',arr3));
              dispatch(actions.setVars('arr4',arr4));
               

          
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(value,key,input_url,xxdwfId)=>{
            
           let arr1=[];
            let arr2=[];
            let arr3=[];
            let arr4=[];
            let date =new Date();
            let year =date.getFullYear();
            let month= date.getMonth();
          
           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/yield/getWfieldMaxYieBayDay',  
             async:false,
            data:{
             'year':year,
             'month':key+1,
             'wfid':xxdwfId,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
                
            
        
             let dataa=data.data;
             for(let i in dataa){
                 let day=dataa[i].day;
                 arr1.push(day+'日');
                 let incomes=dataa[i].incomes;
                 arr2.push(incomes);
                 let amounts=dataa[i].amounts;
                 arr3.push(amounts);
                 let rate=dataa[i].rate*100;
                 arr4.push(Number(rate.toFixed(1)));

             }
         
             },
             error:function(){
          
             },
           });
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('areaNamee',arr1));
              dispatch(actions.setVars('wind',arr2));
              dispatch(actions.setVars('windP',arr3));
              dispatch(actions.setVars('arr4',arr4));

               

        },
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
              dispatch(actions.setVars('btnn',0));
           

        },
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
              dispatch(actions.setVars('btnn',1));
        },
        more:(actbt,input_url,xxdwfId)=>{
             $("#sss").show();
             $('#boxcover').show();
              let date=new Date();

       let year= date.getFullYear();
             let arr4=[];
            let arr5=[];
            let arr6=[];
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
                 var xWild=data.data[i].wtname;
                 arr4.push(xWild);
                 var yPowerPlan=data.data[i].powerplan;
                 arr5.push(yPowerPlan);
                 var yPowerAct=data.data[i].poweract;
                 arr6.push(yPowerAct);


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
                dispatch(actions.setVars('btnn',2));
                dispatch(actions.setVars('width1',width));
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