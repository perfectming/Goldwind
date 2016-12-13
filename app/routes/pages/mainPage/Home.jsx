<<<<<<< HEAD
import React from "react";
import {connect} from 'react-redux';
import Header from './module/Header';
import Tree from './module/Tree';
import Body from './module/Body';
import FixedContent from '../../../components/common/FixedContent.jsx';

var actions = require('redux/actions');

let page = require('../../../../config/page');
let comp = require('../../../../config/comp');
let tabaleData = require('../../../../config/table-data');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
       
    },
    render() {
        let {itemHeaderActive, itemTreeAct, flag=true}=this.props;
        return (
            <FixedContent mode="fullWidth" width={1920}>
                <Header headerInfo={page.header}></Header>
                {
                flag && <Tree treeOpt={page.header[itemHeaderActive]} style={{overflow:'hidden'}}></Tree>
            }
                <Body tabOpt={page.header[itemHeaderActive]} tab={itemTreeAct}></Body>
            </FixedContent>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        itemHeaderActive: state.vars.headerItemActive,
        itemTreeAct: state.vars.treeItemActive,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: ()=> {
            dispatch(actions.setVars('headerItemActive', 0));
        },
      
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
=======
import React from "react";
import {connect} from 'react-redux';
import Header from './module/Header';
import styles from './module/Home.scss';
import Tree from './module/Tree';
import Body from './module/Body';
import FixedContent from '../../../components/common/FixedContent.jsx';
var {browserHistory} = require('react-router');
var ReactHighcharts = require('react-highcharts');

var actions = require('redux/actions');

let page = require('../../../../config/page');
let comp = require('../../../../config/comp');
let tabaleData = require('../../../../config/table-data');

let Component = React.createClass({
    componentDidMount() {
        // console.log('high',ReactHighcharts);
        this.props.init(this.props.userInfo);
    },
    render() {
        let {itemHeaderActive, itemTreeAct, flag=true}=this.props;
        return (

            <FixedContent mode="fullWidth" width={1920}>
                <div className={styles.bgbox}>
                    <Header headerInfo={page.header}></Header>
                    {
                        flag && <Tree treeOpt={page.header[itemHeaderActive]} style={{overflow:'hidden'}}></Tree>
                    }
                    <Body tabOpt={page.header[itemHeaderActive]} tab={itemTreeAct}></Body>
                </div>
            </FixedContent>

        );
    }
});

const mapStateToProps = (state) => {
    return {
        itemHeaderActive: state.vars.headerItemActive,
        itemTreeAct: state.vars.treeItemActive,
        userInfo: state.vars.userInfo,
        flag: state.vars.putpage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (userInfo)=> {
            // console.log(userInfo);
            if(!userInfo){
                browserHistory.push('/app/all/page/login')  ;
            }
            dispatch(actions.setVars('headerItemActive', 0));
            dispatch(actions.setVars('putpage', false));

        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
