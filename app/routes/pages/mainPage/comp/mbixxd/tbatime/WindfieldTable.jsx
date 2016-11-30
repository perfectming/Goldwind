import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let windFiled=data.windFiled;
        let windCost=data.windCost;
        let windProfit=data.windProfit;
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
                text: '11月份每日TBA',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                      fontWeight:700,
                }
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
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
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    pointWidth: 15,
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            alert('X轴的值：'+e.point.category);
                        }
                    }
                }
            },
          colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31', '#EB6B34','#2623FF'],  
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
                        y: -15,
                        x: 47,
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
            },
            title: {

                text: '',
                align:'high',
                rotation:'0',
                 y: -10,
                x: 150,
            },
            opposite: true
        }],
            series: [{
                name: '实际发电量',
                type: 'column',
                data: windProfit
            },
                {
                    name: '停机时间',
                    type: 'column',
                    data: windCost,
                    color:'#ccc'
                },{
                    name:'TBA',
                    type:'line',
                    data:[80,30,3,36,70,70,70,70,80,80,80,80],
                    yAxis:1,
                    color:'blue'
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
