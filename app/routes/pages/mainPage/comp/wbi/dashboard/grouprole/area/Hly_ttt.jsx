import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

var $ = require('jQuery');
let data = require('./Healthy-data');

let winds = data.data.yearelectric[0].wind;
let win  = winds[0].plan;


let Component = React.createClass({
    componentWillMount() {
    },

    render() {


        let {w0,changedata1,x,windplan1 = win,barLoTime,text,barLoPowerValue,wc1,hhdata,actbt,groupid,ipUrl}=this.props;
        let configPie = {
            chart: {
                height:400,


                backgroundColor: null,
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
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // pointFormat: "<b>{point.percentage:.0f}%</b>"
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
                            w0=e.point.category;
                            wc1=e.point.index;
                            changedata1(w0,win,wc1,hhdata,actbt,ipUrl,groupid);

                        }
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    maxPointWidth: 30,
                    tooltip: {
                        valueSuffix:"°H",
                    },
                }
            },

            xAxis: {
                lineWidth: 1,

                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:barLoTime,
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
                    }
                },


                labels: {
                    title:'100%',
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
                data: barLoPowerValue,
                borderRadius: 4,
                color:'#62de88',
            }


            ]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    },

});


const mapStateToProps = (state) => {
    return {
        w0 : state.vars.w1,
        win : state.vars.win1,
        windplan1 : state.vars.windplan1,
        wc1 : state.vars.wc1,
        hhddata : state.vars.hhdata,
        actbt : state.vars.actbt,
        ipUrl : state.vars.ipUrl,
        groupid:state.vars.areaId,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata1 :(w0,win,wc1,hhdata,actbt,ipUrl,groupid)=>{
            dispatch(actions.setVars('mon',w0 ));
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getAreaTimHealth',
                async:false,
                data:{
                    "month":wc1+1,
                    "year":'',
                    'groupid':groupid[0],
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata',  data));


                    let WTHeal=data.data.dayHealth;
                    let WTN=[];
                    let WTHealName=[];



                    for(let n in WTHeal){
                        WTN.push(WTHeal[n]);
                        WTHealName.push(n.slice(6,8)+"日")
                    }



                    dispatch(actions.setVars('healthy3', WTN));
                    dispatch(actions.setVars('monthx3', WTHealName));

                },
                error:function(){

                },
            })


        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);