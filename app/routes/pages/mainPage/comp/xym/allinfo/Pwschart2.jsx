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
                plotBorderWidth: 0,
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
                title: {
                align: 'high',
                offset: 0,
                text: '(m/s)',
                rotation: 0,
                x: 30,
                    style: {
                        color: '#4572A7',
                        top:0,
                        right:0,
                    }
                },
                labels: {
                
               
                style: {
                    color: '#fff'
                }
                },
                categories: ['0', '2', '4', '6', '8', '10', '12','14', '16', '18', '20', '22', '24', '26']
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
        }, ],
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
            name: '实时风功率',
            color: '#29D0CF',
            type: 'spline',
         
            data: [330, 380, 430, 490.9, 550, 600, 710.5, 860, 1060.4, 1290.2, 1440.0, 1760.0, 1910,2300,],
            
        }, { //第一个Y轴的数据
            name: '自定义功率',
            color: '#3BB6FF',
            type: 'spline',
               yAxis: 0,//坐标轴序号
            data: [280, 370, 480, 590.9, 850, 1100, 1410.5, 1760, 2060.4, 2590.2, 2690.2, 2790.2, 2890.2,2890.2,],
            
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