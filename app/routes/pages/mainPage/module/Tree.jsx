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
        let {treeOpt, itemAct, changeTreeItem, trunleft,cssif,colorAct=false,changecolor} = this.props;
        return (
            <div className={`${styles.navTree} ${cssif==='left'? styles.animate : styles.navTree} ${cssif==='right'? styles.animate1 : styles.navTree}`}>
                {treeOpt && treeOpt.subPage.map((value, key)=> {
                    if(cssif=='left'){

                        if(value.name=='批量控制'){

                            return (
                                <div key={key} className={colorAct === true ? styles.treeItemAct : styles.treeItem} onClick={()=>changecolor(colorAct)} id='plkz'>
                                    <img src={colorAct === true ? value.iconActive : value.iconNormal}/>
                                </div>
                            )
                        }
                            return (
                                <div key={key} className={itemAct === key ? styles.treeItemAct : styles.treeItem} onClick={()=>changeTreeItem(key,value.page[0].page)}>
                                    <img src={itemAct === key ? value.iconActive : value.iconNormal}/>
                                </div>
                            )
                    }else{
                        if(value.name=='批量控制'){
                            return (
                                <div key={key} className={colorAct === true ? styles.treeItemAct : styles.treeItem} onClick={()=>changecolor(colorAct)} id='plkz'>
                                    <img src={colorAct === true ? value.iconActive : value.iconNormal}/>
                                    <p>{value.name}</p>
                                </div>
                            )
                        }
                            return (
                                <div key={key} className={itemAct === key ? styles.treeItemAct : styles.treeItem} onClick={()=>changeTreeItem(key,value.page[0].page)}>
                                    <img src={itemAct === key ? value.iconActive : value.iconNormal}/>
                                    <p>{value.name}</p>
                                </div>
                            )

                    }
                })}
                <span className={cssif=='left'? styles.trunleft : styles.trunright} id='direction' onClick={()=>trunleft(cssif)}></span>
                <div className={styles.fc_search} id='fc'></div>
                <div className={styles.fc_search} style={{top:'283px'}} id='gfc'></div>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        itemAct: state.vars.treeItemActive,
        cssif: state.vars.cssif,
        colorAct: state.vars.colorAct,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('treeItemActive', 0));
            dispatch(actions.setVars('navhide', false));
            dispatch(actions.setVars('cssif', ''));
            $("#plkz").on('click',function(){
                $("#fc").toggle();
                $("#gfc").toggle();
            })


        },
        changeTreeItem: (key,page) => {
            dispatch(actions.setVars('treeItemActive', key));
             dispatch(actions.setVars('tabItemActive', 0));
              dispatch(actions.setVars('showPage', page));
              dispatch(actions.setVars('colorAct', false));
                dispatch(actions.setVars('navhide', true));
                if(page=='monitorkb'){
                    dispatch(actions.setVars('navhide', false));
                }
             
              
        },
        trunleft:(flagv)=>{
            if(flagv=='left'){
                flagv='right';
               
            }else{
                flagv='left';
                
            }

          dispatch(actions.setVars('cssif', flagv));
          dispatch(actions.setVars('cssif2', flagv));
          
        },
        changecolor:(colorAct)=>{
            
            if(colorAct){

                colorAct=false
            }else{
                colorAct=true
            }
             dispatch(actions.setVars('colorAct', colorAct));
          
        }
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
