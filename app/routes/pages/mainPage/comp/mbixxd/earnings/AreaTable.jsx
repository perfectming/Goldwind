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
                text: '十月各区域收益率',
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
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false
            },
            //柱子颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            plotOptions: {
                column: {
                    pointWidth: 30
                },
                series: {
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
            yAxis: {
                labels: {
                    y: 10,
                    style: {
                        color: '#fff',
                        fontSize:'14px'
                    }
                },
            },
            series: [{
                name: '实际收益',
                type: 'column',
                data: areaRecordProfit
            },
            {
            	name: '收入成本',
                type: 'column',
                data: areaRecordCost
            },{
                    name:"TBA",
                    type:'line',
                    color:'blue',
                    data:[5,6,6,7,4,5,6,7,7,9,1,9],}
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