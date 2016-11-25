import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_gen from './Hly_gen.jsx';
import Hly_gens from './Hly_gens.jsx';
import Hly_genp from './Hly_genp.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
import Hly_d from './Hly_d.jsx';
var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barlotimes1 = data.data.bar_lotime;
let barlopowers1 = data.data.bar_loPowers;
let barlopowerp1 = data.data.bar_loPowerp;
let text0=data.data.line_date;
let barRotime2 = data.data.bar_rotime;
let barlopowers2 = data.data.bar_loPowers;
let barlopowerp2 = data.data.bar_loPowerp;
let barRotime3 = data.data.bar_rotimes;
let barlopowers3 = data.data.bar_loPowers;
let barlopowerp3 = data.data.bar_loPowerp;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {wind,winds,buttonAction,actbt=0,changecolor, inputOnChange, onFocus} = this.props;
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
                        <Hly_gen text={text0[actbt]+"月集团各区域发电量"}  barlopowerp={winds==undefined? barlopowerp1:winds}  barlopowers={wind==undefined? barlopowers1:wind} barlotimes={barlotimes1}></Hly_gen>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_gens height={500}  barlopowerp={barlopowerp2}  barlopowers={barlopowers2}  barRotime={barRotime2} text={text0[3]+"月"+text0[1]+"区域发电量"}></Hly_gens>
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
                            <Hly_genp    height={430}  barlopowerp={barlopowerp3}  barlopowers={barlopowers3}  barRotime={barRotime3}  text={text0[3]+"月"+text0[3]+"区域各风机发电量"}></Hly_genp>
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

        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
