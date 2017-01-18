import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-dataq');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let{areaRecordCostT,areaRecordProfitO,rate,text,areaPlan,areaPlanDay, areaPlanDayT,width,height,areaNameX,areaRecordCost,data,scolor}=this.props;
     
        let configPie = {
            chart: {
                height:height,
                width:width,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                vertical:'top',
                x: 105,
                y: 14,
                style:{
                    color:scolor,
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    
                }
            },
            // 插入图片
            //图例说明
            legend: {
                y:40,
                x:-75,
                align:"right",
                verticalAlign: "top",
                 itemHoverStyle:{
                    color:'#31f3fb',
                },
                itemStyle: {
                    color: scolor,
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
            colors: [ '#1E664A', '#4CDB9D']
            ,
            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                  
                    borderWidth: 0,

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
                        fontSize:'14px',
                        color:scolor  //字体
                    }
                },
                categories:areaNameX,
            },
              yAxis: [{
            labels: {
                format: '',
                style: {
                    color: scolor,
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',


            title: {
                text:'（元）',
                align:'high',
                rotation:'0',
                y: -20,
                x:45,
                style:{
                    fontSize:'14px',
                    color:scolor
                }
            }
        }, {
             labels: {
                format: '',
                style: {
                    color: scolor,
                    fontSize:'14px'
                }
            },
             gridLineDashStyle: 'Solid',
            gridLineColor: '#6d6a6c',
           tickInterval: 20,
            minRange: 20,
                
            title: {
                text: '(%)',
                align:'high',
                rotation:'0',
                y: -15,
                x: -45,
                style:{
                    color: scolor,
                    fontSize:'14px'
                }

            },
            
            opposite: true
        }],
            //几条数据
            series: [{
                name: '收入',
                type: 'column',
                data: areaRecordCostT,
                color:'#33BAC0',
                borderColor:'#5B9BD5',
              maxPointWidth: 20,
                borderRadius: 3
            },
            {
            	name: '成本',
                type: 'column',
                data:areaRecordProfitO,
               color:'#70c080',
                maxPointWidth: 20,
               
                borderRadius: 3
            },
            {
                    name:"收益率",
                    type:'line',
                    color:'blue',
                    data:rate,
                    yAxis:1,
                    tickInterval: 1,
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