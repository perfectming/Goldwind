import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';

import Hly_genone from './Hly_genone.jsx';
import Hly_gentwo from './Hly_gentwo.jsx';

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
        let {befor_pages='area', returnit,hideit,arr,arr2,gogogo,back,more,wind,winds,buttonAction,actbt=0,changecolor, inputOnChange, onFocus} = this.props;
        return (




            <div className={styles.box}>

                <div className={styles.light} id="light"> </div>


                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo3}>{"各风机健康度"}</div>
                        <span onClick={()=>hideit()}>×</span>
                    </div>
                    <Hly_gentwo    widths={1620}  height={500}  barlopowerp={arr==null? x5:arr}  barlopowers={arr==null? x5:arr}  barRotime={arr2==null? x4:arr2}  text={text0[3]+"月"+text0[3]+"区域各风机发电量"}></Hly_gentwo>


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
                        <Hly_genone height={400}  barlopowerp={wind==undefined? barlopowers1:wind} barlopowers={winds==undefined? barlopowerp1:winds}  barRotime={barRotime2} text={text0[3]+"月"+text0[1]+"区域发电量"}></Hly_genone>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow} ${styles.fbox2}`}>
                        <div className={styles.rbox31}>

                        </div>
                        <div className={styles.rbox33}>

                            <button className={styles.button} onClick={() => gogogo(sort0)}>前10</button>
                            <button className={styles.button} onClick={() => back(sort0)}>后10</button>
                            <button className={styles.button} onClick={() => more()}>更多</button>
                        </div>
                        <Hly_gentwo    height={390}  barlopowerp={arr==null? x5:arr}  barlopowers={arr==null? x5:arr}  barRotime={arr2==null? x4:arr2}  text={text0[3]+"月"+text0[3]+"区域各风机发电量"}></Hly_gentwo>
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
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind',value.plan ));
            dispatch(actions.setVars('winds',value.actrul ));
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
