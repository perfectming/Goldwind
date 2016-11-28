import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Healtychart from './Healtychart.jsx';
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
        let areaRecordProfit=data.areaRecordProfit;
        let machine=data.machine;
        let text =data.textHealty;
      let{actbt=0,changpage,wind}=this.props;
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
                               <Healtychart machine={machine} areaRecordProfit={wind==undefined? areaRecordProfit[0]:wind} ></Healtychart>
                        </div>
                         <div className={styles.tik}>
                        <p>{text[actbt]}</p>
                    </div>
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
        }

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Component);