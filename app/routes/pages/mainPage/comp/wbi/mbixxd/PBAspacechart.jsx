import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-dataq');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {

 let {borderRadius,pointPlacement,pointWidth,ty,text,machine,fanProfitQ,fanCost,fanCostA,fanCostB,fanCostC,PBA,height,width}=this.props;

        let configPie = {
            chart: {
                height:height,
                width:width,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,

            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                vertical:'top',
                x : "0",
                y:20,
                style:{
                    color:"#fff",
                    fontSize:"15px",
                    fontFamily:"微软雅黑",
                    fontWeight:700,
                }
            },
            // 插入图片
            //图例说明
            legend: {
                x:-75,
                y:ty,
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
                valueSuffix:'kWh'
            },
            credits: {
                enabled: false
            },
            //柱子颜色
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31', '#EB6B34','#2623FF'],

            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                    pointPadding: 10,
                   stacking:'nomal',
                    

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                        
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
                categories:machine,
            },
           yAxis: [{
            labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text:'（kWh）',
                align:'high',
                rotation:'0',
                y: -20,
                x: 50,
                style:{
                    fontSize:'14px',
                    color:'#fff'
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
                minRange:100,

            title: {
                text: '100%',
                 align:'high',
                rotation:'0',
                y: -15,
                x: -40,
                style:{
                    color: '#fff',
                    fontSize:'14px'
                }

            },
            opposite: true
        }],
            //几条数据
            series: [{
                name: '实际发电量',
                type: 'column',
                data: fanProfitQ,
                color:'#33BAC0',
                shadow:true,
                pointWidth: pointWidth,
                borderWidth: 0,
                borderRadius: borderRadius,
            },
                {
                    name: '故障损失',
                    type: 'column',
                    color:'#FC794E',
                    data: fanCost,
                    stack:'waste',
                    pointWidth: pointWidth,
                    borderRadius: borderRadius,
                     color:'#5298d3',
                    pointPlacement:pointPlacement,
                },
                {
                    name: '维护损失',
                    type: 'column',
                    data: fanCostA,
                    stack:'waste',
                    pointWidth: pointWidth,
                    color:'#ffffff',
                    pointPlacement:pointPlacement,
                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: fanCostB,
                    stack:'waste',
                    color:'#e9c75c',
                    pointWidth: pointWidth,
                    pointPlacement:pointPlacement,
                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: fanCostC,
                    stack:'waste',
                    pointWidth: pointWidth,
                    color:'#d06960',
                    pointPlacement:pointPlacement,
                },
                {
                    name: 'PBA',
                    type: 'line',
                    data: PBA,
                    color:'blue',
                    yAxis:1,
                     tooltip: {
               valueSuffix:'%'
            },
                    
                },
                ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);