import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Healthy-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let barRotime = data.data.bar_rotime;
        let barRotimes = data.data.bar_rotimes;
        let barLoPowerValue = data.data.bar_roPowerses;
        let barLoPowerValues = data.data.bar_roPower;
        let barLdpowerValue = data.data.line_lpower;
        let barLpdpowerValue = data.data.line_pdate;

        let configPie = {
            chart: {
                height:430,
                backgroundColor: "rgba(44, 61, 71, 0.4)",
                //plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,

                borderRadius:10
            },
            title: {
                text: '11月份1风场各风机PBA',

                align:'left',
                x : "0",
                style:{
                    color:"#fff",
                    fontSize:"20px",
                    fontWight:'600',
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"18px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormatter: "<b>{point.percentage:.0f}%</b>"

            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#4CDB9D', ' #A2D04D', '#FFD927' , '#FF9424', '#FF6124', '#000fff','#134833', '#082B1F']
            ,
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '100%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false
                    }
                },
                bar:{
                    animation: true
                },
                column: {
                    stacking: 'normal',

                    borderWidth: 0,
                    tooltip: {
                        valueSuffix:'kWh'
                    },
                }
            },

            xAxis: {
                lineWidth: 1,
                //lineColor: "red",
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:barRotimes,
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
                    text: 'kWh',
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
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                title: {
                    text: 'PBA%',
                    align: 'high',
                    rotation: '0',
                    y: -15,
                    x: -40,
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }

                },
                opposite: true
            }],

            series: [{
                name: '实际发电量',
                type: 'column',
                color: "#33BAC0",
                data: power1,
                borderRadius: 4,
            }, {
                name: '故障损失',
                color: '#5298d3',
                type: 'column',
                data: wrong10,
                stack: 'time',

            },
                {
                    name: '维护损失',
                    color: '#ffffff',
                    type: 'column',
                    data: wrong11,
                    stack: 'time'
                },
                {
                    name: '限功率损失',
                    color: '#e9c75c',
                    type: 'column',
                    data: wrong12,
                    stack: 'time'
                },

                {
                    name: '非设备原因损失',
                    color: '#d06960',
                    type: 'column',
                    data: wrong13,
                    stack: 'time',
                    borderRadius: 2,
                },


                {
                    name: 'PBA',
                    type: 'line',
                    color: '#0000ff',
                    data: pba1,
                    yAxis: 1,
                },

            ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);