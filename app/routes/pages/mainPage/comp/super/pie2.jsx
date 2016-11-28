import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {

        let{color,num}=this.props;

        
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:136
            },
            title: {
                text: ''
            },
            legend:{
                enabled: false
            },
            
            tooltip: {
                enabled: false,
                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                //pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [num],
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '110%',
                    innerSize: '70%',
                    dataLabels: {
                        enabled: false,
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
                data: [1],
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
