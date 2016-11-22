import React from 'react';
import {connect} from 'react-redux';
import styles from './Groupstyle.scss';
import Instrumentdata from './Instrument-data';
import Yearelectric from './Yearelectric.jsx';
import Yearprofit from './Yearprofit.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        let data=Instrumentdata;
        let{changepage2}=this.props;
        return (
           <div className={styles.box}>
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={styles.section}>
           					<div className={styles.sectionbar}>
           						<span>收益率</span>
           						<span>{data.firstfloor[0].profit/data.firstfloor[0].investment*100}%</span>
           					</div>
           					<div className={styles.sectionone}>
           						<div className={styles.profit}>
           							<div className={styles.investment} style={{width:((data.firstfloor[0].profit/data.firstfloor[0].investment)*100).toFixed(1)+"%"}}>
           								收益:    
           							</div>
           							<span>投资:</span>
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           				<div className={styles.section}>
           					<div className={styles.sectionbar}>
           						<span>健康度</span> 
           						<a onClick={()=>changepage2()}>图片</a><a>图片</a>
           						<span>{data.firstfloor[1].small/data.firstfloor[1].big*100}%</span>
           					</div>
           					<div className={styles.sectiontwo}>
           						<div className={styles.big}>
           							<div className={styles.small} style={{width:((data.firstfloor[1].small/data.firstfloor[1].big)*100).toFixed(1)+"%"}}>
           								{data.firstfloor[1].small/data.firstfloor[1].big*100}%
           							</div>
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           				<div className={styles.section}>
           					<div className={styles.sectionbar}>
           						<span>PBA</span>
           						<a>图片</a><a>图片</a>
           						<span>{data.firstfloor[2].actrul/data.firstfloor[2].should*100}%</span>
           					</div>
           					<div className={styles.sectionthree}>
           						<div className={styles.should}>
           							<div className={styles.actrul} style={{width:((data.firstfloor[2].actrul/data.firstfloor[2].should)*100).toFixed(1)+"%"}}>
           								实发:
           							</div>
           							<span>应发:</span>
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           				<div className={styles.section}>
           					<div className={styles.sectionbar}>
           						<span>TBA</span>
           						<a>图片</a><a>图片</a>
           						<span>{data.firstfloor[3].usable/data.firstfloor[3].count*100}%</span>
           					</div>
           					<div className={styles.sectionfour}>
           						<div className={styles.count}>
           							<div className={styles.usable} style={{width:((data.firstfloor[3].usable/data.firstfloor[3].count)*100).toFixed(1)+"%"}}>
           								可用时间: 
           							</div>
           							<span>统计时间:</span>
           						</div>
           					</div>
           					<div className={styles.border}></div>
           				</div>
           			</div>
           			<div className={styles.secondfloor}>
           				<div className={styles.electric}>
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
           				<div className={styles.yearelectric}>
           					<div>
           						<Yearelectric></Yearelectric>
           					</div>
           				</div>
           				<div className={styles.yearprofit}>
           					<div>
           						<Yearprofit></Yearprofit>
           					</div>
           				</div>
           			</div>
           			
           		</div>
                <div className={styles.right}>
                	<h3>
                		<span>箭头</span> &nbsp; PBA排序
                	</h3>
                	<table>
                		<tbody>
                			<tr>
	                			<th>排名</th>
	           					<th>区域名</th>
	           					<th className={styles.click}>PBA ↑↓</th>
	           					<th className={styles.click}>停机时间 ↑↓</th>
                			</tr>
                			<tr>
                				<th>1</th><th>区域1</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>2</th><th>区域2</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>3</th><th>区域3</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>4</th><th>区域4</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>5</th><th>区域5</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>6</th><th>区域6</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>7</th><th>区域7</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>8</th><th>区域8</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>9</th><th>区域9</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>10</th><th>区域10</th><th></th><th></th>
                			</tr>
                		</tbody>	
                	</table>
                </div>
           </div>
        );
    }
});



const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        changepage2:()=>{
        	dispatch(actions.setVars('showPage', 'baotou'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);