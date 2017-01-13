import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Healthy-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {text,name0,runtime,downtime,tba0,changedata1,mapmonth,w10,wc1,actbt,hhdata1,hhdata2,hhdata3,ipUrl} = this.props;


        let configPie = {
            chart: {
                height:400,
                backgroundColor: null,
                //plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10,
            },
            title: {
                text: text,
                align:'left',
                x : "0",
                style:{

                    color:jhpcolor,
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
                    color: jhpcolor,
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                }
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
                        click: function (e,) {
                            w10 = e.point.category;
                            wc1 = e.point.index;
                            changedata1(w10,  wc1, actbt,hhdata1,hhdata2,hhdata3,ipUrl,mapmonth);

                        }
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    maxPointWidth: 30,
                    tooltip: {
                        valueSuffix:'h'
                    },
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
                        color: jhpcolor,//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:name0,
            },

            yAxis:

                [

                {
                labels: {
                    format: '',
                    style: {
                        color: jhpcolor,
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                title: {

                    text: '(h)',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 35,
                    style: {
                        fontSize: '14px',
                        color: jhpcolor
                    }
                }
            }, {

                labels: {
                    format: '',

                    style: {
                        color: jhpcolor,
                        fontSize: '14px',

                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',
                    min:0,
                    max:100,
                title: {
                    text: '(%)',
                    align: 'high',
                    rotation: '0',
                    y: -15,
                    x: -40,

                    style: {
                        color: jhpcolor,
                        fontSize: '14px',

                    }

                },
                opposite: true
            }],
            series: [{
                name: '实际运行时间',
                type: 'column',
                data: runtime,
                borderRadius: 4,
                color:'#62de88',

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
        hhdata1:state.vars.hhdata1,
        hhdata2:state.vars.hhdata2,
        hhdata3:state.vars.hhdata3,
        w0: state.vars.w1,
        wc1: state.vars.wc1,
        w10: state.vars.w11,
        ipUrl: state.vars.ipUrl,
        mapmonth: state.vars.mapmonth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata1: (w10,  wc1, actbt,hhdata1,hhdata2,hhdata3,ipUrl,mapmonth) => {

            dispatch(actions.setVars('w11', w10));

            let wfid = hhdata2.data[wc1].wfid;

            dispatch(actions.setVars('bt0', 0));

            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/TBA/getWfAllWtByM',
                async:false,
                data:{
                    "groupid":'201612121721151',
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
                    "wfid":wfid,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata3',  data));
                    dispatch(actions.setVars('w11',  w10));
                    dispatch(actions.setVars('wfid',  wfid));
                    //各区域   一区域二区域
                    let runtime2 = [];       //实际发电量
                    let downtime2 = [];       //故障损失
                    let tba2 = [];       //维护损失
                    let name2 = [];

                    for (var i =0;i<10;i++) {
                        //区域的横坐标

                        name2.push(data.data[i].wtname);
                        runtime2.push(data.data[i].runtimes);   //实际发电量
                        downtime2.push(data.data[i].downtimes);   //故障损失
                        tba2.push(Number((data.data[i].tba*100).toFixed(2))); //维护损失
                    }
                    dispatch(actions.setVars('name2', name2));
                    dispatch(actions.setVars('runtime2', runtime2));
                    dispatch(actions.setVars('downtime2', downtime2));
                    dispatch(actions.setVars('tba2', tba2));


                },
                error:function(){

                },
            })

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
