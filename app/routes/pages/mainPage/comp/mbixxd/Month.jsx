import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
import Mon from './Mon.scss';
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {month,arr,actbt=0,changpage } = this.props;
        return (
            <ul className={Mon.monthbox}>
                {
                    month.map((value,key)=>{
                        return(<li className={actbt===key? Mon.red : Mon.green} key={key}onClick={()=>changpage(value,key)}>{value}</li>)
                    })
                }
            </ul>

        );
    }
});


const mapStateToProps = (state) => {
    return {
        actbt : state.vars.actbt,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changpage :(value,key)=>{
            dispatch(actions.setVars('actbt',key ));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
