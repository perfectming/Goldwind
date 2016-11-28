import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let areaName=data.areaName;
        let areaRecordCost=data.areaRecordCost;
        let areaPlan=data.areaPlan;
        let monthT=data.monthT;
        let profit=data.windProfit;
        let cost=data.windCost;

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
                text: '每月PBA',
                align:'left',
                top:'-20px',
                vertical:'top',
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
            //柱子颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            plotOptions: {
                column: {
                    pointPadding: 10,
                    pointWidth: 50,

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
                categories:monthT,
            },
            yAxis:[{
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            },
            opposite: true
        }],

            series: [{
                name: '实际运行时间',
                type: 'column',
                data: profit,
                color:'#64DC83',
                shadow:true,
                pointWidth: 25,
                borderWidth: 0,
            },
                {
                    name: '停机时间',
                    type: 'column',
                    data:cost,
                    color:'#ccc',
                    pointWidth: 25,
                    shadow:'true',
                },
                {
                    name: 'TBA',
                    type: 'line',
                    data:cost,
                    color:'blue',
                    pointWidth: 15,
                    shadow:'true',
                    opposite:true,
                    yAxis:1
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