import React from 'react';
import {connect} from 'react-redux';
import styles from './Health_main.scss';


var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        return(
            <iframe className={styles.bodyBox} src="../../../static/sphm/Healthy_index.html" scrolling="no"></iframe>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
