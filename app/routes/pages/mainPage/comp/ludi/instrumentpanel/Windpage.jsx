import React from 'react';
import {connect} from 'react-redux';
import styles from './Windstyle.scss';
import Instrumentdata from './Instrument-data';
import Yearelectric from './Yearelectric.jsx';

var actions = require('redux/actions');

let data=Instrumentdata;
let sort1=data.sort; 

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        
        
        let{flag=true,changepageSort1,changepageSort,big1,small1,wind,actbt=0,changepageW,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
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
           						<span>健康度</span> 
           						<a onClick={()=>changepageHealthyT()}>图片</a>
           						<a onClick={()=>changepageHealthyS()}>图片</a>
           						<span>{small1==undefined? ((data.yearelectric[0].wind[0].small/data.yearelectric[0].wind[0].big)*100).toFixed(1):((small1/big1)*100).toFixed(1)}%</span>
           					</div>
           					<div className={styles.sectiontwo}>
           						<div className={styles.big}>
           							<div className={styles.small} style={{width:small1==undefined? ((data.yearelectric[0].wind[0].small/data.yearelectric[0].wind[0].big)*100).toFixed(1)+"%":((small1/big1)*100).toFixed(1)+"%"}}>
           								{small1==undefined? ((data.yearelectric[0].wind[0].small/data.yearelectric[0].wind[0].big)*100).toFixed(1):((small1/big1)*100).toFixed(1)}%
           							</div>
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>PBA</span>
           						<a onClick={()=>changepagePBAT()}>图片</a>
           						<a onClick={()=>changepagePBAS()}>图片</a>
           						<span>{data.firstfloor[2].actrul/data.firstfloor[2].should*100}%</span>
           					</div>
           					<div className={styles.sectionthree}>
           						<div className={styles.should}>
           							<div className={styles.actrul} style={{width:((data.firstfloor[2].actrul/data.firstfloor[2].should)*100).toFixed(1)+"%"}}>
           								<div className={styles.text1}><span>实发:2000kWh</span>&nbsp;&nbsp;<span>应发:3333</span></div>
           							</div>
           							
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>TBA</span>
           						<a onClick={()=>changepageTBAT()}>图片</a>
           						<a onClick={()=>changepageTBAS()}>图片</a>
           						<span>{data.firstfloor[3].usable/data.firstfloor[3].count*100}%</span>
           					</div>
           					<div className={styles.sectionfour}>
           						<div className={styles.count}>
           							<div className={styles.usable} style={{width:((data.firstfloor[3].usable/data.firstfloor[3].count)*100).toFixed(1)+"%"}}>
           								<div className={styles.text1}><span>可用时间:2000000</span>&nbsp;&nbsp;<span>统计时间:3333</span></div>
           							</div>
           							
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           			</div>
           			<div className={styles.secondfloor}>
           				<div className={`${styles.electric} ${styles.boxShadow}`}>
           					<div className={styles.electricHeader}><a>图片</a>发电量</div>
           					<div className={styles.electricFirst}>
           						<a>图片</a>
           						<div className={styles.electricNum}>
           							<div>{data.electric[0].name}</div>
           							<div className={styles.electricTotal}>{data.electric[0].actrul}kWh</div>
           							<div className={styles.electricPercent}>
           								<div style={{width:((data.electric[0].actrul/data.electric[0].should*100).toFixed(1))+"%"}}>{(data.electric[0].actrul/data.electric[0].should*100).toFixed(1)}%</div>
           							</div>
           							<div className={styles.border}></div>
           						</div>
           					</div>
           					<div className={styles.electricFirstBorder}></div>
           					<div className={styles.electricSecond}>
           						<a>图片</a>
           						<div className={styles.electricNum}>
           							<div>{data.electric[1].name}</div>
           							<div className={styles.electricTotal}>{data.electric[1].actrul}kWh</div>
           							<div className={styles.electricPercent}>
           								<div style={{width:((data.electric[1].actrul/data.electric[1].should*100).toFixed(1))+"%"}}>{(data.electric[1].actrul/data.electric[1].should*100).toFixed(1)}%</div>
           							</div>
           							<div className={styles.border}></div>
           						</div>
           					</div>
           					<div className={styles.electricSecondBorder}></div>
           					<div className={styles.electricThird}>
           						<a>图片</a>
           						<div className={styles.electricNum}>
           							<div>{data.electric[2].name}</div>
           							<div className={styles.electricTotal}>{data.electric[2].actrul}kWh</div>
           							<div className={styles.electricPercent}>
           								<div style={{width:((data.electric[2].actrul/data.electric[2].should*100).toFixed(1))+"%"}}>{(data.electric[2].actrul/data.electric[2].should*100).toFixed(1)}%</div>
           							</div>
           							<div className={styles.border}></div>
           						</div>
           					</div>
           					<div className={styles.electricThirdBorder}></div>
           				</div>
           				<div className={`${styles.yearelectric} ${styles.boxShadow}`}>
           					<div>
           						<div className={styles.logo}><a>logo</a></div>
           						<div className={styles.links}><a onClick={()=>changepageEleT()}>图片</a></div>
           						<div className={styles.links}><a onClick={()=>changepageEleS()}>图片</a></div>
           						<Yearelectric title={data.yearelectric[0].title[0]} month={data.yearelectric[0].month} plan={wind==undefined? data.yearelectric[0].plan:wind} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[1]} nameOne={data.yearelectric[0].name[0]} nameTwo={data.yearelectric[0].name[1]}></Yearelectric>
           					</div>
           				</div>
           				<div className={`${styles.yearprofit} ${styles.boxShadow}`}>
           					<div>
           						<div className={styles.logo}><a>logo</a></div>
           						<Yearelectric title={data.yearelectric[0].title[1]} month={data.yearelectric[0].month} plan={wind==undefined? data.yearelectric[0].plan:wind} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[0]} nameOne={data.yearelectric[0].name[2]} nameTwo={data.yearelectric[0].name[3]}></Yearelectric>
           					</div>
           				</div>
           			</div>
           			
           		</div>
                <div className={`${styles.right} ${styles.boxShadow}`}>
                	<h3>
                		<span>箭头</span> &nbsp; PBA排序
                	</h3>
                	<table>
                		<tbody>
                			<tr>
	                			<th>排名</th>
	           					<th>风机名</th>
	           					<th className={styles.click} onClick={()=>changepageSort1(flag)}>PBA ↑↓</th>
	           					<th className={styles.click} onClick={()=>changepageSort(flag)}>停机时间 ↑↓</th>
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
    	actbt : state.vars.actbt,
    	wind : state.vars.wind,
    	big1 : state.vars.big1,
    	small1 : state.vars.small1,
    	sort1 : state.vars.sort2,
    	flag : state.vars.flag1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        changepageSort:(flag)=>{
        	flag==true? dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return a.time-b.time}))):dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return b.time-a.time})));
        	flag==true? dispatch(actions.setVars('flag1',false )):dispatch(actions.setVars('flag1',true ));
        },
        changepageSort1:(flag)=>{
        	flag==true? dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return (a.PBA).slice(0,1)/1-(b.PBA).slice(0,1)/1}))):dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return (b.PBA).slice(0,1)/1-(a.PBA).slice(0,1)/1})));
        	flag==true? dispatch(actions.setVars('flag1',false )):dispatch(actions.setVars('flag1',true ));
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);