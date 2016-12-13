<<<<<<< HEAD
import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let base = require('../../../../../../config/Model');
let data = require('../../../../../../config/ModelData');
let dat = data.ModelData;
let bas = base.Model.ens;
let arr=[];
let nam=[];
(function(){for(let i in dat){
    arr.push(dat[i].YearEgyAt/dat[i].YearPlanTotEgyAt);
}})();
arr.pop();
(function(){for(let i in bas){
    nam.push(bas[i].name);
}})();
nam.pop();
let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let configPie = {
            chart: {
                type: 'bar',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:360,
                marginLeft:50
            },
            title: {
                text: ''
            },
             xAxis: { 
                categories: nam,
                 labels: {

                       rotation: 0,
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
                    //tickInterval:80,//刻度线间距
                    gridLineWidth: 0,//虚线粗细
                    dashStyles: "ShortDot",//轴线样式：点状线
                    title: {
                        align: 'high',
                        rotation: 0,
                            text: "万(wh)",
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
                  itemStyle:{
                    color: "#fff",
                    fontSize:16,
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                  }
            },
            tooltip: {
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>"
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
                borderRadius: 10//圆角
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
                data: arr,
            },
             {
                type: 'line',
                color:"#59e481",
                name: "公司发电完成率",
                data: 0,
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
=======
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
                 arr.push(Number(((date[num].MonthEgyAt/date[num].CurMonthPlanEgyAt)*100).toFixed(2)));
                key.push([num,Number(((date[num].MonthEgyAt/date[num].CurMonthPlanEgyAt)*100).toFixed(2))]);
                }

        }
        //获取总发电量和计划发电量
        line.map((value,key)=>{
            partent+=value;
            partentplan+=lineplan[key];
        })
        //清空数组
        line.splice(0,line.length);
        lineplan.map((value,key)=>{
            line.push(Number(((partent/partentplan)*100).toFixed(2)))
        })
        
         arr.sort(function(a,b){return b-a})//数据排列
         key.sort(function(a,b){
            return b[1]-a[1]
        })
        for(let name in mod.ens){
            if(mod.ens[name].wft){
            allname.push(mod.ens[name].name)
            }
        }
        var i=0;
        var one,two,three;
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

         }
         allname1.push(one,two,three)
        
           

            
            
            
            
        
   
       

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

                categories: allname1,
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
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
