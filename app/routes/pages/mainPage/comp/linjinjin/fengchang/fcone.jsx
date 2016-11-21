import React from 'react';
import {connect} from 'react-redux';
import styles from './fcone.scss';
import Navleft from '../../super/navleft.jsx';
import Fanmatrix from '../../xym/Fanmatrix.jsx';
import Pvmatrix from '../../xym/Pvmatrix.jsx';
import Sjlb from '../../jy/fanDataList.jsx';
import Fjkx from './fcright/fjkx.jsx';
import Cft from './fcright/cft.jsx';
import Gisdxt from './fcright/gisdxt.jsx';
import Syzjs from './fcright/syzjs.jsx';
var actions = require('redux/actions');


let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changeFlag,numpage='fanmatrix'}=this.props;
        return (
            <div className={styles.bodyBox}>
                
                <div className={styles.contentbox}>
                      <div className={`${styles.conleft} ${flag===true? styles.animat1 : styles.animat}`}>
                        <span className={flag===true? styles.spanleft :styles.spanright} onClick={()=>{changeFlag(flag===true? true:false,flag )}}></span>
                        <Navleft></Navleft>
                      </div>
                    <div className={`${styles.conright} ${flag===true? styles.animat3 : styles.animat2}`}>
                        { numpage==='fanmatrix' && <Fanmatrix></Fanmatrix>}
                        { numpage==='pvmatrix' && <Pvmatrix></Pvmatrix>}
                        { numpage==='sjlb' && <Sjlb></Sjlb>}
                        { numpage==='fjkx' && <Fjkx></Fjkx>}
                        { numpage==='cft' && <Cft></Cft>}
                        { numpage==='gisdxt' && <Gisdxt></Gisdxt>}
                        { numpage==='syzjs' && <Syzjs></Syzjs>}

                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        flag : state.vars.flagff,
        numpage : state.vars.numpage,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (flag) => {
            var obj = {
                test:'',
                }

        },
         changeFlag :(flag)=>{
            
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
