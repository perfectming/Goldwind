import React from 'react';
import {connect} from 'react-redux';
import styles from './allywbb.scss';
import Generating1 from './Generating/ywbb.jsx';
import Electric_table from './Generating/Electric_table.jsx';
import Completion from './Generating/Completion.jsx';
import Lose_detail from './lose_electtict/lose_detail.jsx';
var $ =require('jquery');
var actions = require('redux/actions');
let paged = require('./pagedate');


let Component = React.createClass({
    componentDidMount() {
        this.props.init();

    },
   

    render() {
         let {changenavItem,navitem=0,num=0,item=0,changeItem,showbb} = this.props;
        return (
            <div className={styles.bodybox} >
                <div className={styles.navbox}>
                {
                    paged.header.map((value,key)=>{
                        return(
                            <span key={key} className={navitem == key ? styles.navItemAct : styles.navItem}
                                     onClick={()=>changenavItem(key,value.page)}>{value.name}</span>

                            )
                    })
                }
                </div>
                <div className={styles.itembox}>
                    {
                        paged.header[num].rightpagge.map((value,key)=>{
                            return(
                                 <span key={key} className={item == key ? styles.ItemAct : styles.Item}
                                     onClick={()=>changeItem(key,value.rpage)}>{value.tabname}</span>
                                )
                        })
                    }
                </div>

               { showbb==='ywbb' && <Generating1></Generating1>}
               { showbb==='Electric_table' && <Electric_table></Electric_table>}
               { showbb==='Completion' && <Completion></Completion>}
               { showbb==='lose_detail' && <Lose_detail></Lose_detail>}
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        navitem: state.vars.navitem,
        item: state.vars.item,
        num: state.vars.num,
        showbb: state.vars.showbb,
    
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            //初始化页面
            dispatch(actions.setVars('showbb', 'ywbb'));
            dispatch(actions.setVars('item', 0));
            dispatch(actions.setVars('navitem', 0));
            dispatch(actions.setVars('num', 0));
        },
        changenavItem:(key,page)=>{
         dispatch(actions.setVars('navitem', key));
         dispatch(actions.setVars('showbb', page));
         dispatch(actions.setVars('num', key));
         dispatch(actions.setVars('item', 0));
        },
        changeItem:(key,page)=>{
            dispatch(actions.setVars('item', key));
            dispatch(actions.setVars('showbb', page));
        }
         
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
