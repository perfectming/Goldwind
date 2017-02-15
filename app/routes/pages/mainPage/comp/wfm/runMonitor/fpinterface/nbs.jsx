import React from 'react';
import {connect} from 'react-redux';
import styles from './nbs.scss';
import Header from '../fpinterface/header';
import Title from '../../super/Title.jsx';
var actions = require('redux/actions');
var $ = require('jquery');

let data = require('./pvdate.js');



// console.log(WNACTemp);
// console.log(fmvalue);
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {fanid,infopmodel,infopdata,skinStyle} = this.props;
        // console.log(1111,infopmodel);
        let x;
        return (
            <div className={skinStyle==1?styles.bodyBoxBlue:skinStyle==2?styles.bodyBoxWhite:styles.bodyBox}>
                <div className={styles.infofL}>
                    <div className={styles.pvleftbox}>
                    <Title title={['测风塔']}></Title>

                    <div className={`${styles.pvoption} ${styles.infofL11111111}`}>

                    </div>
                    <div className={styles.option1box}>
                        {
                            data.pv_name.map((value, key) => {
                                return (
                                    <div className={styles.pvdatabox} key = {key}>
                                        <span>{value}</span>
                                        <span className={styles.numbox}><span>0</span><span>{data.pv_unit[key]}</span></span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    </div>
                    <div className={styles.pvleftbox}>
                        <Title title={['升压站']}></Title>

                        <div className={`${styles.pvoption1} ${styles.infofL11111111}`}>

                        </div>
                        <div className={styles.option1box}>
                            {
                                data.pq_name.map((value, key) => {
                                    return (
                                        <div className={styles.pvdatabox} key = {key}>
                                            <span>{value}</span>
                                            <span className={styles.numbox}><span>0</span><span>{data.pq_unit[key]}</span></span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                <div className={`${styles.pvrightbox} ${styles.infofL}`}>
                    {
                        data.pv_wtname.map((value, key) => {
                            return (
                                <div className={`${styles.itembox} ${styles.itemL}`} key = {key}>
                                    <div className={styles.namebox}>{value}</div>
                                    <div className={styles.itemrightbox}>
                                        <div className={styles.itemrightT}>
                                            <p>Ia(A)<span>0</span><span>A</span></p>
                                        </div>
                                        <div className={styles.itemrightB}>
                                            <p>P(kW)<span>0</span><span>kW</span></p>
                                        </div>
                                        <div className={styles.itemrightB}>
                                            <p>Q(kVar)<span>0</span><span>kVar</span></p>
                                        </div>
                                        <div className={styles.itemrightB}>
                                            <p>日发电量(kWh)<span>0</span><span>kWh</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
});




const mapStateToProps = (state) => {
    return {
        fanid : state.vars.valueid,
        infopmodel : state.vars.infopmodel,
        infopdata : state.vars.infopdata,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
