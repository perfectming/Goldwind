import React from 'react';
import {connect} from 'react-redux';
import styles from './AreaKBAstyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelect.jsx';
import TableFour from './TableFour.jsx';
import TableFive from './TableFive.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
	render() {
		let data=PBAdata.data;
		return(
			<div className={styles.gbaBox}>
				<TimeSelect></TimeSelect>
				<div className={styles.content}>
					
					<div className={styles.wind}>
						<div className={styles.img}><a>图片</a></div>
						<TableFour></TableFour>
					</div>
					<div className={styles.fan}>
						<div className={styles.img}><a>图片</a></div>
						<TableFive></TableFive>
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

