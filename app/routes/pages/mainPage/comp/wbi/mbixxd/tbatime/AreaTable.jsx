import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let data = require('./Profit-data3');
var $=require('jquery');
let input_url="10.68.100.32";
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {w0,changedataDay,areaNamee,areaRecordCostss,areaRecordProfitt,text,TBA}=this.props;
        let configPie = {
            chart: {
                height:430,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
            },
            title: {
                text: '集团每月TBA',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                     fontWeight:700,
                }
            },
            legend: {
                x:-75,
                y:10,
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
                    itemMarginBottom: 100,
                    enabled: false,

                }
            },
            tooltip: {
              valueSuffix:'h'
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
                    borderRadius: 7,
                    stacking: 'normal',
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                          let   tbaTime=e.point.category;
                            let TBAindex=e.point.index;
                           
                        let  a=tbaTime.toString().split("");
                        let b=a[0];
                        let tbaDays=[];
                         let tbaDayRunTimes=[];
                        let tbaDayDownTimes=[];
                         let tbaDayTba=[];
                        $.ajax({
                     type:'post',
                     url:'http://'+input_url+':8080/wbi/TBA/getDaysTBAByMonth',
                     async:false,
                     dataType:'json',
                     data:{
                      'month':TBAindex+1,
                     },
                     timeout:'3000',
                     success:function(data){
                    
                        let  TBAdaydata=data.data; 
                          for(let i in TBAdaydata){
                            let tbaDay=TBAdaydata[i].day+'日';
                            tbaDays.push(tbaDay);
                            let tbaDayruntimes=TBAdaydata[i].runtimes;
                            tbaDayRunTimes.push(tbaDayruntimes);
                            let daydowntimes=TBAdaydata[i].downtimes;
                            tbaDayDownTimes.push(daydowntimes);
                            let tba=TBAdaydata[i].tba*100;
                            tbaDayTba.push(Number(tba.toFixed(1)));


                           } 
                         
            },
            error:function(e){
               
            
            },
          });
                        changedataDay(tbaTime,b,tbaDays,tbaDayRunTimes,tbaDayDownTimes,tbaDayTba);
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
                categories:areaNamee,
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
                        text:'(h)',
                        align:'high',
                        rotation:'0',
                        y: -15,
                        x: 40,
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
                text: '100%',
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
                name: '运行时间',
                type: 'column',
                data: areaRecordProfitt,
               
            },
            {
            	name: '停机时间',
                type: 'column',
                data: areaRecordCostss,
                stack:'first',
                color:'#ccc',
                pointPlacement:-0.1,
                
            },

                {
                    name: 'TBA',
                    type: 'line',
                    data: TBA,
                    stack:'first',
                    color:'blue',
                    yAxis:1,
                     tooltip: {
               valueSuffix:'%'
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
         // tbaTime : state.Vars.tbaTime1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedataDay:(tbaTime,b,tbaDays,tbaDayRunTimes,tbaDayDownTimes,tbaDayTba)=>{
            dispatch(actions.setVars('qwe',tbaTime ));
            dispatch(actions.setVars('tbaDays31',tbaDays ));
            dispatch(actions.setVars('tbaDayRunTimes31',tbaDayRunTimes ));
            dispatch(actions.setVars('tbaDayDownTimes31',tbaDayDownTimes ));
            dispatch(actions.setVars('tbaDayTba31',tbaDayTba ));

          
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);