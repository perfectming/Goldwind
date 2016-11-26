import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from './wind_logo.png';
import Fanchart from './fanchart.jsx';
import Month from '../Month.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
          return (
           <div className={styles.box}>
               <Month month={['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','返回']}></Month>
               <div className={styles.covers}>
                   <div className={styles.bgc}> <img src={icono}/></div>
                   <div className={styles.areabox}>
                           <AreaTable></AreaTable>
                    </div>
                </div>

               <div className={styles.covers}>
                   <div className={styles.bgc}> <img src={icono}/></div>
                   <div className={styles.windbox}>
                       <div>
                           <WindfieldTable></WindfieldTable>
                       </div>
                   </div>
               </div>


               <div className={styles.bigbox}>
                   <div className={styles.coverbox}>
                       <div className={styles.windcebox}>
                           <div>
                               <Fanchart></Fanchart>
                           </div>
                       </div>
                       <div className={styles.tik}>
                           <p>10月一区域一风场各风机</p>
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
