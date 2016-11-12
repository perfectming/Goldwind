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
var actions = require('redux/actions');
let page = require('../../../../../config/page');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {showPage, tabOpt, tab,} = this.props;
        return (
            <div className={styles.bodyBox}>
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
                <div className={styles.clearbox}></div>


            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        showPage: state.vars.showPage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
