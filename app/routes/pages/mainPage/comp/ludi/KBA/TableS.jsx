import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {areaName,X1=areaName[0],changedata2,X2,wfName,wfId,wfElec,wfLose,wfPBA}=this.props;
        let configPie = {
            chart: {
                height:380,
                backgroundColor: 'rgba(44, 61, 71, 0.4)',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: '集团'+X1+'PBA',
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
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//              pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#70c080','#5298d3','#5b9bd5']
            ,
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                    borderRadius:5
                }
            },
            xAxis: {
                lineWidth: 1,
               //lineColor: "red",
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:wfName,
            },
            yAxis: {
                title:{
                	text:'万kWh',
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -10,
	                x:-10,
	                style:{
	                	fontSize:'14px',
	                	color:'white',
	                }
                },
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
            	name: '实际发电量',
            	type: 'column',
                data: wfElec,
                events: {
                    click: function(e) {
                    	X2=e.point.category;
                    	changedata2(X2);
                    }
                }
            },{
                name: '损失发电量',
                type: 'column',
                data: wfLose,
                events: {
                    click: function(e) {
                    	X2=e.point.category;
                    	changedata2(X2);
                    }
                }
            },{
            	name: 'PBA',
            	type: 'spline',
                data: wfPBA,
                events: {
                    click: function(e) {
                    	X2=e.point.category;
                    	changedata2(X2);
                    }
                }
            }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
    	X1 : state.vars.x1,
    	areaName : state.vars.areaName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedata2 :(X2)=>{
            dispatch(actions.setVars('x2',X2 ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);