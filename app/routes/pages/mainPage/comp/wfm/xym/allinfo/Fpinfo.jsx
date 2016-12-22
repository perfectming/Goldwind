import React from 'react';
import {connect} from 'react-redux';
import styles from './Fpinfo.scss';
import Headernav from '../../linjinjin/header.jsx';
import Faninfo from '../Faninfo.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changeFlag, changnav=0}=this.props;
       
        return (
            <div className={styles.bodyBox}>
                <Headernav></Headernav>
                <Faninfo></Faninfo>

            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        changnav : state.vars.Changnav,
        flag : state.vars.flagff,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (flag) => {
            var obj = {
                test:'',
                }
             dispatch(actions.setVars('Changnav', 0));
             dispatch(actions.setVars('navhide', false));

        },
         changeFlag :(flag)=>{
            
            if(flag){
                flag=false;
            }else{
                flag=true;
            };
            dispatch(actions.setVars('flagff', flag));
        }
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
