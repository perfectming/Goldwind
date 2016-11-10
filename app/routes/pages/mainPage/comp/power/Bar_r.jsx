import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/chart-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let barRo = data.data.bar_ro;
        let barRt= data.data.bar_rt;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
            },
            title: {
                text: '准确率和合格率'
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#4CDB9D', '#1E664A', '#134833', '#082B1F','#000']
            ,
            plotOptions: {
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
            textStyle: {
                color: '#fff',
                fontSize: 28,
            },
            xAxis: {
                categories: ["环境原因","故障停机","电网停机","其他停机","人工停机","例行维护原因"]
            },
            //yAxis: {
                //categories: [0.2,0.4,0.6,0.8,0.10,0.12]
            //},
            series: [{
                name: '发生次数',
                type: 'column',
                data: barRo
            },{
                name: '状态时长(s)',
                type: 'column',
                data: barRt
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
