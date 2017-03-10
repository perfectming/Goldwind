import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {month,arr1,unit1,nameOne,title}=this.props;
        let configPie = {
            chart: {
                height:380,
                backgroundColor: 'rgba(44, 61, 71, 0.4)',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:3
            },
            title: {
                text: title,
                align: "center",
                style:{
                    color:"#fff",
                    fontSize:"16px",
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
            colors: [ '#33BAC0', '#33545c','#000','#134833', '#082B1F']
            ,
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    borderRadius:8,
                    pointWidth:30,
                }
            },
            tooltip: {
                valueSuffix: unit1,
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
                categories:month,
            },
            yAxis: {
                title:{
                	text:unit1,
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -15,
	                x:-5,
	                style:{
	                	fontSize:'14px',
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
            },
            series: [{
            	name: nameOne,
                type: 'column',
                data: arr1,
                cursor: 'pointer',
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