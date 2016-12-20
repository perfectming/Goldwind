import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');





let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
    render() {
        <div style={"width: 600px; height: 400px; margin: 0 auto"}>
            <div id="container-speed" style={"width: 300px; height: 200px; float: left"}></div>
            <div id="container-rpm" style={"width: 300px; height: 200px; float: left"}></div>
        </div>
        {
            $(function () {
                var gaugeOptions = {
                    chart: {
                        type: 'solidgauge'
                    },
                    title: null,
                    pane: {
                        center: ['50%', '85%'],
                        size: '140%',
                        startAngle: -90,
                        endAngle: 90,
                        background: {
                            backgroundColor: (ReactHighcharts.theme && ReactHighcharts.theme.background2) || '#EEE',
                            innerRadius: '60%',
                            outerRadius: '100%',
                            shape: 'arc'
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                    // the value axis
                    yAxis: {
                        stops: [
                            [0.1, '#55BF3B'], // green
                            [0.5, '#DDDF0D'], // yellow
                            [0.9, '#DF5353'] // red
                        ],
                        lineWidth: 0,
                        minorTickInterval: null,
                        tickPixelInterval: 400,
                        tickWidth: 0,
                        title: {
                            y: -70
                        },
                        labels: {
                            y: 16
                        }
                    },
                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                y: 5,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    }
                };
                // The speed gauge
                $('#container-speed').highcharts(ReactHighcharts.merge(gaugeOptions, {
                    yAxis: {
                        min: 0,
                        max: 200,
                        title: {
                            text: 'Speed'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Speed',
                        data: [80],
                        dataLabels: {
                            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((ReactHighcharts.theme && ReactHighcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                            '<span style="font-size:12px;color:silver">km/h</span></div>'
                        },
                        tooltip: {
                            valueSuffix: ' km/h'
                        }
                    }]
                }));
                // The RPM gauge
                $('#container-rpm').highcharts(ReactHighcharts.merge(gaugeOptions, {
                    yAxis: {
                        min: 0,
                        max: 5,
                        title: {
                            text: 'RPM'
                        }
                    },
                    series: [{
                        name: 'RPM',
                        data: [1],
                        dataLabels: {
                            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((ReactHighcharts.theme && ReactHighcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                            '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
                        },
                        tooltip: {
                            valueSuffix: ' revolutions/min'
                        }
                    }]
                }));
                // Bring life to the dials
                setInterval(function () {
                    // Speed
                    var chart = $('#container-speed').highcharts(),
                        point,
                        newVal,
                        inc;
                    if (chart) {
                        point = chart.series[0].points[0];
                        inc = Math.round((Math.random() - 0.5) * 100);
                        newVal = point.y + inc;
                        if (newVal < 0 || newVal > 200) {
                            newVal = point.y - inc;
                        }
                        point.update(newVal);
                    }
                    // RPM
                    chart = $('#container-rpm').highcharts();
                    if (chart) {
                        point = chart.series[0].points[0];
                        inc = Math.random() - 0.5;
                        newVal = point.y + inc;
                        if (newVal < 0 || newVal > 5) {
                            newVal = point.y - inc;
                        }
                        point.update(newVal);
                    }
                }, 2000);
            });
        }
    }
});


const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            
        },
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
