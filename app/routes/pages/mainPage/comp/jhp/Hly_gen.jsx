import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Healthy-data');
let winds = data.data.yearelectric[0].wind;
let win  = winds[0].plan;

let Component = React.createClass({
    componentWillMount() {
    },

    render() {

        let {ip="10.68.100.32",actbt=10,w0,changedata1,windplan1 = win,text,hhdata,wc1,wc2,power2,power1,name0} = this.props;



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
                }
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            w0=e.point.category;
                            wc1 = e.point.index;
                            changedata1(w0,win,wc1,hhdata,actbt);

                        }
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    maxPointWidth: 40,

                    borderRadius: 5,
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
                    }
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
                color:'#33BAC0',
                type: 'column',
                data: power1,


            }
                ,{
                    name: '实际发电量',
                    type: 'column',
                    color:'#70c080',
                    data: power2,

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
        wc1 : state.vars.wc1,
        wc2 : state.vars.wc2,
        win : state.vars.win1,
        windplan1 : state.vars.windplan1,
        hhdata : state.vars.hhdata,
        actbt:state.vars.actbt,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },
        changedata1 :(w0,win,wc1,hhdata,actbt)=>{

            let grid;

                 grid=hhdata.data[2][wc1].groupid;



            console.log(grid)
            console.log(actbt)
            $.ajax({
                type:'post',
                url:'http://10.68.100.32:8080/wbi/ELEC/getSpaceByGroupidElec',
                async:false,
                data:{
                    "months":actbt+1,
                    "groupid":grid,
                    "wfid":'',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    console.log(data)

                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i in data.data[1]) {
                        barlotimes2.push(data.data[1][i].wfname);    //区域的横坐标
                        barlopowers2.push(data.data[1][i].powerplan);   //计划发电量
                        barlopowerp2.push(data.data[1][i].poweract);   //实际发电量
                    }
                    let barlotimes3 = [];
                    let barlopowers3 = [];
                    let barlopowerp3 = [];
                    for (var i=0;i<=10;i++) {
                        barlotimes3.push(data.data[0][i].wtname);    //区域的横坐标
                        barlopowers3.push(data.data[0][i].powerplan);   //计划发电量
                        barlopowerp3.push(data.data[0][i].poweract);   //实际发电量
                    }
                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));

                    dispatch(actions.setVars('barlotimes3', barlotimes3));
                    dispatch(actions.setVars('barlopowers3', barlopowers3));
                    dispatch(actions.setVars('barlopowerp3', barlopowerp3));







                },
                error:function(){

                },
            });

            dispatch(actions.setVars('w1',w0 ));
            dispatch(actions.setVars('win1',win ));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
