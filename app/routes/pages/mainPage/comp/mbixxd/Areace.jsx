import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Windce from './Windce.jsx';
import icono from './wind_logo.png';
import Month from './Month';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let areaName=data.areaName;
let areaRecordCost=data.areaRecordCost;
let areaRecordProfit=data.areaRecordProfit[0];
let text0=data.text[0];
let colorO='#5B9BD5';
let colorT='#ED7D31';
let pointWidth=30;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
          return (
           <div className={styles.box}>
               <Month month={['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','返回']}></Month>>
               <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <Windce areaNameX={areaName}  areaRecordCostT={areaRecordCost} areaRecordProfitO={areaRecordProfit} colorO={colorO} colorT={colorT} pointWidth={pointWidth}></Windce>
                            </div>
                        </div>
                         <div className={styles.tik}>
                        <p>{text0}</p>
                    </div>
                    </div>
                <div className={styles.imgq}>
                    <img src={icono}/>
                </div>
                <div className={styles.buttons}>
                    {
                        button.map((value,key)=>{
                            return(<button  key={key}>{value}</button>)
                        })
                    }
                </div>
                </div>   
           </div>
           
        
        );
    }
});



const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);