import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/RegulationData');
let mod = require('../../../../../../config/RegulationModel');
let arr1 = [];
let arr2=[];
let arr3=[];
let ssg1 = data.ModelData;
let ssg2=mod.Model.ens;
for(let x in ssg1){
    arr1.push(ssg1[x].Capacity/1);
}
arr1.splice(-2,2);
for(let x in ssg1){
    arr2.push((ssg1[x].Transformer_P/1).toFixed(0)/1);
}
arr2.splice(-2,2);
for(let x in ssg2){
    arr3.push(ssg2[x].name);
}
arr3.pop();
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
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
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                style:{
                    fontSize:'15px'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'15px'  //字体
                    }
                },
                categories: arr3
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#37545c', '#32c5cd']
            ,
            plotOptions: {
                series: {
                    grouping: false,
                    borderRadius: 20,
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: '<span style="color:#fff;font-size: 18px">装机容量</span>',
                data: arr1
            },{
                name: '<span style="color:#fff;font-size: 18px">负荷</span>',
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
