import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {storageTop,changeColumnOne,changeColumnTwo,changeColumnThree,changeColumnFour,unit,text,lose,name,clickArr,judge,eTime1,sTime1,eTime2,sTime2,eTime3,sTime3,eTime4,sTime4,selectId1,selectId2,selectId3,selectId4}=this.props;
        let configPie = {
            chart: {
                height:380,
                backgroundColor: null,
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft:100,
                borderRadius:10
            },
            title: {
                text: text,
                align:'center',
                style:{
                    color:"#fff",
                    fontSize:"16px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
                align:"center",
                verticalAlign: "bottom",
                itemStyle: {
                    color: "#fff",
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
                itemHoverStyle: {
                    color: '#31f3fb'
            	}
            },
            tooltip: {
                shared: true,
                style:{
                    color: '#333',
                    fontSize: '12px',
                    fontFamily:'微软雅黑'
                },
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>数值：<b>{point.y}</b><h6 style="font-size:12px">'+unit+'</h6>'
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: ['#5298d3', '#ffffff', '#e9c75c','#d06960', '#4cdb9d','#5b9bd5'],
            plotOptions: {
                pie: {
                    size:200,
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#d1d2d3',
                            fontWeight: 'normal',
                            fontSize:'14px',
                            fontFamily: '微软雅黑',
                        }
                    },
                    showInLegend: true
                }
	        },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 0, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                
            },
            yAxis: {
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },
            series: [{
                type: 'pie',
                name: name,
                data: lose,
                events: {
                        click: function(e) {
                            var j=e.point.index;
                            if( judge==1){
                                changeColumnOne(clickArr[j][0],sTime1,eTime1,selectId1);
                            }else if(judge==2){
                                changeColumnTwo(clickArr[j][0],sTime2,eTime2,selectId2);
                            }else if(judge==3){
                                changeColumnThree(clickArr[j][0],sTime3,eTime3,selectId3,storageTop);
                            }else if(judge==4){
                                changeColumnFour(clickArr[j][0],sTime4,eTime4,selectId4,storageTop);
                            }

                        }
                }
            }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        sTime1 : state.vars.sTime1,
        eTime1 : state.vars.eTime1,
        sTime2 : state.vars.sTime2,
        eTime2 : state.vars.eTime2,
        sTime3 : state.vars.sTime3,
        eTime3 : state.vars.eTime3,
        sTime4 : state.vars.sTime4,
        eTime4 : state.vars.eTime4,
        selectId1 : state.vars.selectId1,
        selectId2 : state.vars.selectId2,
        selectId3 : state.vars.selectId3,
        selectId4 : state.vars.selectId4,
        storageTop: state.vars.storageTop,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeColumnOne:(clickArr,sTime1,eTime1,selectId1) =>{
            if(selectId1<1000000){
                $.ajax({
                url:'http://10.68.100.32:8080/wbi/KPI/getReliableNormAnalyse',
                type: 'post',
                async: false,
                dataType: 'json',
                data: {'wttype':clickArr,'startTime':sTime1,'endTime':eTime1,'wfid':selectId1}, 
                success: function (data) {
                    var typeOne=[],machineTypeOne=[],typeNameOne=clickArr;
                    for(var i in data.data){
                        typeOne.push((data.data[i]).toFixed(1)/1);
                        machineTypeOne.push(i);
                    }
                    dispatch(actions.setVars('typeNameOne', typeNameOne));
                    dispatch(actions.setVars('typeOne', typeOne));
                    dispatch(actions.setVars('machineTypeOne', machineTypeOne));
                },
                complete : function(XMLHttpRequest,status) {},
            });
            }else{
                $.ajax({
                url:'http://10.68.100.32:8080/wbi/KPI/getReliableNormAnalyse',
                type: 'post',
                async: false,
                dataType: 'json',
                data: {'wttype':clickArr,'startTime':sTime1,'endTime':eTime1,'groupid':selectId1}, 
                success: function (data) {
                    var typeOne=[],machineTypeOne=[],typeNameOne=clickArr;
                    for(var i in data.data){
                        typeOne.push((data.data[i]).toFixed(1)/1);
                        machineTypeOne.push(i);
                    }
                    dispatch(actions.setVars('typeNameOne', typeNameOne));
                    dispatch(actions.setVars('typeOne', typeOne));
                    dispatch(actions.setVars('machineTypeOne', machineTypeOne));
                },
                complete : function(XMLHttpRequest,status) {},
            });
            }
            
        },
        changeColumnTwo:(clickArr,sTime2,eTime2,selectId2) =>{
            if(selectId2<1000000){
                $.ajax({
                    url:'http://10.68.100.32:8080/wbi/KPI/getReliableNormAnalyse',
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    data: {'wttype':clickArr,'startTime':sTime2,'endTime':eTime2,'wfid':selectId2}, 
                    success: function (data) {
                        var typeTwo=[],machineTypeTwo=[],typeNameTwo=clickArr;
                        for(var i in data.data){
                            typeTwo.push((data.data[i]).toFixed(1)/1);
                            machineTypeTwo.push(i);
                        }
                        dispatch(actions.setVars('typeNameTwo', typeNameTwo));
                        dispatch(actions.setVars('typeTwo', typeTwo));
                        dispatch(actions.setVars('machineTypeTwo', machineTypeTwo));
                    },
                    complete : function(XMLHttpRequest,status) {},
                });
            }else{
                $.ajax({
                    url:'http://10.68.100.32:8080/wbi/KPI/getReliableNormAnalyse',
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    data: {'wttype':clickArr,'startTime':sTime2,'endTime':eTime2,'groupid':selectId2}, 
                    success: function (data) {
                        var typeTwo=[],machineTypeTwo=[],typeNameTwo=clickArr;
                        for(var i in data.data){
                            typeTwo.push((data.data[i]).toFixed(1)/1);
                            machineTypeTwo.push(i);
                        }
                        dispatch(actions.setVars('typeNameTwo', typeNameTwo));
                        dispatch(actions.setVars('typeTwo', typeTwo));
                        dispatch(actions.setVars('machineTypeTwo', machineTypeTwo));
                    },
                    complete : function(XMLHttpRequest,status) {},
                });
            }
                        
        },
        changeColumnThree:(clickArr,sTime3,eTime3,selectId3,storageTop) =>{
            if(selectId3<1000000){
                $.ajax({
                    url:'http://10.68.100.32:8080/wbi/KPI/getAboutTopFailureLoss',
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    data: {'wttype':clickArr,'flag':storageTop,'startTime':sTime3,'endTime':eTime3,'wfid':selectId3},
                    timeout : 60000, 
                    success: function (data) {
                        var columnOneName=[],columnOne=[];
                        for(var i in data.data){
                            columnOneName.push(data.data[i].blooeydescr);
                            columnOne.push((data.data[i].powerloss).toFixed(1)/1);
                        };
                        dispatch(actions.setVars('columnOneName', columnOneName));
                        dispatch(actions.setVars('columnOne', columnOne));
                    },
                    complete : function(XMLHttpRequest,status) {},
                });
            }else{
                $.ajax({
                    url:'http://10.68.100.32:8080/wbi/KPI/getAboutTopFailureLoss',
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    data: {'wttype':clickArr,'flag':storageTop,'startTime':sTime3,'endTime':eTime3,'groupid':selectId3},
                    timeout : 60000, 
                    success: function (data) {
                        var columnOneName=[],columnOne=[];
                        for(var i in data.data){
                            columnOneName.push(data.data[i].blooeydescr);
                            columnOne.push((data.data[i].powerloss).toFixed(1)/1);
                        };
                        dispatch(actions.setVars('columnOneName', columnOneName));
                        dispatch(actions.setVars('columnOne', columnOne));
                    },
                    complete : function(XMLHttpRequest,status) {},
                });
            }
            
        },
        changeColumnFour:(clickArr,sTime4,eTime4,selectId4,storageTop) =>{
            if(selectId4<1000000){
                $.ajax({
                    url:'http://10.68.100.32:8080/wbi/KPI/getAboutTopFailureLoss',
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    data: {'wttype':clickArr,'flag':storageTop,'startTime':sTime4,'endTime':eTime4,'wfid':selectId4},
                    timeout : 60000, 
                    success: function (data) {
                        var columnTwoName=[],columnTwo=[];
                        for(var i in data.data){
                            columnTwoName.push(data.data[i].blooeydescr);
                            columnTwo.push((data.data[i].powerloss).toFixed(1)/1);
                        };
                        dispatch(actions.setVars('columnTwoName', columnTwoName));
                        dispatch(actions.setVars('columnTwo', columnTwo));
                    },
                    complete : function(XMLHttpRequest,status) {},
                });
            }else{
                $.ajax({
                    url:'http://10.68.100.32:8080/wbi/KPI/getAboutTopFailureLoss',
                    type: 'post',
                    async: false,
                    dataType: 'json',
                    data: {'wttype':clickArr,'flag':storageTop,'startTime':sTime4,'endTime':eTime4,'groupid':selectId4},
                    timeout : 60000, 
                    success: function (data) {
                        var columnTwoName=[],columnTwo=[];
                        for(var i in data.data){
                            columnTwoName.push(data.data[i].blooeydescr);
                            columnTwo.push((data.data[i].powerloss).toFixed(1)/1);
                        };
                        dispatch(actions.setVars('columnTwoName', columnTwoName));
                        dispatch(actions.setVars('columnTwo', columnTwo));
                    },
                    complete : function(XMLHttpRequest,status) {},
                });
            }

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);