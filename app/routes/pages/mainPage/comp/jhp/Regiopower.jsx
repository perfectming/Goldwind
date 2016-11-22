import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';

import Reg_pa from './Reg_pa.jsx';
import Reg_pb from './Reg_pb.jsx';

;
var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;


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
                        <Reg_pa></Reg_pa>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow}`}>
                        <Reg_pb></Reg_pb>
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
