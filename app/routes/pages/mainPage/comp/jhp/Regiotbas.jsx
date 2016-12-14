import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Reg_tbat from './Reg_tbat.jsx';
import Reg_tbats from './Reg_tbats.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_ds from './Hly_ds.jsx';
var actions = require('redux/actions');
let ip="10.68.100.32";

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
let text0=data.data.line_date;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {befor_pages = 'area', returnit} = this.props;
        return (




            <div className = {styles.box}>
                <div className={styles.return2} onClick={() => returnit(befor_pages)}>返回</div>
                <div className={styles.tbox2}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Reg_tbat   barRoPowerValues={barRoPowerValues1}  barRoPowerValue={barRoPowerValue1} barLoPowerValue={barLoPowerValue1}  barLoTime={barLoTime1} text={"每月TBA"}></Reg_tbat>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox} `}>
                    <div className={` ${styles.logofa} ${styles.box_shadow}`}>
                        <Reg_tbats height={450} barlinepdat={barlinepdat2} barlinepdats={barlinepdats2}  barLpdpowerValue={barlinepdats2} barLdpowerValue={barLoPowerValue1} text={text0[5]+"月每日TBA"}></Reg_tbats>
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
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test:''
            }
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
