import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import Profitimechart from './Profitimechart.jsx';
import Profitimechartt from './Profitimechartt.jsx';
import icono from './img/收益率1.png';
var actions = require('redux/actions');
let data=require('./Profit-dataq');
let month=data.month;
let button=data.button;
let input_url="10.9.99.65";
let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {w0,GERa,GEAm,GENa,GEIn,GeR,GeM,GeE,GeC,actbt,changpage,backtop,befor_pagee='group',befor_pagee2}=this.props;
        return (
            <div className={styles.box}>
            <div className={styles.padding}>
             <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                <div className={styles.bigbox}>
                   
                       <div className={styles.imgq}>
                        <img src={icono}/>
                       </div>
                            <div>
                                <Profitimechart GeR={GeR} GeE={GeE} GeC={GeC} GeM={GeM} text={'集团每月收益'}height={420} ></Profitimechart>
                            </div>
                </div>
                 <div className={styles.bigbox}>
                   
                       <div className={styles.imgq}>
                        <img src={icono}/>
                       </div>
                            <div>
                                <Profitimechartt GEIn={GEIn} GERa={GERa} GEAm={GEAm} GENa={GENa}height={420} text={w0+'每日收益'} ></Profitimechartt>
                            </div>
                </div>

            </div>


        );
    }
});



const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbtm,
        GeE:state.vars.GeE1,
        GeC:state.vars.GeC1,
        GeM:state.vars.GeM1,
        GeR:state.vars.GeR1,
        // 下面的數據
        GENa:state.vars.GENa1,
        GEIn:state.vars.GEIn1,
        GEAm:state.vars.GEAm1,
        GERa:state.vars.GERa1,
        w0:state.vars.w0GE,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      ajax:()=>{
        // 上面12各月的数据
            let arr1=[];
            let arr2=[];
            let arr3=[];
            let arr4=[];
            let date =new Date();
            let year =date.getFullYear();
            let month =date.getMonth();
            let day = new Date(year,month,0); 
            let  daycount = day.getDate();
           
          $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getAllRate',  
             async:false,
             dataType:'json',
             timeout:'3000',
             success:function(data){
               
            let GE=data.data;
          
            
             for (let i in GE){
                         let earnings=GE[i].earning;
                         arr1.push(earnings);
                         let costs=GE[i].costs;
                         arr2.push(costs);
                         let groupname=GE[i].month+'月';
                         arr3.push(groupname);
                         let rate=GE[i].rate*100;
                         arr4.push(Number(rate.toFixed(1)));
                     }
            dispatch(actions.setVars('GeE1',arr1));
            dispatch(actions.setVars('GeC1',arr2));
            dispatch(actions.setVars('GeM1',arr3));
            dispatch(actions.setVars('GeR1',arr4));
            dispatch(actions.setVars('actbtm',10 ));
            dispatch(actions.setVars('w0GE',month+'月' ))
            
             },
             error:function(){
                
             }
           });
     // 获取每天的收益
        let GEIn=[];
        let GEAm=[];
        let GERa=[];
    let    GENa=[];
     
          
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getMaxYieBayDay',  
             async:false,
             data:{
              'month':month,
             },
             dataType:'json',
             timeout:'3000',
             success:function(data){
               
           let GE=data.data;
           for( let i in GE){
          let incomes=GE[i].incomes
          GEIn.push(incomes);

          let amounts=GE[i].amounts
          GEAm.push(amounts);

          let rate=GE[i].rate*100
      GERa.push(Number(rate.toFixed(1)));

    let day=GE[i].day;
          GENa.push(day+'日');}
            
             
             },
             error:function(){
                
              }
          })
       
        dispatch(actions.setVars('GENa1',GENa));
        dispatch(actions.setVars('GEIn1',GEIn));
        dispatch(actions.setVars('GEAm1',GEAm));
        dispatch(actions.setVars('GERa1',GERa));



         
      },
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(value,key)=>{
             dispatch(actions.setVars('actbtm',key ));
            
        },
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
