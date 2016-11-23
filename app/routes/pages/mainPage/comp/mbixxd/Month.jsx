import React from 'react';
import {connect} from 'react-redux';
import Mon from './Mon.scss';
let Component = React.createClass({
    componentWillMount() {
    },
    render() {
        let {month,arr } = this.props;
        return (
                <ul className={Mon.monthbox}>
                    {
                        month && month.map((value, key)=> {
                            return (
                                <li key={key}>{month[key]}</li>
                            )
                        })
                    }
                </ul>

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
