import React from 'react';
import {connect} from 'react-redux';
import styles from './Profitstyle.scss';
import AreaTable from './AreaTable.jsx';
import WindfieldTable from './WindfieldTable.jsx';
import FanTable from './FanTable.jsx';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
         let {buttonAction, inputOnChange, onFocus} = this.props;
          return (
           <div className={styles.box}>
                <ul className={styles.monthbox}>
                    {
                        month.map((value,key)=>{
                            return(<li key={key}>{value}</li>)
                        })
                    }
                </ul>
                <div className={styles.areabox}>
                   <div>
                     <AreaTable></AreaTable>
                   </div>
                </div>
               <div className={styles.windbox}>
                   <div>
                     <WindfieldTable></WindfieldTable>
                   </div>
               </div>
                <div className={styles.buttons}>
                    {
                        button.map((value,key)=>{
                            return(<button key={key}>{value}</button>)
                        })
                    }
                </div>
               <div className={styles.fanbox}>
                    <div>
                         <FanTable></FanTable>
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
