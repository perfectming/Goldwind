import React from 'react';
import {connect} from 'react-redux';
import styles from './LoseElectricstyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelectTwo.jsx';
import ChartOne from './ChartOne.jsx';
import ChartFive from './ChartFive.jsx';

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
						<div className={styles.areaLose}>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={data.data[0].text[0]} lose={data.lose}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={data.data[0].text[1]} lose={data.lose}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={data.data[0].text[2]} lose={data.lose}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={data.data[0].text[3]} lose={data.lose}></ChartOne>
							</div>
						</div>
						<div className={`${styles.lose} ${styles.boxShadow}`}>
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

