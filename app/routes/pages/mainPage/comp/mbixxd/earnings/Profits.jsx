import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from './wind_logo.png';
import Fanchart from './fanchart.jsx';
import Month from '../Month.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaRecordProfit=data.areaRecordProfit;
let TBA=data.TBA;
let text=data.text;
let arr1=data.areaRecordCost;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{actbt=0,changpage,wind,windP,windPT}=this.props;
          return (
           <div className={styles.box}>
               <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
                </ul>
               <div className={styles.covers} >
                   <div className={styles.bgc}> <img src={icono}/></div>
                   <div className={`${styles.areabox} ${styles.shadow}`}>
                           <AreaTable text={text[actbt]} areaName={areaName} areaRecordCost={wind==undefined? areaRecordCost:wind} areaRecordProfit={windP==undefined? areaRecordProfit:windP} TBA={windPT==undefined? TBA:windPT}></AreaTable>
                    </div>
                </div>

               <div className={styles.covers}>
                   <div className={styles.bgc}> <img src={icono}/></div>
                   <div className={`${styles.windbox} ${styles.shadow}`}>
                       <div>
                           <WindfieldTable></WindfieldTable>
                       </div>
                   </div>
               </div>


               <div className={`${styles.bigbox} ${styles.shadow}`}>
                   <div className={styles.coverbox}>
                       <div className={styles.windcebox}>
                           <div>
                               <Fanchart></Fanchart>
                           </div>
                       </div>
                       <div className={styles.tik}>
                           <p>{text[actbt]}</p>
                       </div>
                   </div>
                   <div className={styles.imgq}>
                       <img src={icono}/>
                   </div>
                   <div className={styles.buttons}>
                      <button onClick={()=>gogogo(x1,x2)} > 前十</button>
                      <button>后10</button>
                      <button>更多</button>
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
         windPT:state.vars.windPT,

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
            dispatch(actions.setVars('windPT',value.actruls));

        },
        gogogo :(value,key)=>{'areaRecordCost',arr1},

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Component);