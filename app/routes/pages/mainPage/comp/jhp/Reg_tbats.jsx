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
        let barLotime = data.data.bar_lotime;
        let barLoPowerValue = data.data.bar_loPower;
        let barLdpowerValue = data.data.line_date;
        let barLpdpowerValue = data.data.line_pdate;
        let barlinepdats = data.data.line_pdates;
        let barlinepdat = data.data.line_pdatess;
        let barLpdpowerValues = data.data.line_pdates;

        let configPie = {
            chart: {
                height:500,
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        //[0, 'rgb(56, 85, 94)'],
                        [0, 'rgb(37, 41, 48)'],

                    ]
                },
                borderRadius:10
            },
            title: {
                text: '集团11月每日PBA',
                align:'left',
                x : "0",
                style:{
                    color:"#fff",
                    fontSize:"22px",
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
            colors: ['#4CDB9D', '#1E664A', '#000','#134833', '#082B1F']
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
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    pointWidth:20
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
                categories:barLdpowerValue,
            },
            yAxis: {
                // lineWidth: 1,
                // lineColor: "red",
                //tickWidth: 4,
                max:100,
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                name: '实际运行时间',
                type: 'column',
                data: barLpdpowerValue
            },{
                name: '停机时间',
                type: 'column',
                color:'#cccccc',
                data: barlinepdat
            }
                ,
                {
                    name: 'TBA',
                    type: 'spline',
                    color:'#0000ff',
                    data: barlinepdats
                }

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