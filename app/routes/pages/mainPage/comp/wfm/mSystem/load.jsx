import React from 'react';
import {connect} from 'react-redux';
import styles from './load.scss';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {buttonClose,boolAlert=true}=this.props;
        return(
            <div className={boolAlert==true? styles.hideBox:styles.container}>
                <div className={styles.alertBox}>
                    <div className={styles.header}>提示</div>
                    <div className={styles.warning}>执行中，请稍等……</div>
                </div>
            </div>
        )
    }
});

const mapStateToProps = (state) => {
    return {
        boolAlert : state.vars.boolAlert,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },
        buttonClose: (boolAlert) => {
            dispatch(actions.setVars('boolAlert', true));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
