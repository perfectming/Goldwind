var _fontSize = 14;
var barGapJson = [{ gap: '-82%', cate: '90%' }, { gap: '-80%', cate: '79%' }, { gap: '-80%', cate: '79%' }, { gap: '-82%', cate: '60%' }, { gap: '-100%', cate: '40%' }];
function BarOption(title, xAxisData, seriesTitle, seriesData, triggerOn) {
    if (triggerOn == "click") {
        var yMax = 100;
        var dataShadow = [];
        for (var i = 0; i < seriesData.length; i++) {
            dataShadow.push(yMax);
        }
        //图标开始
        option = {
            title: {
                text: title,
                left: '3%',
                top: '2%',
                textStyle: {
                    fontSize: _fontSize, color: '#ffffff'
                }
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: triggerOn,
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
				formatter: function (params, ticket, callback) {
					return params[0].name + "<br />"+params[1].seriesName+"：" + params[1].data;
				}
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '12%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#747484'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: _fontSize
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
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: _fontSize
                        }
                    }

                }
            ],
            textStyle: {
                fontSize: _fontSize, color: '#ffffff'
            },
            series: [{ // For shadow
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.1)' }
                },
                barGap: (seriesData.length <= barGapJson.length ? barGapJson[seriesData.length-1].gap : barGapJson[4].gap),
                barCategoryGap: (seriesData.length <= barGapJson.length ? barGapJson[seriesData.length-1].cate : barGapJson[4].cate),
                data: dataShadow,
                animation: false
            },
                {
                    name: seriesTitle,
                    type: 'bar',
                    barMaxWidth:50,
                    data: seriesData,
                    itemStyle: {
                        normal: {
                            color: '#31f3fb',
                            barBorderRadius: [15, 15, 0, 0]
                        }
                    }
                }
            ]

        };
        return option;
    }
    else {
        //图标开始
        option = {
            title: {
                text: title,
                left: '3%',
                top: '2%',
                textStyle: {
                    fontSize: _fontSize, color: '#ffffff'
                }
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: triggerOn,
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '12%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#747484'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: _fontSize
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
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: _fontSize
                        }
                    }

                }
            ],
            textStyle: {
                fontSize: _fontSize, color: '#ffffff'
            },
            series: [
                {
                    name: seriesTitle,
                    type: 'bar',
                    barMaxWidth: 20,
                    data: seriesData,
                    itemStyle: {
                        normal: {
                            color: '#31f3fb',
                            barBorderRadius: [15, 15, 0, 0]
                        }
                    }
                }
            ]

        };
        return option;
    }
}

function BarOption_2(title, xAxisData, seriesTitle, seriesData, triggerOn) {
    //图标开始
    option = {
        title: {
            text: title,
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: _fontSize, color: '#ffffff'
            }
        },
        tooltip: {
            trigger: 'axis',
            triggerOn: triggerOn,
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '12%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:_fontSize
                    }
                }
            }
        ],
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [
            {
                name: seriesTitle,
                type: 'bar',
                barMaxWidth: 20,
                data: seriesData,
                itemStyle: {
                    normal: {
                        color: '#31f3fb',
                        barBorderRadius: [15, 15, 0, 0]
                    }
                }
            }
        ]

    };
    return option;
}

//横向
function BarOption_orientation(title, yAxisData, seriesTitle, seriesData) {
    option = {
        title: {
            text: title,
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: _fontSize, color: '#74767a'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '5%',
            right: '7%',
            bottom: '3%',
            top: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value',interval: 10,
            axisLabel: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#747484',
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: _fontSize
                }
            }
        },
        yAxis: {
            type: 'category',
            data: yAxisData,
            axisLine: {
                lineStyle: {
                    color: '#747484'
                }
            },
            axisLabel:{
                textStyle:{
                    fontSize:_fontSize
                }
            }
        },
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [
            {
                name: seriesTitle,
                type: 'bar',
                barMaxWidth: 20,
                data: seriesData,
                label: {
                    normal: {
                        position: ['102%', '8%'],
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#31f3fb',
                        barBorderRadius: [0, 15, 15, 0]
                    }
                }
            }
        ]
    };
    return option;
}

