import React from 'react';
import {connect} from 'react-redux';
import styles from './Health_main.scss';


var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {key1,} = this.props;
        return(
            <iframe name="myFrame" className={styles.bodyBox} src="../../../static/sphm/Healthy_index.html" scrolling="no"></iframe>
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
        changeTableItem: (key1) => {


        }
};
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
