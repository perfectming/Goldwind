import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');


let Component = React.createClass({
    componentDidMount() {
    	
    },

    render() {
    	let {wtData,wfName,wfId,wfElec,wfLose,wfPBA,wtElec,wtLose,wtPBA,wtName,ipUrl,sTime,eTime,AreaId,X1,changedata1,areaId,areaName,areaElec,areaFault,areaMaintain,areaLimit,areaDevice,areaPBA}=this.props;
        let configPie = {
            chart: {
                height:380,
                backgroundColor: null,
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                paddingLeft: 100,
                borderRadius: 10,
            },
            title: {
                text: '集团各区域PBA',
                align: 'left',
                 x : 40,
                style:{
                    color: "#fff",
                    fontSize: "16px",
                    fontFamily: "微软雅黑"
                }
            },
            //图例说明
            legend: {
            	x: -50,
                y: 10,
                align: "right",
                verticalAlign: "top",
                itemStyle: {
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                },
                itemHoverStyle: {
                    color: '#31f3fb'
            	}
            },
            credits: {
                enabled: false //不显示highCharts版权信息
            },
            colors: [ '#33BAC0', '#5298d2', '#ffffff', '#e8952a','#d8403d','#0000ff'],
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                	stacking:"normal",
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 25,
                    borderRadius:2
                },
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function(e) {
                            X1=e.point.category;
                            AreaId=areaId[e.point.index];
                            changedata1(wtData,X1,AreaId,wfName,wfId,wfElec,wfLose,wfPBA,wtElec,wtLose,wtPBA,wtName,ipUrl,sTime,eTime);
                        }
                    }
                }
            },
            xAxis: {
                lineWidth: 1,
                tickWidth: 0,
                labels: {
                    y: 20, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
                categories:areaName,
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
	                	color:'white',
	                }
                },
                labels: {
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
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
	                	color:'white',
	                }
               },
               labels: {
               		format: '',
                    y: 10, //x轴刻度往下移动20px
                    style: {
                        color: '#fff',//颜色
                        fontSize:'14px'  //字体
                    }
                },
               opposite: true
            }],
            series: [{
            	name: '应发电量',
            	type: 'column',
                stack:"male",
                data: areaElec,
                tooltip: {
	                valueSuffix: 'kWh',
	            },
            },{
                name: '故障损失',
                type: 'column',
                stack:"female",
                data: areaFault,
                tooltip: {
	                valueSuffix: 'kWh',
	            },
            },{
            	name: '维护损失',
            	type: 'column',
                stack:"female",
                data: areaMaintain,
                tooltip: {
	                valueSuffix: 'kWh',
	            },
            },{
            	name: '限功率损失',
            	type: 'column',
                stack:"female",
                data: areaLimit,
                tooltip: {
	                valueSuffix: 'kWh',
	            },
            },{
            	name: '非设备原因损失',
            	type: 'column',
                stack:"female",
                data: areaDevice,
                tooltip: {
	                valueSuffix: 'kWh',
	            },
            },{
            	name: 'PBA',
            	type: 'spline',
                data: areaPBA,
                yAxis: 1,
                tooltip: {
	                valueSuffix: '%',
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
    	areaId : state.vars.areaId,
    	sTime : state.vars.startTime,
    	eTime : state.vars.endTime,
    	ipUrl : state.vars.ipUrl,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedata1 :(wtData,X1,AreaId,wfName,wfId,wfElec,wfLose,wfPBA,wtElec,wtLose,wtPBA,wtName,ipUrl,sTime,eTime)=>{
            dispatch(actions.setVars('x1',X1 ));
            $.ajax({
        		url: 'http://'+ipUrl+'/wbi/KPI/getCompanyKPISpacesWfields',//查询ID电量--YES
		        type: 'post',
		        async:false,
		        data:{startTime:sTime,endTime:eTime,groupid:AreaId},
		        dataType: 'json',//here
		        success:function (data) {
		        	wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtElec=[],wtLose=[],wtPBA=[],wtName=[];
		        	for(var i in data.data[0]){
		        		wfName.push(data.data[0][i].wfname);
		        		wfId.push(data.data[0][i].wfid);
		        		wfElec.push(data.data[0][i].poweract);
		        		wfLose.push(data.data[0][i].totalloss);
		        		wfPBA.push(data.data[0][i].pba*100)
		        	}
		        	wtData=data.data[1];
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
		  	dispatch(actions.setVars('wfName', wfName));
		    dispatch(actions.setVars('wfId', wfId));
		    dispatch(actions.setVars('wfElec', wfElec));
		    dispatch(actions.setVars('wfLose', wfLose));
		    dispatch(actions.setVars('wfPBA', wfPBA));
		    dispatch(actions.setVars('wtName', wtName));
			dispatch(actions.setVars('wtElec', wtElec));
			dispatch(actions.setVars('wtLose', wtLose));
			dispatch(actions.setVars('wtPBA', wtPBA));
			dispatch(actions.setVars('wtData',wtData ));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);