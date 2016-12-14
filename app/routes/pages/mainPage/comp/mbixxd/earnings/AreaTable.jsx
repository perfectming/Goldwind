import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var $=require('jquery');
var ReactHighcharts = require('react-highcharts');
var url="10.9.99.239";
let data = require('./Profit-data');
let sqy =data.areaRecordCostQY;
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {areaName,areaRecordCost,areaRecordProfit,text,w11,changedataq,windFiedN,year,monthh,daycount,keyy,arr5,TBA,}=this.props;
       
        
        let configPie = {
            chart: {
                height:370,

                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:0,
               
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
            // 插入图片

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
                enabled: false
            },
            //柱子颜色
            colors: [ '#33BAC0', '#70c080'],
            
            plotOptions: {
                column: {
                    pointWidth: 30
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            
                             w11=e.point.category;
                         var     index=e.point.index;
                            var w111=windFiedN;
                            // console.log(e.point.index+"qwe");
                        var  a=w11.toString().split("");
                        var b=a[0];
                        // console.log(arr5[index]);
                        var areaWindCosts=[];
                         var areaWindEarnings=[];
                         var areaWindRates=[];
                         var areaWindids=[];
                         var areaWindNames=[];
                         var areaWindCosts1=[];
                         var areaWindEarnings1=[];
                         var areaWindRates1=[];
                         var areaWindids1=[];
                         var areaWindNames1=[];
                        // 点击第一张图第二张变
                         $.ajax({
                     type:'post',
                     url:'http://10.68.100.32:8080/wbi/yield/getYieldByGroupid',
                     async:false,
                    data:{
                      
                   'startdate':year+"-"+(keyy)+"-"+'1',
                 'enddate':year+"-"+(keyy)+"-"+daycount,
                'groupid':arr5[index],

                    },
                     dataType:'json',
                     timeout:'3000',
                     success:function(data){
                      
                     

                          console.log(year+"-"+(keyy)+"-"+daycount);
                           console.log(year+"-"+(keyy)+"-"+'1');

                console.log(arr5[index]);
                         var dataA=data.data;
                         for (var i in dataA)
                         {
                             var areaWindCost=dataA[i].costs;
                             areaWindCosts.push(areaWindCost);
                             var areaWindEarning=dataA[i].earning;
                             areaWindEarnings.push(areaWindEarning);
                             var areaWindRate=Number(dataA[i].rate.toFixed(2));
                             areaWindRates.push(areaWindRate);
                             var areaWindid=dataA[i].wfid;
                             areaWindids.push(areaWindid);
                             var areaWindName =dataA[i].wfname;
                             areaWindNames.push(areaWindName)

                         }
                     console.log('下面是areaWindids')
                     console.log(areaWindids);
                     console.log('面试是阿容')
                     console.log(arr5)


                       
                      
                     // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
               
                console.log(year+"-"+(keyy+1)+"-"+daycount);
                console.log(arr5[index]);
                
            },
          });
                         // 点击第一张图第三张图变
      $.ajax({
                      type:'post',
                      url:'http://10.68.100.32/wbi/yield/getYieldByWfid',
                      async:false,
                     data:{
                   
                    'startdate':year+"-"+(keyy)+"-"+'1',
                  'enddate':year+"-"+(keyy)+"-"+daycount,
                 'wfid':areaWindids[0],
                 'methods':'desc',
  
                     },
                      dataType:'json',
                      timeout:'3000',
                      success:function(data){
              
                        // console.log('第三张数据')
                          var dataA=data.data;
                          for (var i in dataA)
                          {
                              var areaWindCost=dataA[i].costs;
                              areaWindCosts1.push(areaWindCost);
                              var areaWindEarning=dataA[i].earning;
                              areaWindEarnings1.push(areaWindEarning);
                              var areaWindRate=dataA[i].rate;
                              areaWindRates1.push(areaWindRate);
                              var areaWindid=dataA[i].wtid;
                              areaWindids1.push(areaWindid);
                              var areaWindName =dataA[i].wtname;
                              areaWindNames1.push(areaWindName) 

                          }
                   
 

                       
                      
     // //                 // 获取x轴的值内蒙达茂天润风电场
                    
                    
            
            },
            error:function(){
                alert(666666);
                console.log(year+"-"+(keyy)+"-"+'1');
                console.log(year+"-"+(keyy)+"-"+daycount);
                console.log(areaWindids[0])


            
              },
            });
                        changedataq(w11,sqy,b,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,areaWindids,areaWindNames1,areaWindCosts1,areaWindEarnings1,areaWindRates1);
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
                x:45,
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
                data: areaRecordProfit,
                borderRadius: 7,
                color:'#33BAC0',
                
                borderWidth:0,
            },
            {
            	name: '成本',
                type: 'column',
                data: areaRecordCost,
                borderRadius: 7,
                color:'#70c080',
                
                 borderWidth:0,
            },{
                    name:"收益率",
                    type:'line',
                    color:'blue',
                    data:TBA,
                    yAxis:1,
                     tooltip: {
               valueSuffix:''
            },
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
         w11 : state.vars.w1,
         sqy : state.vars.wins1,
      
         
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedataq :(w11,sqy,b,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,areaWindids,areaWindNames1,areaWindCosts1,areaWindEarnings1,areaWindRates1)=>{
            dispatch(actions.setVars('w1',w11)); 
          
             dispatch(actions.setVars('areaWindNamess',areaWindNames));
             dispatch(actions.setVars('areaWindCostss',areaWindCosts));
             dispatch(actions.setVars('areaWindEarningss',areaWindEarnings));
             dispatch(actions.setVars('areaWindRatess',areaWindRates));
             dispatch(actions.setVars('areaWindidss',areaWindids));
             dispatch(actions.setVars('areaWindidsss',areaWindids));

             dispatch(actions.setVars('areaWindNamesss',areaWindNames1));
             dispatch(actions.setVars('areaWindCostsss',areaWindCosts1));
             dispatch(actions.setVars('areaWindEarningsss',areaWindEarnings1));
             dispatch(actions.setVars('areaWindRatesss',areaWindRates1));
            

          
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);