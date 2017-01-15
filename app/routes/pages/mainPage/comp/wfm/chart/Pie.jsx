import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {

            let {arn,nu,lettercolor}=this.props;
            
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:300,
                marginLeft:40,
            },
            title: {
                text: ''
            },
           
                categories:arn,
            
            tooltip: {
                enabled: true,
                 //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                 style:{
                    color: '#000',
                    fontSize: '12px',
                    fontFamily:"微软雅黑"
                }
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
                    size: '50%',
                    innerSize: '60%',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}:<b>{point.percentage:.1f}%</b>',
                           style: {
                                    color: lettercolor,
                                    fontSize: '13px',
                                    fontFamily:"微软雅黑"

                                },

                    },                   

                }
            },
            series: [{
                type: 'pie',
                name: "日发电量",
                data: nu,
                tooltip: {
                valueSuffix: 'kWh'
            },
                style: {     fontSize:"20px",  } 
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
        getall:(allnum)=>{
            dispatch(actions.setVars('allnum',allnum ));
        }
 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
