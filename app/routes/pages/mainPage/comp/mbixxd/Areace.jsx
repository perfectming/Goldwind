import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windce from './Windce.jsx';
import icono from './wind_logo.png';
import Month from './Month';
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
let windPT=data.windFJJ;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{actbt=0,changpage,wind,windP,gogogo,areaNamee,back}=this.props;
          return (
           <div className={styles.box}>
            <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
                </ul>
               <div className={`${styles.bigbox} ${styles.shadow}`}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <Windce areaNameX={areaName}  areaRecordCostT={wind==undefined? areaRecordCost:wind} areaRecordProfitO={windP==undefined? areaRecordCost:windP} colorO={colorO} colorT={colorT} pointWidth={pointWidth}></Windce>
                            </div>
                        </div>
                         <div className={styles.tik}>
                        <p>{text[actbt]+'月份各风机电量'}</p>
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
         areaNamee:state.vars.areaNamee
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
        gogogo:(windPT)=>{
            (function(){
                windPT.sort(function(a,b){
                    return b.areaRecordCost - a.areaRecordCost;
                })
                for(var i=0;i<12;i++){
                    x0[i]=windPT[i].name;
                    x1[i]=windPT[i].areaRecordCost;
                }
            })()
              dispatch(actions.setVars('areaNamee', x0));
              dispatch(actions.setVars('windP',x1))

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);