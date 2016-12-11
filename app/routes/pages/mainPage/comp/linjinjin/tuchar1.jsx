import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {shuju}=this.props;
        let configPie = {
            chart: {
                height:shuju.high,
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                marginTop:10,
            },
            title: {
                text:'',
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                y:-10,
                itemHoverStyle:{color:'#2ff4fb'},
                itemStyle: {
                    color: "#fff",

                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            colors: ['#D06960','#E9C75C','#fff','#5298D3'],
            tooltip: {
                shared: true,
                style:{
                    color: '#333',
                    fontSize: '14px',
                    fontFamily:'微软雅黑'
                }
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            }
            ,
            plotOptions: {
                column: {
                    pointPadding: 5,
                    borderWidth: 0,
                    pointWidth: shuju.pointWidth,
                    borderRadius:5,
                    // dataLabels:{
                    //         enabled:true, // dataLabels设为true
                    //         style:{
                    //             color:'#D7DEE9'
                    //         }
                    //     }
                },
                 pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                           style: {
                                    color: "#d1d2d3",
                                    fontSize: '14px',
                                    fontFamily:"微软雅黑"

                                },

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
                        fontSize:'10px',  //字体
                        fontFamily:"微软雅黑"
                    }
                },
                categories:shuju.categories,
            },
            yAxis:shuju.yAxis,

            series:shuju.series
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