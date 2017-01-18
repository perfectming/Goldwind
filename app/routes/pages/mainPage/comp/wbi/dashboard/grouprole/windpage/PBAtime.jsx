import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle3.scss';
import PBAtimechart from './PBAtimechart.jsx';
import PBAtimechartt from '../group/PBATime/PBAtimechartt.jsx';
import icono2 from '../../../../../img/comp/PBA.png';
import icono1 from '../../../../../img/comp/PBA2.png';
var actions = require('redux/actions');
let data=require('./../group/Profit-data3');
let monthT=data.monthT;
let datee=new Date;
let input_url="10.68.100.32";
let month=datee.getMonth();
let profit=data.windProfit;
let cost=data.windCost;
let fanCost=data.fanCost;
let fanCostA=data.fanCostA;
let areaPlan=data.areaPlan;
let areaPlanDay=data.areaPlanDay;
let areaPlanDayT=data.areaPlanDayT;
let Component = React.createClass({
    componentWillMount() {
        let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{ipUrl,xxdwfId,xxdwfNa,PBATimeSecondPba,PBATimeSecondNodevreasonloss,PBATimeSecondLimitloss,PBATimeSecondMaintainloss,PBATimeSecondFaultloss,PBATimeSecondPoweract,PBATimeSecondDay,PBATimeFirstPba,PBATimeFirstNodevreasonloss,PBATimeFirstLimitloss,PBATimeFirstMaintainloss,PBATimeFirstFaultloss,PBATimeFirstPoweract,PBATimeFirstMonth,w0,winsss,befor_pagee='windpage',backtop,befor_pagee2,PBATimeFirstPbaa,skinStyle}=this.props;
        return (
            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
             <div className={styles.paddingtop}>
                 {//返回
                      }
             <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                {//12个月
                     }
                <div className={`${styles.areabox} ${styles.shadow}`}>
                                <PBAtimechart monthT={PBATimeFirstMonth} profit={PBATimeFirstPoweract} cost={PBATimeFirstPba} fanCost={PBATimeFirstFaultloss} fanCostA={PBATimeFirstMaintainloss} fanCostB={PBATimeFirstLimitloss} fanCostC={PBATimeFirstNodevreasonloss} xxdwfId={xxdwfId} input_url={ipUrl} text={xxdwfNa+'每月PBA'} height={410} PBATimeFirstPbaa={PBATimeFirstPbaa}scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></PBAtimechart>
                            
                           
                   
                  
                    <div className={styles.bgc}>
                       <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                    
                </div>
                {//每个月的每天
                     }
                 <div className={`${styles.areabox} ${styles.shadow}`}>                        
                               
                              <PBAtimechartt PBAx={PBATimeSecondDay} PBAPoweract={PBATimeSecondPoweract}
                              PBAFaultloss={PBATimeSecondFaultloss} PBAMaintainloss={PBATimeSecondMaintainloss}
                              PBALimitloss={PBATimeSecondLimitloss} PBANodevreasonloss={PBATimeSecondNodevreasonloss} height={410}
                              PBAPba={PBATimeSecondPba}
                              text={w0+xxdwfNa+'每日PBA'} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}>
                              </PBAtimechartt>
                        
                    
                    <div className={styles.bgc}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                    
                </div>
            </div>


        );
    }
});



