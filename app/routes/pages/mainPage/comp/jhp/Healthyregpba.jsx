import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_a from './Hly_a.jsx';
import Hly_pba from './Hly_pba.jsx';
import Hly_pbas from './Hly_pbas.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
import Hly_d from './Hly_d.jsx';
var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let button=data.data.button;
let barLoPowerValue1 = data.data.bar_roPowerses;
let barLoPowerValues1 = data.data.bar_roPower;
let barLdpowerValue1 = data.data.line_lpower;
let barLotime1= data.data.bar_lotime;
let text0=data.data.line_date;
let barRotime2 = data.data.bar_rotime;
let barLoPowerValue2 = data.data.bar_roPowerses;
let barLoPowerValues2 = data.data.bar_roPower;
let barLdpowerValue2 = data.data.line_lpower;
let barRotimes3 = data.data.bar_rotimes;
let barLoPowerValue3 = data.data.bar_roPowerses;
let barLoPowerValues3 = data.data.bar_roPower;
let barLdpowerValue3 = data.data.line_lpower;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {wind,winds,windss,buttonAction,actbt=0,changecolor, inputOnChange, onFocus} = this.props;
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
                        <Hly_pba  height={400} text={text0[actbt]+"月份各风场PBA"} barRotime={barRotime2}  barLdpowerValue={winds==undefined? barLoPowerValue1:winds} barLoPowerValues={wind==undefined? barLoPowerValue2:wind} barLoPowerValue={windss==undefined? barLoPowerValue2:windss} ></Hly_pba>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow} ${styles.fbox2}`}>
                        <div className={styles.rbox31}>
                            <div></div>
                            <span>{text0[actbt]+"月"+text0[5]+"区域各风机PBA"}</span>
                        </div>
                        <Hly_pbas  height={390} text={text0[3]+'区域'+text0[4]+'风场各风机PBA'} barRotimes={barRotimes3} barLoPowerValue={barLoPowerValue1} barLoPowerValues={barLoPowerValue2} barLdpowerValue={barLoPowerValue2}></Hly_pbas>
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
        winds:state.vars.winds,
        windss:state.vars.windss,
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
            dispatch(actions.setVars('winds',value.actrul ));
            dispatch(actions.setVars('windss',value.actruls ));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
