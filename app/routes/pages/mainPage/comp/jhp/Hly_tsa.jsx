import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Healthy-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {text,name0,runtime,downtime,tba0,changedata1,hhdata,w0,wc1,actbt} = this.props;


        let configPie = {
            chart: {
                height:400,
                backgroundColor: "rgba(44, 61, 71, 0.4)",
                //plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,

                borderRadius:10
            },
            title: {
                text: text,
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
                y:20,
                x:-75,
                itemHoverStyle:{
                    color:'#31f3fb',
                },
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
            },
            tooltip: {
                valueSuffix:'h'
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#4CDB9D', '#1E664A', '#000','#134833', '#082B1F']
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
                bar:{
                    animation: true
                }
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e,) {
                            w0 = e.point.category;
                            wc1 = e.point.index;
                            changedata1(w0, win, wc1, actbt,);

                        }
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    pointWidth: 30
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
                categories:name0,
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

                    text: 'h',
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

                title: {
                    text: 'TBA%',
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
                name: '实际运行时间',
                type: 'column',
                data: runtime,
                borderRadius: 4,

            }
                ,{
                    name: '停机时间',
                    type: 'column',
                    color:'#cccccc',
                    data: downtime,
                    borderRadius: 4,
                }
                ,
                {
                    name: 'TBA',
                    type: 'line',
                    color:'#0000ff',
                    data: tba0,
                    yAxis:1,

                }


            ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        hhdata:state.vars.hhdata,
        actbt:state.vars.actbt,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata1: (w0, win, wc1, actbt) => {

            dispatch(actions.setVars('w1', w0));
            dispatch(actions.setVars('win1', win));
            let grid = hhdata2.data[2][wc1].groupid;


            $.ajax({
                type: 'post',
                url: 'http://10.68.100.32:8080/wbi/TBA/getGroupAllWfByM',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid": grid,
                    "wfid": '',
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {



                    for (var i in data.data[0]) {
                        barLotime2.push(data.data[0][i].wfname);    //区域的横坐标
                        power2.push(data.data[0][i].poweract);   //实际发电量
                        wrong20.push(data.data[0][i].faultloss);   //故障损失
                        wrong21.push(data.data[0][i].maintainloss);   //维护损失
                        wrong22.push(data.data[0][i].limitloss);   //限功率损失
                        wrong23.push(data.data[0][i].nodevreasonloss);   //非设备原因损失
                        pba2.push(data.data[0][i].pba);   //非设备原因损失
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
                        pba3.push(data.data[1][i].pba);   //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime3a', barLotime3));
                    dispatch(actions.setVars('power3a', power3));
                    dispatch(actions.setVars('wrong30a', wrong30));
                    dispatch(actions.setVars('wrong31a', wrong31));
                    dispatch(actions.setVars('wrong32a', wrong32));
                    dispatch(actions.setVars('wrong33a', wrong33));
                    dispatch(actions.setVars('pba3a', pba3));



                    dispatch(actions.setVars('hhdata1', data));




                },
                error: function () {

                },
            });


        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
