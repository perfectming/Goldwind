import React from 'react';
import {connect} from 'react-redux';
import style from './Corner.scss';


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
       
        return (
           <div className={style.Cornerbox}>
                <span></span>
            </div>
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
