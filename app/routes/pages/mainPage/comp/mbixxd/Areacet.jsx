import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windcet from './Windcet.jsx';
import icono from './wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let areaPlan=data.areaPlan;
        let areaPlanDay=data.areaPlanDay;
        let areaPlanDayT=data.areaPlanDayT;
        let text=data.textT;

        let{actbt=0,changpage,wind,windP}=this.props;
          return (
           <div className={styles.box}>
                 <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
                </ul>
                <div className={`${styles.bigbox} ${styles.shadow}`}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <Windcet areaPlan={areaPlan}  areaPlanDay={wind==undefined? areaPlanDay:wind} areaPlanDayT={windP==undefined? areaPlanDayT:windP}></Windcet>
                            </div>
                        </div>
                         <div className={styles.tik}>
                        <p>{text[actbt]}</p>
                           </div>
                           <div className={styles.lkua}></div>
                           <div className={styles.rkua}></div>
                    </div>
                <div className={styles.imgq}>
                    <img src={icono}/>
                </div>
                <div className={styles.buttons}>
                    {
                        button.map((value,key)=>{
                            return(<button key={key}>{value}</button>)
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
        actbt:state.vars.actbt,
         wind:state.vars.wind,
         windP:state.vars.windP,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
         changpage :(value,key)=>{
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('wind',value.plan));
            dispatch(actions.setVars('windP',value.actrul));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
