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
var $ = require('jquery');

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

let sort0 = data.data.sort1;
let x0 = [];
let x1 = [];
let x2 = [];
let x3 = [];
let x4 = [];
let x5 = [];
let x6=[];
let x7=[];
(function () {

    for (var i = 0; i < 12; i++) {
        x4[i] = sort0[i].name;
        x5[i] = sort0[i].time;
    }
    for(var i=0;i<sort0.length;i++){
        x6[i]=sort0[i].name;
        x7[i]=sort0[i].time;
    }

})();

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {hideit,arr,arr2,gogogo,back,more,wind,winds,buttonAction,actbt=0,changecolor, inputOnChange, onFocus} = this.props;
        return (




            <div className={styles.box}>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo3}>
                            {text0[3]+"月"+text0[3]+"区域各风机发电量"}
                        </div>
                        <span onClick={()=>hideit()}>×</span>
                    </div>
                    <Hly_genp    height={330} widths={1600} barlopowerp={x7}
                                 barlopowers={x7}  barRotime={x6}  text={text0[3]+"月"+text0[3]+"区域各风机发电量"}></Hly_genp>



                </div>


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
                        <Hly_gens height={400}  barlopowerp={barlopowerp2}  barlopowers={barlopowers2}  barRotime={barRotime2} text={text0[3]+"月"+text0[1]+"区域发电量"}></Hly_gens>
                    </div>

                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox30}>
                            <div></div>
                            <span>{text0[actbt]+"月"+text0[5]+"区域"+text0[5]+"风场各风机PBA"}</span>
                        </div>
                        <div className={styles.rbox3}>
                            <button className={styles.button} onClick={() => gogogo(sort0)}>前10</button>
                            <button className={styles.button} onClick={() => back(sort0)}>后10</button>
                            <button className={styles.button} onClick={() => more()}>更多</button>
                        </div>



                        <div className={styles.rbox4}>
                            <Hly_genp    height={330}  barlopowerp={arr == null ? x5 : arr}  barlopowers={arr == null ? x5 : arr}  barRotime={arr2 == null ? x4 : arr2}  text={text0[3]+"月"+text0[3]+"区域各风机发电量"}></Hly_genp>
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
        arr: state.vars.arr,
        arr2: state.vars.arr2,
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

        },
        gogogo: (sort0) => {
            (function () {
                sort0.sort(function (a, b) {
                    return b.time - a.time;
                })
                for (var i = 0; i < 12; i++) {
                    x0[i] = sort0[i].name;
                    x1[i] = sort0[i].time;
                }

            })();
            dispatch(actions.setVars('arr', x1))
            dispatch(actions.setVars('arr2', x0))


        },
        back: (sort0) => {
            (function () {
                sort0.sort(function (a, b) {
                    return a.time - b.time;
                })
                for (var i = 0; i < 12; i++) {
                    x2[i] = sort0[i].name;
                    x3[i] = sort0[i].time;
                }

            })();
            dispatch(actions.setVars('arr', x3))
            dispatch(actions.setVars('arr2', x2))
        },
        more: () => {
            $("#boxhidden").show();
        },
        hideit: () =>{
            $("#boxhidden").hide();
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
