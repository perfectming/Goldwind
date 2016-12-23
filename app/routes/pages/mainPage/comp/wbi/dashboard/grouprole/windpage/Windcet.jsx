import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./../group/Profit-data3');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let{text,areaPlan,areaPlanDay, areaPlanDayT,width,height}=this.props;
     
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
                 x : 120,
                 y:20,
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    
                }
            },
            // 插入图片
            //图例说明
            legend: {
                y:40,
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
                        color:'#fff'  //字体
                    }
                },
                categories:areaPlan,
            },
            yAxis:{
                 gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                 title: {
                text:'(kWh)',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 45,
                    style:{
                        color:'#fff',
                        fontSize:'14px',
                    }
            },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                       color:"#fff",
                        fontSize:'14px'  //字体
                    }
                },
            },
            //几条数据
            series: [{
                name: '计划发电量',
                type: 'column',
                data: areaPlanDay,
                color:'#33BAC0',
                borderColor:'#5B9BD5',
               maxPointWidth: 20,
                borderRadius: 4
            },
            {
            	name: '实际发电量',
                type: 'column',
                data:areaPlanDayT,
               color:'#70c080',
                maxPointWidth: 20,
                borderRadius: 4
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