import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from '../wind_logo.png';
import Fanchart from './fanchart.jsx';
import Month from '../Month.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data');
let button=data.button;
let actbt=0;
let text=data.text;

var date=new Date
var year=date.getFullYear();
 var day = new Date(year,9,0); 
//获取天数：
              var daycount = day.getDate();
                
 var windFiedN=[];
 var arr5=[];
let Component = React.createClass({
     componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{index2,keyy,actbt=0,changpage,wind,windP,windPT,gogogo,back,areaRecordCostRR,machinee,height,more,close,ban,backtop,befor_pagee='group',befor_page2,w11='1区域',w111='风机1',sqy,pointPlacement,windN,keyyy,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,areaWindids,areaWindNamessT,areaWindCostssT,areaWindEarningssT,areaWindRatessT,areaWindidssT,areaWindCostMore,areaWindEarningMore,areaWindNameMore,areaWindRateMore}=this.props;
   var day = new Date(year,keyyy,0); 
//获取天数：
              var daycount = day.getDate();
             
            
          return (
           <div className={styles.box}>
            <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{[actbt+1]+'月'+w11+w111+'收益'}</p>

                <div onClick={()=>close()} className={styles.gg}>x</div>
                </div>
                <div className={styles.scroll}>
                <Fanchart areaRecordCostR={areaWindCostMore} areaRecordProfitR={areaWindEarningMore} machine={areaWindNameMore} height={500} TBAA={areaWindRateMore} width={17200} pointPlacement={-0.2}></Fanchart>
                </div>
                 </div>
               <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
                     <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2,actbt)}>返回</li>
                </ul>
               <div className={styles.covers} >
                   <div className={styles.bgccc}> <img src={icono}/></div>
                   <div className={`${styles.areabox} ${styles.shadow}`}>
                          <p className={styles.titleeee}>{actbt+1+'月集团各区域收益'}</p>
                           <AreaTable text={text[actbt]} areaName={wind} areaRecordCost={windN} areaRecordProfit={windP} TBA={windPT} windFiedN={windFiedN} arr5={arr5} year={year} keyy={keyyy} daycount={daycount}></AreaTable>
                    </div>
                </div>

               <div className={styles.covers}>
                   <div className={styles.bgccc}> <img src={icono}/></div>
                   <div className={`${styles.windbox} ${styles.shadow}`}>
            
                       <p className={styles.tiw}>{[actbt+1]+'月'+w11+'各风电场年收益'}</p>
                        <div>
                           <WindfieldTable windFiled={areaWindNames} windCost={areaWindCosts} windProfit={areaWindEarnings} TBA={areaWindRates} year={year} keyy={keyyy} daycount={daycount} areaWindids={areaWindids}></WindfieldTable>
                       </div>
                   </div>
               </div>


               <div className={`${styles.bigbox} ${styles.shadow}`}>
                   <div className={styles.coverbox}>
                       <div className={styles.windcebox}>
                           <div>
                               <Fanchart areaRecordCostR={areaWindCostssT} areaRecordProfitR={areaWindEarningssT} machine={areaWindNamessT } height={370} TBAA={areaWindRatessT} pointPlacement={-0.06} width={850}></Fanchart>
                           </div>
                       </div>
                       <div className={styles.tik}>
                           <p>{[actbt+1]+'月'+w11+w111+'各风机收益'}</p>
                       </div>
                   </div>
                   <div className={styles.imgq}>
                       <img src={icono}/>
                   </div>
                   <div className={styles.buttons}>
                      <button onClick={()=>gogogo(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)} > 前10</button>
                      <button onClick={()=>back(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)}>后10</button>
                      <button  onClick={()=>more(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)}>更多</button>
                   </div>
               </div>
               <p className={styles.clear}></p>
               
           </div>
        );
    }
});



