import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle4.scss';
import Profitimechart from './Profitimechart.jsx';
import Profitimechartt from './Profitimechartt.jsx';
import icono1 from '../../../../../img/comp/MON2.png';
import icono2 from '../../../../../img/comp/MON.png';
var actions = require('redux/actions');
let Component = React.createClass({
    componentWillMount() {
        let{ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {ipUrl,w0,GERa,GEAm,GENa,GEIn,GeR,GeM,GeE,GeC,actbt,changpage,backtop,befor_pagee='group',befor_pagee2,GE,skinStyle}=this.props;
        return (
             <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
            <div className={styles.paddingtop}>
             <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                <div className={`${styles.areabox} ${styles.shadow}`}>
                       <div className={styles.bgc}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                       </div>
                            <div>
                                <Profitimechart GeR={GeR} GeE={GeE} GeC={GeC} GeM={GeM} text={'集团每月收益'}height={420} input_url={ipUrl} GE={GE}scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Profitimechart>
                            </div>
                </div>
                 <div className={`${styles.areabox} ${styles.shadow}`}>
                   
                       <div className={styles.bgc}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                       </div>
                            <div>
                                <Profitimechartt GEIn={GEIn} GERa={GERa} GEAm={GEAm} GENa={GENa}height={420} text={w0+'每日收益'} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"} ></Profitimechartt>
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
        GE:state.vars.GE,
        ipUrl:state.vars.ipUrl,
        //皮膚
        skinStyle:state.vars.skinStyle,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      ajax:(input_url)=>{
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
          if(month==0){
              month=12;
              year=year-1;
          }
          $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/yield/getAllRate',  
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
                         arr4.push(Number(rate.toFixed(2)));
                     }
            dispatch(actions.setVars('GeE1',arr1));
            dispatch(actions.setVars('GeC1',arr2));
            dispatch(actions.setVars('GeM1',arr3));
            dispatch(actions.setVars('GeR1',arr4));
            dispatch(actions.setVars('actbtm',10 ));
            dispatch(actions.setVars('w0GE',month+'月' ))
            dispatch(actions.setVars('GE',GE))
            
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
             url:'http://'+input_url+'/wbi/yield/getMaxYieBayDay',  
             async:false,
             data:{
             'year':year,
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
      GERa.push(Number(rate.toFixed(2)));

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
