import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {windFiled,windCost,windProfit,w111,changedata1}=this.props;
        let configPie = {
            chart: {
                height:370,
                width:850,
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
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#70c080'],
            plotOptions: {

                bar:{
                    animation: true
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                    borderRadius: 4,
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                               w111=e.point.category;
                        var  a=w111.toString().split("");
                        var b=a[0];
                        changedata1(w111,b);
                        }
                    }
                }

            },
              // 插入图片
         
            xAxis: {
                lineWidth: 1,
               //lineColor: "red",
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:windFiled,
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
                text:'100%',
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
                data: windProfit,
                pointPlacement:0,
            },
            {
            	name: '收益成本',
                type: 'column',
                data: windCost,
                pointPlacement: -0.06,
            },
                {
                    name:'TBA',
                    type:'line',
                    color:'blue',
                    data:[2,6,7,9,12,6,2,6,7,9,12,6,],
                    yAxis:1
                }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
         w111 : state.vars.w12,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata1 :(w111,b)=>{
            dispatch(actions.setVars('w12',w111)); 
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
