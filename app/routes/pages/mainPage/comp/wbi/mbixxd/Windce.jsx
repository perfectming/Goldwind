import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {areaPlan,ly,text,areaNameX,areaRecordCostT,areaRecordProfitO,pointWidth,width,height}=this.props;
          {console.log(areaPlan)}
        let configPie = {
            chart: {
                height:height,
                width:width,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                borderRadius:10
            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                y:20,
                vertical:'top',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    fontWeight:700,
                }
            },
            // 插入图片
            //图例说明
            legend: {
                y:ly,
                align:"right",
                verticalAlign: "top",
                itemHoverStyle:{
                    color:'#31f3fb',
                },
                navigation:{
                   activeColor: "#fff",
                   inactiveColor: "blue",
                },
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑",

                }
            },
            tooltip: {
                valueSuffix:'kWh'
            },
            credits: {
                enabled: false
            },

            colors: [ '#1E664A', '#4CDB9D']
            ,

            plotOptions: {
                column: {
                    pointPadding: 0.05,
                    borderWidth: 0,
                    pointWidth: pointWidth,
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            w0=e.point.category;
                            changedata1(w0,win);
                        }
                    }
                }
            },

            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                pointPadding:0,
                labels: {
                    y: 20,
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:areaNameX,
            },
            yAxis:{
                 gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                 title: {
                text:'(kWh)',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 40,
                    style:{
                        color:'#fff',
                        fontSize:'14px',
                    }
            },
                  labels: {
                    title:'100%',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color:"white",
                        fontSize:'14px'  //字体
                    }
                },

            },
            series: [{
                name: '计划发电量',
                type: 'column',
                data: areaRecordProfitO,
                color:'#33BAC0',
                borderRadius: 7,
             
            },
            {
            	name: '实际发电量',
                type: 'column',
                data: areaRecordCostT,
                color:'#70c080',
                borderRadius: 7,
                pointPlacement:-0.07,
              
            }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        w0 : state.vars.w1,
        win : state.vars.win1,
        windplan1 : state.vars.windplan1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);