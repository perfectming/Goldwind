import React from 'react';
import {connect} from 'react-redux';
import styles from './Baotoustyle.scss';
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
           		<div className={styles.left}>
           			<div className={styles.firstfloor}>
           				<div className={`${styles.section} ${styles.boxShadow}`}>
           					<div className={styles.sectionbar}>
           						<span>当前{data.firstfloor[1].small}分</span><br/><br/>
           						<span>总分{data.firstfloor[1].big}分</span>
           					</div>
           					<div className={styles.sectiontwo}>
           						<div className={styles.pie}>
           						<span className={styles.numBox}><p style={{color:'#E9C75C'}}>{((data.firstfloor[1].small/data.firstfloor[1].big)*100).toFixed(1)}%</p>健康度</span>
           						<Pie2 color={['#E9C75C','#A69263']} num={[35,15]}></Pie2>
           						</div>
           						<span className={styles.linkS}></span><br/><span className={styles.linkT}></span>
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
           						<Pie2 color={['#D06960','#954A45']} num={[85,15]}></Pie2>
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
           						<Pie2 color={['#70C080','#4A7A59']} num={[65,15]}></Pie2>
           					</div>
           				</div>
           			</div>
           			<div className={styles.secondfloor}>
           				<div className={`${styles.electric} ${styles.boxShadow}`}>
           					<div className={styles.electricHeader}><a>图片</a>发电量</div>
           					<div className={styles.electricFirst}>
           						<div><a>图片</a>{data.electric[0].name}</div>
           						<div className={styles.electricTotal}>{data.electric[0].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[0].actrul/data.electric[0].should*100).toFixed(1))+"%"}}>{(data.electric[0].actrul/data.electric[0].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricSecond}>
           						<div><a>图片</a>{data.electric[1].name}</div>
           						<div className={styles.electricTotal}>{data.electric[1].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[1].actrul/data.electric[1].should*100).toFixed(1))+"%"}}>{(data.electric[1].actrul/data.electric[1].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           					<div className={styles.electricThird}>
           						<div><a>图片</a>{data.electric[2].name}</div>
           						<div className={styles.electricTotal}>{data.electric[2].actrul}kWh</div>
           						<div className={styles.electricPercent}>
           							<div style={{width:((data.electric[2].actrul/data.electric[2].should*100).toFixed(1))+"%"}}>{(data.electric[2].actrul/data.electric[2].should*100).toFixed(1)}%</div>
           						</div>
           					</div>
           				</div>
           				<div className={`${styles.yearelectric} ${styles.boxShadow}`}>
           					<div className={styles.head}>年发电量</div>
           					<div>
           						<Yearelectric title={data1.yearelectric[0].title[0]} month={data1.yearelectric[0].month} plan={data1.yearelectric[0].plan} actrul={data1.yearelectric[0].actrul} unit={data1.yearelectric[0].unit[1]} nameOne={data1.yearelectric[0].name[0]} nameTwo={data1.yearelectric[0].name[1]}></Yearelectric>
           					</div>
           				</div>
           				<div className={`${styles.yearprofit} ${styles.boxShadow}`}>
           					<div className={styles.head}>年收益</div>
           					<div>
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
	           					<th>风场名</th>
	           					<th className={styles.click}>PBA ↑↓</th>
	           					<th className={styles.click}>停机时间 ↑↓</th>
                			</tr>
                			<tr>
                				<th>1</th><th>风场1</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>2</th><th>风场2</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>3</th><th>风场3</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>4</th><th>风场4</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>5</th><th>风场5</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>6</th><th>风场6</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>7</th><th>风场7</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>8</th><th>风场8</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>9</th><th>风场9</th><th></th><th></th>
                			</tr>
                			<tr>
                				<th>10</th><th>风场10</th><th></th><th></th>
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