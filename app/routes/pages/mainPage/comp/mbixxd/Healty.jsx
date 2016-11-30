import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Healtychart from './Healtychart.jsx';
import icono from './wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let x0=[];
let x1=[];
let x2=[];
let healthy=data.healthy;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let areaRecordProfit=data.areaRecordProfit;
        let machineE=data.machineE;
        let text =data.textHealty;
      let{actbt=0,changpage,wind,gogogo,windP,actbtt}=this.props;
        return (

            <div className={styles.box}>
                 <ul className={styles.monthbox}>
                    {
                        data.healthy.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
                </ul>
                <div className={`${styles.bigbox} ${styles.shadow}`}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                               <Healtychart machineE={windP==null?machineE:windP} areaRecordProfit={wind==undefined? areaRecordProfit[0]:wind}></Healtychart>
                        </div>
                         <div className={styles.tik}>
                        <p>{text[actbt]}</p>
                    </div>
                    </div>
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>
                    <div className={styles.buttons}>
                      <button   onClick={()=>gogogo(healthy)} > 前10</button>
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
         actbt:state.vars.actbt


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

            (function(){
                x0=[];
                for(var i=0;i<12;i++){
                    x0[i]=value.plan[i].plan/1;
                }
            })();
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('wind',x0));
        },
         gogogo:(healthy)=>{
              (function(){
                var liL=document.getElementsByClassName('red')[0];
                console.log(liL);
                healthy[key].plan.sort(function(a,b){
                      return b.plan - a.plan;
                  })
                   for(var i=0;i<12;i++){
                       x1[i]=healthy[key].plan[i].name;
                       x2[i]=healthy[key].plan[i].plan;

                   }
              })()
                  dispatch(actions.setVars('wind', x2));
                  dispatch(actions.setVars('windP',x1));
          }

    }
     
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);