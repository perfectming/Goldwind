import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./TimeSelect-data.js');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {Xname,name,should,g,w,x,q,l,wind}=this.props;
        let configPie = {
            chart: {
                height:400,
                backgroundColor: 'rgba(44, 61, 71, 0.4)',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: name,
                align:'left',
                 x : "0",
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
            	}
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#c5e0b4', '#c9c9c9','#f5b297','#a1c0e5', '#ffd689','#5b9bd5'],
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '100%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false
                    }
                },
                bar:{
                    animation: true
                },
                column: {
                	stacking:"normal",
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 30
                }
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
                categories:Xname,
            },
            yAxis: {
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
            	name: '应发电量',
            	type: 'column',
                stack:"male",
                data: should,
            },{
                name: '故障损失',
                type: 'column',
                stack:"female",
                data: g,
            },{
            	name: '维护损失',
            	type: 'column',
                stack:"female",
                data: w,
            },{
            	name: '性能损失',
            	type: 'column',
                stack:"female",
                data: x,
            },{
            	name: '其他损失',
            	type: 'column',
                stack:"female",
                data: q,
            },{
            	name: 'PBA',
            	type: 'spline',
                data: l,
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