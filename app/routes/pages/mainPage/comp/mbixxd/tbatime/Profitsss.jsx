import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import icono from '../wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let areaNamee=data.areaNamee;
        let areaRecordCostss=data.areaRecordCostss;
        let areaRecordProfitt=data.areaRecordProfitt;
        let text=data.text[0];
          return (
           <div className={styles.box}>
               
                <div className={`${styles.areabox} ${styles.shadow}`}>
                <div className={styles.bgcc}><img src={icono}/></div>
                   <div>
                     <AreaTable text={text} areaNamee={areaNamee} areaRecordCostss={areaRecordCostss} areaRecordProfitt={areaRecordProfitt}></AreaTable>
                   </div>
                </div>
               <div className={`${styles.windbox} ${styles.shadow}`}>
                <div className={styles.bgcc}><img src={icono}/></div>
                   <div>
                     <WindfieldTable></WindfieldTable>
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
