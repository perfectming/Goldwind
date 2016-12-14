import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');
var url="10.9.99.239";
let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {windFiled,windCost,windProfit,w111,changedata1,TBA,year,monthh,daycount,keyy,areaWindids}=this.props;
        let configPie = {
            chart: {
                height:400,
                width:860,
             backgroundColor: "rgba(44, 61, 71,0)",
            
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
               
            },
            title: {
                text: '',
                align:'left',
                 x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                      fontWeight:700,
                }
            },
            //图例说明
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
               valueSuffix:'元'
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#70c080'],
            plotOptions: {

                bar:{
                    animation: true
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                    borderRadius: 4,
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                              var w111=e.point.category;
                               
                               var index=e.point.index;
                        var  a=w111.toString().split("");
                        
                        var b=a[0];
                         var areaWindCosts=[];
                         var areaWindEarnings=[];
                         var areaWindRates=[];
                         
                         var areaWindNames=[];
                        $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/yield/getYieldByWfid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+keyy+"-"+'1',
                 'enddate':year+"-"+keyy+"-"+daycount,
                'wfid':areaWindids[index],
                'methods':'desc',
  
                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                        console.log(data);
                       
                         var dataA=data.data;
                         for (var i in dataA)
                         {
                             var areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             var areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             var areaWindRate=dataA[i].rate;
                             areaWindRates.push(areaWindRate);
                             var areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             var areaWindName =dataA[i].wtname;
                             areaWindNames.push(areaWindName) 

                         }
                       console.log(areaWindNames)
 

                       
                      
                     // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
                alert(2);
            
            },
          });
                        changedata1(w111,b,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,areaWindids,index);
                        }
                    }
                }

            },
              // 插入图片
         
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
                categories:windFiled,
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
                text:'元',
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
                name: '收益',
                type: 'column',
                data: windProfit,
                pointPlacement:0,
            },
            {
            	name: '成本',
                type: 'column',
                data: windCost,
                pointPlacement: -0.06,
            },
                {
                    name:'收益率',
                    type:'line',
                    color:'blue',
                    data:TBA,
                    yAxis:1,
                     tooltip: {
               valueSuffix:''
            },
                }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
         w111 : state.vars.w12,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
          changedata1 :(w111,b,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,areaWindids,index)=>{
            dispatch(actions.setVars('w123',w111)); 
            
             dispatch(actions.setVars('areaWindNamesss',areaWindNames));
             dispatch(actions.setVars('areaWindCostsss',areaWindCosts));
             dispatch(actions.setVars('areaWindEarningsss',areaWindEarnings));
             dispatch(actions.setVars('areaWindRatesss',areaWindRates));
             dispatch(actions.setVars('areaWindidsss',areaWindids));
             dispatch(actions.setVars('index2',index));

          
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
