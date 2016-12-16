import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let input_url="10.68.100.32";
let data = require('./Profit-data');
let winss=data.areaPlanDayY;
let fanCost=data.fanCost;
let fanCostA=data.fanCostA;
let fanCostB=data.fanCostB;
let fanCostC=data.fanCostC;
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {monthT,profit,cost,w0,winsss,changedata3,machine,fanProfitQ,fanCost,fanCostA,fanCostB,fanCostC}=this.props;
        let configPie = {
            chart: {
                height:395,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
            },
            title: {
                text: '',
                align:'left',
                top:'-20px',
                vertical:'top',
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
            //柱子颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            plotOptions: {

                column: {
                    pointPadding: 10,
                    pointWidth: 50,
                    borderRadius: 3,
                    stacking:'nomal',

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                           w0=e.point.category;
                        let  a=w0.toString().split("");
                        let b=a[0];
                         // 第二个图的数据
                      let PBATimeSecondDay=[];
                      let PBATimeSecondPoweract=[];
                      let PBATimeSecondFaultloss=[];
                      let PBATimeSecondMaintainloss=[];
                      let PBATimeSecondLimitloss=[];
                      let PBATimeSecondNodevreasonloss=[];
                      let PBATimeSecondPbaP=[];
                        $.ajax({
                type:'post',
                url:'http://'+input_url+':8080/wbi/PBA/getWfieldDayPBA',
                async:false,
                data:{
                    'wfid':150801,
                    'month':w0,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                 

                     let PBATimeSecondPba=data.data;
                      for ( let i in PBATimeSecondPba){
                          let day=PBATimeSecondPba[i].day;
                          PBATimeSecondDay.push(day);
                          let poweract=PBATimeSecondPba[i].poweract;
                          PBATimeSecondPoweract.push(poweract);
                          let faultloss=PBATimeSecondPba[i].faultloss;
                          PBATimeSecondFaultloss.push(faultloss);
                          let maintainloss=PBATimeSecondPba[i].maintainloss;
                          PBATimeSecondMaintainloss.push(maintainloss);
                          let limitloss=PBATimeSecondPba[i].limitloss;
                          PBATimeSecondLimitloss.push(limitloss);
                          let nodevreasonloss=PBATimeSecondPba[i].nodevreasonloss;
                          PBATimeSecondNodevreasonloss.push(nodevreasonloss);
                          let pba=Number(PBATimeSecondPba[i].pba.toFixed(2));
                          PBATimeSecondPbaP.push(pba);
                      }
                },
                error:function(){
                   
                },

            });


                    changedata3(w0,winss,b,PBATimeSecondDay,PBATimeSecondPoweract,PBATimeSecondFaultloss,PBATimeSecondMaintainloss,PBATimeSecondLimitloss,PBATimeSecondNodevreasonloss,PBATimeSecondPbaP);
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
                categories:monthT,
            },
            yAxis: [{
            labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text:'kWh',
                align:'high',
                rotation:'0',
                y: -20,
                x: 40,
                style:{
                    fontSize:'14px',
                    color:'#fff'
                }
            }
        }, {
             labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text: '100%',
                 align:'high',
                rotation:'0',
                y: -15,
                x: -40,
                style:{
                    color: '#fff',
                    fontSize:'14px'
                }

            },
            opposite: true
        }],

            series: [{
                name: '实际发电量',
                type: 'column',
                data: profit,
                color:'#33BAC0',
                shadow:true,
                pointWidth: 30,
                borderWidth: 0,
                pointPlacement: 0,
            },
                {
                    name: '故障损失',
                    type: 'column',
                    color:'#FC794E',
                    data: fanCost,
                    stack:'waste',
                     pointWidth: 30,
                     borderRadius: 3,
                     color:'#5298d3',
                     pointPlacement:-0.07,
                },
                {
                    name: '维护损失',
                    type: 'column',
                    data: fanCostA,
                    stack:'waste',
                     pointWidth: 30,
                    color:'#ffffff',
                    pointPlacement:-0.07,
                },
                {
                    name: '限功率损失',
                    type: 'column',
                    data: fanCostB,
                    stack:'waste',
                    color:'#e9c75c',
                     pointWidth: 30,
                     pointPlacement:-0.07,
                },
                {
                    name: '非设备原因损失',
                    type: 'column',
                    data: fanCostC,
                    stack:'waste',
                     pointWidth: 30,
                    color:'#d06960',
                    pointPlacement:-0.07,
                },
                {
                    name: 'PBA',
                    type: 'line',
                    data:cost,
                    color:'blue',
                    pointWidth: 15,
                    shadow:'true',
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
          
        w0: state.vars.windpbaspace,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata3 :(w0,winss,b,PBATimeSecondDay,PBATimeSecondPoweract,PBATimeSecondFaultloss,PBATimeSecondMaintainloss,PBATimeSecondLimitloss,PBATimeSecondNodevreasonloss,PBATimeSecondPbaP)=>{
            dispatch(actions.setVars('windpbaspace',w0 ));
            dispatch(actions.setVars('wins1',winss[b-1]));
            dispatch(actions.setVars('PBATimeSecondDay1',PBATimeSecondDay));
            dispatch(actions.setVars('PBATimeSecondPoweract1',PBATimeSecondPoweract ));
            dispatch(actions.setVars('PBATimeSecondMaintainloss1',PBATimeSecondMaintainloss ));
            dispatch(actions.setVars('PBATimeSecondLimitloss1',PBATimeSecondLimitloss));
            dispatch(actions.setVars('PBATimeSecondFaultloss1',PBATimeSecondFaultloss ));
            dispatch(actions.setVars('PBATimeSecondNodevreasonloss1',PBATimeSecondNodevreasonloss ));
            dispatch(actions.setVars('PBATimeSecondPba12',PBATimeSecondPbaP ));
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);