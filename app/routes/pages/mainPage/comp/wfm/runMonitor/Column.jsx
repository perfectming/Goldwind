import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var {getState} = require('redux/store');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {model,tabaleData,lettercolor} = this.props;
        if (model&&model.Model&&tabaleData.ModelData[150801]){
        var arr = [];
        var arr1 = [];
        var arr2=[];
        var arr3=[];
        let ssg1 = tabaleData.ModelData;
        let ssg2=model.Model.ens;
        for(let x in ssg2){
            ssg2[x].det=='TransSubstation' && arr.push(x);
        }
        for(let x in ssg1){
            (!x[6]&&x[5])&&arr1.push(ssg1[x].Capacity/1000);
        }
        for(let x=0;x<arr.length;x++){
            if(ssg2[arr[x]].cis==='150801'){
                arr2.push((ssg1['150801301'].Transformer_P_BMCJGF/1).toFixed(0)/1);
            }else if(ssg2[arr[x]].cis==='150811'){
                arr2.push((ssg1['150801301'].Transformer_P/1-ssg1['150801301'].Transformer_P_BMCJGF/1).toFixed(0)/1);
            }else {
                arr2.push((ssg1[arr[x]].Transformer_P / 1).toFixed(0) / 1);
            }
        }
        for(let x in ssg2){
            (!x[6]&&x[5])&&arr3.push(ssg2[x].name);
        }
        }
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
                    color:lettercolor,
                    fontSize:"16px",
                    fontFamily:"Microsoft YaHei"
                }
            },
            tooltip: {
                valueSuffix:'MW',
                style:{
                    color: '#000',
                    fontSize: '13px',
                    fontFamily:'微软雅黑'
                }
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            xAxis: {
                labels: {
                    style: {
                        color: lettercolor,//颜色
                        fontSize:'15px'  //字体
                    }
                },
                categories: arr3
            },
            yAxis: {
                title:{
                    text:''
                }
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#607F87', '#32c5cd']
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
                itemHoverStyle:{color:'#2ff4fb'},
                align:"right",
                verticalAlign: "top",
                y:-10,
                itemStyle: {
                    color: lettercolor,
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            series: [{
                name: '装机容量',
                data: arr1
            },{
                name: '负荷',
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
