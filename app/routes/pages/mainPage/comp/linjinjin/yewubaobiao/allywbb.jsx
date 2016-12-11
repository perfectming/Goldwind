import React from 'react';
import {connect} from 'react-redux';
var $ =require('jquery');
var actions = require('redux/actions');
import Generating1 from './Generating/ywbb.jsx';


let Component = React.createClass({
    componentDidMount() {
        this.props.init();

    },
   

    render() {
         let {} = this.props;
        return (
            <div >
                <div>发电量统计用例规划</div>
                <Generating1></Generating1>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            
        },
         
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
