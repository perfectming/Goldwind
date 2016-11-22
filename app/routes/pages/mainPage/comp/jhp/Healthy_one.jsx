import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';

var actions = require('redux/actions');
let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barLoTime1 = data.data.bar_lotime;
let barLoPowerValue1 = data.data.bar_loPower;
let text0 = data.data.text;
let text2 = data.data.text3;
let text3 = data.data.text4;
let barRotime1 = data.data.bar_rotime;
let barLoPowerValue2 = data.data.bar_loPower;
let barLtPowerValue = data.data.bar_ltPower;
let barLtPowerValue1 = data.data.bar_ltPower;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {buttonAction, inputOnChange, onFocus} = this.props;
        return (




            <div className={styles.box}>


                <div className={styles.onmonth}>
                    {
                        month.map((value, key) => {
                            return (
                                <div className={styles.inmonth} key={key}>
                                    {value}
                                </div>
                            )
                        })
                    }
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_t barLoTime={barLoTime1} barLoPowerValue={barLoPowerValue1} text={text0}></Hly_t>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>
                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_r barRotime={barRotime1} barLoPowerValue={barLoPowerValue2} text={text2}></Hly_r>
                    </div>
                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox3}>
                            {
                                button.map((value, key) => {
                                    return (
                                        <button key={key} className={styles.button}>
                                            {value}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.rbox4}>
                            <Hly_rs powerValue={barLoPowerValue2} barRotimes={barLtPowerValue} text={text3}></Hly_rs>
                            <div className={styles.logo}>

                            </div>
                        </div>
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
                test: ''
            }
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
