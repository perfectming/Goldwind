import React from 'react';
import {connect} from 'react-redux';
import styles from './allywbb.scss';
import Generating1 from './ywbb.jsx';
import Electric_table from './Electric_table.jsx';
import Completion from './Completion.jsx';
import Lose_detail from './lose_detail.jsx';
import LoseElectric_Statistics from './loseElectric_Statistics.jsx';
import PowerCurveStatistics from './Power_curve_statistics.jsx';
import AvailableStatistics from './Available_statistics.jsx';
import Alert from './alert.jsx';

import RunCount from './runCount.jsx';
import RunCheck from './runCheck.jsx';
import StateCheck from './stateCheck.jsx';
import StateStatistics from './StateStatistics.jsx';
import PowerCurve from './powerCurve.jsx';
import PowerCount from './powerCount.jsx';
import FaultReport from './FaultReport.jsx';
import FaultClass from './FaultClass.jsx';
import CompareCurve from './CompareCurve.jsx';
import StationAlert from './StationAlert.jsx';
var $ =require('jquery');
var actions = require('redux/actions');
let paged = require('./pagedate');


let Component = React.createClass({
    componentDidMount() {
        this.props.init();

    },
   

    render() {
         let {changenavItem,navitem=0,num=0,item=0,changeItem,showbb} = this.props;
        return (
            <div className={styles.bodybox} >
                <div className={styles.navbox}>
                {
                    paged.header.map((value,key)=>{
                        return(
                            <span key={key} className={navitem == key ? styles.navItemAct : styles.navItem}
                                     onClick={()=>changenavItem(key,value.page)}>{value.name}</span>

                            )
                    })
                }
                </div>
                <div className={styles.itembox}>
                    {
                        paged.header[num].rightpagge.map((value,key)=>{
                            return(
                                 <span key={key} className={item == key ? styles.ItemAct : styles.Item}
                                     onClick={()=>changeItem(key,value.rpage)}>{value.tabname}</span>
                                )
                        })
                    }
                </div>

                { showbb==='ywbb' && <Generating1></Generating1>}
                { showbb==='Electric_table' && <Electric_table></Electric_table>}
                { showbb==='Completion' && <Completion></Completion>}
                { showbb==='lose_detail' && <Lose_detail></Lose_detail>}
                { showbb==='loseelectric_statistics' && <LoseElectric_Statistics></LoseElectric_Statistics>}
                { showbb==='PowerCurveStatistics' && <PowerCurveStatistics></PowerCurveStatistics>}
                { showbb==='AvailableStatistics' && <AvailableStatistics></AvailableStatistics>}
                { showbb==='runCheck' && <RunCheck></RunCheck>}
                { showbb==='runCount' && <RunCount></RunCount>}
                { showbb==='StateStatistics' && <StateStatistics></StateStatistics>}
                { showbb==='stateCheck' && <StateCheck></StateCheck>}
                { showbb==='powerCurve' && <PowerCurve></PowerCurve>}
                { showbb==='powerCount' && <PowerCount></PowerCount>}
                { showbb==='FaultReport' && <FaultReport></FaultReport>}
                { showbb==='FaultClass' && <FaultClass></FaultClass>}
                { showbb==='compareCurve' && <CompareCurve></CompareCurve>}
                { showbb==='alert' && <Alert></Alert>}
                { showbb==='StationAlert' && <StationAlert></StationAlert>}
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        navitem: state.vars.navitem,
        item: state.vars.item,
        num: state.vars.num,
        showbb: state.vars.showbb,
    
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            //初始化页面
            dispatch(actions.setVars('showbb', 'ywbb'));
            dispatch(actions.setVars('item', 0));
            dispatch(actions.setVars('navitem', 0));
            dispatch(actions.setVars('num', 0));
        },
        changenavItem:(key,page)=>{
         dispatch(actions.setVars('navitem', key));
         dispatch(actions.setVars('showbb', page));
         dispatch(actions.setVars('num', key));
         dispatch(actions.setVars('item', 0));
        },
        changeItem:(key,page)=>{
            dispatch(actions.setVars('item', key));
            dispatch(actions.setVars('showbb', page));
        }
         
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
