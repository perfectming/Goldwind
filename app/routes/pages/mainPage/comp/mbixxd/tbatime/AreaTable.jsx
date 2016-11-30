import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {areaNamee,areaRecordCostss,areaRecordProfitt,text}=this.props;
        let configPie = {
            chart: {
                height:405,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
            },
            title: {
                text: '风场TBA',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                     fontWeight:700,
                }
            },
            legend: {
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
                    itemMarginBottom: 100,
                    enabled: false,

                }
            },
            tooltip: {
            
            },
            credits: {
                enabled: false
            },
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31','#EB6B34'],
            plotOptions: {
                column: {
                    pointPadding:0,
                    borderWidth: 0,
                    pointWidth:30,
                    borderRadius: 7,
                    stacking: 'normal',
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
                labels: {
                    y: 20,
                    style: {
                        color: '#fff',
                        fontSize:'14px'
                    }
                },
                categories:areaNamee,
            },
            yAxis:  [{
                labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            },
                    title:{
                        text:'100%',
                        align:'high',
                        rotation:'0',
                        y: -10,
                        x: 47,
                        style:{
                            color:'#fff',
                            fontSize:'14px'
                        }
                    }
                }, {
                    labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            },
            title: {
                text: '',
                align:'high',
                rotation:'0',
                 y: -17,
                x: 150,
            },
            opposite: true
        }],
            series: [{
                name: '停机时间',
                type: 'column',
                data: areaRecordProfitt,
               
            },
            {
            	name: '实际运行时间',
                type: 'column',
                data: areaRecordCostss,
                stack:'first',
                color:'#ccc',
                
            },

                {
                    name: 'TBA',
                    type: 'line',
                    data: areaRecordCostss,
                    stack:'first',
                    color:'blue',
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