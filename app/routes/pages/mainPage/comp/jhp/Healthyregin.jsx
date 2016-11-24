import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';

import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
;
var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barLoTime1 = data.data.bar_lotime;
let barLoPowerValue1 = data.data.bar_loPower;
let text0 = data.data.line_date;
let text2 = data.data.text3;
let text3 = data.data.text4;
let barRotime1 = data.data.bar_rotime;
let barLoPowerValue2 = data.data.bar_loPower;
let barLtPowerValue = data.data.bar_ltPower;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {wind,buttonAction, actbt=0,changecolor,inputOnChange, onFocus} = this.props;
        return (




            <div className={styles.box}>


                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key} onClick={()=>changecolor(value,key)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_r  height={400} barRotime={barLoTime1} barLoPowerValue={wind==undefined? barLoPowerValue1:wind} text={text0[actbt]+"月各风场健康度"}></Hly_r>

                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow}`}>
                        <Hly_rs height={400}  powerValue={barLoPowerValue2} barRotimes={barLtPowerValue} text={text0[3]+"月"+text0[5]+"风场各风机健康度"}></Hly_rs>

                        <div className={styles.logomini}>

                        </div>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test: ''
            }
        },
        changecolor:(value,key)=>{
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind',value.plan ));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
