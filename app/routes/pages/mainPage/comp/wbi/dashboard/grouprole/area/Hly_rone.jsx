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
        let {w0="各",hhdata,height,actbt,text,areaId,mapmonth,wc2,w10,ipUrl,changedata1,namex2,healthy2}= this.props;



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
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormat: "<b>{point.percentage:.yf}%</b>"
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
                            changedata1(w10,w0,wc2,hhdata,actbt,ipUrl,mapmonth,areaId);

                        }
                    }
                },


                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    pointWidth:30,
                    tooltip: {
                        valueSuffix:'°H'
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
                categories:namex2,

            },
            yAxis: {
                // lineWidth: 1,
                // lineColor: "red",
                //tickWidth: 4,
                gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                title: {
                    text:'(°H)',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 30,
                    style:{
                        color:'#fff',
                        fontSize:'14px'
                    },
                },
                labels: {
                    title:'kW',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                name: '实际健康度',
                type: 'column',
                data: healthy2,
                borderRadius: 4,
                color:'#62de88',
            }
                // ,{
                //     name:'停机时间',
                //     type:'column',
                //     data: barLtPowerValue
                // }

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
        hhdata : state.vars.hhdata,
        wc2 : state.vars.wc2,
        ipUrl : state.vars.ipUrl,
        mon : state.vars.mon,
        windplan : state.vars.windplan,
        actbt : state.vars.actbt,
        mapmonth : state.vars.mapmonth,
        areaId: state.vars.areaId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('w1',w0 ));
        },
        changedata1 :(w10,w0,wc2,hhdata,actbt,ipUrl,mapmonth,areaId)=> {
            areaId=areaId[0];
            dispatch(actions.setVars('w11', w10));
            dispatch(actions.setVars('bt0', 0));
            let wfid=hhdata.data[1][wc2].wfid;
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getByWfidFanHealth',
                async:false,
                data:{
                    "year": mapmonth[actbt].year,
                    "months":mapmonth[actbt].yearpoweract,
                    "groupid": areaId==undefined? '201612121721151':areaId,
                    "wfid": wfid,

                },
                dataType:'json',
                timeout:'3000',
                success:function(data){

                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i =0;i<10;i++) {
                        barlopowers3.push(data.data[i].fanHealth);    //区域的横坐标
                        barlopowerp3.push(data.data[i].wtname);    //区域的横坐标
                    }

                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));

                },
                error:function(){

                },
            })
            dispatch(actions.setVars('wfid', wfid));

        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
