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
        let {w0,wc1,mon="十一月份",w10,name0,powerplan1,text,poweract2,height,changedata1,windplan=win,hhdata,actbt=10} = this.props;


        let configPie = {
            chart: {
                height:height,
                backgroundColor: "rgba(44, 61, 71, 0.4)",
               // plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,

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
                valueSuffix:'kWh'
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
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            w10=e.point.category;
                            wc1=e.point.index;
                            changedata1(w10,win,wc1,hhdata,actbt);

                        }
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    maxPointWidth:30,
                    borderRadius: 4,
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
            yAxis: {
                // lineWidth: 1,
                // lineColor: "red",
                //tickWidth: 4,
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
                        fontSize:'14px'
                    },
                },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                name: '计划发电量',
                type: 'column',
                color:'#33BAC0',
                data: powerplan1,

            }
                ,{
                    name:'实际发电量',
                    color:'#70c080',
                    type:'column',
                    data: poweract2,

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
        w0 : state.vars.w1,
        w10 : state.vars.w11,
        wc1 : state.vars.wc1,
        mon : state.vars.mon,
        actbt : state.vars.actbt,
        hhdata : state.vars.hhdata,
        windplan : state.vars.windplan,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },
        changedata1 :(w10,win,wc1,hhdata,actbt)=>{
            dispatch(actions.setVars('bt0',  0));
            let wfid=hhdata.data[1][wc1].wfid;

            $.ajax({
                type:'post',
                url:'http://10.68.100.32:8080/wbi/ELEC/getSpaceByGroupidElec',
                async:false,
                data:{
                    "months":actbt+1,
                    "groupid":201612121721151,
                    "wfid":wfid,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata', data));

                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i=0;i<10;i++) {
                        barlotimes2.push(data.data[0][i].wtname);    //区域的横坐标
                        barlopowers2.push(Number((data.data[0][i].powerplan).toFixed(2)));   //计划发电量
                        barlopowerp2.push(Number((data.data[0][i].poweract).toFixed(2)));  //实际发电量
                    }
                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));



                },
                error:function(){

                },
            });

            dispatch(actions.setVars('w11',w10 ));

            dispatch(actions.setVars('win1',win ));




        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
