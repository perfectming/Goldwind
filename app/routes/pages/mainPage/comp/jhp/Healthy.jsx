import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_d from './Hly_d.jsx';
var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barLoTime1 = data.data.line_month;
let barLoPowerValue1 = data.data.bar_loPower;
let text0=data.data.line_date;
let text1=data.data.text5;
let barRotime = data.data.bar_rotime;
let barLotime = data.data.bar_lotime;
let barLoPowerValue = data.data.bar_loPower;
let barLdpowerValue1 = data.data.line_date;
let barLpdpowerValue1 = data.data.line_pdate;



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
         let {buttonAction, inputOnChange, onFocus,befor_pages = 'group', returnit} = this.props;
        return (




           <div className = {styles.box}>
                <div className={styles.return2} onClick={() => returnit(befor_pages)}>返回</div>
                <div className={styles.tbox2}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_t barLoTime={barLoTime1} barLoPowerValue={barLoPowerValue1}  text={"集团每月健康度"} ></Hly_t>

                        <div className={styles.logo}>

                        </div>
                     </div>
                </div>

               <div className={styles.clear}>

               </div>
               <div className={`${styles.fbox}  ${styles.logofa}`}>
                      <div className={`${styles.box_shadow}`}>
                       <Hly_d barLpdpowerValue={barLpdpowerValue1} barLdpowerValue={barLdpowerValue1} text={text0[4]+"月每日健康度"}></Hly_d>
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
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
