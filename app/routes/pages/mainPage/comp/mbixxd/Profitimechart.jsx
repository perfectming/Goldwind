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
        let areaPlanDay=data.areaPlanDay;
        let areaPlanDayT=data.areaPlanDayT;
        let fanCost=data.fanCost;
        let machine=data.machine;
        let fanProfitQ=data.fanProfitQ;

        let configPie = {
            chart: {
                height:500,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: '',
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
            // 插入图片
            //图例说明
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
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            //柱子颜色
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31', '#EB6B34','#2623FF'],

            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                    pointPadding: 10,
                    stacking:'nomal',
                    pointWidth: 50,

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
                categories:machine,
            },
            yAxis: [{
                title: {
                    text: ''
                }
            }, {
                title: {
                    text: ''
                },
                opposite: true
            }],
            //几条数据
            series: [{
                name: '实际发电量收益',
                type: 'column',
                data: fanProfitQ,
                color:'#64DC83',
                shadow:true,
                pointWidth: 30,
                borderWidth: 0,
            },
                {
                    name: '四',
                    type: 'column',
                    color:'#FC794E',
                    data: fanCost,
                    stack:'waste',
                    pointWidth: 30,
                },
                
                {
                    name: 'TBA',
                    type: 'line',
                    data: fanCost,
                    color:'blue',
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