import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

var $ = require('jQuery');



let Component = React.createClass({
    componentWillMount() {
    },

    render() {


        let {barLoPowerValue,barLoTime,text}=this.props;
        let configPie = {
            chart: {
                height:400,
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                      //  [0, 'rgb(56, 85, 94)'],
                        [0, 'rgb(37, 41, 48)']
                    ]
                },
                borderRadius:10
            },

            title: {
                text: text,
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
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
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormat: "<b>{point.percentage:.0f}%</b>"
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
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    pointWidth: 40
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
                        fontSize:'14px'  //字体
                    }
                },
                categories:barLoTime,
            },
            yAxis: {
               // lineWidth: 1,
               // lineColor: "red",
                //tickWidth: 4,

                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                name: '实际健康度',
                type: 'column',
                data: barLoPowerValue
            }
            // ,{
            //     name: '实际健康度',
            //     type: 'column',
            //     data: barRoPowerValue
            // },{
            //     name: '停机时间',
            //     type: 'spline',
            //     color:'#fff',
            //     data: barRoPowerValue
            // }


            ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    },


    // render(chart, point, text) {
    //     chart.renderer.label(text + ': ' + point.y,  point.plotX + chart.plotLeft -20 , point.plotY + chart.plotTop - 60, 'callout', point.plotX + chart.plotLeft, point.plotY + chart.plotTop)
    //         .css({
    //             color: '#FFFFFF',
    //             align: 'center',
    //         })
    //         .attr({
    //             background:'red',
    //             fill: 'red',
    //             padding: 8,
    //             r: 5,
    //             zIndex: 6
    //         })
    //         .add();
    // }
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
