import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {data,value,lettercolor} = this.props;
        // console.log(data);
        let xdata = data.ModelData[value]["DevCurDayPowerCurve"]["Time"];
        let pwdata = data.ModelData[value]["DevCurDayPowerCurve"]["Value"];
        let spdata = data.ModelData[value]["CurDayWindSpeedCurve_Device"]["Value"];
        let configpie = {
            chart: {

                type: 'spline',
                width:460,
                height:310,
                margin: [20,35,45,35],
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
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
                itemHoverStyle: {
                    color:"#00F7FE"
                },
                itemStyle: {
                    color: lettercolor,
                    fontSize:"14px",
                   

                }
            },
            
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            //颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            tooltip: {
                shared: true,
                crosshairs: [true,true],
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                }
            },
            

            xAxis: {
                labels: {
                // step:1,
               
                style: {
                    color: lettercolor
                }
                },
                categories: xdata,
                max:xdata.length-1,
                min:xdata.length-15,
            },
            yAxis:[{ //第一个Y轴，序号为0
            labels: {
                offset: 0,
                x:-5,
                style: {
                    color: lettercolor
                }
            },
            title: {
                align: 'high',
                offset: 0,
                text: '(kW)',
                rotation: 0,
                y: -10,
                style: {
                    color: lettercolor,
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
                    color: lettercolor,
                    top:0,
                    right:0,
                }

            },
            labels: {
                x:5,
                style: {
                    color: lettercolor
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
            series:{
                    animation:false
                }

        },
        series: [{ //第二个Y轴的数据
            name: '功率',
            color: '#87F4DF',
            type: 'spline',
         
            data: pwdata,
            
        }, { //第一个Y轴的数据
            name: '风速',
            color: '#FF888B',
            type: 'spline',
               yAxis: 1,//坐标轴序号
            data: spdata,
            
        }]
            
        };
        return (
            <ReactHighcharts config={configpie}/>
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