import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
import styles from './cgt.scss';
import cgt1 from '../../../../../img/comp/cgt1.png';
let data = require('../../date');




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{ flag=true, changpage, fcpage }=this.props;
        return (

            <div className={styles.bodybox}>
                <div className={styles.infotitle1}>
                    <div className={styles.infobox}>
                        <span className={styles.boxname}>电流</span>
                        <a><b>8.33</b><span className={styles.unit}>A</span></a>
                    </div>

                    <div className={styles.infobox}>
                        <span className={styles.boxname}>电压</span>
                        <a><b>12</b><span className={styles.unit}>V</span></a>
                    </div>
                    <div className={styles.infobox}>
                        <span className={styles.boxname}>有功功率</span>
                        <a><b>20</b><span className={styles.unit}>W</span></a>
                    </div>
                </div>
                <img className={styles.com1} src={cgt1}/>
                <div className={styles.infotitle2}>
                    <div className={styles.infobox}>
                        <span className={styles.boxname}>电流</span>
                        <a><b>8.33</b><span className={styles.unit}>A</span></a>
                    </div>

                    <div className={styles.infobox}>
                        <span className={styles.boxname}>电压</span>
                        <a><b>12</b><span className={styles.unit}>V</span></a>
                    </div>
                    <div className={styles.infobox}>
                        <span className={styles.boxname}>有功功率</span>
                        <a><b>20</b><span className={styles.unit}>W</span></a>
                    </div>
                </div>
                <img className={styles.com2} src={cgt1}/>

                <div className={styles.infotitle}>
                    <div className={styles.item}>
                        <div className={styles.itemimg}></div>
                        <div className={styles.itembox}>
                            <p className={styles.itemp}>{data.cft[0].name}</p>
                            <p><b>{data.cft[0].num}</b><a>{data.cft[0].unit}</a></p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemimg1}></div>
                        <div className={styles.itembox}>
                            <p className={styles.itemp}>{data.cft[1].name}</p>
                            <p><b>{data.cft[1].num}</b><a>{data.cft[1].unit}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (flag) => {
            var obj = {
                test:'',
            }

        },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
