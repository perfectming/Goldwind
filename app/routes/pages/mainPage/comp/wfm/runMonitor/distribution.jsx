import React from 'react';
import {connect} from 'react-redux';
import styles from './distribution.scss';
import leftIcon from '../../../img/icon/direct_icon.png' ;
import rightIcon from '../../../img/icon/direct_icon1.png' ;
import Superleftbox from './superleftbox.jsx';
let Item = require('./fpinterface/date');
var $ = require('jquery');

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {clickNumber, showFlag, changeFlag, flag,play,map=false,map1=false,show_allinfo} = this.props;
        
        return (
            <div className={styles.bodyBox}>
                    <div className={styles.leftBox}>
                        <Superleftbox></Superleftbox>
                    </div>
               
                <div className={styles.rightBox}>
                    <div className={`${styles.bigimg} ${map===true? styles.animat4 : styles.animat6} ${map1===true? styles.animat5 : styles.animat6} `}>
                        <div className={map==true? styles.place1 : styles.place2}  onClick={()=>play(map,map1)}></div>
                        <div className={styles.allinfo} id='allinfo'></div>
                        
                    </div>
                    <div className={styles.mapitem}>
                    {
                        Item.mapitem.map((value,key)=>{
                            if(key==5){
                            return(
                                 <div className={styles.item_btn} key={key} onClick={()=>show_allinfo(map1)}>
                                    <img src={value.url}/>
                                    <span>{value.name}</span>
                                 </div>

                                )
                            }else{
                                return(
                                 <div className={styles.item_btn} key={key}>
                                    <img src={value.url}/>
                                    <span>{value.name}</span>
                                 </div>

                                )
                            }

                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        showFlag : state.vars.distributionLeftBox,
        flag:state.vars.flagff,
        map:state.vars.map,
        map1:state.vars.map1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        play:(map,map1)=>{
                if(map){
                    map=false;
                    map1=true;
                }else{
                    map1=false;
                    map=true;
                }
                $('#allinfo').hide();
             dispatch(actions.setVars('map', map));
             dispatch(actions.setVars('map1', map1));
            
        },
        changeFlag :(flag)=>{
            dispatch(actions.setVars('distributionLeftBox', flag));
            if(flag){
                flag=false;
            }else{
                flag=true;
            };
            dispatch(actions.setVars('flagff', flag));
        },
        show_allinfo:(map1)=>{
            
            if(map1){
                
                $('#allinfo').toggle();
            }else{
                $('#allinfo').hide();
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
