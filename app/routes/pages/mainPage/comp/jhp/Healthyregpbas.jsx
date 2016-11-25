import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_tsa from './Hly_tsa.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_ds from './Hly_ds.jsx';
var actions = require('redux/actions');


let data = require('./Healthy-data');
let month=data.data.line_month;
let barLoTime1 = data.data.line_month;
let barLoPowerValue1 = data.data.bar_loPower;
let barRoPowerValue1 = data.data.bar_roPowers;
let barRoPowerValues1 = data.data.bar_roPowerses;
let barLdpowerValue2 = data.data.line_date;
let barLpdpowerValue2 = data.data.line_pdate;
let barlinepdats2 = data.data.line_pdates;
let barlinepdat2 = data.data.line_pdatess;
let text222=data.data.line_date;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {buttonAction, inputOnChange, onFocus} = this.props;
        return (




            <div className = {styles.box}>







                <div className={styles.tbox}>
                    <div className={styles.box_shadow}>
                        <Hly_tsa text={"集团每月PBA"} barLoTime1={barLoTime1} barLoPowerValue={barLoPowerValue1} barRoPowerValue={barRoPowerValue1} barRoPowerValues={barRoPowerValues1}></Hly_tsa>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox} `}>
                    <div className={` ${styles.logofa} ${styles.box_shadow}`}>
                        <Hly_ds text={"集团"+text222[4]+"月每日PBA"} barLdpowerValue={barLdpowerValue2} barLpdpowerValue={barLpdpowerValue2} barlinepdats={barlinepdats2} barlinepdat={barlinepdat2}></Hly_ds>
                        <div className={styles.logomini}>

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
                test:''
            }
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
