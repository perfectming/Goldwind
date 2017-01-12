import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');



let Component = React.createClass({
    componentWillMount() {

    },

    render() {
        let{arrname1,num1,unit}=this.props;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:4500,
            },
            title: {
                text: ''
            },

            categories:['研发','实施','研发实施','运维','咨询'],

            tooltip: {
               

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
                        enabled: true,
                        format: '{point.name}:<b>{point.percentage:.1f}%</b>',
                        style: {
                            color: "#d1d2d3",
                            fontSize: '14px',
                            fontFamily:"微软雅黑"

                        },

                    },

                }
            },
            series: [{
                type: 'pie',
                name: "场站容量",
                data: [15,25,30,20,10],
                style: {     fontSize:"20px",  },
                tooltip: {
                
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
