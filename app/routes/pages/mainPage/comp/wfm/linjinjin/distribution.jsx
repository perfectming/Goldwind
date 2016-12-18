import React from 'react';
import {connect} from 'react-redux';
import styles from './distribution.scss';
import map1 from '../../../../img/comp/DistributionMap.jpg' ;
import leftIcon from '../../../../img/icon/direct_icon.png' ;
import rightIcon from '../../../../img/icon/direct_icon1.png' ;
import Superleftbox from '../super/superleftbox.jsx';
let Item = require('./date');

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let data=dataBase.ModelData;
        let mod=model.Model;
        let  mat=matrix.Model;
        let matD=matData.ModelData;
        let {clickNumber, showFlag, changeFlag, flag,play,map,map1} = this.props;
        return (
            <div className={styles.bodyBox}>
                    <div className={styles.leftBox}>
                        <Superleftbox></Superleftbox>
                    </div>
               
                <div className={styles.rightBox}>
                    <div className={`${styles.bigimg} ${map===true? styles.animat4 : styles.animat6} ${map1===true? styles.animat5 : styles.animat6} `}>
                        <div className={styles.place1}  onClick={()=>play(map,map1)}></div>
                    </div>
                    <div className={styles.mapitem}>
                    {
                        Item.mapitem.map((value,key)=>{

                            return(
                                 <div className={styles.item_btn} key={key}>
                                    <img src={value.url}/>
                                    <span>{value.name}</span>
                                 </div>

                                )

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
            dispatch(actions.setVars('map', false));
             dispatch(actions.setVars('map1', false));
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
             dispatch(actions.setVars('map', map));
             dispatch(actions.setVars('map1', map1));
             console.log(map)
            
        },
        changeFlag :(flag)=>{
            dispatch(actions.setVars('distributionLeftBox', flag));
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
