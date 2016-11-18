import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_r from './Hly_r.jsx';
var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
         let {buttonAction, inputOnChange, onFocus} = this.props;
        return (
           <div className={styles.box}>
                <div className={styles.tbox}>
                    <div>
                         <Hly_t></Hly_t>
                     </div>
                </div>
                <div className={styles.rbox}>
                  <Hly_r></Hly_r>
                </div>
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
