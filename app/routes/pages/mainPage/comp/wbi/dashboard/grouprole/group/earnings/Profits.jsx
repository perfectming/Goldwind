import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from '../../../../../../img/comp/收益率1.png';
var $=require('jquery');
import Fanchart from './fanchart.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data1');
let windFiedN=[];
let date=new Date;
let year =date.getFullYear();
let arr5=[];
let Component = React.createClass({
    componentWillMount() {
        let{ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{trt,width,ipUrl,index2,keyy,actbt=0,btn=0,changpage,wind,windP,windPT,gogogo,back,areaRecordCostRR,machinee,height,more,close,ban,backtop,befor_pagee='group',befor_page2,w11='1区域',w111='风机1',sqy,pointPlacement,windN,keyyy,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,areaWindids,areaWindNamessT,areaWindCostssT,areaWindEarningssT,areaWindRatessT,areaWindidssT,areaWindCostMore,areaWindEarningMore,areaWindNameMore,areaWindRateMore}=this.props;   
        return (
            <div className={styles.box}>
                 {// 遮罩层 
                 }
                <div className={styles.boxcover} id='boxcover'></div>
                {// 更多弹出的表格
                }
                <div className={styles.more} id="sss">
                    <div className={styles.moretitle}>
                        <img src={icono}/>
                        <p>{[actbt+1]+'月'+w11+w111+'收益'}</p>
                        <div onClick={()=>close()} className={styles.gg}>x</div>
                    </div>
                    <div className={styles.scroll}>
                        <Fanchart x={40} areaRecordCostR={areaWindCostMore} areaRecordProfitR={areaWindEarningMore} machine={areaWindNameMore} height={500} TBAA={areaWindRateMore} width={width} ly={0}  lx={-75} x={50}></Fanchart>
                    </div>
                </div>
                {//导航的月份
                }
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key,ipUrl)} key={key}>{value.name}</li>)
                        })
                    }
                    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2,actbt)}>返回</li>
                </ul>   
              {// 区域表格（第一个）
              }
                <div className={`${styles.areabox} ${styles.shadow}`}>
                    <div className={styles.bgccc}> <img src={icono}/></div>
                    <AreaTable text={actbt+1+'月集团各区域收益'} areaName={wind} areaRecordCost={windN} areaRecordProfit={windP} TBA={windPT} windFiedN={windFiedN} arr5={arr5}  keyy={keyyy}  height={410} width={1700} input_url={ipUrl}></AreaTable>
                          
                </div>
             {// 风场表格（第二个）
             }
                <div className={`${styles.windbox} ${styles.shadow}`}>
                    <div className={styles.bgccc}> <img src={icono}/></div>
                    <WindfieldTable  text={[actbt+1]+'月'+w11+'各风电场年收益'} windFiled={areaWindNames} windCost={areaWindCosts} windProfit={areaWindEarnings} TBA={areaWindRates}  keyy={keyyy}  areaWindids={areaWindids} height={410} input_url={ipUrl}></WindfieldTable>
                      
                </div>
            { // 风机表格 （第三个）
            }
                <div className={`${styles.bigbox} ${styles.shadow}`}>          
                    <Fanchart x={45} areaRecordCostR={areaWindCostssT} areaRecordProfitR={areaWindEarningssT} machine={areaWindNamessT } height={440} TBAA={areaWindRatessT} pointPlacement={-0.06} width={850} text={(actbt+1)+'月'+w11+w111+'各风机收益'} ly={40} lx={-75}></Fanchart>
                    <div className={styles.bgccc}>
                        <img src={icono}/>
                    </div>
                    <div className={styles.buttons}>
                        <button className={btn===0? styles.btn0 : styles.btn1} onClick={()=>gogogo(btn,areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,ipUrl)}  > 前10</button>
                        <button className={btn===1? styles.btn0 : styles.btn1} onClick={()=>back(btn,areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,ipUrl) }>后10</button>
                        <button className={btn===2? styles.btn0 : styles.btn1} onClick={()=>more(btn,areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,ipUrl) }>更多</button>
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
        // 区域表格数据
        wind:state.vars.wind,
        windN:state.vars.windN,
        windP:state.vars.windP,
        windPT:state.vars.windPT,
        // 风场表格数据
        w11: state.vars.w1,//区域名字
        areaWindNames : state.vars.areaWindNamess,
        areaWindCosts : state.vars.areaWindCostss,
        areaWindEarnings : state.vars.areaWindEarningss,
        areaWindids: state.vars.areaWindidss,
        // 风机表格数据
        w111: state.vars.w123,//风场名字
        areaWindNamessT : state.vars.areaWindNamesss,
        areaWindCostssT : state.vars.areaWindCostsss,
        areaWindEarningssT : state.vars.areaWindEarningsss,
        areaWindRatessT : state.vars.areaWindRatesss,
        areaWindidssT: state.vars.areaWindidsss,
        // 更多表格数据
        areaWindNameMore:state.vars.areaWindNameMore,
        areaWindCostMore:state.vars.areaWindCostMore,
        areaWindEarningMore:state.vars.areaWindEarningMore,
        areaWindRateMore:state.vars.areaWindRateMore,

        ban:state.vars.ban,
        machinee:state.vars.machinee,
        areaRecordCostRR:state.vars.areaRecordCostRR,

        
        
        sqy: state.vars.wins1,
        
        keyyy:state.vars.keyy,
      
        areaWindRates : state.vars.areaWindRatess,
       
       
        keyy:state.vars.keyy,
        index2:state.vars.index2,
        
        btn:state.vars.btnn,
        ipUrl:state.vars.ipUrl,
        // 更多的表格的宽度
        width:state.vars.width1,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ajax:(input_url)=>{
            // 区域表格数据
            let arr1=[];
            let arr2=[];
            let arr3=[];
            let arr4=[];
           // 风场表格数据
            let areaWindCosts=[];
            let areaWindEarnings=[];
            let areaWindRates=[];
            let areaWindids=[];
            let areaWindNames=[];
           // 风机表格数据
            let areaWindCosts1=[];
            let areaWindEarnings1=[];
            let areaWindRates1=[];
            let areaWindids1=[];
            let areaWindNames1=[];


            let datee=new Date;
            let monthF=datee.getMonth();  
                 
            let day = new Date(year,monthF,0); 
            let  daycountT = day.getDate();
             // 开始时第一张图跟这变
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getAllGroupYield',
                async:false,
                data:{
             
                    'startdate':year+"-"+monthF+"-"+'1',
                    'enddate':year+"-"+monthF+"-"+daycountT,
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
                        let rate=dataA[i].rate*100;
                        arr4.push(Number(rate.toFixed(2)));
                        let groupid=dataA[i].groupid;
                        arr5.push(Number(groupid))
                    }
                },
                error:function(){
             
                },
            });
            dispatch(actions.setVars('actbt',monthF-1));
            dispatch(actions.setVars('windN',arr2));
            dispatch(actions.setVars('wind',arr3));
            dispatch(actions.setVars('windP',arr1));
            dispatch(actions.setVars('windPT',arr4));
            dispatch(actions.setVars('btnn',0));
            // 开始时第二张图跟着变
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getYieldByGroupid',
                async:false,
                data:{
                      
                    'startdate':year+"-"+monthF+"-"+'1',
                    'enddate':year+"-"+monthF+"-"+daycountT,
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
                        let areaWindRate=dataA[i].rate*100;
                        areaWindRates.push(Number(areaWindRate.toFixed(2)));
                        let areaWindid=dataA[i].wfid;
                        areaWindids.push(areaWindid);
                        let areaWindName =dataA[i].wfname;
                        areaWindNames.push(areaWindName)

                    }
                      
                  
                    
                    
            
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
            dispatch(actions.setVars('keyy',monthF));
            dispatch(actions.setVars('daycount',daycountT));
            dispatch(actions.setVars('w123',areaWindNames[0]));
             dispatch(actions.setVars('btnn',0));

            // 开始时第三张图跟着变
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getYieldByWfid',
                async:false,
                data:{
                      
                    'startdate':year+"-"+monthF+"-"+'1',
                    'enddate':year+"-"+monthF+"-"+daycountT,
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
                        let areaWindRate=dataA[i].rate*100;
                        areaWindRates1.push(Number(areaWindRate.toFixed(2)));
                        let areaWindid=dataA[i].wfid;
                        areaWindids1.push(areaWindid);
                        let areaWindName =dataA[i].wtname;
                        areaWindNames1.push(areaWindName)

                    }
 
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
        try:()=>{
   
        },
        // 点击月份下面所有的变化
        changpage :(value,key,input_url)=>{
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
            let day = new Date(year,monthh,0); 

            let  daycount = day.getDate();
   // 点击月份第一张图变化
            
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getAllGroupYield',
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
                        let rate=dataA[i].rate*100;
            
                        arr4.push(Number(rate.toFixed(2)));
                        let groupid=dataA[i].groupid;
                        arr5.push(Number(groupid));
                    }
             
             

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
            // 前十高亮显示
            dispatch(actions.setVars('btnn',0));
            // 点击月份第二张图跟着变
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getYieldByGroupid',
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
                        let areaWindRate=dataA[i].rate*100;
                        areaWindRates.push(Number(areaWindRate.toFixed(2)));
                        let areaWindid=dataA[i].wfid;
                        areaWindids.push(areaWindid);
                        let areaWindName =dataA[i].wfname;
                        areaWindNames.push(areaWindName)

                    }

                
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
                    url:'http://'+input_url+'/wbi/yield/getYieldByWfid',
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
                            let areaWindRate=dataA[i].rate*100;
                            areaWindRates1.push(Number(areaWindRate.toFixed(2)));
                         
                              
                            let areaWindName =dataA[i].wtname;
                            areaWindNames1.push(areaWindName)

                        }
                     
 

                       
                      

                    
                    
            
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
        gogogo:(btn,areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,input_url)=>{
                  
            let areaWindCosts12=[];
            let areaWindEarnings12=[];
            let areaWindRates12=[];
            let areaWindids12=[];
            let areaWindNames12=[];       
 let date=new Date();
        let dayy = new Date(year,actbt+1,0); 
        let daycount = dayy.getDate();
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getYieldByWfid',
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
                
                    let dataAB=data.data;
                    for (let i in dataAB)
                    {
                        let areaWindCost=dataAB[i].costs;
                        areaWindCosts12.push(areaWindCost);
                        let areaWindEarning=dataAB[i].earning;
                        areaWindEarnings12.push(areaWindEarning);
                        let areaWindRate=dataAB[i].rate*100;
                        areaWindRates12.push(Number(areaWindRate.toFixed(2)));
                        let areaWindName =dataAB[i].wtname;
                        areaWindNames12.push(areaWindName)

                    }
 
                    // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
                },
                error:function(){
         
      
                },
            });
                 
            
            dispatch(actions.setVars('areaWindNamesss',areaWindNames12));
            dispatch(actions.setVars('areaWindCostsss',areaWindCosts12));
            dispatch(actions.setVars('areaWindEarningsss',areaWindEarnings12));
            dispatch(actions.setVars('areaWindRatesss',areaWindRates12));
            dispatch(actions.setVars('btnn',0));
            


            
        },
        // 这是更多
        more:(btn,areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,input_url)=>{
            $("#sss").show();
            $('#boxcover').show();
            areaWindCosts=[];
            areaWindEarnings=[];
            areaWindRates=[];
         
            areaWindNames=[];
 let date=new Date();
        let dayy = new Date(year,actbt+1,0); 
        let daycount = dayy.getDate();
         let width=0;
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getYieldByWfid',
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
                        let areaWindRate=dataA[i].rate*100;
                        areaWindRates.push(Number(areaWindRate.toFixed(2)));
                            
                        let areaWindName =dataA[i].wtname;
                        areaWindNames.push(areaWindName)

                    }
            //更多时 弹出的表格宽度
            let length = areaWindNames.length;
              width=60*length;
    
                       
        
                    
                    
            
                },
                error:function(){
         
            
                },
            });
                 
            
            dispatch(actions.setVars('areaWindNameMore',areaWindNames));
            dispatch(actions.setVars('areaWindCostMore',areaWindCosts));
            dispatch(actions.setVars('areaWindEarningMore',areaWindEarnings));
            dispatch(actions.setVars('areaWindRateMore',areaWindRates));
            // dispatch(actions.setVars('btnn',2));
            dispatch(actions.setVars('width1',width));
            
            
        },
        back:(btn,areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,input_url)=>{
               
            areaWindCosts=[];
            areaWindEarnings=[];
            areaWindRates=[];
            areaWindNames=[];
        let date=new Date();
        let dayy = new Date(year,actbt+1,0); 
        let daycount = dayy.getDate();
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/yield/getYieldByWfid',
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
                        let areaWindRate=dataA[i].rate*100;
                        areaWindRates.push(Number(areaWindRate.toFixed(2)));
                             
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
            // 后十高亮显示
            dispatch(actions.setVars('btnn',1));

         
            
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