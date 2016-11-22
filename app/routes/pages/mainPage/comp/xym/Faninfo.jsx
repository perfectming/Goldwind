import React from 'react';
import {connect} from 'react-redux';
import styles from './Faninfo.scss';
var actions = require('redux/actions');
import Header from '../linjinjin/header';
import Title from '../super/Title.jsx';

let Component = React.createClass({
	componentDidMount() {
		this.props.init();
	},

	render() {
		let {value} = this.props;
		console.log(value.Wtname);
		return (
			<div className={styles.bodyBox}>
				<div className={styles.infoBox}>
					<Title title={['日发电量统计']}></Title>
				</div>
				
			</div>
		)
	}
});




const mapStateToProps = (state) => {
    return {
        value : state.vars.value,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        	
            var obj = {
                test:''
            }
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
