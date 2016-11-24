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
        let {wind,winds,windss,buttonAction,actbt=0,changecolor, inputOnChange, onFocus,changepageT} = this.props;
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
                        <Hly_a text={text0[actbt]+"月份集团各区域PBA"} barLotime={barLotime1}  barLdpowerValue={winds==undefined? barLoPowerValue1:winds} barLoPowerValues={wind==undefined? barLoPowerValues1:wind} barLoPowerValue={windss==undefined? barLdpowerValue1:windss} ></Hly_a>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_pba height={500} text={text0[5]+"月份"+text0[4]+"区域各风场PBA"} barRotime={barRotime2} barLoPowerValue={barLoPowerValue2} barLoPowerValues={barLoPowerValues2} barLdpowerValue={barLdpowerValue2}></Hly_pba>
                    </div>

                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox3}>
                            {
                                button.map((value,key)=>{
                                    return(

                                        <button key={key} className={styles.button}>
                                            {value}
                                        </button>
                                    )
                                })
                            }
                        </div>



                        <div className={styles.rbox4}>
                            <Hly_pbas  height={430} text={text0[3]+'区域'+text0[4]+'风场各风机PBA'} barRotimes={barRotimes3} barLoPowerValue={barLoPowerValue3} barLoPowerValues={barLoPowerValues3} barLdpowerValue={barLdpowerValue3}></Hly_pbas>
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
