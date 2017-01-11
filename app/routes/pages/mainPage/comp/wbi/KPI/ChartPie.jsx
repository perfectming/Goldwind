import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {unit,text,lose,name}=this.props;
        let configPie = {
            chart: {
                height:380,
                backgroundColor: null,
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: text,
                align:'center',
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
                align:"center",
                verticalAlign: "bottom",
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
            tooltip: {
                shared: true,
                style:{
                    color: '#333',
                    fontSize: '12px',
                    fontFamily:'微软雅黑'
                },
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>数值：<b>{point.y}</b><h6 style="font-size:12px">'+unit+'</h6>'
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#5298d3', '#ffffff', '#e9c75c','#d06960', '#4cdb9d','#5b9bd5'],
            plotOptions: {
                pie: {
                    size:200,
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#d1d2d3',
                            fontWeight: 'normal',
                            fontSize:'14px',
                            fontFamily: '微软雅黑',
                        }
                    },
                    showInLegend: true
                }
	        },
            xAxis: {
                lineWidth: 1,
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
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                type: 'pie',
                name: name,
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