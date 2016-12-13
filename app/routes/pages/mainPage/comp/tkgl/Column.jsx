import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

<<<<<<< HEAD
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
=======
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
<<<<<<< HEAD
=======
        let {model,tabaleData} = this.props;
        if (model&&tabaleData){
        var arr1 = [];
        var arr2=[];
        var arr3=[];
        let ssg1 = tabaleData.ModelData;
        let ssg2=model.Model.ens;
        for(let x in ssg1){
            (!x[6]&&x[5])&&arr1.push(ssg1[x].Capacity/1000);
        }
        for(let x in ssg1){
            (!x[6]&&x[5])&&arr2.push((ssg1[x].Transformer_P/1000).toFixed(0)/1);
        }
        for(let x in ssg2){
            (!x[6]&&x[5])&&arr3.push(ssg2[x].name);
        }
        }
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
        let configPie = {
            chart: {
                type: 'column',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '升压站负荷概览',
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"Microsoft YaHei"
                }
            },
<<<<<<< HEAD
            tooltip: {headerFormat:'<span style="font-size: 20px;">{series.name}</span>',
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>",
=======
            tooltip: {
                valueSuffix:'MW',
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                style:{
                    color: '#333',
                    fontSize: '13px',
                    fontFamily:'微软雅黑'
                }
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'15px'  //字体
                    }
                },
                categories: arr3
<<<<<<< HEAD
=======
            },
            yAxis: {
                title:{
                    text:''
                }
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#37545c', '#32c5cd']
            ,
            plotOptions: {
                series: {
                    pointWidth: 40,
                    grouping: false,
                    borderRadius: 10,
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
                align:"right",
                verticalAlign: "top",
                y:-10,
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            series: [{
<<<<<<< HEAD
                name: '<span style="color:#fff;font-size: 18px">装机容量</span>',
                data: arr1
            },{
                name: '<span style="color:#fff;font-size: 18px">负荷</span>',
=======
                name: '装机容量',
                data: arr1
            },{
                name: '负荷',
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                data: arr2
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
