import React from 'react';
import {connect} from 'react-redux';
import styles from './Tree.scss';
var actions = require('redux/actions');
var $ =require('jquery');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {treeOpt, itemAct, changeTreeItem, trunleft,cssif} = this.props;
        return (
            <div className={`${styles.navTree} ${cssif===true? styles.animate : styles.animate1}`}>
                {treeOpt && treeOpt.subPage.map((value, key)=> {
                    if(cssif){
                    return (
                        <div key={key} className={itemAct === key ? styles.treeItemAct : styles.treeItem} onClick={()=>changeTreeItem(key,value.page[0].page)}>
                            <img src={itemAct === key ? value.iconActive : value.iconNormal}/>
                           
                        </div>
                    )
                    }else{
                        return (
                        <div key={key} className={itemAct === key ? styles.treeItemAct : styles.treeItem} onClick={()=>changeTreeItem(key,value.page[0].page)}>
                            <img src={itemAct === key ? value.iconActive : value.iconNormal}/>
                            <p>{value.name}</p>
                        </div>
                    )

                    }
                })}
                <span className={cssif==true? styles.trunleft : styles.trunright} id='direction' onClick={()=>trunleft(cssif)}></span>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        itemAct: state.vars.treeItemActive,
        cssif: state.vars.cssif,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('treeItemActive', 0));
            dispatch(actions.setVars('navhide', false));
        },
        changeTreeItem: (key,page) => {
            dispatch(actions.setVars('treeItemActive', key));
             dispatch(actions.setVars('tabItemActive', 0));
              dispatch(actions.setVars('showPage', page));
               if(page=='monitorkb'){
                dispatch(actions.setVars('navhide', false));
             }else{
                dispatch(actions.setVars('navhide', true));
             }
              
        },
        trunleft:(flagv)=>{
            if(flagv){
                flagv=false;
               
            }else{
                flagv=true;
                
            }

          dispatch(actions.setVars('cssif', flagv));
          dispatch(actions.setVars('cssif2', flagv));
          console.log(this)
          
        }
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
