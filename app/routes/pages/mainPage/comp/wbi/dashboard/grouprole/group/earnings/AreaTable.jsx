import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var $ = require('jquery');
var ReactHighcharts = require('react-highcharts');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {input_url,width,areaName,areaRecordCost,areaRecordProfit,text,w11,changedataq,windFiedN,year,monthh,daycount,keyy,arr5,TBA,height}=this.props;
        let configPie = {
            chart: {
                height: height,
                width: width,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft: 0,

            },
            title: {
                text: text,
                align: 'left',
                x: 105,
                y: 13,
                style: {
                    color: "#fff",
                    fontSize: "16px",
                    fontFamily: "微软雅黑",

                }
            },
            // 插入图片

            //图例说明
            legend: {
                x: -75,
                y: 25,
                align: "right",
                verticalAlign: "top",
                itemHoverStyle: {
                    color: '#31f3fb',
                },
                itemStyle: {
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑",

                }
            },
            tooltip: {
                valueSuffix: '元'
            },
            credits: {
                enabled: false
            },
            //柱子颜色


            plotOptions: {
                column: {
                    maxPointWidth: 40,
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e) {

                            w11 = e.point.category;
                            let index = e.point.index;
                            let datee = new Date;
                            let year = datee.getFullYear();
                            let month2=datee.getMonth();
                            if(month2==0){
                                month2=12;
                               year=year-1;
                            }
                            keyy=month2;
                            let dayy = new Date(year, keyy, 0);
//获取天数：
                            let daycount = dayy.getDate();

                            let a = w11.toString().split("");
                            let b = a[0];

                            let areaWindCosts = [];
                            let areaWindEarnings = [];
                            let areaWindRates = [];
                            let areaWindids = [];
                            let areaWindNames = [];
                            let areaWindCosts1 = [];
                            let areaWindEarnings1 = [];
                            let areaWindRates1 = [];
                            let areaWindids1 = [];
                            let areaWindNames1 = [];
                            // 点击第一张图第二张变
                            $.ajax({
                                type: 'post',
                                url: 'http://' + input_url + '/wbi/yield/getYieldByGroupid',
                                async: false,
                                data: {
                                    'startdate': year + "-" + (keyy) + "-" + '1',
                                    'enddate': year + "-" + (keyy) + "-" + daycount,
                                    'groupid': arr5[index],

                                },
                                dataType: 'json',
                                timeout: '3000',
                                success: function (data) {


                                    let dataA = data.data;
                                    for (let i in dataA) {
                                        let areaWindCost = dataA[i].costs;
                                        areaWindCosts.push(areaWindCost);
                                        let areaWindEarning = dataA[i].earning;
                                        areaWindEarnings.push(areaWindEarning);
                                        let areaWindRate = dataA[i].rate * 100;
                                        areaWindRates.push(Number(areaWindRate.toFixed(1)));
                                        let areaWindid = dataA[i].wfid;
                                        areaWindids.push(areaWindid);
                                        let areaWindName = dataA[i].wfname;
                                        areaWindNames.push(areaWindName)

                                    }


                                },
                                error: function () {


                                },
                            });
                            // 点击第一张图第三张图变
                            $.ajax({
                                type: 'post',
                                url: 'http://' + input_url + '/wbi/yield/getYieldByWfid',
                                async: false,
                                data: {

                                    'startdate': year + "-" + (keyy) + "-" + '1',
                                    'enddate': year + "-" + (keyy) + "-" + daycount,
                                    'wfid': areaWindids[0],
                                    'methods': 'desc',

                                },
                                dataType: 'json',
                                timeout: '3000',
                                success: function (data) {


                                    let dataA = data.data;
                                    for (let i in dataA) {
                                        let areaWindCost = dataA[i].costs;
                                        areaWindCosts1.push(areaWindCost);
                                        let areaWindEarning = dataA[i].earning;
                                        areaWindEarnings1.push(areaWindEarning);
                                        let areaWindRate = dataA[i].rate * 100;
                                        areaWindRates1.push(Number(areaWindRate.toFixed(1)));
                                        let areaWindid = dataA[i].wtid;
                                        areaWindids1.push(areaWindid);
                                        let areaWindName = dataA[i].wtname;
                                        areaWindNames1.push(areaWindName)

                                    }


                                },
                                error: function () {


                                },
                            });
                            changedataq(w11,  b, areaWindNames, areaWindCosts, areaWindEarnings, areaWindRates, areaWindids, areaWindNames1, areaWindCosts1, areaWindEarnings1, areaWindRates1);
                        }
                    }
                }

            },

            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20,
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }
                },
                categories: areaName,
            },
            yAxis: [{
                labels: {
                    format: '',
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',


                title: {
                    text: '（元）',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 45,
                    style: {
                        fontSize: '14px',
                        color: '#fff'
                    }
                }
            }, {
                labels: {
                    format: '',
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }
                },
                gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                tickInterval: 20,
                minRange: 20,

                title: {
                    text: '（%）',
                    align: 'high',
                    rotation: '0',
                    y: -15,
                    x: -45,
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }

                },

                opposite: true
            }],

            series: [{
                name: '收入',
                type: 'column',
                data: areaRecordProfit,
                borderRadius: 7,
                color: '#33BAC0',
                borderWidth: 0,
                maxPointWidth: 40,
                pointPlacement:0.1,
            },
                {
                    name: '成本',
                    type: 'column',
                    data: areaRecordCost,
                    borderRadius: 7,
                    color: '#70c080',
                    pointPlacement:-0.1,
                    borderWidth: 0,
                }, {
                    name: "收益率",
                    type: 'line',
                    color: 'blue',
                    data: TBA,
                    yAxis: 1,
                    tickInterval: 1,
                    tooltip: {
                        valueSuffix: '%'
                    },
                }
            ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        w11: state.vars.w1,



    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedataq: (w11, b, areaWindNames, areaWindCosts, areaWindEarnings, areaWindRates, areaWindids, areaWindNames1, areaWindCosts1, areaWindEarnings1, areaWindRates1)=> {
            dispatch(actions.setVars('w1', w11));

            dispatch(actions.setVars('areaWindNamess', areaWindNames));
            dispatch(actions.setVars('areaWindCostss', areaWindCosts));
            dispatch(actions.setVars('areaWindEarningss', areaWindEarnings));
            dispatch(actions.setVars('areaWindRatess', areaWindRates));
            dispatch(actions.setVars('areaWindidss', areaWindids));
            dispatch(actions.setVars('areaWindidsss', areaWindids));

            dispatch(actions.setVars('areaWindNamesss', areaWindNames1));
            dispatch(actions.setVars('areaWindCostsss', areaWindCosts1));
            dispatch(actions.setVars('areaWindEarningsss', areaWindEarnings1));
            dispatch(actions.setVars('areaWindRatesss', areaWindRates1));
            dispatch(actions.setVars('w123', areaWindNames[0]));
            dispatch(actions.setVars('btnn', 0));


        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);