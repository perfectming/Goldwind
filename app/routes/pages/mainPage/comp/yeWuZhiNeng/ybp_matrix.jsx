import React from 'react';
import {connect} from 'react-redux';
import styles from './ybp_matrix.scss';
import Headernav from './header.jsx';
import Ybpbody from './ybpbody';
let page1 = require('./ybppage1');
var actions = require('redux/actions');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{changnav=0}=this.props;

        return (
            <div className={styles.bodyBox}>
                <Headernav></Headernav>
                {/*<Ybpbody tab={page1.header[changnav].ypage}></Ybpbody>*/}

            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        changnav : state.vars.Changnav,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            // dispatch(actions.setVars('Changnav', 0));
            dispatch(actions.setVars('navhide', false));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
