import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
var $ = require('jquery');


var actions = require('redux/actions');
let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barLoTime1 = data.data.bar_lotime;
let barLoPowerValue1 = data.data.bar_roPower3;
let text0 = data.data.line_date;
let text2 = data.data.text3;
let text3 = data.data.text4;
let barRotime1 = data.data.bar_rotime;
let barLoPowerValue2 = data.data.bar_loPower;
let barLtPowerValue = data.data.bar_ltPower;


let sort0=data.data.sort1;
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let x4=[];
let x5=[];
let x6=[];
let x7=[];
(function () {

    for(var i=0;i<12;i++){
        x4[i]=sort0[i].name;
        x5[i]=sort0[i].time;
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

        let {hideit,wind, buttonAction, actbt = 0,  value0, inputOnChange, onFocus, changecolor, gogogo, back, more, arr,arr2} = this.props;


        return (




            <div className={styles.box}>



                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo3}>{text0[actbt]+"月"+text0[5]+"区域"+text0[5]+"风场各风机健康度"}</div>
                        <span onClick={()=>hideit()}>×</span>
                    </div>
                    <Hly_rs height={320} powerValue={x7} barRotimes={x6} widths={1600}
                            text={text0[actbt] + "月" + text0[5] + "区域" + text0[4] + "风场各风机健康度"}></Hly_rs>


                </div>



                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt === key ? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={() => changecolor(value, key)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_t x={x0} barLoTime={barLoTime1}
                               barLoPowerValue={wind == undefined ? barLoPowerValue1 : wind}
                               text={text0[actbt] + "月集团各区域健康度"}></Hly_t>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>


                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_r height={400} barRotime={barRotime1} barLoPowerValue={barLoPowerValue2}
                               text={text0[actbt] + "月" + text0[5] + "区域各风场健康度"}></Hly_r>
                    </div>
                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox30}>
                            <div></div>
                            <span>{text0[actbt]+"月"+text0[5]+"区域"+text0[5]+"风场各风机健康度"}</span>
                        </div>
                        <div className={styles.rbox3}>

                            <button className={styles.button} onClick={() => gogogo(sort0)}>前10</button>
                            <button className={styles.button} onClick={() => back(sort0)}>后10</button>
                            <button className={styles.button} onClick={() => more()}>更多</button>
                        </div>
                        <div className={styles.rbox4}>
                            <Hly_rs height={330} powerValue={arr==null? x5:arr} barRotimes={arr2==null? x4:arr2}
                                    text={text0[actbt] + "月" + text0[5] + "区域" + text0[4] + "风场各风机健康度"}></Hly_rs>
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
        actbt: state.vars.actbt,
        wind: state.vars.wind,
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
        changecolor: (value, key) => {
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind', value.plan));
        },
        gogogo: (sort0) => {
            (function () {
                sort0.sort(function (a,b) {
                    return b.time - a.time;
                })
                for(var i=0;i<12;i++){
                    x0[i]=sort0[i].name;
                    x1[i]=sort0[i].time;
                }

            })();
            dispatch(actions.setVars('arr', x1))
            dispatch(actions.setVars('arr2', x0))


        },
        back: (sort0) => {
            (function () {
                sort0.sort(function (a,b) {
                    return  a.time - b.time;
                })
                for(var i=0;i<12;i++){
                    x2[i]=sort0[i].name;
                    x3[i]=sort0[i].time;
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
