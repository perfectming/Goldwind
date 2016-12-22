import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
import styles from './cft.scss';
let data = require('./date');




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changpage, fcpage }=this.props;
        return (
         
                <div className={styles.bodybox}>
                {
                    data.cft1.map((value,key)=>{
                        if(key%2==0){

                            if(key==0){
                             return(
                                <div className={styles.infobox1} key={key}>
                                    <span className={styles.boxname}>{value.name}</span>
                                    <a><b>{value.num}</b><span className={styles.unit}>{value.unit}</span></a>
                                </div>
                                )
                            }
                            return(
                                <div className={styles.infobox2} key={key}>
                                    <span className={styles.boxname}>{value.name}</span>
                                    <a><b>{value.num}</b><span className={styles.unit}>{value.unit}</span></a>
                                </div>
                                )


                        }
                        if(key==1){
                             return(
                                <div className={styles.infobox3} key={key}>
                                    <span className={styles.boxname}>{value.name}</span>
                                    <a><b>{value.num}</b><span className={styles.unit}>{value.unit}</span></a>
                                </div>
                                )
                            }

                        return(

                 
                    <div className={styles.infobox} key={key}>
                        <span className={styles.boxname}>{value.name}</span>
                        <a><b>{value.num}</b><span className={styles.unit}>{value.unit}</span></a>
                    </div>
                    )

                       })

                }
                    <div className={styles.infotitle}>
                        <div className={styles.item}>
                            <div className={styles.itemimg}></div>
                            <div className={styles.itembox}>
                                <p className={styles.itemp}>{data.cft[0].name}</p>
                                <p><b>{data.cft[0].num}</b><a>{data.cft[0].unit}</a></p>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemimg1}></div>
                            <div className={styles.itembox}>
                                 <p className={styles.itemp}>{data.cft[1].name}</p>
                                <p><b>{data.cft[1].num}</b><a>{data.cft[1].unit}</a></p>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemimg2}></div>
                            <div className={styles.itembox}>
                                <p className={styles.itemp}>{data.cft[2].name}</p>
                                <p><b>{data.cft[2].num}</b><a>{data.cft[2].unit}</a></p>
                            </div>
                        </div>
                    </div>
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
