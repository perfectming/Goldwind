import React from 'react';
import {connect} from 'react-redux';
import Bllo from './block.scss';
let booster = require('../../../../../../config/booster-data');




let Component = React.createClass({
    componentWillMount() {

    },

    render() {
            let{arr}=this.props;
            return (

             <div>
                {
                    booster.data.all.map((value, key)=> {
                        return (
                             <div className={Bllo.box} key={key} style={{color:value[0]}}>
                                <span className={Bllo.block} style={{background:value[0]}}></span>
                                <span className={Bllo.contect}>{value[1]}</span>
                                <span className={Bllo.num}>{value[2]}</span>
                            </div>
                        )
                    })
                }
            </div>
            ) 
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
