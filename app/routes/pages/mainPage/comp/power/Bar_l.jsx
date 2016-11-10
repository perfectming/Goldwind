import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/chart-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let barLo = data.data.bar_lo;
        let barLt = data.data.bar_lt;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
            },
            title: {
                text: '准确率和合格率',
                style:{
                    color:"#fff",
                    fontSize:"24px"
                }
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"18px",
                    fontWeight:"normal"
                }
               
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
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
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    pointWidth: 30
                }
            },
            xAxis: {
                lineWidth: 1,
                lineColor: "red",
                tickWidth: 4,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#19a0f5',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories: ['One','Two','three']
            },
            yAxis: {
               // lineWidth: 1,
               // lineColor: "red",
                //tickWidth: 4,
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                name: '发生次数',
                type: 'column',
                data: barLo
            },{
                name: '状态时长(s)',
                type: 'column',
                data: barLt
            }]
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
