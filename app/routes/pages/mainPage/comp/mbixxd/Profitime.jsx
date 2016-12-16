import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Profitimechart from './Profitimechart.jsx';
import icono from './img/收益率1.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {actbt,changpage,backtop,befor_pagee='group',befor_page2}=this.props;
        return (
            <div className={styles.box}>
                 <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green} key={key} onClick={()=>changpage(value,key)} >{value.name}</li>)
                        })
                    }
              <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>

                </ul>
                <div className={styles.bigbox}>
                   
                       <div className={styles.imgq}>
                        <img src={icono}/>
                       </div>
                            <div>
                                <Profitimechart ></Profitimechart>
                            </div>
                       <div className={styles.buttons}>
                      <button onClick={()=>gogogo(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)} > 前10</button>
                      <button onClick={()=>back(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)}>后10</button>
                      <button  onClick={()=>more(areaWindidssT,index2,actbt,areaWindNames,areaWindCosts,areaWindEarnings,areaWindRates,daycount)}>更多</button>
                   </div>
                   
                    
                </div>
            </div>


        );
    }
});



const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbtm
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
             dispatch(actions.setVars('actbtm',key ));
            
        },
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
