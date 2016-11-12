import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../../config/tkgl-table');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let{database}=this.props;
        let configPie = {
            chart: {
                type: 'column',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '升压站负荷概览',
                style:{
                    color:"#fff",
                    fontSize:"24px",
                    fontFamily:"Microsoft YaHei"
                }
            },
            tooltip: {
                headerFormat:'<span style="font-size: 20px;">{series.name}</span>',
                // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: "<b>{point.percentage:.0f}%</b>",
                style:{
                    fontSize:'15px'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#fff',//颜色
                        fontSize:'15px'  //字体
                    }
                },
                categories: database(0)
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#ff7322', '#1d558e']
            ,
            plotOptions: {
                series: {
                    stacking: 'normal',
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: '<span style="color:#fff;font-size: 18px">装机容量</span>',
                data: database(5),
            },{
                name: '<span style="color:#fff;font-size: 18px">负荷</span>',
                data: database(7),
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
        init: () => {},
        database:(e)=>{
            let arr=[];
            data.data.content.map((value,key)=>{
                value.map((valueC,keyC)=>{
                    if(keyC===e){
                        arr.push(valueC);
                    }
                })
            })
            return arr;
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
