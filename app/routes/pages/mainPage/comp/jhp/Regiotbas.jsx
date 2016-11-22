import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Reg_tbat from './Reg_tbat.jsx';
import Reg_tbats from './Reg_tbats.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_ds from './Hly_ds.jsx';
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
                        <Reg_tbat></Reg_tbat>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox} `}>
                    <div className={` ${styles.logofa} ${styles.box_shadow}`}>
                        <Reg_tbats></Reg_tbats>
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
