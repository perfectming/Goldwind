import React from 'react';
import {connect} from 'react-redux';
import styles from './TopTenStyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelectTwo.jsx';
import ChartPie from './ChartPie.jsx';
import OneColumn from './OneColumn.jsx';
import AlertWindow from './AlertWindow.jsx';
import Login from '../../../../../../components/common/Loading.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
    	let {ipUrl,selectId,selectName,init}=this.props;
        this.props.init(ipUrl,selectId,selectName);
        setTimeout(function(){
        	init(ipUrl,selectId,selectName)
        },800)
    },
    
	render() {
		let comp = PBAdata.list;
		let {skinStyle,alertText,storageTop,buttonResetA,buttonResetB,columnOneTitle='',columnTwoTitle='',columnOneName=[],columnTwoName=[],columnOne=[],columnTwo=[],wtType,topTitleOne,topTitleTwo,topPieOne=[],topPieTwo=[],ipUrl,topBool=false,selectId,selectName,buttonAction,buttonReset,checkedTop=1,checkedBoxTopPro,checkedBoxTopElec,changeValueS,changeValueE}=this.props;
		if(topBool){
			return(
				<div className={skinStyle==1? styles.bodyBoxBlue:skinStyle==2? styles.bodyBoxWhite:styles.bodyBox}>
					<AlertWindow text={alertText}></AlertWindow>
					<div className={styles.inquireBox}>
	                {
	                    comp.map((value, key)=> {
	                        if (value.type === 'date') {
	                            return (
	                                    <div className={styles.dateBox} key={key}>
	                                        <span>发生时间</span><input id="startTime" ref="startTime" placeholder={value.content} onChange={(e)=>changeValueS(e.target.value)} type={value.type} style={{width:value.width}}/>
	                                        <span>结束时间</span><input id="endTime" ref="endTime" placeholder={value.content} onChange={(e)=>changeValueE(e.target.value)} type={value.type} style={{width:value.width}}/>
	                                    </div>
	                                )
	                        }else if (value.type === 'button') {
	                            return (
	                                    <div className={styles.btnBox} key={key}>
		                                    <div className={styles.bBox}>
		                                        <button onClick={()=>buttonAction(storageTop,columnTwoTitle,columnTwoTitle,columnOneName,columnTwoName,columnOne,columnTwo,wtType,ipUrl,checkedTop,selectName,selectId,topTitleOne,topTitleTwo,topPieOne,topPieTwo)}>{"查询"}</button>
		                                    </div>
		                                    <div className={styles.bBox}>
		                                        <button onClick={()=>buttonReset()}>{"重置"}</button>
		                                    </div>
	                                    </div>
	                                )
	                        }else if (value.type === 'radio') {
		                            return (
		                                <div className={styles.radioBox} key={key}>
			                                <span>指标项选择 :</span>
			                                <input type={value.type} id="loseElectric" checked={checkedTop==1? true:false} onChange={()=>checkedBoxTopElec()} name={value.type}/>
			                                <span>损失电量</span>
			                                <input type={value.type} id="loseProfit" checked={checkedTop==2? true:false} onChange={()=>checkedBoxTopPro()} name={value.type}/>
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
						<div className={styles.floorOne}>
							<div className={`${styles.pie} ${styles.boxShadow}`}>
								<div className={topTitleOne==undefined? styles.hide:styles.button} onClick={()=>buttonResetA()}>清除</div>
								<ChartPie color={skinStyle==2? '#333':'#fff'} judge={3} clickArr={topPieOne} unit={topTitleOne==undefined? "":storageTop==1? "kWh":"元"} name={topTitleOne==undefined? "":storageTop==1? topTitleOne+"故障损失电量":topTitleOne+"故障损失收入"} text={topTitleOne==undefined? "":storageTop==1? topTitleOne+"故障损失电量":topTitleOne+"故障损失收入"} lose={topPieOne}></ChartPie>
							</div>
							<div className={`${styles.column} ${styles.boxShadow}`}>
								{columnOneName.length!==0 && <OneColumn color={skinStyle==2? '#333':'#fff'} name={columnOneTitle} title={columnOneTitle} month={columnOneName} plan={columnOne} unit={topTitleOne==undefined? "":storageTop==1? "(kWh)":"(元)"}></OneColumn>}
							</div>
						</div>
						<div className={styles.floorTwo}>
							<div className={`${styles.pie} ${styles.boxShadow}`}>
								<div className={topTitleTwo==undefined? styles.hide:styles.button} onClick={()=>buttonResetB()}>清除</div>
								<ChartPie color={skinStyle==2? '#333':'#fff'} judge={4} clickArr={topPieTwo} unit={topTitleTwo==undefined? "":storageTop==1? "kWh":"元"} name={topTitleTwo==undefined? "":storageTop==1? topTitleTwo+"故障损失电量":topTitleTwo+"故障损失收入"} text={topTitleTwo==undefined? "":storageTop==1? topTitleTwo+"故障损失电量":topTitleTwo+"故障损失收入"} lose={topPieTwo}></ChartPie>
							</div>
							<div className={`${styles.column} ${styles.boxShadow}`}>
								{columnTwoName.length!==0 && <OneColumn color={skinStyle==2? '#333':'#fff'} name={columnTwoTitle} title={columnTwoTitle} month={columnTwoName} plan={columnTwo} unit={topTitleTwo==undefined? "":storageTop==1? "(kWh)":"(元)"}></OneColumn>}
							</div>
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
    	selectId : state.vars.selectId,
    	selectName : state.vars.selectName,
    	ipUrl : state.vars.ipUrl,
    	checkedTop : state.vars.checkedTop,
    	topBool: state.vars.topBool,
    	storageTop: state.vars.storageTop,
    	
    	topPieOne : state.vars.topPieOne,
    	topTitleOne: state.vars.topTitleOne,
    	columnOneName: state.vars.columnOneName,
    	columnOne: state.vars.columnOne,
    	columnOneTitle: state.vars.columnOneTitle,

    	topPieTwo : state.vars.topPieTwo,
    	topTitleTwo: state.vars.topTitleTwo,
    	columnTwoName: state.vars.columnTwoName,
    	columnTwo: state.vars.columnTwo,
    	columnTwoTitle: state.vars.columnTwoTitle,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (ipUrl,selectId,selectName) => {
        	dispatch(actions.setVars('topTitleOne', ));
			dispatch(actions.setVars('topPieOne', ));
			dispatch(actions.setVars('topTitleTwo', ));
			dispatch(actions.setVars('topPieTwo', ));
	        dispatch(actions.setVars('columnOneName', ));
			dispatch(actions.setVars('columnOne', ));	
	        dispatch(actions.setVars('columnTwoName', ));
			dispatch(actions.setVars('columnTwo', ));
			dispatch(actions.setVars('columnOneTitle', ));
			dispatch(actions.setVars('columnTwoTitle', ));
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
        	if(monthString=="02"){
        		if(yearString%4==0){
        			dayString=29;
        		}
        		dayString=28;
        	}else if(monthString=="04"||monthString=="06"||monthString=="09"||monthString==11){
        		dayString=30;
        	}else{
        		dayString=31;
        	};
        	var startString=yearString+'-'+monthString+'-'+'01';
        	var endString=yearString+'-'+monthString+'-'+dayString;
        	$('#startTime').val(startString);
            $('#endTime').val(endString); 
            
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
				complete : function(XMLHttpRequest,status) { 
					dispatch(actions.setVars('topBool', true));
				},
			})
        },
        changeValueS : (e) => {
        	
	    },
	    changeValueE : (e) => {
	        	
	    },
	    buttonAction : (storageTop,columnOneTitle,columnTwoTitle,columnOneName,columnTwoName,columnOne,columnTwo,wtType,ipUrl,checkedTop,selectName,selectId,topTitleOne,topTitleTwo,topPieOne,topPieTwo) => {
	    	if(topTitleOne!==undefined){
	    		if(checkedTop==storageTop){
	    			var sTime = $('#startTime').val();
			        //结束时间时间
			        var eTime = $('#endTime').val();
					var oDate1 = new Date(sTime);
		            var oDate2 = new Date(eTime);
		            if(sTime == '' || eTime == '') {
		                dispatch(actions.setVars('alertBool', false));
		                dispatch(actions.setVars('alertText', '请选择开始或者结束时间'));
		                return;
		            }else if(oDate1.getTime() > oDate2.getTime()){
		                dispatch(actions.setVars('alertBool', false));
		                dispatch(actions.setVars('alertText', '请选择正确的开始或者结束时间'));
		                return;
		            };
			        var A=$('select').val();
					for(var i in selectName){
						if(selectName[i]==A){
							selectId=selectId[i];
						}
					};
					//判断区域还是风场，if为风场，else为集团
					if(selectId<1000000){
						$.ajax({
					        url:'http://'+ipUrl+'/wbi/KPI/getTuFailureLoss',//Pie
							type: 'post',
							async: false,
							dataType: 'json',
							data: {'flag':checkedTop,'startTime':sTime,'endTime':eTime,'wfid':selectId},
							timeout : 60000, 
							success: function (data) {
								console.log(data)
								if (topTitleOne==undefined) {
									dispatch(actions.setVars('selectId3', selectId));
									dispatch(actions.setVars('sTime3', sTime));
                            		dispatch(actions.setVars('eTime3', eTime));
									topPieOne=[];
									topTitleOne=A;
									wtType=data.data[0].wttype;
									for(var i in data.data){
										topPieOne.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
									}
								    dispatch(actions.setVars('topTitleOne', topTitleOne));
								    dispatch(actions.setVars('topPieOne', topPieOne));
								    dispatch(actions.setVars('columnOneTitle', wtType));
								}else if (topTitleOne!==undefined&&topTitleTwo==undefined) {
									dispatch(actions.setVars('selectId4', selectId));
									dispatch(actions.setVars('sTime4', sTime));
                            		dispatch(actions.setVars('eTime4', eTime));
									topPieTwo=[];
									topTitleTwo=A;
									wtType=data.data[0].wttype;
									for(var i in data.data){
										topPieTwo.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
									}
								    dispatch(actions.setVars('topTitleTwo', topTitleTwo));
								    dispatch(actions.setVars('topPieTwo', topPieTwo));
								    dispatch(actions.setVars('columnTwoTitle', wtType));
								}else{
									dispatch(actions.setVars('alertBool', false));
			            			dispatch(actions.setVars('alertText', '请先重置或清除数据'));
			            			return;
								}
								$.ajax({
									url:'http://'+ipUrl+'/wbi/KPI/getAboutTopFailureLoss',//column
									type: 'post',
									async: false,
									dataType: 'json',
									data: {'wttype':wtType,'flag':checkedTop,'startTime':sTime,'endTime':eTime,'wfid':selectId},
									timeout : 60000, 
									success: function (data) {
										console.log(data)
										if (columnOneName.length==0) {
											columnOneName=[],columnOne=[];
											for(var i in data.data){
												columnOneName.push(data.data[i].blooeydescr);
												columnOne.push((data.data[i].powerloss).toFixed(1)/1);
											};
											dispatch(actions.setVars('columnOneName', columnOneName));
										    dispatch(actions.setVars('columnOne', columnOne));
										}else if(columnOneName.length!==0&&columnTwoName.length==0){
											columnTwoName=[],columnTwo=[];
											for(var i in data.data){
												columnTwoName.push(data.data[i].blooeydescr);
												columnTwo.push((data.data[i].powerloss).toFixed(1)/1);
											};
											dispatch(actions.setVars('columnTwoName', columnTwoName));
										    dispatch(actions.setVars('columnTwo', columnTwo));
										}else{
											dispatch(actions.setVars('alertBool', false));
							            	dispatch(actions.setVars('alertText', '请先重置或清除数据'));
							            	return;
										}
									},
									complete : function(XMLHttpRequest,status) { 
												
									},
								});
							},
							complete : function(XMLHttpRequest,status) { 
								
							},
						});
						
					}else{
						$.ajax({
					        url:'http://'+ipUrl+'/wbi/KPI/getTuFailureLoss',
							type: 'post',
							async: false,
							dataType: 'json',
							data: {'flag':checkedTop,'startTime':sTime,'endTime':eTime,'groupid':selectId},
							timeout : 60000, 
							success: function (data) {
								if (topTitleOne==undefined) {
									dispatch(actions.setVars('selectId3', selectId));
									dispatch(actions.setVars('sTime3', sTime));
                            		dispatch(actions.setVars('eTime3', eTime));
									topPieOne=[];
									topTitleOne=A;
									wtType=data.data[0].wttype;
									for(var i in data.data){
										topPieOne.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
									}
								    dispatch(actions.setVars('topTitleOne', topTitleOne));
								    dispatch(actions.setVars('topPieOne', topPieOne));
								    dispatch(actions.setVars('columnOneTitle', wtType));
								}else if (topTitleOne!==undefined&&topTitleTwo==undefined) {
									dispatch(actions.setVars('selectId4', selectId));
									dispatch(actions.setVars('sTime4', sTime));
                            		dispatch(actions.setVars('eTime4', eTime));
									topPieTwo=[];
									topTitleTwo=A;
									wtType=data.data[0].wttype;
									for(var i in data.data){
										topPieTwo.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
									}
								    dispatch(actions.setVars('topTitleTwo', topTitleTwo));
								    dispatch(actions.setVars('topPieTwo', topPieTwo));
								    dispatch(actions.setVars('columnTwoTitle', wtType));
								}else{
									dispatch(actions.setVars('alertBool', false));
			            			dispatch(actions.setVars('alertText', '请先重置或清除数据'));
			            			return;
								}
								$.ajax({
							        url:'http://'+ipUrl+'/wbi/KPI/getAboutTopFailureLoss',
									type: 'post',
									async: false,
									dataType: 'json',
									data: {'wttype':wtType,'flag':checkedTop,'startTime':sTime,'endTime':eTime,'groupid':selectId},
									timeout : 60000, 
									success: function (data) {
										if (columnOneName.length==0) {
											columnOneName=[],columnOne=[];
											for(var i in data.data){
												columnOneName.push(data.data[i].blooeydescr);
												columnOne.push((data.data[i].powerloss).toFixed(1)/1);
											};
											dispatch(actions.setVars('columnOneName', columnOneName));
								    		dispatch(actions.setVars('columnOne', columnOne));
										}else if(columnOneName.length!==0&&columnTwoName.length==0){
											columnTwoName=[],columnTwo=[];
											for(var i in data.data){
												columnTwoName.push(data.data[i].blooeydescr);
												columnTwo.push((data.data[i].powerloss).toFixed(1)/1);
											};
											dispatch(actions.setVars('columnTwoName', columnTwoName));
								    		dispatch(actions.setVars('columnTwo', columnTwo));
										}else{
											dispatch(actions.setVars('alertBool', false));
					            			dispatch(actions.setVars('alertText', '请先重置或清除数据'));
					            			return;
										}
									},
									complete : function(XMLHttpRequest,status) { 
										
									},
								});
							},
							complete : function(XMLHttpRequest,status) {},
						});
						
					}
	    		}else{
	    			dispatch(actions.setVars('alertBool', false));
			        dispatch(actions.setVars('alertText', '请选择同一个指标项'));
			        return;
	    		}
	    	}else{
	    		if(topTitleTwo!==undefined&&checkedTop!==storageTop){
	    			dispatch(actions.setVars('alertBool', false));
			        dispatch(actions.setVars('alertText', '请选择同一个指标项'));
			        return;
	    		}
	    		dispatch(actions.setVars('storageTop', checkedTop));
	    		var sTime = $('#startTime').val();
		        //结束时间时间
		        var eTime = $('#endTime').val();
				var oDate1 = new Date(sTime);
	            var oDate2 = new Date(eTime);
	            if(sTime == '' || eTime == '') {
	                dispatch(actions.setVars('alertBool', false));
	                dispatch(actions.setVars('alertText', '请选择开始或者结束时间'));
	                return;
	            }else if(oDate1.getTime() > oDate2.getTime()){
	                dispatch(actions.setVars('alertBool', false));
	                dispatch(actions.setVars('alertText', '请选择正确的开始或者结束时间'));
	                return;
	            };
		        var A=$('select').val();
				for(var i in selectName){
					if(selectName[i]==A){
						selectId=selectId[i];
					}
				};
				if(selectId<1000000){
					$.ajax({
				        url:'http://'+ipUrl+'/wbi/KPI/getTuFailureLoss',
						type: 'post',
						async: false,
						dataType: 'json',
						data: {'flag':checkedTop,'startTime':sTime,'endTime':eTime,'wfid':selectId},
						timeout : 60000, 
						success: function (data) {
							console.log(data)
							if (topTitleOne==undefined) {
								dispatch(actions.setVars('selectId3', selectId));
								dispatch(actions.setVars('sTime3', sTime));
                            	dispatch(actions.setVars('eTime3', eTime));
								topPieOne=[];
								topTitleOne=A;
								wtType=data.data[0].wttype;
								for(var i in data.data){
									topPieOne.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
								}
							    dispatch(actions.setVars('topTitleOne', topTitleOne));
							    dispatch(actions.setVars('topPieOne', topPieOne));
							    dispatch(actions.setVars('columnOneTitle', wtType));
							}else if (topTitleOne!==undefined&&topTitleTwo==undefined) {
								dispatch(actions.setVars('selectId4', selectId));
								dispatch(actions.setVars('sTime4', sTime));
                            	dispatch(actions.setVars('eTime4', eTime));
								topPieTwo=[];
								topTitleTwo=A;
								wtType=data.data[0].wttype;
								for(var i in data.data){
									topPieTwo.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
								}
							    dispatch(actions.setVars('topTitleTwo', topTitleTwo));
							    dispatch(actions.setVars('topPieTwo', topPieTwo));
							    dispatch(actions.setVars('columnTwoTitle', wtType));
							}else{
								dispatch(actions.setVars('alertBool', false));
						        dispatch(actions.setVars('alertText', '请先重置或清除数据'));
						        return;
							}
							$.ajax({
								url:'http://'+ipUrl+'/wbi/KPI/getAboutTopFailureLoss',
								type: 'post',
								async: false,
								dataType: 'json',
								data: {'wttype':wtType,'flag':checkedTop,'startTime':sTime,'endTime':eTime,'wfid':selectId},
								timeout : 60000, 
								success: function (data) {
									if (columnOneName.length==0) {
										columnOneName=[],columnOne=[];
										for(var i in data.data){
											columnOneName.push(data.data[i].blooeydescr);
											columnOne.push((data.data[i].powerloss).toFixed(1)/1);
										};
										dispatch(actions.setVars('columnOneName', columnOneName));
									    dispatch(actions.setVars('columnOne', columnOne));
									}else if(columnOneName.length!==0&&columnTwoName.length==0){
										columnTwoName=[],columnTwo=[];
										for(var i in data.data){
											columnTwoName.push(data.data[i].blooeydescr);
											columnTwo.push((data.data[i].powerloss).toFixed(1)/1);
										};
										dispatch(actions.setVars('columnTwoName', columnTwoName));
									    dispatch(actions.setVars('columnTwo', columnTwo));
									}else{
										dispatch(actions.setVars('alertBool', false));
										dispatch(actions.setVars('alertText', '请先重置或清除数据'));
										return;
									}
								},
								complete : function(XMLHttpRequest,status) { 
											
								},
							});
						},
						complete : function(XMLHttpRequest,status) { 
							
						},
					});
					
				}else{
					$.ajax({
				        url:'http://'+ipUrl+'/wbi/KPI/getTuFailureLoss',
						type: 'post',
						async: false,
						dataType: 'json',
						data: {'flag':checkedTop,'startTime':sTime,'endTime':eTime,'groupid':selectId},
						timeout : 60000, 
						success: function (data) {
							if (topTitleOne==undefined) {
								dispatch(actions.setVars('selectId3', selectId));
								dispatch(actions.setVars('sTime3', sTime));
                            	dispatch(actions.setVars('eTime3', eTime));
								topPieOne=[];
								topTitleOne=A;
								wtType=data.data[0].wttype;
								for(var i in data.data){
									topPieOne.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
								}
							    dispatch(actions.setVars('topTitleOne', topTitleOne));
							    dispatch(actions.setVars('topPieOne', topPieOne));
							    dispatch(actions.setVars('columnOneTitle', wtType));
							}else if (topTitleOne!==undefined&&topTitleTwo==undefined) {
								dispatch(actions.setVars('selectId4', selectId));
								dispatch(actions.setVars('sTime4', sTime));
                            	dispatch(actions.setVars('eTime4', eTime));
								topPieTwo=[];
								topTitleTwo=A;
								wtType=data.data[0].wttype;
								for(var i in data.data){
									topPieTwo.push([data.data[i].wttype,(data.data[i].faultloss).toFixed(1)/1]);
								}
							    dispatch(actions.setVars('topTitleTwo', topTitleTwo));
							    dispatch(actions.setVars('topPieTwo', topPieTwo));
							    dispatch(actions.setVars('columnTwoTitle', wtType));
							}else{
								dispatch(actions.setVars('alertBool', false));
								dispatch(actions.setVars('alertText', '请先重置或清除数据'));
								return;
							}
							$.ajax({
								    url:'http://'+ipUrl+'/wbi/KPI/getAboutTopFailureLoss',
									type: 'post',
									async: false,
									dataType: 'json',
									data: {'wttype':wtType,'flag':checkedTop,'startTime':sTime,'endTime':eTime,'groupid':selectId},
									timeout : 60000, 
									success: function (data) {
										if (columnOneName.length==0){
												columnOneName=[],columnOne=[];
												for(var i in data.data){
													columnOneName.push(data.data[i].blooeydescr);
													columnOne.push((data.data[i].powerloss).toFixed(1)/1);
												};
												dispatch(actions.setVars('columnOneName', columnOneName));
									    		dispatch(actions.setVars('columnOne', columnOne));
										}else if(columnOneName.length!==0&&columnTwoName.length==0){
												columnTwoName=[],columnTwo=[];
												for(var i in data.data){
													columnTwoName.push(data.data[i].blooeydescr);
													columnTwo.push((data.data[i].powerloss).toFixed(1)/1);
												};
												dispatch(actions.setVars('columnTwoName', columnTwoName));
									    		dispatch(actions.setVars('columnTwo', columnTwo));
										}else{
												dispatch(actions.setVars('alertBool', false));
										        dispatch(actions.setVars('alertText', '请先重置或清除数据'));
										        return;
										}
									},
									complete : function(XMLHttpRequest,status) { 
											
									},
							});
						},
						complete : function(XMLHttpRequest,status) {},
					});
					
				}
	    	}
	    	
        },
	    buttonReset : (e) =>{
	    	dispatch(actions.setVars('topTitleOne', ));
			dispatch(actions.setVars('topPieOne', ));
			dispatch(actions.setVars('topTitleTwo', ));
			dispatch(actions.setVars('topPieTwo', ));
	        dispatch(actions.setVars('columnOneName', ));
			dispatch(actions.setVars('columnOne', ));	
	        dispatch(actions.setVars('columnTwoName', ));
			dispatch(actions.setVars('columnTwo', ));
			dispatch(actions.setVars('columnOneTitle', ));
			dispatch(actions.setVars('columnTwoTitle', ));	
	    },
	    buttonResetA : () =>{
	    	dispatch(actions.setVars('topTitleOne', ));
			dispatch(actions.setVars('topPieOne', ));
	        dispatch(actions.setVars('columnOneName', ));
			dispatch(actions.setVars('columnOne', ));
			dispatch(actions.setVars('columnOneTitle', ));	
	    },
	    buttonResetB : () =>{
			dispatch(actions.setVars('topTitleTwo', ));
			dispatch(actions.setVars('topPieTwo', ));	
	        dispatch(actions.setVars('columnTwoName', ));
			dispatch(actions.setVars('columnTwo', ));
			dispatch(actions.setVars('columnTwoTitle', ));	
	    },
        checkedBoxTopPro : () => {
        	dispatch(actions.setVars('checkedTop', 2));
        },
        checkedBoxTopElec : () => {
        	dispatch(actions.setVars('checkedTop', 1));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);