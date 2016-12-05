import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let data = require('./Profit-data');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {

        let {areaName,areaRecordCosts,areaRecordProfit,text0,w0,changedata1}=this.props;
        let configPie = {
            chart: {
                height:360,
                width:1763,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
               

            },
            title: {
                text:'',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                     fontWeight:700,
                }
            },
            legend: {
                x:-75,
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
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31','#EB6B34'],
              plotOptions: {
                column: {
                    pointPadding:0,
                    borderWidth: 0,
                    pointWidth:30,
                    stacking: 'normal',
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                        w0=e.point.category;
                        var  a=w0.toString().split("");
                        var b=a[0];
                        changedata1(w0,b);
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
                categories:areaName,
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
                        text:'(KWH)',
                        align:'high',
                        rotation:'0',
                        y: -17,
                        x: 50,
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

            title: {
                text: 'TBA%',
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
                name: '实际发电量',
                type: 'column',
                data: areaRecordProfit,
                borderRadius: 7,
            },
            {
                name: '四',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
                borderRadius: 2,
            },
            {
                name: '大',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
            {
                name: '类',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
            },
            {
                name: '损失发电量',
                type: 'column',
                data: areaRecordCosts,
                stack:'first',
                borderRadius: 2,
            },
                {
                    name: 'TBA',
                    type: 'line',
                    data: areaRecordCosts,
                    stack:'first',
                    color:'blue',
                    yAxis:1,
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
        wins: state.vars.wins1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata1 :(w0,b)=>{
            dispatch(actions.setVars('w1',w0)); 
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);