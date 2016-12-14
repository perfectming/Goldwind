import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import TBAtimechart from './TBAtimechart.jsx';
import TBAtimechartt from './TBAtimechartt.jsx';
import icono from './wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaPlan=data.areaPlan;
let montht=data.monthT;
let profit=data.windProfit;
let cost=data.windCost;
let areaPlanDay=data.areaPlanDay;
let areaPlanDayT=data.areaPlanDayT;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {w0='1月',winss,befor_pagee='windpage',backtop,befor_pagee2}=this.props;
        return (
            <div className={`${styles.box} ${styles.shadow}`}>
             <div className={styles.padding}>
             <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div></div>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windceebox}>
                            <div>
                            <p className={styles.titlee}>风场TBA</p>>
                                <TBAtimechart montht={montht} profit={profit} cost={cost}></TBAtimechart>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgqq}>
                        <img  className={styles.img}src={icono}/>
                    </div>
                    
                </div>
                 <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                             <p className={styles.titlee}>{w0+'每日TBA'}</p>>
                                <TBAtimechartt areaPlan={areaPlan} areaPlanDay={winss==null?areaPlanDay:winss} areaPlanDayT={areaPlanDayT}></TBAtimechartt>
                            </div>
                        </div>
                    </div>
                     <div className={styles.imgqq}>
                        <img  className={styles.img}src={icono}/>
                    </div>
                </div>
            </div>


        );
    }
});



const mapStateToProps = (state) => {
    return {
        w0 : state.vars.w1,
        winss: state.vars.wins1,
        
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
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
