import React from 'react';
import {connect} from 'react-redux';
import styles from './nav.scss';
var actions = require('redux/actions');




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {


       let {title,arr, changetab, act=0,leftd,fc_info='150801'} = this.props;
       let date=leftd.ModelData;

       
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
                    <div className={`${styles.numtai} ${styles.nummor}`}><div className={styles.numname}>华瑞SL1500x</div><b>--</b><a>台</a></div>
                    <div className={styles.numtai}><div className={styles.numname}>总计</div><b>{date[fc_info].WTCount==0?date[fc_info].InverterCount:date[fc_info].WTCount}</b><a>台</a></div>
                    

                </div>
                <div className={styles.navright}>
                    <div className={styles.userinfo}>
                        <span>
                            <p>手机</p>
                            <p className={styles.username}>---</p>
                        </span>
                    </div>
                    <div className={styles.userinfo}>
                         <span>
                            <p>电话</p>
                            <p className={styles.username}>---</p>
                        </span>
                    </div>
                    <div className={`${styles.userinfo} ${styles.usericon}`}>
                        <span className={styles.usmar}>
                            <p>场长</p>
                            <p className={styles.username}>---</p>
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
        fc_info:state.vars.fc_info,
       
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
