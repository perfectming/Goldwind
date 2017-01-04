import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle3.scss';
import GroupTBAT from './GroupTBAT.jsx';
import TBATimechartt from './TBATimechartt.jsx';
import icono from '../../../../../../img/comp/TBA.png';
var actions = require('redux/actions');
var $ = require('jquery');

let Component = React.createClass({
    componentWillMount() {
        // 引入的全局变量ip 页面预加载内容
        let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {w0,ipUrl,tbaMonths,tbaRunTimes,tbaDownTimes,tbaTba,befor_pagee='group',backtop,befor_pagee2,tbaDays3,tbaDayRunTimes3,tbaDayDownTimes3,tbaDayTba3}=this.props;

        return (

            <div className={styles.box}>
                { // 返回按钮
                }
                <div className={styles.paddingtop}>
                    <div className={styles.back} onClick={()=>backtop(befor_pagee,befor_pagee2)}>返回</div>
                </div>
                {// 集团每月TBA
                }
                <div className={`${styles.areabox} ${styles.shadow}`}>
                    <div className={styles.bgc}><img src={icono}/></div>

                    <GroupTBAT text={'集团每月TBA'} areaNamee={tbaMonths} areaRecordCostss={tbaDownTimes}
                               areaRecordProfitt={tbaRunTimes} TBA={tbaTba} input_url={ipUrl} height={410}></GroupTBAT>

                </div>
                {//每天TBA
                }

                <div className={`${styles.areabox} ${styles.shadow}`}>
                    <div className={styles.bgc}><img src={icono}/></div>

                    <TBATimechartt TBAx={tbaDays3} TBADownTimes={tbaDayDownTimes3} TBARunTimes={tbaDayRunTimes3}
                                   TBAtba={tbaDayTba3} height={410} text={w0+'每日TBA'}></TBATimechartt>

                </div>

            </div>


        );
    }
});


const mapStateToProps = (state) => {
    return {
        // 集团每月TBA
        tbaMonths: state.vars.tbaMonths1,
        tbaRunTimes: state.vars.tbaRunTimes1,
        tbaDownTimes: state.vars.tbaDownTimes1,
        tbaTba: state.vars.tbaTba1,
        // 对应的月份
        w0: state.vars.qwe,
        // 每月TBA
        tbaDays3: state.vars.tbaDays31,
        tbaDayRunTimes3: state.vars.tbaDayRunTimes31,
        tbaDayDownTimes3: state.vars.tbaDayDownTimes31,
        tbaDayTba3: state.vars.tbaDayTba31,
        // 全局ip
        ipUrl: state.vars.ipUrl,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (input_url) => {
            //获取十二个月的TBA
            let datee = new Date;
            let year = datee.getFullYear();
            let monthF = datee.getMonth();
            if(monthF==0){
                monthF=12;
                year=year-1;
            }

            dispatch(actions.setVars('qwe', monthF+"月"));
            let TBAtimedata;
            let TBAdaydata;
            let tbaMonths = [];
            let tbaRunTimes = [];
            let tbaDownTimes = [];
            let tbaTba = [];
            let tbaDays3 = [];
            let tbaDayRunTimes3 = [];
            let tbaDayDownTimes3 = [];
            let tbaDayTba3 = [];

           // 获取所有的月份
            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/TBA/getMonthsTBA',
                async: false,
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    TBAtimedata = data.data;
                    for (let i in TBAtimedata) {

                        let tbamonth = TBAtimedata[i].month + '月';
                        tbaMonths.push(tbamonth);

                        let tbaruntimes = TBAtimedata[i].runtimes;
                        tbaRunTimes.push(tbaruntimes);

                        let downtimes = TBAtimedata[i].downtimes;
                        tbaDownTimes.push(downtimes);

                        let tba = TBAtimedata[i].tba * 100;
                        tbaTba.push(Number(tba.toFixed(1)));

                    }


                },
                error: function () {


                },
            });
            dispatch(actions.setVars('tbaMonths1', tbaMonths));
            dispatch(actions.setVars('tbaRunTimes1', tbaRunTimes));
            dispatch(actions.setVars('tbaDownTimes1', tbaDownTimes));
            dispatch(actions.setVars('tbaTba1', tbaTba));


// // // 获取默认的月份：当前月的上一月

            $.ajax({
                type: 'post',
                url: 'http://' + input_url + '/wbi/TBA/getDaysTBAByMonth',
                async: false,
                dataType: 'json',
                data: {
                    'month': month,
                },
                timeout: '3000',
                success: function (data) {

                    TBAdaydata = data.data;
                    for (var i in TBAdaydata) {
                        var tbaDay = TBAdaydata[i].day + '日';
                        tbaDays3.push(tbaDay);

                        var tbaDayruntimes = TBAdaydata[i].runtimes;
                        tbaDayRunTimes3.push(tbaDayruntimes);

                        var daydowntimes = TBAdaydata[i].downtimes;
                        tbaDayDownTimes3.push(daydowntimes)

                        var tba = TBAdaydata[i].tba * 100;
                        tbaDayTba3.push(Number(tba.toFixed(2)));


                    }


                },
                error: function () {


                },
            });
            dispatch(actions.setVars('tbaDays31', tbaDays3));
            dispatch(actions.setVars('tbaDayRunTimes31', tbaDayRunTimes3));
            dispatch(actions.setVars('tbaDayDownTimes31', tbaDayDownTimes3));
            dispatch(actions.setVars('tbaDayTba31', tbaDayTba3));



        }
        ,
        init: () => {
            var obj = {
                test: ''
            }
        }
        ,
        backtop: (befor_pagee, befor_page2)=> {
            dispatch(actions.setVars('showPage', befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