const mapStateToProps = (state) => {
    return {
         w0 : state.vars.windpbaspace,
        winsss: state.vars.wins1,
        // 12个月的数据
        PBATimeFirstMonth: state.vars.PBATimeMonth1,
        PBATimeFirstPoweract: state.vars.PBATimeFirstPoweract1,
        PBATimeFirstFaultloss: state.vars.PBATimeFirstFaultloss1,
        PBATimeFirstMaintainloss: state.vars.PBATimeFirstMaintainloss1,
        PBATimeFirstLimitloss: state.vars.PBATimeFirstLimitloss1,
        PBATimeFirstNodevreasonloss: state.vars.PBATimeFirstNodevreasonloss1,
        PBATimeFirstPba: state.vars.PBATimeFirstPba12,
        //下面的默认数据；
        PBATimeSecondDay: state.vars.PBATimeSecondDay1,
        PBATimeSecondPoweract: state.vars.PBATimeSecondPoweract1,
        PBATimeSecondFaultloss: state.vars.PBATimeSecondFaultloss1,
        PBATimeSecondMaintainloss: state.vars.PBATimeSecondMaintainloss1,
        PBATimeSecondLimitloss: state.vars.PBATimeSecondLimitloss1,
        PBATimeSecondNodevreasonloss: state.vars.PBATimeSecondNodevreasonloss1,
        PBATimeSecondPba: state.vars.PBATimeSecondPba12,
        xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
        ipUrl:state.vars.ipUrl,
        skinStyle:state.vars.skinStyle,
        PBATimeFirstPbaa:state.vars.PBATimeFirstPbaa,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId,xxdwfNa,input_url) => {

         let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
          // 第一个图的数据
            let PBATimeFirstMonth=[];
            let PBATimeFirstPoweract=[];
            let PBATimeFirstFaultloss=[];
            let PBATimeFirstMaintainloss=[];
            let PBATimeFirstLimitloss=[];
            let PBATimeFirstNodevreasonloss=[];
            let PBATimeFirstPbaP=[];
            // 第二个图的数据
            let PBATimeSecondDay=[];
            let PBATimeSecondPoweract=[];
            let PBATimeSecondFaultloss=[];
            let PBATimeSecondMaintainloss=[];
            let PBATimeSecondLimitloss=[];
            let PBATimeSecondNodevreasonloss=[];
            let PBATimeSecondPbaP=[];
            let PBATimeFirstPba=[];
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWfieldMonthPBA',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'year':year,
                    'month':month
                   
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
               
                      PBATimeFirstPba=data.data;
                     // console.log(PBATimeFirstPba)
                     for ( let i in PBATimeFirstPba){
                         // 12个月的数据
                         let month=PBATimeFirstPba[i].month+'月';
                         PBATimeFirstMonth.push(month);
                         // 实际发电量
                         let poweract=PBATimeFirstPba[i].poweract;
                         PBATimeFirstPoweract.push(poweract);
                         // 故障损失
                         let faultloss=PBATimeFirstPba[i].faultloss;
                         PBATimeFirstFaultloss.push(faultloss);
                         // 维护损失
                         let maintainloss=PBATimeFirstPba[i].maintainloss;
                         PBATimeFirstMaintainloss.push(maintainloss);
                         // 限功率损失
                         let limitloss=PBATimeFirstPba[i].limitloss;
                         PBATimeFirstLimitloss.push(limitloss);
                         // 非设备原因损失
                         let nodevreasonloss=PBATimeFirstPba[i].nodevreasonloss;
                         PBATimeFirstNodevreasonloss.push(nodevreasonloss);
                         // PBA
                         let pba=PBATimeFirstPba[i].pba*100;
                         PBATimeFirstPbaP.push(Number(pba.toFixed(2)));
                     }
                  

                },
                error:function(){
                   
                },
            });
            // 给12月赋值
            dispatch(actions.setVars('PBATimeMonth1',PBATimeFirstMonth));
            dispatch(actions.setVars('PBATimeFirstPoweract1',PBATimeFirstPoweract ));
            dispatch(actions.setVars('PBATimeFirstMaintainloss1',PBATimeFirstMaintainloss ));
            dispatch(actions.setVars('PBATimeFirstLimitloss1',PBATimeFirstLimitloss));
            dispatch(actions.setVars('PBATimeFirstFaultloss1',PBATimeFirstFaultloss ));
            dispatch(actions.setVars('PBATimeFirstNodevreasonloss1',PBATimeFirstNodevreasonloss ));
            dispatch(actions.setVars('PBATimeFirstPba12',PBATimeFirstPbaP ));
            dispatch(actions.setVars('PBATimeFirstPbaa',PBATimeFirstPba ));

           // 给第二个图赋初值
             $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWfieldDayPBA',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'year':year,
                    'month':month
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
              
                     let PBATimeSecondPba=data.data;
                     for ( let i in PBATimeSecondPba){
                         // 每天的数据
                         let day=PBATimeSecondPba[i].day+'日';
                         PBATimeSecondDay.push(day);
                         // 计划发电量
                         let poweract=PBATimeSecondPba[i].poweract;
                         PBATimeSecondPoweract.push(poweract);
                         // 故障损失
                         let faultloss=PBATimeSecondPba[i].faultloss;
                         PBATimeSecondFaultloss.push(faultloss);
                         // 维护损失
                         let maintainloss=PBATimeSecondPba[i].maintainloss;
                         PBATimeSecondMaintainloss.push(maintainloss);
                         // 限功率损失
                         let limitloss=PBATimeSecondPba[i].limitloss;
                         PBATimeSecondLimitloss.push(limitloss);
                         // 非设备原因损失
                         let nodevreasonloss=PBATimeSecondPba[i].nodevreasonloss;
                         PBATimeSecondNodevreasonloss.push(nodevreasonloss);
                         // PBA
                         let pba=PBATimeSecondPba[i].pba*100;
                         PBATimeSecondPbaP.push(Number(pba.toFixed(2)));
                     }
                },
                error:function(){
                   
                },

            });
            dispatch(actions.setVars('PBATimeSecondDay1',PBATimeSecondDay));
            dispatch(actions.setVars('PBATimeSecondPoweract1',PBATimeSecondPoweract ));
            dispatch(actions.setVars('PBATimeSecondMaintainloss1',PBATimeSecondMaintainloss ));
            dispatch(actions.setVars('PBATimeSecondLimitloss1',PBATimeSecondLimitloss));
            dispatch(actions.setVars('PBATimeSecondFaultloss1',PBATimeSecondFaultloss ));
            dispatch(actions.setVars('PBATimeSecondNodevreasonloss1',PBATimeSecondNodevreasonloss ));
            dispatch(actions.setVars('PBATimeSecondPba12',PBATimeSecondPbaP ));
             dispatch(actions.setVars('windpbaspace',month+'月'));

        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        },
        // 返回
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
