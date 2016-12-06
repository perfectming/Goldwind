import React from 'react';
import {connect} from 'react-redux';
import styles from './fan.scss';
import Title from '../super/Title.jsx';
import bg1 from '../../img/icon/1.png';
import bg2 from '../../img/icon/2.png';
import bg3 from '../../img/icon/3.png';
import bg4 from '../../img/icon/4.png';
import bg5 from '../../img/icon/5.png';
import bg6 from '../../img/icon/6.png';
import bg7 from '../../img/icon/7.png';
import bg8 from '../../img/icon/8.png';

var actions = require('redux/actions');
var $ = require('jquery');
let addtest = require('../../../../../../config/MatrixData');
let adisdfa= require('./data');
let adsI=adisdfa.fan;
let arr=[bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8];
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {changetab,act1,value=addtest.ModelData[8888801].WFDevsStatus[650107][0],fanid} = this.props;
        return (
            <div className={styles.bodyBox} id="fanJy">
                <div className={styles.fanidbox}>
                    {
                        adsI.title.map((value,key)=>{
                            return(
                                <span className={ act1==key? styles.active : styles.actspan } key={key} onClick={()=>changetab(key)}>{value}</span>
                            )
                        })
                    }
                </div>
                    <div className={`${styles.infoBox} ${styles.infofL}`}>
                        <div className={styles.statusquery}>
                            {
                                adsI.content.map((value, key)=>{
                                    return (
                                        <div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
                                            <span>{key}</span>
                                            <span>{value}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                <div className={`${styles.fanrightbox} ${styles.infofL}`}>
                    <div className={styles.action1box}>
                        {
                            adsI.header.map((value,key)=>{
                                if(adsI.unit[key]=='C'){
                                    return(
                                        <div className={styles.fandatabox} key={key}>
                                            <span>{value}</span>
                                            <span className={styles.numbox}><span>0</span><span>&#8451;</span></span>
                                        </div>
                                    )
                                }else{
                                return(
                                    <div className={styles.fandatabox} key={key}>
                                        <span>{value}</span>
                                        <span className={styles.numbox}><span>0</span><span>{adsI.unit[key]}</span></span>
                                    </div>
                                )}
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
});




const mapStateToProps = (state) => {
    return {
        act1 : state.vars.val,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

        },
        changetab:(act)=>{
            dispatch(actions.setVars('val', act));
            arr[act] &&
            $('#fanJy').css('background-image','url('+arr[act]+')');
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
