import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{date, datename,height}=this.props;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:height,

            },
            title: {
                text: ''
            },
            xAxis:{
                 categories:datename,
                 
                 labels: {
                        style: {
                            color: '#fff',//颜色
                            fontFamily:"微软雅黑"

                        }
                }
            },
             yAxis:{
                title:{
                    enabled:false
                }
                 
            },
            legend:{
                enabled:false
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                 pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#2faab2', '#0f0',]
            ,
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '80%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false
                    },
                 
                }
            },
            series: [{
                type:'spline',
                name: "",
                data: date,
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
