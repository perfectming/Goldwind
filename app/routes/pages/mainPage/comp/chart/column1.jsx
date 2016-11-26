import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighstock = require('react-highcharts/bundle/ReactHighstock.src');


let base = require('../../../../../../config/Model');
let data = require('../../../../../../config/ModelData');
let dat = data.ModelData;
let bas = base.Model.ens;
let arr=[];
let nam=[];
(function(){
    for(let i in dat){
    arr.push(dat[i].YearEgyAt/dat[i].YearPlanTotEgyAt);

    }
    arr.sort(function(a, b){return (a < b) ? 1 : -1})
})();
arr.pop();
(function(){

    for(let i in bas){
    nam.push(bas[i].name);
    }

})();
nam.pop();





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
                height:300,
                marginLeft:50,
            },
            title: {
                text: ''
            },
             scrollbar: {
            barBackgroundColor: 'gray',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'gray',
            buttonBorderWidth: 0,
            buttonArrowColor: '#2ff4fb',
            buttonBorderRadius: 7,
            rifleColor: '#2ff4fb',
            trackBackgroundColor: '#30343f',
            trackBorderWidth: 1,
            trackBorderColor: 'silver',
            trackBorderRadius: 7
        },
             xAxis: {

                tickInterval: 1,
                max:5,

                categories: nam,
                 labels: {

                       rotation: 0,
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            color: '#fff',//颜色
                            fontSize:'14px',  //字体
                            fontFamily:"微软雅黑"

                        }
                }
            }, 
            yAxis: {  
            tickPixelInterval: 500, 
                    lineWidth:1,
                    //dashStyle:"Dot",
                    tickInterval:0.1,//刻度线间距
                    gridLineWidth: 0,//虚线粗细
                    dashStyles: "ShortDot",//轴线样式：点状线
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
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
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
                data: arr,
            },
             {
                type: 'line',
                color:"#59e481",
                name: "公司发电完成率",
                data: 0,
                 marker: {
                        enabled: false
                       
                    }
            }]
        };
        return (
            <ReactHighstock config={configPie}/>
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
