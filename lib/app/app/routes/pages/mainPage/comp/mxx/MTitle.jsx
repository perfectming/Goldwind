import React from 'react';
import {connect} from 'react-redux';
import styles from './MTitle.scss';




let Component = React.createClass({
    componentWillMount() {

    },

    render() {

        let {title,arr } = this.props;

        return (
            <div >
                <div className={styles.titlep}>
                    {

                        title && title.map((value, key)=> {
                            return (

                                <span key={key}>{title}</span>

                            )
                        })

                    }
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
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
