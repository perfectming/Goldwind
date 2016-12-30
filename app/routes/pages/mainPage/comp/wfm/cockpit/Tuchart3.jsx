import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {shuju,gczmc,gczdxlyxss}=this.props;
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
                column: {
                    pointPadding: 5,
                    borderWidth: 0,
                    pointWidth: shuju.pointWidth,
                    borderRadius:5,
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
                categories:gczmc,
            },
            yAxis:[{
                labels: {
                    format: '{value:.,0f}',
                    offset: 0,
                    x:-5,
                    style: {
                        color: '#fff'
                    }
                },
                gridLineWidth: 0,
                lineWidth: 1,
                title: {
                    align: 'high',
                    offset: 0,
                    text: '(h)',
                    rotation: 0,
                    y: -10,
                    style: {
                        color: '#fff',
                        top:0,
                        right:0,
                    }
                }
            }],

            series:[{ //第二个Y轴的数据
                name: '场站年等效利用小时数',
                color: '#70C080',
                type: 'column',
                tooltip: {
                    valueSuffix: 'h'
                },
                data: gczdxlyxss,

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