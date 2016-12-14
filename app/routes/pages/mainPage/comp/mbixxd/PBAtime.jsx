import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import PBAtimechart from './PBAtimechart.jsx';
import PBAtimechartt from './PBAtimechartt.jsx';
import icono from './img/PBA.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let monthT=data.monthT;
var date=new Date;
let input_url='10.9.99.239:8080';
var month=date.getMonth();
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
        console.log(month);
          // 第一个图的数据
            var PBATimeFirstMonth=[];
            var PBATimeFirstPoweract=[];
            var PBATimeFirstFaultloss=[];
            var PBATimeFirstMaintainloss=[];
            var PBATimeFirstLimitloss=[];
            var PBATimeFirstNodevreasonloss=[];
            var PBATimeFirstPbaP=[];
            // 第二个图的数据
            var PBATimeSecondDay=[];
            var PBATimeSecondPoweract=[];
            var PBATimeSecondFaultloss=[];
            var PBATimeSecondMaintainloss=[];
            var PBATimeSecondLimitloss=[];
            var PBATimeSecondNodevreasonloss=[];
            var PBATimeSecondPbaP=[];
            $.ajax({
                type:'post',
                url:'http://10.68.100.32/wbi/PBA/getWfieldMonthPBA',
                async:false,
                data:{
                    'wfid':150801,
                   
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                 console.log(data)
                     var PBATimeFirstPba=data.data;
                     for ( var i in PBATimeFirstPba){
                         var month=PBATimeFirstPba[i].month;
                         PBATimeFirstMonth.push(month);
                         var poweract=PBATimeFirstPba[i].poweract;
                         PBATimeFirstPoweract.push(poweract);
                         var faultloss=PBATimeFirstPba[i].faultloss;
                         PBATimeFirstFaultloss.push(faultloss);
                         var maintainloss=PBATimeFirstPba[i].maintainloss;
                         PBATimeFirstMaintainloss.push(maintainloss);
                         var limitloss=PBATimeFirstPba[i].limitloss;
                         PBATimeFirstLimitloss.push(limitloss);
                         var nodevreasonloss=PBATimeFirstPba[i].nodevreasonloss;
                         PBATimeFirstNodevreasonloss.push(nodevreasonloss);
                         var pba=Number(PBATimeFirstPba[i].pba.toFixed(2));
                         PBATimeFirstPbaP.push(pba);
                     }
                     console.log(PBATimeFirstMonth)
                    console.log(PBATimeFirstPoweract)
                    console.log(PBATimeFirstFaultloss)
                    console.log(PBATimeFirstMaintainloss)
                    console.log(PBATimeFirstLimitloss)
                    console.log(PBATimeFirstNodevreasonloss)
                    console.log(PBATimeFirstPbaP)

                },
                error:function(){
                    alert(222)
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
                url:'http://10.68.100.32:8080/wbi/PBA/getWfieldDayPBA',
                async:false,
                data:{
                    'wfid':150801,
                    'month':month,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                 console.log(data)
                     var PBATimeSecondPba=data.data;
                     for ( var i in PBATimeSecondPba){
                         var day=PBATimeSecondPba[i].day;
                         PBATimeSecondDay.push(day);
                         var poweract=PBATimeSecondPba[i].poweract;
                         PBATimeSecondPoweract.push(poweract);
                         var faultloss=PBATimeSecondPba[i].faultloss;
                         PBATimeSecondFaultloss.push(faultloss);
                         var maintainloss=PBATimeSecondPba[i].maintainloss;
                         PBATimeSecondMaintainloss.push(maintainloss);
                         var limitloss=PBATimeSecondPba[i].limitloss;
                         PBATimeSecondLimitloss.push(limitloss);
                         var nodevreasonloss=PBATimeSecondPba[i].nodevreasonloss;
                         PBATimeSecondNodevreasonloss.push(nodevreasonloss);
                         var pba=Number(PBATimeSecondPba[i].pba.toFixed(2));
                         PBATimeSecondPbaP.push(pba);
                     }
                },
                error:function(){
                    alert(234)
                    console.log(month)
                    console.log('http://10.68.100.32:8080/wbi/PBA/getWfieldDayPBA')
                },

            });
            dispatch(actions.setVars('PBATimeSecondDay1',PBATimeSecondDay));
            dispatch(actions.setVars('PBATimeSecondPoweract1',PBATimeSecondPoweract ));
            dispatch(actions.setVars('PBATimeSecondMaintainloss1',PBATimeSecondMaintainloss ));
            dispatch(actions.setVars('PBATimeSecondLimitloss1',PBATimeSecondLimitloss));
            dispatch(actions.setVars('PBATimeSecondFaultloss1',PBATimeSecondFaultloss ));
            dispatch(actions.setVars('PBATimeSecondNodevreasonloss1',PBATimeSecondNodevreasonloss ));
            dispatch(actions.setVars('PBATimeSecondPba12',PBATimeSecondPbaP ));
             dispatch(actions.setVars('w0',month));

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
