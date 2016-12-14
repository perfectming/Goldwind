import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from '../img/TBA.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
var $=require('jquery');
let month=data.month;
let button=data.button;


// let tbaMonths2=tbaMonths;
// let tbaruntimes2=tbaRunTimes;
// let tbaDownTimes2=tbaDownTimes;
// let tbaTba2=tbaTba;
 let text=data.text[0];
// let windFiled=data.windFiled;
// let windCost=data.windCost;
// let windProfit=data.windProfit;

let Component = React.createClass({
   componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{tbaMonths,tbaRunTimes,tbaDownTimes,tbaTba,befor_pagee='windpage',backtop,befor_pagee2,tbaDays3,tbaDayRunTimes3,tbaDayDownTimes3,tbaDayTba3}=this.props;

          return (

           <div className={styles.box}>
                <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div>
                <div className={`${styles.areabox} ${styles.shadow}`}>
                <div className={styles.bgcc}><img src={icono}/></div>
                   <div>
                     <AreaTable text={text} areaNamee={tbaMonths} areaRecordCostss={tbaDownTimes} areaRecordProfitt={tbaRunTimes} TBA={tbaTba}></AreaTable>
                   </div>
                </div>
               <div className={`${styles.windbox} ${styles.shadow}`}>
                <div className={styles.bgcc}><img src={icono}/></div>
                   <div>
                     <WindfieldTable windFiled={tbaDays3} windCost={tbaDayDownTimes3} windProfit={tbaDayRunTimes3} TBA={tbaDayTba3}></WindfieldTable>
                   </div>
               </div>
               
           </div>
           
        
        );
    }
});



const mapStateToProps = (state) => {
    return {

       tbaMonths:state.vars.tbaMonths1,
       tbaRunTimes:state.vars.tbaRunTimes1,
       tbaDownTimes:state.vars.tbaDownTimes1,
       tbaTba:state.vars.tbaTba1,

        tbaDays3:state.vars.tbaDays31,
        tbaDayRunTimes3:state.vars.tbaDayRunTimes31,
        tbaDayDownTimes3:state.vars.tbaDayDownTimes31,
        tbaDayTba3:state.vars.tbaDayTba31,
    
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      ajax: () => {
          //获取十二个月的TBA
var TBAtimedata;
var TBAdaydata;
var tbaMonths=[];
var tbaRunTimes=[];
var tbaDownTimes=[];
var tbaTba=[];
var tbaDays3=[];
var tbaDayRunTimes3=[];
var tbaDayDownTimes3=[];
var tbaDayTba3=[];
// 获取所有的月份
 $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/TBA/getMonthsTBA',
                     async:false,
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                    // console.log(data);
                        TBAtimedata=data.data; 
                        for(var i in TBAtimedata){
                          var tbamonth=TBAtimedata[i].month;
                          tbaMonths.push(tbamonth);
                          var tbaruntimes=TBAtimedata[i].runtimes;
                          tbaRunTimes.push(tbaruntimes);
                          var downtimes=TBAtimedata[i].downtimes;
                          tbaDownTimes.push(downtimes);
                          var tba=TBAtimedata[i].tba;
                          tbaTba.push(tba);

                          } 
                        
                     
             },
             error:function(){
                
          
             },
           });
         dispatch(actions.setVars('tbaMonths1',tbaMonths));
         dispatch(actions.setVars('tbaRunTimes1',tbaRunTimes));
         dispatch(actions.setVars('tbaDownTimes1',tbaDownTimes));
         dispatch(actions.setVars('tbaTba1',tbaTba));
         



// // // 获取默认的月份：1
 $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/TBA/getDaysTBAByMonth',
                     async:false,
                     dataType:'json',
                     data:{
                      'month':2,
                     },
                     timeout:'3000',
                     success:function(data){
                            // console.log(data);
                         TBAdaydata=data.data; 
                         for(var i in TBAdaydata){
                           var tbaDay=TBAdaydata[i].day;
                           tbaDays3.push(tbaDay);
                           var tbaDayruntimes=TBAdaydata[i].runtimes;
                           tbaDayRunTimes3.push(tbaDayruntimes);
                           var daydowntimes=TBAdaydata[i].downtimes;
                           tbaDayDownTimes3.push(daydowntimes);
                           var tba=TBAdaydata[i].tba;
                           tbaDayTba3.push(tba);


                           } 
                         
                      
              },
              error:function(){
               
          
             },
           });
         dispatch(actions.setVars('tbaDays31',tbaDays3 ));
        dispatch(actions.setVars('tbaDayRunTimes31',tbaDayRunTimes3 ));
          dispatch(actions.setVars('tbaDayDownTimes31',tbaDayDownTimes3 ));
          dispatch(actions.setVars('tbaDayTba31',tbaDayTba3 ));

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
