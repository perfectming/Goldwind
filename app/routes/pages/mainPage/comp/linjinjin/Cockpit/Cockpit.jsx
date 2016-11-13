import React from 'react';
import {connect} from 'react-redux';
import styles from './Cockpit.scss';




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       
        return (
            <div className={styles.bodyBox}>

              adssdaf
            </div>
        );
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
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