function LineOption(title, xAxisData, yAxisName, yAxisMin, yAxisMax, seriesTitle, seriesData) {
    option = {
        title: {
            text: title,
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: _fontSize, color: '#74767a'
            }
        },
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
            top:'12%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: seriesTitle,
                min: yAxisMin,
                max: yAxisMax,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [
            {
                name: seriesTitle,
                type: 'line',
                data: seriesData,
                itemStyle: {
                    normal: {
                        color: '#31f3fb'
                    }
                }
            }
        ]
    };
    return option;
}

function Pie_hollow(legendData, seriesData) {
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: '90%',
            data: legendData,
            textStyle: {
                fontSize: _fontSize, color: '#fff'
            }
        },
        series: [
			{
                name:'隐患等级',
			    type: 'pie',
			    radius: ['50%', '70%'],
			    avoidLabelOverlap: false,
			    label: {
			        normal: {
			            show: false,
			            position: 'center'
			        },
			        emphasis: {
			            show: true,
			            textStyle: {
			                fontSize: '30',
			                fontWeight: 'bold'
			            }
			        }
			    },
			    labelLine: {
			        normal: {
			            show: false
			        }
			    },
			    data: seriesData
			}
        ]
    };

    return option;
}

var now = new Date();
var json_jkzl;
function jkzl_index() {

    $.ajax({
        type: "post",
        url: GetAllUrl(window.ApiDomian + '/alarm/health.json?beginTime=' + now.getFullYear() + '-01-01&endTime=' + getDay()),
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            json_jkzl = json; 
            var yAxisData = new Array();
            var seriesData = new Array();
            for (var o in json.data.totalHeath.wfHealthList) {
                yAxisData.push(json.data.totalHeath.wfHealthList[o].wfName);
                seriesData.push(json.data.totalHeath.wfHealthList[o].totalHealth);
            }
            $(".zl_t i:eq(0)").text(json.data.totalHeath.regionHealth + '°H')
            yAxisData.reverse();
            seriesData.reverse();
            //chart_1
            option = {
                title: {
                    text: '健康指数°H',
                    top: '3%',
                    left:'5%',
                    textStyle: {
                        fontSize: _fontSize, color: '#ffffff'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '2%',
                    right: '7%',
                    top: '10%',
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
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: _fontSize
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: yAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#747484'
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            fontSize:_fontSize
                        }
                    }
                },
                textStyle: {
                    fontSize: _fontSize, color: '#ffffff'
                },
                series: [
                    {
                        name: '健康指数°H',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: seriesData,
                        itemStyle: {
                            normal: {
                                color: 'rgb(112, 192, 128)',
                                barBorderRadius: [0, 15, 15, 0]
                            }
                        }
                    }
                ]
            };
            var myChart = echarts.init(document.getElementById('chart_1'));
            myChart.setOption(option);
        },
        error: function () {
            //alert('载入数据失败！');
        }
    });
}

var json_yjgk;
function yjgk_index() {

    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + '/main_getWfAlarmInfoByWtType.action?beginTime=' + now.getFullYear() + '-01-01 00:00:00&endTime=' + getDay() + " 23:59:59&areaId=201409110342501"),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            json_yjgk = json;
            var xAxisData = new Array();
            var seriesData1 = new Array();
            var seriesData2 = new Array();
            for (var o in json.listData) {
                xAxisData.push(json.listData[o].dicsName);
                seriesData1.push(json.listData[o].areaAlarmCount);
                seriesData2.push(json.listData[o].rate);
            }
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
                        fontSize: _fontSize, color: '#fff'
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
                        data: xAxisData,
                        axisLine: {
                            lineStyle: {
                                color: '#747484'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: _fontSize
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '数量',
                        min: 0,
                        max: 100,
                        axisLine: {
                            lineStyle: {
                                color: '#747484'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: _fontSize
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
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: _fontSize
                            }
                        }
                    }
                ],
                textStyle: {
                    fontSize: _fontSize, color: '#ffffff'
                },
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: seriesData1,
                        itemStyle: {
                            normal: {
                                color: 'rgb(208, 105, 96)',
                                barBorderRadius: [15, 15, 0, 0]
                            }
                        }
                    },
                    {
                        name: '百分比',
                        type: 'line',
                        yAxisIndex: 1,
                        data: seriesData2,
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
        },
        error: function () {
            //alert('载入数据失败！');
        }
    });
}

