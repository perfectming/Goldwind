import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');
let sqy =data.areaRecordCostQY;
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {areaName,areaRecordCost,areaRecordProfit,TBA,text,w11,changedataq,}=this.props;
        let configPie = {
            chart: {
                height:370,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
               
            },
            title: {
                text: '',
                align:'left',
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
                x:-75,
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
            colors: [ '#33BAC0', '#70c080'],
            
            plotOptions: {
                column: {
                    pointWidth: 25
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            w11=e.point.category;
                        var  a=w11.toString().split("");
                        var b=a[0];
                        changedataq(w11,sqy,b);
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
                text:'100%h',
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
             labels: {
                format: '',
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
                name: '实际收益',
                type: 'column',
                data: areaRecordProfit,
                borderRadius: 7,
                color:'#33BAC0',
                pointPlacement: 0,
                borderWidth:0,
            },
            {
            	name: '收入成本',
                type: 'column',
                data: areaRecordCost,
                borderRadius: 7,
                color:'#70c080',
                pointPlacement: -0.11,
                 borderWidth:0,
            },{
                    name:"TBA",
                    type:'line',
                    color:'blue',
                    data:TBA,
                    yAxis:1,
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
         w11 : state.vars.w1,
         sqy : state.vars.wins1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedataq :(w11,sqy,b)=>{
            dispatch(actions.setVars('w1',w11)); 
            dispatch(actions.setVars('wins1',sqy[b-1]));
            console.log(sqy[b-1])
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);