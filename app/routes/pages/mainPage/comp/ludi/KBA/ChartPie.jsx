import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {text,lose,}=this.props;
        let configPie = {
            chart: {
                height:400,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:0
            },
            title: {
                text: text+'PBA',
                align:'center',
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
                align:"center",
                verticalAlign: "bottom",
                itemStyle: {
                    color: "#fff",
                    fontSize:"18px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#4cdb9d', '#2e75b6','#e2ac00','#009a46', '#ff6600','#5b9bd5'],
            plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false
	                },
	                showInLegend: true
	            }
	        },
            xAxis: {
                lineWidth: 1,
               //lineColor: "red",
                tickWidth: 0,
                labels: {
                    y: 0, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                
            },
            yAxis: {
               // lineWidth: 1,
               // lineColor: "red",
                //tickWidth: 4,
                labels: {
                	format:'{value}',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
            type: 'pie',
            name: '集团区域1',
            data: lose,
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