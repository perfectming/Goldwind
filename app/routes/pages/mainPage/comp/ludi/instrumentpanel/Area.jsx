import React from 'react';
import {connect} from 'react-redux';
import styles from './Areastyle.scss';
import Yearelectric from './Yearelectric.jsx';
import Pie2 from '../../mxx/Pie2';

var actions = require('redux/actions');
let ipUrl='10.68.100.32:8080';

let clickAreaId,areaName=[],areaId=[],areaCost=[],areaProfit=[],areaMonth=[],runTime,downTime,TBA,areaArr;
let actb=0,elecPlanPBA,elecActPBA,yearPlanElec,monthPlanElec,dayPlanElec,yearElec,monthElec,dayElec,month=[],elecPlan=[],elecAct=[];


let Component = React.createClass({
	componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        let{actb,flag=true,flagPba=true,flagTime=true,changepageProT,changepageProS,changepageSort1,changepageSort,changepage,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
            
		return (
           <div className={styles.box}>
           		<ul className={styles.monthbox}>
                    {
                    	areaName.map((value,key)=>{
                    		return(<li key={key} className={actb===key? styles.bg1 : styles.bg} onClick={()=>changepage(value,key,areaId,areaMonth,areaProfit,areaCost,clickAreaId)}>{value}</li>)
                    	})
                    }
                </ul>
           		
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>当前60分<br/><br/>总分100分</span><br/><br/>
           					</div>
           					<div className={styles.sectiontwo}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{((61/100)*100).toFixed(1)}%</p>健康度</span>
           						<Pie2 color={(.6)>1? ['#1fe005','#fbd500']:(.6)>0.8?['#fbd500','#39565e']:(.61)>0.6?['#ff3333','#39565e']:['#d06960','#39565e']} num={[6,4]}></Pie2>
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
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{elecPlanPBA==0? 0:(elecActPBA/elecPlanPBA).toFixed(1)*100}%</p>PBA</span>
           						<Pie2 color={elecActPBA/elecPlanPBA>1? ['#1fe005','#fbd500']:elecActPBA/elecPlanPBA>0.8?['#fbd500','#39565e']:elecActPBA/elecPlanPBA>0.6?['#ff3333','#39565e']:['#d06960','#39565e']} num={[elecActPBA,elecPlanPBA-elecActPBA]}></Pie2>
           						</div>
           						<a className={styles.space} onClick={()=>changepagePBAS()}></a><br/>
           						<a className={styles.time} onClick={()=>changepagePBAT()}></a>
           					</div>
           				</div>
           				<div className={`${styles.sectionSmall} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>可用<br/>{downTime}h <br/>统计<br/>{runTime}h</span><br/><br/>
           					</div>
           					<div className={styles.sectionfour}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{(TBA*100)}%</p>TBA</span>
           						<Pie2 color={TBA>1? ['#1fe005','#fbd500']:TBA>0.8?['#fbd500','#39565e']:TBA>0.6?['#ff3333','#39565e']:['#d06960','#39565e']} num={[runTime,downTime]}></Pie2>
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
           							<div className={yearElec/yearPlanElec>1? styles.green:yearElec/yearPlanElec>.8? styles.yellow:yearElec/yearPlanElec>.6? styles.red:styles.redS} style={{width:((yearElec/yearPlanElec*100).toFixed(1))+"%"}}>{(yearElec/yearPlanElec*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricSecond}>
           						<a></a><span>月累计发电能量</span>
           						<div className={styles.electricTotal}>{(monthElec/10000).toFixed(1)}万kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={monthElec/monthPlanElec>1? styles.green:monthElec/monthPlanElec>.8? styles.yellow:monthElec/monthPlanElec>.6? styles.red:styles.redS} style={{width:((monthElec/monthPlanElec*100).toFixed(1))+"%"}}>{(monthElec/monthPlanElec*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricThird}>
           						<a></a><span>日累计发电量</span>
           						<div className={styles.electricTotal}>{(dayElec/10000).toFixed(1)}万kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={dayElec/dayPlanElec>1? styles.green:dayElec/dayPlanElec>.8? styles.yellow:dayElec/dayPlanElec>.6? styles.red:styles.redS} style={{width:((dayElec/dayPlanElec*100).toFixed(1))+"%"}}>{(dayElec/dayPlanElec*100).toFixed(1)}%</div>
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
           						<Yearelectric month={month} plan={elecPlan} actrul={elecAct} unit={'万kWh'} nameOne={'计划电量'} nameTwo={'实际电量'}></Yearelectric>
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
           						<Yearelectric month={areaMonth} plan={areaProfit} actrul={areaCost} unit={'万元'} nameOne={'收入'} nameTwo={'成本'}></Yearelectric>
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
		                    		return(<tr key={key}><th>{key+1}</th><th>{value.wfname}</th><th>{(value.everyAreaPba*100).toFixed(1)}%</th><th>{value.downtime}小时</th></tr>)
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
    	actb : state.vars.actb,
    	
    	flag : state.vars.flag,
    	flagPba : state.vars.flagPba,
    	flagTime : state.vars.flagTime,
    	areaArr : state.vars.areaArr,
    	clickAreaId:state.vars.clickAreaId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	ajax: () => {
    		dispatch(actions.setVars('actb',0 ));
    		$.ajax({
        		url:'http://'+ipUrl+'/wbi/BaseData/getGroup',//获得各区域ID和名字-YES
		        type: 'post',
		        async:false,
		        dataType: 'json',
		        data:'type=0',
		        timeout : 60000, 
		        success:function (data) {
		        	areaName=[];
		        	areaId=[];
		        	for(var i in data.data){
		        		areaName.push(data.data[i]);
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
        		url: 'http://'+ipUrl+'/wbi/yield/getGroupAllRate',//初始年收益表-YES
		        type: 'post',
		        async:false,
		        data:{'groupid':areaId[0]},
		        dataType: 'json',//here
		        success:function (data) {
		        	areaMonth=[],areaProfit=[],areaCost=[];
		        	for(var i in data.data){
		        		areaMonth.push(data.data[i].month+"月");
		        		areaProfit.push(data.data[i].incomes);
		        		areaCost.push(data.data[i].costs);
		        	}
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		   });
		    
		    $.ajax({
        		url: 'http://'+ipUrl+'/wbi/ELEC/getAreaElec',//初始电量--YES
		        type: 'post',
		        async:false,
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
		        		elecAct.push(data.data.twAreaMonthElec[i].poweract/10000);
		        	}
		        	for(var i in data.data.twAreaMonthPlanElec){
		        		elecPlan.push(data.data.twAreaMonthPlanElec[i]/10000);
		        		month.push(i+"月");
		        	}
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		   });
		    
		    $.ajax({
        		url: 'http://'+ipUrl+'/wbi/PBA/getAreaPBA',//PBA
		        type: 'post',
		        async:false,
		        data:{'groupid':areaId[0],'type':1},
		        dataType: 'json',//here
		        success:function (data) {
		        	elecActPBA=data.data.scale[0].poweract;
		        	elecPlanPBA=data.data.scale[0].powertheory;
		        	areaArr=data.data.everyAreaPba;
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		   });
		    
		    $.ajax({
        		url: 'http://'+ipUrl+'/wbi/TBA/getGLastMonthTBA',//TBA-YES
		        type: 'post',
		        async:false,
		        data:{'groupid':areaId[0]},
		        dataType: 'json',//here
		        success:function (data) {
		        	runTime=data.data[0].runtimes;
		        	downTime=data.data[0].downtimes;
		        	TBA=data.data[0].tba;
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
        changepage :(value,key,areaId,areaMonth,areaProfit,areaCost,clickAreaId)=>{
        	$.ajax({
        		url: 'http://'+ipUrl+'/wbi/yield/getGroupAllRate',
		        type: 'post',
		        async:false,
		        data:{'groupid':areaId[key]},
		        dataType: 'json',//here
		        success:function (data) {
		        	clickAreaId=areaId[key];
		        	areaMonth=[],areaProfit=[],areaCost=[];
		        	for(var i in data.data){
		        		areaMonth.push(data.data[i].month+"月");
		        		areaProfit.push(data.data[i].incomes);
		        		areaCost.push(data.data[i].costs);
		        	}
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		    });
		    dispatch(actions.setVars('clickAreaId', clickAreaId));
		    
		    $.ajax({
        		url: 'http://'+ipUrl+'/wbi/ELEC/getAreaElec',//查询ID电量--YES
		        type: 'post',
		        async:false,
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
		        		elecAct.push(data.data.twAreaMonthElec[i].poweract/10000);
		        		month.push(data.data.twAreaMonthElec[i].month+"月");
		        	}
		        	for(var i in data.data.twAreaMonthPlanElec){
		        		elecPlan.push(data.data.twAreaMonthPlanElec[i]/10000);
		        	}
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		    });
		    
		    $.ajax({
        		url: 'http://'+ipUrl+'/wbi/PBA/getAreaPBA',//查询ID-PBA
		        type: 'post',
		        async:false,
		        data:{'groupid':areaId[key],'type':1},
		        dataType: 'json',//here
		        success:function (data) {
		        	elecActPBA=data.data.scale[0].poweract;
		        	elecPlanPBA=data.data.scale[0].powertheory;
		        	areaArr=data.data.everyAreaPba;
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		    });
		    
//		    $.ajax({
//      		url: 'http://'+ipUrl+'/wbi/TBA/getGLastMonthTBA',//TBA-YES
//		        type: 'post',
//		        async:false,
//		        data:{'groupid':areaId[key]},
//		        dataType: 'json',//here
//		        success:function (data) {
//		        	runTime=data.data[0].runtimes;
//		        	downTime=data.data[0].downtimes;
//		        	TBA=data.data[0].tba;
//		        },
//		        complete : function(XMLHttpRequest,status){ 
//			　　　　if(status=='timeout'){
//			　　　　　 alert('超时');
//			　　　　}
//			　　},
//		    });
        	
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
        	
        },
        changepageProS:()=>{
        	
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);