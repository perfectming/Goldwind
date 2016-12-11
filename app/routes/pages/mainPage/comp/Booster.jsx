
import React from 'react';
import {connect} from 'react-redux';
import styles from './Booster.scss';
import MTitle from './super/Title';
import Corner from './super/Corner.jsx';
let boosterData = require('../../../../../config/booster-data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{arr,jb,jyname,jydata}=this.props;
        console.log(jyname);
        console.log(jydata);
        return(
            <div className={styles.bodyBox}>
                {
                    boosterData.data.title.map((value, key)=> {
                        return (
                            <div className={`${styles.station} ${styles.box_shadow}`} key={key}>
                                <MTitle title={[value[0]]}></MTitle>
                                <div className={value[1]===1 ? styles.hongde : styles.lvde}></div>
                                <div className={value[2]===1 ? styles.hongdee : styles.lvdee}></div>
                                <div className={styles.lastt}>
                                    {
                                        boosterData.data.math[key].map((valueA,keyA)=> {
                                            return (
                                                <div key={keyA}>{valueA}</div>
                                            )
                                        })
                                    }
                                </div>
                                <Corner></Corner>
                                <div className={styles.mainn}>

                                </div>
                            </div>

                        )
                    })
                }
            </div>

        )
    }
});


const mapStateToProps = (state) => {
    return {
        jyname: state.vars.jyname,
        jydata: state.vars.jydata,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
