import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import PBAtimechart from './PBAtimechart.jsx';
import PBAtimechartt from './PBAtimechartt.jsx';
import icono from './img/PBA.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let monthT=data.monthT;
let datee=new Date;
let input_url="10.9.99.103";
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
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{PBATimeSecondPba,PBATimeSecondNodevreasonloss,PBATimeSecondLimitloss,PBATimeSecondMaintainloss,PBATimeSecondFaultloss,PBATimeSecondPoweract,PBATimeSecondDay,PBATimeFirstPba,PBATimeFirstNodevreasonloss,PBATimeFirstLimitloss,PBATimeFirstMaintainloss,PBATimeFirstFaultloss,PBATimeFirstPoweract,PBATimeFirstMonth,w0,winsss,befor_pagee='windpage',backtop,befor_pagee2}=this.props;
        return (
            <div className={styles.box}>
             <div className={styles.padding}>
             <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                            <p className={styles.titleee}>每月PBA</p>
                                <PBAtimechart monthT={PBATimeFirstMonth} profit={PBATimeFirstPoweract} cost={PBATimeFirstPba} fanCost={PBATimeFirstFaultloss} fanCostA={PBATimeFirstMaintainloss} fanCostB={PBATimeFirstLimitloss} fanCostC={PBATimeFirstNodevreasonloss} ></PBAtimechart>
                            </div>
                           
                        </div>
                    </div>
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>
                    
                </div>
                 <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                           
                            <div>
                             <p className={styles.titleee}>{w0+'月每日PBA'}</p>
                                <PBAtimechartt areaPlan={PBATimeSecondDay} areaPlanDay={PBATimeSecondPoweract} areaPlanDayT={PBATimeSecondPba} fanCost={PBATimeSecondFaultloss} fanCostB={PBATimeSecondLimitloss} fanCostC={PBATimeSecondNodevreasonloss} fanCostA={PBATimeSecondMaintainloss}></PBAtimechartt>
                            </div>
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


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {
       
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
            $.ajax({
                type:'post',
                url:'http://'+input_url+':9080/wbi/PBA/getWfieldMonthPBA',
                async:false,
                data:{
                    'wfid':150801,
                   
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                console.log(9080)
                     let PBATimeFirstPba=data.data;
                     for ( let i in PBATimeFirstPba){
                         let month=PBATimeFirstPba[i].month;
                         PBATimeFirstMonth.push(month);
                         let poweract=PBATimeFirstPba[i].poweract;
                         PBATimeFirstPoweract.push(poweract);
                         let faultloss=PBATimeFirstPba[i].faultloss;
                         PBATimeFirstFaultloss.push(faultloss);
                         let maintainloss=PBATimeFirstPba[i].maintainloss;
                         PBATimeFirstMaintainloss.push(maintainloss);
                         let limitloss=PBATimeFirstPba[i].limitloss;
                         PBATimeFirstLimitloss.push(limitloss);
                         let nodevreasonloss=PBATimeFirstPba[i].nodevreasonloss;
                         PBATimeFirstNodevreasonloss.push(nodevreasonloss);
                         let pba=Number(PBATimeFirstPba[i].pba.toFixed(2));
                         PBATimeFirstPbaP.push(pba);
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

           // 给第二个图赋初值
             $.ajax({
                type:'post',
                url:'http://'+input_url+':9080/wbi/PBA/getWfieldDayPBA',
                async:false,
                data:{
                    'wfid':150801,
                    'month':month,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
              
                     let PBATimeSecondPba=data.data;
                     for ( let i in PBATimeSecondPba){
                         let day=PBATimeSecondPba[i].day;
                         PBATimeSecondDay.push(day);
                         let poweract=PBATimeSecondPba[i].poweract;
                         PBATimeSecondPoweract.push(poweract);
                         let faultloss=PBATimeSecondPba[i].faultloss;
                         PBATimeSecondFaultloss.push(faultloss);
                         let maintainloss=PBATimeSecondPba[i].maintainloss;
                         PBATimeSecondMaintainloss.push(maintainloss);
                         let limitloss=PBATimeSecondPba[i].limitloss;
                         PBATimeSecondLimitloss.push(limitloss);
                         let nodevreasonloss=PBATimeSecondPba[i].nodevreasonloss;
                         PBATimeSecondNodevreasonloss.push(nodevreasonloss);
                         let pba=Number(PBATimeSecondPba[i].pba.toFixed(2));
                         PBATimeSecondPbaP.push(pba);
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
             dispatch(actions.setVars('windpbaspace',11));

        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
