import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
       
     let{x,lx,adc=2,pointWidth,ly,text,areaRecordCostR,areaRecordProfitR,machine,TBAA,height,pointPlacement,width}=this.props
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
                x:103,
                y:13,
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    
                }
            },
            // 插入图片
            //图例说明
            legend: {
                x:lx,
                y:ly,
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
               valueSuffix:'元'
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            //柱子颜色
             colors: [ '#33BAC0', '#70c080'],
            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                    // pointPadding: 0.1,
                    borderWidth: 0,
                 
                    borderRadius: 4,
                   
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            
                        },

                    }
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
            labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text:'（元）',
                align:'high',
                rotation:'0',
                y: -20,
                x: x,
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
                 minRange: 100,

            title: {
                text: '（%）',
                 align:'high',
                rotation:'0',
                y: -15,
                x: -45,
                style:{
                    color: '#fff',
                    fontSize:'14px'
                }

            },
            opposite: true
        }],

            //几条数据
            series: [{
                name: '收益',
                type: 'column',
                data: areaRecordProfitR,
                
                borderRadius: 4,
               
               maxPointWidth:20,

            },
            {
                name: '成本',
                type: 'column',
                data: areaRecordCostR,
             
                borderRadius: 4,
             
                maxPointWidth:20,
            },
            {
                    name:"收益率",
                    type:'line',
                    color:'blue',
                    data:TBAA,
                    yAxis:1,
                    maxPointWidth:20,
                     tooltip: {
               valueSuffix:'%'
            },
             }]
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