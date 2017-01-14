import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {

        let {text, PBAGroupFirstPba, PBAMaintainloss, PBAFaultloss, PBAx, PBAPoweract, PBALimitloss, PBANodevreasonloss, PBAPba, fanProfit, fanCost, fanCost1, fanCost2, fanCost3, TBA, height, width, wq, changedata10,scolor}=this.props;
        let configPie = {
            chart: {
                height: height,

                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft: 0,

            },
            title: {
                text: text,
                align: 'left',
                top: '-20px',
                vertical: 'top',
                x: 105,
                y: 15,
                style: {
                    color: scolor,
                    fontSize: "16px",
                    fontFamily: "微软雅黑",

                }
            },
            // 插入图片
            //图例说明
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
                enabled: false //不显示highCharts版权信息
            },
            //柱子颜色
            colors: ['#64DC83', '#AACE4A', '#FFD924', '#FD9C31', '#EB6B34'],

            // 柱子宽 柱子间隔 柱子边框；
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

                        }
                    }
                }
            },

            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: scolor,//颜色
                        fontSize: '14px'  //字体
                    }
                },
                categories: PBAx,
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
                    x: 45,
                    style: {
                        color: scolor,
                        fontSize: '14px'
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
                minRange: 100,

                title: {
                    text: '(%)',
                    align: 'high',
                    rotation: '0',
                    y: -17,
                    x: -40,
                    style: {
                        color: scolor,
                        fontSize: '14px'
                    }
                },
                opposite: true
            }],
            //几条数据
            series: [{
                name: '实际发电量',
                type: 'column',
                data: PBAPoweract,
                borderRadius: 4,
                color: '#33BAC0',
                maxPointWidth: 20,
            },
                {
                    name: '故障损失',
                    type: 'column',
                    data: PBAFaultloss,
                    stack: 'waste',
                    borderRadius: 2,
                    color: '#5298d2',
                    maxPointWidth: 20,
                },
                {
                    name: '维护损失',
                    type: 'column',
                    data: PBAMaintainloss,
                    stack: 'waste',
                    color: '#ffffff',
                    maxPointWidth: 20,
                    borderRadius: 2,
                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: PBALimitloss,
                    stack: 'waste',
                    color: '#e8952a',
                    maxPointWidth: 20,
                    borderRadius: 2,
                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: PBANodevreasonloss,
                    stack: 'waste',
                    color: '#d8403d',
                    maxPointWidth: 20,
                    borderRadius: 2,
                },
                {
                    name: 'PBA',
                    type: 'line',
                    data: PBAPba,
                    color: 'blue',
                    yAxis: 1,
                    tooltip: {
                        valueSuffix: '%'
                    },

                },]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        wq: state.vars.wr,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);