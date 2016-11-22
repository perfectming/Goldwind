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
                marginLeft:40,
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
                categories: ['十一月','十二月','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月']
            },
            yAxis: {
                title: {
                    text: '(万kMw)',
                    align: 'high',
                    rotation: 1,
                    y: -5,
                    x: 86
                },
                lineWidth: 1,
                gridLineWidth: 0
            },
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    //fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
                y:-15,
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
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
                data: [300,320,360,330,260,380,290,320,360,340,280,340],
                borderRadius: 5
            },{
                name:'实际发电量',
                type: 'column',
                data: [350,300,280,310,250,300,280,320,340,300,200,320],
                borderRadius: 5
            },{
                name:'场站完成率',
                type: 'line',
                data: [200,200,200,200,200,200,200,200,200,200,200,200]
            },{
                name:'公司完成率',
                type: 'line',
                data: [200,150,250,180,260,100,220,250,180,190,200,180]
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