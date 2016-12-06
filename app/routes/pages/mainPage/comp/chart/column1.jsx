import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');





let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let configPie = {
            chart: {
                type: 'bar',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:320,
                marginTop:60,
            },
            title: {
                text: ''
            },
               xAxis: {

                tickInterval: 1,

                categories: ['华冉','雪湖','小草湖','草湖','大连胡'],
                 labels: {

                       rotation:0,
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            color: '#fff',//颜色
                            fontSize:'14px',  //字体
                            fontFamily:"微软雅黑"

                        }
                }
            }, 
            yAxis: {  
                    lineWidth:1,
                    //dashStyle:"Dot",
                    tickInterval:30,//刻度线间距
                    gridLineWidth: 0,//虚线粗细
                    title: {
                        align: 'high',
                        rotation: 0,
                        text: "%",
                        style:{
                        color: "#fff"
                            },
                        },
                    labels: {
                       
                        rotation: 0,
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            color: '#fff',//颜色
                            fontSize:'14px'  //字体
                            }
                        }
                   },
            legend: {
                enabled: true ,
                align: 'right',
            verticalAlign: 'top',
                  x:0,
                  y:-15,
                  itemStyle:{
                    color: "#fff",
                    fontSize:12,
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                  }
            },
            tooltip: {
                shared:true,
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                //pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            rangeSelector: {
                enabled: false //不显示选项按钮
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
           navigator: {
                enabled: false //不显示滚动条周围的进度
            },

            colors: ['#59e481', '#339C70', '#1E664A', '#134833', '#082B1F']
            ,
            plotOptions: {
                 column: {
                    borderColor:"",
                    },
                   series: {
                borderRadius: 7//圆角
            },
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '100%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [
            {
                type: 'column',
                color:"#33c5cd",
                name: "站场发电完成率",
                data: [129,100,80,60,40],
            },
             {
                type: 'line',
                color:"#59e481",
                name: "公司发电完成率",
                data: [100,100,100,100,100],
                 marker: {
                        enabled: false
                       
                    }
            }]
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
