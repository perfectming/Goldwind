import React from 'react';
import {connect} from 'react-redux';
import styles from './TopTenStyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelectTwo.jsx';
import ChartPie from './ChartPie.jsx';
import OneColumn from './OneColumn.jsx';


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
						<div className={`${styles.pie} ${styles.boxShadow}`}>
							<ChartPie text={data.data[0].text[1]} lose={data.lose}></ChartPie>
						</div>
						<div className={`${styles.column} ${styles.boxShadow}`}>
							<OneColumn name={data.data[3].name} title={data.data[3].title} month={data.data[3].month} plan={data.data[3].plan} unit={data.data[3].unit}></OneColumn>
						</div>
					</div>
					<div className={styles.floorTwo}>
						<div className={`${styles.pie} ${styles.boxShadow}`}>
							<ChartPie text={data.data[0].text[1]} lose={data.lose}></ChartPie>
						</div>
						<div className={`${styles.column} ${styles.boxShadow}`}>
							<OneColumn name={data.data[3].name} title={data.data[3].title} month={data.data[3].month} plan={data.data[3].plan} unit={data.data[3].unit}></OneColumn>
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