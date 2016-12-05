import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {

 let {machine,fanProfitQ,fanCost,fanCostA,fanCostB,fanCostC,PBA,height,width}=this.props;
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
                    pointWidth: 50,

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
                text:'(KWH)',
                align:'high',
                rotation:'0',
                y: -20,
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
                text: '',
                 align:'high',
                rotation:'0',
                y: -20,
                x: 40,
                style:{
                    color:'#fff',
                    fontSize:'14px'
                }

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
                borderRadius: 7,
            },
                {
                    name: '四',
                    type: 'column',
                    color:'#FC794E',
                    data: fanCost,
                    stack:'waste',
                     pointWidth: 30,
                     borderRadius: 3,
                },
                {
                    name: '大',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                     pointWidth: 30,
                    color:'#FD9C31',
                },
                {
                    name: '类',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                    color:'#FFD924',
                     pointWidth: 30,
                },
                {
                    name: '损失发电量',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                     pointWidth: 30,
                    color:'#AACE4A'
                },
                {
                    name: 'PBA',
                    type: 'line',
                    data: PBA,
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