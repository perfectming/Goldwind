import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {

      let {machine,fanProfit,fanCost,fanCost1,fanCost2,fanCost3,TBA,height,width}=this.props;
        let configPie = {
            chart: {
                height:height,
                width:width,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
               
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
                 x:-75,
                align:"right",
                verticalAlign: "top",
                itemHoverStyle:{
                    color:'#31f3fb',
                },
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑",

                }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
               
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            //柱子颜色
                colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31','#EB6B34'],

            // 柱子宽 柱子间隔 柱子边框；
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

            xAxis: {
                lineWidth: 1,
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
             yAxis:
                [{labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                    title:{
                        text:'(KWH)',
                        align:'high',
                        rotation:'0',
                        y: -17,
                        x: 45,
                        style:{
                            color:'#fff',
                            fontSize:'14px'
                        }
                    }
                }, {
                    labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text: 'TBA%',
                align:'high',
                rotation:'0',
                 y: -17,
                x: -40,
                style:{
                    color:'#fff',
                    fontSize:'14px'
                }
            },
            opposite: true
        }],
            //几条数据
            series: [{
                name: '实际发电量',
                type: 'column',
                data: fanProfit,
                borderRadius: 4,
            },
            {
                name: '四',
                type: 'column',
                data: fanCost,
                stack:'waste',
                borderRadius: 2,
            },
                {
                    name: '大',
                    type: 'column',
                    data: fanCost1,
                    stack:'waste',
                },
                {
                    name: '类',
                    type: 'column',
                    data: fanCost2,
                    stack:'waste',
                },
                {
                    name: '损失发电量',
                    type: 'column',
                    data: fanCost3,
                    stack:'waste',
                },
                {
                    name: 'TBA',
                    type: 'line',
                    data: [20,40,50,20,20,60,60,80,70,50,34,99],
                    color:'blue',
                    yAxis:1

                },]
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