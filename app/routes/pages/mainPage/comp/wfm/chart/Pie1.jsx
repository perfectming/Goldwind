import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../../config/chart-data');

let Component = React.createClass({
    componentWillMount() {

    },

    render() {
        let{arrname1,num1,unit,lettercolor}=this.props;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:270
            },
            title: {
                text: ''
            },

            categories:arrname1,

            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>数值：<b>{point.y}</b><h6 style="font-size:12px">{unit}</h6>'

                // pointFormat: '{point.name}:<b>{point.percentage:.1f}%</b>',
                // pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#07a3ff', '#3bf182', '#ddcde6','#856ffe', '#f7b552', '#31f3fb', '#fb8071', '#cfa972','#ff7800','#81511c']
            ,
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '60%',
                    innerSize: '40%',
                    dataLabels: {
                        distance: 15,
                        enabled: true,
                        format: '{point.name}:<b>{point.percentage:.1f}%</b>',
                        style: {
                            color: lettercolor,
                            fontSize: '14px',
                            fontFamily:"微软雅黑",

                        },

                    },

                }
            },
            series: [{
                type: 'pie',
                name: "场站容量",
                data: num1,
                style: {     fontSize:"20px",  },
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
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
