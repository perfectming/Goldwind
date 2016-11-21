import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_ts from './Hly_ts.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_d from './Hly_d.jsx';
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
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                         <Hly_ts></Hly_ts>
                        <div className={styles.logo}>

                        </div>
                     </div>
                </div>

               <div className={styles.clear}>

               </div>
               <div className={`${styles.fbox}  ${styles.logofa}`}>
                      <div className={`${styles.box_shadow}`}>
                       <Hly_d></Hly_d>
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
