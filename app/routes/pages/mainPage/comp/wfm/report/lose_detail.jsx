import React from 'react';
import {connect} from 'react-redux';
var $ =require('jquery');
var actions = require('redux/actions');



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
         let {} = this.props;
            
        return (
            <div style={{color:'#fff',fontSize:'22px'}}>
               功能：暂不开发

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
