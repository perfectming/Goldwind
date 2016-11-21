import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_a from './Hly_a.jsx';
import Hly_pba from './Hly_pba.jsx';
import Hly_pbas from './Hly_pbas.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
import Hly_d from './Hly_d.jsx';
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
                        <Hly_a></Hly_a>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_pba></Hly_pba>
                    </div>

                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox3}>
                            {
                                button.map((value,key)=>{
                                    return(
                                        <button key={key} className={styles.button}>
                                            {value}
                                        </button>
                                    )
                                })
                            }
                        </div>



                        <div className={styles.rbox4}>
                            <Hly_pbas></Hly_pbas>
                            <div className={styles.logo}>

                            </div>
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
