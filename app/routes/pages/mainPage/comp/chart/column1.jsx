import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let base = require('../../../../../../config/Model');
let data = require('../../../../../../config/ModelData');
let dat = data.ModelData;
let bas = base.Model.ens;
let arr=[];
let nam=[];
(function(){for(let i in dat){
    arr.push(dat[i].YearEgyAt/dat[i].YearPlanTotEgyAt);
}})();
arr.pop();
(function(){for(let i in bas){
    nam.push(bas[i].name);
}})();
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
                height:360,
                marginLeft:50,
                overflow:'auto'
            },
            title: {
                text: ''
            },
             xAxis: {

                tickInterval: 1,

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
                    //tickInterval:80,//刻度线间距
                    gridLineWidth: 0,//虚线粗细
                    dashStyles: "ShortDot",//轴线样式：点状线
                    title: {
                        align: 'high',
                        rotation: 0,
                            text: "万(wh)",
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
                    fontSize:16,
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                  }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
           
            colors: ['#59e481', '#339C70', '#1E664A', '#134833', '#082B1F']
            ,
            plotOptions: {
                 column: {
                    borderColor:"",
                    },
                   series: {
                borderRadius: 8//圆角
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
                data: arr,
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
