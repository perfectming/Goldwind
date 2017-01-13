import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
    	let {color,wtData,sTime,eTime,WfId,wtName,wtElec,wtLose,wtPBA,ipUrl,areaName,X1=areaName[0],changedata2,X2,wfName,wfId,wfElec,wfLose,wfPBA}=this.props;
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
                text: '集团'+X1+'PBA',
                align:'left',
                 x : 40,
                style:{
                    color:color,
                    fontSize:"16px",
                    fontFamily:"微软雅黑"
                }
            },
            //图例说明
            legend: {
            	x:-50,
                y: 10,
                align:"right",
                verticalAlign: "top",
                itemStyle: {
                    color: color,
                    fontSize:"14px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
                itemHoverStyle: {
                color: '#31f3fb'
            	}
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#70c080','#0000ff','#5b9bd5']
            ,
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                    borderRadius:3
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                        X2=e.point.category;
                        WfId=wfId[e.point.index];
                        changedata2(wtData,X2,sTime,eTime,WfId,wtName,wtElec,wtLose,wtPBA,ipUrl);
                        }
                    }
                }
            },
            tooltip: {
                shared: true
            },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: color,//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:wfName,
            },
            yAxis: [{
                title:{
                	text:'(kWh)',
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -10,
	                x:-10,
	                style:{
	                	fontSize:'14px',
	                	color:color,
	                }
                },
                labels: {
                	format: '',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: color,//颜色
                        fontSize:'14px'  //字体
                    }
                },
            },{
            	min:0,
            	title:{
                	text:'(100%)',
                	align: 'high',
	                offset: 0,
	                rotation: 0,
	                y: -10,
	                x: 10,
	                style:{
	                	fontSize:'14px',
	                	color:color,
	                }
               },
               	labels: {
               	 	format: '',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: color,//颜色
                        fontSize:'14px'  //字体
                    }
                },
               opposite: true,
            }],
            series: [{
            	name: '实际发电量',
            	type: 'column',
                data: wfElec,
                tooltip: {
	                valueSuffix: 'kWh'
	            },
            },{
                name: '损失发电量',
                type: 'column',
                data: wfLose,
                tooltip: {
	                valueSuffix: 'kWh'
	            }
            },{
            	name: 'PBA',
            	type: 'spline',
                data: wfPBA,
                yAxis: 1,
                tooltip: {
	                valueSuffix: '%'
	            },
            }]
        };
        return (
            <ReactHighcharts config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {
    	X1 : state.vars.x1,
    	areaName : state.vars.areaName,
    	sTime : state.vars.startTime,
    	eTime : state.vars.endTime,
    	ipUrl : state.vars.ipUrl,
    	
    	wtName : state.vars.wtName,
    	wtElec : state.vars.wtElec,
    	wtLose : state.vars.wtLose,
    	wtPBA : state.vars.wtPBA,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedata2 :(wtData,X2,sTime,eTime,WfId,wtName,wtElec,wtLose,wtPBA,ipUrl)=>{
            dispatch(actions.setVars('x2',X2 ));
            $.ajax({
        		url: 'http://'+ipUrl+'/wbi/KPI/getCompanyKPISpacesWfieldFans',//查询ID电量--YES
		        type: 'post',
		        async:false,
		        data:{startTime:sTime,endTime:eTime,wfid:WfId},
		        dataType: 'json',//here
		        success:function (data) {
		        	wtElec=[],wtLose=[],wtPBA=[],wtName=[];
		        	wtData=data.data;
		        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push(wtData.slice(0,10)[i].poweract);
		        		wtLose.push(wtData.slice(0,10)[i].totalloss);
		        		wtPBA.push(wtData.slice(0,10)[i].pba*100);
		        	};
		        	
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		  	});
		  	dispatch(actions.setVars('wtName', wtName));
			dispatch(actions.setVars('wtElec', wtElec));
			dispatch(actions.setVars('wtLose', wtLose));
			dispatch(actions.setVars('wtPBA', wtPBA));
			dispatch(actions.setVars('wtData', wtData));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);