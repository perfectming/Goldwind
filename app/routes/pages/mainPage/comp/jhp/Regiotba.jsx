import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Reg_tba from './Reg_tba.jsx';
import Reg_tbas from './Reg_tbas.jsx';
import Hly_regpbas from './Hly_regpbas.jsx';
import Hly_a from './Hly_a.jsx';

var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let barLotime1 = data.data.bar_lotime;
let barLoPowerValue1 = data.data.bar_roPowerses;
let barLoPowerValues1 = data.data.bar_roPower;
let barLdpowerValue1 = data.data.line_lpower;
let text0=data.data.line_date;
let barRotimes2 = data.data.bar_rotimes;
let barLoPowerValue2 = data.data.bar_roPowerses;
let barLoPowerValues2 = data.data.bar_roPower;
let barLdpowerValue2 = data.data.line_lpower;

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
                        <Reg_tba  barLdpowerValue={winds==undefined? barLoPowerValue1:winds} barLoPowerValues={wind==undefined? barLoPowerValues1:wind}  barLoPowerValue={windss==undefined? barLdpowerValue1:windss} barLotime={barLotime1} text={text0[actbt]+"月各区域TBA"}></Reg_tba>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow}`}>
                        <Reg_tbas  barLdpowerValue={barLdpowerValue2} barLoPowerValues={barLoPowerValues1} barLoPowerValue={barLoPowerValue2} barRotimes={barRotimes2} text={text0[7]+"月份"+text0[7]+"风场各风机TBA"}></Reg_tbas>
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
