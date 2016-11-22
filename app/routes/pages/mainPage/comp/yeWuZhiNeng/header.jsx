import React from 'react';
import {connect} from 'react-redux';
import styles from './header.scss';
var actions = require('redux/actions');
let page1 = require('./ybppage1');


let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ changpage,actbt=0,changpage1,actbt1}=this.props;
        return (
                <div className={styles.bodynav}>
                 {
                     page1.header.map((value,key)=>{
                        return(
                            <div className={actbt===key? styles.bodybtn1 : styles.bodybtn} key={key} onClick={()=>changpage(value,key)}>{page1.header[key].name}</div>
                            )
                    })

                 }
                </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:'',
                }

        },
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
