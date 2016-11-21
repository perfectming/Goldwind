import React from 'react';
import {connect} from 'react-redux';
import styles from './Faninfo.scss';
var actions = require('redux/actions');
import Header from '../linjinjin/header';

let Component = React.createClass({
	componentDidMount() {
		this.props.init();
	},

	render() {
		let {} = this.props;
		return (
			<div>
				<Header></Header>
			</div>
		)
	}
});




const mapStateToProps = (state) => {
    return {
        // valuepage : state.vars.valuepage,
    }
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
