
import React from 'react';
import {connect} from 'react-redux';
import styles from './Booster.scss';
var actions = require('redux/actions');
var {browserHistory} = require('react-router');
import Login from '../../../../../../components/common/Loading.jsx';
let time;
let onceTime;
var $ = require('jquery');

let Component = React.createClass({
    componentWillMount() {
        this.props.changedate();
    },
    componentWillUnmount() {
        clearInterval(time);
        clearTimeout(onceTime);
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
            let arr1=[];//电站编号默认排行//
            let dcname=[];//电站名字//
            let zjrl=[];//场站装机容量//
            let czdyagc=[];//场站对应AGC编号//
            let czdyavc=[];//场站对应AVC编号//
            let jhgl=[];//升压站计划功率//
            (function(){
                for(let i in modens){
                    if ( modens[i].wft=='Wf'|| modens[i].wft=='Gf'){
                        arr1.push(i);
                        dcname.push(modens[i].name);
                    }
                }
                for(let i=0;i<arr1.length;i++){
                    zjrl.push((Number(moddata[arr1[i]].Capacity)*0.001).toFixed(2))
                }
            }());
            return(
                <div className={styles.bodyBox}>
                    {
                        arr1.map((value, key)=> {
                            return (
                                <div className={`${styles.station} ${styles.box_shadow}`} key={key}>
                                    <div className={styles.titlep}><span onClick={()=>changepage(value,key)}>{dcname[key]}</span></div>
                                    <div className={styles.lastt}>
                                        <div className={styles.lasttt}>装机容量 : {zjrl[key]} <span className={styles.lastttt}>MW</span></div>
                                        {/*<div className={styles.lasttt}>计划功率 : {[(moddata[value].PlanActPower*0.001).toFixed(0)]} <span className={styles.lastttt}>MW</span></div>*/}
                                        {/*<div className={styles.lasttt}>负荷 : {[(moddata[value].Transformer_P*0.001).toFixed(2)]} <span className={styles.lastttt}>MW</span></div>*/}
                                        {/*<div className={styles.lasttt}>AGC/AVC :*/}
                                            {/*<div className={arr1agc[key]=='#669999'?styles.succ:(arr1agc[key]=='#FF0000'?styles.defa:styles.cutD)}></div>*/}
                                            {/*<div className={arr1avc[key]=='#669999'?styles.succ:(arr1avc[key]=='#FF0000'?styles.defa:styles.cutD)}></div>*/}
                                        {/*</div>*/}
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
            function momo(jyname){
                if( jyname.Model.dis == undefined || jyname.Model.ens == undefined ){
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "RegulationOverview", momo, "Screen", 0);
                }else {
                    dispatch(actions.setVars('jyname', jyname));
                    TY.getRtData("RegulationOverview", 8888800, ppo);
                    function ppo(jydata){
                        TY.getRtData("RegulationOverview", 8888800, ppo);
                        function ppo(jydata){
                            if (jydata.ModelData==undefined){
                                TY.getRtData("MonitorBoard", 8888800, ppo);
                            }else{
                                dispatch(actions.setVars('jydata', jydata));
                                setTimeout(function () {
                                    dispatch(actions.setVars('boolebooster', true));
                                    clearTimeout(onceTime);
                                },100)
                            }
                        }
                    }
                }
            }
            onceTime=setTimeout(function(){
                alert('数据获取失败！请重新登入');
                browserHistory.push('/app/all/page/login');
                dispatch(actions.setVars('userInfo', false));
            },7000);
            time=setInterval(function(){
                TY.getRtData("RegulationOverview", 8888800, ppo);
                function ppo(jydata){
                    dispatch(actions.setVars('jydata', jydata));
                    dispatch(actions.setVars('boolebooster', true));
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
