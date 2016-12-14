import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Healthy-data');
let text0 = data.data.line_date;
let winds = data.data.yearelectric[0].wind;
let win  = winds[0].plan;

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {ip="10.68.100.32",hhdata1,hhdata2,changedata1,w0='一区域',wc1=0,wc2=0,mon='一月份',actbt,windplan=win,w10,text,height,power2, wrong20, wrong21, wrong22, wrong23, pba2, barLotime2, power3, wrong30, wrong31, wrong32, wrong33, pba3, barLotime3} = this.props;



        let configPie = {
            chart: {
                height:height,
                backgroundColor: "rgba(44, 61, 71, 0.4)",
                //plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,

                borderRadius:10
            },

            title: {
                text: mon+w0+"各风场PBA",

                align:'left',
                x : "0",
                style:{

                    color:"#fff",
                    fontSize:"16px",
                    fontWight:'600',
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
                align:"right",
                verticalAlign: "top",
                y:30,
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

            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#4CDB9D', ' #A2D04D', '#FFD927' , '#FF9424', '#FF6124', '#000fff','#134833', '#082B1F']
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
                            wc2 = e.point.index;
                            changedata1(w10, win, wc1,wc2, actbt,hhdata1, hhdata2,);

                        }
                    }
                },
                column: {
                    stacking: 'normal',
                    maxPointWidth: 40,
                    borderWidth: 0,
                    tooltip: {
                        valueSuffix:'kWh'
                    },
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
                categories:barLotime2,
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
                    text:'(h)',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 40,
                    style:{
                        color:'#fff',
                        fontSize:'14px'
                    },

                },

                title: {
                    text: 'kWh',
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
                    text: 'PBA%',
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
                data: power2,
                borderRadius: 4,


            },
                {
                    name: '故障损失',
                    color: '#5298d3',
                    type: 'column',
                    data: wrong20,
                    stack:'time',
                    borderRadius: 2,

                },
                {
                    name: '维护损失',
                    color: '#ffffff',
                    type: 'column',
                    data: wrong21,
                    stack:'time',

                },
                {
                    name: '限功率损失',
                    color: '#e9c75c',
                    type: 'column',
                    data: wrong22,
                    stack:'time',

                },
                {
                    name: '非设备原因损失',
                    color: '#d06960',
                    type: 'column',
                    data: wrong23,
                    stack:'time',

                },
                {
                    name: 'PBA',
                    type: 'line',
                    color:'#0000ff',
                    data: pba2,
                    yAxis:1,

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
        w0 : state.vars.w1,
        w10 : state.vars.w11,
        wc1 : state.vars.wc10,
        mon : state.vars.mon,
        windplan : state.vars.windplan,
        hhdata1 : state.vars.hhdata1,



    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('w1',w0 ));
        },
        changedata1 :(w10, win,wc1, wc2, actbt,hhdata1, hhdata2,)=> {
            dispatch(actions.setVars('w11', w10,));
            let grid = hhdata2.data[2][wc1].groupid;
            let wfid =hhdata1.data[0][wc2].wfid;

            $.ajax({
                type: 'post',
                url: 'http://10.68.100.32:8080/wbi/PBA/getCompanySpacesWfieldFans',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid": grid,
                    "wfid": wfid,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    console.log(data)
                    dispatch(actions.setVars('hhdata3', data));
                    var barLotime3=[];
                    var power3=[];
                    var wrong30=[];
                    var wrong31=[];
                    var wrong32=[];
                    var wrong33=[];
                    var pba3=[];

                    for (var i=0;i<10;i++) {

                        barLotime3.push(data.data[i].wtname);    //区域的横坐标
                        power3.push(data.data[i].poweract);   //实际发电量
                        wrong30.push(data.data[i].faultloss);   //故障损失
                        wrong31.push(data.data[i].maintainloss);   //维护损失
                        wrong32.push(data.data[i].limitloss);   //限功率损失
                        wrong33.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba3.push(data.data[i].pba);   //非设备原因损失
                    }
                    console.log(pba3)
                    dispatch(actions.setVars('barLotime3a', barLotime3));
                    dispatch(actions.setVars('power3a', power3));
                    dispatch(actions.setVars('wrong30a', wrong30));
                    dispatch(actions.setVars('wrong31a', wrong31));
                    dispatch(actions.setVars('wrong32a', wrong32));
                    dispatch(actions.setVars('wrong33a', wrong33));
                    dispatch(actions.setVars('pba3a', pba3));



                },
                error: function () {

                },
            });

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
