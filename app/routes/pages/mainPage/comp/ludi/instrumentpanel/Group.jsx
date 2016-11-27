import React from 'react';
import {connect} from 'react-redux';
import styles from './Groupstyle.scss';
import Instrumentdata from './Instrument-data';
import Yearelectric from './Yearelectric.jsx';

var actions = require('redux/actions');

let data=Instrumentdata;
let sort1=data.sort2;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        let{flag=true,changepageSort1,changepageSort,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        return (
           <div className={styles.box}>
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>收益率</span>
           						<span>{data.firstfloor[0].profit/data.firstfloor[0].investment*100}%</span>
           					</div>
           					<div className={styles.sectionone}>
           						<div className={styles.profit}>
           							<div className={styles.investment} style={{width:((data.firstfloor[0].profit/data.firstfloor[0].investment)*100).toFixed(1)+"%"}}>
           							</div>
           							<div className={styles.text1}>收益:{data.firstfloor[0].profit}万 &nbsp; 投资:{data.firstfloor[0].investment}万</div>
           							
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>健康度</span> 
           						<a onClick={()=>changepageHealthyT()}>图片</a>
           						<a onClick={()=>changepageHealthyS()}>图片</a>
           						<span>{data.firstfloor[1].small/data.firstfloor[1].big*100}%</span>
           					</div>
           					<div className={styles.sectiontwo}>
           						<div className={styles.big}>
           							<div className={styles.small} style={{width:((data.firstfloor[1].small/data.firstfloor[1].big)*100).toFixed(1)+"%"}}>
           							</div>
           							<div className={styles.text1}>{data.firstfloor[1].small/data.firstfloor[1].big*100}%</div>
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
           							</div>
           							<div className={styles.text1}>实发:{data.firstfloor[2].actrul}kWh &nbsp; 应发:{data.firstfloor[2].should}kWh</div>
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
           							</div>
           							<div className={styles.text1}>可用时间:{data.firstfloor[3].usable}h &nbsp; 统计时间:{data.firstfloor[3].count}h</div>
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
           						<Yearelectric title={data.yearelectric[0].title[0]} month={data.yearelectric[0].month} plan={data.yearelectric[0].plan} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[1]} nameOne={data.yearelectric[0].name[0]} nameTwo={data.yearelectric[0].name[1]}></Yearelectric>
           					</div>
           				</div>
           				<div className={`${styles.yearprofit} ${styles.boxShadow}`}>
           					<div>
           						<div className={styles.logo}><a>logo</a></div>
           						<Yearelectric title={data.yearelectric[0].title[1]} month={data.yearelectric[0].month} plan={data.yearelectric[0].plan} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[0]} nameOne={data.yearelectric[0].name[2]} nameTwo={data.yearelectric[0].name[3]}></Yearelectric>
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
	           					<th>区域名</th>
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
        changepageHealthyT:()=>{
        	dispatch(actions.setVars('showPage', 'healthy'));
        },
        changepageHealthyS:()=>{
        	dispatch(actions.setVars('showPage', 'healthy_one'));
        },
        changepageTBAT:()=>{
        	dispatch(actions.setVars('showPage', 'profitsss'));
        },
        changepageTBAS:()=>{
        	dispatch(actions.setVars('showPage', 'profitss'));
        },
        changepagePBAT:()=>{
        	dispatch(actions.setVars('showPage', 'healthypbas'));
        },
        changepagePBAS:()=>{
        	dispatch(actions.setVars('showPage', 'healthypba'));
        },
        changepageEleT:()=>{
        	dispatch(actions.setVars('showPage', 'healthygens'));
        },
        changepageEleS:()=>{
        	dispatch(actions.setVars('showPage', 'healthygen'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);