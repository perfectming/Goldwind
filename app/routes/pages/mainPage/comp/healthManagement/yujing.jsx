import React from 'react';
import {connect} from 'react-redux';
import styles from './main_style.scss';
let timer;
var actions = require('redux/actions');

let Component = React.createClass({
    componentWillMount() {
        localStorage.setItem("keyone", 1);
        localStorage.setItem("keytwo", 0);
    },
    componentDidMount() {
        let {changekey} = this.props;
        this.props.init();
        timer = setInterval(function(){
            changekey()
        },200)
    },
    componentWillUnmount: function(){
        clearInterval(timer);
    },
    render() {
        return(
            <iframe className={styles.bodyBox} src="../../../static/sphm/yj_index.html" scrolling="no"></iframe>
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
        },
        changekey: () => {
            dispatch(actions.setVars('treeItemActive', localStorage.keyone));
            if( localStorage.keyone == 0 ){
                dispatch(actions.setVars('navhide',false ));
            }else {
                // dispatch(actions.setVars('tabItem', true));
                dispatch(actions.setVars('navhide', true));
                dispatch(actions.setVars('tabItemActive', localStorage.keytwo));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
