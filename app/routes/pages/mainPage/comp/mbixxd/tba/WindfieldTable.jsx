import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {

      let {PBAGroupFirstPba,machine,fanProfit,fanCost,fanCost1,fanCost2,fanCost3,TBA}=this.props;
        
        let configPie = {
            chart: {
                height:370,
                width:1750,
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
              
                 valueSuffix:'kWh'
               
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
                [{
                    labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                    title:{
                        text:'kWh',
                        align:'high',
                        rotation:'0',
                        y: -17,
                        x: 35,
                        style:{
                            color:'#fff',
                            fontSize:'14px'
                        }
                    },
                    
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
                
                text: 'PBA%',
                align:'high',
                rotation:'0',
                 y: -17,
                x: -40,
                style:{
                    fontSize:'14px',
                    color:'#fff'
                }
            },
            opposite: true,

        }],
            //几条数据
            series: [{
                name: '实际发电量',
                type: 'column',
                data: fanProfit,
                borderRadius: 3,
                color:'#33BAC0',
            },
            {
                name: '故障损失',
                type: 'column',
                data: fanCost,
                stack:'waste',
                borderRadius: 3,
                color:'#5298d3',
            },
                {
                    name: '维护损失',
                    type: 'column',
                    data: fanCost1,
                    stack:'waste',
                     color:'#ffffff'
                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: fanCost2,
                    stack:'waste',
                    color:'#e9c75c',
                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: fanCost3,
                    stack:'waste',
                    color:'#d06960'
                },
                {
                    name: 'PBA',
                    type: 'line',
                    data: PBAGroupFirstPba,
                    color:'blue',
                     yAxis:1,
                      tooltip: {
               valueSuffix:'kWh'
            },

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