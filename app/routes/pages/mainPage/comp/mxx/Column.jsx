import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{njhfdl,nsjfdl,unit}=this.props;
        let configPie = {
            chart: {
                type: 'column',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:270,
                marginTop: 50,
                marginBottom:40,
                marginLeft:55,
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
                categories: ['十二月','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月']
            },
            yAxis: {
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
            },
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
                }
            },
            colors: ['#37545C','#32C5CD'    ]
            ,
            series: [{
                name:'计划发电量',
                data: njhfdl,
                borderRadius: 5,
                tooltip: {
                    valueSuffix: unit
                }
            },{
                name:'实际发电量',
                data: nsjfdl,
                borderRadius: 5,
                tooltip: {
                    valueSuffix: unit
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
