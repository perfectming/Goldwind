import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/RegulationData');
let mod = require('../../../../../../config/Model');
let arr1 = [];
let arr2=[];
let arr3=[];
let ssg1 = data.ModelData;
let ssg2=mod.Model.ens;
(function(){
    for(let x in ssg1){
        arr1.push(ssg1[x].Capacity/1);
    }}());
arr1.splice(-2,2);
(function(){
    for(let x in ssg1){
        arr2.push((ssg1[x].Transformer_P/1).toFixed(0)/1);
    }}());
arr2.splice(-2,2);
(function(){
    for(let x in ssg2){
        arr3.push(ssg2[x].name);
    }}());
arr3.splice(-2,2);
let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{czname,unit,czgzss,czwhss,czxdss}=this.props;
        let configPie = {
            chart: {
                type: 'column',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:270,
                marginTop: 60,
                marginBottom:50,
                marginLeft:55,
            },
            title: {
                text: '',
                style:{
                    color:"#fff",
                    fontSize:"24px",
                    fontFamily:"Microsoft YaHei"
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'12px'  //字体
                    },
                    rotation: 0
                },
                tickLength: 0,
                categories: czname
            },
            yAxis: {
                title: {
                    text:  '('+unit+')',
                    style: {
                        color: '#ffffff'
                    },
                    align: 'high',
                    rotation: 1,
                    y: -5,
                    x: 86
                },
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'12px'  //字体
                    }
                },
                lineWidth: 1,
                gridLineWidth: 0
            },
            legend: {
                itemHoverStyle:{color:'#2ff4fb'},
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    //fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
                y:-18,
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            tooltip: {
                shared: true,
            },
            plotOptions: {
                column: {
                    maxPointWidth:25,
                    stacking: 'normal',//柱状图堆叠
                    borderWidth: 0
                }
            },
            colors: ['#37545C','#32C5CD','#D06960']
            ,
            series: [{
                name:'故障损失',
                data: czgzss,
                borderRadius: 5,
                tooltip: {
                    valueSuffix: unit
                }
            },{
                name:'维护损失',
                data: czwhss,
                borderRadius: 5,
                tooltip: {
                    valueSuffix: unit
                }
            },{
                name:'限电损失',
                data: czxdss,
                borderRadius: 5,
                tooltip: {
                    valueSuffix: unit
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
        init: () => {},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
