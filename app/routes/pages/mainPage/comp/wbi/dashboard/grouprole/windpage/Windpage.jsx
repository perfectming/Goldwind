import React from 'react';
import {connect} from 'react-redux';
import styles from './Windstyle.scss';
import Yearelectric from '../Yearelectric.jsx';//柱状图组件
import Pie2 from '../PieTwo';//饼图组件
import Login from '../../../../../../../../components/common/Loading.jsx';//加载跳转页面
var $ =require("jQuery");
var actions = require('redux/actions');

let healthy,actbt=0,wfName=[],wfId=[],areaId=[],wfTheory,wfAct,wtArr=[],wfYearPlan,wfYearAct,wfMonthPlan,wfMonthAct,wfDayPlan,wfDayAct; 
let month=[],monthAct=[],monthPlan=[],month2,income,cost,runTime,downTime,TBA;

let Component = React.createClass({
	componentWillMount() {//加载初始数据
		let {clickAreaId,ipUrl,wbiUserId}=this.props;
        this.props.ajax(clickAreaId,ipUrl,wbiUserId);
    },
    componentDidMount() {
        this.props.init();
        let {display}=this.props;
        setTimeout(function(){
            display();
        },3000)
    },
   

    render() {
        let {display,skinStyle,healthy,wfName,wfId,areaId,wfTheory,wfAct,wtArr,wfYearPlan,wfYearAct,wfMonthPlan,wfMonthAct,wfDayPlan,wfDayAct,month,monthAct,monthPlan,month2,income,cost,runTime,downTime,TBA,ipUrl,windBool=false,actbt,flagTime2=true,flagPba2=true,flag2=true,changepageSort1,changepageProT,changepageProS,changepageSort,changepageW,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        if(windBool){
        	return (
	            <div className={skinStyle==1? styles.boxBlue:skinStyle==2? styles.boxWhite:styles.box}>
	           		<ul className={styles.monthbox}>
	                    {
	                    	wfName.map((value,key)=>{
	                    		return(<li key={key} className={actbt===key? styles.bg1 : styles.bg} onClick={()=>changepageW(value,key,ipUrl)}>{value}</li>)
	                    	})
	                    }
	                </ul>
	           		<div className={styles.left}>
	           			<div className={styles.firstfloor}>
	           				<div className={`${styles.section} ${styles.boxShadow}`}>
	           					<div className={styles.sectionbar}>
	           						<span>当前<br/>{healthy.toFixed(1)}分<br/>总分<br/>100分</span>
	           					</div>
	           					<div className={styles.sectiontwo}>
	           						<div className={styles.pie}>
	           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{healthy.toFixed(1)}%</p>健康度</span>
	           						<Pie2 color={skinStyle==2? ((healthy/100)>0.9? ['#62de88','#c0e2ea']:(healthy/100)>0.8?['#e8952a','#c0e2ea']:(healthy/100)>0.6?['#a32124','#c0e2ea']:['#d8403d','#c0e2ea']):((healthy/100)>0.9? ['#62de88','#39565e']:(healthy/100)>0.8?['#e8952a','#39565e']:(healthy/100)>0.6?['#a32124','#39565e']:['#d8403d','#39565e'])} num={[healthy,100-healthy]}></Pie2>
	           						</div>
	           						<a className={styles.space} onClick={()=>changepageHealthyS()}></a><br/>
	           						<a className={styles.time} onClick={()=>changepageHealthyT()}></a>
	           					</div>
	           				</div>
	           				<div className={`${styles.section} ${styles.boxShadow}`}>
	           					<div className={styles.sectionbar}>
	           						<span>实发<br/>{(wfAct/10000).toFixed(1)}万kWh<br/>应发<br/>{(wfTheory/10000).toFixed(1)}万kWh</span><br/>
	           					</div>
	           					<div className={styles.sectionthree}>
	           						<div className={styles.pie}>
	           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{wfAct!==0&&wfTheory==0? (wfAct/wfTheory):(wfAct/wfTheory*100).toFixed(1)+'%'}</p>PBA</span>
	           						<Pie2 color={skinStyle==2? ((wfAct/wfTheory)>0.9? ['#62de88','#c0e2ea']:(wfAct/wfTheory)>0.8?['#e8952a','#c0e2ea']:(wfAct/wfTheory)>0.6?['#a32124','#c0e2ea']:['#d8403d','#c0e2ea']):((wfAct/wfTheory)>0.9? ['#62de88','#39565e']:(wfAct/wfTheory)>0.8?['#e8952a','#39565e']:(wfAct/wfTheory)>0.6?['#a32124','#39565e']:['#d8403d','#39565e'])} num={[wfAct,wfTheory-wfAct]}></Pie2>
	           						</div>
	           						<a className={styles.space} onClick={()=>changepagePBAS()}></a><br/>
	           						<a className={styles.time} onClick={()=>changepagePBAT()}></a>
	           					</div>
	           				</div>
	           				<div className={`${styles.sectionSmall} ${styles.boxShadow}`}>
	           					<div className={styles.sectionbar}>
	           						<span>停机时间<br/>{downTime.toFixed(1)}h <br/>运行时间<br/>{runTime.toFixed(1)}h</span>
	           					</div>
	           					<div className={styles.sectionfour}>
	           						<div className={styles.pie}>
	           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{(TBA*100).toFixed(1)}%</p>TBA</span>
	           						<Pie2 color={skinStyle==2? (TBA>0.9? ['#62de88','#c0e2ea']:TBA>0.8?['#e8952a','#c0e2ea']:TBA>0.6?['#a32124','#c0e2ea']:['#d8403d','#c0e2ea']):(TBA>0.9? ['#62de88','#39565e']:TBA>0.8?['#e8952a','#39565e']:TBA>0.6?['#a32124','#39565e']:['#d8403d','#39565e'])} num={runTime==0&&downTime==0? [0,1]:[runTime,downTime]}></Pie2>
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
	           						<div className={styles.electricTotal}  style={(wfYearAct/wfYearPlan)>.9? {color:'#62de88'}:(wfYearAct/wfYearPlan)>.8? {color:'#e8952a'}:(wfYearAct/wfYearPlan)>.6? {color:'#a32124'}:{color:'#d8403d'}}>{(wfYearAct/10000).toFixed(1)}万kWh</div>
	           						<div className={styles.hoverBox} id="hoverBoxY">
                                        <span>累计发电量<br/>{(wfYearAct/10000).toFixed(1)}万kWh</span><br/>
                                        <span>计划发电量<br/>{(wfYearPlan/10000).toFixed(1)}万kWh</span>
                                    </div>
	           						<div className={styles.electricPercent} id="BoxY">
	           							<div className={wfYearAct/wfYearPlan>0.9? styles.green:wfYearAct/wfYearPlan>.8? styles.yellow:wfYearAct/wfYearPlan>.6? styles.red:styles.redS} style={{width:((wfYearAct/wfYearPlan*100).toFixed(1))+"%"}}>{(wfYearAct/wfYearPlan*100).toFixed(1)}%</div>
	           						</div>
	           					</div>
	           					<div className={styles.electricSecond}>
	           						<a></a><span>月累计发电量</span>
	           						<div className={styles.electricTotal}  style={(wfMonthAct/wfMonthPlan)>.9? {color:'#62de88'}:(wfMonthAct/wfMonthPlan)>.8? {color:'#e8952a'}:(wfMonthAct/wfMonthPlan)>.6? {color:'#a32124'}:{color:'#d8403d'}}>{(wfMonthAct/10000).toFixed(1)}万kWh</div>
	           						<div className={styles.hoverBox} id="hoverBoxM">
                                        <span>累计发电量<br/>{(wfMonthAct/10000).toFixed(1)}万kWh</span><br/>
                                        <span>计划发电量<br/>{(wfMonthPlan/10000).toFixed(1)}万kWh</span>
                                    </div>
	           						<div className={styles.electricPercent} id="BoxM">
	           							<div className={wfMonthAct/wfMonthPlan>0.9? styles.green:wfMonthAct/wfMonthPlan>.8? styles.yellow:wfMonthAct/wfMonthPlan>.6? styles.red:styles.redS} style={{width:((wfMonthAct/wfMonthPlan*100).toFixed(1))+"%"}}>{(wfMonthAct/wfMonthPlan*100).toFixed(1)}%</div>
	           						</div> 
	           					</div>
	           					<div className={styles.electricThird}>
	           						<a></a><span>日累计发电量</span>
	           						<div className={styles.electricTotal} style={(wfDayAct/wfDayPlan)>.9? {color:'#62de88'}:(wfDayAct/wfDayPlan)>.8? {color:'#e8952a'}:(wfDayAct/wfDayPlan)>.6? {color:'#a32124'}:{color:'#d8403d'}}>{(wfDayAct/10000).toFixed(1)}万kWh</div>
	           						<div className={styles.hoverBox} id="hoverBoxD">
                                        <span>累计发电量<br/>{(wfDayAct/10000).toFixed(1)}万kWh</span><br/>
                                        <span>计划发电量<br/>{(wfDayPlan/10000).toFixed(1)}万kWh</span>
                                    </div>
	           						<div className={styles.electricPercent} id="BoxD">
	           							<div className={wfDayAct/wfDayPlan>0.9? styles.green:wfDayAct/wfDayPlan>.8? styles.yellow:wfDayAct/wfDayPlan>.6? styles.red:styles.redS} style={{width:((wfDayAct/wfDayPlan*100).toFixed(1))+"%"}}>{(wfDayAct/wfDayPlan*100).toFixed(1)}%</div>
	           						</div>
	           					</div>
	           				</div>
	           				<div className={`${styles.yearelectric} ${styles.boxShadow}`}>
	           					<div>
	           						<div className={styles.header}>
	           							<div className={styles.logo}><a></a><span>年发电量</span></div>
	           							<div className={styles.space} onClick={()=>changepageEleS()}></div>
	           							<div className={styles.time} onClick={()=>changepageEleT()}></div>
	           						</div>
	           						<Yearelectric color={skinStyle==2? '#333':'#fff'} month={month} plan={monthPlan} actrul={monthAct} unit={'(kWh)'} nameOne={'计划电量'} nameTwo={'实际电量'}></Yearelectric>
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
	           						<Yearelectric color={skinStyle==2? '#333':'#fff'} month={month2} plan={income} actrul={cost} unit={'(元)'} nameOne={'收入'} nameTwo={'成本'}></Yearelectric>
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
		           					<th>风机名</th>
		           					<th onClick={()=>changepageSort1(flag2,flagPba2,wtArr)} className={flag2==true? styles.clickPba1:styles.clickPba4}>PBA <span className={flagPba2==true? styles.arrow:styles.bottom}></span></th>
		           					<th onClick={()=>changepageSort(flag2,flagTime2,wtArr)} className={flag2==true? styles.clickTime1:styles.clickTime4}>停机时间 <span className={flagTime2==true? styles.arrow:styles.bottom}></span></th>
	                			</tr>
	                			{
	                				wtArr.slice(0,15).map((value,key)=>{
			                    		return(<tr key={key}><th>{key+1}</th><th>{value.wtname}</th><th>{(value.everyAreaPba*100).toFixed(1)}%</th><th>{(value.downtime/60).toFixed(1)}h</th></tr>)
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
    	skinStyle: state.vars.skinStyle, //全局换肤
    	wbiUserId:state.vars.wbiUserId,//用户id
    	actbt : state.vars.actbt,
    	wtArr : state.vars.wtArr,
    	flag2 : state.vars.flag2,
    	flagPba2 : state.vars.flagPba2,
    	flagTime2 : state.vars.flagTime2,
    	clickAreaId : state.vars.clickAreaId,
    	AreaId : state.vars.AreaId,
    	windBool : state.vars.windBool,
    	ipUrl : state.vars.ipUrl,
    	
    	wfName : state.vars.wfName,
    	wfId : state.vars.wfId,
    	wfAct : state.vars.wfAct,
    	wfTheory : state.vars.wfTheory,
    	wfYearPlan : state.vars.wfYearPlan,
    	wfYearAct : state.vars.wfYearAct,
    	wfMonthPlan : state.vars.wfMonthPlan,
    	wfMonthAct : state.vars.wfMonthAct,
    	wfDayPlan : state.vars.wfDayPlan,
    	wfDayAct : state.vars.wfDayAct,
    	month : state.vars.month,
    	monthAct : state.vars.monthAct,
    	monthPlan : state.vars.monthPlan,
    	month2 : state.vars.month2,
    	cost : state.vars.cost,
    	income : state.vars.income,
    	healthy : state.vars.healthy,
    	runTime : state.vars.runTime,
    	downTime : state.vars.downTime,
    	TBA : state.vars.TBA,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	ajax: (clickAreaId,ipUrl,wbiUserId) => {
    		dispatch(actions.setVars('actbt',0 ));
    		dispatch(actions.setVars('windBool', false));
    		$.ajax({
	        		url:'http://'+ipUrl+'/wbi/user/getByUserIDWf',//根据userid获取风场id name
			        type: 'post',
			        async:true,
			        dataType: 'json',
			        data:{'userid':wbiUserId},
			        timeout : 60000, 
			        success:function (data) {
			        	wfName=[],wfId=[];
			        	for(var i in data.data){
			        		wfName.push(data.data[i].wfname);
			        		wfId.push(data.data[i].wfid);
			        	};
			        	dispatch(actions.setVars('wfName',wfName ));
			        	dispatch(actions.setVars('wfId',wfId ));
			        	dispatch(actions.setVars('xxdwfNa1', wfName[0]));
			        	dispatch(actions.setVars('xxdwfId1', wfId[0]));
			        },
			        complete : function(XMLHttpRequest,status){ 
						$.ajax({
			        		url: 'http://'+ipUrl+'/wbi/PBA/getCompanyWfPBA',//PBA饼图和风机列表
					        type: 'post',
					        async:true,
					        data:{'wfid':wfId[0]},
					        dataType: 'json',
					        success:function (data) {
					        	wtArr=data.data.everyAreaPba;
					        	wfAct=data.data.scale[0].poweract;
					        	wfTheory=data.data.scale[0].powertheory;
					        	dispatch(actions.setVars('wtArr',wtArr ));
					        	dispatch(actions.setVars('wfAct',wfAct ));
					        	dispatch(actions.setVars('wfTheory',wfTheory ));
					        },
					        complete : function(XMLHttpRequest,status){ 
						　　　　  $.ajax({
					        		url: 'http://'+ipUrl+'/wbi/ELEC/getWfieldElec',//电量进度条和柱图
							        type: 'post',
							        async:true,
							        data:{'wfid':wfId[0]},
							        dataType: 'json',//here
							        success:function (data) {
							        	wfYearPlan=data.data.yearPlanElec;
							        	wfYearAct=data.data.yearElec;
							        	wfMonthPlan=data.data.monthPlanElec;
							        	wfMonthAct=data.data.monthElec;
							        	wfDayPlan=data.data.dayPlanElec;
							        	wfDayAct=data.data.dayelec;
							        	month=[],monthAct=[],monthPlan=[];
							        	var monthNum=[];
							        	for(var i in data.data.wfieldsMonthsElec){
											month.push(data.data.wfieldsMonthsElec[i].month+"月");
											monthNum.push(data.data.wfieldsMonthsElec[i].month);
											monthAct.push((data.data.wfieldsMonthsElec[i].poweract).toFixed(1)/1);
										};
										for(var i=0;i<monthNum.length;i++){
											monthPlan.push((data.data.wfieldsMonthsPlanElec[monthNum[i]]));
										};
										dispatch(actions.setVars('wfYearPlan',wfYearPlan ));
										dispatch(actions.setVars('wfYearAct',wfYearAct ));
										dispatch(actions.setVars('wfMonthPlan',wfMonthPlan ));
										dispatch(actions.setVars('wfMonthAct',wfMonthAct ));
										dispatch(actions.setVars('wfDayPlan',wfDayPlan ));
										dispatch(actions.setVars('wfDayAct',wfDayAct ));
										dispatch(actions.setVars('month',month ));
										dispatch(actions.setVars('monthAct',monthAct ));
										dispatch(actions.setVars('monthPlan',monthPlan ));
							        },
							        complete : function(XMLHttpRequest,status){ 
								　　　　	$.ajax({
							        		url: 'http://'+ipUrl+'/wbi/yield/getWfAllRate',//收益柱图
									        type: 'post',
									        async:true,
									        data:{'wfid':wfId[0]},
									        dataType: 'json',//here
									        success:function (data) {
									        	month2=[],cost=[],income=[];
									        	for(var i in data.data){
									        		month2.push(data.data[i].month+"月");
									        		cost.push((data.data[i].costs).toFixed(1)/1);
									        		income.push((data.data[i].incomes).toFixed(1)/1);
									        	};
									        	dispatch(actions.setVars('month2',month2 ));
									        	dispatch(actions.setVars('cost',cost ));
									        	dispatch(actions.setVars('income',income ));
									        },
									        complete : function(XMLHttpRequest,status){ 
									        		var date = new Date();
										            if(date.getMonth()==0){
										            	var yearString = date.getFullYear()-1;
										            	var monthString = 12;
										            }else{
										                var yearString = date.getFullYear();
										                var monthString = date.getMonth();										                
										            }
										　　　　	$.ajax({
									        		url: 'http://'+ipUrl+'/wbi/TBA/getWfLastMonthTBA',//TBA饼图
											        type: 'post',
											        async:true,
											        data:{'wfid':wfId[0],'year':yearString,'month':monthString},
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
												                data: {'type':2,'groupid':'','wfid':wfId[0]},
												                async:true,
												                dataType: 'json',
												                timeout : 60000,
												                success:function (data) {
												                	if(typeof(data.data.health)=="number"){
												                		healthy=data.data.health;
												                	}
																	healthy=0;
																	dispatch(actions.setVars('healthy',healthy ));
												                },
												                complete : function(XMLHttpRequest,status){
												                    dispatch(actions.setVars('windBool',true ));
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
        display:() =>{
            $('#BoxD').mouseover(function(){
                $('#hoverBoxD').css('display','block');
            });
            $('#BoxD').mouseleave(function(){
                $('#hoverBoxD').css('display','none');
            });
            $('#BoxM').mouseover(function(){
                $('#hoverBoxM').css('display','block');
            });
            $('#BoxM').mouseleave(function(){
                $('#hoverBoxM').css('display','none');
            });
            $('#BoxY').mouseover(function(){
                $('#hoverBoxY').css('display','block');
            });
            $('#BoxY').mouseleave(function(){
                $('#hoverBoxY').css('display','none');
            });
        },
        changepageSort:(flag2,flagTime2,wtArr)=>{//各风机停机时间排序
        	flagTime2==false? dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return a.downtime-b.downtime}))):dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return b.downtime-a.downtime})));
        	dispatch(actions.setVars('flag2',false ));
        	dispatch(actions.setVars('flagTime2',!flagTime2 ));
        	
        },
        changepageSort1:(flag2,flagPba2,wtArr)=>{//各风机PBA排序
        	flagPba2==true? dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return a.everyAreaPba-b.everyAreaPba}))):dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return b.everyAreaPba-a.everyAreaPba})));
        	dispatch(actions.setVars('flag2',true ));
        	dispatch(actions.setVars('flagPba2',!flagPba2 ));
        },
        changepageW :(value,key,ipUrl)=>{
        	dispatch(actions.setVars('windBool', false));
            dispatch(actions.setVars('actbt',key ));
           	$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/PBA/getCompanyWfPBA',//PBA饼图和风机列表
			        type: 'post',
			        async:true,
			        data:{'wfid':wfId[key]},
			        dataType: 'json',
			        success:function (data) {
			        	wtArr=data.data.everyAreaPba;
			        	wfAct=data.data.scale[0].poweract;
			        	wfTheory=data.data.scale[0].powertheory;
			        	dispatch(actions.setVars('wtArr',wtArr ));
			        	dispatch(actions.setVars('wfAct',wfAct ));
			        	dispatch(actions.setVars('wfTheory',wfTheory ));
			        	dispatch(actions.setVars('xxdwfNa1', wfName[key]));
			        	dispatch(actions.setVars('xxdwfId1', wfId[key]));
					},
			        complete : function(XMLHttpRequest,status){ 
				　　　　	$.ajax({
							url:'http://'+ipUrl+'/wbi/Health/getCompanyHealth',//健康度饼图
							type: 'post',
							data: {'type':2,'groupid':'','wfid':wfId[key]},
							async:true,
							dataType: 'json',
							timeout : 60000,
							success:function (data) {
								if(typeof(data.data.health)=="number"){
									healthy=data.data.health;
								}
								healthy=0;
								dispatch(actions.setVars('healthy',healthy ));
							},
							complete : function(XMLHttpRequest,status){
								$.ajax({
					        		url: 'http://'+ipUrl+'/wbi/ELEC/getWfieldElec',//发电量进度条和柱图
							        type: 'post',
							        async:true,
							        data:{'wfid':wfId[key]},
							        dataType: 'json',//here
							        success:function (data) {
							        	wfYearPlan=data.data.yearPlanElec;
							        	wfYearAct=data.data.yearElec;
							        	wfMonthPlan=data.data.monthPlanElec;
							        	wfMonthAct=data.data.monthElec;
							        	wfDayPlan=data.data.dayPlanElec;
							        	wfDayAct=data.data.dayelec;
							        	month=[],monthAct=[],monthPlan=[];
							        	var monthNum=[];
							        	for(var i in data.data.wfieldsMonthsElec){
											month.push(data.data.wfieldsMonthsElec[i].month+"月");
											monthNum.push(data.data.wfieldsMonthsElec[i].month);
											monthAct.push((data.data.wfieldsMonthsElec[i].poweract).toFixed(1)/1);
										};
										for(var i=0;i<monthNum.length;i++){
											monthPlan.push((data.data.wfieldsMonthsPlanElec[monthNum[i]]));
										};
										dispatch(actions.setVars('wfYearPlan',wfYearPlan ));
										dispatch(actions.setVars('wfYearAct',wfYearAct ));
										dispatch(actions.setVars('wfMonthPlan',wfMonthPlan ));
										dispatch(actions.setVars('wfMonthAct',wfMonthAct ));
										dispatch(actions.setVars('wfDayPlan',wfDayPlan ));
										dispatch(actions.setVars('wfDayAct',wfDayAct ));
										dispatch(actions.setVars('month',month ));
										dispatch(actions.setVars('monthAct',monthAct ));
										dispatch(actions.setVars('monthPlan',monthPlan ));
										dispatch(actions.setVars('xxdwfNa1', wfName[key]));
			        					dispatch(actions.setVars('xxdwfId1', wfId[key]));

							        },
							        complete : function(XMLHttpRequest,status){ 
								　　　　	$.ajax({
							        		url: 'http://'+ipUrl+'/wbi/yield/getWfAllRate',//收益柱图
									        type: 'post',
									        async:true,
									        data:{'wfid':wfId[key]},
									        dataType: 'json',//here
									        success:function (data) {
									        	month2=[],cost=[],income=[];
									        	for(var i in data.data){
									        		month2.push(data.data[i].month+"月");
									        		cost.push((data.data[i].costs).toFixed(1)/1);
									        		income.push((data.data[i].incomes).toFixed(1)/1);
									        	};
									        	dispatch(actions.setVars('month2',month2 ));
									        	dispatch(actions.setVars('cost',cost ));
									        	dispatch(actions.setVars('income',income ));
									        },
									        complete : function(XMLHttpRequest,status){ 
									        		var date = new Date();
										            if(date.getMonth()==0){
										            	var yearString = date.getFullYear()-1;
										            	var monthString = 12;
										            }else{
										                var yearString = date.getFullYear();
										                var monthString = date.getMonth();										                
										            }
										　　　　	$.ajax({
									        		url: 'http://'+ipUrl+'/wbi/TBA/getWfLastMonthTBA',//TBA饼图
											        type: 'post',
											        async:false,
											        data:{'wfid':wfId[key],'year':yearString,'month':monthString},
											        dataType: 'json',
											        success:function (data) {
											        	runTime=data.data[0].runtimes;
											        	downTime=data.data[0].downtimes;
											        	TBA=data.data[0].tba;
											        	dispatch(actions.setVars('runTime',runTime ));
											        	dispatch(actions.setVars('downTime',downTime ));
											        	dispatch(actions.setVars('TBA',TBA ));
											        },
											        complete : function(XMLHttpRequest,status){ 
												　　　　dispatch(actions.setVars('windBool', true));　	
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
        changepageHealthyT:()=>{
        	dispatch(actions.setVars('showPage', 'healthytime'));
        },
        changepageHealthyS:()=>{
        	dispatch(actions.setVars('showPage', 'healty'));
        },
        changepageTBAT:()=>{
        	dispatch(actions.setVars('showPage', 'tbatime'));
        },
        changepageTBAS:()=>{
        	dispatch(actions.setVars('showPage', 'tbaspace'));
        },
        changepagePBAT:()=>{
        	dispatch(actions.setVars('showPage', 'pbatime'));
        },
        changepagePBAS:()=>{
        	dispatch(actions.setVars('showPage', 'pbaspace'));
        },
        changepageEleT:()=>{
        	dispatch(actions.setVars('showPage', 'areacet'));
        },
        changepageEleS:()=>{
        	dispatch(actions.setVars('showPage', 'areace'));
        },
        changepageProS:()=>{
        	dispatch(actions.setVars('showPage', 'wfsprofit'));
        },
        changepageProT:()=>{
        	dispatch(actions.setVars('showPage', 'wftprofit'));
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);