import React from 'react';
import {connect} from 'react-redux';
import styles from './Windstyle.scss';
import Yearelectric from './Yearelectric.jsx';
import Pie2 from '../../mxx/Pie2';

var actions = require('redux/actions');

let ipUrl='10.68.100.32:8080';
let actbt=0,wfName=[],wfId=[],areaId=[],wfTheory,wfAct,wtArr=[],wfYearPlan,wfYearAct,wfMonthPlan,wfMonthAct,wfDayPlan,wfDayAct; 
let month=[],monthAct=[],monthPlan=[],month2,income,cost;

let Component = React.createClass({
	componentWillMount() {
		let {clickAreaId}=this.props;
        this.props.ajax(clickAreaId);
    },
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        let{actbt,flagTime2=true,flagPba2=true,flag2=true,changepageSort1,changepageProT,changepageProS,changepageSort,changepageW,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        return (
           <div className={styles.box}>
           		<ul className={styles.monthbox}>
                    {
                    	wfName.map((value,key)=>{
                    		return(<li key={key} className={actbt===key? styles.bg1 : styles.bg} onClick={()=>changepageW(value,key)}>{value}</li>)
                    	})
                    }
                </ul>
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>当前<br/>65分<br/>总分<br/>100分</span>
           					</div>
           					<div className={styles.sectiontwo}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{65}%</p>健康度</span>
           						<Pie2 color={(.7)>1? ['#1fe005','#fbd500']:(.7)>0.8?['#fbd500','#39565e']:(.7)>0.6?['#ff3333','#39565e']:['#d06960','#39565e']} num={[65,35]}></Pie2>
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
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{wfTheory==0? 0:wfAct/wfTheory}%</p>PBA</span>
           						<Pie2 color={wfAct/wfTheory>1? ['#1fe005','#fbd500']:wfAct/wfTheory>0.8?['#fbd500','#39565e']:wfAct/wfTheory>0.6?['#ff3333','#39565e']:['#d06960','#39565e']} num={[wfAct,wfTheory-wfAct]}></Pie2>
           						</div>
           						<a className={styles.space} onClick={()=>changepagePBAS()}></a><br/>
           						<a className={styles.time} onClick={()=>changepagePBAT()}></a>
           					</div>
           				</div>
           				<div className={`${styles.sectionSmall} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>可用<br/>100h <br/>统计<br/>200h</span>
           					</div>
           					<div className={styles.sectionfour}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{50}%</p>TBA</span>
           						<Pie2 color={['#d06960','#39565e']} num={[15,15]}></Pie2>
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
           						<div className={styles.electricTotal}>{(wfYearAct/10000).toFixed(1)}万kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={wfYearAct/wfYearPlan>1? styles.green:wfYearAct/wfYearPlan>.8? styles.yellow:wfYearAct/wfYearPlan>.6? styles.red:styles.redS} style={{width:((wfYearAct/wfYearPlan*100).toFixed(1))+"%"}}>{(wfYearAct/wfYearPlan*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricSecond}>
           						<a></a><span>月累计发电量</span>
           						<div className={styles.electricTotal}>{(wfMonthAct/10000).toFixed(1)}万kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={wfMonthAct/wfMonthPlan>1? styles.green:wfMonthAct/wfMonthPlan>.8? styles.yellow:wfMonthAct/wfMonthPlan>.6? styles.red:styles.redS} style={{width:((wfMonthAct/wfMonthPlan*100).toFixed(1))+"%"}}>{(wfMonthAct/wfMonthPlan*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricThird}>
           						<a></a><span>日累计发电量</span>
           						<div className={styles.electricTotal}>{(wfDayAct/10000).toFixed(1)}万kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={wfDayAct/wfDayPlan>1? styles.green:wfDayAct/wfDayPlan>.8? styles.yellow:wfDayAct/wfDayPlan>.6? styles.red:styles.redS} style={{width:((wfDayAct/wfDayPlan*100).toFixed(1))+"%"}}>{(wfDayAct/wfDayPlan*100).toFixed(1)}%</div>
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
           						<Yearelectric month={month} plan={monthPlan} actrul={monthAct} unit={'万kWh'} nameOne={'计划电量'} nameTwo={'实际电量'}></Yearelectric>
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
           						<Yearelectric month={month2} plan={income} actrul={cost} unit={'万元'} nameOne={'收入'} nameTwo={'成本'}></Yearelectric>
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
	           					<th onClick={()=>changepageSort1(flag2,flagPba2,wtArr)} className={flag2==true? styles.clickPba1:styles.clickPba4} >PBA <span className={flagPba2==true? styles.arrow:styles.bottom}></span></th>
	           					<th onClick={()=>changepageSort(flag2,flagTime2,wtArr)} className={flag2==true? styles.clickTime1:styles.clickTime4}>停机时间 <span className={flagTime2==true? styles.arrow:styles.bottom}></span></th>
                			</tr>
                			{
                				wtArr.map((value,key)=>{
		                    		return(<tr key={key}><th>{key+1}</th><th>{value.wtname}</th><th>{(value.everyAreaPba*100).toFixed(1)}%</th><th>{0}小时</th></tr>)
		                    	})
                			}
                		</tbody>	
                	</table>
                </div>
           </div>
        );
    }
});



const mapStateToProps = (state) => {
    return {
    	actbt : state.vars.actbt,
    	wtArr : state.vars.wtArr,
    	flag2 : state.vars.flag2,
    	flagPba2 : state.vars.flagPba2,
    	flagTime2 : state.vars.flagTime2,
    	clickAreaId:state.vars.clickAreaId,
    	AreaId:state.vars.AreaId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	ajax: (clickAreaId) => {
    		dispatch(actions.setVars('actbt',0 ));
    		if(clickAreaId==undefined){
    			$.ajax({
	        		url:'http://'+ipUrl+'/wbi/BaseData/getGroup',//默认获取1区域ID-YES
			        type: 'post',
			        async:false,
			        dataType: 'json',
			        data:'type=0',
			        timeout : 60000, 
			        success:function (data) {
			        	areaId=[];
			        	for(var i in data.data){
			        		areaId.push(i);
			        	}
			        },
			        complete : function(XMLHttpRequest,status){ 
					　　　if(status=='timeout'){
					　　　　　 console.log('超时');
					　　　}
					},
				});
	    		$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/PBA/getCompanyAreaPBA',//默认1区域风场名和ID
			        type: 'post',
			        async:false,
			        data:{'groupid':areaId[0]},
			        dataType: 'json',//here
			        success:function (data) {
			        	wfName=[],wfId=[];
			        	for(var i in data.data.everyAreaPba){
			        		wfName.push(data.data.everyAreaPba[i].wfname);
			        		wfId.push(data.data.everyAreaPba[i].wfid);
			        	}
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
				　　},
			    });
			    
    		}else{
    			$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/PBA/getCompanyAreaPBA',//点击区域获取风场名和ID
			        type: 'post',
			        async:false,
			        data:{'groupid':clickAreaId},
			        dataType: 'json',//here
			        success:function (data) {
			        	wfName=[],wfId=[];
			        	for(var i in data.data.everyAreaPba){
			        		wfName.push(data.data.everyAreaPba[i].wfname);
			        		wfId.push(data.data.everyAreaPba[i].wfid);
			        	}
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
				　　},
			    });
    		}
    		$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/PBA/getCompanyWfPBA',//根据风场ID获取PBA和风机
			        type: 'post',
			        async:false,
			        data:{'wfid':wfId[0]},
			        dataType: 'json',//here
			        success:function (data) {
			        	wtArr=data.data.everyAreaPba;
			        	wfAct=data.data.scale[0].poweract;
			        	wfTheory=data.data.scale[0].powertheory;
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
				　　},
			});
			$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/ELEC/getWfieldElec',//根据风场ID获取发电量
			        type: 'post',
			        async:false,
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
			        	for(var i in data.data.wfieldsMonthsElec){
							month.push(data.data.wfieldsMonthsElec[i].month+"月");
							monthAct.push(data.data.wfieldsMonthsElec[i].poweract/10000);
						};
						for(var i in data.data.wfieldsMonthsPlanElec){
							monthPlan.push(data.data.wfieldsMonthsPlanElec[i]/10000);
						}
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
				　　},
			});
			
			$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/yield/getWfAllRate',//根据风场ID获取发电量
			        type: 'post',
			        async:false,
			        data:{'wfid':wfId[0]},
			        dataType: 'json',//here
			        success:function (data) {
			        	month2=[],cost=[],income=[];
			        	for(var i in data.data){
			        		month2.push(data.data[i].month+"月");
			        		cost.push(data.data[i].costs/10000);
			        		income.push(data.data[i].incomes/10000);
			        	}
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
				　　},
			});
    	},
        init: () => {
            var obj = {
                test:''
            }
        },
        changepageSort:(flag2,flagTime2,wtArr)=>{
//      	flagTime2==false? dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return a.downtime-b.downtime}))):dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return b.downtime-a.downtime})));
        	dispatch(actions.setVars('flag2',false ));
        	dispatch(actions.setVars('flagTime2',!flagTime2 ));
        	
        },
        changepageSort1:(flag2,flagPba2,wtArr)=>{
//      	flagPba2==true? dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return a.everyAreaPba-b.everyAreaPba}))):dispatch(actions.setVars('wtArr', wtArr.sort(function(a,b){return b.everyAreaPba-a.everyAreaPba})));
        	dispatch(actions.setVars('flag2',true ));
        	dispatch(actions.setVars('flagPba2',!flagPba2 ));
        },
        changepageW :(value,key)=>{
            dispatch(actions.setVars('actbt',key ));

            dispatch(actions.setVars('wind',value.plan ));
           

            $.ajax({
	        		url: 'http://'+ipUrl+'/wbi/PBA/getCompanyWfPBA',//根据风场ID获取PBA和风机
			        type: 'post',
			        async:false,
			        data:{'wfid':wfId[key]},
			        dataType: 'json',//here
			        success:function (data) {
			        	wtArr=data.data.everyAreaPba;
			        	wfAct=data.data.scale[0].poweract;
			        	wfTheory=data.data.scale[0].powertheory;
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
				　　},
			});

			$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/ELEC/getWfieldElec',//根据风场ID获取发电量
			        type: 'post',
			        async:false,
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
			        	for(var i in data.data.wfieldsMonthsElec){
							month.push(data.data.wfieldsMonthsElec[i].month+"月");
							monthAct.push(data.data.wfieldsMonthsElec[i].poweract/10000);
						};
						for(var i in data.data.wfieldsMonthsPlanElec){
							monthPlan.push(data.data.wfieldsMonthsPlanElec[i]/10000);
						}
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
				　　},
			});
			
			$.ajax({
	        		url: 'http://'+ipUrl+'/wbi/yield/getWfAllRate',//根据风场ID获取收益
			        type: 'post',
			        async:false,
			        data:{'wfid':wfId[key]},
			        dataType: 'json',//here
			        success:function (data) {
			        	month2=[],cost=[],income=[];
			        	for(var i in data.data){
			        		month2.push(data.data[i].month+"月");
			        		cost.push(data.data[i].costs/10000);
			        		income.push(data.data[i].incomes/10000);
			        	}
			        },
			        complete : function(XMLHttpRequest,status){ 
				　　　　if(status=='timeout'){
				　　　　　 alert('超时');
				　　　　}
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
        	
        },
        changepageProT:()=>{
        	
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);