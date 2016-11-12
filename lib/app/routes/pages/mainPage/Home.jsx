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
        let {itemHeaderActive, itemTreeAct}=this.props;
        return (
            <FixedContent mode="fullWidth" width={1920}>
                <Header headerInfo={page.header}></Header>
                <Tree treeOpt={page.header[itemHeaderActive]}></Tree>
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
