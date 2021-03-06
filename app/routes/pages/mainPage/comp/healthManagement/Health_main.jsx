import React from 'react';
import {connect} from 'react-redux';
import styles from './Health_main.scss';
let timer;
var actions = require('redux/actions');


let Component = React.createClass({
    componentWillMount() {
        localStorage.setItem("keyone", 0);
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
        let {} = this.props;
            return(
                <iframe id="myFrame" className={styles.bodyBox} src="../../../static/sphm/Healthy_index.html" scrolling="no"></iframe>
            )



    }
});


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
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
