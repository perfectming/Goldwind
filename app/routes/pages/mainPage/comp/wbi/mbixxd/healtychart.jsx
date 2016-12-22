import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');



let Component = React.createClass({
    componentWillMount() {
        
    },
    render() {
        let {borderRadius,pointWidth,ty,areaRecordProfit,machineE,width,height,text}=this.props;
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
          
                 x : 90,
                y :20,
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    fontWeight:700,
                }
            },
            legend: {
                y:ty,
                x:-15,
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
            colors: [ '#1E664A', '#4CDB9D'],
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    pointWidth: pointWidth,
                    borderRadius: borderRadius,
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
                categories:machineE,
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
                text:'(100°H)',
                align:'high',
                rotation:'0',
                y: -20,
                x: 45,
                style:{
                    fontSize:'14px',
                    color:'#fff'
                }
            }
        }, {
            title: {
                text: '',
                 align:'high',
                rotation:'0',
                y: -20,
                x: 40,

            },
             gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            opposite: true
        }],
            series: [{
                name: '健康度',
                type: 'column',
                data: areaRecordProfit,
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
          xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);