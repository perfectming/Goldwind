import React from 'react';
import {connect} from 'react-redux';
import styles from './Areastyle.scss';
import Instrumentdata from './Instrument-data';
import Yearelectric from './Yearelectric.jsx';
import Pie2 from '../../mxx/Pie2';

var actions = require('redux/actions');

let data=Instrumentdata;
let sort1=data.sort1;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        let{flag3,flag4,flag=true,changepageSort1,changepageSort,value,small,big,area,actb=0,changepage,changepageHealthyT,changepageHealthyS,changepageTBAT,changepageTBAS,changepagePBAT,changepagePBAS,changepageEleT,changepageEleS}=this.props;
        return (
           <div className={styles.box}>
           		<ul className={styles.monthbox}>
                    {
                    	data.yearelectric[0].area.map((value,key)=>{
                    		return(<li key={key} className={actb===key? styles.bg1 : styles.bg} onClick={()=>changepage(value,key)}>{value.name}</li>)
                    	})
                    }
                </ul>
           		
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>当前{small==undefined? data.yearelectric[0].area[0].small:small}分<br/>总分100分</span><br/> 
           						<a onClick={()=>changepageHealthyS()}>空间</a>&nbsp;
           						<a onClick={()=>changepageHealthyT()}>时间</a>
           					</div>
           					<div className={styles.sectiontwo}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{small==undefined? ((data.yearelectric[0].area[0].small/data.yearelectric[0].area[0].big)*100).toFixed(1):((small/big)*100).toFixed(1)}%</p>健康度</span>
           						<Pie2 color={small==undefined? ['#E9C75C','#A69263']:(big-small)>0? ['#E9C75C','#A69263']:['#00ff33','#E9C75C']} num={small==undefined? [data.yearelectric[0].area[0].small,data.yearelectric[0].area[0].big-data.yearelectric[0].area[0].small]:(big-small)>0?[small,big-small]:[small-big,2*big-small]}></Pie2>
           					</div>
           				</div>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>实发122kWh<br/>应发200kWh</span><br/>
           						<a onClick={()=>changepagePBAS()}>空间</a>&nbsp;
           						<a onClick={()=>changepagePBAT()}>时间</a>
           					</div>
           					<div className={styles.sectionthree}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{data.firstfloor[2].actrul/data.firstfloor[2].should*100}%</p>PBA</span>
           						<Pie2 color={['#D06960','#954A45']} num={[85,15]}></Pie2>
           					</div>
           				</div>
           				<div className={`${styles.sectionSmall} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>可用100h <br/>统计200h</span><br/>
           						<a onClick={()=>changepageTBAS()}>空间</a>&nbsp;
           						<a onClick={()=>changepageTBAT()}>时间</a>
           					</div>
           					<div className={styles.sectionfour}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{data.firstfloor[3].usable/data.firstfloor[3].count*100}%</p>TBA</span>
           						<Pie2 color={['#70C080','#4A7A59']} num={[65,15]}></Pie2>
           					</div>
           				</div>
           			</div>
           			<div className={styles.secondfloor}>
           				<div className={`${styles.electric} ${styles.boxShadow}`}>
           					<div className={styles.electricHeader}><a>图片</a>发电量</div>
           					<div className={styles.electricFirst}>
           						<a>图片</a><span>{data.electric[0].name}</span>
           						<div className={styles.electricTotal}>{data.electric[0].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[0].actrul/data.electric[0].should*100).toFixed(1))+"%"}}>{(data.electric[0].actrul/data.electric[0].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricSecond}>
           						<a>图片</a><span>{data.electric[1].name}</span>
           						<div className={styles.electricTotal}>{data.electric[1].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[1].actrul/data.electric[1].should*100).toFixed(1))+"%"}}>{(data.electric[1].actrul/data.electric[1].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricThird}>
           						<a>图片</a><span>{data.electric[2].name}</span>
           						<div className={styles.electricTotal}>{data.electric[2].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[2].actrul/data.electric[2].should*100).toFixed(1))+"%"}}>{(data.electric[2].actrul/data.electric[2].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           				</div>
           				<div className={`${styles.yearelectric} ${styles.boxShadow}`}>
           					<div>
           						<div className={styles.header}>
           							<div className={styles.logo}><a>logo</a><span>年发电量</span></div>
	           						<div className={styles.links}><a onClick={()=>changepageEleS()}>空间</a></div>&nbsp;
	           						<div className={styles.links}><a onClick={()=>changepageEleT()}>时间</a></div>
           						</div>
           						<Yearelectric title={data.yearelectric[0].title[0]} month={data.yearelectric[0].month} plan={area==undefined? data.yearelectric[0].wind[0].plan:area} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[1]} nameOne={data.yearelectric[0].name[0]} nameTwo={data.yearelectric[0].name[1]}></Yearelectric>
           					</div>
           				</div>
           				<div className={`${styles.yearprofit} ${styles.boxShadow}`}>
           					<div>
           						<div className={styles.logo}><a>logo</a><span>年收益</span></div>
           						<Yearelectric title={data.yearelectric[0].title[1]} month={data.yearelectric[0].month} plan={data.yearelectric[0].plan} actrul={data.yearelectric[0].actrul} unit={data.yearelectric[0].unit[0]} nameOne={data.yearelectric[0].name[2]} nameTwo={data.yearelectric[0].name[3]}></Yearelectric>
           					</div>
           				</div>
           			</div>
           		</div>
                <div className={`${styles.right} ${styles.boxShadow}`}>
                	<h3>
                		<span><a>logo</a></span> &nbsp; PBA排序
                	</h3>
                	<table>
                		<tbody>
                			<tr>
	                			<th>排名</th>
	           					<th>风场名</th>
	           					<th className={styles.click1} onClick={()=>changepageSort1(flag)}>PBA <span className={flag3==undefined? null:flag3==true?styles.top:styles.bottom}>↑</span><span className={flag3==undefined? null:flag3==false?styles.top:styles.bottom}>↓</span></th>
	           					<th className={styles.click} onClick={()=>changepageSort(flag)}>停机时间<span className={flag4==undefined? null:flag4==true?styles.top:styles.bottom}>↑</span><span className={flag4==undefined? null:flag4==false?styles.top:styles.bottom}>↓</span></th>
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
    	actb : state.vars.actb,
    	area : state.vars.area,
    	value : state.vars.value,
    	big : state.vars.big,
    	small : state.vars.small,
    	sort1 : state.vars.sort2,
    	flag : state.vars.flag1,
    	flag3: state.vars.flag3,
    	flag4: state.vars.flag4,
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
        	flag==true? dispatch(actions.setVars('flag4',false )):dispatch(actions.setVars('flag4',true ));
        },
        changepageSort1:(flag)=>{
        	flag==true? dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return (a.PBA).slice(0,1)/1-(b.PBA).slice(0,1)/1}))):dispatch(actions.setVars('sort2', sort1.sort(function(a,b){return (b.PBA).slice(0,1)/1-(a.PBA).slice(0,1)/1})));
        	flag==true? dispatch(actions.setVars('flag1',false )):dispatch(actions.setVars('flag1',true ));
        	flag==true? dispatch(actions.setVars('flag3',false )):dispatch(actions.setVars('flag3',true ));
        },
        changepage :(value,key)=>{
              dispatch(actions.setVars('actb',key ));
              dispatch(actions.setVars('value',value ));
              dispatch(actions.setVars('area',value.plan ));
              dispatch(actions.setVars('big',value.big ));
              dispatch(actions.setVars('small',value.small ));
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
        	dispatch(actions.setVars('showPage', 'regiotba'));
        },
        changepagePBAT:()=>{
        	dispatch(actions.setVars('showPage', 'healthyregpbas'));
        },
        changepagePBAS:()=>{
        	dispatch(actions.setVars('showPage', 'healthyregpba'));
        },
        changepageEleT:()=>{
        	dispatch(actions.setVars('showPage', 'regiopowers'));
        },
        changepageEleS:()=>{
        	dispatch(actions.setVars('showPage', 'regiopower'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);