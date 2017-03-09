import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {month,arr1,arr2,unit1,unit2,nameOne,nameTwo,title}=this.props;
        let configPie = {
            chart: {
                height:380,
                backgroundColor: 'rgba(44, 61, 71, 0)',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                marginTop: 50,
            },
            title: {
                text: title,
                style: {
                    color: '#fff',
                    fontSize:"14px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
                itemHoverStyle: {
                    color: '#31f3fb'
            	},
            	y: -10,
                x: -20,
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#70c080','#31BAC0','#134833', '#082B1F'],
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 25,
                    borderRadius:3,
                }
            },
            tooltip: {
                shared: true
	        },
            xAxis: {
            	gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'10px'  //字体
                    }
                },
                categories:month,
            },
            yAxis: [{
            	title:{
                	text:unit1,
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -15,
	                x: 0,
	                style:{
	                	fontSize:'10px',
	                	color:'#fff',
	                }
                },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'10px'  //字体
                    }
                },
            },{
                title:{
                    text: unit2,
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    y: -15,
                    x: 10,
                    style:{
                        fontSize:'14px',
                        color:'#fff',
                    }
                },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                opposite: true
            }],
            series: [{
                name: nameOne,
                type: 'column',
                data: arr1,
            },{
            	name: nameTwo,
                type: 'column',
                data: arr2,
                yAxis: 1,
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