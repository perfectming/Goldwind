import React from 'react';
import {connect} from 'react-redux';
import styles from './Distribution.scss';
import Block from './super/block.jsx';
import Block1 from './super/block1.jsx';
import Title from './super/Title.jsx';
import Column from './chart/column1.jsx';
import dataBase from '../../../../../config/ModelData';
import model from '../../../../../config/Model';
import matrix from '../../../../../config/MatrixModel';
import matData from '../../../../../config/MatrixData';
import map1 from '../img/comp/DistributionMap.jpg' ;
import leftIcon from '../img/comp/leftIcon.png' ;
import rightIcon from '../img/comp/rightIcon.png' ;

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let data=dataBase.ModelData;
        let mod=model.Model;
        let  mat=matrix.Model;
        let matD=matData.ModelData;
        let {clickNumber, showFlag, changeFlag, flag=true,play} = this.props;
        return (
            <div className={styles.bodyBox}>
                    <div className={`${styles.leftBox} ${flag===true? styles.animat1 : styles.animat}`}>
                        <div  className={`${styles.states} ${styles.box_shadow}`}>

                            <Title title={['综合指标']}></Title>
                            <div className={styles.wind}>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.TActPower.name}</a><a className={styles.anum}><b>{data[8888800].TActPower}</b>{mod.dis.TActPower.unit}</a></span>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.Capacity.name}</a><a className={styles.anum}><b>{data[8888800].Capacity}</b>{mod.dis.Capacity.unit}</a></span>
                                <span className={styles.num}><a className={styles.anum1}>风电容量</a><a className={styles.anum}><b>{data[8888801].Capacity}</b>{mod.dis.Capacity.unit}</a></span>
                                <span className={styles.num}><a className={styles.anum1}>光伏容量</a><a className={styles.anum}><b>{data[8888802].Capacity}</b>{mod.dis.Capacity.unit}</a></span>
                            </div>
                            <div className={styles.wind}>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.YearEgyAt.name}</a><a className={styles.anum}><b>{data[8888800].YearEgyAt}</b>{mod.dis.YearEgyAt.unit}</a></span>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.MonthEgyAt.name}</a><a className={styles.anum}><b>{data[8888800].MonthEgyAt}</b>{mod.dis.MonthEgyAt.unit}</a></span>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.DayEgyAt.name}</a><a className={styles.anum}><b>{data[8888800].DayEgyAt}</b>{mod.dis.DayEgyAt.unit}</a></span>

                            </div>
                        </div>
                        <div className={`${styles.states} ${styles.states2} ${styles.box_shadow}`}>

                            <Title title={['风场指标',]}></Title>
                            <div className={styles.wind}>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.WFCount.name}</a><a className={styles.anum}><b>{data[8888800].WFCount}</b>{mod.dis.WFCount.unit}</a></span>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.WTCount.name}</a><a className={styles.anum}><b>{data[8888800].WTCount}</b>{mod.dis.WTCount.unit}</a></span>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{data[8888800].WindSpeed_DevAverValue}</b>{mod.dis.WindSpeed_DevAverValue.unit}</a></span>

                            </div>
                            <div className={styles.wind}>
                                <Block></Block>

                            </div>
                        </div>
                        <div className={`${styles.states} ${styles.Speed} ${styles.box_shadow}`}>

                            <Title title={['机组运行状态','逆变器运行状态']}></Title>
                            <div className={styles.wind}>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.PVCount.name}</a><a className={styles.anum}><b>{data[8888802].PVCount}</b>个</a></span>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.InverterCount.name}</a><a className={styles.anum}><b>{data[8888802].InverterCount}</b>台</a></span>
                                <span className={styles.num}><a className={styles.anum1}>{mod.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{data[8888802].PVTSI_Aver}</b>W/m<sup>2</sup></a></span>

                            </div>
                            <div className={styles.spedc}>
                                <Block1></Block1>
                            </div>


                        </div>
                        <div className={`${styles.Situation} ${styles.box_shadow}`}>

                            <Title title={['发电量完成情况']}></Title>
                            <p>{mod.dis.YearEgyAt.name}({mod.dis.YearEgyAt.unit})</p>
                            <div className={styles.boxone}>
                                <div className={styles.absbox1} style={{width:((data[8888800].YearEgyAt/data[8888800].YearPlanTotEgyAt)*100).toFixed(1)+"%"}}>{data[8888800].YearEgyAt}</div>
                                <span className={styles.absnum} >{((data[8888800].YearEgyAt/data[8888800].YearPlanTotEgyAt)*100).toFixed(1)}%</span>
                            </div>
                            <p>{mod.dis.MonthEgyAt.name}({mod.dis.MonthEgyAt.unit})</p>
                            <div className={styles.boxone}>
                                <div className={`${styles.absbox1} ${styles.absbox2}`} style={{width:((data[8888800].MonthEgyAt/data[8888800].CurMonthPlanEgyAt)*100).toFixed(2)+"%"}} >{data[8888800].MonthEgyAt}</div>
                                <span className={styles.absnum}>{((data[8888800].MonthEgyAt/data[8888800].CurMonthPlanEgyAt)*100).toFixed(2)}%</span>
                            </div>

                        </div>
                        <div className={`${styles.Completion} ${styles.box_shadow}`}>

                            <Title title={['发电量完成率']}></Title>
                            <Column></Column>

                        </div>
                    </div>
                <div className={styles.changeBox}>
                    <img src={flag===true? leftIcon:rightIcon} onClick={()=>{changeFlag(flag===true? true:false,flag )}}/>
                </div>
<<<<<<< HEAD
                <div className={`${styles.rightBox} ${flag===true? styles.animat3 : styles.animat2}`}>
                    <img src={map1} onClick={()=>play()}
                    />
=======
                <div className={styles.rightBox} >
                   <img src={map1}/>
>>>>>>> e9789160e40d07cf7eb6d2b9508d656bd7039c16
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        showFlag : state.vars.distributionLeftBox,
        flag:state.vars.flagff,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
<<<<<<< HEAD
        play:()=>{
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('navhide', false));
        },
        changeFlag :(flag)=>{
            dispatch(actions.setVars('distributionLeftBox', flag));
            if(flag){
                flag=false;
            }else{
                flag=true;
            };
            dispatch(actions.setVars('flagff', flag));
        }
=======
>>>>>>> e9789160e40d07cf7eb6d2b9508d656bd7039c16
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
