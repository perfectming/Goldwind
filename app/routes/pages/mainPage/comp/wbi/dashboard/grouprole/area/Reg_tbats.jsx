import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Healthy-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {

        let {height,name2,runtime2,downtime2,jhpcolor,tba2,text} = this.props;



        let configPie = {
            chart: {
                height:height,
                backgroundColor: null,
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
                    color:jhpcolor,
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
                    color: jhpcolor,
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            tooltip: {


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
                    maxPointWidth:20,
                    tooltip: {
                        valueSuffix:'kWh'
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
                        color: jhpcolor,//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:name2,
            },
            yAxis: [{
                labels: {
                    format: '',
                    style: {
                        color: jhpcolor,
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                title: {
                    text: '(h)',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 35,
                    style: {
                        fontSize: '14px',
                        color: jhpcolor
                    }
                }
            }, {
                labels: {
                    format: '',
                    style: {
                        color: jhpcolor,
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
                        color: jhpcolor,
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
            }
                ,
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
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
