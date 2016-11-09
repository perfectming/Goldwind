import React from 'react';
import {connect} from 'react-redux';
import styles from './Booster.scss';
var {getState} = require('../../../../redux/store');
import Title from './super/Title.jsx';
import Corner from './super/Corner.jsx';
let boosterData = require('../../../../../config/booster-data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init(boosterData);
    },

    render() {
        let{arr}=this.props;
        return(
            <div className={styles.bodyBox}>
                {
                    boosterData.data.title.map((value, key)=> {
                        return (
                            <div className={styles.station} key={key}>
                                <Title>
                                    <div className={styles.titleChange} >{value}</div>
                                </Title>
                                <Corner></Corner>
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
