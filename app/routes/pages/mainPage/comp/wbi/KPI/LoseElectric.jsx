import React from 'react';
import {connect} from 'react-redux';
import styles from './LoseElectricstyle.scss';
import PBAdata from './TimeSelect-data';
import ChartOne from './ChartOne.jsx';
import ChartFive from './ChartFive.jsx';
import AlertWindow from './AlertWindow.jsx';
import Login from '../../../../../../components/common/Loading.jsx';

var actions = require('redux/actions');

let selectName=[],selectId=[];

let Component = React.createClass({
	componentDidMount() {
		let{init} = this.props;
        this.props.init();
        setTimeout(function(){
        	init()
        },2000)
    },
	componentWillMount() {
    	let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
        
   	},
    
    
	render() {
		let comp=PBAdata.list;
		let {skinStyle,alertText,buttonResetA,buttonResetB,buttonResetC,buttonResetD,storage,loseElecBool=false,loseA,loseB,loseC,loseD,loseAreaOne,loseAreaTwo,loseAreaThree,loseAreaFour,loseAreaNameOne='',loseAreaNameTwo='',loseAreaNameThree='',loseAreaNameFour='',selectName,selectId,ipUrl,checkedLose=1,buttonAction,buttonReset, inputOnChange,changeValueST,changeValueET,checkedBoxPro,checkedBoxElec}=this.props;
		if(loseElecBool){
			return(
				<div className={skinStyle==1? styles.bodyBoxBlue:skinStyle==2? styles.bodyBoxWhite:styles.bodyBox}>
					<AlertWindow text={alertText}></AlertWindow>
					<div className={styles.inquireBox}>
		                {
		                    comp.map((value, key,valueName)=> {
		                        if (value.type === 'date') {
		                            return (
		                                    <div className={styles.dateBox} key={key}>
		                                        <span>发生时间</span><input id="startTime" ref="startTime" placeholder={value.content} onChange={(e)=>changeValueST(e.target.value)} type={value.type} style={{width:value.width}}/>
		                                        <span>结束时间</span><input id="endTime" ref="endTime" placeholder={value.content} onChange={(e)=>changeValueET(e.target.value)} type={value.type} style={{width:value.width}}/>
		                                    </div>
		                                )
		                        }else if (value.type === 'button') {
		                            return (
		                                    <div className={styles.btnBox} key={key}>
			                                    <div className={styles.bBox}>
			                                        <button onClick={()=>buttonAction(storage,selectId,selectName,loseA,loseB,loseC,loseD,loseAreaOne,loseAreaTwo,loseAreaThree,loseAreaFour,loseAreaNameOne,loseAreaNameTwo,loseAreaNameThree,loseAreaNameFour,checkedLose,ipUrl)}>{"查询"}</button>
			                                    </div>
			                                    <div className={styles.bBox}>
			                                        <button onClick={()=>buttonReset(loseA,loseB,loseC,loseD,loseAreaOne,loseAreaTwo,loseAreaThree,loseAreaFour,loseAreaNameOne,loseAreaNameTwo,loseAreaNameThree,loseAreaNameFour)}>{"重置"}</button>
			                                    </div>
		                                    </div>
		                                )
		                        }else if (value.type === 'radio') {
		                            return (
		                                <div className={styles.radioBox} key={key}>
			                                <span>指标项选择 :</span>
			                                <input type={value.type} id="loseElectric" checked={checkedLose==1? true:false} onChange={()=>checkedBoxElec()} name={value.type}/>
			                                <span>损失电量</span>
			                                <input type={value.type} id="loseProfit" checked={checkedLose==2? true:false} onChange={()=>checkedBoxPro()} name={value.type}/>
			                                <span>损失收入</span>
		                                </div>
		                            )
		                        }
		                    })
		                }
		                <div className={styles.seleBox}>
			                	<span>选择KPI损失电量对象</span>
			                	<select>
				                {
				                	selectName.map((value, key)=> {
				                    	return(
				                    		<option value={value} key={key}>{value}</option>
				                        )
				                   })
				                }
				                </select>
			            </div>
		            </div>
		            
					<div className={styles.content}>
						<div className={styles.areaLose}>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<div className={loseAreaNameOne==''? styles.hide:styles.button} onClick={()=>buttonResetA()}>清除</div>
								<ChartOne unit={storage==1? "kWh":"元"} name={storage==undefined? '':storage==1? loseAreaNameOne+'损失电量分析':loseAreaNameOne+'损失收入分析'} text={storage==undefined? '':storage==1? loseAreaNameOne+'损失电量分析':loseAreaNameOne+'损失收入分析'} lose={loseAreaOne}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<div className={loseAreaNameTwo==''? styles.hide:styles.button} onClick={()=>buttonResetB()}>清除</div>
								<ChartOne unit={storage==1? "kWh":"元"} name={storage==undefined? '':storage==1? loseAreaNameTwo+'损失电量分析':loseAreaNameTwo+'损失收入分析'} text={storage==undefined? '':storage==1? loseAreaNameTwo+'损失电量分析':loseAreaNameTwo+'损失收入分析'} lose={loseAreaTwo}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<div className={loseAreaNameThree==''? styles.hide:styles.button} onClick={()=>buttonResetC()}>清除</div>
								<ChartOne unit={storage==1? "kWh":"元"} name={storage==undefined? '':storage==1? loseAreaNameThree+'损失电量分析':loseAreaNameThree+'损失收入分析'} text={storage==undefined? '':storage==1? loseAreaNameThree+'损失电量分析':loseAreaNameThree+'损失收入分析'} lose={loseAreaThree}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<div className={loseAreaNameFour==''? styles.hide:styles.button} onClick={()=>buttonResetD()}>清除</div>
								<ChartOne unit={storage==1? "kWh":"元"} name={storage==undefined? '':storage==1? loseAreaNameFour+'损失电量分析':loseAreaNameFour+'损失收入分析'} text={storage==undefined? '':storage==1? loseAreaNameFour+'损失电量分析':loseAreaNameFour+'损失收入分析'} lose={loseAreaFour}></ChartOne>
							</div>
						</div>
						<div className={`${styles.lose} ${styles.boxShadow}`}>
							<ChartFive title={storage==undefined? '':storage==1?'损失电量分析':'损失收入分析'} unit={storage==undefined? '':storage==1? "(kWh)":"(元)"} loseA={loseA} loseB={loseB} loseC={loseC} loseD={loseD} nameOne={loseAreaNameOne} nameTwo={loseAreaNameTwo} nameThree={loseAreaNameThree} nameFour={loseAreaNameFour}></ChartFive>
						</div>
					</div>
				</div>
			)
		}else{
			return(
        		<Login></Login>
        	)
		}
	}
});

