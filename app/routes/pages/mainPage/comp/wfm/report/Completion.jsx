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
               此功能接口需要重新开发，月、年的完成率。

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
