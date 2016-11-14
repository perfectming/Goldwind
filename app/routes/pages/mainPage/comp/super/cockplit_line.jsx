import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../linjinjin/date');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {

        let text = data.xtext;
        let duixiang = data.duixiang;
        let ChartHeight = data.height;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:ChartHeight,

            },
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
            title: {
                text: ''
            },
            xAxis:{
                tickWidth: 0,//刻度线的宽度
                 categories: text, //横坐标内容
                  labels: {
                       rotation: 0, //文字旋转角度
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            color: '#eff0f0',//颜色
                            fontSize:'14px',  //字体
                            fontFamily:"微软雅黑"
                           }
                       }

            },
             yAxis:{
                title:{
                    enabled:false
                },
                tickInterval: 100,//轴间距
                max:400,
                min:0,
                  labels: {
                      
                        style: {
                            color: '#eff0f0',//颜色
                            fontSize:'14px',  //字体
                            fontFamily:"微软雅黑"
                           }
                       }
                 
            },
           
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                 pointFormat: "<b>{point.percentage:.0f}%</b>",
                 backgroundColor: '#ccc'
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#2faab2', '#0f0',]
            ,
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '80%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: true
                    }, 
                }
            },
            series: duixiang,
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
