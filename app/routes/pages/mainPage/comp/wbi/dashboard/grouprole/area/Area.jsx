import React from 'react';
import {connect} from 'react-redux';
import styles from './Areastyle.scss';
import Yearelectric from '../Yearelectric.jsx';
import Pie2 from '../PieTwo';
import Login from '../../../../../../../../components/common/Loading.jsx';
var $ =require("jQuery");
var actions = require('redux/actions');


let healthyArea,clickAreaId,areaName=[],areaId=[],areaCost=[],areaProfit=[],areaMonth=[],runTime,downTime,TBA,areaArr;
let actb=0,elecPlanPBA,elecActPBA,yearPlanElec,monthPlanElec,dayPlanElec,yearElec,monthElec,dayElec,month=[],elecPlan=[],elecAct=[];


let Component = React.createClass({
	componentWillMount() {
		let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        let{healthyArea,clickAreaId,areaName,areaId,areaCost,areaProfit,areaMonth,runTime,downTime,TBA,areaArr,actb,elecPlanPBA,elecActPBA,yearPlanElec,monthPlanElec,dayPlanElec,yearElec,monthElec,dayElec,month,elecPlan,elecAct,ipUrl,areaBool=false,flag=true,flagPba=true,flagTime=true,changepageProT,changepageProS,changepageSort1,changepageSort,changepage,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        if(areaBool){
        	return (
	            <div className={styles.box}>
	           		<ul className={styles.monthbox}>
	                    {
	                    	areaName.map((value,key)=>{
	                    		return(<li key={key} className={actb===key? styles.bg1 : styles.bg} onClick={()=>changepage(ipUrl,value,key,areaId,areaMonth,areaProfit,areaCost,clickAreaId)}>{value}</li>)
	                    	})
	                    }
	                </ul>
	           		
	           		<div className={styles.left}>
	           			<div className={styles.firstfloor}>
	           				<div className={`${styles.section} ${styles.boxShadow}`}>
	           					<div className={styles.sectionbar}>
	           						<span>当前{healthyArea.toFixed(1)}分<br/><br/>总分100分</span><br/><br/>
	           					</div>
	           					<div className={styles.sectiontwo}>
	           						<div className={styles.pie}>
	           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{healthyArea.toFixed(1)}%</p>健康度</span>
	           						<Pie2 color={(healthyArea/100)>0.9? ['#62de88','#39565e']:(healthyArea/100)>0.8?['#e8952a','#39565e']:(healthyArea/100)>0.6?['#a32124','#39565e']:['#d8403d','#39565e']} num={[healthyArea,100-healthyArea]}></Pie2>
	           						</div>
	           						<a className={styles.space} onClick={()=>changepageHealthyS()}></a><br/>
	           						<a className={styles.time} onClick={()=>changepageHealthyT()}></a>
	           					</div>
	           				</div>
	           				<div className={`${styles.section} ${styles.boxShadow}`}>
	           					<div className={styles.sectionbar}>
	           						<span>实发<br/>{(elecActPBA/10000).toFixed(1)}万kWh<br/>应发<br/>{elecPlanPBA.toFixed(1)}kWh</span><br/><br/>
	           					</div>
	           					<div className={styles.sectionthree}>
	           						<div className={styles.pie}>
	           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{elecActPBA!==0&&elecPlanPBA==0? (elecActPBA/elecPlanPBA):(elecActPBA/elecPlanPBA).toFixed(1)*100+'%'}</p>PBA</span>
	           						<Pie2 color={(elecActPBA/elecPlanPBA)>0.9? ['#62de88','#39565e']:(elecActPBA/elecPlanPBA)>0.8?['#e8952a','#39565e']:(elecActPBA/elecPlanPBA)>0.6?['#a32124','#39565e']:['#d8403d','#39565e']} num={[elecActPBA,elecPlanPBA-elecActPBA]}></Pie2>
	           						</div>
	           						<a className={styles.space} onClick={()=>changepagePBAS()}></a><br/>
	           						<a className={styles.time} onClick={()=>changepagePBAT()}></a>
	           					</div>
	           				</div>
	           				<div className={`${styles.sectionSmall} ${styles.boxShadow}`}>
	           					<div className={styles.sectionbar}>
	           						<span>停机时间<br/>{downTime}h <br/>运行时间<br/>{runTime}h</span><br/><br/>
	           					</div>
	           					<div className={styles.sectionfour}>
	           						<div className={styles.pie}>
	           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{(TBA*100).toFixed(1)}%</p>TBA</span>
	           						<Pie2 color={TBA>0.9? ['#62de88','#39565e']:TBA>0.8?['#e8952a','#39565e']:TBA>0.6?['#a32124','#39565e']:['#d8403d','#39565e']} num={runTime==0&&downTime==0? [0,1]:[runTime,downTime]}></Pie2>
	           						</div>
	           						<a className={styles.space} onClick={()=>changepageTBAS()}></a><br/>
	           						<a className={styles.time} onClick={()=>changepageTBAT()}></a>
	           					</div>
	           				</div>
	           			</div>
	           			<div className={styles.secondfloor}>
	           				<div className={`${styles.electric} ${styles.boxShadow}`}>
	           					<div className={styles.electricHeader}><a></a>发电量</div>
	           					<div className={styles.electricFirst}>
	           						<a></a><span>年累计发电量</span>
	           						<div className={styles.electricTotal}>{(yearElec/10000).toFixed(1)}万kWh</div>
	           						<div className={styles.electricPercent}>
	           							<div className={yearElec/yearPlanElec>0.9? styles.green:yearElec/yearPlanElec>.8? styles.yellow:yearElec/yearPlanElec>.6? styles.red:styles.redS} style={{width:((yearElec/yearPlanElec*100).toFixed(1))+"%"}}>{(yearElec/yearPlanElec*100).toFixed(1)}%</div>
	           						</div>
	           					</div>
	           					<div className={styles.electricSecond}>
	           						<a></a><span>月累计发电能量</span>
	           						<div className={styles.electricTotal}>{(monthElec/10000).toFixed(1)}万kWh</div>
	           						<div className={styles.electricPercent}>
	           							<div className={monthElec/monthPlanElec>0.9? styles.green:monthElec/monthPlanElec>.8? styles.yellow:monthElec/monthPlanElec>.6? styles.red:styles.redS} style={{width:((monthElec/monthPlanElec*100).toFixed(1))+"%"}}>{(monthElec/monthPlanElec*100).toFixed(1)}%</div>
	           						</div>
	           					</div>
	           					<div className={styles.electricThird}>
	           						<a></a><span>日累计发电量</span>
	           						<div className={styles.electricTotal}>{(dayElec/10000).toFixed(1)}万kWh</div>
	           						<div className={styles.electricPercent}>
	           							<div className={dayElec/dayPlanElec>0.9? styles.green:dayElec/dayPlanElec>.8? styles.yellow:dayElec/dayPlanElec>.6? styles.red:styles.redS} style={{width:((dayElec/dayPlanElec*100).toFixed(1))+"%"}}>{(dayElec/dayPlanElec*100).toFixed(1)}%</div>
	           						</div>
	           					</div>
	           				</div>
	           				<div className={`${styles.yearelectric} ${styles.boxShadow}`}>
	           					<div>
	           						<div className={styles.header}>
	           							<div className={styles.logo}><a></a><span>年发电量</span></div>
		           						<div className={styles.space} onClick={()=>changepageEleS()}></div>&nbsp;
		           						<div className={styles.time} onClick={()=>changepageEleT()}></div>
	           						</div>
	           						<Yearelectric month={month} plan={elecPlan} actrul={elecAct} unit={'kWh'} nameOne={'计划电量'} nameTwo={'实际电量'}></Yearelectric>
	           					</div>
	           				</div>
	           				<div className={`${styles.yearprofit} ${styles.boxShadow}`}>
	           					<div>
	           						<div className={styles.header}>
	           							<div className={styles.logo}><a></a><span>年收益</span></div>
	           							<div className={styles.linkBox}>
	           								<div className={styles.links}><a className={styles.space} onClick={()=>changepageProS()}></a></div>
		           							<div className={styles.links}><a className={styles.time} onClick={()=>changepageProT()}></a></div>
	           							</div>
		           					</div>
	           						<Yearelectric month={areaMonth} plan={areaProfit} actrul={areaCost} unit={'元'} nameOne={'收入'} nameTwo={'成本'}></Yearelectric>
	           					</div>
	           				</div>
	           			</div>
	           		</div>
	                <div className={`${styles.right} ${styles.boxShadow}`}>
	                	<h3>
	                		<a></a><span>PBA排序</span>
	                	</h3>
	                	<table>
	                		<tbody>
	                			<tr>
		                			<th>排名</th>
		           					<th>风场名</th>
		           					<th onClick={()=>changepageSort1(flag,flagPba,areaArr)} className={flag==true? styles.clickPba1:styles.clickPba4} >PBA <span className={flagPba==true? styles.arrow:styles.bottom}></span></th>
		           					<th onClick={()=>changepageSort(flag,flagTime,areaArr)} className={flag==true? styles.clickTime1:styles.clickTime4}>停机时间 <span className={flagTime==true? styles.arrow:styles.bottom}></span></th>
	                			</tr>
	                			{
	                				areaArr.slice(0,15).map((value,key)=>{
			                    		return(<tr key={key}><th>{key+1}</th><th>{value.wfname}</th><th>{(value.everyAreaPba*100).toFixed(1)}%</th><th>{value.downtime}分钟</th></tr>)
			                    	})
	                			}
	                		</tbody>	
	                	</table>
	                </div>
	            </div>
	        );
        }else{
        	return(
        		<Login></Login>
        	)
        	
        }
		
    }
});



const mapStateToProps = (state) => {
    return {
    	actb : state.vars.actb,
    	
    	flag : state.vars.flag,
    	flagPba : state.vars.flagPba,
    	flagTime : state.vars.flagTime,
    	areaArr : state.vars.areaArr,
    	clickAreaId:state.vars.clickAreaId,
    	areaBool:state.vars.areaBool,
    	ipUrl : state.vars.ipUrl,
    	
    	areaName : state.vars.areaName,
    	areaId : state.vars.areaId,
    	areaMonth : state.vars.areaMonth,
    	areaProfit : state.vars.areaProfit,
    	areaCost : state.vars.areaCost,
    	yearElec : state.vars.yearElec,
    	monthElec : state.vars.monthElec,
    	dayElec : state.vars.dayElec,
    	yearPlanElec : state.vars.yearPlanElec,
    	monthPlanElec : state.vars.monthPlanElec,
    	dayPlanElec : state.vars.dayPlanElec,
    	month : state.vars.month,
    	elecPlan : state.vars.elecPlan,
    	elecAct : state.vars.elecAct,
    	elecActPBA : state.vars.elecActPBA,
    	elecPlanPBA : state.vars.elecPlanPBA,
    	runTime : state.vars.runTime,
    	downTime : state.vars.downTime,
    	TBA : state.vars.TBA,
    	healthyArea : state.vars.healthyArea,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	ajax: (ipUrl) => {
    		dispatch(actions.setVars('actb',0 ));
    		$.ajax({
        		url:'http://'+ipUrl+'/wbi/BaseData/getGroup',//获得各区域ID和名字
		        type: 'post',
		        async:true,
		        dataType: 'json',
		        data:'type=0',
		        timeout : 60000, 
		        success:function (data) {
		        	areaName=[];
		        	areaId=[];
		        	for(var i in data.data){
		        		areaName.push(data.data[i]);
		        		areaId.push(i);
		        	};
		        	dispatch(actions.setVars('areaName',areaName ));
		        	dispatch(actions.setVars('areaId',areaId ));
		        },
		        complete : function(XMLHttpRequest,status){ 
				　　　$.ajax({
		        		url: 'http://'+ipUrl+'/wbi/yield/getGroupAllRate',//收益柱图
				        type: 'post',
				        async:true,
				        data:{'groupid':areaId[0]},
				        dataType: 'json',//here
				        success:function (data) {
				        	areaMonth=[],areaProfit=[],areaCost=[];
				        	for(var i in data.data){
				        		areaMonth.push(data.data[i].month+"月");
				        		areaProfit.push((data.data[i].incomes).toFixed(1)/1);
				        		areaCost.push((data.data[i].costs).toFixed(1)/1);
				        	};
				        	dispatch(actions.setVars('areaMonth',areaMonth ));
				        	dispatch(actions.setVars('areaProfit',areaProfit ));
				        	dispatch(actions.setVars('areaCost',areaCost ));
				        },
				        complete : function(XMLHttpRequest,status){ 
					　　　　  $.ajax({
				        		url: 'http://'+ipUrl+'/wbi/ELEC/getAreaElec',//电量进度条和柱图
						        type: 'post',
						        async:true,
						        data:{'groupid':areaId[0]},
						        dataType: 'json',//here
						        success:function (data) {
						        	yearElec=data.data.areasyearElec;
						        	monthElec=data.data.areaMonthsElec;
						        	dayElec=data.data.dayelec;
						        	yearPlanElec=data.data.areasyearPlanElec;
						        	monthPlanElec=data.data.areasMonthsPlanElec;
						        	dayPlanElec=data.data.dayPlanElec;
						        	month=[],elecPlan=[],elecAct=[];
						        	for(var i in data.data.twAreaMonthElec){
						        		elecAct.push((data.data.twAreaMonthElec[i].poweract).toFixed(1)/1);
						        	};
						        	for(var i in data.data.twAreaMonthPlanElec){
						        		elecPlan.push((data.data.twAreaMonthPlanElec[i]).toFixed(1)/1);
						        		month.push(i+"月");
						        	};
						        	dispatch(actions.setVars('yearElec',yearElec ));
						        	dispatch(actions.setVars('monthElec',monthElec ));
						        	dispatch(actions.setVars('dayElec',dayElec ));
						        	dispatch(actions.setVars('yearPlanElec',yearPlanElec ));
						        	dispatch(actions.setVars('monthPlanElec',monthPlanElec ));
						        	dispatch(actions.setVars('dayPlanElec',dayPlanElec ));
						        	dispatch(actions.setVars('month',month ));
						        	dispatch(actions.setVars('elecPlan',elecPlan ));
						        	dispatch(actions.setVars('elecAct',elecAct ));
						        },
						        complete : function(XMLHttpRequest,status){ 
							　　　　	$.ajax({
						        		url: 'http://'+ipUrl+'/wbi/PBA/getAreaPBA',//PBA饼图和风场列表
								        type: 'post',
								        async:true,
								        data:{'groupid':areaId[0],'type':1},
								        dataType: 'json',//here
								        success:function (data) {
								        	elecActPBA=data.data.scale[0].poweract;
								        	elecPlanPBA=data.data.scale[0].powertheory;
								        	areaArr=data.data.everyAreaPba;
								        	dispatch(actions.setVars('elecActPBA',elecActPBA ));
								        	dispatch(actions.setVars('elecPlanPBA',elecPlanPBA ));
								        	dispatch(actions.setVars('areaArr',areaArr ));
								        },
								        complete : function(XMLHttpRequest,status){ 
									　　　　	$.ajax({
								        		url: 'http://'+ipUrl+'/wbi/TBA/getGLastMonthTBA',//TBA饼图
										        type: 'post',
										        async:true,
										        data:{'groupid':areaId[0]},
										        dataType: 'json',//here
										        success:function (data) {
										        	runTime=data.data[0].runtimes;
										        	downTime=data.data[0].downtimes;
										        	TBA=data.data[0].tba;
										        	dispatch(actions.setVars('runTime',runTime ));
										        	dispatch(actions.setVars('downTime',downTime ));
										        	dispatch(actions.setVars('TBA',TBA ));
										        },
										        complete : function(XMLHttpRequest,status){
										        	$.ajax({
										                url:'http://'+ipUrl+'/wbi/Health/getCompanyHealth',//健康度饼图
										                type: 'post',
										                data: {'type':1,'groupid':areaId[0],'wfid':''},
										                async:true,
										                dataType: 'json',
										                timeout : 60000,
										                success:function (data) {
															healthyArea=data.data.health;
															dispatch(actions.setVars('healthyArea',healthyArea ));
										                },
										                complete : function(XMLHttpRequest,status){
										                    dispatch(actions.setVars('areaBool',true ));
										                },
										            });
											　　　},
										    });
									　　  },
								   });
							　　},
						   });
					　　},
				   });
				},
			});
		   
    	},
        init: () => {
            var obj = {
                test:''
            } 
        },
        changepageSort:(flag,flagTime,areaArr)=>{
        	flagTime==false? dispatch(actions.setVars('areaArr', areaArr.sort(function(a,b){return a.downtime-b.downtime}))):dispatch(actions.setVars('areaArr', areaArr.sort(function(a,b){return b.downtime-a.downtime})));
        	dispatch(actions.setVars('flag',false ));
        	dispatch(actions.setVars('flagTime',!flagTime ));
        	
        },
        changepageSort1:(flag,flagPba,areaArr)=>{
        	flagPba==true? dispatch(actions.setVars('areaArr', areaArr.sort(function(a,b){return a.everyAreaPba-b.everyAreaPba}))):dispatch(actions.setVars('areaArr', areaArr.sort(function(a,b){return b.everyAreaPba-a.everyAreaPba})));
        	dispatch(actions.setVars('flag',true ));
        	dispatch(actions.setVars('flagPba',!flagPba ));
        },
        changepage :(ipUrl,value,key,areaId,areaMonth,areaProfit,areaCost,clickAreaId)=>{
        	$.ajax({
        		url: 'http://'+ipUrl+'/wbi/yield/getGroupAllRate',//收益柱图
		        type: 'post',
		        async:true,
		        data:{'groupid':areaId[key]},
		        dataType: 'json',
		        success:function (data) {
		        	clickAreaId=areaId[key];
		        	areaMonth=[],areaProfit=[],areaCost=[];
		        	for(var i in data.data){
		        		areaMonth.push(data.data[i].month+"月");
		        		areaProfit.push((data.data[i].incomes).toFixed(1)/1);
		        		areaCost.push((data.data[i].costs).toFixed(1)/1);
		        	}
		        	dispatch(actions.setVars('clickAreaId',clickAreaId ));
		        	dispatch(actions.setVars('areaMonth',areaMonth ));
		        	dispatch(actions.setVars('areaProfit',areaProfit ));
		        	dispatch(actions.setVars('areaCost',areaCost ));
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　	$.ajax({
						url:'http://'+ipUrl+'/wbi/Health/getCompanyHealth',//健康度饼图
						type: 'post',
						data: {'type':1,'groupid':areaId[key],'wfid':''},
						async:true,
						dataType: 'json',
						timeout : 60000,
						success:function (data) {
							healthyArea=data.data.health;
							dispatch(actions.setVars('healthyArea',healthyArea ));
						},
						complete : function(XMLHttpRequest,status){
							$.ajax({
				        		url: 'http://'+ipUrl+'/wbi/ELEC/getAreaElec',//电量进度条和柱图
						        type: 'post',
						        async:true,
						        data:{'groupid':areaId[key]},
						        dataType: 'json',//here
						        success:function (data) {
						        	yearElec=data.data.areasyearElec;
						        	monthElec=data.data.areaMonthsElec;
						        	dayElec=data.data.dayelec;
						        	yearPlanElec=data.data.areasyearPlanElec;
						        	monthPlanElec=data.data.areasMonthsPlanElec;
						        	dayPlanElec=data.data.dayPlanElec;
						        	month=[],elecPlan=[],elecAct=[];
						        	for(var i in data.data.twAreaMonthElec){
						        		elecAct.push((data.data.twAreaMonthElec[i].poweract).toFixed(1)/1);
						        		month.push(data.data.twAreaMonthElec[i].month+"月");
						        	}
						        	for(var i in data.data.twAreaMonthPlanElec){
						        		elecPlan.push((data.data.twAreaMonthPlanElec[i]).toFixed(1)/1);
						        	}
						        	dispatch(actions.setVars('yearElec',yearElec ));
						        	dispatch(actions.setVars('monthElec',monthElec ));
						        	dispatch(actions.setVars('dayElec',dayElec ));
						        	dispatch(actions.setVars('yearPlanElec',yearPlanElec ));
						        	dispatch(actions.setVars('monthPlanElec',monthPlanElec ));
						        	dispatch(actions.setVars('dayPlanElec',dayPlanElec ));
						        	dispatch(actions.setVars('elecAct',elecAct ));
						        	dispatch(actions.setVars('month',month ));
						        	dispatch(actions.setVars('elecPlan',elecPlan));
						        },
						        complete : function(XMLHttpRequest,status){ 
							　　　　	$.ajax({
						        		url: 'http://'+ipUrl+'/wbi/PBA/getAreaPBA',//PBA饼图和风场列表
								        type: 'post',
								        async:true,
								        data:{'groupid':areaId[key],'type':1},
								        dataType: 'json',//here
								        success:function (data) {
								        	elecActPBA=data.data.scale[0].poweract;
								        	elecPlanPBA=data.data.scale[0].powertheory;
								        	areaArr=data.data.everyAreaPba;
								        	dispatch(actions.setVars('elecActPBA',elecActPBA ));
								        	dispatch(actions.setVars('elecPlanPBA',elecPlanPBA ));
								        	dispatch(actions.setVars('areaArr',areaArr));
								        },
								        complete : function(XMLHttpRequest,status){ 
									　　　　	$.ajax({
								        		url: 'http://'+ipUrl+'/wbi/TBA/getGLastMonthTBA',//TBA饼图
										        type: 'post',
										        async:true,
										        data:{'groupid':areaId[key]},
										        dataType: 'json',//here
										        success:function (data) {
										        	runTime=data.data[0].runtimes;
										        	downTime=data.data[0].downtimes;
										        	TBA=data.data[0].tba;
										        	dispatch(actions.setVars('runTime',runTime ));
										        	dispatch(actions.setVars('downTime',downTime ));
										        	dispatch(actions.setVars('TBA',TBA));
										        },
										        complete : function(XMLHttpRequest,status){ 
											　　　　
											　　},
										    });
									　　},
								    });
							　　 },
						    });
						},
					});
			　　 },
		    });
		    dispatch(actions.setVars('clickAreaId', clickAreaId));
		    dispatch(actions.setVars('actb',key ));
        },
        changepageHealthyT:()=>{
        	dispatch(actions.setVars('showPage', 'healthyregins'));
        },
        changepageHealthyS:()=>{
        	dispatch(actions.setVars('showPage', 'healthyregin'));
        },
        changepageTBAT:()=>{
        	dispatch(actions.setVars('showPage', 'regiotbas'));
        },
        changepageTBAS:()=>{
        	dispatch(actions.setVars('showPage', 'healthyregpbas'));
        },
        changepagePBAT:()=>{
        	dispatch(actions.setVars('showPage', 'regiotba'));
        },
        changepagePBAS:()=>{
        	dispatch(actions.setVars('showPage', 'healthyregpba'));
        },
        changepageEleT:()=>{
        	dispatch(actions.setVars('showPage', 'regiopowers'));
        },
        changepageEleS:()=>{
        	dispatch(actions.setVars('showPage', 'regiopower'));
        },
        changepageProT:()=>{
        	dispatch(actions.setVars('showPage', 'pro_time'));
        },
        changepageProS:()=>{
        	dispatch(actions.setVars('showPage', 'prospace'));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);