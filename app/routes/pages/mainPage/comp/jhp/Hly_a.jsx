import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Healthy-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {

        let {barLotime,barLoPowerValue,barLoPowerValues,barLdpowerValue,text} = this.props;



        let configPie = {
            chart: {
                height:400,
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        // [0, 'rgb(56, 85, 94)'],
                        [0, 'rgb(37, 41, 48)'],

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
                    fontSize:"16px",
                    fontWight:'600',
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {

                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormatter: "<b>{point.percentage:.0f}%</b>"

            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#4CDB9D', ' #A2D04D', '#FFD927' , '#FF9424', '#FF6124', '#000fff','#134833', '#082B1F']
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
                    stacking: 'normal',

                    borderWidth: 0,

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
                categories:barLotime,
            },
            yAxis: [{
                // lineWidth: 1,
                // lineColor: "red",
                //tickWidth: 4,
                title: {
                    text:'小时',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 40,
                },

                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },{
                title:'TBA%',
                max:100,
                oppsite:true,
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            }],
            series: [{
                name: '实际运行时间量',
                type: 'column',
                data: barLoPowerValues
            },
                {
                    name: '停机时间',

                    color:'#A2D04D',
                    type: 'column',
                    data: barLoPowerValue,
                    stack:'time'
                },
                {
                    name: '停机时间',
                    color:'#FFD927',
                    type: 'column',
                    data: barLoPowerValue,
                    stack:'time'
                },
                {
                    name: '停机时间',
                    color:'#FF9424',
                    type: 'column',
                    data: barLoPowerValue,
                    stack:'time'
                },
                {
                    name: '停机时间',
                    color:'#FF6124',
                    type: 'column',
                    data: barLoPowerValue,
                    stack:'time'
                },
                {
                    name: 'PBA',
                    type: 'line',
                    color:'#0000ff',
                    data: barLdpowerValue
                },

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
