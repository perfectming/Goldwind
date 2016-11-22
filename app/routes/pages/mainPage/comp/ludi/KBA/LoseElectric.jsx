import React from 'react';
import {connect} from 'react-redux';
import styles from './LoseElectricstyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelectTwo.jsx';
import ChartOne from './ChartOne.jsx';
import ChartTwo from './ChartTwo.jsx';
import ChartThree from './ChartThree.jsx';
import ChartFour from './ChartFour.jsx';
import ChartFive from './ChartFive.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
	render() {
		let data=PBAdata.data;
		return(
			<div className={styles.bodyBox}>
				<TimeSelect></TimeSelect>
				<div className={styles.content}>
					<div className={styles.areaLose}>
						<div className={styles.areaSection}>
							<ChartOne></ChartOne>
						</div>
						<div className={styles.areaSection}>
							<ChartTwo></ChartTwo>
						</div>
						<div className={styles.areaSection}>
							<ChartThree></ChartThree>
						</div>
						<div className={styles.areaSection}>
							<ChartFour></ChartFour>
						</div>
					</div>
					<div className={styles.border}></div>
					<div className={styles.lose}>
						<ChartFive></ChartFive>
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

