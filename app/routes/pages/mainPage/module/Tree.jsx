import React from 'react';
import {connect} from 'react-redux';
import styles from './Tree.scss';
var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {treeOpt, itemAct, changeTreeItem, trunleft} = this.props;
        return (
            <div className={styles.navTree}>
                {treeOpt && treeOpt.subPage.map((value, key)=> {
                    
                    return (
                        <div key={key} className={itemAct === key ? styles.treeItemAct : styles.treeItem} onClick={()=>changeTreeItem(key,value.page[0].page)}>
                            <img src={itemAct === key ? value.iconActive : value.iconNormal}/>
                            <p>{value.name}</p>
                        </div>
                    )
                })}
                <span className={styles.trunleft} onClick={()=>trunleft()}>《 </span>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        itemAct: state.vars.treeItemActive,
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
        trunleft:()=>{
           
        }
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
