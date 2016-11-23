import React from 'react';
import {connect} from 'react-redux';
import styles from './Faninfo.scss';
import Header from '../linjinjin/header';
import Title from '../super/Title.jsx';
var actions = require('redux/actions');
var $ = require('jquery');
let Component = React.createClass({
	componentDidMount() {
		this.props.init();
	},

	render() {
		let {value,fanid} = this.props;
		console.log(value.Wtname);
		console.log(fanid);
		let x;
		let code = value.WTStateCode;
		switch(code)
			{
				case "DisComForPre":
					x = "离线";
					break;
				case 1:
					x = "离线";
					break;
				case 2:
					x = "离线";
					break;
				case 3:
					x = "离线";
					break;
				case 4:
					x = "离线";
					break;
				case 5:
					x = "离线";
					break;
				case 6:
					x = "离线";
					break;
				case 7:
					x = "离线";
					break;
				case 8:
					x = "离线";
					break;
				case 9:
					x = "离线";
					break;
				case 10:
					x = "离线";
					break;
			}
		console.log(code);
		return (
			<div className={styles.bodyBox}>
				<div className={styles.fanidbox}>
					<div>风机名称：{value.Wtname}</div>
					<div>风机型号：{value.Wtid}</div>
					<div>运行状态：{x}</div>
					<div>首次并网日期：{value.Wtname}</div>
				</div>
				<div className={`${styles.infoBox} ${styles.infofL}`}>
					<div className={`${styles.infoBox1} ${styles.infofL}`}>
						<Title></Title>
					</div>
					<div className={`${styles.infoBox2} ${styles.infofL}`}>
						<Title></Title>
						<div id="wsBox" className={`${styles.wsbox1} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>风速</p></div>
							<div className={styles.wsdialbox}>
								<div id="wspoint" className={styles.wsipbox}>

								</div>
							</div>
						</div>
						<div className={`${styles.wsbox2} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>有功功率</p></div>
							<div className={styles.wsdialbox}>
								<div id="wspoint" className={styles.wsipbox}>

								</div>
							</div>
						</div>
						<div className={`${styles.wsbox3} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>叶轮转速</p></div>
							<div className={styles.wsdialbox}>
								<div id="wspoint" className={styles.wsipbox}>

								</div>
							</div>
						</div>
						<div className={`${styles.wsbox4} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>发电机转速</p></div>
							<div className={styles.wsdialbox}>
								<div id="wspoint" className={styles.wsipbox}>

								</div>
							</div>
						</div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className={`${styles.infoBox3} ${styles.infofL}`}>
						<Title></Title>
					</div>
					<div className={`${styles.infoBox4} ${styles.infofL}`}>
						<Title></Title>
					</div>
					<div className={`${styles.infoBox5} ${styles.infofL}`}>
						<Title></Title>
					</div>
					<div className={`${styles.infoBox6} ${styles.infofL}`}>
						<Title></Title>
					</div>
					<div className={`${styles.infoBox7} ${styles.infofL}`}>
						<Title></Title>
					</div>
				</div>
				<div className={`${styles.fanrightbox} ${styles.infofL}`}>
					<Title></Title>
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
        	var yy = 130;
        	$("#wspoint").animate({ textIndent: 0 }, { 
				step: function(now,fx) {
 				$(this).css('-webkit-transform-origin','center right'); 
				$(this).css('-webkit-transform','rotate('+yy+'deg)'); 
			}, 
        		},5000)
        
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
