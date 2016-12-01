import React from 'react';
import {connect} from 'react-redux';
import styles from './Pvinfo.scss';
import Header from '../linjinjin/header';
import Title from '../super/Title.jsx';
import Pwschart from './allinfo/Pwschart.jsx';
import Pwschart2 from './allinfo/Pwschart2.jsx';
var actions = require('redux/actions');
var $ = require('jquery');

let data = require('./pvdata.js');



// console.log(WNACTemp);
// console.log(fmvalue);
let Component = React.createClass({
	componentDidMount() {
		this.props.init();
	},

	render() {
		let {value,fanid} = this.props;
		// console.log(fmvalue.StatusCode);
		let x;
		let code = value.WTStateCode;
		switch(code)
			{
				case "DisComForPre":
					x = "离线";
					break;
				case "DisComForPlc":
					x = "离线";
					break;
				case "Unknown":
					x = "离线";
					break;
				case "Online":
					x = "正常发电";
					break;
				case "LimitPow":
					x = "正常发电";
					break;
				case "Alarm":
					x = "正常发电";
					break;
				case "Fault":
					x = "故障停机";
					break;
				case "Offline":
					x = "待机";
					break;
				case "ProtoectStop":
					x = "待机";
					break;
				case "LimitPowStop":
					x = "待机";
					break;
				default:
					x = "维护";
					break;
			}
		// console.log(code);
		return (
			<div className={styles.bodyBox}>
				<div className={styles.fanidbox}>
					<div>风机名称：{value.Wtname}</div>
					<div>风机型号：{value.Wtid}</div>
					<div>运行状态：{x}</div>
					<div>首次并网日期：{value.Wtname}</div>
				</div>
				<div className={`${styles.pvleftbox} ${styles.infofL}`}>
					<Title title={['状态统计']}></Title>
					
					<div className={`${styles.pvoption} ${styles.infofL11111111}`}>
						{/* <div className={styles.actionbox}>
							<div>启动</div>
							<div>停机</div>
							<div>复位</div>
							<div>测试</div>
						</div> */}
					</div>
					<div className={styles.option1box}>
						{
							data.pv_name.map((value, key) => {
								return (
									<div className={styles.pvdatabox} key = {key}>
										<span>{value}</span>
										<span className={styles.numbox}><span>0</span><span>{data.pv_unit[key]}</span></span>
									</div>
								)
							})
						}
					</div>
				</div>
				<div className={`${styles.pvmidbox} ${styles.infofL}`}>
					<Title title={['汇流箱信息']}></Title>
					<div className={styles.midtitlebox}><span>支线</span><span>电流</span><span>电压</span></div>
					<div className={styles.midoptionbox}>
						{
							data.pv_line.map((value, key) => {
								return (
									<div className={styles.pvdatabox2} key = {key}>
										<span>{value}</span>
										<span>0</span>
										<span>0</span>
										
									</div>
								)
							})
						}
					</div>
				</div>
				<div className={`${styles.pvrightbox} ${styles.infofL}`}>
					{
						data.pv_wtname.map((value, key) => {
								return (
									<div className={`${styles.itembox} ${styles.itemL}`} key = {key}>
										<div className={styles.namebox}>{value}</div>
										<div className={styles.itemrightbox}>
										<div className={styles.itemrightT}>
											<p>电流</p>
											<p><span>0</span><span>A</span></p>
										</div>
										<div className={styles.itemrightB}>
											<p>电压</p>
											<p><span>0</span><span>V</span></p>
										</div>
									</div>
									</div>
								)
							})
					}
				</div>
			</div>
		)
	}
});




const mapStateToProps = (state) => {
    return {
        value : state.vars.value,
        fanid : state.vars.valueid,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
