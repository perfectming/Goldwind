import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windcet from './Windcet.jsx';
import icono from './img/ele.png';
var actions = require('redux/actions');
var $=require('jquery');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let input_url="10.68.100.32";
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let windPT=data.windFJJ;
let Component = React.createClass({
    componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let areaPlan=data.areaPlan;
        let areaPlanDay=data.areaPlanDay;
        let areaPlanDayT=data.areaPlanDayT;
        let text=data.textT;

        let{actbt=0,changpage,wind,windP,gogogo,back,more,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
          return (
           <div className={styles.box}>
             <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{text[actbt]}</p>
                <div onClick={()=>close()}>x
                </div>
                </div>
                <Windcet areaPlan={areaPlan}  areaPlanDay={wind==undefined? areaPlanDay:wind} areaPlanDayT={windP==undefined? areaPlanDayT:windP} width={1750} height={500}></Windcet>

                </div>
                 <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
              <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>

                </ul>
            <div className={styles.paddingtop}>
                <div className={`${styles.bigbox} ${styles.shadow}`}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                             <div>
                                <Windcet areaPlan={areaPlan}  areaPlanDay={wind==undefined? areaPlanDay:wind} areaPlanDayT={windP==undefined? areaPlanDayT:windP} height={750}></Windcet>
                            </div>
                        </div>
                            <div className={styles.tik}>
                                <p className={styles.Ff}>{text[actbt]}</p>
                             </div>
                           
                    </div>
                <div className={styles.imgq}>
                    <img src={icono}/>
                </div>
          
                </div>  
                </div> 
           </div>
           
        
        );
    }
});



const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbtt,
         wind:state.vars.wind,
         windP:state.vars.windP,
           befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {
            var arr1=[];
            var arr2=[];
            var arr3=[];
            $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/ELEC/getWtTimeAreaElec',  
             async:false,
            data:{
             'month':11,
             'wfid':'150828',
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
              
             // 获取x轴的值内蒙达茂天润风电场
             var dataa=data.data;
             for(var i=0;i<dataa.length;i++){
                 var xDay=data.data[i].day;
                 arr1.push(xDay);
                 var yPowerPlan=data.data[i].powerplan;
                 arr2.push(yPowerPlan);
                 var yPowerAct=data.data[i].poweract;
                 arr3.push(yPowerAct);
             }

            
             dispatch(actions.setVars('areaNameN',arr1));
             dispatch(actions.setVars('areaRecordCostN',arr3));
             dispatch(actions.setVars('areaRecordProfitN',arr2));
            dispatch(actions.setVars('actbtt',10));
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
         changpage :(value,key)=>{
            dispatch(actions.setVars('actbtt',key ));
        
            var arr1w=[];
            var arr2w=[];
            var arr3w=[];
            var monthh=key+1;  
          $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/ELEC/getWtTimeAreaElec',  
             async:false,
            data:{
             'year':2016,
             'month':monthh,
             'wfid':'150828',
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
              
             // 获取x轴的值内蒙达茂天润风电场
             var dataa=data.data;
             for(var i=0;i<data.data.length;i++){
                 var xDay=data.data[i].day;
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
          dispatch(actions.setVars('areaNameN',arr1w));
             dispatch(actions.setVars('windP',arr2w));
             dispatch(actions.setVars('wind',arr3w));

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