//预警接受统计
function yjjstj() {
    var yjjstjlay = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + '/main_getAlarmInfo.action'),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            var yAxisData = new Array();
            var seriesData = new Array();
            for (var o in json.listData) {
                if (json.listData[o].name == '总预警' || json.listData[o].name == '新增预警') {                   
                    yAxisData.push(json.listData[o].name);
                    seriesData.push(json.listData[o].data);
                } else if (json.listData[o].name == '等级信息') {
                    for (var t in json.listData[o].data) {
                        yAxisData.push(json.listData[o].data[t].name);
                        seriesData.push(json.listData[o].data[t].data);
                    }
                } else if (json.listData[o].name == '预警排序' && json.listData[o].data != null) {
                    for (var i = 0; i < json.listData[o].data.length;i++) {
                        $(".yjtj .top3:eq(0)").append('<a title="' + json.listData[o].data[i].dicsName + '">' + sb_substr(json.listData[o].data[i].dicsName, 0, 10) + '</a>');
                        if(i >= 2)
                            break;
                    }
                }
            }
            yAxisData.reverse();
            seriesData.reverse();
            option = BarOption_orientation('', yAxisData, '数量', seriesData)

            var myChart = echarts.init(document.getElementById('chart_3'));
            myChart.setOption(option);
            myChart.on('click', function (params) {
                location.href = 'yj_history_list.html?state=' + escape(params.name)
            });
            layer.close(yjjstjlay);
        },
        error: function () {
            layer.close(yjjstjlay);
            //alert('载入数据失败！');
        }
    });
}

//预警处理统计
function yjcltj(page, chart, index) {
    var yjclay = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + page),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            var yAxisData = new Array();
            var seriesData = new Array();
            for (var o in json.listData) {
                if (json.listData[o].name == '预警排序') {
                    if (json.listData[o].data != null) {
                        for (var i = 0; i < json.listData[o].data.length;i++) {
                            $(".yjtj .top3:eq("+index+")").append('<a title="' + json.listData[o].data[i].dicsName + '">' + sb_substr(json.listData[o].data[i].dicsName, 0, 10) + '</a>');
                            if(i >= 2)
                                break;
                        }
                    }
                } else {
                    yAxisData.push(json.listData[o].name);
                    seriesData.push(json.listData[o].data);
                }
            }
            yAxisData.reverse();
            seriesData.reverse();
            option = BarOption_orientation('', yAxisData, '数量', seriesData)

            var myChart = echarts.init(document.getElementById(chart));
            myChart.setOption(option);
            myChart.on('click', function (params) {
                if(index == 2)
                    location.href = 'yj_history_list.html?state=' + escape(params.name)
                else
                    location.href = 'yj_history_list.html?state=' + escape(params.name)
            });
            layer.close(yjclay);
        },
        error: function () {
            layer.close(yjclay);
            //alert('载入数据失败！');
        }
    });
}

function rwzxtj() {
    var rwzxtjlay = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + '/main_getExecuteInfo.action'),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            var yAxisData = new Array();
            var seriesData = new Array();
            for (var o in json.listData) {
                if (json.listData[o].name == '已结项区域排序') {
                    if (json.listData[o].data != null) {
                        for (var i = 0; i < json.listData[o].data.length;i++) {
                            $(".yjtj .top3:eq(3)").append('<a title="' + json.listData[o].data[i].dicsName + '">' + sb_substr(json.listData[o].data[i].dicsName, 0, 10) + '</a>');
                            if(i >= 2)
                                break;
                        }
                    }
                } else if(json.listData[o].name != '待执行'){
                    yAxisData.push(json.listData[o].name);
                    seriesData.push(json.listData[o].data);
                }
            }
            yAxisData.reverse();
            seriesData.reverse();
            option = BarOption_orientation('', yAxisData, '数量', seriesData)

            var myChart = echarts.init(document.getElementById('chart_6'));
            myChart.setOption(option);
            myChart.on('click', function (params) {
                location.href = 'yj_history_list.html?state=' + escape(params.name)
            });
            layer.close(rwzxtjlay);
        },
        error: function () {
            layer.close(rwzxtjlay);
            //alert('载入数据失败！');
        }
    });
}

