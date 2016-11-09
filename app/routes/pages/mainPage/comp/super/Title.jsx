import React from 'react';
import {connect} from 'react-redux';
import Tit from './Title.scss';




let Component = React.createClass({
    componentWillMount() {

    },

    render() {

       let {title,arr } = this.props;
       
        return (
           <div >
                <div className={Tit.titlep}>
                {

                    title && title.map((value, key)=> {
                        return (

                             <span key={key} style={{width:100/title.length+"%"}}  >{title[key]}</span>


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
