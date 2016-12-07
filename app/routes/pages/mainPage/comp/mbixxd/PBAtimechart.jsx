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
        let {monthT,profit,cost,w0,winsss,changedata3}=this.props;
        let configPie = {
            chart: {
                height:395,
                backgroundColor: '#282f37',
                plotBackgroundColor: '#282f37',
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
            },
            title: {
                text: '',
                align:'left',
                top:'-20px',
                vertical:'top',
                x : "0",
                style:{
                    color:"#fff",
                    fontSize:"25px",
                    fontFamily:"微软雅黑",
                    fontWeight:700,
                }
            },
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
            plotOptions: {
                column: {
                    pointPadding: 10,
                    pointWidth: 50,
                    borderRadius: 7,

                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                           w0=e.point.category;
                        var  a=w0.toString().split("");
                        var b=a[0];
                        changedata3(w0,winss,b);
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
                categories:monthT,
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
                text:'100%',
                align:'high',
                rotation:'0',
                y: -20,
                x: 40,
                style:{
                    color:'#fff',
                    fontSize:'14px'
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
                text: '',
                 align:'high',
                rotation:'0',
                y: -20,
                x: 40,

            },
            opposite: true
        }],

            series: [{
                name: '实际发电量',
                type: 'column',
                data: profit,
                color:'#64DC83',
                shadow:true,
                pointWidth: 25,
                borderWidth: 0,
                pointPlacement: 0,
            },
                {
                    name: '理论发电量',
                    type: 'column',
                    data:cost,
                    color:'#ccc',
                    pointWidth: 25,
                    shadow:'true',
                    pointPlacement: -0.1,
                },
                {
                    name: 'PBA',
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
        winsss: state.vars.wins1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
         changedata3 :(w0,winss,b)=>{
            dispatch(actions.setVars('w1',w0 ));
            dispatch(actions.setVars('wins1',winss[b-1]));
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);