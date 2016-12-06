import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windce from './Windce.jsx';
import icono from './wind_logo.png';
import Month from './Month';
var $=require('jquery');
var actions = require('redux/actions');
let data=require('./Profit-data')
let button=data.button;
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaRecordProfit=data.areaRecordProfit[0];
let text=data.textF;
let colorO='#5B9BD5';
let colorT='#ED7D31';
let pointWidth=30;
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let windPT=data.windareace;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{actbt=0,changpage,wind,windP,gogogo,areaNamee,back,more,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
          return (
           <div className={styles.box}>
              <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{text[actbt]+'月份各风机电量'}</p>
                <div className={styles.xx} onClick={()=>close()}>x</div>
                </div>
        <Windce areaNameX={areaName}  areaRecordCostT={wind==undefined? areaRecordCost:wind} areaRecordProfitO={windP==undefined? areaRecordCost:windP} colorO={colorO} colorT={colorT} pointWidth={pointWidth} width={1750} height={500}></Windce>
             </div>
            <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>
       
                </ul>
               <div className={`${styles.bigbox} ${styles.shadow}`}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <Windce areaNameX={areaNamee==null?areaName:areaNamee}  areaRecordCostT={wind==undefined? areaRecordCost:wind} areaRecordProfitO={windP==undefined? areaRecordCost:windP} colorO={colorO} colorT={colorT} pointWidth={pointWidth} height={700}></Windce>
                            </div>
                        </div>
                         <div className={styles.tik}>
                        <p className={styles.Ff}>{text[actbt]+'月份各风机电量'}</p>
                    </div>
                    </div>          
                <div className={styles.imgq}>
                    <img src={icono}/>
                </div>
                <div className={styles.buttons}>
                      <button onClick={()=>gogogo(windPT)} > 前10</button>
                      <button onClick={()=>back(windPT)}>后10</button>
                      <button  onClick={()=>more()}>更多</button>
                   </div>
                </div>   
           </div>
           
        
        );
    }
});



const mapStateToProps = (state) => {

    return {
        actbt:state.vars.actbt,
         wind:state.vars.wind,
         windP:state.vars.windP,
         areaNamee:state.vars.areaNamee,
           befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(value,key)=>{
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('wind',value.plan));
            dispatch(actions.setVars('windP',value.actrul));
        },
        gogogo:(windPT,key)=>{
            (function(){
                windPT.sort(function(a,b){
                    return b.areaRecordCost - a.areaRecordCost;
                })

                 console.log($('.red'));
                for(var i=0;i<12;i++){
                    x0[i]=windPT[i].name;
                    x1[i]=windPT[i].areaRecordCost;
                }
            })()
              dispatch(actions.setVars('areaNamee', x0));
              dispatch(actions.setVars('windP',x1));
           

        },
        back:(windPT)=>{
            (function(){
                windPT.sort(function(a,b){
                    return a.areaRecordCost - b.areaRecordCost;
                })
                for(var i=0;i<12;i++){
                    x2[i]=windPT[i].name;
                    x3[i]=windPT[i].areaRecordCost;
                }
            })()
              dispatch(actions.setVars('areaNamee', x2));
              dispatch(actions.setVars('windP',x3))

        },
        more:()=>{
             $("#sss").show();
             $('#boxcover').show();
             $.ajax({
              type:'post',
              url:'http://10.9.100.4:8080/soam/user/getPower',
              async:'true',
              datatype:'jsonp',
              success:function(){
                alert(1);
              },
              error:function(e){
                      console.log(e);  
              },
             })
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