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
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        return (
            <div className={styles.box}>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                            <p className={styles.titleee}>健康度</p>
                               <Healtytimechart areaRecordProfitT={areaRecordProfitT} monthT={monthT} text={text}></Healtytimechart>
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
                              <p className={styles.titleee}>11月每日健康度</p>
                                <Healtytimecharttt></Healtytimecharttt>
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
    return {}
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

export default connect(mapStateToProps, mapDispatchToProps)(Component)