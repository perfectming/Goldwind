import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from '../img/收益率1.png';
var $=require('jquery');
let input_url="10.68.100.32";
import Fanchart from './fanchart.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data');
let button=data.button;
let actbt=0;
let text=data.text;
let datee=new Date;
let year=datee.getFullYear();
 let dayy = new Date(year,11,0); 
//获取天数：
              let daycount = dayy.getDate();
                
 let windFiedN=[];
 let arr5=[];
let Component = React.createClass({
     componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{index2,keyy,actbt=0,changpage,wind,windP,windPT,gogogo,back,areaRecordCostRR,machinee,height,more,close,ban,backtop,befor_pagee='group',befor_page2,w11='1区域',w111='风机1',sqy,pointPlacement,windN,keyyy,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,areaWindids,areaWindNamessT,areaWindCostssT,areaWindEarningssT,areaWindRatessT,areaWindidssT,areaWindCostMore,areaWindEarningMore,areaWindNameMore,areaWindRateMore}=this.props;
   let day = new Date(year,keyyy,0); 
//获取天数：
              let daycount = day.getDate();
             
            
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
               
                  
                   <div className={`${styles.areabox} ${styles.shadow}`}>
                          <div className={styles.bgccc}> <img src={icono}/></div>
                           <AreaTable text={actbt+1+'月集团各区域收益'} areaName={wind} areaRecordCost={windN} areaRecordProfit={windP} TBA={windPT} windFiedN={windFiedN} arr5={arr5} year={year} keyy={keyyy} daycount={daycount} height={410}></AreaTable>
                    </div>
                

        
                  
                   <div className={`${styles.windbox} ${styles.shadow}`}>
                         <div className={styles.bgccc}> <img src={icono}/></div>
                       
                      
                           <WindfieldTable  text={[actbt+1]+'月'+w11+'各风电场年收益'} windFiled={areaWindNames} windCost={areaWindCosts} windProfit={areaWindEarnings} TBA={areaWindRates} year={year} keyy={keyyy} daycount={daycount} areaWindids={areaWindids} height={410}></WindfieldTable>
                      
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
         w111: state.vars.w123,
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
      
        let arr1=[];
            let arr2=[];
            let arr3=[];
            let arr4=[];
            let areaWindCosts=[];
            let areaWindEarnings=[];
            let areaWindRates=[];
            let areaWindids=[];
            let areaWindNames=[];
            let areaWindCosts1=[];
            let areaWindEarnings1=[];
            let areaWindRates1=[];
            let areaWindids1=[];
            let areaWindNames1=[];


                        
            
           // 第一个图
         $.ajax({
            type:'post',
            url:'http://'+input_url+':8080/wbi/yield/getAllGroupYield',  
            async:false,
           data:{
             
            'startdate':year+"-"+"11"+"-"+'1',
            'enddate':year+"-"+"11"+"-"+"30",
           },
            dataType:'json',
            timeout:'3000',
            success:function(data){
           
                let dataA=data.data;
                for (let i in dataA){
                  let earnings=dataA[i].earning;
                       arr1.push(earnings); 
                  let costs=dataA[i].costs;
                    arr2.push(costs);
              let groupname=dataA[i].groupname;
              arr3.push(groupname);
              let rate=Number(dataA[i].rate.toFixed(2));
            
              arr4.push(rate);
              let groupid=dataA[i].groupid;
              arr5.push(Number(groupid))
                }
             
     

            },
            error:function(){
               
            },
          });

             dispatch(actions.setVars('actbt',10 ));
            dispatch(actions.setVars('windN',arr2));
            dispatch(actions.setVars('wind',arr3));
            dispatch(actions.setVars('windP',arr1));
            dispatch(actions.setVars('windPT',arr4));
            // 开始时第二张图跟着变
              $.ajax({
                     type:'post',
                        url:'http://'+input_url+':8080/wbi/yield/getYieldByGroupid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+"9"+"-"+'1',
                 'enddate':year+"-"+"9"+"-"+"30",
                'groupid':arr5[0],
             
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                     
                       
                         let dataA=data.data;
                         for (let i in dataA)
                         {
                             let areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             let areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             let areaWindRate=Number(dataA[i].rate.toFixed(2));
                             areaWindRates.push(areaWindRate);
                             let areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             let areaWindName =dataA[i].wfname;
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
                     url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',
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
                    
                      
                       
                          let dataA=data.data;
                          for (let i in dataA)
                          {
                              let areaWindCost=dataA[i].costs;
                              areaWindCosts1.push(areaWindCost);
                              let areaWindEarning=dataA[i].earning;
                              areaWindEarnings1.push(areaWindEarning);
                              let areaWindRate=dataA[i].rate;
                              areaWindRates1.push(areaWindRate);
                              let areaWindid=dataA[i].wfid;
                              areaWindids1.push(areaWindid);
                              let areaWindName =dataA[i].wtname;
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
            let arr1=[];
            let arr2=[];
            let arr3=[];
            let arr4=[];     
            let windcosts=[];
            let earnings=[];
            let rates=[];
            let wfids=[];
            let monthh=key+1;
           let areaWindCosts=[];
            let areaWindEarnings=[];
            let areaWindRates=[];
            let areaWindids=[];
            let areaWindNames=[];
            let areaWindCosts1=[];
            let areaWindEarnings1=[];
            let areaWindRates1=[];
            let areaWindids1=[];
            let areaWindNames1=[];
            
            year=datee.getFullYear();
            let day = new Date(year,monthh,0); 
//获取天数：
             let  daycount = day.getDate();

       // 获取收益率月份
            
         $.ajax({
            type:'post',
            url:'http://'+input_url+':8080/wbi/yield/getAllGroupYield',  
            async:false,
           data:{
             
            'startdate':year+"-"+(key+1)+"-"+'1',
            'enddate':year+"-"+(key+1)+"-"+daycount,
           },
            dataType:'json',
            timeout:'3000',
            success:function(data){

               let dataA=data.data;
               for (let i in dataA){
                 let earnings=dataA[i].earning;
                      arr1.push(earnings); 
                 let costs=dataA[i].costs;
                   arr2.push(costs);
             let groupname=dataA[i].groupname;
             arr3.push(groupname);
             let rate=Number(dataA[i].rate.toFixed(2));
            
             arr4.push(rate);
             let groupid=dataA[i].groupid;
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
                        url:'http://'+input_url+':8080/wbi/yield/getYieldByGroupid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+(key+1)+"-"+'1',
                 'enddate':year+"-"+(key+1)+"-"+daycount,
                'groupid':arr5[0],
             
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                       
               

                     

                         let dataA=data.data;
                         for (let i in dataA)
                         {
                             let areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             let areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             let areaWindRate=Number(dataA[i].rate.toFixed(2));
                             areaWindRates.push(areaWindRate);
                             let areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             let areaWindName =dataA[i].wfname;
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
                     url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',
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
                   
                       
                          let dataA=data.data;
                          for (let i in dataA)
                          {
                              let areaWindCost=dataA[i].costs;
                              areaWindCosts1.push(areaWindCost);
                              let areaWindEarning=dataA[i].earning;
                              areaWindEarnings1.push(areaWindEarning);
                              let areaWindRate=dataA[i].rate;
                              areaWindRates1.push(areaWindRate);
                         
                              
                              let areaWindName =dataA[i].wtname;
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
             dispatch(actions.setVars('w123',areaWindNames[0]));
          




        },
        //这是前十；
        gogogo:(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)=>{
                  
                        

          $.ajax({
                     type:'post',
                     url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',
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



                         let dataA=data.data;
                         for (let i in dataA)
                         {
                             let areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             let areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             let areaWindRate=dataA[i].rate;
                             areaWindRates.push(areaWindRate);
                             let areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             let areaWindName =dataA[i].wtname;
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
        
          $.ajax({
                     type:'post',
                     url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',
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
                      
                   
                         let dataA=data.data;
                         for (let i in dataA)
                         {
                             let areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             let areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             let areaWindRate=dataA[i].rate;
                             areaWindRates.push(areaWindRate);
                             let areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             let areaWindName =dataA[i].wtname;
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
         
          $.ajax({
                     type:'post',
                     url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',
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
                      
                        
                    
                         let dataA=data.data;
                         for (let i in dataA)
                         {
                             let areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             let areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             let areaWindRate=dataA[i].rate;
                             areaWindRates.push(areaWindRate);
                             let areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             let areaWindName =dataA[i].wtname;
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