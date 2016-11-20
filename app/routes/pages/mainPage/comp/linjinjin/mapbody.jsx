import React from 'react';
import {connect} from 'react-redux';
import styles from './mapbodyy.scss';
import Fcone from './fengchang/fcone.jsx';
import Fctwo from './fengchang/fctwo.jsx';
import Nav from '../super/nav.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {showPage1,tab} = this.props;
        console.log(tab);
        return (
            <div className={styles.bodyBox }>
             <Nav title={tab}></Nav>
                {showPage1 === 'fcone' && <Fcone></Fcone>}
                {showPage1 === 'fctwo' && <Fctwo></Fctwo>}
                
              
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        showPage1: state.vars.showPage1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('showPage1','fcone'))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
