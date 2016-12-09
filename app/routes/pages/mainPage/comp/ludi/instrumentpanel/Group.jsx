import React from 'react';
import {connect} from 'react-redux';
import styles from './Groupstyle.scss';
import Instrumentdata from './Instrument-data';
import Yearelectric from './Yearelectric.jsx';
import Pie2 from '../../mxx/Pie2';


var actions = require('redux/actions');
var $ =require("jQuery");


let data=Instrumentdata;
let sort1=data.sort2;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
  
	
    render() {
    	let{flag4,flag3,flag1=true,flag=true,changepageProS,changepageProT,changepageSort1,changepageSort,changepageProfitS,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        let dayelec,monthElec,yearELec,amounts,rate,profit,electric,arrPlan=[],arrAct=[],month1=[],cost=[],incomes=[],month2=[],yearPro;
        $.ajax({
        		url:'http://10.9.100.144:8080/wbi/ELEC/getKongElec',//发电量
		        type: 'post',
		        async:false,
		        dataType: 'json',
		        timeout : 60000, 
		        success:function (data) {
		        	yearELec = data.data.yearELec;
		        	monthElec = data.data.monthElec;
		        	dayelec = data.data.dayelec;
		        	for(var i=0;i<data.data.wtKongMonthsElec.length;i++){
		        		arrPlan.push(data.data.wtKongMonthsElec[i].monthpowerplan);
		        		month1.push(data.data.wtKongMonthsElec[i].month);
		        		arrAct.push(data.data.wtKongMonthsElec[i].monthpoweract);
		        	} 
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　if(status=='timeout'){
			　　　　　 console.log('超时');
			　　　}
			},
		});
        $.ajax({
        		url:'http://10.9.100.53:8080/wbi/yield/getMaxYie',//收益率
		        type: 'post',
		        async:false,
		        dataType: 'json',
		        timeout : 3000, 
		        success:function (data) {
		        	profit = data.data.incomes;
		        	amounts = data.data.amounts;
		        	rate = data.data.rate;
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 console.log('超时');
			　　　　}
			　　},
		});
		$.ajax({
        	url:'http://10.9.100.53:8080/wbi/yield/getAllRate',//年收益表
		    type: 'post',
		    async:false,
		    dataType: 'json',
		    timeout : 3000, 
		    success:function (data) {
			    yearPro=data.data;
			    for(var i=0;i<yearPro.length;i++){
			        month2.push(yearPro[i].month);
			        cost.push(yearPro[i].costs);
			        incomes.push(yearPro[i].earning);
			    }
		    },
		    complete : function(XMLHttpRequest,status){ 
			　　　if(status=='timeout'){
			　　　　　 console.log('超时');
			　　　}
			},
		});
		$.ajax({
        		url:'http://10.9.100.144:8080/wbi/PBA/getPBA',//发电量
		        type: 'post',
		        async:false,
		        dataType: 'json',
		        data:'type=0',
		        timeout : 60000, 
		        success:function (data) {
		        	console.log(data);
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　if(status=='timeout'){
			　　　　　 console.log('超时');
			　　　}
			},
		});

   		return (
           <div className={styles.box}>
           		<div className={styles.left}>
           			<div className={`${styles.firstfloor} ${styles.boxShadow}`}>
           				<div className={styles.section}>
           					<div className={styles.text1}>收益:{profit}万·投资:{amounts}万</div>
           					<div className={styles.alink}>
           						<a className={styles.space} onClick={()=>changepageProfitS()}></a>
           					</div>
           					<div className={styles.sectionBox}>
           						<span className={styles.numBox}><p style={{color:'#e9c75c'}}>{(rate*100)}%</p>收益率</span>
           						<Pie2 color={rate>1? ['#1fe005','#fbd500']:rate>0.8?['#fbd500','#39565e']:rate>0.6?['#ff3333','#39565e']:['#d06960','#39565e']} num={[profit,amounts-profit]}></Pie2>
           					</div>
           				</div>
           				<div className={styles.section}>
           					<div className={styles.border}></div>
           					<div className={styles.text1}>当前30分·总分100分</div>
           					<div className={styles.alink}>
           						<a className={styles.space} onClick={()=>changepageHealthyS()}></a><br/><br/>
           						<a className={styles.time} onClick={()=>changepageHealthyT()}></a>
           					</div>
           					<div className={styles.sectionBox}>
           						<span className={styles.numBox}><p style={{color:'#e9c75c'}}>{((data.firstfloor[1].small/data.firstfloor[1].big)*100).toFixed(1)}%</p>健康度</span>
           						<Pie2 color={['#E9C75C','#39565e']} num={[253,73]}></Pie2>	
           					</div>
           				</div>
           				<div className={styles.section}>
           					<div className={styles.border}></div>
           					<div className={styles.text1}>实发{data.firstfloor[2].actrul}kWh·应发{data.firstfloor[2].should}kWh</div>
           					<div className={styles.alink}>
           						<a className={styles.space} onClick={()=>changepagePBAS()}></a><br/><br/>
           						<a className={styles.time} onClick={()=>changepagePBAT()}></a>
           					</div>
           					<div className={styles.sectionBox}>
           						<span className={styles.numBox}><p style={{color:'#e9c75c'}}>{((data.firstfloor[2].actrul/data.firstfloor[2].should)*100).toFixed(1)}%</p>PBA</span>
           						<Pie2 color={['#ff3333','#39565e']} num={[20,10]}></Pie2>	
           					</div>
           				</div>
           				<div className={styles.section}>
           					<div className={styles.border}></div>
           					<div className={styles.text1}>可用{data.firstfloor[3].usable}h·统计{data.firstfloor[3].count}h</div>
           					<div className={styles.alink}>
           						<a className={styles.space} onClick={()=>changepageTBAS()}></a><br/><br/>
           						<a className={styles.time} onClick={()=>changepageTBAT()}></a>
           					</div>
           					<div className={styles.sectionBox}>
           						<span className={styles.numBox}><p style={{color:'#e9c75c'}}>{((data.firstfloor[3].usable/data.firstfloor[3].count)*100).toFixed(1)}%</p>TBA</span>
           						<Pie2 color={['#d06960','#39565e']} num={[25,75]}></Pie2>
           					</div>
           				</div>
           			</div>
           			<div className={styles.secondfloor}>
           				<div className={`${styles.electric} ${styles.boxShadow}`}>
           					<div className={styles.electricHeader}><a></a>发电量</div>
           					<div className={styles.electricFirst}>
           						<a></a><span>年累计发电量</span>
           						<div className={styles.electricTotal}>{yearELec}kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={styles.green} style={{width:((yearELec/1*100))+"%"}}>{(yearELec/1*100)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricSecond}>
           						<a></a><span>月累计发电量</span>
           						<div className={styles.electricTotal}>{monthElec}kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={styles.green} style={{width:(monthElec/1*100)+"%"}}>{(monthElec/1*100)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricThird}>
           						<a></a><span>日累计发电量</span>
           						<div className={styles.electricTotal}>{dayelec}kWh</div>
           						<div className={styles.electricPercent}>
           							<div className={styles.green} style={{width:(dayelec/1*100)+"%"}}>{(dayelec/1*100)}%</div>
           						</div>
           					</div>
           				</div>
           				<div className={`${styles.yearelectric} ${styles.boxShadow}`}>
           					<div className={styles.header}>
           							<div className={styles.logo}><a></a><span>年发电量</span></div>
           							<div className={styles.linkBox}>
           								<div className={styles.links}><a className={styles.space} onClick={()=>changepageEleS()}></a></div>
	           							<div className={styles.links}><a className={styles.time} onClick={()=>changepageEleT()}></a></div>
           							</div>
	           				</div>
           					<Yearelectric month={month1} plan={arrPlan} actrul={arrAct} unit={data.yearelectric[0].unit[1]} nameOne={data.yearelectric[0].name[0]} nameTwo={data.yearelectric[0].name[1]}></Yearelectric>
           				</div>
           				<div className={`${styles.yearprofit} ${styles.boxShadow}`}>
           					<div className={styles.header}>
           							<div className={styles.logo}><a></a><span>年收益</span></div>
           							<div className={styles.linkBox}>
           								<div className={styles.links}><a className={styles.space} onClick={()=>changepageProS()}></a></div>
	           							<div className={styles.links}><a className={styles.time} onClick={()=>changepageProT()}></a></div>
           							</div>
	           				</div>
           					<div className={styles.index}><Yearelectric month={month2} plan={incomes} actrul={cost} unit={data.yearelectric[0].unit[0]} nameOne={"收入"} nameTwo={"成本"}></Yearelectric></div>
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
	           					<th>区域名</th>
	           					<th className={styles.click1} onClick={()=>changepageSort1(flag1)}>PBA <span className={flag3==undefined? styles.init:flag3==true?styles.top:styles.bottom}></span></th>
	           					<th className={styles.click} onClick={()=>changepageSort(flag)}>停机时间 <span className={flag4==undefined? styles.init:flag4==true?styles.top:styles.bottom}></span></th>
                			</tr>
                			<tr>
                				<th>1</th><th>{sort1[0].name}</th><th>{sort1[0].PBA}</th><th>{sort1[0].time}分钟</th>
                			</tr>
                			<tr>
                				<th>2</th><th>{sort1[1].name}</th><th>{sort1[1].PBA}</th><th>{sort1[1].time}分钟</th>
                			</tr>
                			<tr>
                				<th>3</th><th>{sort1[2].name}</th><th>{sort1[2].PBA}</th><th>{sort1[2].time}分钟</th>
                			</tr>
                			<tr>
                				<th>4</th><th>{sort1[3].name}</th><th>{sort1[3].PBA}</th><th>{sort1[3].time}分钟</th>
                			</tr>
                			<tr>
                				<th>5</th><th>{sort1[4].name}</th><th>{sort1[4].PBA}</th><th>{sort1[4].time}分钟</th>
                			</tr>
                			<tr>
                				<th>6</th><th>{sort1[5].name}</th><th>{sort1[5].PBA}</th><th>{sort1[5].time}分钟</th>
                			</tr>
                			<tr>
                				<th>7</th><th>{sort1[6].name}</th><th>{sort1[6].PBA}</th><th>{sort1[6].time}分钟</th>
                			</tr>
                			<tr>
                				<th>8</th><th>{sort1[7].name}</th><th>{sort1[7].PBA}</th><th>{sort1[7].time}分钟</th>
                			</tr>
                			<tr>
                				<th>9</th><th>{sort1[8].name}</th><th>{sort1[8].PBA}</th><th>{sort1[8].time}分钟</th>
                			</tr>
                			<tr>
                				<th>10</th><th>{sort1[9].name}</th><th>{sort1[9].PBA}</th><th>{sort1[9].time}分钟</th>
                			</tr>
                		</tbody>	
                	</table>
                </div>
           </div>
        );
    }
});