const mapStateToProps = (state) => {
    return {
    	skinStyle: state.vars.skinStyle, //全局换肤
    	alertText : state.vars.alertText,
    	loseElecBool : state.vars.loseElecBool,
    	ipUrl : state.vars.ipUrl,
    	checkedLose : state.vars.checkedLose,
    	storage: state.vars.storage,
    	
    	selectId : state.vars.selectId,
    	selectName : state.vars.selectName,
    	
    	loseA : state.vars.loseA,
    	loseB : state.vars.loseB,
    	loseC : state.vars.loseC,
    	loseD : state.vars.loseD,
    	loseAreaOne : state.vars.loseAreaOne,
    	loseAreaTwo : state.vars.loseAreaTwo,
    	loseAreaThree : state.vars.loseAreaThree,
    	loseAreaFour : state.vars.loseAreaFour,
    	loseAreaNameOne : state.vars.loseAreaNameOne,
    	loseAreaNameTwo : state.vars.loseAreaNameTwo,
    	loseAreaNameThree : state.vars.loseAreaNameThree,
    	loseAreaNameFour : state.vars.loseAreaNameFour,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	init: () => {
    		dispatch(actions.setVars('storage', ));
    		dispatch(actions.setVars('loseA', ));
	    	dispatch(actions.setVars('loseB', ));
	    	dispatch(actions.setVars('loseC', ));
	    	dispatch(actions.setVars('loseD', ));
	    	dispatch(actions.setVars('loseAreaOne', ));
	    	dispatch(actions.setVars('loseAreaTwo', ));
	    	dispatch(actions.setVars('loseAreaThree', ));
	    	dispatch(actions.setVars('loseAreaFour', ));
	    	dispatch(actions.setVars('loseAreaNameOne', ));
	    	dispatch(actions.setVars('loseAreaNameTwo', ));
	    	dispatch(actions.setVars('loseAreaNameThree', ));
	    	dispatch(actions.setVars('loseAreaNameFour', ));
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
        		monthString=monthString-1;
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
        },
    	ajax: (ipUrl) =>{
    		dispatch(actions.setVars('checkedLose', 1));
    		$.ajax({
		        url:'http://'+ipUrl+'/wbi/KPI/getGroupidAndwfid',//下拉框内容
				type: 'post',
				async: true,
				dataType: 'json',
				data: '',
				timeout : 60000, 
				success: function (data) {
				    selectId=[],selectName=[];
				    for(var i in data.data) {
				        selectId.push(data.data[i].groupid);
				        selectName.push(data.data[i].groupname);
				        for(var j in data.data[i].wfs) {
				        	selectId.push(data.data[i].wfs[j].wfid);
				        	selectName.push(data.data[i].wfs[j].wfname);
				        }
				    }
				    dispatch(actions.setVars('selectId', selectId));
				    dispatch(actions.setVars('selectName', selectName));
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){    
                    dispatch(actions.setVars('alertBool', false));
				    dispatch(actions.setVars('alertText', '网络不稳定，请求超时'));
			        return false;  
                },
				complete : function(XMLHttpRequest,status) { 
					dispatch(actions.setVars('loseElecBool', true));
				},
			});
			
    	},
        changeValueST : (e) => {
        	
	    },
	    changeValueET : (e) => {
	        	
	    },
	    checkedBoxElec : () => {
	    	dispatch(actions.setVars('checkedLose', 1));
	    },
	    checkedBoxPro : () =>{
	    	dispatch(actions.setVars('checkedLose', 2));
	    },
	    buttonReset : (loseA,loseB,loseC,loseD,loseAreaOne,loseAreaTwo,loseAreaThree,loseAreaFour,loseAreaNameOne,loseAreaNameTwo,loseAreaNameThree,loseAreaNameFour)=>{
	    	dispatch(actions.setVars('storage', ));
	    	dispatch(actions.setVars('loseA', ));
	    	dispatch(actions.setVars('loseB', ));
	    	dispatch(actions.setVars('loseC', ));
	    	dispatch(actions.setVars('loseD', ));
	    	dispatch(actions.setVars('loseAreaOne', ));
	    	dispatch(actions.setVars('loseAreaTwo', ));
	    	dispatch(actions.setVars('loseAreaThree', ));
	    	dispatch(actions.setVars('loseAreaFour', ));
	    	dispatch(actions.setVars('loseAreaNameOne', ));
	    	dispatch(actions.setVars('loseAreaNameTwo', ));
	    	dispatch(actions.setVars('loseAreaNameThree', ));
	    	dispatch(actions.setVars('loseAreaNameFour', ));
	    },
	    buttonResetA : () =>{
	    	dispatch(actions.setVars('loseA', ));
	    	dispatch(actions.setVars('loseAreaOne', ));
	    	dispatch(actions.setVars('loseAreaNameOne', ));
	    },
	    buttonResetB : () =>{
	    	dispatch(actions.setVars('loseB', ));
	    	dispatch(actions.setVars('loseAreaTwo', ));
	    	dispatch(actions.setVars('loseAreaNameTwo', ));
	    },
	    buttonResetC : () =>{
	    	dispatch(actions.setVars('loseC', ));
	    	dispatch(actions.setVars('loseAreaThree', ));
	    	dispatch(actions.setVars('loseAreaNameThree', ));
	    },
	    buttonResetD : () =>{
	    	dispatch(actions.setVars('loseD', ));
	    	dispatch(actions.setVars('loseAreaFour', ));
	    	dispatch(actions.setVars('loseAreaNameFour', ));
	    },
	    buttonAction : (storage,selectId,selectName,loseA,loseB,loseC,loseD,loseAreaOne,loseAreaTwo,loseAreaThree,loseAreaFour,loseAreaNameOne,loseAreaNameTwo,loseAreaNameThree,loseAreaNameFour,checkedLose,ipUrl) => {
	    	if (loseAreaOne!==undefined) {
	    		if(checkedLose==storage){
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
			        var A=$('select').val();
					for(var i in selectName){
						if(selectName[i]==A){
							selectId=selectId[i];
						}
					};
					if(selectId<1000000){//风场
						$.ajax({
			    			url:'http://'+ipUrl+'/wbi/KPI/getKPILoseElec',//Pie表
					        type: 'post',
					        async:false,
					        dataType: 'json',
					        data:{'flag':checkedLose,'startTime':sTime,'endTime':eTime,'wfid':selectId,}, 
					        success:function (data) {
					        	if(loseAreaOne==undefined){
					        		loseAreaNameOne=data.data[0].wfname;
					        		loseAreaOne=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseA=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else if(loseAreaOne!==undefined&&loseAreaTwo==undefined){
					        		loseAreaNameTwo=data.data[0].wfname;
					        		loseAreaTwo=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseB=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree==undefined){
					        		loseAreaNameThree=data.data[0].wfname;
					        		loseAreaThree=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseC=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree!==undefined&&loseAreaFour==undefined){
					        		loseAreaNameFour=data.data[0].wfname;
					        		loseAreaFour=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseD=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else{
					        		dispatch(actions.setVars('alertBool', false));
					        		dispatch(actions.setVars('alertText', '请先重置或清除数据'));
			            			return false;
					        	}
							},
					        error:function(XMLHttpRequest,textStatus,errorThrown){    
	                          	dispatch(actions.setVars('alertBool', false));
					        	dispatch(actions.setVars('alertText', '网络不稳定，请求超时'));
				        		return false;  
	                    	} 
						});
					}else{//区域
						$.ajax({
			    			url:'http://'+ipUrl+'/wbi/KPI/getKPILoseElec',//column表
					        type: 'post',
					        async:false,
					        dataType: 'json',
					        data:{'flag':checkedLose,'startTime':sTime,'endTime':eTime,'groupid':selectId,}, 
					        success:function (data) {
					        	if(loseAreaOne==undefined){
					        		loseAreaNameOne=data.data[0].groupname;
					        		loseAreaOne=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseA=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else if(loseAreaOne!==undefined&&loseAreaTwo==undefined){
					        		loseAreaNameTwo=data.data[0].groupname;
					        		loseAreaTwo=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseB=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree==undefined){
					        		loseAreaNameThree=data.data[0].groupname;
					        		loseAreaThree=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseC=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree!==undefined&&loseAreaFour==undefined){
					        		loseAreaNameFour=data.data[0].groupname;
					        		loseAreaFour=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
					        		loseD=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
					        	}else{
					        		dispatch(actions.setVars('alertBool', false));
					        		dispatch(actions.setVars('alertText', '请先重置或清除数据'));
			            			return false;
					        	}
							},
					        error:function(XMLHttpRequest,textStatus,errorThrown){    
	                          	dispatch(actions.setVars('alertBool', false));
					        	dispatch(actions.setVars('alertText', '网络不稳定，请求超时'));
				        		return false;  
                    		} 
						});
					}
					dispatch(actions.setVars('loseA', loseA));
					dispatch(actions.setVars('loseB', loseB));
					dispatch(actions.setVars('loseC', loseC));
					dispatch(actions.setVars('loseD', loseD));
					dispatch(actions.setVars('loseAreaOne', loseAreaOne));
					dispatch(actions.setVars('loseAreaTwo', loseAreaTwo));
					dispatch(actions.setVars('loseAreaThree', loseAreaThree));
					dispatch(actions.setVars('loseAreaFour', loseAreaFour));
					dispatch(actions.setVars('loseAreaNameOne', loseAreaNameOne));
					dispatch(actions.setVars('loseAreaNameTwo', loseAreaNameTwo));
					dispatch(actions.setVars('loseAreaNameThree', loseAreaNameThree));
					dispatch(actions.setVars('loseAreaNameFour', loseAreaNameFour));
	    		}else{
	    			dispatch(actions.setVars('alertBool', false));
	    			dispatch(actions.setVars('alertText', '请选择同一指标项'));
			        return false;
	    		}
	    	}else{
	    		if(loseAreaTwo!==undefined && checkedLose!==storage){
	    			dispatch(actions.setVars('alertBool', false));
	                dispatch(actions.setVars('alertText', '请选择同一指标项'));
	                return false;
	    		}else if(loseAreaThree!==undefined && checkedLose!==storage){
	    			dispatch(actions.setVars('alertBool', false));
	                dispatch(actions.setVars('alertText', '请选择同一指标项'));
	                return false;
	    		}else if(loseAreaFour!==undefined && checkedLose!==storage){
	    			dispatch(actions.setVars('alertBool', false));
	                dispatch(actions.setVars('alertText', '请选择同一指标项'));
	                return false;
	    		};
	    		dispatch(actions.setVars('storage', checkedLose));
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
		        var A=$('select').val();
				for(var i in selectName){
					if(selectName[i]==A){
						selectId=selectId[i];
					}
				};
				if(selectId<1000000){
					$.ajax({
		    			url:'http://'+ipUrl+'/wbi/KPI/getKPILoseElec',//Pie表
				        type: 'post',
				        async:false,
				        dataType: 'json',
				        data:{'flag':checkedLose,'startTime':sTime,'endTime':eTime,'wfid':selectId,}, 
				        success:function (data) {
				        	if(loseAreaOne==undefined){
				        		loseAreaNameOne=data.data[0].wfname;
				        		loseAreaOne=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseA=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else if(loseAreaOne!==undefined&&loseAreaTwo==undefined){
				        		loseAreaNameTwo=data.data[0].wfname;
				        		loseAreaTwo=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseB=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree==undefined){
				        		loseAreaNameThree=data.data[0].wfname;
				        		loseAreaThree=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseC=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree!==undefined&&loseAreaFour==undefined){
				        		loseAreaNameFour=data.data[0].wfname;
				        		loseAreaFour=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseD=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else{
				        		dispatch(actions.setVars('alertBool', false));
				        		dispatch(actions.setVars('alertText', '请先重置或清除数据'));
			        			return false;
				        	}
						},
				        error:function(XMLHttpRequest,textStatus,errorThrown){    
                          	dispatch(actions.setVars('alertBool', false));
				        	dispatch(actions.setVars('alertText', '网络不稳定，请求超时'));
			        		return false;  
                    	} 
					});
				}else{
					$.ajax({
		    			url:'http://'+ipUrl+'/wbi/KPI/getKPILoseElec',//column表
				        type: 'post',
				        async:false,
				        dataType: 'json',
				        data:{'flag':checkedLose,'startTime':sTime,'endTime':eTime,'groupid':selectId,}, 
				        success:function (data) {
				        	if(loseAreaOne==undefined){
				        		loseAreaNameOne=data.data[0].groupname;
				        		loseAreaOne=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseA=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else if(loseAreaOne!==undefined&&loseAreaTwo==undefined){
				        		loseAreaNameTwo=data.data[0].groupname;
				        		loseAreaTwo=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseB=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree==undefined){
				        		loseAreaNameThree=data.data[0].groupname;
				        		loseAreaThree=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseC=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else if(loseAreaOne!==undefined&&loseAreaTwo!==undefined&&loseAreaThree!==undefined&&loseAreaFour==undefined){
				        		loseAreaNameFour=data.data[0].groupname;
				        		loseAreaFour=[['故障损失',(data.data[0].faultloss).toFixed(1)/1],['维护损失',(data.data[0].maintainloss).toFixed(1)/1],['限功率损失',(data.data[0].limitloss).toFixed(1)/1],['非设备原因损失',(data.data[0].nodevreasonloss).toFixed(1)/1]];
				        		loseD=[(data.data[0].faultloss).toFixed(1)/1,(data.data[0].maintainloss).toFixed(1)/1,(data.data[0].limitloss).toFixed(1)/1,(data.data[0].nodevreasonloss).toFixed(1)/1];
				        	}else{
				        		dispatch(actions.setVars('alertBool', false));
				        		dispatch(actions.setVars('alertText', '请先重置或清除数据'));
			        			return false;
				        	}
						},
				        error:function(XMLHttpRequest,textStatus,errorThrown){    
                          	dispatch(actions.setVars('alertBool', false));
				        	dispatch(actions.setVars('alertText', '网络不稳定，请求超时'));
			        		return false;  
                    	} 
					});
				}
				dispatch(actions.setVars('loseA', loseA));
				dispatch(actions.setVars('loseB', loseB));
				dispatch(actions.setVars('loseC', loseC));
				dispatch(actions.setVars('loseD', loseD));
				dispatch(actions.setVars('loseAreaOne', loseAreaOne));
				dispatch(actions.setVars('loseAreaTwo', loseAreaTwo));
				dispatch(actions.setVars('loseAreaThree', loseAreaThree));
				dispatch(actions.setVars('loseAreaFour', loseAreaFour));
				dispatch(actions.setVars('loseAreaNameOne', loseAreaNameOne));
				dispatch(actions.setVars('loseAreaNameTwo', loseAreaNameTwo));
				dispatch(actions.setVars('loseAreaNameThree', loseAreaNameThree));
				dispatch(actions.setVars('loseAreaNameFour', loseAreaNameFour));
	    	}
	    }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



