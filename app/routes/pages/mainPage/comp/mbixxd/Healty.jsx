import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Healtychart from './Healtychart.jsx';
import icono from './wind_logo.png';
import Month from './Month.jsx';
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
        let text =data.text;

        return (
            <div className={styles.box}>
                <Month month={['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','返回']}></Month>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                               <Healtychart machine={machine} areaRecordProfit={areaRecordProfit[0]}  ></Healtychart>
                        </div>
                         <div className={styles.tik}>
                        <p>{text[3]}</p>
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
            dispatch(actions.setVars('text',text[key] ));
        }

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Component);