//各风场健康情况总览
function jkzl() {
    var yAxisData = new Array();
    var seriesData = new Array();
    if (json_jkzl == undefined) {
        alert('获取数据失败，请刷新页面重试');
        return;
    }
    $("#dialog_1 .scroll").html('');
    for (var o in json_jkzl.data.totalHeath.wfHealthList) {
        yAxisData.push(json_jkzl.data.totalHeath.wfHealthList[o].wfName);
        seriesData.push(json_jkzl.data.totalHeath.wfHealthList[o].totalHealth);
        
        $("#dialog_1 .scroll").append('<p class="font14 font_fff mt15">' + json_jkzl.data.totalHeath.wfHealthList[o].wfName + '（' + json_jkzl.data.totalHeath.wfHealthList[o].totalHealth + '°H）</p><div class="pgrop"><div style="width:' + json_jkzl.data.totalHeath.wfHealthList[o].totalHealth + '%;"></div></div>');
    }

    option = BarOption('健康度°H', yAxisData, '健康度°H', seriesData, "click");

    var myChart = echarts.init(document.getElementById('dialog_1_chart_1'));
    myChart.setOption(option);
    myChart.on('click', function (params) {
        //删除总览的选中色
        $("#dialog_1 .zl_btn").addClass("noColor");
        $("#dialog_1 .left h1").text(now.getFullYear() + '年1月-' + (now.getMonth() + 1) + '月 巴盟 ' + params.name + ' 健康度');
        sel_jkd(params.name);
    });
    //默认选择风电场1
    sel_jkd_zl();
}

function sel_jkd_zl() {
    if (json_jkzl == undefined)
        return;
    var yAxisData = new Array();
    var seriesData = new Array();
    var health = JSON.stringify(json_jkzl.data.totalHeath.monthHealth);
    health = health.substr(1, health.length - 2);
    var healthArr = health.split(',');
    var name = '';
    for (var o in healthArr) {
        name = healthArr[o].split(':')[0];
        yAxisData.push(name.substr(1, name.length - 2));
        seriesData.push(healthArr[o].split(':')[1]);
    }

    option = LineOption('', yAxisData, '健康度°H', 0, 100, '健康度°H', seriesData);

    var myChart = echarts.init(document.getElementById('dialog_1_chart_2'));
    myChart.setOption(option);
}
function sel_jkd(name) {
    var yAxisData = new Array();
    var seriesData = new Array();
    if (json_jkzl == undefined)
        return;
    for (var o in json_jkzl.data.totalHeath.wfHealthList){
        if (json_jkzl.data.totalHeath.wfHealthList[o].wfName == name) {
            var health = JSON.stringify(json_jkzl.data.totalHeath.wfHealthList[o].monthHealth);
            health = health.substr(1, health.length - 2);
            var healthArr = health.split(',');
            var name = '';
            for (var o in healthArr) {
                name = healthArr[o].split(':')[0];
                yAxisData.push(name.substr(1, name.length - 2));
                seriesData.push(healthArr[o].split(':')[1]);
            }
            break;
        }
    }

    option = LineOption('', yAxisData, '健康度°H', 0, 100, '健康度°H', seriesData);

    var myChart = echarts.init(document.getElementById('dialog_1_chart_2'));
    myChart.setOption(option);
}

