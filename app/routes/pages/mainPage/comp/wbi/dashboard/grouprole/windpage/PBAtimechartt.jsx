import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./../group/Profit-data3');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {width,areaPlanDay,areaPlan,areaPlanDayT,fanCost,fanCostA,fanCostB,fanCostC}=this.props;
        let configPie = {
            chart: {
                height:395,
            
                 backgroundColor: "rgba(44, 61, 71,0)",
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
               
                }
            },
            // 插入图片
            //图例说明
            legend: {
                x:-75,
                y:20,
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

            colors: [ '#1E664A', '#4CDB9D'],

            plotOptions: {
                column: {
                    
                    stacking:'nomal',
                    borderWidth:0,

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
                categories:areaPlan,
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
                text:'(kWh)',
                align:'high',
                rotation:'0',
                y: -20,
                x: 46,
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
                text: '(%)',
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
                data: areaPlanDay,
                color:'#33BAC0',
                maxPointWidth: 20,
                 borderRadius:3,
            },
             {
                    name: '故障损失',
                    type: 'column',
                    color:'#FC794E',
                    data: fanCost,
                    stack:'waste',
                     maxPointWidth: 20,
                     borderRadius: 3,
                     color:'#5298d3',

                     
                },
                {
                    name: '维护损失',
                    type: 'column',
                    data: fanCostA,
                    stack:'waste',
                    maxPointWidth: 20,
                    color:'#ffffff',
                     borderRadius:3,
                    
                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: fanCostB,
                    stack:'waste',
                    color:'#e9c75c',
                     maxPointWidth: 20,
                      borderRadius:3,
                     
                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: fanCostC,
                    stack:'waste',
                   maxPointWidth: 20,
                    color:'#d06960',
                     borderRadius:3,
                    
                },
           {
                    name: 'PBA',
                    type: 'line',
                    data:areaPlanDayT,
                    color:'blue',
                    yAxis:1,
                     tooltip: {
               valueSuffix:'%'
            },
                   
                }

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