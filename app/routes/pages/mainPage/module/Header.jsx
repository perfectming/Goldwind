import React from 'react';
import {connect} from 'react-redux';
import styles from './Header.scss';
import icon from './../img/icon/cloudlink.png';
import changeC from './../img/comp/colorchange.png';
var actions = require('redux/actions');
var {browserHistory} = require('react-router');
let Component = React.createClass({
     componentDidMount() {
        this.props.init();
    },
    render() {
        let {headerInfo, itemActive, changeHeaderItem,login,userNameT} = this.props;
        return (
            <div className={styles.navHeader}>
                <div className={styles.navIcon}>
                    <img src={icon}/>
                </div>
                <div className={styles.methodBox}>
                    {  console.log(headerInfo[0].iconActive),
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
                    <div className={styles.itemBox}><span style={{fontSize:'16px',marginRight:'0px'}}><img src={changeC} id='citem'/></span></div>
                    <div className={ styles.pagestyle} id='shows'>
                        <div className={ styles.itemstyle} style={{borderColor:'#000'}}>魅力纯黑</div>
                        <div className={ styles.itemstyle} style={{borderColor:'#2ff4fb'}}>海蓝之心</div>
                        <div className={ styles.itemstyle} style={{borderColor:'#fff'}}>洁白天使</div>
                    </div>
                    <div className={styles.itemBox}><span style={{fontSize:'16px',marginRight:'10px'}}>{userNameT}</span></div>
                    <div className={styles.itemBox}><span style={{fontSize:'16px'}} onClick={()=>login()}>退出</span></div>
                </div>
            </div>
        );

    }
});


const mapStateToProps = (state) => {
    return {
        itemActive: state.vars.headerItemActive,
        userInfo: state.vars.userInfo,
        userNameT: state.vars.userNameT,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init:()=>{
            $('#citem').on('click',function(){
                $('#shows').show();
            })
             $('#shows').mouseleave(function(){
            $(this).hide()
            })
        },
        changeHeaderItem: (key,page) => {
            dispatch(actions.setVars('headerItemActive', key));
            dispatch(actions.setVars('treeItemActive', 0));
             dispatch(actions.setVars('tabItemActive', 0));
             dispatch(actions.setVars('show', false));
             dispatch(actions.setVars('colorAct', false));
             if(page=='cockpit'){
                 dispatch(actions.setVars('showPage', page));
                 dispatch(actions.setVars('putpage', false));
                 dispatch(actions.setVars('navhide', false));
             }else if(page=='monitorkb'){
                 dispatch(actions.setVars('showPage', page));
                 dispatch(actions.setVars('navhide', false));
                 dispatch(actions.setVars('putpage', true));
                 dispatch(actions.setVars('bodypage', true));
             }else if(page=='health_main'){
                 dispatch(actions.setVars('showPage', 'cs'));
                 dispatch(actions.setVars('pagename', page));
                 dispatch(actions.setVars('navhide', false));
                 dispatch(actions.setVars('putpage', true));
                 dispatch(actions.setVars('bodypage', true));
             }else{
                dispatch(actions.setVars('navhide', true));
                dispatch(actions.setVars('showPage', page));
                dispatch(actions.setVars('putpage', true));
                dispatch(actions.setVars('bodypage', true));
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
