import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle3.scss';
import TBAtimechart from './TBAtimechart.jsx';
import TBATimechartt from '../group/TBATime/TBATimechartt.jsx';
import icono2 from '../../../../../img/comp/TBA.png';
import icono1 from '../../../../../img/comp/TBA2.png';
var actions = require('redux/actions');
let data=require('./../group/Profit-data3');
let cjId = require("../../../../urlData").CJwfId;
let Component = React.createClass({
    componentWillMount() {
       let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(cjId,xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {ipUrl,xxdwfNa="川井风电场",xxdwfId,changedata2,TBA,TBAAA,montht,profit,cost,areaPlan,areaPlanDay,areaPlanDayT,w0,winss,befor_pagee='windpage',backtop,befor_pagee2,skinStyle}=this.props;
        
        return (
            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
          
             <div className={styles.paddingtop}>
                 {//返回
                      }
             <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                {// 12个月数据
                     }
               <div className={`${styles.areabox} ${styles.shadow}`}>
 
                    <div className={styles.bgcc}>
                       <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                          <TBAtimechart xxdwfNa={xxdwfNa}montht={montht} profit={profit} cost={cost} TBA={TBA} height={410} xxdwfId={xxdwfId} input_url={ipUrl} pointWidth={30}scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></TBAtimechart>
   
                </div>
                {//  对应月份每天的数据
                     }
                  <div className={`${styles.areabox} ${styles.shadow}`}>
               
                                <TBATimechartt TBAx={areaPlan} TBADownTimes={areaPlanDayT} TBARunTimes={areaPlanDay} TBAtba={TBAAA} height={410} text={w0+xxdwfNa+'每日TBA'} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></TBATimechartt>

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
       
        winss: state.vars.wins1,
    
        montht:state.vars.wTBAMonth1,
        profit:state.vars.wTBARun1,
        cost:state.vars.wTBADown1,
        TBA:state.vars.wTBAT1,
       
        areaPlan:state.vars.wTBADaD1,
        areaPlanDay:state.vars.wTBARunD1,
        areaPlanDayT:state.vars.wTBADownD1,
        TBAAA:state.vars.wTBATD1, 
        
        w0:state.vars.monthTD1,
         xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
        ipUrl:state.vars.ipUrl,
        skinStyle:state.vars.skinStyle,

       

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (cjId,xxdwfId,xxdwfNa,input_url) => {
            let date=new Date;
            let monthT=date.getMonth();
            let year=date.getFullYear();
               if (monthT == 0) {
                   monthT = 12;
                   year=year-1;
               }
            // 12个月的TBA
            let wTBAMonth=[];
            let wTBARun=[];
            let wTBADown=[];
            let wTBAT=[];
            //下面每天的数据TBA
            let wTBADaD=[];
            let wTBARunD=[];
            let wTBADownD=[];
            let wTBATD=[];


           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/TBA/getMonthsTBAByWf',  
             async:false,
            data:{
             'wfid':xxdwfId==undefined? cjId:xxdwfId,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             let wTBATime=data.data;
                 dispatch(actions.setVars('hhdata',data))
                 for (let i in wTBATime){
             let month=wTBATime[i].month+'月';
             wTBAMonth.push(month);
             let downtimes=wTBATime[i].downtimes;
             wTBADown.push(downtimes);

                let runtimes=wTBATime[i].runtimes;
                wTBARun.push(runtimes);

                let tba=wTBATime[i].tba*100;
                wTBAT.push(Number(tba.toFixed(1)));



             }
            
             },
             error:function(){
                console.log("数据获取失败"); 
             },
           });   
           // 给12个月赋初值
           dispatch(actions.setVars('wTBAMonth1',wTBAMonth)) 
           dispatch(actions.setVars('wTBARun1',wTBARun)) 
           dispatch(actions.setVars('wTBADown1',wTBADown)) 
           dispatch(actions.setVars('wTBAT1',wTBAT)) ;
           //默认上个月
           $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/TBA/getDaysTBAByWf',  
             async:false,
            data:{
                'wfid':xxdwfId==undefined? cjId:xxdwfId,
             'month':monthT,
                'year':year,


            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
             let wTBATime=data.data;
             for (let i in wTBATime){
                let day=wTBATime[i].day+'日';
                 wTBADaD.push(day);

                 let downtimes=wTBATime[i].downtimes;
                 wTBADownD.push(downtimes);

                let runtimes=wTBATime[i].runtimes;
                wTBARunD.push(runtimes);

                let tba=wTBATime[i].tba*100;
                wTBATD.push(Number(tba.toFixed(1)));
             }
            
             },
             error:function(){
                console.log("数据获取失败"); 
             },
           });   
           // 给每天赋值
           dispatch(actions.setVars('wTBADaD1',wTBADaD)) 
           dispatch(actions.setVars('wTBARunD1',wTBARunD)) 
           dispatch(actions.setVars('wTBADownD1',wTBADownD)) 
           dispatch(actions.setVars('wTBATD1',wTBATD)) ;
           dispatch(actions.setVars('monthTD1',monthT+'月')) ;
           dispatch(actions.setVars('monthTDD',monthT+'月')) ;
          

        }
        ,

        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        // 返回按钮
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
