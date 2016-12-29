//设备状态统计用例规划
import React from 'react';
import {connect} from 'react-redux';
import styles from './stateCountStyle.scss';
import Login from '../../../../../../components/common/Loading.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentWillMount() {
		this.props.ajax();
    },
    componentDidlMount() {
		this.props.init();
    },
    render() {
    	return(

    	)
    }
});
const mapStateToProps = (state) => {
    return{
        
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        ajax: () => {

        },
        init: () => {

        },
    }
};        