const mapStateToProps = (state) => {
    return {
         actbt:state.vars.actbt,
         wind:state.vars.wind,
         windP:state.vars.windP,
         windPT:state.vars.windPT,
         ban:state.vars.ban,
         machinee:state.vars.machinee,
         areaRecordCostRR:state.vars.areaRecordCostRR,
         w11: state.vars.w1,
         w111: state.vars.w12,
          sqy: state.vars.wins1,
          windN:state.vars.windN,
          keyyy:state.vars.keyy,
          areaWindNames : state.vars.areaWindNamess,
          areaWindCosts : state.vars.areaWindCostss,
           areaWindEarnings : state.vars.areaWindEarningss,
          areaWindRates : state.vars.areaWindRatess,
          areaWindids: state.vars.areaWindidss,
          areaWindNamessT : state.vars.areaWindNamesss,
          areaWindCostssT : state.vars.areaWindCostsss,
           areaWindEarningssT : state.vars.areaWindEarningsss,
          areaWindRatessT : state.vars.areaWindRatesss,
          areaWindidssT: state.vars.areaWindidsss,
          keyy:state.vars.keyy,
          index2:state.vars.index2,
          areaWindNameMore:state.vars.areaWindNameMore,
          areaWindCostMore:state.vars.areaWindCostMore,
          areaWindEarningMore:state.vars.areaWindEarningMore,
          areaWindRateMore:state.vars.areaWindRateMore,


        


    }
};
const mapDispatchToProps = (dispatch) => {
    return {
      ajax:()=>{
      
        var arr1=[];
            var arr2=[];
            var arr3=[];
            var arr4=[];
            var areaWindCosts=[];
            var areaWindEarnings=[];
            var areaWindRates=[];
            var areaWindids=[];
            var areaWindNames=[];
            var areaWindCosts1=[];
            var areaWindEarnings1=[];
            var areaWindRates1=[];
            var areaWindids1=[];
            var areaWindNames1=[];


                        
            
           // 第一个图
         $.ajax({
            type:'post',
            url:'http://10.68.100.32:8080/wbi/yield/getAllGroupYield',  
            async:false,
           data:{
             
            'startdate':year+"-"+"9"+"-"+'1',
            'enddate':year+"-"+"9"+"-"+"30",
           },
            dataType:'json',
            timeout:'3000',
            success:function(data){
            
                var dataA=data.data;
                for (var i in dataA){
                  var earnings=dataA[i].earning;
                       arr1.push(earnings); 
                  var costs=dataA[i].costs;
                    arr2.push(costs);
              var groupname=dataA[i].groupname;
              arr3.push(groupname);
              var rate=Number(dataA[i].rate.toFixed(2));
            
              arr4.push(rate);
              var groupid=dataA[i].groupid;
              arr5.push(Number(groupid))
                }
             
     

            },
            error:function(){
               
            },
          });

             dispatch(actions.setVars('actbt',8 ));
            dispatch(actions.setVars('windN',arr2));
            dispatch(actions.setVars('wind',arr3));
            dispatch(actions.setVars('windP',arr1));
            dispatch(actions.setVars('windPT',arr4));
            // 开始时第二张图跟着变
              $.ajax({
                     type:'post',
                        url:'http://10.68.100.32:8080/wbi/yield/getYieldByGroupid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+"9"+"-"+'1',
                 'enddate':year+"-"+"9"+"-"+"30",
                'groupid':arr5[0],
             
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                     
                       
                         var dataA=data.data;
                         for (var i in dataA)
                         {
                             var areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             var areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             var areaWindRate=Number(dataA[i].rate.toFixed(2));
                             areaWindRates.push(areaWindRate);
                             var areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             var areaWindName =dataA[i].wfname;
                             areaWindNames.push(areaWindName) 

                         }
                      
 

                       
                      
                     // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
             
            
            },
          });
             dispatch(actions.setVars('w1',arr3[0]));
            dispatch(actions.setVars('areaWindNamess',areaWindNames));
             dispatch(actions.setVars('areaWindCostss',areaWindCosts));
             dispatch(actions.setVars('areaWindEarningss',areaWindEarnings));
             dispatch(actions.setVars('areaWindRatess',areaWindRates));
             dispatch(actions.setVars('areaWindidss',areaWindids));
             dispatch(actions.setVars('areaWindidsss',areaWindids));
              dispatch(actions.setVars('areaWindidssT',areaWindids));
              dispatch(actions.setVars('index2',0));
              dispatch(actions.setVars('keyy',9));
               dispatch(actions.setVars('daycount',30));

             // 开始时第三张图跟着变
             $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/yield/getYieldByWfid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+"9"+"-"+'1',
                 'enddate':year+"-"+"9"+"-"+'30',
                'wfid':areaWindids[0],
                'methods':'desc',
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                    
                      
                       
                          var dataA=data.data;
                          for (var i in dataA)
                          {
                              var areaWindCost=dataA[i].costs;
                              areaWindCosts1.push(areaWindCost);
                              var areaWindEarning=dataA[i].earning;
                              areaWindEarnings1.push(areaWindEarning);
                              var areaWindRate=dataA[i].rate;
                              areaWindRates1.push(areaWindRate);
                              var areaWindid=dataA[i].wfid;
                              areaWindids1.push(areaWindid);
                              var areaWindName =dataA[i].wtname;
                              areaWindNames1.push(areaWindName) 

                          }
                   
 

                       
                      
                      // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
             
            
            },
            
          });
          dispatch(actions.setVars('w12',areaWindNames[0]));
          dispatch(actions.setVars('areaWindNamesss',areaWindNames1));
             dispatch(actions.setVars('areaWindCostsss',areaWindCosts1));
             dispatch(actions.setVars('areaWindEarningsss',areaWindEarnings1));
             dispatch(actions.setVars('areaWindRatesss',areaWindRates1));
            
          

      },
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
            var arr4=[];     
            var windcosts=[];
            var earnings=[];
            var rates=[];
            var wfids=[];
            var monthh=key+1;
           var areaWindCosts=[];
            var areaWindEarnings=[];
            var areaWindRates=[];
            var areaWindids=[];
            var areaWindNames=[];
            var areaWindCosts1=[];
            var areaWindEarnings1=[];
            var areaWindRates1=[];
            var areaWindids1=[];
            var areaWindNames1=[];
            
            year=date.getFullYear();
            var day = new Date(year,monthh,0); 
