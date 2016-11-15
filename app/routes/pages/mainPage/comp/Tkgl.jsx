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
        let {AGC} = this.props;
        return (

            <div className={css.tkglBox}>
                <button onClick={AGC} className={css.agc}>AGC调节</button>
                <div className={css.upBox}>
                    <Column></Column>
                </div>
                <div className={css.downBox}>
                    <Table></Table>
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
        }
        ,
        AGC: () => {
            window.open ("../../../../../../../simple.html", "newwindow", "height=100, width=400, top=300, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
