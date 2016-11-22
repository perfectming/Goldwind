import React from 'react';
import {connect} from 'react-redux';
import styles from './Fan_matrix.scss';
import Headernav from './header.jsx';
import Bodymap from './mapbody.jsx';
var actions = require('redux/actions');
let page1 = require('./mappage');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changeFlag, changnav=0,hiden=false}=this.props;
       
        return (
            <div className={styles.bodyBox}>
                <Headernav fcpage={page1.header}></Headernav>
                <Bodymap tab={page1.header[changnav].rightpagge}></Bodymap>

            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        changnav : state.vars.Changnav,
        flag : state.vars.flagff,
        hiden : state.vars.hiden,

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
             dispatch(actions.setVars('hiden', false));

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
