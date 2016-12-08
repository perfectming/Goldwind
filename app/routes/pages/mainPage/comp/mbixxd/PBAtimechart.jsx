import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');
let winss=data.areaPlanDayY;
let fanCost=data.fanCost;
let fanCostA=data.fanCostA;
let fanCostB=data.fanCostB;
let fanCostC=data.fanCostC;
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {monthT,profit,cost,w0,winsss,changedata3,machine,fanProfitQ,fanCost,}=this.props;
        let configPie = {
            chart: {
                height:395,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
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
            colors: [ '#1E664A', '#4CDB9D']
            ,
            plotOptions: {

                column: {
                    pointPadding: 10,
                    pointWidth: 50,
                    borderRadius: 3,
                    stacking:'nomal',

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                           w0=e.point.category;
                        var  a=w0.toString().split("");
                        var b=a[0];
                        changedata3(w0,winss,b);
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
                categories:monthT,
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
                text:'(kWh)',
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
                text: 'PBA%',
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
                name: '实际发电量',
                type: 'column',
                data: profit,
                color:'#33BAC0',
                shadow:true,
                pointWidth: 30,
                borderWidth: 0,
                pointPlacement: 0,
            },
                {
                    name: '故障损失',
                    type: 'column',
                    color:'#FC794E',
                    data: fanCost,
                    stack:'waste',
                     pointWidth: 30,
                     borderRadius: 3,
                     color:'#5298d3',
                     pointPlacement:-0.07,
                },
                {
                    name: '维护损失',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                     pointWidth: 30,
                    color:'#ffffff',
                    pointPlacement:-0.07,
                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                    color:'#e9c75c',
                     pointWidth: 30,
                     pointPlacement:-0.07,
                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: fanCost,
                    stack:'waste',
                     pointWidth: 30,
                    color:'#d06960',
                    pointPlacement:-0.07,
                },
                {
                    name: 'PBA',
                    type: 'line',
                    data:cost,
                    color:'blue',
                    pointWidth: 15,
                    shadow:'true',
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
        winsss: state.vars.wins1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata3 :(w0,winss,b)=>{
            dispatch(actions.setVars('w1',w0 ));
            dispatch(actions.setVars('wins1',winss[b-1]));
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);