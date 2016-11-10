import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/chart-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let doughnutValue = data.data.line_l;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '短期功率预测',
                style:{
                    color:"#fff",
                    fontSize:"24px"
                }
            },

            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#4CDB9D', '#339C70', '#1E664A', '#134833', '#082B1F']
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
                tickWidth: 0,
                labels: { 
                    rotation: 0,
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#19a0f5',//颜色
                        fontSize:'14px',  //字体

                    }
                },
                categories: ['10/8 0:00','10/9 0:00','10/10 0:00','10/11 0:00','10/12 0:00','10/9 0:00','10/10 0:00','10/11 0:00','10/12 0:00'                  ]
            },
            yAxis: {
                lineWidth: 1,
                lineColor: "red",
                //tickWidth: 4,
                maxPadding: 0.05,
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
                name: "name",
                data: doughnutValue
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
