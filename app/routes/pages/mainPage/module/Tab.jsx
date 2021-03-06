import React from 'react';
import {connect} from 'react-redux';
import styles from './Tab.scss';
var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {tabOpt, tab, itemActive, changeTabItem, hide=true} = this.props;
        return (
            <div className={hide===true? styles.navTab : styles.navTab1}>
                {
                    tabOpt && tabOpt.subPage[tab].page.map((value, key)=> {
                      
                        return (
                            <div key={key}>
                                <span className={itemActive == key ? styles.tabItemAct : styles.tabItem}
                                     onClick={()=>changeTabItem(key,value.page)}>
                                     {value.name}
                                </span>
                                <span className={styles.tabItemIcon}>|</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        itemActive: state.vars.tabItemActive,
        hide: state.vars.navhide,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('tabItemActive', 0));
            dispatch(actions.setVars('showPage', 'cockpit'));
<<<<<<< HEAD
=======
            dispatch(actions.setVars('navhide', false));
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
        },
        changeTabItem: (key, page) => {
            dispatch(actions.setVars('showPage', page));
            dispatch(actions.setVars('tabItemActive', key));
           
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
