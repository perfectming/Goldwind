import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

<<<<<<< HEAD
let data = require('../../../../../../config/chart-data');
let dataBase=require('../../../../../../config/ModelData');
let dataName=require('../../../../../../config/Model');
let date=dataBase.ModelData;
let datename=dataName.Model.ens;
let arr=[];
let arrname=[];
let num=[];
(function(){
    for(let i in date){
=======
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43

    arr.push(date[i].DayEgyAt/1);
    }
    arr.pop();      
   
}());
(function(){
    for(let i in datename){
         arrname.push(datename[i].name);
     }    
    
    play();
}())
 function play(){
    for(let i=0;i<arr.length;i++){
        num.push([arrname[i],arr[i]])
    }
 }
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
<<<<<<< HEAD
=======

            let {arn,nu}=this.props;
            
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
        let configPie = {
            chart: {
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                height:300
            },
            title: {
                text: ''
            },
           
<<<<<<< HEAD
                categories:arrname,
=======
                categories:arn,
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
            
            tooltip: {
                enabled: true,
                 //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                 style:{
                    color: '#000',
                    fontSize: '12px',
                    fontFamily:"微软雅黑"
                }
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#07a3ff', '#3bf182', '#ddcde6','#856ffe', '#f7b552', '#31f3fb', '#fb8071', '#cfa972','#ff7800','#81511c']
            ,
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: '50%',
<<<<<<< HEAD
                    innerSize: '40%',
=======
                    innerSize: '60%',
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                    dataLabels: {
                        enabled: true,
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
                type: 'pie',
<<<<<<< HEAD
                name: "发电量占比",
                data: num,
=======
                name: "日发电量",
                data: nu,
                tooltip: {
                valueSuffix: 'kWh'
            },
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
                style: {     fontSize:"20px",  } 
            }]
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
        getall:(allnum)=>{
            dispatch(actions.setVars('allnum',allnum ));
        }
 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
