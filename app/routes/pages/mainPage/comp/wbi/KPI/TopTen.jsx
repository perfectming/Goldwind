import React from 'react';
import {connect} from 'react-redux';
import styles from './TopTenStyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelectTwo.jsx';
import ChartPie from './ChartPie.jsx';
import OneColumn from './OneColumn.jsx';
import Login from '../../../../../../components/common/Loading.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
    	let {ipUrl,selectId,selectName,init}=this.props;
        this.props.init(ipUrl,selectId,selectName);
        setTimeout(function(){
        	init(ipUrl,selectId,selectName)
        },1000)
    },
    
	render() {
		let data=PBAdata;
		let comp = PBAdata.list;
		let {columnOneName=[],columnTwoName=[],columnOne=[],columnTwo=[],wtType,topTitleOne,topTitleTwo,topPieOne=[],topPieTwo=[],ipUrl,topBool=false,selectId,selectName,buttonAction,buttonReset,checkedTop=1,checkedBoxTopPro,checkedBoxTopElec,changeValueS,changeValueE}=this.props;
		if(topBool){
			return(
				<div className={styles.bodyBox}>
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
		                                        <button onClick={()=>buttonAction(columnOneName,columnTwoName,columnOne,columnTwo,wtType,ipUrl,checkedTop,selectName,selectId,topTitleOne,topTitleTwo,topPieOne,topPieTwo)}>{"查询"}</button>
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
								<ChartPie text={topTitleOne} lose={topPieOne}></ChartPie>
							</div>
							<div className={`${styles.column} ${styles.boxShadow}`}>
								<OneColumn name={''} title={''} month={columnOneName} plan={columnOne} unit={data.data[3].unit}></OneColumn>
							</div>
						</div>
						<div className={styles.floorTwo}>
							<div className={`${styles.pie} ${styles.boxShadow}`}>
								<ChartPie text={topTitleTwo} lose={topPieTwo}></ChartPie>
							</div>
							<div className={`${styles.column} ${styles.boxShadow}`}>
								<OneColumn name={''} title={''} month={columnTwoName} plan={columnTwo} unit={data.data[3].unit}></OneColumn>
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
    	selectId : state.vars.selectId,
    	selectName : state.vars.selectName,
    	ipUrl : state.vars.ipUrl,
    	checkedTop : state.vars.checkedTop,
    	topBool: state.vars.topBool,
    	
    	topPieOne : state.vars.topPieOne,
    	topTitleOne: state.vars.topTitleOne,
    	topPieTwo : state.vars.topPieTwo,
    	topTitleTwo: state.vars.topTitleTwo,
    	columnOneName: state.vars.columnOneName,
    	columnOne: state.vars.columnOne,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (ipUrl,selectId,selectName) => {
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
        	}else if(monthString==4||6||9||11){
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
	    buttonAction : (columnOneName,columnTwoName,columnOne,columnTwo,wtType,ipUrl,checkedTop,selectName,selectId,topTitleOne,topTitleTwo,topPieOne,topPieTwo) => {
	    	var sTime = $('#startTime').val();
	        //结束时间时间
	        var eTime = $('#endTime').val();
			if(sTime == '' || eTime == '') {
	            alert('请选择开始或者结束时间');
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
			        url:'http://'+ipUrl+'/wbi/KPI/getTuFailureLoss',
					type: 'post',
					async: false,
					dataType: 'json',
					data: {'flag':checkedTop,'startTime':sTime,'endTime':eTime,'wfid':selectId},
					timeout : 60000, 
					success: function (data) {
						topPieOne=[];
						topTitleOne=A+'故障损失分析';
						wtType=data.data[0].wttype;
						for(var i in data.data){
							topPieOne.push([data.data[i].wttype,data.data[i].faultloss]);
						}
					    dispatch(actions.setVars('topTitleOne', topTitleOne));
					    dispatch(actions.setVars('topPieOne', topPieOne));
					},
					complete : function(XMLHttpRequest,status) { 
						$.ajax({
					        url:'http://'+ipUrl+'/wbi/KPI/getAboutTopFailureLoss',
							type: 'post',
							async: false,
							dataType: 'json',
							data: {'wttype':wtType,'flag':checkedTop,'startTime':sTime,'endTime':eTime,'wfid':selectId},
							timeout : 60000, 
							success: function (data) {
								console.log(data);
								columnOneName=[],columnOne=[];
								for(var i in data.data){
									columnOneName.push(data.data[i].blooeydescr);
									columnOne.push(data.data[i].powerloss);
								};
								dispatch(actions.setVars('columnOneName', columnOneName));
					    		dispatch(actions.setVars('columnOne', columnOne));
							},
							complete : function(XMLHttpRequest,status) { 
								
							},
						});
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
						topPieOne=[];
					    topTitleOne=A+'故障损失分析';
					    wtType=data.data[0].wttype;
						for(var i in data.data){
							topPieOne.push([data.data[i].wttype,data.data[i].faultloss]);
						}
					    dispatch(actions.setVars('topTitleOne', topTitleOne));
					    dispatch(actions.setVars('topPieOne', topPieOne));
					},
					complete : function(XMLHttpRequest,status) {},
				});
				$.ajax({
					        url:'http://'+ipUrl+'/wbi/KPI/getAboutTopFailureLoss',
							type: 'post',
							async: false,
							dataType: 'json',
							data: {'wttype':wtType,'flag':checkedTop,'startTime':sTime,'endTime':eTime,'groupid':selectId},
							timeout : 60000, 
							success: function (data) {
								console.log(data);
								console.log(data);
								columnOneName=[],columnOne=[];
								for(var i in data.data){
									columnOneName.push(data.data[i].blooeydescr);
									columnOne.push(data.data[i].powerloss);
								};
								dispatch(actions.setVars('columnOneName', columnOneName));
					    		dispatch(actions.setVars('columnOne', columnOne));
							},
							complete : function(XMLHttpRequest,status) { 
								
							},
				});
			}
        },
	    buttonReset : (e) => {
	        	
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