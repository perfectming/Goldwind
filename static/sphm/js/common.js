$(function () {
    if (screen.width < 1920) {
        $("body").css("transform", "scale(0.701562, 0.701562)")
    }

	$(".grid input[type='checkbox']").on('click',function(event){
		if($(this).get(0).checked == true){
			$(this).parent().parent().addClass("active");
		}else{
			$(this).parent().parent().removeClass("active");
		}
		event.stopPropagation();
	})

	
	$(".dialog a.close").click(function () {
		$(this).parent().parent().hide();
	})
	$(".dialog .cancle").click(function () {
		$('#'+$(this).attr('for')).hide();
	})
})

function BarOption(title, xAxisData,seriesTitle, seriesData,triggerOn) {
    //图标开始
    option = {
        title: {
            text: title,
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: 14, color: '#74767a'
            }
        },
        tooltip: {
            trigger: 'axis',
			triggerOn:triggerOn,
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
                data: xAxisData,
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
            left: '5%',
            right: '7%',
            bottom: '0%',
            top: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#747484'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: yAxisData,
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

function LineOption(title, xAxisData,yAxisName,yAxisMin,yAxisMax, seriesTitle, seriesData) {
    option = {
        title: {
            text: title,
            left: '3%',
            top: '2%',
            textStyle: {
                fontSize: 14, color: '#74767a'
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
                }
            }
        ],
        textStyle: {
            fontSize: 14, color: '#74767a'
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

//空心圆
function Pie_hollow(legendData,seriesData){
	option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			x : 'center',
			y : '90%',
			data:legendData,
			textStyle: {
				fontSize: 14, color: '#fff'
			}
		},
		series: [
			{
				name:'访问来源',
				type:'pie',
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
				data:seriesData
			}
		]
	};

	return option;
}