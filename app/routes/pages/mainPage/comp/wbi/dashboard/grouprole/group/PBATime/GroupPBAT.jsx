import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle2.scss';
import GroupPBAT from './GroupPBATchart.jsx';
import icono2 from '../../../../../../img/comp/PBA.png';
import icono1 from '../../../../../../img/comp/PBA2.png';
import PBAtimechartt from './PBAtimechartt.jsx';
var actions = require('redux/actions');
let Component = React.createClass({
    componentWillMount() {
        
        let {ipUrl}=this.props;
        this.props.ajax(ipUrl);

    },
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {ipUrl,PBAGroupMonthF="11月",PBAGroupFirstDayy,PBAGroupFirstPoweract,PBAGroupFirstFaultloss,PBAGroupFirstMaintainloss,PBAGroupFirstLimitloss,PBAGroupFirstNodevreasonloss,PBAGroupFirstPba,PBAGroupMonth,PBAGroupPoweract,PBAGroupFaultloss,PBAGroupMaintainloss,PBAGroupLimitloss,PBAGroupNodevreasonloss,PBAGroupPba,close,backtop,befor_pagee='group',befor_pagee2,PBAGroupSpace,skinStyle}=this.props;
        return (
            <div className={skinStyle == 1 ? styles.boxBlue : skinStyle == 2 ? styles.boxWhite : styles.box}>
                {//遮罩层
                }
                <div className={styles.boxcover} id='boxcover'></div>
                {//返回按钮
                }
                <div className={styles.paddingtop}>
                    <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div>
                </div>


                {//PBA各月份的数据
                }
                <div className={`${styles.areabox} ${styles.shadow}`}>
                    <div className={styles.bgc}>
                    <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                    <GroupPBAT height={410} PBAGroupFaultloss={PBAGroupFaultloss} areaName={PBAGroupMonth}
                               areaRecordProfit={PBAGroupPoweract} PBAGroupMaintainloss={PBAGroupMaintainloss}
                               PBAGroupLimitloss={PBAGroupLimitloss} PBAGroupNodevreasonloss={PBAGroupNodevreasonloss}
                               PBAGroupPba={PBAGroupPba} text1={'集团每月PBA'} input_url={ipUrl}
                               PBAGroupSpace={PBAGroupSpace} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></GroupPBAT>

                </div>

               {// 每月每天的数据
               }
                <div className={`${styles.areabox} ${styles.shadow}`}>
                    <PBAtimechartt PBAx={PBAGroupFirstDayy} PBAPoweract={PBAGroupFirstPoweract}
                              PBAFaultloss={PBAGroupFirstFaultloss} PBAMaintainloss={PBAGroupFirstMaintainloss}
                              PBALimitloss={PBAGroupFirstLimitloss} PBANodevreasonloss={PBAGroupFirstNodevreasonloss} height={410}
                              PBAPba={PBAGroupFirstPba}
                              text={PBAGroupMonthF+'每日PBA'} scolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}></PBAtimechartt>


                    <div className={styles.bgc}>
                        <img src={skinStyle == 1 ? icono2 : skinStyle == 2 ? icono1: icono2}/>
                    </div>
                </div>

            </div>


        );
    }
});
const mapStateToProps = (state) => {
    return {
        // 返回的对应页面
        befor_pagee: state.vars.befor_pagee,
        befor_page2: state.vars.befor_pagee2,
        // 12个月的数据
        PBAGroupMonthF: state.vars.PBAGroupPbaName,
        PBAGroupMonth: state.vars.PBAGroupMonth1,
        PBAGroupPoweract: state.vars.PBAGroupPoweract1,
        PBAGroupFaultloss: state.vars.PBAGroupFaultloss1,
        PBAGroupMaintainloss: state.vars.PBAGroupMaintainloss1,
        PBAGroupLimitloss: state.vars.PBAGroupLimitloss1,
        PBAGroupNodevreasonloss: state.vars.PBAGroupNodevreasonloss1,
        PBAGroupPba: state.vars.PBAGroupPba1,
        // 获取对应月份的数据
        PBAGroupFirstDayy: state.vars.PBAGroupFirstDayy1,
        PBAGroupFirstPoweract: state.vars.PBAGroupFirstPoweract1,
        PBAGroupFirstFaultloss: state.vars.PBAGroupFirstFaultloss1,
        PBAGroupFirstMaintainloss: state.vars.PBAGroupFirstMaintainloss1,
        PBAGroupFirstLimitloss: state.vars.PBAGroupFirstLimitloss1,
        PBAGroupFirstNodevreasonloss: state.vars.PBAGroupFirstNodevreasonloss1,
        PBAGroupFirstPba: state.vars.PBAGroupFirstPba12,
        //ipUrl
        ipUrl: state.vars.ipUrl,
        PBAGroupSpace: state.vars.PBAGroupSpace,
        //皮肤样式
        skinStyle: state.vars.skinStyle,



    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (input_url) => {
          // 集团的PBA12个月
            let datee = new Date;
            let year = datee.getFullYear();
            let monthF = datee.getMonth();
            if(monthF==0){
                monthF=12;
                year=year-1;
            }
            dispatch(actions.setVars('PBAGroupPbaName', monthF+"月"));

            let PBAGroupMonth = [];
            let PBAGroupPoweract = [];
            let PBAGroupFaultloss = [];
            let PBAGroupMaintainloss = [];
            let PBAGroupLimitloss = [];
            let PBAGroupNodevreasonloss = [];
            let PBAGroupPba = [];
        // 集团的PBA12个月每天
            let PBAGroupFirstDay = [];
            let PBAGroupFirstPoweract = [];
            let PBAGroupFirstFaultloss = [];
            let PBAGroupFirstMaintainloss = [];
            let PBAGroupFirstLimitloss = [];
            let PBAGroupFirstNodevreasonloss = [];
            let PBAGroupFirstPba = [];
            let PBAGroupSpace=[];
            // 获取12个月的PBA 赋值第一个表
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi//PBA/getCompanyTimePBA',
                async: false,
                data:{
                    "year":year,
                    "month":monthF,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
             
                     PBAGroupSpace = data.data[0];
                    for (let i in PBAGroupSpace) {

                        let month = PBAGroupSpace[i].month + '月';
                        PBAGroupMonth.push(month);

                        let poweract = PBAGroupSpace[i].poweract;
                        PBAGroupPoweract.push(poweract);

                        let faultloss = PBAGroupSpace[i].faultloss;
                        PBAGroupFaultloss.push(faultloss);

                        let maintainloss = PBAGroupSpace[i].maintainloss;
                        PBAGroupMaintainloss.push(maintainloss);

                        let limitloss = PBAGroupSpace[i].limitloss;
                        PBAGroupLimitloss.push(limitloss);

                        let nodevreasonloss = PBAGroupSpace[i].nodevreasonloss;
                        PBAGroupNodevreasonloss.push(nodevreasonloss);

                        let pba = PBAGroupSpace[i].pba * 100;
                        PBAGroupPba.push(Number(pba.toFixed(1)));
                    }

                    // 上一个的月的数据  每天的数据
                    let PBAGroupFirstMonth = data.data[1];

                    for (let i in PBAGroupFirstMonth) {
                        let day = PBAGroupFirstMonth[i].day + '日';
                        PBAGroupFirstDay.push(day);

                        let poweract = PBAGroupFirstMonth[i].poweract;
                        PBAGroupFirstPoweract.push(poweract);

                        let faultloss = PBAGroupFirstMonth[i].faultloss;
                        PBAGroupFirstFaultloss.push(faultloss);

                        let maintainloss = PBAGroupFirstMonth[i].maintainloss;
                        PBAGroupFirstMaintainloss.push(maintainloss);

                        let limitloss = PBAGroupFirstMonth[i].limitloss;
                        PBAGroupFirstLimitloss.push(limitloss);

                        let nodevreasonloss = PBAGroupFirstMonth[i].nodevreasonloss;
                        PBAGroupFirstNodevreasonloss.push(nodevreasonloss);

                        let pba = PBAGroupFirstMonth[i].pba * 100;
                        PBAGroupFirstPba.push(Number(pba.toFixed(2)));
                    }


                },
                error: function () {


                },
            });
            dispatch(actions.setVars('PBAGroupMonth1', PBAGroupMonth));
            dispatch(actions.setVars('PBAGroupPoweract1', PBAGroupPoweract));
            dispatch(actions.setVars('PBAGroupMaintainloss1', PBAGroupMaintainloss));
            dispatch(actions.setVars('PBAGroupLimitloss1', PBAGroupLimitloss));
            dispatch(actions.setVars('PBAGroupFaultloss1', PBAGroupFaultloss));
            dispatch(actions.setVars('PBAGroupNodevreasonloss1', PBAGroupNodevreasonloss));
            dispatch(actions.setVars('PBAGroupPba1', PBAGroupPba));
            // 获取上个月的PBAFirst
            dispatch(actions.setVars('PBAGroupFirstDayy1', PBAGroupFirstDay));
            dispatch(actions.setVars('PBAGroupFirstPoweract1', PBAGroupFirstPoweract));
            dispatch(actions.setVars('PBAGroupFirstMaintainloss1', PBAGroupFirstMaintainloss));
            dispatch(actions.setVars('PBAGroupFirstLimitloss1', PBAGroupFirstLimitloss));
            dispatch(actions.setVars('PBAGroupFirstFaultloss1', PBAGroupFirstFaultloss));
            dispatch(actions.setVars('PBAGroupFirstNodevreasonloss1', PBAGroupFirstNodevreasonloss));
            dispatch(actions.setVars('PBAGroupFirstPba12', PBAGroupFirstPba));
            dispatch(actions.setVars('PBAGroupSpace',PBAGroupSpace));


        }
        ,
        init: () => {
            var obj = {
                test: ''
            }
        }
        ,
        // 返回功能
        backtop: (befor_pagee, befor_pagee2)=> {
            dispatch(actions.setVars('showPage', befor_pagee));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
