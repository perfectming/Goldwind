import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../../config/WTDetailData.js');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let configpie = {
            chart: {

                type: 'spline',
                width:460,
                height:310,
                margin: [20,35,25,35],
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 1,
                borderWidth: 0,
                plotShadow: false,
            },
            title: {
                text: '',
                align:'left',
                top:'0px',
                vertical:'top',
                x : "0",
            
            },
            // 插入图片
            //图例说明
            legend: {
                itemMarginTop:-15,
                align:"center",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                   

                }
            },
            
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            //颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            
            

            xAxis: {
                labels: {
                
               
                style: {
                    color: '#fff'
                }
                },
                categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
            },
            yAxis:[{ //第一个Y轴，序号为0
            labels: {
                offset: 0,
                x:-5,
                style: {
                    color: '#fff'
                }
            },
            title: {
                align: 'high',
                offset: 0,
                text: '(MW)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#4572A7',
                    top:0,
                    right:0,
                }
            }
        }, { //第二个Y轴，序号为1
            title: {
                align: 'high',
                offset: 0,
                text: '(m/s)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#4572A7',
                    top:0,
                    right:0,
                }

            },
            labels: {
                x:5,
                style: {
                    color: '#fff'
                }
            },
            opposite: true
        }],
        plotOptions: {
            spline: {
                lineWidth: 4,
                opacity:0,
                states: {
                    dashStyle: "Solid",
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
           }, 

        },
        series: [{ //第二个Y轴的数据
            name: '功率',
            color: '#87F4DF',
            type: 'spline',
         
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0,190],
            
        }, { //第一个Y轴的数据
            name: '风速',
            color: '#FF888B',
            type: 'spline',
               yAxis: 1,//坐标轴序号
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5,25],
            
        }]
            
        };
        return (
            <ReactHighcharts config={configpie}/>
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