//各风场完结率总览
function fc_wjl() {
    if(json_yjgk == undefined){
        return;
    }
    $("#dialog_2 .scroll").html('');
    var xAxisData = new Array();
    var seriesData = new Array();
    var dataShadow = [];
    for (var o in json_yjgk.listData) {
        xAxisData.push(json_yjgk.listData[o].dicsName);
        seriesData.push(json_yjgk.listData[o].rate * 100);
        dataShadow.push(100);
        $("#dialog_2 .scroll").append('<p class="font14 font_fff mt15">' + json_yjgk.listData[o].dicsName + '（' + json_yjgk.listData[o].rate * 100 + '%）</p><div class="pgrop"><div style="width:' + json_yjgk.listData[o].rate * 100 + '%;"></div></div>');
    }
    option = {
        title: {
            text: '完结率%',
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: _fontSize, color: '#ffffff'
            }
        },
        tooltip: {
            trigger: 'axis',
            triggerOn: 'click',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
                return params[0].name + "<br />预警个数：" + getwjlInfo(params[0].dataIndex, 1,1) + "<br />完结个数：" + getwjlInfo(params[0].dataIndex, 2,1) + "<br />完结率：" + params[1].value + '%';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'12%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
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
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.1)' }
                },
                barGap: (seriesData.length <= barGapJson.length ? barGapJson[seriesData.length-1].gap : barGapJson[4].gap),
                barCategoryGap: (seriesData.length <= barGapJson.length ? barGapJson[seriesData.length-1].cate : barGapJson[4].cate),
                data: dataShadow,
                animation: false
            },
            {
                name: '完结率%',
                type: 'bar',
                barMaxWidth: 50,
                data: seriesData,
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
        $("#dialog_2 .left h1").text(now.getFullYear() + '年1月-' + (now.getMonth() + 1) + '月 巴盟 ' + params.name + ' 完结率');
        sel_wjl(params.dataIndex);
    });
    //默认总览
    sel_wjl_zl();
}

function getwjlInfo(index, key,source) {
    if (source == 1) {
        if (json_yjgk == undefined)
            return;
        
        if (key == 1)
            return json_yjgk.listData[index].areaAlarmCount;
        else
            return json_yjgk.listData[index].endCount == undefined ? 0 :json_yjgk.listData[index].endCount ;
    } else if (source == 2) {
        if (json_wjl_zl_line == undefined)
            return;
        for (var o in json_wjl_zl_line.listData) {

            if(json_wjl_zl_line.listData[o].dt == index){
                if (key == 1)
                    return json_wjl_zl_line.listData[o].areaAlarmCount == undefined ? 0 : json_wjl_zl_line.listData[o].areaAlarmCount;
                else
                    return json_wjl_zl_line.listData[o].endCount == undefined ? 0 : json_wjl_zl_line.listData[o].endCount;

                break;
            }
        }
        
    } else if (source == 3) {
        if (json_wjl_line == undefined)
            return;

        for(var o in json_wjl_line.listData){
            if(json_wjl_line.listData[o].dt == index){
                if (key == 1)
                    return json_wjl_line.listData[o].areaAlarmCount == undefined ? 0 : json_wjl_line.listData[o].areaAlarmCount;
                else
                    return json_wjl_line.listData[o].endCount == undefined ? 0 : json_wjl_line.listData[o].endCount;

                break;
            }
        }
    }

    return 0;
}


