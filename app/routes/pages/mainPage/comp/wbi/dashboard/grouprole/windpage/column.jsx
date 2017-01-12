import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {   
    },
    render() {

        let {height,text,company,companyData}=this.props;
        let configPie = {
            chart: {
                height:height,
                backgroundColor: "rgba(44, 61, 71,0)",
                plotBorderWidth: 1,
                borderWidth: 1,
                plotShadow: false,
                paddingLeft:100,
                borderColor:'blue',
                 
            },
            title: {
                text: text,
                align:'left',
                top:'-20px',
                vertical:'top',
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑",
                    
                }
            },
            
            credits: {
                enabled: false
            },
             legend: {
            enabled: false
        },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 27,
                    style: {
                        color:"#484848",
                        fontSize:'18px'
                    }
                },
                categories:company,
            },
           yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify',

                  x:10,
                    style: {
                        color:"#484848",
                        fontSize:'14px'
                    }
                
            }
        },
            series: [
            {
                name: '',
                type: 'column',
                data:companyData,
                color:"#28bbef",
                maxPointWidth: 30,
                 borderWidth: 0,
                 borderRadius: 4,
                  cursor: 'pointer', 
                  tooltip: {
               valueSuffix:''
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

        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);