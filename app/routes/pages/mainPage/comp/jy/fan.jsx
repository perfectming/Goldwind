import React from 'react';
import {connect} from 'react-redux';
import styles from './fan.scss';
import Header from '../linjinjin/header';
import Title from '../super/Title.jsx';
var actions = require('redux/actions');
var $ = require('jquery');
let modelvalue = require('../../../../../../config/WTDetailData.js');
let addtest = require('../../../../../../config/MatrixData');
let adisdfa= require('./data');
let adsI=adisdfa.fan;
let fmvalue = modelvalue.ModelData[652113028];
// console.log(value.Wtid);
// let qwer = "WTGS.PPV.Ra.F32.A";
// console.log(fmvalue["WTUR.WSpd.Ra.F32"]);
let WTURTemp = Math.ceil(fmvalue["WTUR.Temp.Ra.F32"]);
let WNACTemp = Math.ceil(fmvalue["WNAC.Temp.Ra.F32"]);
let WGENTemp = Math.ceil(fmvalue["WGEN.Temp.Ra.F32.1"]);

// console.log(WGENTemp);
let WTGShz = Math.ceil(fmvalue["WTGS.HZ.Ra.F32"]);


let WTSpd = Number(fmvalue["WTUR.WSpd.Ra.F32"]);
let WTPwr = Math.ceil(fmvalue["WTUR.PwrAt.Ra.F32"]);
let WROTSpd = Math.ceil(fmvalue["WROT.Spd.Ra.F32"]);
let WGENSpd = Math.ceil(fmvalue["WGEN.Spd.Ra.F32"]);

// console.log(WNACTemp);
// console.log(fmvalue);
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {changetab,act1=0,value=addtest.ModelData[8888801].WFDevsStatus[650107][0],fanid} = this.props;
        return (
            <div className={styles.bodyBox}>
                <div className={styles.fanidbox}>
                    {
                        adsI.title.map((value,key)=>{
                            return(
                                <span className={ act1==key? styles.active : styles.actspan } key={key} onClick={()=>changetab(key)}>{value}</span>
                            )
                        })

                    }
                </div>
                <div className={`${styles.infoBox} ${styles.infofL}`}>
                    <div className={`${styles.infoBox6} ${styles.infofL}`}>
                        <Title></Title>
                        <div className={styles.statusquery}>
                            {
                                adsI.content.map((value, key)=>{
                                    return (
                                        <div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
                                            <span>{key}</span>
                                            <span>{value}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={`${styles.fanrightbox} ${styles.infofL}`}>
                    <Title title={['状态统计']}></Title>
                    <div className={`${styles.fanaction} ${styles.infofL11111111}`}>
                    </div>
                    <div className={styles.action1box}>
                        {
                            adsI.header.map((value,key)=>{
                                if(adsI.unit[key]=='C'){
                                    return(
                                        <div className={styles.fandatabox} key={key}>
                                            <span>{value}</span>
                                            <span className={styles.numbox}><span>0</span><span>&#8451;</span></span>
                                        </div>
                                    )
                                }else{
                                return(
                                    <div className={styles.fandatabox} key={key}>
                                        <span>{value}</span>
                                        <span className={styles.numbox}><span>0</span><span>{adsI.unit[key]}</span></span>
                                    </div>
                                )}
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
});




const mapStateToProps = (state) => {
    return {
        act1 : state.vars.val,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },
        changetab:(act)=>{
            dispatch(actions.setVars('val', act));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
