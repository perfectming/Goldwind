import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{njhfdl,nsjfdl,nfdlwcl,unit}=this.props;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:270,
                marginTop: 60,
                marginBottom:50,
                marginLeft:55,
                marginRight:55
            },
            title: {
                text: '',
                style:{
                    color:"#fff",
                    fontSize:"24px",
                    fontFamily:"Microsoft YaHei"
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'12px'  //字体
                    },
                    rotation: 0
                },
                tickLength: 0,
                categories: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
            yAxis: [{
                title: {
                    text: '('+unit+')',
                    style: {
                        color: '#ffffff',
                        fontSize:'10px'
                    },
                    align: 'high',
                    rotation: 1,
                    y: -5,
                    x: 86
                },
                lineWidth: 1,
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'12px'  //字体
                    }
                },
                gridLineWidth: 0
            },{
                title: {
                    text:  '(%)',
                    style: {
                        color: '#ffffff'
                    },
                    align: 'high',
                    rotation: 1,
                    y:-5,
                    x:-56
                },
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'12px'  //字体
                    }
                },
                lineWidth: 1,
                opposite: true,
                gridLineWidth: 0,
            }],
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            legend: {
                itemHoverStyle:{color:'#2ff4fb'},
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    //fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
                y:-17,
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                },
                series:{
                    animation:false
                }
            },
            colors: ['#37545C','#32C5CD','#1fe005','#D06960']
            ,
            series: [{
                name:'计划发电量',
                type: 'column',
                data: njhfdl,
                borderRadius: 5,
                tooltip: {
                    valueSuffix: unit
                }
            },{
                name:'实际发电量',
                type: 'column',
                data: nsjfdl,
                borderRadius: 5,
                tooltip: {
                    valueSuffix: unit
                }

            },{
                name:'场站完成率',
                type: 'line',
                data: nfdlwcl,
                yAxis: 1,
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
        init: () => {},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
