import React from 'react';
import {connect} from 'react-redux';
import styles from './header.scss';
import back from '../../img/comp/back.png';
var actions = require('redux/actions');




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changpage, fcpage,actbt=0,backtop }=this.props;
        return (
         
                <div className={styles.bodynav}>
                <img src={back} onClick={()=>backtop()}/>
                 {
                    fcpage.map((value,key)=>{
                        return(
                            <div className={actbt===key? styles.bodybtn1 : styles.bodybtn} key={key} onClick={()=>changpage(value.page,key)}>{value.name}</div>
                            )
                    })
                 }

                </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {

        flag : state.vars.flagff,
        actbt : state.vars.actbt,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (flag) => {
            var obj = {
                test:'',
                }

        },
         changpage :(page,key)=>{
            
            dispatch(actions.setVars('showPage1',page))
             dispatch(actions.setVars('Changnav',key ));
              dispatch(actions.setVars('actbt',key ));
        },
        backtop:()=>{
            dispatch(actions.setVars('showPage','distribution'));
            dispatch(actions.setVars('navhide', true));
        }
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
