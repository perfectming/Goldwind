import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let input_url = "10.68.100.32";
var $ = require('jquery');
let data = require('./../group/Profit-data3');
let winss = data.areaPlanDayY;
let fanCost = data.fanCost;
let fanCostA = data.fanCostA;
let fanCostB = data.fanCostB;
let fanCostC = data.fanCostC;
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {height, text, input_url, width, xxdwfId, xxdfc, monthT, profit, cost, w0, winsss, changedata3, machine, fanProfitQ, fanCost, fanCostA, fanCostB, fanCostC,PBATimeFirstPbaa,scolor}=this.props;
        let configPie = {
            chart: {
                height: height,

                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft: 100,
            },
            title: {
                text: text,
                align: 'left',
                top: '-20px',
                vertical: 'top',
                x: 105,
                y: 14,
                style: {
                    color: scolor,
                    fontSize: "16px",
                    fontFamily: "微软雅黑",

                }
            },

            legend: {
                x: -75,
                y: 20,
                align: "right",
                verticalAlign: "top",
                itemHoverStyle: {
                    color: '#31f3fb',
                },
                itemStyle: {
                    color: scolor,
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑",

                }
            },

            credits: {
                enabled: false
            },
            //柱子颜色
            colors: ['#1E664A', '#4CDB9D']
            ,
            plotOptions: {

                column: {

                    stacking: 'nomal',
                    borderWidth: 0,
                    tooltip: {
                        valueSuffix: 'kWh'
                    },
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                          
                            let w3 = e.point.index;
                            let w0 = PBATimeFirstPbaa[w3].month;
                            let b = parseInt(w0);

                            // 第二个图的数据
                            let PBATimeSecondDay = [];
                            let PBATimeSecondPoweract = [];
                            let PBATimeSecondFaultloss = [];
                            let PBATimeSecondMaintainloss = [];
                            let PBATimeSecondLimitloss = [];
                            let PBATimeSecondNodevreasonloss = [];
                            let PBATimeSecondPbaP = [];
                            $.ajax({
                                type: 'post',
                                url: 'http://' + input_url + '/wbi/PBA/getWfieldDayPBA',
                                async: false,
                                data: {
                                    'wfid': xxdwfId,
                                    'month': PBATimeFirstPbaa[w3].month,
                                    'year': PBATimeFirstPbaa[w3].year,
                                },
                                dataType: 'json',
                                timeout: '3000',
                                success: function (data) {


                                    let PBATimeSecondPba = data.data;
                                    for (let i in PBATimeSecondPba) {
                                        let day = PBATimeSecondPba[i].day + '日';
                                        PBATimeSecondDay.push(day);
                                        let poweract = PBATimeSecondPba[i].poweract;
                                        PBATimeSecondPoweract.push(poweract);
                                        let faultloss = PBATimeSecondPba[i].faultloss;
                                        PBATimeSecondFaultloss.push(faultloss);
                                        let maintainloss = PBATimeSecondPba[i].maintainloss;
                                        PBATimeSecondMaintainloss.push(maintainloss);
                                        let limitloss = PBATimeSecondPba[i].limitloss;
                                        PBATimeSecondLimitloss.push(limitloss);
                                        let nodevreasonloss = PBATimeSecondPba[i].nodevreasonloss;
                                        PBATimeSecondNodevreasonloss.push(nodevreasonloss);
                                        let pba = PBATimeSecondPba[i].pba * 100;
                                        PBATimeSecondPbaP.push(Number(pba.toFixed(2)));
                                    }


                                },
                                error: function () {
                                    console.log("数据获取失败");
                                },

                            });


                            changedata3(w0, winss, b, PBATimeSecondDay, PBATimeSecondPoweract, PBATimeSecondFaultloss, PBATimeSecondMaintainloss, PBATimeSecondLimitloss, PBATimeSecondNodevreasonloss, PBATimeSecondPbaP);
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
                        color: scolor,
                        fontSize: '14px'
                    }
                },
                categories: monthT,
            },
            tooltip: {
                shared: true
            },
            yAxis: [{
                labels: {
                    format: '',
                    style: {
                        color: scolor,
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',


                title: {
                    text: '(kWh)',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 46,
                    style: {
                        fontSize: scolor,
                        color: scolor
                    }
                }
            }, {
                labels: {
                    format: '',
                    style: {
                        color: scolor,
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                tickInterval: 30,

                title: {
                    text: '(%)',
                    align: 'high',
                    rotation: '0',
                    y: -15,
                    x: -40,
                    style: {
                        color: scolor,
                        fontSize: '14px'
                    }

                },
                opposite: true
            }],

            series: [{
                name: '实际发电量',
                type: 'column',
                data: profit,
                color: '#33BAC0',
                shadow: true,
                maxPointWidth: 30,
                borderWidth: 0,
                borderRadius: 6,

            },
                {
                    name: '故障损失',
                    type: 'column',

                    data: fanCost,
                    stack: 'waste',
                    maxPointWidth: 30,
                    borderRadius: 3,
                    color: '#5298d2',


                },
                {
                    name: '维护损失',
                    type: 'column',
                    data: fanCostA,
                    stack: 'waste',
                    maxPointWidth: 30,
                    color: '#ffffff',
                    borderRadius: 3,

                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: fanCostB,
                    stack: 'waste',
                    color: '#e8952a',
                    maxPointWidth: 30,
                    borderRadius: 3,

                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: fanCostC,
                    stack: 'waste',
                    pointWidth: 30,
                    color: '#d8403d',
                    borderRadius: 3,

                },
                {
                    name: 'PBA',
                    type: 'line',
                    data: cost,
                    color: 'blue',
                    pointWidth: 15,
                    shadow: 'true',
                    yAxis: 1,
                    tooltip: {
                        valueSuffix: '%'
                    },

                },
            ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {

        w0: state.vars.windpbaspace,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata3: (w0, winss, b, PBATimeSecondDay, PBATimeSecondPoweract, PBATimeSecondFaultloss, PBATimeSecondMaintainloss, PBATimeSecondLimitloss, PBATimeSecondNodevreasonloss, PBATimeSecondPbaP) => {
            dispatch(actions.setVars('windpbaspace', w0+'月'));
            dispatch(actions.setVars('wins1', winss[b - 1]));
            dispatch(actions.setVars('PBATimeSecondDay1', PBATimeSecondDay));
            dispatch(actions.setVars('PBATimeSecondPoweract1', PBATimeSecondPoweract));
            dispatch(actions.setVars('PBATimeSecondMaintainloss1', PBATimeSecondMaintainloss));
            dispatch(actions.setVars('PBATimeSecondLimitloss1', PBATimeSecondLimitloss));
            dispatch(actions.setVars('PBATimeSecondFaultloss1', PBATimeSecondFaultloss));
            dispatch(actions.setVars('PBATimeSecondNodevreasonloss1', PBATimeSecondNodevreasonloss));
            dispatch(actions.setVars('PBATimeSecondPba12', PBATimeSecondPbaP));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);