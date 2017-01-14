import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {month,actrul,plan,unit,nameOne,nameTwo,color}=this.props;
        let configPie = {
            chart: {
                height:282,
                backgroundColor: null,
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                marginTop: 50,
            },
            title: {
                text: null
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: color,
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
                itemHoverStyle: {
                    color: '#31f3fb'
            	},
            	y: 0,
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#70c080','#31BAC0','#134833', '#082B1F'],
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                    borderRadius:2,
                }
            },
            tooltip: {
	            valueSuffix: unit,
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
                        color: color,//颜色
                        fontSize:'10px'  //字体
                    }
                },
                categories:month,
            },
            yAxis: {
            	title:{
                	text:unit,
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -20,
	                x: -15,
	                style:{
	                	fontSize:'10px',
	                	color:color,
	                }
                },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: color,//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                name: nameOne,
                type: 'column',
                data: plan,
                cursor: 'pointer',
                events: {
                    click: function(e) {
                    	e.point.category;
                    }
                }

            },{
            	name: nameTwo,
                type: 'column',
                data: actrul,
                cursor: 'pointer',
                events: {
                    click: function(e) {}
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