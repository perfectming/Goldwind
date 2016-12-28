import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {shuju,njhfdl,nsjfdl,nfdlwcl,monthTime}=this.props;
        let configPie = {
            chart: {
                height:shuju.high,
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                marginTop:60,
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
            tooltip: shuju.tooltip,
            credits: {
                enabled: false //不显示highCharts版权信息
            }
            ,
            plotOptions: {
                series:{
                    animation:false
                },
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
                categories:monthTime,
            },
            yAxis:[{
                labels: {
                    offset: 0,
                    format: '{value:.,0f}',
                    x:-5,
                    style: {
                        color: '#fff'

                    }
                },
                lineWidth: 1,
                gridLineWidth: 0,
                title: {
                    align: 'high',
                    offset: 0,
                    text: '(万kWh)',
                    rotation: 1,
                    y: -10,
                    style: {
                        color: '#fff',
                        top:0,
                        right:0,
                    }
                }
            }, { //第二个Y轴，序号为1
                title: {
                    align: 'high',
                    offset: 0,
                    text: '(%)',
                    rotation: 1,
                    y: -10,
                    style: {
                        color: '#fff',
                        top:0,
                        right:0,
                    }

                },
                gridLineWidth: 1,
                lineWidth: 1,
                labels: {
                    x:5,
                    style: {
                        color: '#fff'
                    }
                },
                opposite: true
            }],

            series:[{ //第二个Y轴的数据
                name: '月实际发电量',
                color: '#33BAC0',
                type: 'column',

                data:  nsjfdl,
                tooltip: {
                    valueSuffix: '万kWh'
                }

            }, { //第一个Y轴的数据
                name: '月计划发电量',
                color: '#70C080',
                type: 'column',

                data: njhfdl,
                tooltip: {
                    valueSuffix: '万kWh'
                }

            },
                { //第一个Y轴的数据
                    name: '完成率',
                    color: '#2ff4fb',
                    type: 'line',
                    yAxis: 1,//坐标轴序号
                    data:nfdlwcl,
                    tooltip: {
                        valueSuffix: '%'
                    }

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