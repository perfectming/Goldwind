import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import PBAtimechart from './PBAtimechart.jsx';
import PBAtimechartt from './PBAtimechartt.jsx';
import icono from './wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let monthT=data.monthT;
let profit=data.windProfit;
let cost=data.windCost;
let fanCost=data.fanCost;
let fanCostA=data.fanCostA;
let areaPlan=data.areaPlan;
let areaPlanDay=data.areaPlanDay;
let areaPlanDayT=data.areaPlanDayT;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{w0='1月',winsss}=this.props;
        return (
            <div className={styles.box}>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                            <p className={styles.titleee}>每月PBA</p>
                                <PBAtimechart monthT={monthT} profit={profit} cost={cost} fanCost={fanCost}></PBAtimechart>
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
                             <p className={styles.titleee}>{w0+'每日PBA'}</p>
                                <PBAtimechartt areaPlan={areaPlan} areaPlanDay={winsss==null?areaPlanDay:winsss} areaPlanDayT={areaPlanDayT} fanCost={fanCostA}></PBAtimechartt>
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
        winsss: state.vars.wins1,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
