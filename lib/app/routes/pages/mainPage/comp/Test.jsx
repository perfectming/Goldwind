import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighcharts = require('react-highcharts');

let data = require('../../../../../config/Model');

let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let {test} = this.props;
        let doughnutValue = data.Model.ens;

        return (
            <button onClick={test}>test</button>
        );
    }
});


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        test:()=>{
            console.log(data.Model.ens)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
