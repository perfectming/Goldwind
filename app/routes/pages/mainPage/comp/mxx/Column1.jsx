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
        let{unit,czname,sjfdl,jhfdl,czwcl,gswcl}=this.props;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:270,
                marginTop: 60,
                marginBottom:45,
                marginLeft:55,
                marginRight:55,
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false //不显示highCharts版权信息
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
            yAxis: [{
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
            },{
                title: {
                    text:  '(%)',
                    style: {
                        color: '#ffffff'
                    },
                    align: 'high',
                    rotation: 1,
                    y:-5,
                    x:-50
                },
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'12px'  //字体
                    }
                },
                lineWidth: 1,
                opposite: true,
                gridLineWidth: 0,
            }],
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
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    pointWidth:25,
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            colors: ['#37545C','#32C5CD','#1fe005','#D06960']
            ,
            series: [{
                name:'计划发电量',
                type: 'column',
                data: jhfdl,
                borderRadius: 5
            },{
                name:'实际发电量',
                type: 'column',
                data: sjfdl,
                borderRadius: 5
            },{
                name:'场站完成率',
                type: 'line',
                data: czwcl,
                yAxis: 1
            },{
                name:'集团完成率',
                type: 'line',
                data: gswcl,
                yAxis: 1
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
