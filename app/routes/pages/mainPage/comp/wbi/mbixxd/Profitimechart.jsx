import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');
let input_url="10.9.100.38";
let Component = React.createClass({
    componentWillMount() {
    },
    render() { 
      let{changedata3,height,GeR,GeM,GeE,GeC,text}=this.props;
        let configPie = {
            chart: {
                height:height,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                
            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                vertical:'top',
                x : 100,
                y :20,
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    fontWeight:700,
                }
            },
            // 插入图片
            //图例说明
            legend: {
                align:"right",
                x:-75,
                y: 40,
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
            colors: [ '#64DC83', '#AACE4A','#FFD924','#FD9C31', '#EB6B34','#2623FF'],

            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                    pointPadding: 10,
                    stacking:'nomal',
                    pointWidth: 25,
                    borderRadius:10

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            let month=e.point.index+1;
                            let date =new Date();
            let year =date.getFullYear();
           
            let day = new Date(year,month,0); 
            let  daycount = day.getDate();
                           let GEIn=[];
        let GEAm=[];
        let GERa=[];
    let    GENa=[];
         for (let i=1;i<daycount+1;i++)
          {
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getMaxYieByDate',  
             async:false,
             data:{
              'startdate':year+'-'+month+'-'+i,
              'enddate':year+'-'+month+'-'+i,
             },
             dataType:'json',
             timeout:'3000',
             success:function(data){
            let GE=data.data;
         let incomes=GE.incomes
         GEIn.push(incomes);

         let amounts=GE.amounts
         GEAm.push(amounts);

         let rate=GE.rate
         GERa.push(rate);


         GENa.push(i+"日");
            
             
             },
             error:function(){
                
             }
           });
       }
 changedata3(month,GENa,GEIn,GEAm,GERa);
      

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
                categories:GeM,
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
                text:'(元)',
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
            //几条数据
            series: [{
                name: '收入',
                type: 'column',
                data: GeE,
                color:'#64DC83',
                shadow:true,
                pointWidth: 30,
                borderWidth: 0,
            },
                {
                    name: '成本',
                    type: 'column',
                    color:'#FC794E',
                    data: GeC,
                    stack:'waste',
                    pointWidth: 30,
                },
                
                {
                    name: '收益率',
                    type: 'line',
                    data: GeR,
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
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata3:(month,GENa,GEIn,GEAm,GERa)=>{
             dispatch(actions.setVars('GENa1',GENa));
       dispatch(actions.setVars('GEIn1',GEIn));
       dispatch(actions.setVars('GEAm1',GEAm));
       dispatch(actions.setVars('GERa1',GERa));
       dispatch(actions.setVars('w0GE',month+'月' ))
         }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);