import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
import styles from './cft.scss';
let data = require('../../date');




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changpage, fcpage }=this.props;
        return (
         
                <div className={styles.bodybox}>
                {
                    data.cft.map((value,key)=>{

                        return(

                 
                    <div className={styles.infobox} key={key}>
                        <span className={styles.boxname}>{value.name}</span>
                        <a><b>{value.num}</b><span className={styles.unit}>{value.unit}</span></a>
                    </div>
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
        init: (flag) => {
            var obj = {
                test:'',
                }

        },
    
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
