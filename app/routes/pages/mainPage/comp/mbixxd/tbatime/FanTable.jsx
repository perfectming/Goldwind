import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let fan=data.fan;
        let fanCost=data.fanCost;
        let fanProfit=data.fanProfit;
        let configPie = {
            chart: {
                height:340,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
            },
            title: {
                text: '11月1区域1风场各风机TBA',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                    fontWeight:700
                }
            },
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"18px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            tooltip: {
               
            },
            credits: {
                enabled: false
            },
          colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31', '#EB6B34','#2623FF'],

         
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    pointWidth: 15,
                    stacking:'nomal',
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
                categories:fan,
            },
            yAxis: [{
                min:0,
                title:{
                    text:'kwh'
                }
            },
                {
                    title:{
                        text:'TBA',
                    },
                    opposite:true,
                }
            ],

            series: [{
                name: '收入',
                type: 'column',
                data: fanProfit
            },
            {
            	name: '四',
                type: 'column',
                data: fanCost,
                stack:'waste',
            },
                {
                    name: '大',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                },
                {
                    name: '成',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                },
                {
                    name: '本',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                },
                {
                    name: 'TBA',
                    type: 'line',
                    data: [40,50,60,70,80,20,40,50,60,60,70],
                    yAxis:1
                },]
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