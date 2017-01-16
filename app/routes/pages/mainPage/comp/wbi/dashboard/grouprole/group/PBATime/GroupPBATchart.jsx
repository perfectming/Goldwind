import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },
    render() {

        let {text1, height, input_url, PBAGroupPba, PBAGroupNodevreasonloss, PBAGroupMaintainloss, PBAGroupLimitloss, PBAGroupFaultloss, areaName, areaRecordCosts, areaRecordProfit, text0, w0, changedata1,PBAGroupSpace,scolor}=this.props;
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
                text: text1,
                align: 'left',
                x: 105,
                y: 15,
                style: {
                    color: scolor,
                    fontSize: "16px",
                    fontFamily: "微软雅黑",

                }
            },
            legend: {
                x: -75,
                y: 30,
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
            colors: ['#64DC83', '#AACE4A', '#FFD924', '#FD9C31', '#EB6B34'],
            plotOptions: {
                column: {
                    borderWidth: 0,
                    stacking: 'normal',
                    tooltip: {
                        valueSuffix: 'kWh'
                    },
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                            // 每一个柱状图下面的x
                            let w0 = e.point.category;
                            // 对应的柱状图的序列号  下面的b取值是多余
                            let PBAGroupIndex = e.point.index;
                            let a = w0.toString().split("");
                            let b = a[0];

                            let PBAGroupFirstDay = [];
                            let PBAGroupFirstPoweract = [];
                            let PBAGroupFirstFaultloss = [];
                            let PBAGroupFirstMaintainloss = [];
                            let PBAGroupFirstLimitloss = [];
                            let PBAGroupFirstNodevreasonloss = [];
                            let PBAGroupFirstPba = [];
                            // 点击上面下面变

                            $.ajax({
                                type: 'post',
                                url: 'http://' + input_url + '/wbi/PBA/getCompanyDayTimePBA',
                                async: false,
                                dataType: 'json',
                                data: {
                                    'year':PBAGroupSpace[PBAGroupIndex].year,
                                    'month': PBAGroupSpace[PBAGroupIndex].month,
                                },
                                timeout: '3000',
                                success: function (data) {

                                    let PBAGroupFirstMonth = data.data;

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
                                        PBAGroupFirstPba.push(Number(pba.toFixed(1)));
                                    }


                                },
                                error: function () {


                                },
                            });
                            changedata1(w0, b, PBAGroupFirstDay, PBAGroupFirstPoweract, PBAGroupFirstFaultloss, PBAGroupFirstMaintainloss, PBAGroupFirstLimitloss, PBAGroupFirstNodevreasonloss, PBAGroupFirstPba);
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
                categories: areaName,
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
                    y: -17,
                    x: 50,
                    style: {
                        fontSize: '14px',
                        color: scolor
                    }
                }
            }, {
                labels: {

                    style: {
                        color: scolor,
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                minRange: 100,
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
                data: areaRecordProfit,
                borderRadius: 7,
                color: '#33BAC0',
                maxPointWidth: 30,

            },
                {
                    name: '故障损失',
                    type: 'column',
                    data: PBAGroupFaultloss,
                    stack: 'first',
                    borderRadius: 2,
                    maxPointWidth: 30,
                    color: '#5298d2',
                },
                {
                    name: '维护损失',
                    type: 'column',
                    data: PBAGroupMaintainloss,
                    stack: 'first',
                    maxPointWidth: 30,
                    color: '#ffffff'
                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: PBAGroupLimitloss,
                    stack: 'first',
                    maxPointWidth: 30,
                    color: '#e8952a',
                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: PBAGroupNodevreasonloss,
                    stack: 'first',
                    borderRadius: 2,
                    maxPointWidth: 30,
                    color: '#d8403d'
                },
                {
                    name: 'PBA',
                    type: 'line',
                    data: PBAGroupPba,
                    stack: 'first',
                    color: 'blue',
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
        w0: state.vars.PBAGroupPbaName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata1: (w0, b, PBAGroupFirstDay, PBAGroupFirstPoweract, PBAGroupFirstFaultloss, PBAGroupFirstMaintainloss, PBAGroupFirstLimitloss, PBAGroupFirstNodevreasonloss, PBAGroupFirstPba) => {
            dispatch(actions.setVars('PBAGroupPbaName', w0));
            dispatch(actions.setVars('PBAGroupFirstDayy1', PBAGroupFirstDay));
            dispatch(actions.setVars('PBAGroupFirstPoweract1', PBAGroupFirstPoweract));
            dispatch(actions.setVars('PBAGroupFirstMaintainloss1', PBAGroupFirstMaintainloss));
            dispatch(actions.setVars('PBAGroupFirstLimitloss1', PBAGroupFirstLimitloss));
            dispatch(actions.setVars('PBAGroupFirstFaultloss1', PBAGroupFirstFaultloss));
            dispatch(actions.setVars('PBAGroupFirstNodevreasonloss1', PBAGroupFirstNodevreasonloss));
            dispatch(actions.setVars('PBAGroupFirstPba12', PBAGroupFirstPba));


        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);