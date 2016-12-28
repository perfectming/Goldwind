import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    	
    },

    render() {
    	let {areaName,wfName,X1=areaName[0],X2=wfName[0],wtName,wtElec,wtPBA,wtLose}=this.props;
        let configPie = {
            chart: {
            	zoomType: 'xy',
                height:380,
                backgroundColor: 'rgba(44, 61, 71, 0.4)',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: '集团'+X1+X2+'PBA',
                align:'left',
                 x : 40,
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
            	y:30,
            	x:-50,
            	margin:0,
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
            	}
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#33BAC0', '#70c080','#0000ff','#a1c0e5', '#ffd689','#5b9bd5'],
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                    borderRadius:3
                }
            },
            tooltip: {
                shared: true
            },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:wtName,
            },
            yAxis: [{
                title:{
                	text:'kWh',
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -10,
	                x:-15,
	                style:{
	                	fontSize:'	14px',
	                	color:'white',
	                }
                },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },,{
            	title:{
                	text:'100%',
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -10,
	                x: 10,
	                style:{
	                	fontSize:'14px',
	                	color:'white',
	                }
                },
                labels: {
               	format: '',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
               opposite: true
            }],
            series: [{
            	name: '实际发电量',
            	type: 'column',
                data: wtElec,
                tooltip: {
	                valueSuffix: 'kWh'
	            },
            },{
                name: '损失发电量',
                type: 'column',
                data: wtLose,
                tooltip: {
	                valueSuffix: 'kWh'
	            },
            },{
            	name: 'PBA',
            	type: 'spline',
                data: wtPBA,
                yAxis: 2,
                tooltip: {
	                valueSuffix: '%',
	            },
            }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
    	X2 : state.vars.x2,
    	X1 : state.vars.x1,
    	areaName : state.vars.areaName,
    	wfName : state.vars.wfName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);