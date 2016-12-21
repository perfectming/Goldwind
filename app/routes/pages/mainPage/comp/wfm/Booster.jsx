
import React from 'react';
import {connect} from 'react-redux';
import styles from './Booster.scss';
var actions = require('redux/actions');
import Login from '../../../../../components/common/Loading.jsx';
let time;
var $ = require('jquery');

let Component = React.createClass({
    componentWillMount() {
        this.props.changedate();
    },
    componentWillUnmount() {
        clearInterval(time)
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{jyname,jydata,changepage,changepage2,boolebooster=false}=this.props;
        if(boolebooster){
            let modens=jyname.Model.ens;
            let moddis=jyname.Model.dis;
            let moddata=jydata.ModelData;
            let arr1=[];
            let arr2=[];
            let arr1agc=[moddata["150801702"].AGCState,moddata["150828702"].AGCState];
            let arr1avc=[moddata["150801703"].AVCState,moddata["150828703"].AVCState];
            let arr2agc=[moddata["150801704"].AGCState,moddata["150812801"].AGCState];
            let arr2avc=["",moddata["150812801"].AVCState];
            (function(){
                for(let i in modens){
                    if ( modens[i].wft=='Wf'){
                        arr1.push(i);
                    }
                    if ( modens[i].wft=='Gf'){
                        arr2.push(i);
                    }
                }
            }());
            return(
                <div className={styles.bodyBox}>
                    {
                        arr1.map((value, key)=> {
                            return (
                                <div className={`${styles.station} ${styles.box_shadow}`} key={key}>
                                    <div className={styles.titlep}><span onClick={()=>changepage(value,key)}>{[modens[value]['name']]}</span></div>
                                    <div className={styles.lastt}>
                                        <div className={styles.lasttt}>装机容量 : {[(moddata[value].Capacity*0.001).toFixed(2)]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>计划功率 : {[(moddata[value].PlanActPower*0.001).toFixed(0)]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>负荷 : {[(moddata[value].Transformer_P*0.001).toFixed(2)]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>AGC/AVC :
                                            <div className={arr1agc[key]=='#669999'?styles.succ:(arr1agc[key]=='#FF0000'?styles.defa:styles.cutD)}></div>
                                            <div className={arr1avc[key]=='#669999'?styles.succ:(arr1avc[key]=='#FF0000'?styles.defa:styles.cutD)}></div>
                                        </div>
                                    </div>
                                    <div className={styles.mainn}>

                                    </div>
                                </div>


                            )
                        })
                    }
                    {
                        arr2.map((value, key)=> {
                            return (
                                <div className={`${styles.station} ${styles.box_shadow}`} key={key}>
                                    <div className={styles.titlep}><span onClick={()=>changepage2(value,key)}>{[modens[value]['name']]}</span></div>
                                    <div className={styles.lastt}>
                                        <div className={styles.lasttt}>装机容量 : {[(moddata[value].Capacity*0.001).toFixed(2)]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>计划功率 : {[(moddata[value].PlanActPower*0.001).toFixed(0)]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>负荷 : {[(moddata[value].Transformer_P*0.001).toFixed(2)]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>AGC/AVC :
                                            <div className={arr2agc[key]=='#669999'?styles.succ:(arr2agc[key]=='#FF0000'?styles.defa:styles.cutD)}></div>
                                            <div className={arr2avc[key]=='#669999'?styles.succ:(arr2avc[key]=='#FF0000'?styles.defa:styles.cutD)}></div>
                                        </div>
                                    </div>
                                    <div className={styles.mainn}>

                                    </div>
                                </div>


                            )
                        })
                    }
                </div>
            )
        }else{
            return(
                  <Login></Login>
             )

        }
    }
});


const mapStateToprops = (state) => {
    return {
        jyname: state.vars.jyname,
        jydata: state.vars.jydata,
        boolebooster: state.vars.boolebooster,
    }
};

const mapDispatchToprops = (dispatch) => {
    return {
        changedate:()=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "RegulationOverview", momo, "Screen", 0);
            function momo(rdata){
                dispatch(actions.setVars('jyname', rdata));
                TY.getRtData("RegulationOverview", 8888800, ppo);
                function ppo(rdata){
                    TY.getRtData("RegulationOverview", 8888800, ppo);
                    function ppo(rdata){
                        dispatch(actions.setVars('jydata', rdata));
                        setTimeout(function () {
                            dispatch(actions.setVars('boolebooster', true));
                        },1000)
                    }
                }
            }
            time=setInterval(function(){
                TY.getRtData("RegulationOverview", 8888800, ppo);
                function ppo(rdata){
                    dispatch(actions.setVars('jydata', rdata));
                }
            },2000)
        },
        init: () => {
        },
        changepage:(value,key)=>{
            dispatch(actions.setVars('Changnav', 0));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('actbt1','' ));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('befor_page','booster' ));
            dispatch(actions.setVars('fc_info', value));
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'fan_matrix'));
            dispatch(actions.setVars('actbtn', 3));
            dispatch(actions.setVars('numpage', 'syzjs'));

        },
        changepage2:(value,key)=>{
            dispatch(actions.setVars('Changnav', 1));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('actbt','' ));
            dispatch(actions.setVars('actbt1',key ));
            dispatch(actions.setVars('befor_page','booster' ));
            dispatch(actions.setVars('fc_info', value));
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'fan_matrix'));
            dispatch(actions.setVars('actbtn', 3));
            dispatch(actions.setVars('numpage', 'syzjs'));

        },
    };
};

export default connect(mapStateToprops, mapDispatchToprops)(Component);
