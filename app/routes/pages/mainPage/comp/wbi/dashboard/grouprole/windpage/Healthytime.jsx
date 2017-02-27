import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle3.scss';
import Healtytimechart from './Healtytimechart.jsx';
import Healtytimecharttt from './Healtytimecharttt.jsx';
import icono2 from '../../../../../img/comp/HEA.png';
import icono1 from '../../../../../img/comp/HEA2.png';
let cjId = require("../../../../urlData").CJwfId;
var actions = require('redux/actions');
let data=require('./../group/Profit-data3');
let month=data.month;
let button=data.button;
let areaRecordProfitT=data.areaRecordProfitT;
let monthT=data.monthT;
let text=data.text[2];
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaRecordProfit=data.areaRecordProfit;
let machine=data.machine;
let areaPlanDay=data.areaPlanDay
let areaPlan=data.areaPlan
let Component = React.createClass({
    componentWillMount() {
        let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(cjId,xxdwfId,xxdwfNa,ipUrl);

    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {ipUrl,WTHealNamee,WTNe,hlyyear,hlymonth,xxdwfNa="川井风电场",WTN,WTHealName,w0='11月',wins,befor_pagee='windpage',backtop,befor_pagee2,areaPlan,areaPlanDay,skinStyle}=this.props;
        return (
            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>

                <div className={styles.paddingtop}>
                    <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div>
                </div>
                {//健康度12个月
                }
                <div className={`${styles.areabox} ${styles.shadow}`}>



                    <Healtytimechart  monthT={WTHealName}
                                      areaRecordProfitT={WTN}
                                      input_url={ipUrl} height={410}
                                      hlyyear={hlyyear}
                                      hlymonth={hlymonth}
                                      text={xxdwfNa+'每月健康度'} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Healtytimechart>

                    <div className={styles.bgcc}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                </div>
                {//健康度每个月的数据
                }
                <div className={`${styles.areabox} ${styles.shadow}`}>



                    <Healtytimecharttt   areaPlan={WTHealNamee} areaPlanDay={WTNe} text1={w0+xxdwfNa+'每日健康度'} height={410} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></Healtytimecharttt>



                    <div className={styles.bgcc}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                </div>
            </div>


        );
    }
});



const mapStateToProps = (state) => {
    return {
        WTHealName:state.vars.WTHealName1,
        WTN:state.vars.WTN1,
        WTHealNamee:state.vars.WTHealName12,
        WTNe:state.vars.WTN12,
        xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
        ipUrl:state.vars.ipUrl,
        skinStyle:state.vars.skinStyle,
        w0:state.vars.WHmonth,



    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (cjId,xxdwfId,xxdwfNa,input_url) => {

            let WTHealH=[];
            let WTHealName=[];
            let WTHealName0 = [];
            let WTN=[];
            let WTHealNamee=[];
            let WTNN=[];
            let date = new Date();
            let month =date.getMonth();
            let year=date.getFullYear();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
// 获取当前月的上一个月的数据
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/Health/getWfieldTimHealth',
                async:false,
                data:{
                    'year':year,
                    'month':month,
                    'wfid':xxdwfId,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    let WTHeal=data.data.monthHealth;
                    // 获取12个月份
                    WTHeal.map(function(value,key){
                        for (let n in value) {

                            WTN.push(value[n]);
                            WTHealName0.push(n.substring(0,4));
                            WTHealName.push(n.substring(4,6));
                        }

                    })
                    let WTHealNamee=[];
                    let WTNN=[];
                    let WHDayH=data.data

                    let WTHealName3=[]
                    for(let i in WTHealName){

                        WTHealName3.push(WTHealName[i]+"月")
                    }

                    dispatch(actions.setVars('hlyyear', WTHealName0));
                    dispatch(actions.setVars('hlymonth', WTHealName));
                    dispatch(actions.setVars('WTHealName12',WTHealNamee));
                    dispatch(actions.setVars('WTHealName1',WTHealName3));
                    dispatch(actions.setVars('WTN1',WTN ));
                    dispatch(actions.setVars('WHmonth',month+'月'));
                    dispatch(actions.setVars('wfh', WTHealName[10]+"月"));
                    dispatch(actions.setVars('WTN12',WTNN ));


                },
                error:function(){

                },
            });
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/Health/getWfieldTimHealth',
                async:false,
                data:{
                    'year':year,
                    'month':month,
                    'wfid':xxdwfId==undefined? cjId:xxdwfId,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    let WTHeal=data.data.dayHealth;
                    let WTHeall=data.data.monthHealth;
                    for (let i in WTHeal){
                        if(i<10)
                        { WTHealNamee.push(i.slice(0,8)+'日');
                            WTNN.push(WTHeal[i])
                        }
                        else{
                            WTHealNamee.push(i.slice(6,8)+'日');
                            WTNN.push(WTHeal[i])
                        }

                    }








                },
                error:function(){
                    console.log("数据获取失败");
                },
            });
            dispatch(actions.setVars('WTHealName12',WTHealNamee));
            dispatch(actions.setVars('WTN12',WTNN ));
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,

        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component)