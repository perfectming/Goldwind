
import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import Healtytimechart from './Healtytimechart.jsx';
import Healtytimecharttt from './Healtytimecharttt.jsx';
import icono from './img/healthy1.png';

var $=require('jquery');
var actions = require('redux/actions');
let data=require('./Profit-dataq');

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
        let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
        
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {ipUrl,WTHealNamee,WTNe,areaName,areaRecordCost,xxdwfNa,WTN,WTHealName,w0='11月',wins,befor_pagee='windpage',backtop,befor_pagee2,areaPlan,areaPlanDay}=this.props;
        return (

            <div className={styles.box}>

            <div className={styles.padding}>
            <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div>
            </div>
             
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                            <p className={styles.titleee}>{xxdwfNa+'每月健康度'}</p>
                               <Healtytimechart  monthT={WTHealName} text={text} areaRecordProfitT={WTN} input_url={ipUrl}></Healtytimechart>
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
                              <p className={styles.titleee}>{w0+xxdwfNa+'每日健康度'}</p>
                                <Healtytimecharttt   areaPlan={WTHealNamee} areaPlanDay={WTNe}></Healtytimecharttt>
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
         w0 : state.vars.wfH,
        WTHealName:state.vars.WTHealName1,
        WTN:state.vars.WTN1,
        WTHealNamee:state.vars.WTHealName12,
        WTNe:state.vars.WTN12,
         xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
        ipUrl:state.vars.ipUrl,

        

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId,xxdwfNa,input_url) => {
            
       let WTHealH=[];
       let WTHealName=[];
       let WTN=[];
     
       let date = new Date();
       let month =date.getMonth();
       let year=date.getFullYear();

              $.ajax({
              type:'post',
              url:'http://'+input_url+'/wbi/Health/getWfieldTimHealth',  
              async:false,
             data:{
                'year':year,
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
           let WTHealNamee=["1日","2日","3日","4日","5日","6日","7日","8日","9日","10日","11日","12日","13日","14日",,"15日","16日","17日","18日","19日","20日","21日","22日","23日","24日","25日","26日","27日","28日","29日","30日"];
             let WTNN=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  
               let WHDayH=data.data
              dispatch(actions.setVars('WTHealName12',WTHealNamee));
              dispatch(actions.setVars('WTHealName1',WTHealName));
              dispatch(actions.setVars('WTN1',WTN ));
              dispatch(actions.setVars('WHmonth',month));
              dispatch(actions.setVars('wfH',month+'月'));
               dispatch(actions.setVars('WTN12',WTNN ));
         
            
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