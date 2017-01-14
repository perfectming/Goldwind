import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{date, datenamel,height,name,unit,lettercolor}=this.props;
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
                tickInterval: 30,
                 categories:datenamel,
                 // max:datenamel.length-1,
                 // min:datenamel.length-30,
                 labels: {
                        style: {
                            color: lettercolor,//颜色
                            fontFamily:"微软雅黑"

                        }
                }
            },
             yAxis:{
                gridLineWidth: 0,//刻度线宽度
                lineWidth: 1, //Y轴线宽度
                title:{
                    enabled:false
                },
                labels: {
                      
                        style: {
                            color: lettercolor,//颜色
                            fontSize:'12px'  //字体
                        }
                    },
                 
            },
            legend:{
                enabled:false
            },
            tooltip: {
                enabled: true,
                style:{
                    color: '#000',
                    fontSize: '12px',
                    fontFamily:"微软雅黑"
                }
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
                 
                },
                series:{
                    animation:false
                }


            },
            series: [{
                type:'spline',
                name: name,
                data: date,
                  tooltip: {
                valueSuffix: unit,
            },
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
