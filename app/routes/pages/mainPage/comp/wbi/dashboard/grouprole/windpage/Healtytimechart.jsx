import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('./../group/Profit-data3');

let wins = data.areaPlanDayY;
let Component = React.createClass({
    componentWillMount() {


    },
    render() {

        let {height, text1, input_url,hlyyear,hlymonth, xxdwfId, xxdwfNa, w0, wins, monthT, areaRecordProfitT, text, changedata1,scolor}=this.props;
        let configPie = {
            chart: {
                height: height,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft: 100,

            },
            title: {
                text: text,
                align: 'left',
                top: '-20px',
                vertical: 'top',
                y: 14,
                x: 90,
                style: {
                    color: scolor,
                    fontSize: "16px",
                    fontFamily: "微软雅黑",

                }
            },
            legend: {
                y: 30,
                align: "right",
                verticalAlign: "top",
                itemHoverStyle: {
                    color: '#31f3fb',
                },
                itemStyle: {
                    color: scolor,
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑",

                }
            },
            tooltip: {},
            credits: {
                enabled: false
            },


            plotOptions: {
                column: {

                    borderWidth: 0,
                    maxPointWidth: 30,
                    borderRadius: 7,
                }, series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e,) {
                            let w0 = e.point.category;
                            let wc1 = e.point.index ;
                            let a = w0.toString().split("");
                            let b = a[0];
                            let WTHealH = [];
                            let WTHealName = [];
                            let WTN = [];

  console.log(hlymonth[wc1])
  console.log(hlyyear[wc1])
  

                            $.ajax({
                                type: 'post',
                                url: 'http://' + input_url + '/wbi/Health/getWfieldTimHealth',
                                async: false,
                                data: {
                                    "month":hlymonth[wc1],
                                    "year":hlyyear[wc1],
                                    'wfid':xxdwfId==undefined? "150801":xxdwfId,
                                },
                                dataType: 'json',
                                timeout: '3000',
                                success: function (data) {


                                    let WTHeal = data.data.dayHealth;
                                    let WTHeall = data.data.monthHealth;


                                    for (let i in WTHeal) {
                                        WTHealName.push(i.slice(6, 8) + '日');
                                        WTN.push(WTHeal[i])

                                    }


                                },
                                error: function () {

                                },
                            });
                            changedata1(hlymonth[wc1], WTHealName, WTN);

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
                        fontSize: '14px'
                    }
                },
                categories: monthT,
            },
            yAxis: [{
                labels: {
                    format: '',
                    style: {
                        color: scolor,
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                title: {
                    text: '(°H)',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 33,
                    style: {
                        fontSize: '14px',
                        color: scolor
                    }
                }
            }, {
                labels: {
                    format: '',
                    style: {
                        color: scolor,
                        fontSize: '14px'
                    }
                }, gridLineDashStyle: 'Solid',
                gridLineColor: '#6d6a6c',

                title: {
                    text: '',
                    align: 'high',
                    rotation: '0',
                    y: -20,
                    x: 40,

                },
                opposite: true
            }],

            series: [{
                name: '健康度',
                type: 'column',
                data: areaRecordProfitT,
                color: '#4CDB9D',
                tooltip: {
                    valueSuffix: '°H'
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

        wins: state.vars.wins1,
        windplan1: state.vars.windplan1,
        xxdwfId: state.vars.xxdwfId1,
        xxdwfNa: state.vars.xxdwfNa1,
        hlyyear : state.vars.hlyyear,
        hlymonth : state.vars.hlymonth,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changedata1: (w0, WTHealName, WTN) => {
  console.log(w0)
            dispatch(actions.setVars('wfH', w0+'月'));
            dispatch(actions.setVars('WTHealName12', WTHealName));
            dispatch(actions.setVars('WTN12', WTN));


        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);