const mapStateToProps = (state) => {
    return {
    	sort1 : state.vars.sort2,
    	flag : state.vars.flag1,
    	flag1 : state.vars.flag2,
    	flag3: state.vars.flag3,
    	flag4: state.vars.flag4,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (gdata) => {
        	
            
		    
        },
        
        changepageSort:(flag)=>{
        	flag==true? dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return a.time-b.time}))):dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return b.time-a.time})));
        	flag==true? dispatch(actions.setVars('flag1',false )):dispatch(actions.setVars('flag1',true ));
        	flag==true? dispatch(actions.setVars('flag4',false )):dispatch(actions.setVars('flag4',true ));
        },
        changepageSort1:(flag1)=>{
        	flag1==true? dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return (a.PBA).slice(0,1)/1-(b.PBA).slice(0,1)/1}))):dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return (b.PBA).slice(0,1)/1-(a.PBA).slice(0,1)/1})));
        	flag1==true? dispatch(actions.setVars('flag2',false )):dispatch(actions.setVars('flag2',true ));
        	flag1==true? dispatch(actions.setVars('flag3',false )):dispatch(actions.setVars('flag3',true ));
        },
        changepageProfitS:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'profits'));
        },
        changepageHealthyT:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthy'));
        },
        changepageHealthyS:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthy_one'));
        },
        changepageTBAT:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'profitsss'));
        },
        changepageTBAS:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'profitss'));
        },
        changepagePBAT:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthypbas'));
        },
        changepagePBAS:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthypba'));
        },
        changepageEleT:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthygens'));
        },
        changepageEleS:()=>{
        	dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'healthygen'));
        },
        changepageProT:()=>{
        	
        },
        changepageProS:()=>{
        	
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);