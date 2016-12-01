import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from '../wind_logo.png';
import Fanchart from './fanchart.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let areaName=data.areaName;
let areaRecordCosts=data.areaRecordCosts;
let areaRecordProfit=data.areaRecordProfit;
let text0=data.text[0];
let machine=data.machine;
let machineee=data.machineee;
let fanProfit=data.fanProfit;
let fanCost=data.fanCost;
let fanCost1=data.fanCost1;
let fanCost2=data.fanCost2;
let fanCost3=data.fanCost3;
let text1=data.text[1];
let windFiled=data.windFiled;
let areaRecordProfitt=data.areaRecordProfitt;
let areaRecordCostss=data.areaRecordCostss;
let areaRecordCostsS1=data.areaRecordCostsS1;
let areaRecordCostsS2=data.areaRecordCostsS2;
let areaRecordCostsS3=data.areaRecordCostsS3;
let areaRecordCostsS4=data.areaRecordCostsS4;
let areaNamee=data.areaNamee;
let text2=data.text[2];
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
      let{more,close,actbt}=this.props;
          return (
           <div className={styles.box}>
           <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>11月份各风机PBA</p>
                <div onClick={()=>close()}>x</div>
                </div>
                <Fanchart machine={machine} fanProfit={fanProfit} fanCost={fanCost} fanCost1={fanCost1}fanCost2={fanCost2}fanCost3={fanCost3} height={500} width={1750}></Fanchart>
                 </div>
                 <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
                </ul>
               <div className={styles.covers}>
                   <div className={styles.bgc}> <img src={icono}/></div>
                   <div className={`${styles.areabox} ${styles.shadow}`}>
                       <div>
                           <AreaTable areaRecordCosts={areaRecordCosts} areaName={areaName} areaRecordProfit={areaRecordProfit} text0={text0} text1={text1}></AreaTable>
                           <p className={styles.titww}>11月份集团各区域TBA</p>>
                       </div>
                   </div>
               </div>
              <div className={`${styles.bigbox} ${styles.shadow}`}>
                   <div className={styles.coverbox}>
                       <div className={styles.windcebox}>
                           <div>
                               <WindfieldTable machine={machineee} fanProfit={fanProfit} fanCost={fanCost} fanCost1={fanCost1}fanCost2={fanCost2}fanCost3={fanCost3} ></WindfieldTable>
                           </div>
                       </div>
                       <div className={styles.tik}>
                           <p>{text2}</p>
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
               <div className={`${styles.bigbox} ${styles.shadow}`}>
                   <div className={styles.coverbox}>
                       <div className={styles.windcebox}>
                           <div>
                               <Fanchart machine={machine} fanProfit={fanProfit} fanCost={fanCost} fanCost1={fanCost1}fanCost2={fanCost2}fanCost3={fanCost3} height={340} ></Fanchart>
                           </div>
                       </div>
                       <div className={styles.tik}>
                           <p>{text1}</p>
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
         more:()=>{
             $("#sss").show();
             $('#boxcover').show();
        },
        close:()=>{
            $("#sss").hide();
              $('#boxcover').hide();
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
