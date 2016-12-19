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
        let {ip="10.68.100.32",hhdata4,actbt=10,changedata1,w0='一区域',wc1,mon='十一月份',windplan=win,w10,barRotime, power2, wrong20, wrong21, wrong22, wrong23, pba2, barLotime2,height} = this.props;



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
                text: mon+"各风场PBA",

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
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormatter: "<b>{point.percentage:.0f}%</b>"

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
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            w10=e.point.category;
                            wc1=e.point.index;
                            changedata1(w10,e,wc1,actbt,hhdata4);

                        }
                    }
                },
                column: {
                    stacking: 'normal',
                    //pointWidth: 30,
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
                categories:barRotime,
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
                    text: '100%',
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
            }, {
                name: '故障损失',
                color: '#5298d3',
                type: 'column',
                data: wrong20,
                stack: 'time',

            },
                {
                    name: '维护损失',
                    color: '#ffffff',
                    type: 'column',
                    data: wrong21,
                    stack: 'time'
                },
                {
                    name: '限功率损失',
                    color: '#e9c75c',
                    type: 'column',
                    data: wrong22,
                    stack: 'time'
                },

                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: wrong23,
                    stack: 'time',
                    borderRadius: 2,
                },


                {
                    name: 'PBA',
                    type: 'line',
                    color: '#0000ff',
                    data: pba2,
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
        w0 : state.vars.w1,
        w10 : state.vars.w11,
        mon : state.vars.mon,
        windplan : state.vars.windplan,
        hhdata4 : state.vars.hhdata4,
        actbt : state.vars.actbt,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('w1',w0 ));
        },
        changedata1 :(w10,e,wc1,actbt,hhdata4)=> {
            let wfid =hhdata4.data[1][wc1].wfid;
            $.ajax({
                type:'post',
                url:'http://10.68.100.32:8080/wbi/PBA/getCompanySpacesWfieldFans',
                async:false,
                data:{
                    "month":actbt+1,
                    "groupid":201612121721151,
                    "wfid":wfid,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    let barLotime21q = [];    //各区域   一区域二区域
                    let power21q=[];       //实际发电量
                    let wrong201q=[];       //故障损失
                    let wrong211q=[];       //维护损失
                    let wrong221q=[];       //限功率损失
                    let wrong231q=[];       //非设备原因损失
                    let pba21q=[];
                    for (var i=0;i<10;i++) {
                        barLotime21q.push(data.data[i].wtname);    //区域的横坐标
                        power21q.push(data.data[i].poweract);   //实际发电量
                        wrong201q.push(data.data[i].faultloss);   //故障损失
                        wrong211q.push(data.data[i].maintainloss);   //维护损失
                        wrong221q.push(data.data[i].limitloss);   //限功率损失
                        wrong231q.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba21q.push(data.data[i].pba);   //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime1', barLotime21q));
                    dispatch(actions.setVars('power1', power21q));
                    dispatch(actions.setVars('wrong10', wrong201q));
                    dispatch(actions.setVars('wrong11', wrong211q));
                    dispatch(actions.setVars('wrong12', wrong221q));
                    dispatch(actions.setVars('wrong13', wrong231q));
                    dispatch(actions.setVars('pba1', pba21q));
                },
                error:function(){

                },
            })



            dispatch(actions.setVars('w11', w10,e));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);