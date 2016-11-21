import React from 'react';
import {connect} from 'react-redux';
import styles from './Distribution.scss';
import map1 from '../img/comp/DistributionMap.jpg' ;
import leftIcon from '../img/comp/leftIcon.png' ;
import rightIcon from '../img/comp/rightIcon.png' ;
import Superleftbox from './super/superleftbox.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {clickNumber, showFlag, changeFlag, flag=true,play} = this.props;
        return (
            <div className={styles.bodyBox}>
                    <div className={`${styles.leftBox} ${flag===true? styles.animat1 : styles.animat}`}>
                        <Superleftbox></Superleftbox>
                    </div>
                <div className={styles.changeBox}>
                    <img src={flag===true? leftIcon:rightIcon} onClick={()=>{changeFlag(flag===true? true:false,flag )}}/>
                </div>
                <div className={`${styles.rightBox} ${flag===true? styles.animat3 : styles.animat2}`}>
                    <img src={map1} onClick={()=>play()}/>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        showFlag : state.vars.distributionLeftBox,
        flag:state.vars.flagff,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        play:()=>{
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('navhide', false));
        },
        changeFlag :(flag)=>{
            dispatch(actions.setVars('distributionLeftBox', flag));
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
