import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from '../img/PBA.png';
import Fanchart from './fanchart.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data2');
let input_url="10.9.99.65";
let month=data.month;
let button=data.button;
let areaName=data.areaName;
let areaRecordCosts=data.areaRecordCosts;
let areaRecordProfit=data.areaRecordProfit;
let text0=data.text[0];


let fanProfit=data.fanProfit;
let fanCost=data.fanCost;
let fanCost1=data.fanCost1;
let fanCost2=data.fanCost2;
let fanCost3=data.fanCost3;
let text1=data.text[1];
let windFiled=data.windFiled;
let areaRecordProfitt=data.areaRecordProfitt;
let areaRecordCostss=data.areaRecordCostss;
let areaRecordCostsS1=data.areaRecordCostsS1;
let areaRecordCostsS2=data.areaRecordCostsS2;
let areaRecordCostsS3=data.areaRecordCostsS3;
let areaRecordCostsS4=data.areaRecordCostsS4;
let areaNamee=data.areaNamee;
let text2=data.text[2];
let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
     componentDidMount() {
        this.props.init();
    },

    render() {
      let{PBAGroupMonthF="11月",PBAGroupFirstDayy,PBAGroupFirstPoweract,PBAGroupFirstFaultloss,PBAGroupFirstMaintainloss,PBAGroupFirstLimitloss,PBAGroupFirstNodevreasonloss,PBAGroupFirstPba,PBAGroupMonth,PBAGroupPoweract,PBAGroupFaultloss,PBAGroupMaintainloss,PBAGroupLimitloss,PBAGroupNodevreasonloss,PBAGroupPba,wq='风场1',more,changpage,wind,windP,close,actbt=0,backtop,befor_pagee='group',befor_pagee2,w0,ww,}=this.props;
       
          return (
           <div className={styles.box}>
           <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>11月份1区域1风场各风机PBA</p>
                <div onClick={()=>close()}>x</div>
                </div>
                <Fanchart machine={PBAGroupFirstDayy} fanProfit={fanProfit} fanCost={fanCost} fanCost1={fanCost1}fanCost2={fanCost2}fanCost3={fanCost3} height={500} width={1760}></Fanchart>
                 </div>
              <div className={styles.paddingtop}><div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>

               <div className={styles.covers}>
                   <div className={styles.bgc}> <img src={icono}/></div>
                   <div className={`${styles.areabox} ${styles.shadow}`}>
                       <div>
                           <AreaTable PBAGroupFaultloss={PBAGroupFaultloss} areaName={PBAGroupMonth} areaRecordProfit={PBAGroupPoweract} PBAGroupMaintainloss={PBAGroupMaintainloss} PBAGroupLimitloss={PBAGroupLimitloss} PBAGroupNodevreasonloss={PBAGroupNodevreasonloss} PBAGroupPba={PBAGroupPba}text0={text0} text1={text1}></AreaTable>
                           <p className={styles.titww}>集团每月PBA</p>
                       </div>
                   </div>
               </div>
             
               <div className={`${styles.bigbox} ${styles.shadow} ${styles.bigboxx}`}>
                   <div className={styles.coverbox}>
                       <div className={styles.windcebox}>
                           <div>
                               <Fanchart machine={PBAGroupFirstDayy} fanProfit={PBAGroupFirstPoweract} fanCost={PBAGroupFirstFaultloss} fanCost1={PBAGroupMaintainloss}fanCost2={PBAGroupFirstLimitloss}fanCost3={PBAGroupFirstNodevreasonloss} height={380} width={1730} PBAGroupFirstPba={PBAGroupFirstPba}></Fanchart>
                           </div>
                       </div>
                       <div className={styles.tik}>
                           <p>{PBAGroupMonthF+'每日PBA'}</p>
                       </div>
                   </div>
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
         areaNamee:state.vars.areaNamee,
         befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_pagee2,
         w0: state.vars.PBAGroupPbaName,
        winss: state.vars.wins1,
         ww: state.vars.ww,
         wq: state.vars.wr,
         PBAGroupMonthF:state.vars.PBAGroupPbaName,
          PBAGroupMonth: state.vars.PBAGroupMonth1,
          PBAGroupPoweract: state.vars.PBAGroupPoweract1,
          PBAGroupFaultloss: state.vars.PBAGroupFaultloss1,
          PBAGroupMaintainloss: state.vars.PBAGroupMaintainloss1,
          PBAGroupLimitloss: state.vars.PBAGroupLimitloss1,
          PBAGroupNodevreasonloss: state.vars.PBAGroupNodevreasonloss1,
          PBAGroupPba: state.vars.PBAGroupPba1,
        // 获取默认的月份上个月
          PBAGroupFirstDayy: state.vars.PBAGroupFirstDayy1,
          PBAGroupFirstPoweract: state.vars.PBAGroupFirstPoweract1,
          PBAGroupFirstFaultloss: state.vars.PBAGroupFirstFaultloss1,
          PBAGroupFirstMaintainloss: state.vars.PBAGroupFirstMaintainloss1,
          PBAGroupFirstLimitloss: state.vars.PBAGroupFirstLimitloss1,
          PBAGroupFirstNodevreasonloss: state.vars.PBAGroupFirstNodevreasonloss1,
          PBAGroupFirstPba: state.vars.PBAGroupFirstPba12,


    }
};
const mapDispatchToProps = (dispatch) => {
    return {
       ajax: () => {
        let PBAGroupMonth=[];
        let PBAGroupFirstDay=[];
        let PBAGroupPoweract=[];
        let PBAGroupFaultloss=[];
        let PBAGroupMaintainloss=[];
        let PBAGroupLimitloss=[];
        let PBAGroupNodevreasonloss=[];
        let PBAGroupPba=[];
        let PBAGroupFirstPoweract=[];
        let PBAGroupFirstFaultloss=[];
        let PBAGroupFirstMaintainloss=[];
        let PBAGroupFirstLimitloss=[];
        let PBAGroupFirstNodevreasonloss=[];
        let PBAGroupFirstPba=[];
        // 获取12个月的PBA
          $.ajax({
                     type:'post',
                     url:'http://'+input_url+':8080/wbi//PBA/getCompanyTimePBA',
                     async:false,
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                     
                        let PBAGroupSpace=data.data[0];
                       
                        for ( let i in PBAGroupSpace){
                          let month=PBAGroupSpace[i].month+'月';
                          PBAGroupMonth.push(month);
                          let poweract=PBAGroupSpace[i].poweract;
                          PBAGroupPoweract.push(poweract);
                          let faultloss=PBAGroupSpace[i].faultloss;
                          PBAGroupFaultloss.push(faultloss);
                          let maintainloss=PBAGroupSpace[i].maintainloss;
                          PBAGroupMaintainloss.push(maintainloss);
                          let limitloss=PBAGroupSpace[i].limitloss;
                          PBAGroupLimitloss.push(limitloss);
                          let nodevreasonloss=PBAGroupSpace[i].nodevreasonloss;
                          PBAGroupNodevreasonloss.push(nodevreasonloss);
                          let pba=PBAGroupSpace[i].pba*100;
                          PBAGroupPba.push(Number(pba.toFixed(1)));
                        }

                        // 默认的月份
                        let PBAGroupFirstMonth=data.data[1];
  
                        for ( let i in PBAGroupFirstMonth){
                          let day=PBAGroupFirstMonth[i].day+'日';
                          PBAGroupFirstDay.push(day);
                          let poweract=PBAGroupFirstMonth[i].poweract;
                          PBAGroupFirstPoweract.push(poweract);
                          let faultloss=PBAGroupFirstMonth[i].faultloss;
                          PBAGroupFirstFaultloss.push(faultloss);
                          let maintainloss=PBAGroupFirstMonth[i].maintainloss;
                          PBAGroupFirstMaintainloss.push(maintainloss);
                          let limitloss=PBAGroupFirstMonth[i].limitloss;
                          PBAGroupFirstLimitloss.push(limitloss);
                          let nodevreasonloss=PBAGroupFirstMonth[i].nodevreasonloss;
                          PBAGroupFirstNodevreasonloss.push(nodevreasonloss);
                          let pba=PBAGroupFirstMonth[i].pba*100;
                          PBAGroupFirstPba.push(Number(pba.toFixed(1)));
                        }
               
                      
              },
              error:function(){
                 
                
          
             },
           });
           dispatch(actions.setVars('PBAGroupMonth1',PBAGroupMonth ));
           dispatch(actions.setVars('PBAGroupPoweract1',PBAGroupPoweract ));
           dispatch(actions.setVars('PBAGroupMaintainloss1',PBAGroupMaintainloss ));
           dispatch(actions.setVars('PBAGroupLimitloss1',PBAGroupLimitloss));
           dispatch(actions.setVars('PBAGroupFaultloss1',PBAGroupFaultloss ));
           dispatch(actions.setVars('PBAGroupNodevreasonloss1',PBAGroupNodevreasonloss ));
           dispatch(actions.setVars('PBAGroupPba1',PBAGroupPba ));
           // 获取上个月的PBAFirst
           dispatch(actions.setVars('PBAGroupFirstDayy1',PBAGroupFirstDay ));
           dispatch(actions.setVars('PBAGroupFirstPoweract1',PBAGroupFirstPoweract ));
           dispatch(actions.setVars('PBAGroupFirstMaintainloss1',PBAGroupFirstMaintainloss ));
           dispatch(actions.setVars('PBAGroupFirstLimitloss1',PBAGroupFirstLimitloss));
           dispatch(actions.setVars('PBAGroupFirstFaultloss1',PBAGroupFirstFaultloss ));
           dispatch(actions.setVars('PBAGroupFirstNodevreasonloss1',PBAGroupFirstNodevreasonloss ));
           dispatch(actions.setVars('PBAGroupFirstPba12',PBAGroupFirstPba ));
      
  

        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        
         more:()=>{
             $("#sss").show();
             $('#boxcover').show();
        },
        close:()=>{
            $("#sss").hide();
              $('#boxcover').hide();
        },
        backtop:(befor_pagee,befor_pagee2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
        changpage :(value,key)=>{

            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('wind',value.plan));
            dispatch(actions.setVars('windP',value.actrul));
            dispatch(actions.setVars('ww',value.name))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
