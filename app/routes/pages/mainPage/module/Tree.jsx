import React from 'react';
import {connect} from 'react-redux';
import styles from './Tree.scss';
import Controler_fc from '../comp/super/controler_fc.jsx';

var actions = require('redux/actions');
var $ =require('jquery');
let matrixdata = require('../../../../../config/MatrixData');
let model = require('../../../../../config/Model');
let modeldata = require('../../../../../config/ModelData');
let data=modeldata.ModelData;
let mod=model.Model;
let mat=model.Model;
let matD=matrixdata.ModelData;
let model_data = modeldata.ModelData;
var model_ens = model.Model.ens;
let arr1 = [];
let arr2 = [];
var obj = matrixdata;
var obj_wfd = obj.ModelData[8888801].WFDevsStatus;
var obj_pvd = obj.ModelData[8888802].PVDevsStatus;


(function(){
    for(var x in obj_wfd){
        arr1.push(x)
    }
     for(var m in obj_pvd){
        arr2.push(m)
        
    }

}());

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {treeOpt, itemAct, changeTreeItem, trunleft,cssif,colorAct=false,changecolor,legend1=false,show,showbox,legend2=false,showbox1} = this.props;
        return (
            <div className={`${styles.navTree} ${cssif==='left'? styles.animate : styles.navTree} ${cssif==='right'? styles.animate1 : styles.navTree}`}>
                {treeOpt && treeOpt.subPage.map((value, key)=> {
                    if(cssif=='left'){

                        if(value.name=='批量控制'){

                            return (
                                <div key={key} className={colorAct === true ? styles.treeItemAct : styles.treeItem} onClick={()=>changecolor(colorAct,show)} id='plkz'>
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
                                <div key={key} className={colorAct === true ? styles.treeItemAct : styles.treeItem} onClick={()=>changecolor(colorAct,show)} id='plkz'>
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
                 <div className={show===true? styles.fc_search : styles.fc_search1} id='fctree'>
                    <span  onClick={()=>showbox(legend1)} style={{cursor:'pointer'}}>风机</span>
                    {legend1===true && <Controler_fc name={arr1} ens={model_ens} wfd={obj_wfd} ptitle={'风机批量控制'}></Controler_fc>}
                 </div>
                 <div className={`${show===true? styles.fc_search : styles.fc_search1} ${ styles.gfcbg}`} id='gfctree'>
                    <span onClick={()=>showbox1(legend2)} style={{cursor:'pointer'}}>光伏</span>
                    {legend2===true && <Controler_fc name={arr2} ens={model_ens} wfd={obj_pvd} ptitle={'光伏批量控制'}></Controler_fc>}
                 </div>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        itemAct: state.vars.treeItemActive,
        cssif: state.vars.cssif,
        colorAct: state.vars.colorAct,
        show: state.vars.show,
        legend1: state.vars.legend1,
        legend2: state.vars.legend2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('treeItemActive', 0));
            dispatch(actions.setVars('navhide', false));
            dispatch(actions.setVars('cssif', ''));
          


        },
        changeTreeItem: (key,page) => {
            dispatch(actions.setVars('treeItemActive', key));
             dispatch(actions.setVars('tabItemActive', 0));
              dispatch(actions.setVars('showPage', 'cs'));
              dispatch(actions.setVars('pagename', page));
              dispatch(actions.setVars('colorAct', false));
                dispatch(actions.setVars('navhide', true));
                if(page=='monitorkb' || page=='health_main'){
                    dispatch(actions.setVars('navhide', false));
                }
                dispatch(actions.setVars('show', false));
             
              
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
        changecolor:(colorAct,show)=>{
            
            if(colorAct){

                colorAct=false
            }else{
                colorAct=true
            }
             if(show){

                show=false
                dispatch(actions.setVars('legend1', false));
                dispatch(actions.setVars('legend2', false));
            }else{
                show=true
            }
             dispatch(actions.setVars('colorAct', colorAct));
             dispatch(actions.setVars('show', show));
          
        },
        showbox:(legend1)=>{
            dispatch(actions.setVars('legend1', true));
            dispatch(actions.setVars('legend2', false));
        },
        showbox1:(legend2)=>{
            dispatch(actions.setVars('legend2', true));
            dispatch(actions.setVars('legend1', false));
        }
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