//获取天数：
             var  daycount = day.getDate();

       // 获取收益率月份
            
         $.ajax({
            type:'post',
            url:'http://10.68.100.32:8080/wbi/yield/getAllGroupYield',  
            async:false,
           data:{
             
            'startdate':year+"-"+(key+1)+"-"+'1',
            'enddate':year+"-"+(key+1)+"-"+daycount,
           },
            dataType:'json',
            timeout:'3000',
            success:function(data){

               var dataA=data.data;
               for (var i in dataA){
                 var earnings=dataA[i].earning;
                      arr1.push(earnings); 
                 var costs=dataA[i].costs;
                   arr2.push(costs);
             var groupname=dataA[i].groupname;
             arr3.push(groupname);
             var rate=Number(dataA[i].rate.toFixed(2));
            
             arr4.push(rate);
             var groupid=dataA[i].groupid;
             arr5.push(Number(groupid));
               }
             
            // 获取x轴的值内蒙达茂天润风电场

            },
            error:function(){
               
          
                

            },
          });
        
          

            dispatch(actions.setVars('actbt',key ));
            // dispatch(actions.setVars('keyy',key));
            dispatch(actions.setVars('windN',arr2));
            dispatch(actions.setVars('wind',arr3));
            dispatch(actions.setVars('windP',arr1));
            dispatch(actions.setVars('windPT',arr4));
            dispatch(actions.setVars('keyy',monthh));
          // 点击月份第二张图跟着变
           $.ajax({
                     type:'post',
                        url:'http://10.68.100.32:8080/wbi/yield/getYieldByGroupid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+(key+1)+"-"+'1',
                 'enddate':year+"-"+(key+1)+"-"+daycount,
                'groupid':arr5[0],
             
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                       
               

                     

                         var dataA=data.data;
                         for (var i in dataA)
                         {
                             var areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             var areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             var areaWindRate=Number(dataA[i].rate.toFixed(2));
                             areaWindRates.push(areaWindRate);
                             var areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             var areaWindName =dataA[i].wfname;
                             areaWindNames.push(areaWindName) 

                         }

                     // 获取x轴的值内蒙达茂天润风电场  
            },
            error:function(){
          
            
            },
           

          });
             dispatch(actions.setVars('w1',arr3[0]));
            dispatch(actions.setVars('areaWindNamess',areaWindNames));
             dispatch(actions.setVars('areaWindCostss',areaWindCosts));
             dispatch(actions.setVars('areaWindEarningss',areaWindEarnings));
             dispatch(actions.setVars('areaWindRatess',areaWindRates));
             dispatch(actions.setVars('areaWindidss',areaWindids));
              dispatch(actions.setVars('areaWindidssT',areaWindids1));
              dispatch(actions.setVars('index2',0));
              // 点击月份第三张图跟着变
              if(areaWindids[0]!=undefined)
              {
                 $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/yield/getYieldByWfid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+(key+1)+"-"+'1',
                 'enddate':year+"-"+(key+1)+"-"+daycount,
                'wfid':areaWindids[0],
                'methods':'desc',
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                   
                       
                          var dataA=data.data;
                          for (var i in dataA)
                          {
                              var areaWindCost=dataA[i].costs;
                              areaWindCosts1.push(areaWindCost);
                              var areaWindEarning=dataA[i].earning;
                              areaWindEarnings1.push(areaWindEarning);
                              var areaWindRate=dataA[i].rate;
                              areaWindRates1.push(areaWindRate);
                         
                              
                              var areaWindName =dataA[i].wtname;
                              areaWindNames1.push(areaWindName) 

                          }
                     
 

                       
                      
                      // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
            
           
            },
            
          });
              }
            
          dispatch(actions.setVars('w12',areaWindNames[0]));
          dispatch(actions.setVars('areaWindNamesss',areaWindNames1));
             dispatch(actions.setVars('areaWindCostsss',areaWindCosts1));
             dispatch(actions.setVars('areaWindEarningsss',areaWindEarnings1));
             dispatch(actions.setVars('areaWindRatesss',areaWindRates1));
          




        },
        //这是前十；
        gogogo:(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)=>{
           var areaWindCosts=[];
                         var areaWindEarnings=[];
                         var areaWindRates=[];
                         
                         var areaWindNames=[];
                         var areaWindids=[];
          $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/yield/getYieldByWfid',
                     async:false,
                    data:{
                   'startdate':year+"-"+(actbt+1)+"-"+'1',
                 'enddate':year+"-"+(actbt+1)+"-"+daycount,
                'wfid':areaWindidssT[index2],
                'methods':'desc',
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){



                         var dataA=data.data;
                         for (var i in dataA)
                         {
                             var areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             var areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             var areaWindRate=dataA[i].rate;
                             areaWindRates.push(areaWindRate);
                             var areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             var areaWindName =dataA[i].wtname;
                             areaWindNames.push(areaWindName) 

                         }

 

                       
                      
                     // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
         
            
            },
          });
                 
            
             dispatch(actions.setVars('areaWindNamesss',areaWindNames));
             dispatch(actions.setVars('areaWindCostsss',areaWindCosts));
             dispatch(actions.setVars('areaWindEarningsss',areaWindEarnings));
             dispatch(actions.setVars('areaWindRatesss',areaWindRates));
            


            
              },
              // 这是更多
              more:(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)=>{
                $("#sss").show();
             $('#boxcover').show();
           var areaWindCosts=[];
                         var areaWindEarnings=[];
                         var areaWindRates=[];
                         
                         var areaWindNames=[];
                         var areaWindids=[];
          $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/yield/getYieldByWfid',
                     async:false,
                    data:{
                   'startdate':year+"-"+(actbt+1)+"-"+'1',
                 'enddate':year+"-"+(actbt+1)+"-"+daycount,
                'wfid':areaWindidssT[index2],
                'methods':'all',
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                      
                   
                         var dataA=data.data;
                         for (var i in dataA)
                         {
                             var areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             var areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             var areaWindRate=dataA[i].rate;
                             areaWindRates.push(areaWindRate);
                             var areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             var areaWindName =dataA[i].wtname;
                             areaWindNames.push(areaWindName) 

                         }
                
 

                       
                      
                     // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
         
            
            },
          });
                 
            
             dispatch(actions.setVars('areaWindNameMore',areaWindNames));
             dispatch(actions.setVars('areaWindCostMore',areaWindCosts));
             dispatch(actions.setVars('areaWindEarningMore',areaWindEarnings));
             dispatch(actions.setVars('areaWindRateMore',areaWindRates));
            
            
              },
               back:(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)=>{
           var areaWindCosts=[];
                         var areaWindEarnings=[];
                         var areaWindRates=[];
                         
                         var areaWindNames=[];
                         var areaWindids=[];
          $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/yield/getYieldByWfid',
                     async:false,
                    data:{
                   'startdate':year+"-"+(actbt+1)+"-"+'1',
                 'enddate':year+"-"+(actbt+1)+"-"+daycount,
                'wfid':areaWindidssT[index2],
                'methods':'asc',
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                      
                        
                    
                         var dataA=data.data;
                         for (var i in dataA)
                         {
                             var areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             var areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             var areaWindRate=dataA[i].rate;
                             areaWindRates.push(areaWindRate);
                             var areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             var areaWindName =dataA[i].wtname;
                             areaWindNames.push(areaWindName) 

                         }
                  
 

                       
                      
                     // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
             

           
            
            },
          });
                 
            
             dispatch(actions.setVars('areaWindNamesss',areaWindNames));
             dispatch(actions.setVars('areaWindCostsss',areaWindCosts));
             dispatch(actions.setVars('areaWindEarningsss',areaWindEarnings));
             dispatch(actions.setVars('areaWindRatesss',areaWindRates));
         
            
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