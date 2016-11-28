import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windce from './Windce.jsx';
import icono from './wind_logo.png';
import Month from './Month';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaRecordProfit=data.areaRecordProfit[0];
let text0=data.text[0];
let colorO='#5B9BD5';
let colorT='#ED7D31';
let pointWidth=30;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let{actbt=0,changpage,wind,windP}=this.props;
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
                                <Windce areaNameX={areaName}  areaRecordCostT={wind==undefined? areaRecordCost:wind} areaRecordProfitO={windP==undefined? areaRecordProfit:windP} colorO={colorO} colorT={colorT} pointWidth={pointWidth}></Windce>
                            </div>
                        </div>
                         <div className={styles.tik}>
                        <p>{text0}</p>
                    </div>
                    </div>          
                <div className={styles.imgq}>
                    <img src={icono}/>
                </div>
                <div className={styles.buttons}>
                    {
                        button.map((value,key)=>{
                            return(<button  key={key}>{value}</button>)
                        })
                    }
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);