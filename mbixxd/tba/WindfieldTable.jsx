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
                height:400,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: '11月份1区域各风场TBA',
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
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"18px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑",
                }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
           
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '100%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false
                    }
                },
                bar:{
                    animation: true
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    stacking: 'normal',
                    pointWidth: 15,
                }
            },
          colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31', '#EB6B34','#2623FF'],
              // 插入图片
          labels:{
             items:[{
                 html:"<div>123</div>",
                 style:{
                    left:"-40px",
                    top:'-35px',
                    color:'red',
                    fontSize:'30px',
                 }
                
             }]

          },
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
               // lineWidth: 1,
               // lineColor: "red",
                //tickWidth: 4,
            //     labels: {
            //         y: 10, //x轴刻度往下移动20px
            //         style: {
            //             color: '#fff',//颜色
            //             fontSize:'14px'  //字体
            //         }
            //     },
            // },
            series: [{
                name: '实际发电量',
                type: 'column',
                data: windProfit
            },
            {
            	name: '四',
                type: 'column',
                data: windCost,
                color:'#EB6B34',
                stack:'waste'
            },
                {
                    name: '大',
                    type: 'column',
                    data: windCost,
                    stack:'waste'
                },
                {
                    name: '成',
                    type: 'column',
                    data: windCost,
                    stack:'waste'
                },
                {
                    name: '本',
                    type: 'column',
                    data: windCost,
                    stack:'waste'
                },{
                    name:'TBA',
                    type:'line',
                    data:[80,30,3,36,70,70,70,70,80,80,80,80],
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
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
