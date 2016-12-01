import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import TBAtimechart from './TBAtimechart.jsx';
import TBAtimechartt from './TBAtimechartt.jsx';
import icono from './wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        return (
            <div className={`${styles.box} ${styles.shadow}`}>
           
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windceebox}>
                            <div>
                            <p className={styles.titlee}>风场TBA</p>>
                                <TBAtimechart></TBAtimechart>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgqq}>
                        <img  className={styles.img}src={icono}/>
                    </div>
                    
                </div>
                 <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                             <p className={styles.titlee}>11月每日TBA</p>>
                                <TBAtimechartt></TBAtimechartt>
                            </div>
                        </div>
                    </div>
                     <div className={styles.imgqq}>
                        <img  className={styles.img}src={icono}/>
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
