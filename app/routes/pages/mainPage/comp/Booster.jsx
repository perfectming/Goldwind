
import React from 'react';
import {connect} from 'react-redux';
import styles from './Booster.scss';
var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{jyname,jydata,changepage,changepage2}=this.props;
        let modens=jyname.Model.ens;
        let moddis=jyname.Model.dis;
        let moddata=jydata.ModelData;
        let arr1=[];
        let arr2=[];


        (function(){
            for(let i in modens){
                if ( modens[i].wft=='Wf'){
                    arr1.push(i);
                }
                if ( modens[i].wft=='Gf'){
                    arr2.push(i);
                }
            }
        }());
        return(
            <div className={styles.bodyBox}>
                {
                    arr1.map((value, key)=> {
                        return (
                            <div className={`${styles.station} ${styles.box_shadow}`} key={key}>
                                <div className={styles.titlep}><span onClick={()=>changepage(value,key)}>{[modens[value]['name']]}</span></div>
                                <div className={styles.lastt}>
                                    <div className={styles.lasttt}>{[moddis.Capacity['name']]} : {[(moddata[value].Capacity*moddis.Capacity.coeff).toFixed(moddis.Capacity.place)]} {moddis.Capacity.unit}</div>
                                    <div className={styles.lasttt}>{[moddis.PlanActPower['name']]} : {[(moddata[value].PlanActPower*moddis.PlanActPower.coeff).toFixed(moddis.PlanActPower.place)]} {moddis.PlanActPower.unit}</div>
                                    <div className={styles.lasttt}>{[moddis.Transformer_P['name']]} : {[(moddata[value].Transformer_P*moddis.Transformer_P.coeff).toFixed(moddis.Transformer_P.place)]} {moddis.Transformer_P.unit}</div>
                                    <div className={styles.lasttt}>{[moddis.AVC['name']]}/{[moddis.AGC['name']]} :
                                        <div className={moddata[value].AVC=='#669999'?styles.succ:(moddata[value].AVC=='#FF0000'?styles.defa:styles.cutD)}></div>
                                        <div className={moddata[value].AGC=='#669999'?styles.succ:(moddata[value].AGC=='#FF0000'?styles.defa:styles.cutD)}></div>
                                    </div>
                                </div>
                                <div className={styles.mainn}>

                                </div>
                            </div>


                        )
                    })
                }
                {
                    arr2.map((value, key)=> {
                        return (
                            <div className={`${styles.station} ${styles.box_shadow}`} key={key}>
                                <div className={styles.titlep}><span onClick={()=>changepage2(value,key)}>{[modens[value]['name']]}</span></div>
                                <div className={styles.lastt}>
                                    <div className={styles.lasttt}>{[moddis.Capacity['name']]} : {[(moddata[value].Capacity*moddis.Capacity.coeff).toFixed(moddis.Capacity.place)]} {moddis.Capacity.unit}</div>
                                    <div className={styles.lasttt}>{[moddis.PlanActPower['name']]} : {[(moddata[value].PlanActPower*moddis.PlanActPower.coeff).toFixed(moddis.PlanActPower.place)]} {moddis.PlanActPower.unit}</div>
                                    <div className={styles.lasttt}>{[moddis.Transformer_P['name']]} : {[(moddata[value].Transformer_P*moddis.Transformer_P.coeff).toFixed(moddis.Transformer_P.place)]} {moddis.Transformer_P.unit}</div>
                                    <div className={styles.lasttt}>{[moddis.AVC['name']]}/{[moddis.AGC['name']]} :
                                        <div className={moddata[value].AVC=='#669999'?styles.succ:(moddata[value].AVC=='#FF0000'?styles.defa:styles.cutD)}></div>
                                        <div className={moddata[value].AGC=='#669999'?styles.succ:(moddata[value].AGC=='#FF0000'?styles.defa:styles.cutD)}></div>
                                    </div>
                                </div>
                                <div className={styles.mainn}>

                                </div>
                            </div>


                        )
                    })
                }
            </div>

        )
    }
});


const mapStateToProps = (state) => {
    return {
        jyname: state.vars.jyname,
        jydata: state.vars.jydata,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        changepage:(value,key)=>{
            dispatch(actions.setVars('Changnav', 0));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('actbt1','' ));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('befor_page','booster' ));
            dispatch(actions.setVars('fc_info', value));
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'fan_matrix'));
            dispatch(actions.setVars('actbtn', 3));
            dispatch(actions.setVars('numpage', 'syzjs'));

        },
        changepage2:(value,key)=>{
            dispatch(actions.setVars('Changnav', 1));
            dispatch(actions.setVars('fan_page', 'allpage'));
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('actbt','' ));
            dispatch(actions.setVars('actbt1',key ));
            dispatch(actions.setVars('befor_page','booster' ));
            dispatch(actions.setVars('fc_info', value));
            dispatch(actions.setVars('showPage', 'cs'));
            dispatch(actions.setVars('pagename', 'fan_matrix'));
            dispatch(actions.setVars('actbtn', 3));
            dispatch(actions.setVars('numpage', 'syzjs'));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
