import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windcet from './Windcet.jsx';
import Windcett from './Windcett.jsx';
import icono from '../../../../../img/comp/wind_logo.png';
var actions = require('redux/actions');
var $=require('jquery');
let data=require('./../group/Profit-data3');
let month=data.month;
let button=data.button;
let input_url="10.9.100.38";
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let windPT=data.windFJJ;
let Component = React.createClass({
    componentWillMount() {
         let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
       
        let areaPlanDay=data.areaPlanDay;
        let areaPlanDayT=data.areaPlanDayT;
        let text=data.textT;

        let{wftpowerplan,wftmonth,wftpoweract,ipUrl,xxdwfId,xxdwfNa,actbt=0,changpage,wind,windP,gogogo,back,more,close,backtop,befor_pagee='windpage',befor_pagee2,areaPlan}=this.props;
          return (
           <div className={styles.box}>
             <div className={styles.boxcover} id='boxcover'></div>
              <div className={styles.paddingtop}>
              <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                {// 12个月数据
                }
                <div className={`${styles.biggbox} ${styles.shadow}`}>
                    
                       
                           
                                <Windcett areaPlan={wftmonth} xxdwfId={xxdwfId} input_url={ipUrl} areaPlanDay={wftpowerplan} areaPlanDayT={wftpoweract} height={410} text={xxdwfNa+'每月发电量'}></Windcett>
                          
                       
                           
                           
                    
                                <div className={styles.imgq}>
                                    <img src={icono}/>
                                </div>
          
                </div>  
             {// 每个月的数据
                }
           
                <div className={`${styles.biggbox} ${styles.shadow}`}>
                    
                       
                           
                                <Windcet areaPlan={areaPlan}  areaPlanDay={wind} areaPlanDayT={windP} height={410} text={[actbt+1]+'月'+xxdwfNa+'每日发电量'} ></Windcet>
                          
                       
                           
                           
                    
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
        actbt:state.vars.actbtt,
         wind:state.vars.areaRecordCostNP,
         windP:state.vars.areaRecordProfitNP,
           befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
         xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
         btn:state.vars.btnn,
         areaPlan:state.vars.areaNameNP,
         ipUrl:state.vars.ipUrl,
         wftmonth:state.vars.wftmonth1,
         wftpowerplan:state.vars.wftpowerplan1,
         wftpoweract:state.vars.wftpoweract1,
         

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId,xxdwfNa,input_url) => {
            let arr1=[];
            let arr2=[];
            let arr3=[];
            let date=new Date();
            let month= date.getMonth();
            let wftmonth=[];
            let wftpoweract=[];
            let wftpowerplan=[];
             // 发电量12个月的
           $.ajax({
                            url: 'http://'+input_url+'/wbi/ELEC/getWfieldElec',
                            type: 'post',
                            async:true,
                            data:{'wfid':xxdwfId},
                            dataType: 'json',//here
                            success:function (data) {
                               
                               
                                for(let i in data.data.wfieldsMonthsElec)
                                {
                                    // 获取月份
                                let month=data.data.wfieldsMonthsElec[i].month;
                                wftmonth.push(month+'月');
                                // 实际发电量
                                let poweract=data.data.wfieldsMonthsElec[i].poweract;
                                wftpoweract.push(poweract);
                                

                            }
                            for( let j in data.data.wfieldsMonthsPlanElec)
                            {
                               // 计划发电量
                                wftpowerplan.push(data.data.wfieldsMonthsPlanElec[j]);
                            }
                         
                            dispatch(actions.setVars('wftmonth1',wftmonth));
                             dispatch(actions.setVars('wftpowerplan1',wftpowerplan));
                              dispatch(actions.setVars('wftpoweract1',wftpoweract));
                            },
                            error:function(){

                            },
                         });
            $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/ELEC/getWtTimeAreaElec',  
             async:false,
            data:{
             'month':month,
             'wfid':xxdwfId,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
              
           
             let dataa=data.data;
             for(let i=0;i<dataa.length;i++){
                // 获取天数
                 let xDay=data.data[i].day+'日';
                 arr1.push(xDay);
                 // 获取每天的计划发电量
                 let yPowerPlan=Number(data.data[i].powerplan.toFixed(1));
                 arr2.push(yPowerPlan);
                 // 获取每天的实际发电量
                 let yPowerAct=Number(data.data[i].poweract.toFixed(1));
                 arr3.push(yPowerAct);
             }
   
            
             dispatch(actions.setVars('areaNameNP',arr1));
             dispatch(actions.setVars('areaRecordCostNP',arr2));
             dispatch(actions.setVars('areaRecordProfitNP',arr3));
            dispatch(actions.setVars('actbtt',month-1));
             },
             error:function(){
               
             },
           });
            
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
    
         changpage :(value,key,xxdwfId,input_url)=>{
            dispatch(actions.setVars('actbtt',key ));
           let date=new Date();
            let year= date.getFullYear();
            var arr1w=[];
            var arr2w=[];
            var arr3w=[];
            var monthh=key+1;  
          $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/ELEC/getWtTimeAreaElec',  
             async:false,
            data:{
             'year':year,
             'month':monthh,
             'wfid':xxdwfId,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
          
             // 获取x轴的值内蒙达茂天润风电场
            
             for(var i=0;i<data.data.length;i++){
                 var xDay=data.data[i].day+'日';
                 arr1w.push(xDay);
                 var yPowerPlan=data.data[i].powerplan;
                 arr2w.push(yPowerPlan);
                 var yPowerAct=data.data[i].poweract;
                 arr3w.push(yPowerAct);
             }
           
             },
             error:function(){
              
             },
           });
          dispatch(actions.setVars('areaNameNP',arr1w));
             dispatch(actions.setVars('areaRecordCostNP',arr2w));
             dispatch(actions.setVars('areaRecordProfitNP',arr3w));

        },
         gogogo:(wind)=>{
            (function(){
                windPT.sort(function(a,b){
                    return b.areaRecordCost - a.areaRecordCost;
                })
                for(var i=0;i<12;i++){
                    x0[i]=wind[i].name;
                    x1[i]=wind[i].areaRecordCost;
                }
            })()
              dispatch(actions.setVars('areaNamee', x0));
              dispatch(actions.setVars('windP',x1))

        },
        back:(wind)=>{
            (function(){
                windPT.sort(function(a,b){
                    return a.areaRecordCost - b.areaRecordCost;
                })
                for(var i=0;i<12;i++){
                    x2[i]=wind[i].name;
                    x3[i]=wind[i].areaRecordCost;
                }
            })()
              dispatch(actions.setVars('areaNamee', x2));
              dispatch(actions.setVars('windP',x3))

        },
         more:()=>{
             $("#sss").show();
             $('#boxcover').show();
             // $('.box').css('opacity',".5")
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
