import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./power-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let time = data.data.line_rtime;
        let powerrOValue = data.data.line_rOpower;
        let powerrTValue = data.data.line_rTpower;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                 
                borderRadius:10
            },
            title: {
                text: '',
                style:{
                    color:"#fff",
                    fontSize:"22px",
                    fontFamily:"微软雅黑"
                }
            },
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#fa6142', '#323b4e9', '#1E664A', '#134833', '#082B1F']
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
            xAxis: {
                lineWidth: 0,
                lineColor: "red",
                tickWidth: 1, //刻度的宽
                tickLength: 310, //刻度线的长度
                tickmarkPlacement: 'on',// 刻度在中间
                tickPosition: 'inside', //刻度线在轴线内部
                labels: { 
                    rotation: 0,
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px',  //字体
                    }
                },
                categories:time
            },
            yAxis: {
                //lineWidth: 1,
                //lineColor: "red",
                //tickWidth: 4,
                maxPadding: 0.05,
                max:60000,
                labels: {
                    y: 4, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                type: 'line',
                name: "预测功率",
                data: powerrOValue
            },{
                type: 'line',
                name: "实测功率",
                color:"#23b4eb",
                data: powerrTValue
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
