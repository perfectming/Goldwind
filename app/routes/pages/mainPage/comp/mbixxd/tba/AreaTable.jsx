import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let data = require('./Profit-data');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {

        let {PBAGroupPba,PBAGroupNodevreasonloss,PBAGroupMaintainloss,PBAGroupLimitloss,PBAGroupFaultloss,areaName,areaRecordCosts,areaRecordProfit,text0,w0,changedata1}=this.props;
        let configPie = {
            chart: {
                height:400,
              backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
               

            },
            title: {
                text:'',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                     fontWeight:700,
                }
            },
            legend: {
                x:-75,
                y:30,
                align:"right",
                verticalAlign: "top",
                itemHoverStyle:{
                    color:'#31f3fb',
                },
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑",

                }
            },
            tooltip: {
               valueSuffix:'kWh'
            },
            credits: {
                enabled: false
            },
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31','#EB6B34'],
              plotOptions: {
                column: {
                    pointPadding:0,
                    borderWidth: 0,
                    pointWidth:25,
                    stacking: 'normal',
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                       var  w0=e.point.category;
                        var PBAGroupIndex=e.point.index;
                        var  a=w0.toString().split("");
                        var b=a[0];

                    var PBAGroupFirstDay=[];
                    var PBAGroupFirstPoweract=[];
                    var PBAGroupFirstFaultloss=[];
                    var PBAGroupFirstMaintainloss=[];
                    var PBAGroupFirstLimitloss=[];
                    var PBAGroupFirstNodevreasonloss=[];
                    var PBAGroupFirstPba=[];
                    // 点击上面下面变

                        $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/PBA/getCompanyDayTimePBA',
                     async:false,
                     dataType:'json',
                     data:{
                      'month':PBAGroupIndex+1,
                     },
                     timeout:'3000',
                     success:function(data){
                     
                    
                       
                          var PBAGroupFirstMonth=data.data;
  
                        for ( var i in PBAGroupFirstMonth){

                          var day=PBAGroupFirstMonth[i].day;
                          PBAGroupFirstDay.push(day);

                          var poweract=PBAGroupFirstMonth[i].poweract;
                          PBAGroupFirstPoweract.push(poweract);

                          var faultloss=PBAGroupFirstMonth[i].faultloss;
                          PBAGroupFirstFaultloss.push(faultloss);

                          var maintainloss=PBAGroupFirstMonth[i].maintainloss;
                          PBAGroupFirstMaintainloss.push(maintainloss);

                          var limitloss=PBAGroupFirstMonth[i].limitloss;
                          PBAGroupFirstLimitloss.push(limitloss);

                          var nodevreasonloss=PBAGroupFirstMonth[i].nodevreasonloss;
                          PBAGroupFirstNodevreasonloss.push(nodevreasonloss);

                          var pba=Number(PBAGroupFirstMonth[i].pba.toFixed(2));
                          PBAGroupFirstPba.push(pba);
                        }
                      
              },
              error:function(){
                 
          
             },
           });
                        changedata1(w0,b,PBAGroupFirstDay,PBAGroupFirstPoweract,PBAGroupFirstFaultloss,PBAGroupFirstMaintainloss,PBAGroupFirstLimitloss,PBAGroupFirstNodevreasonloss,PBAGroupFirstPba);
                        }
                    }
                }

            },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20,
                    style: {
                        color: '#fff',
                        fontSize:'14px'
                    }
                },
                categories:areaName,
            },
            yAxis:
                [{labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                    title:{
                        text:'kWh',
                        align:'high',
                        rotation:'0',
                        y: -17,
                        x: 45,
                        style:{
                            fontSize:'14px',
                            color:'#fff'
                        }
                    }
                }, {
                    labels: {
               
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text: 'PBA%',
                align:'high',
                rotation:'0',
               y:-15,
               x:-40,
                style:{
                    color:'#fff',
                    fontSize:'14px'
                }
            },
            opposite: true
        }],
            series: [{
                name: '实际发电量',
                type: 'column',
                data: areaRecordProfit,
                borderRadius: 7,
                color:'#33BAC0',
            },
            {
                name: '故障损失',
                type: 'column',
                data: PBAGroupFaultloss,
                stack:'first',
                borderRadius: 2,
                pointPlacement:-0.1,
                color:'#5298d3',
            },
            {
                name: '维护损失',
                type: 'column',
                data: PBAGroupMaintainloss,
                stack:'first',
                pointPlacement:-0.1,
                color:'#ffffff'
            },
            {
                name: '限功率损失',
                type: 'column',
                data: PBAGroupLimitloss,
                stack:'first',
                pointPlacement:-0.1,
                color:'#e9c75c',
            },
            {
                name: '非设备原因损失',
                type: 'column',
                data: PBAGroupNodevreasonloss,
                stack:'first',
                borderRadius: 2,
                pointPlacement:-0.1,
                color:'#d06960'
            },
                {
                    name: 'PBA',
                    type: 'line',
                    data: PBAGroupPba,
                    stack:'first',
                    color:'blue',
                    yAxis:1,
                     tooltip: {
               valueSuffix:''
            },
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
          w0 : state.vars.PBAGroupPbaName,
        wins: state.vars.wins1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata1 :(w0,b,PBAGroupFirstDay,PBAGroupFirstPoweract,PBAGroupFirstFaultloss,PBAGroupFirstMaintainloss,PBAGroupFirstLimitloss,PBAGroupFirstNodevreasonloss,PBAGroupFirstPba)=>{
            dispatch(actions.setVars('PBAGroupPbaName',w0)); 
            dispatch(actions.setVars('PBAGroupFirstDay1',PBAGroupFirstDay ));
            dispatch(actions.setVars('PBAGroupFirstPoweract1',PBAGroupFirstPoweract ));
            dispatch(actions.setVars('PBAGroupFirstMaintainloss1',PBAGroupFirstMaintainloss ));
            dispatch(actions.setVars('PBAGroupFirstLimitloss1',PBAGroupFirstLimitloss));
            dispatch(actions.setVars('PBAGroupFirstFaultloss1',PBAGroupFirstFaultloss ));
            dispatch(actions.setVars('PBAGroupFirstNodevreasonloss1',PBAGroupFirstNodevreasonloss ));
            dispatch(actions.setVars('PBAGroupFirstPba1',PBAGroupFirstPba ));
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);