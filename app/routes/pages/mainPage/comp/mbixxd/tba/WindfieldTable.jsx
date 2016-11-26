import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{ windFiled,areaRecordProfitt,areaRecordCostss,areaRecordCostsS1,areaRecordCostsS2,areaRecordCostsS3,areaRecordCostsS4,text2,}=this.props
        let configPie = {
            chart: {
                height:400,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: text2,
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
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false
            },
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31','#EB6B34'],

            plotOptions: {

                bar:{
                    animation: true
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                    stacking:'normal',
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            alert('X轴的值：'+e.point.category);
                        }
                    }
                }

            },
              // 插入图片
         
            xAxis: {
                lineWidth: 1,

                tickWidth: 0,
                labels: {
                    y: 20,
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:windFiled,
            },
            yAxis: {
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series:  [{
                name: '实际发电量',
                type: 'column',
                data: areaRecordProfitt,
            },
            {
                name: '四',
                type: 'column',
                data: areaRecordCostsS1,
                stack:'first'
            },
            {
                name: '大',
                type: 'column',
                data: areaRecordCostsS2,
                stack:'first',
            },
            {
                name: '损',
                type: 'column',
                data: areaRecordCostsS3,
                stack:'first',
            },
            {
                name: '失',
                type: 'column',
                data: areaRecordCostsS4,
                stack:'first',
            },
                {
                    name: 'TBA',
                    type: 'line',
                    data: areaRecordCostss,
                    stack:'first',
                    color:'blue',
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
