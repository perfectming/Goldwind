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
                    booster.data.all1.map((value, key)=> {
                        return (
                              <div className={`${Bllo.box} ${Bllo.box1}`} key={key} style={{color:value.color}}>
                                <span className={Bllo.block}><img src={value.url}/></span>
                                <span className={Bllo.contect}>{value.text}</span>
                                <span className={Bllo.num}>{value.num}</span>
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
