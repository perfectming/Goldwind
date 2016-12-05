import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/chart-data');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let doughnutValue = data.data.column;
        let doughnutValue1 = data.data.column2;
        let coltext = data.data.texto;
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:250,
                width:600,
                marginTop: 40,
                marginBottom:50,
                marginLeft:50,
                type: 'column',
            },
            title: {
                text: ''
            },
            plotOptions: {
                column: {
                    pointPadding: 1,
                    borderWidth: 0,
                    pointWidth: 15
                }
            },
            xAxis: {
                type: 'high',
                labels: {
                    style: {
                        fontSize: '',
                        color: '#ffffff',
                    },
                    rotation: 0
                },
                categories: [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0],
                title: {
                    text: '风速(10m/s)',
                    align: 'high',
                    rotation: 1,
                    y: -10,
                    x:10,
                    style:{
                        color: "#fff"
                    },
                }
            },
            yAxis: {
                title: {
                    text: '次数(次)',
                    style: {
                        color: '#ffffff'
                    },
                    align: 'high',
                    rotation: 1,
                    y: -5,
                    x: 86
                },
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'12px'  //字体
                    }
                },
                lineWidth: 1,
                gridLineWidth: 0
            },
            colors: ['#62DE86', '#1E664A', '#134833', '#082B1F','#000']
            ,
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: ''
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            series: [{
                name: '',
                data:[340,370,350,345,300,320,326,329,370,345,300,320,326,300,320,326,329,340,370,300],
                borderRadius: 5
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
