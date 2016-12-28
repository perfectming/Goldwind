import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');





let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let arr=[];
        let line=[];
        let lineplan=[];
        let partent=0;
        let partentplan=0;
        let key=[];
        let allname=[];
        let allname1=[];
        let{mod,date}=this.props;
        for(let num in date){
             if(date[num].WTCount=='0' || date[num].InverterCount =='0'){
                line.push(Number(date[num].MonthEgyAt));
                 lineplan.push(Number(date[num].CurMonthPlanEgyAt));
                 if(date[num].MonthEgyAt/date[num].CurMonthPlanEgyAt=='Infinity'){
                    arr.push(0)
                 }else{
                 arr.push(Number(((date[num].MonthEgyAt/date[num].CurMonthPlanEgyAt)*100).toFixed(2)));
                    }
                key.push([num,Number(((date[num].MonthEgyAt/date[num].CurMonthPlanEgyAt)*100).toFixed(2))]);
                }

        }
        //获取总发电量和总计划发电量
        line.map((value,key)=>{
            partent+=value;
            partentplan+=lineplan[key];
        })
        //清空数组
        line.splice(0,line.length);
        lineplan.map((value,key)=>{
            line.push(Number(((partent/partentplan)*100).toFixed(2)))
        })
        console.log(arr)
         arr.sort(function(a,b){return b-a})//数据排列
         key.sort(function(a,b){
            return b[1]-a[1]
        })
         //根据数据排列风场光伏名字
         var aq=0;
        for(let name in mod.ens){
            if(mod.ens[name].wft){
               
            allname.push(mod.ens[key[aq][0]].name)
             aq++;
            }
        }

        var i=0;
        var one,two,three,foure;
         for(let na in mod.ens){

            if(na==key[0][0]){
            one=mod.ens[na].name
            }
             if(na==key[1][0]){
            two=mod.ens[na].name
            }
             if(na==key[2][0]){
            three=mod.ens[na].name
            }
             if(na==key[3][0]){
            foure=mod.ens[na].name
            }

         }
         allname1.push(one,two,three,foure)
        
           

            
            
            
            
        
   
       

        let configPie = {
            chart: {
                type: 'bar',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:320,
                marginTop:60,
            },
            title: {
                text: ''
            },
               xAxis: {

                tickInterval: 1,

                categories: allname,
                 labels: {

                       rotation:0,
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            color: '#fff',//颜色
                            fontSize:'14px',  //字体
                            fontFamily:"微软雅黑"

                        }
                }
            }, 
            yAxis: {  
                    lineWidth:1,
                    //dashStyle:"Dot",
                    gridLineWidth: 0,//虚线粗细
                    title: {
                        align: 'high',
                        rotation: 0,
                        text: "%",
                        style:{
                        color: "#fff"
                            },
                        },
                    labels: {
                       
                        rotation: 0,
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            color: '#fff',//颜色
                            fontSize:'14px'  //字体
                            }
                        }
                   },
            legend: {
                enabled: true ,
                align: 'right',
            verticalAlign: 'top',
                  x:0,
                  y:-15,
                  itemHoverStyle:{color:'#2ff4fb'},
                  itemStyle:{
                    color: "#fff",
                    fontSize:12,
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                  }
            },
            tooltip: {
                shared:true,
                style:{
                    color: '#000',
                    fontSize: '12px',
                    fontFamily:"微软雅黑"
                }

                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                //pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            rangeSelector: {
                enabled: false //不显示选项按钮
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },

            colors: ['#59e481', '#339C70', '#1E664A', '#134833', '#082B1F']
            ,
            plotOptions: {
                 column: {
                    borderColor:"",
                    },
                   series: {
                    animation:false,
                borderRadius: 7//圆角
            },
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '100%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [
            {
                type: 'column',
                color:"#33c5cd",
                name: "站场发电完成率",
                tooltip: {
                valueSuffix: '%'
            },
                data: arr,
            }, {
                type: 'line',
                color:"#0f0",
                name: "集团发电完成率",
                data: line,
                tooltip: {
                valueSuffix: '%'
                },
                marker: {
                        enabled: false
                       
                    }
            }]
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
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
