import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./../group/Profit-data3');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {borderRadius,pointPlacement,areaPlan,ly,text,areaNameX,areaRecordCostT,areaRecordProfitO,pointWidth,width,height,scolor}=this.props;
         
        let configPie = {
            chart: {
                height:height,
                width:width,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                borderRadius:0,
            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                y:20,
                vertical:'top',
                x:120,
                style:{
                    color:scolor,
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    
                }
            },
            // 插入图片
            //图例说明
            legend: {
                y:ly,
                align:"right",
                verticalAlign: "top",
                itemHoverStyle:{
                    color:'#31f3fb',
                },
                navigation:{
                   activeColor: "#fff",
                   inactiveColor: "blue",
                },
                itemStyle: {
                    color: scolor,
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

            plotOptions: {
                column: {
                    borderWidth: 0,

                   maxPointWidth:pointWidth,
                    
                }, series: {
                    cursor: 'pointer',
                }
            },

            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                pointPadding:0,
                labels: {
                    y: 20,
                    style: {
                        color: scolor,//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:areaNameX,
            },
            yAxis:{
                 gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                 title: {
                text:'(kWh)',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 47,
                    style:{
                        color:scolor,
                        fontSize:'14px',
                    }
            },
                  labels: {
                    title:'100%',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color:scolor,
                        fontSize:'14px'  //字体
                    }
                },

            },
            series: [{
                name: '计划发电量',
                type: 'column',
                data: areaRecordProfitO,
                color:'#33BAC0',
                borderRadius: borderRadius,
               
             
            },
            {
            	name: '实际发电量',
                type: 'column',
                data: areaRecordCostT,
                color:'#70c080',
                borderRadius: borderRadius,
                
              
            }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        w0 : state.vars.w1,
        win : state.vars.win1,
        windplan1 : state.vars.windplan1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);