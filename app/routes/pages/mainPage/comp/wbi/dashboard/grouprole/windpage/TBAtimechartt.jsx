import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let data = require('./../group/Profit-data3');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        
       let {areaPlan,areaPlanDay,areaPlanDayT,height,w0,TBA,text}=this.props;
        let configPie = {
            chart: {
                height:height,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                // paddingLeft:100,
            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                vertical:'top',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                 
                }
            },
            // 插入图片
            //图例说明
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
                valueSuffix:'h'
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
                  
                  
                    borderWidth:0,
                    borderRadius: 4

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
            yAxis: [
            {
                labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            },
             gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text:'(h)',
                align:'high',
                rotation:'0',
                y: -20,
                x: 25,
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
                minRange:100,
                max:100,

            title: {
                text: '(%)',
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
            //几条数据
            series: [{
                name: '运行时间',
                type: 'column',
                data: areaPlanDay,
                color:'#4CDB9D',
               maxPointWidth: 20,
            },
            {
            	name: '停机时间',
                type: 'column',
                data:areaPlanDayT,
                color:'#ccc',
               maxPointWidth: 20,
            },{
                    name: 'TBA',
                    type: 'line',
                    data:TBA,
                    color:'blue',
                     opposite:true,
                    yAxis:1,
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
          w0 : state.vars.monthTD,
    }
   
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);