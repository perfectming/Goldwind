import React from 'react';
import {connect} from 'react-redux';
import styles from './DeviceStyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelectTwo.jsx';
import ChartPie from './ChartPie.jsx';


var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
	render() {
		let data=PBAdata;
		return(
			<div className={styles.bodyBox}>
					<TimeSelect></TimeSelect>
					<div className={styles.content}>
						<div className={styles.floorOne}>
							<div className={`${styles.boxOne} ${styles.boxShadow}`}>
								<div className={styles.boxText}>集团1区域1风场1<br/>损失电量分布图</div>
								<div className={styles.chartBox}>
									<ChartPie text={data.data[0].text1[0]} lose={data.type1}></ChartPie>
								</div>
							</div>
							<div className={`${styles.boxTwo} ${styles.boxShadow}`}>
								<ChartPie text={data.data[0].text1[1]} lose={data.type2}></ChartPie>
							</div>
							<div className={`${styles.boxThree} ${styles.boxShadow}`}>
								<ChartPie text={data.data[0].text1[2]} lose={data.type3}></ChartPie>
							</div>
						</div>
						<div className={styles.floorTwo}>
							<div className={`${styles.boxOne} ${styles.boxShadow}`}>
								<div className={styles.boxText}>集团2区域1风场2<br/>损失电量分布图</div>
								<div className={styles.chartBox}>
									<ChartPie text={data.data[0].text1[0]} lose={data.type1}></ChartPie>
								</div>
							</div>
							<div className={`${styles.boxTwo} ${styles.boxShadow}`}>
								<ChartPie text={data.data[0].text1[1]} lose={data.type2}></ChartPie>
							</div>
							<div className={`${styles.boxThree} ${styles.boxShadow}`}>
								<ChartPie text={data.data[0].text1[2]} lose={data.type3}></ChartPie>
							</div>
						</div>
					</div>
			</div>
			
			
		)
		
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