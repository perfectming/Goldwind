//chart_1
option = {
    title: {
        text: '健康指数°H',
        bottom: '1%',
        textStyle: {
            fontSize: 14, color: '#74767a'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '8%',
        right: '7%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLine: {
            lineStyle: {
                color: '#747484'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#747484'
            }
        }
    },
    yAxis: {
        type: 'category',
        data: ['风场1', '风场2'],
        axisLine: {
            lineStyle: {
                color: '#747484'
            }
        }
    },
    textStyle: {
        fontSize: 14, color: '#74767a'
    },
    series: [
        {
            name: '健康指数°H',
            type: 'bar',
            barMaxWidth: 20,
            data: [80, 50],
            itemStyle: {
                normal: {
                    color: '#31f3fb',
                    barBorderRadius: [0, 15, 15, 0]
                }
            }
        }
    ]
};
var myChart = echarts.init(document.getElementById('chart_1'));
myChart.setOption(option);

//不同风场预警概况
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['数量', '百分比'],
        textStyle: {
            fontSize: 14, color: '#fff'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['风场1', '风场2', '风场3', '风场4', '风场5'],
            axisLine: {
                lineStyle: {
                    color: '#747484'
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
            min: 0,
            max: 1000,
            axisLine: {
                lineStyle: {
                    color: '#747484'
                }
            }
        },
        {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 1,
            axisLine: {
                lineStyle: {
                    color: '#747484'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#747484'
                }
            }
        }
    ],
    textStyle: {
        fontSize: 14, color: '#74767a'
    },
    series: [
        {
            name: '数量',
            type: 'bar',
            barMaxWidth: 20,
            data: [820, 632, 301, 734, 390],
            itemStyle: {
                normal: {
                    color: '#31f3fb',
                    barBorderRadius: [15, 15, 0, 0]
                }
            }
        },
        {
            name: '百分比',
            type: 'line',
            yAxisIndex: 1,
            data: [0.1, 0.5, 0.3, 0.2, 0.9],
            itemStyle: {
                normal: {
                    color: '#31f3fb'
                }
            }
        }
    ]
};
var myChart = echarts.init(document.getElementById('chart_2'));
myChart.setOption(option);

//预警接受统计
option = BarOption_orientation('', ['人工新增', '5级', '4级', '3级', '2级', '1级', '总预警数量'], '数量', [100, 50, 620, 250, 360, 450, 600])

var myChart = echarts.init(document.getElementById('chart_3'));
myChart.setOption(option);

//预警处理统计
option = BarOption_orientation('', ['回退', '已审核', '待审核'], '数量', [500, 250, 620])

var myChart = echarts.init(document.getElementById('chart_4'));
myChart.setOption(option);

//故障派工统计
option = BarOption_orientation('', ['人工新增', '已派工', '待派工'], '数量', [500, 250, 620])

var myChart = echarts.init(document.getElementById('chart_5'));
myChart.setOption(option);

//任务执行统计
option = BarOption_orientation('', ['已结项', '已执行', '带执行'], '数量', [500, 250, 620])

var myChart = echarts.init(document.getElementById('chart_6'));
myChart.setOption(option);

//各风场健康情况总览
function jkzl() {
    option = BarOption('健康度°H', ['风场1', '风场2'], '健康度°H', [50, 60], "click");

    var myChart = echarts.init(document.getElementById('dialog_1_chart_1'));
    myChart.setOption(option);
    myChart.on('click', function (params) {
        //alert(params.name)
        //删除总览的选中色
        $("#dialog_1 .zl_btn").addClass("noColor");

        sel_jkd();
    });
    //默认选择风电场1
    sel_jkd_zl();
}

