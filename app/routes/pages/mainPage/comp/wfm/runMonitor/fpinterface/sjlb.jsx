import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');





let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changpage, fcpage }=this.props;
        return (
         
                <div >
                    22222222222
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
        init: (flag) => {
            var obj = {
                test:'',
                }

        },
    
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
