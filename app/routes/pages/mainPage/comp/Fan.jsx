import React from 'react';
import {connect} from 'react-redux';
import styles from './Fan.scss';
let fanData = require('../../../../../config/fan-data');



let Component = React.createClass({
    componentDidMount() {
        this.props.init(fanData);
    },

    render() {
        return (
            <div className={styles.listbodyBox}>
                {
                    fanData.data.area.map((value, key)=> {
                        return (
                            <div className={styles.listheaderBox} key={key}>
                                <button className={styles.listbtn}>{value}</button>
                                <div className={styles.listopt}>
                                    {
                                        fanData.data.power.map((valueA, keyA)=> {
                                            return (
                                                keyA !== key ? false : valueA.map((valueB, keyB)=> {
                                                    if(valueB <= 200){
                                                        return (
                                                            <button className={styles.listoptbtn_2} key={keyB}>{valueB}</button>
                                                        )
                                                    }else if(valueB <= 400){
                                                        return (
                                                            <button className={styles.listoptbtn_4} key={keyB}>{valueB}</button>
                                                        )
                                                    }else if(valueB <= 600){
                                                        return (
                                                            <button className={styles.listoptbtn_5} key={keyB}>{valueB}</button>
                                                        )
                                                    }else if(valueB <= 800){
                                                        return (
                                                            <button className={styles.listoptbtn_1} key={keyB}>{valueB}</button>
                                                        )
                                                    }else if(valueB <= 1000){
                                                        return (
                                                            <button className={styles.listoptbtn_3} key={keyB}>{valueB}</button>
                                                        )
                                                    }
                                                })
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                        
                    })
                   
                }
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
