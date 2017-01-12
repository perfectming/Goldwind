import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./../../area/Healthy-data');

let winds = data.data.yearelectric[0].wind;
let win = winds[0].plan;

let Component = React.createClass({
    componentWillMount() {
    },

    render() {

        let {actbt, changedata1,grid, win,ipUrl, w0, wc1, mapmonth, hhdata, barLotime, text, power1, wrong10, wrong11, wrong12, wrong13, pba1, power2, wrong20, wrong21, wrong22, wrong23, pba2, barLotime2, power3, wrong30, wrong31, wrong32, wrong33, pba3, barLotime3} = this.props;


        let configPie = {
            chart: {
                height: 400,
                backgroundColor: null,
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                borderRadius: 10
            },
            title: {
                text: text,

                align: 'left',
                x: "0",
                style: {
                    color: "#fff",
                    fontSize: "16px",
                    fontWight: '600',
                    fontFamily: "微软雅黑"
                }
            },
            //图例说明
            legend: {

                align: "right",
                verticalAlign: "top",
                y: 20,
                x: -75,
                itemHoverStyle: {
                    color: '#31f3fb',
                },
                itemStyle: {
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#4CDB9D', ' #A2D04D', '#FFD927', '#FF9424', '#FF6124', '#000fff', '#134833', '#082B1F']
            ,
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '100%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false
                    }
                },
                bar: {
                    animation: true
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e,) {
                            w0 = e.point.category;
                            wc1 = e.point.index;
                            changedata1(grid,ipUrl,w0, win, wc1, actbt, hhdata,mapmonth );

                        }
                    }
                },
                column: {
                    stacking: 'normal',
                    maxPointWidth: 40,
                    borderWidth: 0,



                },
                line:{
                    tooltip: {
                        valueSuffix:'%'
                    },
                },
            },

            xAxis: {
                lineWidth: 1,
                //lineColor: "red",
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize: '14px'  //字体
                    }
                },
                categories: barLotime,
            },
            tooltip: {
                shared: true
            },
            yAxis: [{
                labels: {
                    format: '',
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                title: {
                    text: '(kWh)',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 45,
                    style: {
                        fontSize: '14px',
                        color: '#fff'
                    }
                }
            }, {
                labels: {
                    format: '',
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                min:0,
                title: {
                    text: '(%)',
                    align: 'high',
                    rotation: '0',
                    y: -15,
                    x: -40,
                    style: {
                        color: '#fff',
                        fontSize: '14px'
                    }

                },
                opposite: true
            }],

            series: [{
                name: '实际发电量',
                type: 'column',
                color: "#33BAC0",
                data: power1,
                borderRadius: 4,
                pointPlacement:0.1,
                tooltip: {
                    valueSuffix:'kWh'
                },
            }, {
                name: '故障损失',
                color: '#5298d2',
                type: 'column',
                data: wrong10,
                stack: 'time',
                pointPlacement:-0.1,
                tooltip: {
                    valueSuffix:'kWh'
                },

            },
                {
                    name: '维护损失',
                    color: '#ffffff',
                    type: 'column',
                    data: wrong11,
                    stack: 'time',
                    pointPlacement:-0.1,
                    tooltip: {
                        valueSuffix:'kWh'
                    },
                },
                {
                    name: '限功率损失',
                    color: '#e8952a',
                    type: 'column',
                    data: wrong12,
                    stack: 'time',
                    pointPlacement:-0.1,
                    tooltip: {
                        valueSuffix:'kWh'
                    },
                },

                {
                    name: '非设备原因损失',
                    color: '#d8403d',
                    type: 'column',
                    data: wrong13,
                    stack: 'time',
                    borderRadius: 2,
                    pointPlacement:-0.1,
                    tooltip: {
                        valueSuffix:'kWh'
                    },
                },


                {
                    name: 'PBA',
                    type: 'line',
                    color: '#0000ff',
                    data: pba1,
                    yAxis: 1,
                },

            ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        w0: state.vars.w1,
        win: state.vars.win1,
        windplan1: state.vars.windplan1,
        hhdata: state.vars.hhdata,
        hhdata1: state.vars.hhdata1,
        ipUrl:state.vars.ipUrl,
        mapmonth: state.vars.mapmonth,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata1: (grid,ipUrl,w0, win, wc1, actbt, hhdata,mapmonth ) => {

            dispatch(actions.setVars('w1', w0));
            dispatch(actions.setVars('win1', win));


            $.ajax({
                type: 'post',
                url: 'http://'+ipUrl+'/wbi/PBA/getCompanySpacesWfields',
                async: false,
                data: {
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
                    "groupid":   grid==undefined? '201612121721151':grid,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                        console.log(data)


                    let barLotime2 = [];    //各区域   一区域二区域
                    let power2 = [];       //实际发电量
                    let wrong20 = [];       //故障损失
                    let wrong21 = [];       //维护损失
                    let wrong22 = [];       //限功率损失
                    let wrong23 = [];       //非设备原因损失
                    let pba2 = [];

                    let barLotime3 = [];    //各区域   一区域二区域
                    let power3 = [];       //实际发电量
                    let wrong30 = [];       //故障损失
                    let wrong31 = [];       //维护损失
                    let wrong32 = [];       //限功率损失
                    let wrong33 = [];       //非设备原因损失
                    let pba3 = [];

                    for (var i in data.data[0]) {
                        barLotime2.push(data.data[0][i].wfname);    //区域的横坐标
                        power2.push(data.data[0][i].poweract);   //实际发电量
                        wrong20.push(data.data[0][i].faultloss);   //故障损失
                        wrong21.push(data.data[0][i].maintainloss);   //维护损失
                        wrong22.push(data.data[0][i].limitloss);   //限功率损失
                        wrong23.push(data.data[0][i].nodevreasonloss);   //非设备原因损失
                        pba2.push(Number((data.data[0][i].pba*100).toFixed(2)));  //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime2a', barLotime2));
                    dispatch(actions.setVars('power2a', power2));
                    dispatch(actions.setVars('wrong20a', wrong20));
                    dispatch(actions.setVars('wrong21a', wrong21));
                    dispatch(actions.setVars('wrong22a', wrong22));
                    dispatch(actions.setVars('wrong23a', wrong23));
                    dispatch(actions.setVars('pba2a', pba2));
                    dispatch(actions.setVars('wc10', wc1));

                    for (var i=0;i<10;i++) {
                        barLotime3.push(data.data[1][i].wtname);    //区域的横坐标
                        power3.push(data.data[1][i].poweract);   //实际发电量
                        wrong30.push(data.data[1][i].faultloss);   //故障损失
                        wrong31.push(data.data[1][i].maintainloss);   //维护损失
                        wrong32.push(data.data[1][i].limitloss);   //限功率损失
                        wrong33.push(data.data[1][i].nodevreasonloss);   //非设备原因损失
                        pba3.push(Number((data.data[1][i].pba*100).toFixed(2)))  //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime3a', barLotime3));
                    dispatch(actions.setVars('power3a', power3));
                    dispatch(actions.setVars('wrong30a', wrong30));
                    dispatch(actions.setVars('wrong31a', wrong31));
                    dispatch(actions.setVars('wrong32a', wrong32));
                    dispatch(actions.setVars('wrong33a', wrong33));
                    dispatch(actions.setVars('pba3a', pba3));


                    dispatch(actions.setVars('bt0', 0));
                    dispatch(actions.setVars('w11', data.data[0][0].wfname));





                },
                error: function () {

                },
            });


        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
