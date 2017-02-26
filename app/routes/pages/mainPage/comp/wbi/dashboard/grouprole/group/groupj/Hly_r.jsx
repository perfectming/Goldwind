import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let bmId = require("../../../../../urlData").groupId;
let data = require('./../../area/Healthy-data');
let text0 = data.data.line_date;
let winds = data.data.yearelectric[0].wind;
let win  = winds[0].plan;
let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {w0="一区域",barRotime,height,jhpcolor,mon,mapmonth,w10,changedata1,text,barLoPowerValue,wc1,wc2,hhdata,actbt,ipUrl}= this.props;



        let configPie = {
            chart: {
                height:height,
                backgroundColor: null,
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
            tooltip: {
                valueSuffix:'°H'
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
                            changedata1(bmId,w10,w0,wc1,wc2,hhdata,actbt,ipUrl,mapmonth);

                        }
                    }
                },


                column: {
                    borderRadius: 4,
                    pointPadding: 0.2,
                    borderWidth: 0,
                    maxPointWidth:30
                }
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
                categories:barRotime,

            },
            yAxis: {

                gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                title: {
                    text:'(°H)',
                    align:'high',
                    rotation:'0',
                    y: -10,
                    x: 30,
                    style:{
                        color:jhpcolor,
                        fontSize:'14px'
                    }
                },
                labels: {
                    title:'°H',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: jhpcolor,//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                name: '实际健康度',
                type: 'column',
                data: barLoPowerValue,
                color:'#62de88',

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
        mon : state.vars.mon,
        windplan : state.vars.windplan,
        wc1 : state.vars.wc1,
        wc2 : state.vars.wc2,
        hhdata : state.vars.hhdata,
        actbt : state.vars.actbt,
        ipUrl : state.vars.ipUrl,
        mapmonth: state.vars.mapmonth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('w1',w0 ));
        },
        changedata1 :(bmId,w10,w0,wc1,wc2,hhdata,actbt,ipUrl,mapmonth)=> {
            dispatch(actions.setVars('w11', w10));
            dispatch(actions.setVars('bt0', 0));
            let wfid=hhdata.data[1][wc2].wfid;
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getByWfidFanHealth',
                async:false,
                data:{
                    "year": mapmonth[actbt].year,
                    "month":mapmonth[actbt].yearpoweract,
                    "groupid":bmId,
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
