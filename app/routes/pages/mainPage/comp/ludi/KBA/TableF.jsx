import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./TimeSelect-data.js');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {X1,changedata1}=this.props
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
                text: '**集团各区域PBA',
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
                pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#4cdb9d', '#2e75b6','#e2ac00','#009a46', '#ff6600','#5b9bd5']
            ,
            plotOptions: {
                column: {
                	stacking:"normal",
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 30,
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
                categories:data.data[0].area,
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
            	name: '应发电量',
            	type: 'column',
                stack:"male",
                data: data.data[0].should,
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
                data: data.data[0].g,
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
                data: data.data[0].w,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    }
                }
            },{
            	name: '性能损失',
            	type: 'column',
                stack:"female",
                data: data.data[0].x,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    }
                }
            },{
            	name: '其他损失',
            	type: 'column',
                stack:"female",
                data: data.data[0].q,
                events: {
                    click: function(e) {
                    	X1=e.point.category;
                    	changedata1(X1);
                    }
                }
            },{
            	name: 'PBA',
            	type: 'spline',
                data: data.data[0].l,
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
    	X1 : state.vars.x1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata1 :(X1)=>{
              dispatch(actions.setVars('x1',X1 ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);