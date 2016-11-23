import React from 'react';
import {connect} from 'react-redux';
import styles from './distribution.scss';
import dataBase from '../../../../../../config/ModelData';
import model from '../../../../../../config/Model';
import matrix from '../../../../../../config/MatrixModel';
import matData from '../../../../../../config/MatrixData';
import map1 from '../../img/comp/DistributionMap.jpg' ;
import leftIcon from '../../img/comp/leftIcon.png' ;
import rightIcon from '../../img/comp/rightIcon.png' ;
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
        let {clickNumber, showFlag, changeFlag, flag=true,play,map='fdg'} = this.props;
        return (
            <div className={styles.bodyBox}>
                    <div className={`${styles.leftBox} ${flag===true? styles.animat1 : styles.animat}`}>
                        <Superleftbox></Superleftbox>
                    </div>
                <div className={styles.changeBox}>
                    <img src={flag===true? leftIcon:rightIcon} onClick={()=>{changeFlag(flag===true? true:false,flag )}}/>
                </div>
                <div className={`${styles.rightBox} ${flag===true? styles.animat3 : styles.animat2}`}>
                    <div className={`${styles.bigimg} ${map==='small'? styles.animat4 : styles.animat5}`}>
                        <div className={styles.place1}  onClick={()=>play(map)}></div>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        play:(map)=>{
            if(map=='big'){
                map='small';
            }else if(map=='small'){
                map='big';
            }else{
                map='big';
            }
             dispatch(actions.setVars('map', map));
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
