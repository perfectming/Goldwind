import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./../group/Profit-data3');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        
        let {height,text1,w0,areaName,areaRecordCost,areaRecordProfit,machine,areaPlanDay,areaPlan}=this.props;
        let configPie = {
            chart: {
                height:height,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                
            },
            title: {
                text: text1,
                align:'left',
                top:'-20px',
                vertical:'top',
                x:90,
                y:14,
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                  
                }
            },
            legend: {
                y:30,
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
            colors: [ '#1E664A', '#4CDB9D']
            ,
            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                   
                    borderWidth: 0,
                    maxPointWidth: 20,
                    borderRadius: 7,
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
                text:'(°H)',
                align:'high',
                rotation:'0',
                y: -20,
                x: 35,
                style:{
                    color:'#fff',
                    fontSize:'14px'
                }
            }
        }, {
             gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text: '',
                 align:'high',
                rotation:'0',
                y: -20,
                x: 40,

            },
            opposite: true
        }],

            series: [{
                name: '健康度',
                type: 'column',
                data: areaPlanDay,
                color:'#4CDB9D',
                  tooltip: {
               valueSuffix:'°H'
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
        w0 : state.vars.w1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('w1',w0 ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);