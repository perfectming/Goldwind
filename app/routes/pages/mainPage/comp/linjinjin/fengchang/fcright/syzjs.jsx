import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
import bg from '../../../../img/comp/syzjs.jpg';




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changpage, fcpage }=this.props;
        return (
         
                <div >
                <img src={bg} style={{width:'100%',height:'1030px'}} />
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
