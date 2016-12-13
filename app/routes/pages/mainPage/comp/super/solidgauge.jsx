<<<<<<< HEAD
import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/chart-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let doughnutValue = data.data.pie;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:300
            },
            title: {
                text: ''
            },
            tooltip: {
                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                //pointFormat: "<b>{point.percentage:.0f}%</b>"
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
                        format: '{point.name}',
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
                name: "发电量占比",
                data: doughnutValue,
                style: {     fontSize:"20px",  } 
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
=======
import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/chart-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let doughnutValue = data.data.pie;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:300
            },
            title: {
                text: ''
            },
            tooltip: {
                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                //pointFormat: "<b>{point.percentage:.0f}%</b>"
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
                        format: '{point.name}',
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
                name: "发电量占比",
                data: doughnutValue,
                style: {     fontSize:"20px",  } 
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
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
