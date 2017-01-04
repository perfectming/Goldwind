import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
var jquery = require('jquery');
let data = require('./Healthy-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {

        let {height,text,name2,runtime2,downtime2,tba2,widths} = this.props;
        let configPie = {
            chart: {
                height:height,
                width:widths,
                backgroundColor: "rgba(44, 61, 71, 0.4)",
                // plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                borderRadius:10
            },
            title: {
                text: text,
                align:'left',
                x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                y:40,
                x:-75,
                itemHoverStyle:{
                    color:'#31f3fb',
                },
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
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
                },
                bar:{
                    animation: true
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    maxPointWidth: 20,
                    //pointWidth:20
                    tooltip: {
                        valueSuffix:'h'
                    },
                },
                line:{
                    tooltip: {
                        valueSuffix:'%'
                    },
                },
            },

            xAxis: {
                lineWidth: 1,
                //lineColor: "red",
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:name2,
            },
            yAxis: [{
                labels: {
                    format: '',
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                //max:'${max}',
                tickInterval: 10,
                title: {
                    text: '(h)',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 35,
                    style: {
                        fontSize: '14px',
                        color: '#fff'
                    }
                }
            }, {
                labels: {
                    format: '',
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',


                min:0,
                title: {
                    text: '(%)',
                    align: 'high',
                    rotation: '0',
                    y: -15,
                    x: -40,
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }

                },
                opposite: true
            }],
            series: [{
                name: '实际运行时间',
                type: 'column',
                data: runtime2,
                borderRadius: 2,
                color:'#62de88',
            },{
                name: '停机时间',
                type: 'column',
                color:'#cccccc',
                data: downtime2,
                borderRadius: 2,
            },
                {
                    name: 'TBA',
                    type: 'line',
                    color:'#0000ff',
                    data: tba2,
                    yAxis:1,
                }

            ]
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
