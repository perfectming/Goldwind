import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data3');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{windFiled,windCost,windProfit,w0,TBA}=this.props;
        let configPie = {
            chart: {
                height:430,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
            },
            title: {
                text:w0+'每日TBA',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    
                }
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                x:-75,
                y:10,
                
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
            plotOptions: {
                column: {
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
                categories:windFiled,
            },
            yAxis:
                [{labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                    title:{
                        text:'(h)',
                        align:'high',
                        rotation:'0',
                        y: -15,
                        x: 40,
                        style:{
                            fontSize:'14px',
                            color:'#fff'
                        }
                    }
                }, {
                    labels: {
               
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                 minRange: 100,

            title: {
                text: '100%',
                align:'high',
                rotation:'0',
               y:-15,
               x:-40,
                style:{
                    color:'#fff',
                    fontSize:'14px'
                }
            },
            opposite: true
        }],
            series: [{
                name: '运行时间',
                type: 'column',
                data: windProfit,
                maxPointWidth:20,
                borderRadius:4,
            },
                {
                    name: '停机时间',
                    type: 'column',
                    data: windCost,
                    color:'#ccc',
                     maxPointWidth:20,
                     borderRadius:4,
                },{
                    name:'TBA',
                    type:'line',
                    data:TBA,
                    yAxis:1,
                    
                    color:'blue',
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
    return {
         w0 : state.vars.qwe,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
