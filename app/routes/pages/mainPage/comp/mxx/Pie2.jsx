import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');
<<<<<<< HEAD:app/routes/pages/mainPage/comp/chart/line1.jsx
let dataBase=require('../../../../../../config/ModelData');
let dataName=require('../../../../../../config/Model');
let datename=dataBase.ModelData[8888802].CurDayPVTSICurve.Time;
let date=dataBase.ModelData[8888802].CurDayPVTSICurve.Value;
=======

>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43:app/routes/pages/mainPage/comp/mxx/Pie2.jsx
let Component = React.createClass({
    componentWillMount() {
    },

    render() {
<<<<<<< HEAD:app/routes/pages/mainPage/comp/chart/line1.jsx
=======

        let{color,num}=this.props;


>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43:app/routes/pages/mainPage/comp/mxx/Pie2.jsx
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:165,
            },
            title: {
                text: ''
            },
<<<<<<< HEAD:app/routes/pages/mainPage/comp/chart/line1.jsx
            xAxis:{
                 categories:datename,
                 labels: {
                        style: {
                            color: '#fff',//颜色
                            fontFamily:"微软雅黑"

                        }
                }
            },
             yAxis:{
                title:{
                    enabled:false
                }
                 
            },
=======
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43:app/routes/pages/mainPage/comp/mxx/Pie2.jsx
            legend:{
                enabled: false
            },

            tooltip: {
                enabled: false,
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                //pointFormat: "<b>{point.percentage:.0f}%</b>"
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: color,
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '120%',
                    innerSize: '80%',
                    dataLabels: {
                        enabled: false,
                        format: '{point.name}',
                        style: {
                            color: "#d1d2d3",
                            fontSize: '14px',
                            fontFamily:"微软雅黑"

                        },

                    },

                }
            },
            series: [{
<<<<<<< HEAD:app/routes/pages/mainPage/comp/chart/line1.jsx
                type:'spline',
                name: "name",
                data: date,
                   marker: {
                        enabled: false
                       
                    }
=======
                type: 'pie',
                name: "发电量占比",
                data: num,
                style: {     fontSize:"20px",  }
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43:app/routes/pages/mainPage/comp/mxx/Pie2.jsx
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
