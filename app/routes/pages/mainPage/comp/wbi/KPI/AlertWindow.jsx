import React from 'react';
import {connect} from 'react-redux';
import styles from './AlertStyle.scss';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
    	this.props.init();
    },

    render() {
    	let {text,buttonClose,alertBool=true}=this.props;
    	return(
    		<div className={alertBool==true? styles.hideBox:styles.container}>
	    		<div className={styles.alertBox}>
	    			<div className={styles.header}>提示</div>
	    			<div className={styles.warning}>{text}</div>
	    			<div className={styles.close}><span onClick={()=>buttonClose(alertBool)}>确定</span></div>
	    		</div>
	    	</div>
    	)
    }
});

const mapStateToProps = (state) => {
    return {
    	alertBool : state.vars.alertBool,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	init: () => {

    	},
    	buttonClose: (alertBool) => {
            dispatch(actions.setVars('alertBool', true));
        },
    }
};    

export default connect(mapStateToProps, mapDispatchToProps)(Component);    