function sel_jkd_zl() {
    option = LineOption('', ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'], '健康度°H', 0, 100, '健康度°H', [10, 50, 30, 20, 90]);

    var myChart = echarts.init(document.getElementById('dialog_1_chart_2'));
    myChart.setOption(option);
}
function sel_jkd() {
    option = LineOption('', ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'], '健康度°H', 0, 100, '健康度°H', [80, 60, 70, 40, 90]);

    var myChart = echarts.init(document.getElementById('dialog_1_chart_2'));
    myChart.setOption(option);
}

//各风场完结率总览
function fc_wjl() {
    option = {
        title: {
            text: '完结率%',
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: 14, color: '#74767a'
            }
        },
        tooltip: {
            trigger: 'axis',
            triggerOn: 'click',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
                return params[0].name + "<br />预警个数：" + getwjlInfo(params[0].name, '1') + "<br />完结个数：" + getwjlInfo(params[0].name, '2') + "<br />完结率：" + params[0].value + '%';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['风场1', '风场2'],
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
        },
        series: [
            {
                name: '完结率%',
                type: 'bar',
                barMaxWidth: 20,
                data: [50, 60],
                itemStyle: {
                    normal: {
                        color: '#31f3fb',
                        barBorderRadius: [15, 15, 0, 0]
                    }
                }
            }
        ]

    };
    var myChart = echarts.init(document.getElementById('dialog_2_chart_1'));
    myChart.setOption(option);
    myChart.on('click', function (params) {
        //alert(params.name)
        //删除总览的选中色
        $("#dialog_2 .zl_btn").addClass("noColor");
        sel_wjl();
    });
    //默认总览
    sel_wjl_zl();
}

function getwjlInfo(name, key) {
    var _value = '';
    for (var json in wjl_json) {
        if (wjl_json[json].name == name) {
            if ('1' == key) {
                _value = wjl_json[json].value1;
            } else {
                _value = wjl_json[json].value2;
            }
        }
    }
    return _value;
}

function sel_wjl_zl() {
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '%',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
        },
        series: [
            {
                name: '完结率',
                type: 'line',
                data: [10, 50, 30, 20, 90],
                itemStyle: {
                    normal: {
                        color: '#31f3fb'
                    }
                }
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('dialog_2_chart_2'));
    myChart.setOption(option);
}
function sel_wjl() {
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07'],
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '%',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
        },
        series: [
            {
                name: '完结率',
                type: 'line',
                data: [10, 50, 30, 20, 90, 40],
                itemStyle: {
                    normal: {
                        color: '#31f3fb'
                    }
                }
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('dialog_2_chart_2'));
    myChart.setOption(option);
}

//准确率
function fc_zql() {
    option = {
        title: {
            text: '健康度°H',
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: 14, color: '#74767a'
            }
        },
        tooltip: {
            trigger: 'axis',
            triggerOn: 'click',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
                return params[0].name + "<br />已结项：" + getwjlInfo(params[0].name, '1') + "<br />准确率：" + params[0].value + '%';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['风场1', '风场2'],
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
        },
        series: [
            {
                name: '准确率',
                type: 'bar',
                barMaxWidth: 20,
                data: [50, 60],
                itemStyle: {
                    normal: {
                        color: '#31f3fb',
                        barBorderRadius: [15, 15, 0, 0]
                    }
                }
            }
        ]

    };
    var myChart = echarts.init(document.getElementById('dialog_3_chart_1'));
    myChart.setOption(option);
    myChart.on('click', function (params) {
        //删除总览的选中色
        $("#dialog_3 .zl_btn").addClass("noColor");
        sel_zql();
    });
    //默认选择风电场1
    sel_zql_zl();
}

function sel_zql_zl() {
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '%',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
        },
        series: [
            {
                name: '准确率',
                type: 'line',
                data: [10, 50, 30, 20, 90],
                itemStyle: {
                    normal: {
                        color: '#31f3fb'
                    }
                }
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('dialog_3_chart_2'));
    myChart.setOption(option);
}
function sel_zql() {
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07'],
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '%',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
        },
        series: [
            {
                name: '准确率',
                type: 'line',
                data: [10, 50, 30, 20, 90, 80],
                itemStyle: {
                    normal: {
                        color: '#31f3fb'
                    }
                }
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('dialog_3_chart_2'));
    myChart.setOption(option);
}

function mtbf() {
    //显示图标
    option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '13%',
            top: '15%',
            containLabel: true
        },
        legend: {
            data: ['2015年MTBF值', '2016年MTBF值', '同比差值'],
            textStyle: {
                fontSize: 14, color: '#fff'
            },
            bottom: '3%'
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '天数',
                min: 0,
                max: 1200,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            },
            {
                type: 'value',
                name: '天数',
                min: 0,
                max: 600,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                }
            }

        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
        },
        series: [
            {
                name: '2015年MTBF值',
                type: 'bar',
                barMaxWidth: 40,
                data: [320, 332, 301, 334, 390, 330, 320],
                itemStyle: {
                    normal: {
                        color: '#1FE005'
                    }
                }

            },
            {
                name: '2016年MTBF值',
                type: 'bar',
                barMaxWidth: 40,
                data: [120, 132, 101, 134, 90, 230, 210],
                itemStyle: {
                    normal: {
                        color: '#31f3fb'
                    }
                }
            },
            {
                name: '同比差值',
                type: 'line',
                yAxisIndex: 1,
                data: [101, 505, 303, 402, 589, 389, 489],
                itemStyle: {
                    normal: {
                        color: '#FBD500'
                    }
                }
            }

        ]
    };
    var myChart = echarts.init(document.getElementById('dialog_4_chart_1'));
    myChart.setOption(option);
}