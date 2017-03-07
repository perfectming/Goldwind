import React from 'react';
import {connect} from 'react-redux';
import styles from './nav.scss';
var {getState} = require('../../../../../../../redux/store');
var $ = require('jquery');
import _ from 'lodash';
let soam=require('../../../urlData').soam1;//设置接口
var actions = require('redux/actions');




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {


       let {manager,title,arr, changetab, act=0,leftd,fc_info='150801',skinStyle} = this.props;
       let date=leftd.ModelData;
       if(!date['150801']){
        return (
          <div className={skinStyle==2?styles.navboxWhite:styles.navbox}>
                <div className={styles.navleft}>
                   {
                    title.map((value,key)=>{
                        return(
                            <span className={ act===key? styles.active : styles.actspan } key={key} onClick={()=>changetab(value.rpage,key)}>{value.tabname}</span>
                            )

                    })

                   }
                    <div className={`${styles.numtai} ${styles.nummor}`}><div className={styles.numname}>型号：</div><b>--</b><a>台</a></div>
                    <div className={styles.numtai}><div className={styles.numname}>总计</div><b>--</b><a>台</a></div>
                    

                </div>
                <div className={styles.navright}>
                    <div className={styles.userinfo}>
                        <span>
                            <p>手机</p>
                            <p className={styles.username}>{manager && manager.data && manager.data.mobile}</p>
                        </span>
                    </div>
                    <div className={styles.userinfo}>
                         <span>
                            <p>电话</p>
                            <p className={styles.username}>{manager && manager.data && manager.data.telephone}</p>
                        </span>
                    </div>
                    <div className={`${styles.userinfo} ${styles.usericon}`}>
                        <span className={styles.usmar}>
                            <p>场长</p>
                            <p className={styles.username}>{manager && manager.data && manager.data.wfleader}</p>
                        </span>
                    </div>
                    
                </div>
            </div>
        );

       }else{
        return (
          <div className={skinStyle==2?styles.navboxWhite:styles.navbox}>
                <div className={styles.navleft}>
                   {
                    title.map((value,key)=>{
                        return(
                            <span className={ act===key? styles.active : styles.actspan } key={key} onClick={()=>changetab(value.rpage,key)}>{value.tabname}</span>
                            )

                    })

                   }
                    <div className={`${styles.numtai} ${styles.nummor}`}><div className={styles.numname}>型号：</div><b>--</b><a>台</a></div>
                    <div className={styles.numtai}><div className={styles.numname}>总计</div><b>{date[fc_info].WTCount==0?date[fc_info].InverterCount:date[fc_info].WTCount}</b><a>台</a></div>
                    

                </div>
                <div className={styles.navright}>
                    <div className={styles.userinfo}>
                        <span>
                            <p>手机</p>
                            <p className={styles.username}>{manager && manager.data && manager.data.mobile}</p>
                        </span>
                    </div>
                    <div className={styles.userinfo}>
                         <span>
                            <p>电话</p>
                            <p className={styles.username}>{manager && manager.data && manager.data.telephone}</p>
                        </span>
                    </div>
                    <div className={`${styles.userinfo} ${styles.usericon}`}>
                        <span className={styles.usmar}>
                            <p>场长</p>
                            <p className={styles.username}>{manager && manager.data && manager.data.wfleader}</p>
                        </span>
                    </div>
                    
                </div>
            </div>
        );


       }
       
        
    }
});


const mapStateToProps = (state) => {
    return {
        act: state.vars.actbtn,
        fc_info:state.vars.fc_info,
        skinStyle: state.vars.skinStyle,
        manager: state.objs.mana
       
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            let value = _.clone(getState().vars.fc_info);
            $.ajax({
                url: soam+'/wcc/findOneWcontacterByWfid',
                type: 'post',
                data:'wfid='+value,
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('mana', data));
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },
        changetab:(page,act)=>{
            dispatch(actions.setVars('numpage', page));
            dispatch(actions.setVars('actbtn', act));
            dispatch(actions.setVars('page1', 1));
        }
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
