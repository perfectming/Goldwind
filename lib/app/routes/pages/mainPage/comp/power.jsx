import React from 'react';
import {connect} from 'react-redux';
import styles from './power.scss';
import Bar_l from './power/Bar_l.jsx';
import Bar_r from './power/Bar_r.jsx';
import Line_l from './power/Line_l.jsx';
import Line_r from './power/Line_r.jsx';

var actions = require('redux/actions');
let comps = require('../../../../../config/comp');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
         let {buttonAction, inputOnChange, onFocus} = this.props;
        let comp = comps.comps.from;
        return (
            <div className={styles.powerBox}>
                <div className={styles.inquireBox}>
                    {
                        comp.map((value, key)=> {
                            if (value.type === 'date') {
                                return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                            } else if (value.type === 'select') {
                                return (
                                    <div className={styles.seleBox} key={key}>
                                        <select>
                                            {value.select.map((value, key)=> {
                                                return (
                                                    <option value={value} key={key}>{value}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                )
                            } else if (value.type === 'button') {
                            return (
                                <div className={styles.btnBox} key={key}>
                                    <button onClick={()=>buttonAction(value)}>{value.title}</button>
                                </div>
                            )
                        }
                        })
                    }
                </div>
                <div className={styles.chartBox}>
                    <div className={styles.barOne}>
                        <Bar_l></Bar_l>
                    </div>
                    <div className={styles.barTwo}>
                        <Bar_r></Bar_r>
                    </div>
                    <div className={styles.lineOne}>
                        <Line_l></Line_l>
                    </div>
                    <div className={styles.lineTwo}>
                        <Line_r></Line_r>
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
