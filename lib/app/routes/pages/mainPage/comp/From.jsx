import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

import styles from './From.scss';

let data = require('../../../../../config/data');
let comps = require('../../../../../config/comp');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {buttonAction, inputOnChange, onFocus} = this.props;
        let comp = comps.comps.from;
        return (
            <div className={styles.bodyBox}>
                {
                    comp.map((value, key)=> {
                        if (value.type === 'input') {
                            return (
                                <div className={styles.fromBox} key={key}>
                                    <input placeholder={value.content}
                                           onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                           onFocus={()=>onFocus} style={{width:value.width}}/>
                                </div>
                            )
                        } else if (value.type === 'button') {
                            return (
                                <div className={styles.fromBox} key={key}>
                                    <button placeholder={value.content}
                                            onClick={()=>buttonAction(value)}>{value.title}</button>
                                </div>
                            )
                        } else if (value.type === 'date') {
                            return (
                                <div className={styles.fromBox} key={key}>
                                    <input placeholder={value.content} type='date' style={{width:value.width}}/>
                                </div>
                            )
                        } else if (value.type === 'chcekBox') {
                            return (
                                <div className={styles.fromBox} key={key}>
                                    <input placeholder={value.content} type='checkbox'
                                           style={{fontSize:30}}/>{value.title}
                                </div>
                            )
                        } else if (value.type === 'select') {
                            return (
                                <div className={styles.fromBox} key={key}>
                                    <select>
                                        {value.select.map((value, key)=> {
                                            return (
                                                <option value={value} key={key}>{value}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )
                        } else if (value.type === 'textarea') {
                            return (
                                <div className={styles.fromBox} key={key}>
                                    <textarea rows={value.rows} cols={value.cols} style={{resize:'none'}} defaultValue={value.content}/>
                                </div>
                            )
                        }
                    })
                }

            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        inputValue: state.objs.intellV2InputValue,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        inputOnChange: (value, id)=> {
            console.log(value + '...' + id);

        },
        buttonAction: (value)=> {
            console.log(value);
        },
        onFocus: ()=> {
            alert('我获取了焦点');
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
