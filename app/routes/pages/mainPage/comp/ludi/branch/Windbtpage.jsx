import React from 'react';
import {connect} from 'react-redux';
import styles from './Windbtstyle.scss';
import Instrumentdata from './Instrument-data';
import Instrumentdata1 from '../instrumentpanel/Instrument-data';
import Yearelectric from '../instrumentpanel/Yearelectric.jsx';
import Pie2 from '../../mxx/Pie2';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
        let data=Instrumentdata;
        let data1=Instrumentdata1;
        return (
           <div className={styles.box}>
           		<ul className={styles.monthbox}>
                    {
                    	data.yearelectric[0].windfield.map((value,key)=>{
                    		return(<li key={key}>{value}</li>)
                    	})
                    }
                </ul>
           		
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>当前{data.firstfloor[1].small}分</span><br/>
           						<span>总分{data.firstfloor[1].big}分</span><br/>
           						<a>图片</a><a>图片</a>
           					</div>
           					<div className={styles.sectiontwo}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{((data.firstfloor[1].small/data.firstfloor[1].big)*100).toFixed(1)}%</p>健康度</span>
           						<Pie2 color={['#E9C75C','#A69263']} num={[data.firstfloor[1].big,data.firstfloor[1].small]}></Pie2>
           					</div>
           				</div>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>实发{data.firstfloor[2].actrul}kWh</span><br/>
           						<span>应发{data.firstfloor[2].should}kWh</span><br/>
           						<a>图片</a><a>图片</a>
           					</div>
           					<div className={styles.sectionthree}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{((data.firstfloor[2].actrul/data.firstfloor[2].should)*100).toFixed(1)}%</p>PBA</span>
           						<Pie2 color={['#D06960','#954A45']} num={[data.firstfloor[2].should,data.firstfloor[2].actrul]}></Pie2>
           					</div>
           				</div>
           				<div className={`${styles.sectionSmall} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>可用{data.firstfloor[3].usable}h</span><br/>
           						<span>统计{data.firstfloor[3].count}h</span><br/>
           						<a>图片</a><a>图片</a>
           					</div>
           					<div className={styles.sectionfour}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{((data.firstfloor[3].usable/data.firstfloor[3].count)*100).toFixed(1)}%</p>TBA</span>
           						<Pie2 color={['#70C080','#4A7A59']} num={[data.firstfloor[3].count,data.firstfloor[3].usable]}></Pie2>
           					</div>
           				</div>
           			</div>
           			<div className={styles.secondfloor}>
           				<div className={`${styles.electric} ${styles.boxShadow}`}>
           					<div className={styles.electricHeader}><a>图片</a>发电量</div>
           					<div className={styles.electricFirst}>
           						<a>图片</a>
           						<div>{data.electric[0].name}</div>
           						<div className={styles.electricTotal}>{data.electric[0].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[0].actrul/data.electric[0].should*100).toFixed(1))+"%"}}>{(data.electric[0].actrul/data.electric[0].should*100).toFixed(1)}%</div>
           						</div>
           						
           					</div>
           					<div className={styles.electricSecond}>
           						<a>图片</a>
           						<div>{data.electric[1].name}</div>
           						<div className={styles.electricTotal}>{data.electric[1].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[1].actrul/data.electric[1].should*100).toFixed(1))+"%"}}>{(data.electric[1].actrul/data.electric[1].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricThird}>
           						<a>图片</a>
           						<div>{data.electric[2].name}</div>
           						<div className={styles.electricTotal}>{data.electric[2].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[2].actrul/data.electric[2].should*100).toFixed(1))+"%"}}>{(data.electric[2].actrul/data.electric[2].should*100).toFixed(1)}%</div>
           						</div>
           						
           					</div>
           				</div>
           				<div className={`${styles.yearelectric} ${styles.boxShadow}`}>
           					<div>
           						<div className={styles.header}>年发电量</div>
           						<Yearelectric title={data1.yearelectric[0].title[0]} month={data1.yearelectric[0].month} plan={data1.yearelectric[0].plan} actrul={data1.yearelectric[0].actrul} unit={data1.yearelectric[0].unit[1]} nameOne={data1.yearelectric[0].name[0]} nameTwo={data1.yearelectric[0].name[1]}></Yearelectric>
           					</div>
           				</div>
           				<div className={`${styles.yearprofit} ${styles.boxShadow}`}>
           					<div>
           						<div className={styles.header}>年收益</div>
           						<Yearelectric title={data1.yearelectric[0].title[1]} month={data1.yearelectric[0].month} plan={data1.yearelectric[0].plan} actrul={data1.yearelectric[0].actrul} unit={data1.yearelectric[0].unit[0]} nameOne={data1.yearelectric[0].name[2]} nameTwo={data1.yearelectric[0].name[3]}></Yearelectric>
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
	           					<th className={styles.click}>PBA ↑↓</th>
	           					<th className={styles.click}>停机时间 ↑↓</th>
                			</tr>
                			<tr>
                				<th>1</th><th>风机1001</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>2</th><th>风机1002</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>3</th><th>风机1003</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>4</th><th>风机1004</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>5</th><th>风机1005</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>6</th><th>风机1006</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>7</th><th>风机1007</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>8</th><th>风机1008</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>9</th><th>风机1009</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>10</th><th>风机1010</th><th></th><th></th>
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
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);