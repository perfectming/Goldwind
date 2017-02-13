import React from 'react';
import {connect} from 'react-redux';
import styles from './SelectStyle.scss';

let data = require('./TimeSelect-data.js');

var actions = require('redux/actions');
var $ =require('jquery');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
    

    render() {
        let {skinStyle,buttonAction, onFocus,changeValueS,changeValueE}= this.props;
        let {areaId,ipUrl,areaName,areaPBA,areaFault,areaLimit,areaDevice,areaMaintain,areaElec,wfName,wfId,wfElec,wfLose,wfPBA,wtData,wtName,wtElec,wtPBA,wtLose}=this.props;
        let comp = data.list;
        return (	
            <div className={skinStyle==2? styles.inquireBoxWhite:styles.inquireBox}>
                {
                    comp.map((value, key,valueName)=> {
                        if (value.type === 'date') {
                            return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input id="startTime" ref="startTime" onChange={(e)=>changeValueS(e.target.value)} placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input id="endTime" ref="endTime" onChange={(e)=>changeValueE(e.target.value)} placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                        }else if (value.type === 'button') {
                            return (
                                    <div className={styles.btnBox} key={key}>
                                        <button onClick={()=>buttonAction(areaId,ipUrl,areaName,areaPBA,areaFault,areaLimit,areaDevice,areaMaintain,areaElec,wfName,wfId,wfElec,wfLose,wfPBA,wtData,wtName,wtElec,wtPBA,wtLose)}>{value.title}</button>
                                    </div>
                                )
                            }
                        })
                    }
            </div>    
        );
    }
});


const mapStateToProps = (state) => {
    return {
        skinStyle: state.vars.skinStyle, //全局换肤
    	X1 : state.vars.x1,
        ipUrl : state.vars.ipUrl,
    	areaId : state.vars.areaId,    	
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        	//初始日期为上月
            var date = new Date();
        	var yearString=date.getFullYear();
        	var monthString=date.getMonth()+1;
        	var dayString;
        	//判断获取上月的月份和年份
        	if(monthString==1){
        		monthString=12;
        		yearString=yearString-1;
        	}else{
                if(monthString<11){
                    monthString="0"+(monthString-1);
                }else{
                    monthString=monthString-1;
                }
        	};
        	//判断获取上月最后一天日期
        	if(monthString==2){
        		if(yearString%4==0){
        			dayString=29;
        		}
        		dayString=28;
        	}else if(monthString==4||monthString==6||monthString==9||monthString==11){
                dayString=30;
        	}else{
        		dayString=31;
        	};
        	var startString=yearString+'-'+monthString+'-'+'01';
        	var endString=yearString+'-'+monthString+'-'+dayString;
        	$('#startTime').val(startString);
            $('#endTime').val(endString);
            dispatch(actions.setVars('startTime', startString));
            dispatch(actions.setVars('endTime', endString));
        },
        changeValueS : (e) => {
        	
        },
        changeValueE : (e) => {
        	
        },
        buttonAction : (areaId,ipUrl,areaName,areaPBA,areaFault,areaLimit,areaDevice,areaMaintain,areaElec,wfName,wfId,wfElec,wfLose,wfPBA,wtData,wtName,wtElec,wtPBA,wtLose) => {
        // 获取select 选择的内容
        //开始时间
        var sTime = $('#startTime').val();
        //结束时间时间
        var eTime = $('#endTime').val();
		var oDate1 = new Date(sTime);
        var oDate2 = new Date(eTime);
        if(sTime == '' || eTime == '') {
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请选择开始或者结束时间'));
                return false;
        }else if(oDate1.getTime() > oDate2.getTime()){
                dispatch(actions.setVars('alertBool', false));
                dispatch(actions.setVars('alertText', '请选择正确的开始或者结束时间'));
                return false;
        };
        dispatch(actions.setVars('startTime', sTime));
        dispatch(actions.setVars('endTime', eTime));
        $.ajax({
        		url: 'http://'+ipUrl+'/wbi/KPI/getCompanyKPI',//查询ID电量--YES
		        type: 'post',
		        async:false,
		        data:{startTime:sTime,endTime:eTime},
		        dataType: 'json',//here
		        success:function (data) {
		        	areaId=[],areaName=[],areaPBA=[],areaFault=[],areaLimit=[],areaMaintain=[],areaDevice=[],areaElec=[];
		        	wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtElec=[],wtLose=[],wtPBA=[],wtName=[];
		        	for(var i in data.data[2]){
		        		areaId.push(data.data[2][i].groupid);
		        		areaName.push(data.data[2][i].groupname);
		        		areaPBA.push((data.data[2][i].pba*100).toFixed(1)/1);
		        		areaFault.push((data.data[2][i].faultloss).toFixed(1)/1);
		        		areaLimit.push((data.data[2][i].limitloss).toFixed(1)/1);
		        		areaMaintain.push((data.data[2][i].maintainloss).toFixed(1)/1);
		        		areaDevice.push((data.data[2][i].nodevreasonloss).toFixed(1)/1);
		        		areaElec.push((data.data[2][i].poweract).toFixed(1)/1);
		        	};
		        	
		        	for(var i in data.data[1]){
		        		wfName.push(data.data[1][i].wfname);
		        		wfId.push(data.data[1][i].wfid);
		        		wfElec.push((data.data[1][i].poweract).toFixed(1)/1);
		        		wfLose.push((data.data[1][i].totalloss).toFixed(1)/1);
		        		wfPBA.push((data.data[1][i].pba*100).toFixed(1)/1)
		        	}
		        	wtData=data.data[0];
		        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push((wtData.slice(0,10)[i].poweract).toFixed(1)/1);
		        		wtLose.push((wtData.slice(0,10)[i].totalloss).toFixed(1)/1);
		        		wtPBA.push((wtData.slice(0,10)[i].pba*100).toFixed(1)/1);
		        	};
		        	
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		  	});
		  	dispatch(actions.setVars('areaId', areaId));
			dispatch(actions.setVars('areaName', areaName));
		    dispatch(actions.setVars('areaPBA', areaPBA));
		    dispatch(actions.setVars('areaFault', areaFault));
		    dispatch(actions.setVars('areaLimit', areaLimit));
		    dispatch(actions.setVars('areaMaintain', areaMaintain));
		    dispatch(actions.setVars('areaDevice', areaDevice));
		    dispatch(actions.setVars('areaElec', areaElec));
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
            dispatch(actions.setVars('x1', areaName[0]));
            dispatch(actions.setVars('x2',wfName[0]));
    	},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);