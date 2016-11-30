import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let{areaPlan,areaPlanDay, areaPlanDayT,width,height}=this.props;
        let configPie = {
            chart: {
                height:height,
                width:width,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: '',
                align:'left',
                top:'-20px',
                vertical:'top',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                    fontWeight:700,
                }
            },
            // 插入图片
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑",

                }
            },
            tooltip: {
               
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            //柱子颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                    pointPadding: 10,
                    borderWidth: 1,

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            alert('X轴的值：'+e.point.category);
                        }
                    }
                }
            },

            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        fontSize:'14px',
                        color:'#fff'  //字体
                    }
                },
                categories:areaPlan,
            },
            yAxis: {
                title:{
                    text:'',
                },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                       color:"#fff",
                        fontSize:'14px'  //字体
                    }
                },
            },
            //几条数据
            series: [{
                name: '计划发电量',
                type: 'column',
                data: areaPlanDay,
                color:'none',
                borderColor:'#5B9BD5',
                pointWidth: 15,
                borderWidth: 4,
                borderRadius: 3
            },
            {
            	name: '实际发电量',
                type: 'column',
                data:areaPlanDayT,
                color:'none',
                pointWidth: 15,
                borderWidth: 4,
                borderColor:'#ED7D31',
                borderRadius: 3
            },
            ]
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