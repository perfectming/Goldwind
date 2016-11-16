import React from 'react';
import {connect} from 'react-redux';
import styles from './Fan_matrix.scss';
import Nav from '../super/nav.jsx';
var actions = require('redux/actions');





let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{play, flag, changeFlag, showFlag,i}=this.props;
        return (
            <div className={styles.bodyBox}>
                <Nav></Nav>
                <div className={styles.contentbox}>
                    
                      <div className={styles.conleft}>45</div>
                  
                    <div className={styles.conright}>65</div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {



    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (flag) => {
            var obj = {
                test:'',
                }

        },
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
