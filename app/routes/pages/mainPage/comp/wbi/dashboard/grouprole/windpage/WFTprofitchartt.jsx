import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-dataq');

let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let{xxdwfId,input_url,changedata2qw,areaRecordCostT,areaRecordProfitO,rate,text,areaPlan,areaPlanDay, areaPlanDayT,width,height,areaNameX,areaRecordCost}=this.props;
     
        let configPie = {
            chart: {
                height:height,
                width:width,
                 backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                vertical:'top',
                 x : 110,
                 y:20,
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    
                }
            },
            // 插入图片
            //图例说明
            legend: {
                y:40,
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
            //柱子颜色
            colors: [ '#1E664A', '#4CDB9D']
            ,
            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                  
                    borderWidth: 0,

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            let    w0=e.point.index;
                            let b= parseInt(w0);
                       let arr1=[];
            let arr2=[];
            let arr3=[];
            let arr4=[];
            let date =new Date();
            let year =date.getFullYear();
                       
                            $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/yield/getWfieldMaxYieBayDay',  
             async:false,
            data:{
             'year':year,
             'month':w0+1,
             'wfid':xxdwfId,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
           
            
        
             let dataa=data.data;
             for(let i in dataa){
                 let day=dataa[i].day;
                 arr1.push(day+'日');
                 let incomes=dataa[i].incomes;
                 arr2.push(incomes);
                 let amounts=dataa[i].amounts;
                 arr3.push(amounts);
                 let rate=dataa[i].rate*100;
                 arr4.push(Number(rate.toFixed(2)));

             }
         
             },
             error:function(){
        
            
             },
           });
                              changedata2qw(w0,arr1,arr2,arr3,arr4,input_url,b)
                        }
                    }
                }
            },

            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        fontSize:'14px',
                        color:'#fff'  //字体
                    }
                },
                categories:areaNameX,
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
                text:'（元）',
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
            },
             gridLineDashStyle: 'Solid',
            gridLineColor: '#6d6a6c',
           tickInterval: 20,
            minRange: 20,
                
            title: {
                text: '(%)',
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
            //几条数据
            series: [{
                name: '收入',
                type: 'column',
                data: areaRecordCostT,
                color:'#33BAC0',
                borderColor:'#5B9BD5',
              maxPointWidth: 30,
                borderRadius: 3
            },
            {
            	name: '成本',
                type: 'column',
                data:areaRecordProfitO,
               color:'#70c080',
                maxPointWidth: 30,
               
                borderRadius: 3
            },
            {
                    name:"收益率",
                    type:'line',
                    color:'blue',
                    data:rate,
                    yAxis:1,
                    tickInterval: 1,
                     tooltip: {
               valueSuffix:'%'
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
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
           changedata2qw:(w0,arr1,arr2,arr3,arr4,input_url,b) => {
             dispatch(actions.setVars('actbt',w0));
            dispatch(actions.setVars('areaNamee',arr1));
              dispatch(actions.setVars('wind',arr2));
              dispatch(actions.setVars('windP',arr3));
              dispatch(actions.setVars('arr4',arr4));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);