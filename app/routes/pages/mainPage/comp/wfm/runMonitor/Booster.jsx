
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
        let{jyname,jydata,changepage,changepage2,boolebooster=false,skinStyle}=this.props;
        if(boolebooster){
            let modens=jyname.Model.ens;
            let moddis=jyname.Model.dis;
            let moddata=jydata.ModelData;
            let arr1=[];//电站编号默认排行//
            let arr2=[];//电站编号默认排行//
            let arr3={};//电站编号默认排行//
            let arr4={};//电站编号默认排行//
            let dcname=[];//电站名字//
            let zjrl=[];//场站装机容量//
            let czdagc=[];//AGC对应的场站编号//
            let czdavc=[];//AVC对应的场站编号//
            let jhgl=[];//升压站计划功率//
            (function(){
                for(let i in modens){
                    if ( modens[i].wft=='Wf'|| modens[i].wft=='Gf'){
                        arr1.push(i);
                        arr2.push(i);
                        dcname.push(modens[i].name);
                    }
                }
                for(let i=0;i<arr1.length;i++){
                    zjrl.push((Number(moddata[arr1[i]] && moddata[arr1[i]].Capacity)*0.001).toFixed(2))
                }
                arr1.map((value, key)=>{
                    for(let i in modens){
                        if ( modens[i].det=='EnergyManager'&& modens[i].pid == value){
                            czdagc.push([key,modens[i].cis]);
                            arr3[""+value]= modens[i].cis;

                            // czdagc.key.push(modens[i].cis)
                        }
                        if ( modens[i].det=='TransSubstation'&& modens[i].pid == value){
                            czdavc.push([key,modens[i].cis]);
                            arr4[""+value]= modens[i].cis;
                        }
                    }
                });
                // console.log(arr4);
                // console.log(moddata[arr3["150801"]].AGCState);

            }());
            return(
                <div className={skinStyle==1?styles.bodyBoxBlue:skinStyle==2?styles.bodyBoxWhite:styles.bodyBox}>
                    {
                        arr1.map((value, key)=> {
                            return (
                                <div className={`${styles.station} ${styles.box_shadow}`} key={key}>
                                    <div className={styles.titlep}><span onClick={()=>changepage(value,key)}>{dcname[key]}</span></div>
                                    <div className={styles.lastt}>
                                        <div className={styles.lasttt}>装机容量 : {zjrl[key]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>计划功率 : {moddata[arr3[value]] == undefined ?"--":[(moddata[arr3[value]].AGCActPower*0.001).toFixed(0)]} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>负荷 : {moddata[arr4[value]] == undefined ?"--":
                                            (value == "150811" ?[(moddata[arr4[value]].Transformer_P_BMCJGF/1).toFixed(2)]:
                                                (value == "150801" ?[((moddata[arr4[value]].Transformer_P/1)-(moddata[arr4[value]].Transformer_P_BMCJGF/1)).toFixed(2)]:
                                                    [(moddata[arr4[value]].Transformer_P/1).toFixed(2)]))} <span className={styles.lastttt}>MW</span></div>
                                        <div className={styles.lasttt}>AGC/AVC :
                                            <div className={moddata[arr3[value]] == undefined ?styles.cutD:
                                                (moddata[arr3[value]].AGCState=='#669999'?styles.succ:(moddata[arr3[value]].AGCState=='#FF0000'?styles.defa:styles.cutD))}></div>
                                            <div className={moddata[arr4[value]] == undefined ?styles.cutD:
                                                (moddata[arr4[value]].AVCState=='#669999'?styles.succ:(moddata[arr4[value]].AVCState=='#FF0000'?styles.defa:styles.cutD))}></div>
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
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToprops = (dispatch) => {
    return {
        changedate:()=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "RegulationOverview", momo, "Screen", 0);
            function momo(jyname){
                if( jyname.Model == undefined){
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "RegulationOverview", momo, "Screen", 0);
                }else {
                    dispatch(actions.setVars('jyname', jyname));
                    TY.getRtData("RegulationOverview", 8888800, ppo);
                    function ppo(jydata){
                        if (jydata.ModelData==undefined){
                            TY.getRtData("RegulationOverview", 8888800, ppo);
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
            onceTime=setTimeout(function(){
                alert('数据获取失败！请重新登入');
                browserHistory.push('/app/all/page/login');
                dispatch(actions.setVars('userInfo', false));
            },30000);
            time=setInterval(function(){
                TY.getRtData("RegulationOverview", 8888800, ppoo);
                function ppoo(jydata){
                    if(jydata.ModelData==undefined){
                        TY.getRtData("RegulationOverview", 8888800, ppoo);
                    }else{
                        dispatch(actions.setVars('jydata', jydata));
                        dispatch(actions.setVars('boolebooster', true));
                    }
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
