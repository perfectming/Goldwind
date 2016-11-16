import React from 'react';
import {connect} from 'react-redux';
import css from  './Tkgl.scss'
import Column from './tkgl/Column.jsx';
import Table from './tkgl/table.jsx';


let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        return (

            <div className={css.tkglBox}>
                <div className={css.upBox}>
                    <TableL></TableL>
                </div>
                <div className={css.downBox}>
                    <TableR></TableR>
                </div>
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
            var obj = {
                test:''
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
