import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
var $ = require('jquery');
let data = require('../../../../../../../config/WTDetailData.js');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {data,value} = this.props;
        // console.log(data);
        // let xdata = data.ModelData[value]["DevCurDayPowerCurve"]["Time"];
        let pwdata = (data.ModelData[value]["DevCurDayPowerCurve"]["Value"]).sort(function(a,b){return a-b});
        let spdata = (data.ModelData[value]["CurDayWindSpeedCurve_Device"]["Value"]).sort(function(a,b){return a-b});
            // console.log(pwdata)
        let configpie = {
            chart: {

                type: 'spline',
                width:460,
                height:310,
                margin: [20,35,45,35],
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
                itemHoverStyle: {
                    color:"#00F7FE"
                },
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
                        color: '#fff', //#4572A7
                        top:0,
                        right:0,
                    }
                },
                labels: {
                
               
                style: {
                    color: '#fff'
                }
                },
                categories: spdata,
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
                text: '(kW)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
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
            series:{
                    animation:false
                }

        },
        series: [{ //第二个Y轴的数据
            name: '实时风功率',
            color: '#29D0CF',
            type: 'spline',
         
            data: pwdata,
        




        }, { //第一个Y轴的数据
            name: '自定义功率',
            color: '#3BB6FF',
            type: 'spline',
               yAxis: 0,//坐标轴序号
            // data: [119,175,263,401,596,655,1278,1455,1692,1700,1800,1800,1800,1800,1800,1800,1800,1800,1800,1800,1800,1800,1800],
            
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