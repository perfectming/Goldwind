import React from 'react';
import {connect} from 'react-redux';
let Component = React.createClass({
    componentWillMount() {

    },

    render() {

       let {buttons,arr } = this.props;
        return (        
                    buttons && buttons.map((value, key)=> {
                        return (
                             <span key={key} >{value[key]}</span>
                        );
                       
                    })
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
