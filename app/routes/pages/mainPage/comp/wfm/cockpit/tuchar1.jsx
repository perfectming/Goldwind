import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {ssdlnum,lettercolor}=this.props;
        let configPie = {
            chart: {
                height:230,
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                marginTop:0,
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
                    color: lettercolor,

                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            colors: ['#D06960','#E9C75C','#70C080','#5298D3'],
            tooltip: {
                style:{
                    color: '#333',
                    fontSize: '14px',
                    fontFamily:'微软雅黑'
                },
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>数值：<b>{point.y}</b><h6 style="font-size:12px">kWh</h6>'
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
                    pointWidth: 30,
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
                        format: '{point.name}:<b>{point.percentage:.1f}%</b>',
                        style: {
                            color: lettercolor,
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
                        color: lettercolor,//颜色
                        fontSize:'10px',  //字体
                        fontFamily:"微软雅黑"
                    }
                }
            },
            yAxis: [{
                labels: {
                    format: '{value:.,0f}',
                    offset: 0,
                    x:-5,
                    style: {
                        color: lettercolor
                    }
                },
                gridLineWidth: 0,
                title: {
                    align: 'high',
                    offset: 0,
                    text: '(h)',
                    rotation: 0,
                    y: -10,
                    style: {
                        color: lettercolor,
                        top:0,
                        right:0,
                    }
                }
            }],

            series:[{ //第二个Y轴的数据
                name: '类型占比',
                type: 'pie',
                // tooltip: {
                //     valueSuffix: '%'
                // },
                data: [['故障',ssdlnum[0]],['维护',ssdlnum[1]],['限功率',ssdlnum[2]],['非设备原因',ssdlnum[3]]]

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