import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {areaNameX,areaRecordCostT,areaRecordProfitO,colorO,colorT,pointWidth,width,height}=this.props
        let configPie = {
            chart: {
                height:height,
                width:width,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                borderRadius:10
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
                navigation:{
                   activeColor: "#fff",
                   inactiveColor: "blue",
                },
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
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

            colors: [ '#1E664A', '#4CDB9D']
            ,

            plotOptions: {
                column: {
                    pointPadding: 0.05,
                    borderWidth: 0,
                    pointWidth: pointWidth,
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
                pointPadding:0,
                labels: {
                    y: 20,
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:areaNameX,
            },
            yAxis:{
                 gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                 title: {
                text:'',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 40,
                    style:{
                        color:'#fff'
                    }
            },
                  labels: {
                    title:'100%',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color:"white",
                        fontSize:'14px'  //字体
                    }
                },

            },
            series: [{
                name: '计划发电量',
                type: 'column',
                data: areaRecordProfitO,
                color:colorO,
                borderRadius: 7,
             
            },
            {
            	name: '实际发电量',
                type: 'column',
                data: areaRecordCostT,
                color:colorT,
                borderRadius: 7,
              
            }]
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