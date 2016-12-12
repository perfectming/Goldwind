import React from 'react';
import {connect} from 'react-redux';
import styles from './Windstyle.scss';
import Instrumentdata from './Instrument-data';
import Yearelectric from './Yearelectric.jsx';
import Pie2 from '../../mxx/Pie2';

var actions = require('redux/actions');

let data=Instrumentdata;
let sortArr; 

let Component = React.createClass({
	componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        
        
        let{flagTime=true,flagPba=true,flag=true,changepageSort1,changepageProT,changepageProS,changepageSort,big1,small1,wind,actbt=0,changepageW,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        let profit;
        
        return (
           <div className={styles.box}>
           		<ul className={styles.monthbox}>
                    {
                    	data.yearelectric[0].wind.map((value,key)=>{
                    		return(<li key={key} className={actbt===key? styles.bg1 : styles.bg} onClick={()=>changepageW(value,key)}>{value.name}</li>)
                    	})
                    }
                </ul>
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>当前30分<br/><br/>总分100分</span>
           					</div>
           					<div className={styles.sectiontwo}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{small1==undefined? ((data.yearelectric[0].wind[0].small/data.yearelectric[0].wind[0].big)*100).toFixed(1):((small1/big1)*100).toFixed(1)}%</p>健康度</span>
           						<Pie2 color={small1==undefined? ['#d06960','#39565e']:(small1/big1)>1? ['#1fe005','#fbd500']:(small1/big1)>0.8?['#fbd500','#39565e']:(small1/big1)>0.6?['#ff3333','#39565e']:['#d06960','#39565e']} num={small1==undefined? [data.yearelectric[0].wind[0].small,data.yearelectric[0].wind[0].big-data.yearelectric[0].wind[0].small]:big1-small1>0? [small1,big1-small1]:[small1-big1,2*big1-small1]}></Pie2>
           						</div>
           						<a className={styles.space} onClick={()=>changepageHealthyS()}></a><br/>
           						<a className={styles.time} onClick={()=>changepageHealthyT()}></a>
           					</div>
           				</div>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>实发122kWh<br/><br/>应发200kWh</span><br/>
           					</div>
           					<div className={styles.sectionthree}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{data.firstfloor[2].actrul/data.firstfloor[2].should*100}%</p>PBA</span>
           						<Pie2 color={['#ff3333','#39565e']} num={[20,17]}></Pie2>
           						</div>
           						<a className={styles.space} onClick={()=>changepagePBAS()}></a><br/>
           						<a className={styles.time} onClick={()=>changepagePBAT()}></a>
           					</div>
           				</div>
           				<div className={`${styles.sectionSmall} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>可用100h <br/><br/>统计200h</span>
           					</div>
           					<div className={styles.sectionfour}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{data.firstfloor[3].usable/data.firstfloor[3].count*100}%</p>TBA</span>
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
           						<a></a><span>{data.electric[0].name}</span>
           						<div className={styles.electricTotal}>{data.electric[0].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[0].actrul/data.electric[0].should*100).toFixed(1))+"%"}}>{(data.electric[0].actrul/data.electric[0].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricSecond}>
           						<a></a><span>{data.electric[1].name}</span>
           						<div className={styles.electricTotal}>{data.electric[1].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[1].actrul/data.electric[1].should*100).toFixed(1))+"%"}}>{(data.electric[1].actrul/data.electric[1].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricThird}>
           						<a></a><span>{data.electric[2].name}</span>
           						<div className={styles.electricTotal}>{data.electric[2].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[2].actrul/data.electric[2].should*100).toFixed(1))+"%"}}>{(data.electric[2].actrul/data.electric[2].should*100).toFixed(1)}%</div>
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
           						<Yearelectric title={data.yearelectric[0].title[0]} month={data.yearelectric[0].month} plan={wind==undefined? data.yearelectric[0].wind[0].plan:wind} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[1]} nameOne={data.yearelectric[0].name[0]} nameTwo={data.yearelectric[0].name[1]}></Yearelectric>
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
           						<Yearelectric title={data.yearelectric[0].title[1]} month={data.yearelectric[0].month} plan={data.yearelectric[0].plan} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[0]} nameOne={data.yearelectric[0].name[2]} nameTwo={data.yearelectric[0].name[3]}></Yearelectric>
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
	           					<th>区域名</th>
	           					<th onClick={()=>changepageSort1(flag,flagPba,sortArr)} className={flag==true? styles.clickPba1:styles.clickPba4} >PBA <span className={flagPba==true? styles.arrow:styles.bottom}></span></th>
	           					<th onClick={()=>changepageSort(flag,flagTime,sortArr)} className={flag==true? styles.clickTime1:styles.clickTime4}>停机时间 <span className={flagTime==true? styles.arrow:styles.bottom}></span></th>
                			</tr>
                			{
//              				sortArr.map((value,key)=>{
//		                    		return(<tr key={key}><th>{key+1}</th><th>{value.groupname}</th><th>{(value.everyAreaPba*100).toFixed(1)}%</th><th>{value.downtime}小时</th></tr>)
//		                    	})
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
    	wind : state.vars.wind,
    	big1 : state.vars.big1,
    	small1 : state.vars.small1,
    	sortArr : state.vars.sortArr,
    	flag : state.vars.flag,
    	flagPba : state.vars.flagPba,
    	flagTime : state.vars.flagTime,
    	
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	
    	ajax: () => {
    		$.ajax({
        		url: 'http://10.9.99.173:8080/wbi/PBA/getCompanyAreaPBA',//风场列表
		        type: 'post',
		        async:false,
		        data:{'groupid':clickAreaId},
		        dataType: 'json',//here
		        success:function (data) {
		        	console.log(data)
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
        changepageSort:(flag,flagTime,sortArr)=>{
//      	flagTime==false? dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return a.downtime-b.downtime}))):dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return b.downtime-a.downtime})));
        	dispatch(actions.setVars('flag',false ));
        	dispatch(actions.setVars('flagTime',!flagTime ));
        	
        },
        changepageSort1:(flag,flagPba,sortArr)=>{
//      	flagPba==true? dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return a.everyAreaPba-b.everyAreaPba}))):dispatch(actions.setVars('sortArr', sortArr.sort(function(a,b){return b.everyAreaPba-a.everyAreaPba})));
        	dispatch(actions.setVars('flag',true ));
        	dispatch(actions.setVars('flagPba',!flagPba ));
        },
        changepageW :(value,key)=>{
        	dispatch(actions.setVars('big1',value.big ));
            dispatch(actions.setVars('small1',value.small ));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('wind',value.plan ));
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