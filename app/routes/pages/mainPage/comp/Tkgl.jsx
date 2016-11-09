import React from 'react';
import {connect} from 'react-redux';
import Corner from './super/Corner.jsx';
import Title from './super/Title.jsx';
import Column from './tkgl/Column.jsx';
import Table from './tkgl/table.jsx';


let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {

        return (

            <div >

                <div >
                    <Column></Column>
                </div>
                <div >
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
