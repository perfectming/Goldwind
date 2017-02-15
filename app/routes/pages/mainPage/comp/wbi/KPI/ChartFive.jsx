import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {color,title,unit,nameOne,nameTwo,nameThree,nameFour,loseD,loseC,loseB,loseA}=this.props;
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
                text: title,
                align:'left',
                 x : "0",
                style:{
                    color:color,
                    fontSize:"16px",
                    fontFamily:"微软雅黑"
                }
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
            	}
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#5298d3', '#ffffff', '#e9c75c','#d06960', '#ff6600','#5b9bd5'],
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 25,
                    borderRadius:5
                }
            },
            tooltip: {
                valueSuffix: unit,
                shared: true,
                style:{
                    color: 'black',
                    fontSize: '12px',
                    fontFamily:'微软雅黑'
                },
            },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: color,//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:["故障损失","维护损失","限功率损失","非设备原因损失"],
            },
            yAxis: {
                title:{
                	text:unit,
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -10,
	                x:-13,
	                style:{
	                	fontSize:'14px',
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
                data: loseA,
            },{
            	name: nameTwo,
                type: 'column',
                data: loseB,
            },{
                name: nameThree,
                type: 'column',
                data: loseC,
            },{
            	name: nameFour,
                type: 'column',
                data: loseD,
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
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);