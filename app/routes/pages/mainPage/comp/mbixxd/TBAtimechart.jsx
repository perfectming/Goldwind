import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./Profit-data');
let winss=data.areaPlanDayY;
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
       
        let{w0,winss,areaName,montht,profit,cost,changedata2}=this.props;
        let configPie = {
            chart: {
                height:380,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: '',
                align:'left',
                vertical:'top',
                offset:200,
                x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                    fontWeight:700,
                    top:'20px',
                }
            },
            // 插入图片
            //图例说明
            legend: {
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
                    pointPadding: 10,
                    pointWidth: 50,
                    borderRadius: 7

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                       w0=e.point.category;
                        var  a=w0.toString().split("");
                        var b=a[0];
                        changedata2(w0,winss,b);
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
            yAxis: {
                 gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text:'100%',
                    align:'high',
                    rotation:'0',
                    y: -20,
                    x: 40,
                    style:{
                        fontSize:'14px',
                        color:'white',
                    }
            },


        labels: {
                    title:'100%',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                       color:'white',
                        fontSize:'14px'  //字体
                    }
                },
            },

            series: [{
                name: '实际运行时间',
                type: 'column',
                data: profit,
                color:'#64DC83',
                shadow:true,
                pointWidth: 25,
                borderWidth: 0,
                pointPlacement: 0,
            },
                {
                    name: '停机时间',
                    type: 'column',
                    data:cost,
                    color:'#ccc',
                    pointWidth: 25,
                    shadow:'true',
                    pointPlacement: -0.1,
                },
                {
                    name: 'TBA',
                    type: 'line',
                    data:cost,
                    color:'blue',
                    pointWidth: 15,
                    shadow:'true',
                   
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
          w0 : state.vars.w1,
        winss: state.vars.wins1,
         windplan1 : state.vars.windplan1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata2 :(w0,wins,b)=>{
           dispatch(actions.setVars('w1',w0 ));
        dispatch(actions.setVars('wins1',winss[b-1]));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);