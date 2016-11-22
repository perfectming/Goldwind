import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestylee.scss';
import PBAtimechart from './PBAtimechart.jsx';
import PBAtimechartt from './PBAtimechartt.jsx';
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
            <div className={styles.box}>
                <ul className={styles.monthbox}>
                    {
                        month.map((value,key)=>{
                            return(<li key={key}>{value}</li>)
                        })
                    }
                </ul>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <PBAtimechart></PBAtimechart>
                            </div>
                           
                        </div>
                    </div>
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>
                    
                </div>
                 <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                           
                            <div>
                                <PBAtimechartt></PBAtimechartt>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgq}>
                        <img src={icono}/>
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
