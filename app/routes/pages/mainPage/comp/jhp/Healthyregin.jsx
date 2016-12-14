import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';

import Hly_rone from './Hly_rone.jsx';
import Hly_rtwo from './Hly_rtwo.jsx';
var $ = require('jquery');
var actions = require('redux/actions');
let ip="10.68.100.32";

let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barLoTime1 = data.data.bar_lotime;
let barLoPowerValue1 = data.data.bar_loPower;
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
        let {ip="10.68.100.32",befor_pages='area', returnit,hideit,arr,arr2,gogogo,back,more,wind,buttonAction, actbt=0,changecolor,inputOnChange, onFocus} = this.props;
        return (




            <div className={styles.box}>
                <div className={styles.light} id="light"> </div>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo1}></div>
                        <div className={styles.logo3}>{"风场各风机健康度"}</div>
                        <span onClick={()=>hideit()}>×</span>
                    </div>
                    <Hly_rtwo height={500} powerValue={x7} barRotimes={x6} widths={1620}
                            text={text0[actbt] + "月" + text0[5] + "区域" + text0[4] + "风场各风机健康度"}></Hly_rtwo>


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
                    <div className={styles.return} onClick={()=>returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_rone  height={400} barRotime={barLoTime1} barLoPowerValue={wind==undefined? barLoPowerValue1:wind} text={text0[actbt]+"月各风场健康度"}></Hly_rone>

                        <div className={styles.logo1}>

                        </div>
                    </div>
                </div>

                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow} ${styles.fbox2}`}>
                        <div className={styles.rbox31}>

                            {/*<span>{text0[actbt]+"月"+text0[5]+"区域"+text0[5]+"风场各风机健康度"}</span>*/}
                        </div>
                        <div className={styles.rbox33}>

                            <button className={styles.button} onClick={() => gogogo(sort0)}>前10</button>
                            <button className={styles.button} onClick={() => back(sort0)}>后10</button>
                            <button className={styles.button} onClick={() => more()}>更多</button>
                        </div>
                        <Hly_rtwo height={390}  powerValue={arr==null? x5:arr} barRotimes={arr2==null? x4:arr2} ></Hly_rtwo>

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
        arr: state.vars.arr,
        arr2: state.vars.arr2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('ip', ip));

            var obj = {
                test: ''
            }
        },
        changecolor:(value,key)=>{
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('windplan',value.plan ));
            dispatch(actions.setVars('windplan1', value.plan));
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
            $("#light").show();
        },
        hideit: () =>{
            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit:(befor_pages)=>{
            dispatch(actions.setVars('showPage',befor_pages));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
