import React from 'react';
import {connect} from 'react-redux';
import icon0 from './167580248.jpg';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let areaName=data.areaName;
        let areaRecordCost=data.areaRecordCost;
        let areaRecordCosts=data.areaRecordCosts;
        let areaRecordProfit=data.areaRecordProfit;
        let configPie = {
            chart: {
                height:300,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: '11月份各风机TBA',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                     fontWeight:700,
                }
            },
            // 插入图片
          labels:{
             items:[{
                 html:"<div>123</div>",
                 style:{
                    left:"-40px",
                    top:'-35px',
                    color:'red',
                    fontSize:'30px',
                    backGround:'red',
                 },
             }],
             style:{
                backGround:'red',
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
                    fontFamily:"微软雅黑",
                    itemMarginBottom: 100,
                    enabled: false,

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
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31','#EB6B34'],
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
                 column: {
                     pointPadding:0,
                stacking: 'normal',
            },
                bar:{
                    animation: true
                }
            },
            plotOptions: {
                column: {
                    pointPadding:0,
                    borderWidth: 0,
                    pointWidth:30,
                    stacking: 'normal',
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
                categories:areaName,
            },
            yAxis: [{
                title:'KWH',
            },{
                title:"TBA"
            }]
               // lineWidth: 1,
               // lineColor: "red",
                //tickWidth: 4,

            ,
            //几条数据
            series: [{
                name: '实际收益',
                type: 'column',
                data: areaRecordProfit
            },
            {
            	name: '收入成本',
                type: 'column',
                data: areaRecordCosts,
                stack:'first'
            },
            {
                name: '收入成本',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
            {
                name: '收入成本',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
            {
                name: '收入成本',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
                {
                    name: 'TBA',
                    type: 'line',
                    data: areaRecordCosts,
                    stack:'first',
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