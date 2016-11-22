import React from 'react';
import {connect} from 'react-redux';
import styles from './nav.scss';
var actions = require('redux/actions');




let Component = React.createClass({
    componentWillMount() {

    },

    render() {

       let {title,arr, changetab, act=0} = this.props;
       
        return (
          <div className={styles.navbox}>
                <div className={styles.navleft}>
                   {
                    title.map((value,key)=>{
                        return(
                            <span className={ act===key? styles.active : styles.actspan } key={key} onClick={()=>changetab(value.rpage,key)}>{value.tabname}</span>
                            )

                    })

                   }
                    <div className={`${styles.numtai} ${styles.nummor}`}><div className={styles.numname}>华瑞SL1500x</div><b>15</b><a>台</a></div>
                    <div className={styles.numtai}><div className={styles.numname}>总计</div><b>500</b><a>台</a></div>
                    

                </div>
                <div className={styles.navright}>
                    <div className={styles.userinfo}>
                        <span>
                            <p>手机</p>
                            <p className={styles.username}>13333333333</p>
                        </span>
                    </div>
                    <div className={styles.userinfo}>
                         <span>
                            <p>电话</p>
                            <p className={styles.username}>0475-0101011</p>
                        </span>
                    </div>
                    <div className={`${styles.userinfo} ${styles.usericon}`}>
                        <span className={styles.usmar}>
                            <p>场长</p>
                            <p className={styles.username}>王晓敏</p>
                        </span>
                    </div>
                    
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        act: state.vars.actbtn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            
        },
        changetab:(page,act)=>{
            dispatch(actions.setVars('numpage', page));
            dispatch(actions.setVars('actbtn', act));
        }
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
