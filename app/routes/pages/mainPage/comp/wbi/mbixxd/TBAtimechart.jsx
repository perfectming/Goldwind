import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
       
        let{pointWidth,input_url,xxdwfNa,xxdwfId,w0,areaName,montht,profit,cost,height,TBA,changedata2qw}=this.props;
        let configPie = {
            chart: {
                height:height,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: xxdwfNa+'TBA',
                align:'left',
                vertical:'top',
                offset:200,
                x : "0",
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                  
                    top:'20px',
                }
            },
            // 插入图片
            //图例说明
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
             valueSuffix:'h'
            },
            credits: {
                enabled: false
            },
            //柱子颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                  borderWidth:0,
                    borderRadius: 7

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                       w0=e.point.category;
                      
                        let b= parseInt(w0);
                      
                        let wTBADaD=[];
                        let wTBARunD=[];
                        let wTBADownD=[];
                        let wTBATD=[];
                        $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/TBA/getDaysTBAByWf',  
             async:false,
            data:{
             'wfid':xxdwfId,
             'month':b,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
         
            
             let wTBATime=data.data;
             for (let i in wTBATime){
                let day=wTBATime[i].day+'日';
                 wTBADaD.push(day);

                 let downtimes=wTBATime[i].downtimes;
                 wTBADownD.push(downtimes);

                let runtimes=wTBATime[i].runtimes;
                wTBARunD.push(runtimes);

                let tba=wTBATime[i].tba*100;
                wTBATD.push(Number(tba.toFixed(1)));
             }
           
             },
             error:function(){
                 
             },
           });   
                    
                        changedata2qw(w0,wTBADaD,wTBARunD,wTBADownD,wTBATD)
           // 给每天赋值
           
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
                categories:montht,
            },
            yAxis: [
            {
                labels: {
                format: '',
                style: {
                    color: '#fff',
                    fontSize:'14px'
                }
            },
             gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text:'(h)',
                align:'high',
                rotation:'0',
                y: -20,
                x: 35,
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
                name: '运行时间',
                type: 'column',
                data: profit,
                color:'#33BAC0',
                shadow:true,
                maxPointWidth: pointWidth,
               
                
            },
                {
                    name: '停机时间',
                    type: 'column',
                    data:cost,
                    color:'#ccc',
                    maxPointWidth: pointWidth,
                    shadow:'true',
                    
                },
                {
                    name: 'TBA',
                    type: 'line',
                    data:TBA,
                    color:'blue',
                    pointWidth: 15,
                    shadow:'true',
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
        

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata2qw:(w0,wTBADaD,wTBARunD,wTBADownD,wTBATD)=>{

            dispatch(actions.setVars('wTBADaD1',wTBADaD));
           dispatch(actions.setVars('wTBARunD1',wTBARunD)) ;
           dispatch(actions.setVars('wTBADownD1',wTBADownD)) ;
           dispatch(actions.setVars('wTBATD1',wTBATD)) ;
           dispatch(actions.setVars('monthTD1',w0)) ;
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);