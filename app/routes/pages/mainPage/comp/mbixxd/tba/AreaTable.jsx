import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let data = require('./Profit-data');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {

        let { areaName,areaRecordCosts,areaRecordProfit,text0}=this.props;
        let configPie = {
            chart: {
                height:390,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: text0,
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                     fontWeight:700,
                }
            },
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"18px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑",

                }
            },
            tooltip: {
               
            },
            credits: {
                enabled: false
            },
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31','#EB6B34'],
              plotOptions: {
                column: {
                    pointPadding:0,
                    borderWidth: 0,
                    pointWidth:30,
                    stacking: 'normal',
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            alert('X轴的值：'+e.point.category);
                        }
                    }
                }

            },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20,
                    style: {
                        color: '#fff',
                        fontSize:'14px'
                    }
                },
                categories:areaName,
            },
            yAxis:
                [{
                    title:{
                        text:'KWH',
                        align:'high',
                        rotation:'0',
                        y: -5,
                        x: 0,
                    }
                }, {
            title: {
                text: 'TBA',
                align:'high',
                rotation:'0',
            },
            opposite: true
        }],
            series: [{
                name: '实际发电量',
                type: 'column',
                data: areaRecordProfit,
            },
            {
                name: '四',
                type: 'column',
                data: areaRecordCosts,
                stack:'first'
            },
            {
                name: '大',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
            {
                name: '损',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
            {
                name: '失发电量',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
                {
                    name: 'TBA',
                    type: 'line',
                    data: areaRecordCosts,
                    stack:'first',
                    color:'blue',
                    yAxis:1,
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