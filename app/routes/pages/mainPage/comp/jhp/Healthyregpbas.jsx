import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_regpbat from './Hly_regpbat.jsx';
import Hly_regpbats from './Hly_regpbats.jsx';

var actions = require('redux/actions');


let data = require('./Healthy-data');
let month=data.data.line_month;


let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {buttonAction, inputOnChange, onFocus} = this.props;
        return (




            <div className = {styles.box}>







                <div className={styles.tbox}>
                    <div className={styles.box_shadow}>
                        <Hly_regpbat></Hly_regpbat>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox} `}>
                    <div className={` ${styles.logofa} ${styles.box_shadow}`}>
                        <Hly_regpbats></Hly_regpbats>
                        <div className={styles.logomini}>

                        </div>
                    </div>
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
