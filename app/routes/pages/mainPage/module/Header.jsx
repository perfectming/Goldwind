import React from 'react';
import {connect} from 'react-redux';
import styles from './Header.scss';
import icon from './../img/icon/cloudlink.png';
var actions = require('redux/actions');
var {browserHistory} = require('react-router');
let Component = React.createClass({
    render() {
        let {headerInfo, itemActive, changeHeaderItem,login} = this.props;
        return (
            <div className={styles.navHeader}>
                <div className={styles.navIcon}>
                    <img src={icon}/>
                </div>
                <div className={styles.methodBox}>
                    {
                        headerInfo.map((value, key) => {
                          
                            
                            return (
                                <div key={key} className={itemActive === key ? styles.itemBoxAct : styles.itemBox} onClick={()=>changeHeaderItem(key,value.subPage[0].page[0].page)}>
                                    <img src={itemActive === key ? value.iconActive : value.iconNormal}/>
                                    <span>{value.name}</span>
                                    
                                </div>
                            )
                        })

                    }
                    <div className={`${styles.itemBoxAct} ${styles.nobor}`}><span>|</span></div>
                    <div className={styles.itemBox}><span onClick={()=>login()}>username</span></div>
                </div>
            </div>
        );

    }
});


const mapStateToProps = (state) => {
    return {
        itemActive: state.vars.headerItemActive,
        userInfo: state.vars.userInfo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeHeaderItem: (key,page) => {
            dispatch(actions.setVars('headerItemActive', key));
            dispatch(actions.setVars('treeItemActive', 0));
             dispatch(actions.setVars('showPage', page));
             dispatch(actions.setVars('tabItemActive', 0));
             dispatch(actions.setVars('show', false));
             dispatch(actions.setVars('colorAct', false));
             if(page=='cockpit'){
                 dispatch(actions.setVars('putpage', false));
                 dispatch(actions.setVars('navhide', false));
             }else if(page=='monitorkb'){
                 dispatch(actions.setVars('navhide', false));
                 dispatch(actions.setVars('putpage', true));
                 dispatch(actions.setVars('bodypage', true));
             }else if(page=='health_main'){
                 dispatch(actions.setVars('navhide', false));
                 dispatch(actions.setVars('putpage', true));
                 dispatch(actions.setVars('bodypage', true));
             }else{
                dispatch(actions.setVars('putpage', true));
                dispatch(actions.setVars('bodypage', true));
                dispatch(actions.setVars('navhide', true));
             }
              if(key==1){
                dispatch(actions.setVars('ifshow', true));
              }else{
                dispatch(actions.setVars('ifshow', false));
              }
        },
        login:(userInfo)=>{
            console.log(userInfo);
            if(!userInfo){
                browserHistory.push('/app/all/page/login');
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