var json_wjl_zl_line;
function sel_wjl_zl() {
    var lay_wjl_zl = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + '/main_getAlarmInfoByTime.action?beginTime=' + now.getFullYear() + '-01-01 00:00:00&endTime=' + getDay() + " 23:59:59&areaId=201409110342501"),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        complete: function () {
            layer.close(lay_wjl_zl);
        },
        success: function (json) {
            json_wjl_zl_line = json;
            var xAxisDate = new Array();
            var seriesDate = new Array();
            var month;
            var flag;
            for (var i = 1; i <= (now.getMonth() + 1) ; i++) {
                month = i < 10 ? '0' + i : i;
                flag = false;
                for (var o in json.listData) {
                    if (json.listData[o].dt == now.getFullYear() + '-' + month) {
                        xAxisDate.push(json.listData[o].dt);
                        seriesDate.push(json.listData[o].rate * 100);
                        flag = true;
                        break;
                    }
                }
                if (flag == false) {
                    xAxisDate.push(now.getFullYear() + '-' + month);
                    seriesDate.push(0);
                }
            }

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params, ticket, callback) {
                        return params[0].name + "<br />预警个数：" + getwjlInfo(params[0].name, 1, 2) + "<br />完结个数：" + getwjlInfo(params[0].name, 2, 2) + "<br />完结率：" + parseFloat(params[0].value).toFixed(2) + '%';
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '12%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxisDate,
                        axisLine: {
                            lineStyle: {
                                color: '#747484'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: _fontSize
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
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: _fontSize
                            }
                        }
                    }
                ],
                textStyle: {
                    fontSize: _fontSize, color: '#ffffff'
                },
                series: [
                    {
                        name: '完结率',
                        type: 'line',
                        data: seriesDate,
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
        },
        error: function () {
            //alert('载入数据失败！');
        }
    });
}
var json_wjl_line;
function sel_wjl(index) {
    var lay_wjl = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + '/main_getAlarmInfoByTime.action?beginTime=' + now.getFullYear() + '-01-01 00:00:00&endTime=' + getDay() + " 23:59:59&areaId=201409110342501&wfId=" + json_yjgk.listData[index].dicsID),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        complete: function () {
            layer.close(lay_wjl);
        },
        success: function (json) {
            json_wjl_line = json;
            var xAxisDate = new Array();
            var seriesDate = new Array();
            var month;
            var flag;
            for (var i = 1; i <= (now.getMonth() + 1) ; i++) {
                month = i < 10 ? '0' + i : i;
                flag = false;
                for (var o in json.listData) {
                    if (json.listData[o].dt == now.getFullYear() + '-' + month) {
                        xAxisDate.push(json.listData[o].dt);
                        seriesDate.push(json.listData[o].rate * 100);
                        flag = true;
                        break;
                    }
                }
                if (flag == false) {
                    xAxisDate.push(now.getFullYear() + '-' + month);
                    seriesDate.push(0);
                }
            }

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params, ticket, callback) {
                        return params[0].name + "<br />预警个数：" + getwjlInfo(params[0].name, 1, 3) + "<br />完结个数：" + getwjlInfo(params[0].name, 2, 3) + "<br />完结率：" + parseFloat(params[0].value).toFixed(2) + '%';
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '12%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxisDate,
                        axisLine: {
                            lineStyle: {
                                color: '#747484'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: _fontSize
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
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: _fontSize
                            }
                        }
                    }
                ],
                textStyle: {
                    fontSize: _fontSize, color: '#ffffff'
                },
                series: [
                    {
                        name: '完结率',
                        type: 'line',
                        data: seriesDate,
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
        },
        error: function () {
            //alert('载入数据失败！');
        }
    });
}

//准确率
var json_zql;

function fc_zql_get() {
    var index_zql_get = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    var month = now.getMonth()+1;
    $.ajax({
        type: "post",
        timeout: 1000*60*60,
        url: GetAllUrl(window.ApiDomian + '/alarm/precision.json?beginTime=' + now.getFullYear() + '01&endTime=' + (now.getFullYear()+1)+'01'),
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        complete: function () {
            layer.close(index_zql_get);
        },
        success: function (json) {
            json_zql = json;
            $(".zl_t i:eq(2)").text(json_zql.data.precison.precision + '%');
        },
        error: function () {
            //alert('载入数据失败！');
        }
    });
}

