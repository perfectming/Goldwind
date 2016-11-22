import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Reg_tba from './Reg_tba.jsx';
import Reg_tbas from './Reg_tbas.jsx';
import Hly_regpbas from './Hly_regpbas.jsx';
import Hly_a from './Hly_a.jsx';

var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let button=data.data.button;

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {buttonAction, inputOnChange, onFocus} = this.props;
        return (




            <div className={styles.box}>


                <div className={styles.onmonth}>
                    {
                        month.map((value, key) => {
                            return (
                                <div className={styles.inmonth} key={key}>
                                    {value}
                                </div>
                            )
                        })
                    }
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Reg_tba></Reg_tba>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow}`}>
                        <Reg_tbas></Reg_tbas>
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
                test: ''
            }
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
