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
        let {w0="一区域",mapmonth,ipUrl,w10,height,changedata1,power2,power1,text,name0,hhdata,actbt=10,wc1=0,wc2,} = this.props;


        let configPie = {
            chart: {
                height:height,
                backgroundColor: null,
                //plotBackgroundColor: "rgba(46, 46, 65, 0)",
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
                            wc2=e.point.index;
                            changedata1(w0,w10,win,wc1,wc2,hhdata,actbt,ipUrl,mapmonth);

                        }
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    maxPointWidth: 30,
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
                    x: 50,
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
                type: 'column',
                color:'#33BAC0',
                data: power1,

            }
                ,{
                    name:'实际发电量',
                    color:'#70c080',
                    type:'column',
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
        w10 : state.vars.w11,
        mon : state.vars.mon,
        windplan : state.vars.windplan,
        hhdata : state.vars.hhdata,
        actbt:state.vars.actbt,
        ipUrl:state.vars.ipUrl,
        mapmonth: state.vars.mapmonth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },
        changedata1 :(w0,w10,win,wc1,wc2,hhdata,actbt,ipUrl,mapmonth)=> {
           // let grid=hhdata.data[2][wc1].groupid;
            let wfid=hhdata.data[1][wc2].wfid;

            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/ELEC/getSpaceByGroupidElec',
                async:false,
                data:{
                    "year": mapmonth[actbt].year,
                    "months":mapmonth[actbt].yearpoweract,
                    "groupid":'201612121721151',
                    "wfid":wfid,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    dispatch(actions.setVars('hhdata', data));
                    let barlotimes3 = [];
                    let barlopowers3 = [];
                    let barlopowerp3 = [];
                    for (var i=0;i<10;i++) {
                        barlotimes3.push(data.data[0][i].wtname);    //区域的横坐标
                        barlopowers3.push(Number((data.data[0][i].powerplan).toFixed(2)));   //计划发电量
                        barlopowerp3.push(Number((data.data[0][i].poweract).toFixed(2)));     //实际发电量
                    }


                    dispatch(actions.setVars('barlotimes3', barlotimes3));
                    dispatch(actions.setVars('barlopowers3', barlopowers3));
                    dispatch(actions.setVars('barlopowerp3', barlopowerp3));

                    dispatch(actions.setVars('wfid', wfid));





                    let w10=data.data[1][0].wfname;

                },
                error:function(){

                },
            });

            dispatch(actions.setVars('w11', w10,));
            dispatch(actions.setVars('bt0', 0));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
