import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentDidMount() {
    	
    },

    render() {
    	let {X1,changedata1,areaName,areaElec,areaFault,areaMaintain,areaLimit,areaDevice,areaPBA}=this.props
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
                text: '集团各区域PBA',
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
                 
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#5298d3', '#ffffff', '#e9c75c','#d06960','#5298d3']
            ,
            plotOptions: {
                column: {
                	stacking:"normal",
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 25,
                    borderRadius:2
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
                categories:areaName,
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
            	name: '应发电量',
            	type: 'column',
                stack:"male",
                data: areaElec,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    	
                    }
                }
            },{
                name: '故障损失',
                type: 'column',
                stack:"female",
                data: areaFault,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    }
                }
            },{
            	name: '维护损失',
            	type: 'column',
                stack:"female",
                data: areaMaintain,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    }
                }
            },{
            	name: '限功率损失',
            	type: 'column',
                stack:"female",
                data: areaLimit,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    }
                }
            },{
            	name: '非设备原因损失',
            	type: 'column',
                stack:"female",
                data: areaDevice,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    }
                }
            },{
            	name: 'PBA',
            	type: 'spline',
                data: areaPBA,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
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
    	
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedata1 :(X1)=>{
              dispatch(actions.setVars('x1',X1 ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);