import React from 'react';
import {connect} from 'react-redux';
import styles from './Body.scss';
import Chart from '../comp/Chart.jsx';
import From from '../comp/From.jsx';
import Table from '../comp/Table.jsx';
import Super from '../comp/Super.jsx';
import Test from '../comp/Test.jsx';
import Distribution from '../comp/Distribution.jsx';
import Tkgl from '../comp/Tkgl.jsx';
import Power from '../comp/power/Power.jsx';
import Tab from './Tab.jsx';
import Booster from '../comp/Booster.jsx';
import Tree from './Tree.jsx';
import Header from './Header.jsx';
import Fan from '../comp/Fan.jsx';
import Cockpit from '../comp/linjinjin/Cockpit.jsx';
import Fan_matrix from '../comp/linjinjin/Fan_matrix.jsx';
import Alarm from '../comp/yAll/Alarm.jsx';
import PEQI from '../comp/jy/PEQI.jsx';
import ARS from '../comp/jy/ARS.jsx';
import AS from '../comp/jy/AS.jsx';
import Ms from '../comp/xym/Ms.jsx';
import Amm from '../comp/xym/Amm.jsx';
import Monitorkb from '../comp/maXin/Monitorkb.jsx';
import Fault from '../comp/yAll/Fault.jsx';
import Fdl from '../comp/jy/fanDataList.jsx';
var actions = require('redux/actions');
let page = require('../../../../../config/page');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {showPage, tabOpt, tab, flag=true} = this.props;
        return (
            <div className={flag===true?styles.bodyBox : styles.bodyBox1}>
                <Tab tabOpt={tabOpt} tab={tab}/>
                {showPage === 'chart' && <Chart></Chart>}
                {showPage === 'from' && <From></From>}
                {showPage === 'table' && <Table></Table>}
                {showPage === 'super' && <Super></Super>}
                {showPage === 'booster' && <Booster></Booster>}
                {showPage === 'tkgl' && <Tkgl></Tkgl>}
                {showPage === 'distribution' && <Distribution></Distribution>}
                {showPage === 'fan' && <Fan></Fan>}
                {showPage === 'power' && <Power></Power>}
                {showPage === 'test' && <Test></Test>}
                {showPage === 'cockpit' && <Cockpit></Cockpit>}
                {showPage === 'alarm' && <Alarm></Alarm>}
                {showPage === 'PEQI' && <PEQI></PEQI>}
                {showPage === 'AS' && <AS></AS>}
                {showPage === 'ARS' && <ARS></ARS>}
                {showPage === 'ms' && <Ms></Ms>}
                {showPage === 'amm' && <Amm></Amm>}
                {showPage === 'monitorkb' && <Monitorkb></Monitorkb>}
                {showPage === 'fan_matrix' && <Fan_matrix></Fan_matrix>}
                {showPage === 'fault' && <Fault></Fault>}
                {showPage === 'fdl' && <Fdl></Fdl>}
                <div className={styles.clearbox}></div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        showPage: state.vars.showPage,
        flag: state.vars.bodypage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('bodypage', false));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
