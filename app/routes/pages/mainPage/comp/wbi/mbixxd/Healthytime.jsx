
import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import Healtytimechart from './Healtytimechart.jsx';
import Healtytimecharttt from './Healtytimecharttt.jsx';
import icono from './img/健康度1.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let input_url="10.9.96.196";
let month=data.month;
let button=data.button;
let areaRecordProfitT=data.areaRecordProfitT;
let monthT=data.monthT;
let text=data.text[2];
 let areaName=data.areaName;
 let areaRecordCost=data.areaRecordCost;
 let areaRecordProfit=data.areaRecordProfit;
 let machine=data.machine;
 let areaPlanDay=data.areaPlanDay
 let areaPlan=data.areaPlan
let Component = React.createClass({
     componentWillMount() {
        let{xxdwfId,xxdwfNa}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa);
        
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {xxdwfNa,WTN,WTHealName,w0='1月',wins,befor_pagee='windpage',backtop,befor_pagee2}=this.props;
        return (

            <div className={styles.box}>

            <div className={styles.padding}>
            <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div>
            <div className={styles.back1} onClick={()=>backtop(befor_pagee,befor_pagee2)}>{xxdwfNa}</div></div>
             
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                            <p className={styles.titleee}>健康度</p>
                               <Healtytimechart  monthT={WTHealName} text={text} areaRecordProfitT={WTN}></Healtytimechart>
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
                              <p className={styles.titleee}>{w0+'月每日健康度'}</p>
                                <Healtytimecharttt areaName={areaName} areaRecordCost={areaRecordCost} areaPlan={areaPlan} areaPlanDay={wins==null?areaPlanDay:wins}></Healtytimecharttt>
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
         w0 : state.vars.WHmonth,
          wins: state.vars.wins1,
          WTHealName:state.vars.WTHealName1,
          WTN:state.vars.WTN1,
         xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,

        

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId,xxdwfNa) => {
            
       let WTHealH=[];
       let WTHealName=[];
       let WTN=[];
     
       let date = new Date();
       let month =date.getMonth();
       
              $.ajax({
              type:'post',
              url:'http://'+input_url+':8080/wbi/Health/getWfieldTimHealth',  
              async:false,
             data:{
                'year':2016,
                'month':month,
              'wfid':xxdwfId,
             },
              dataType:'json',
              timeout:'3000',
              success:function(data){
             
                          let WTHeal=data.data.monthHealth;
               WTHeal.map(function(value,key){
                    for(let n in value){
                      
                        WTN.push(value[n]);
                        WTHealName.push(n+"月")
                    }

               })
               let WHDayH=data.data.
   
              dispatch(actions.setVars('WTHealName1',WTHealName));
              dispatch(actions.setVars('WTN1',WTN ));
              dispatch(actions.setVars('WHmonth',month));
              dispatch(actions.setVars('WHmonth',month));
            
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
       
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component)