
import React from 'react';
import {connect} from 'react-redux';
import styles from './Booster.scss';
import MTitle from './mxx/MTitle';
import Corner from './super/Corner.jsx';
let boosterData = require('../../../../../config/booster-data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(boosterData);
    },

    render() {
        let{arr,jb}=this.props;
        return(
            <div className={styles.bodyBox}>
                {
                    boosterData.data.title.map((value, key)=> {
                        return (
                            <div className={styles.station} key={key}>
                                <Corner></Corner>
                                <MTitle title={[value[0]]}></MTitle>
                                <div className={styles.mainn}>
                                    <div className={value[1]===1 ? styles.hongde : false}></div>
                                    <div className={value[2]===1 ? styles.hongdee : false}></div>
                                    <div className={styles.lastt}>
                                        {
                                            boosterData.data.math[key].map((valueA,keyA)=> {
                                                return (
                                                    <div key={keyA}>{valueA}</div>
                                                )
                                            })
                                        }
                                    </div>
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
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
