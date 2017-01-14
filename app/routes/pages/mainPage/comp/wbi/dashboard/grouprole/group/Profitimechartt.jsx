import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        
       let {GERa,GEAm,GENa,GEIn,height,w0,TBA,text,scolor}=this.props;
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
               
                 x: 105,
                y: 15,
                style:{
                    color:scolor,
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                  
                }
            },
            // 插入图片
            //图例说明
            legend: {
                x:-75,
                y:25,
                align:"right",
                verticalAlign: "top",
                itemHoverStyle:{
                    color:'#31f3fb',
                },
                itemStyle: {
                    color: scolor,
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
            colors: [ '#1E664A', '#4CDB9D']
            ,
            // 柱子宽 柱子间隔 柱子边框；
            plotOptions: {
                column: {
                   
            
                borderWidth:0,
                    borderRadius: 4

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                           
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
                        color: scolor,
                        fontSize:'14px'
                    }
                },
                categories:GENa,
            },
            yAxis: [
            {
                labels: {
                format: '',
                style: {
                    color: scolor,
                    fontSize:'14px'
                }
            },
             gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text:'（元）',
                align:'high',
                rotation:'0',
                y: -20,
                x: 45,
                style:{
                    fontSize:'14px',
                    color:scolor
                }
            }
        }, {
             labels: {
                format: '',
                style: {
                    color: scolor,
                    fontSize:'14px'
                }
            }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

            title: {
                text: '(%)',
                 align:'high',
                rotation:'0',
                y: -15,
                x: -48,
                style:{
                    color: scolor,
                    fontSize:'14px'
                }

            },
            opposite: true
        }],
            //几条数据
            series: [{
                name: '收入',
                type: 'column',
                data: GEIn,
                color:'#33BAC0',
                maxPointWidth: 20,
            },
            {
            	name: '成本',
                type: 'column',
                data:GEAm,
                color:'#70c080',
                maxPointWidth: 20,
            },{
                    name: '收益率',
                    type: 'line',
                    data:GERa,
                    color:'blue',
                    opposite:true,
                    yAxis:1,
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
    return {
          w0 : state.vars.monthTD,
    }
   
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);