import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {pointPlacement,borderRadius,pointWidth,ty,TBA,text,fanCost,machine,fanProfitQ,width,height}=this.props;
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
                    fontSize:"16px",
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
                 valueSuffix:'h'
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
            yAxis: [
            {
                labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            },
             gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',


            title: {
                text:'（h）',
                align:'high',
                rotation:'0',
                y: -20,
                x: 35,
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
                max:100,

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
            series: [{
                name: '运行时间',
                type: 'column',
                data: fanProfitQ,
                color:'#33BAC0',
                shadow:true,
                pointWidth: pointWidth,
                borderWidth: 0, 
                borderRadius:borderRadius,
                pointPlacement:0

            },
                {
                    name: '停机时间',
                    type: 'column',
                    color:'#5298d3',
                    data: fanCost,
                    stack:'waste',
                    pointWidth: pointWidth,
                    borderRadius: borderRadius,
                    color:'#FFFFFF',
                    pointPlacement:pointPlacement,
                },
                {
                    name: 'TBA',
                    type: 'line',
                    data: TBA,
                    color:'blue',
                    opposite:true,
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
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);