function fc_zql() {
    //总览
    var xAxisData = new Array();
    var seriesData = new Array();
    if (json_zql == undefined)
        return;
    $("#dialog_3 .scroll").html('');

    var yMax = 100;
    var dataShadow = [];
    for (var o in json_zql.data.precison.wfMonthPre) {
        xAxisData.push(json_zql.data.precison.wfMonthPre[o].wfName);
        seriesData.push(json_zql.data.precison.wfMonthPre[o].precision);
        $("#dialog_3 .scroll").append('<p class="font14 font_fff mt15">' + json_zql.data.precison.wfMonthPre[o].wfName + '（' + json_zql.data.precison.wfMonthPre[o].precision + '%）</p><div class="pgrop"><div style="width:' + json_zql.data.precison.wfMonthPre[o].precision + '%;"></div></div>');
        dataShadow.push(yMax);
    }

    option = {
        title: {
            text: '准确率',
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: _fontSize, color: '#ffffff'
            }
        },
        tooltip: {
            trigger: 'axis',
            triggerOn: 'click',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
                return params[0].name + "<br />已结项：" + fc_zql_tooltip(params[0].dataIndex, 1) + "<br />准确率：" + params[1].value + '%';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '12%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max:100,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [{ // For shadow
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.1)' }
                },
                barGap: (seriesData.length <= barGapJson.length ? barGapJson[seriesData.length-1].gap : barGapJson[4].gap),
                barCategoryGap: (seriesData.length <= barGapJson.length ? barGapJson[seriesData.length-1].cate : barGapJson[4].cate),
                data: dataShadow,
                animation: false
            },
            {
                name: '准确率',
                type: 'bar',
                barMaxWidth:50,
                data: seriesData,
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
        $("#dialog_3 .left h1").text(now.getFullYear() + '年1月-' + (now.getMonth() + 1) + '月 巴盟 ' + params.name + ' 准确率');
        sel_zql(params.dataIndex);
    });
    //默认选择风电场1
    sel_zql_zl();
}

function fc_zql_tooltip(index, source, nameIndex) {
    if (json_zql == undefined)
        return;
    if (source == 1) {
        //柱状图
        return json_zql.data.precison.wfMonthPre[index].total;
    } else if (source == 2) {
        //总览曲线图
        return json_zql.data.precison.monthPrecision[index].total;
    } else if (source == 3) {
        //总览曲线图
        return json_zql.data.precison.wfMonthPre[nameIndex].monthPre[index].total;
    }
}

