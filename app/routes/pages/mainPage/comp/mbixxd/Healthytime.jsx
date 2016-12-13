
import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import Healtytimechart from './Healtytimechart.jsx';
import Healtytimecharttt from './Healtytimecharttt.jsx';
import icono from './wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let areaRecordProfitT=data.areaRecordProfitT;
let monthT=data.monthT;
let text=data.text[2];
 let areaName=data.areaName;
 let areaRecordCost=data.areaRecordCost;
 let areaRecordProfit=data.areaRecordProfit;
 let machine=data.machine;
 let areaPlanDay=data.areaPlanDay
 let areaPlan=data.areaPlan
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {w0='1月',wins,befor_pagee='windpage',backtop,befor_pagee2}=this.props;
        return (
            <div className={styles.box}>
            <div className={styles.padding}>
             <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                            <p className={styles.titleee}>健康度</p>
                               <Healtytimechart  monthT={monthT} text={text}></Healtytimechart>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>
                </div>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                              <p className={styles.titleee}>{w0+'每日健康度'}</p>
                                <Healtytimecharttt areaName={areaName} areaRecordCost={areaRecordCost} areaPlan={areaPlan} areaPlanDay={wins==null?areaPlanDay:wins}></Healtytimecharttt>
                            </div>
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
         w0 : state.vars.w1,
          wins: state.vars.wins1,
        

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
        changedata1 :(w0,win,b)=>{
            dispatch(actions.setVars('w1',w0 ));
            console.log(wins[0]);
            // dispatch(actions.setVars('wins1',wins[b-1]));
        },
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component)