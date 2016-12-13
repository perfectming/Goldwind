import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./power-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let time = data.data.line_ltime;
<<<<<<< HEAD
        let powerValue = data.data.line_lpower;
=======
        let powerlOValue = data.data.line_lOpower;
        let powerlTValue = data.data.line_lTpower;
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
            },
            title: {
                text: '',
                style:{
                    color:"#fff",
                    fontSize:"22px",
                    fontFamily:"微软雅黑",
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
<<<<<<< HEAD
            colors: ['#4CDB9D', '#339C70', '#1E664A', '#134833', '#082B1F'],
=======
            colors: ['#fa6142', '#323b4e9', '#1E664A', '#134833', '#082B1F'],
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
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
            },
            xAxis: {
                lineWidth: 0,
                lineColor: "red",
                tickWidth: 0,
                tickWidth: 1, //刻度的宽
                tickLength: 310, //刻度线的长度
                tickmarkPlacement: 'on',// 刻度在中间
                tickPosition: 'inside', //刻度线在轴线内部
                //gridLineColor: '#fff', 网格线
                //gridLineWidth: 2,
                labels: { 
                    rotation: 0,
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px',  //字体
                    }
                },
                categories: time
            },
            yAxis: {
                lineWidth: 0,
                //lineColor: "red",
                //tickWidth: 4,
                maxPadding: 0.05,
                //gridLineColor: '#197F07',
                //gridLineWidth: 2,
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
<<<<<<< HEAD
                name: "name",
                data: powerValue
=======
                name: "预测功率",
                data: powerlOValue
            },{
                type: 'line',
                name: "实测功率",
                color:"#23b4eb",
                data: powerlTValue
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
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