function sel_zql_zl() {
    var xAxisData = new Array();
    var seriesData = new Array();
    if (json_zql == undefined)
        return;

    for (var o in json_zql.data.precison.monthPrecision) {
        xAxisData.push(json_zql.data.precison.monthPrecision[o].ym);
        seriesData.push(json_zql.data.precison.monthPrecision[o].precision);
    }

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
                return params[0].name + "<br />已结项：" + fc_zql_tooltip(params[0].dataIndex, 2) + "<br />准确率：" + params[0].value + '%';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
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
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [
            {
                name: '准确率',
                type: 'line',
                data: seriesData,
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
function sel_zql(index) {
    var xAxisData = new Array();
    var seriesData = new Array();
    if (json_zql == undefined)
        return;

    for (var o in json_zql.data.precison.wfMonthPre[index].monthPre) {
        xAxisData.push(json_zql.data.precison.wfMonthPre[index].monthPre[o].ym);
        seriesData.push(json_zql.data.precison.wfMonthPre[index].monthPre[o].precision);
    }

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
                return params[0].name + "<br />已结项：" + fc_zql_tooltip(params[0].dataIndex, 3,index) + "<br />准确率：" + params[0].value + '%';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
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
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [
            {
                name: '准确率',
                type: 'line',
                data: seriesData,
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

var json_mtbf;
function mtbf_get() {
    var mtbflay = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    $.ajax({
        type: "get",
        url: GetAllUrl(window.ApiDomian + '/alarm/mtbf.json?beginTime=' + now.getFullYear()),
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            json_mtbf = json;
            $(".zl_t i:eq(3)").text(json.data.mtbf.total);
            layer.close(mtbflay);
        },
        error: function () {
            layer.close(mtbflay);
            //alert('载入数据失败！');
        }
    });
}

function mtbf() {
    var html = '';
    var xAxisData = new Array();
    var seriesData_2015  = new Array();
    var seriesData_2016  = new Array();
    var seriesData = new Array();
    $('#dialog_4 .mtbf ul').html('');
    if (json_mtbf == undefined)
        return;

    for (var i = 0; i < json_mtbf.data.mtbf.currMtbfs.length; i++) {
        
        xAxisData.push(json_mtbf.data.mtbf.currMtbfs[i].ym.split('_')[1]+'月');
        seriesData_2015.push(json_mtbf.data.mtbf.lastMtbfs[i].total);
        seriesData_2016.push(json_mtbf.data.mtbf.currMtbfs[i].total);
        seriesData.push(json_mtbf.data.mtbf.currMtbfs[i].tbcz);
        html = '<li><div class="row_1 clearfix"><p class="month">'+(i+1)+'</p><p class="kong ';
        if(json_mtbf.data.mtbf.currMtbfs[i].tb > 0 && json_mtbf.data.mtbf.currMtbfs[i].tb != 99999)
            html += 'sheng';
        else if(json_mtbf.data.mtbf.currMtbfs[i].tb < 0)
            html += 'jiang';
        html+='">';
        
        if(json_mtbf.data.mtbf.currMtbfs[i].tb == 99999)
            html += '<span>&nbsp;</span>'
        else
            html += '<span>'+ Math.abs(json_mtbf.data.mtbf.currMtbfs[i].tb) +'%</span>';

        html += '</p><p class="kong ';
        if (json_mtbf.data.mtbf.currMtbfs[i].hb > 0 && json_mtbf.data.mtbf.currMtbfs[i].hb != 99999)
            html += 'sheng';
        else if(json_mtbf.data.mtbf.currMtbfs[i].hb < 0)
            html += 'jiang';
        html += '">';

        if (json_mtbf.data.mtbf.currMtbfs[i].hb == 99999)
            html += '<span>&nbsp;</span>'
        else
            html += '<span>' + Math.abs(json_mtbf.data.mtbf.currMtbfs[i].hb) + '%</span>';

        html += '</p></div><div class="row_2 clearfix"><p class="month">月</p><p>同比</p><p>环比</p></div></li>';

        $('#dialog_4 .mtbf ul').append(html);
    }

    //显示图标
    option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '13%',
            top: '15%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['2015年MTBF值', '2016年MTBF值', '同比差值'],
            textStyle: {
                fontSize: _fontSize, color: '#fff'
            },
            bottom: '3%'
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '天数',
                axisLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#747484'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: _fontSize
                    }
                }
            }

        ],
        textStyle: {
            fontSize: _fontSize, color: '#ffffff'
        },
        series: [
            {
                name: '2015年MTBF值',
                type: 'bar',
                barMaxWidth: 40,
                data: seriesData_2015,
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
                data: seriesData_2016,
                itemStyle: {
                    normal: {
                        color: '#31f3fb'
                    }
                }
            },
            {
                name: '同比差值',
                type: 'line',
                data: seriesData,
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

function gdwjl_top() {
    var gdwjllay = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + '/main_getEndRate.action?beginTime=' + now.getFullYear() + '-01-01 00:00:00&endTime=' + getDay() + " 23:59:59&areaId=201409110342501"),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            $(".zl_t i:eq(1)").text(parseFloat((json.data.data * 100)).toFixed(2) + '%');
            layer.close(gdwjllay);
        },
        error: function () {
            layer.close(gdwjllay);
            //alert('载入数据失败！');
        }
    });
}

function jrfjyh_index() {
    var jrfjyhlay = layer.msg('数据载入中...', { icon: 16, shade: 0.01, time: 9999999999 });
    var nday = getDay();
    $.ajax({
        type: "post",
        url: GetAllUrl(window.JFApiDomian + '/alarmInfo_searchWorkPub.do?pageid=1&pagecount=6&beginTime=' + nday + ' 00:00:00&endTime=' + nday + " 23:59:59"),
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (json) {
            for(var o in json.pagination.list){
                $(".jryh_list").append('<ul class="clearfix"><li class="c_1">'+json.pagination.list[o].wfName+'</li><li class="c_1">'+json.pagination.list[o].wtName+'</li><li class="c_2">'+json.pagination.list[o].alarmName_CN+'</li><li class="c_1">'+json.pagination.list[o].alarmGrade_CN+'</li></ul>');
            }
            layer.close(jrfjyhlay);
        },
        error: function () {
            layer.close(jrfjyhlay);
            //alert('载入数据失败！');
        }
    });
}