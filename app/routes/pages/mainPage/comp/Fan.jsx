import React from 'react';
import {connect} from 'react-redux';

import Block from './super/block.jsx';
import Title from './super/Title.jsx';
import Column from './chart/Column.jsx';
import Pie from './chart/Pie.jsx';
import Line from './chart/Line.jsx';
import styles from './Fan.scss';
<<<<<<< HEAD
// import dataBase from '../../../../../config/ModelData';
import matrix from '../../../../../config/MatrixModel';
import icon0 from '../img/comp/icon0.png';
import icon1 from '../img/comp/icon1.png';
import icon2 from '../img/comp/icon2.png';
import icon3 from '../img/comp/icon3.png';
import icon4 from '../img/comp/icon4.png';
import icon5 from '../img/comp/icon5.png';

// let fanData = require('../../../../../config/fan-data');
let matrixdata = require('../../../../../config/MatrixData');
let model = require('../../../../../config/Model');
let modeldata = require('../../../../../config/ModelData');

        let data=modeldata.ModelData;
        let mod=model.Model;
        let  mat=matrix.Model;
        let matD=matrixdata.ModelData;

var skt2 = modeldata.ModelData;

var arr3 = [];
var arr4 = [];
var skt = model.Model.ens;
for(var j in skt){
    arr3.push(skt[j])
}
// arr3.map((valueE,keyE)=> {
//     return (
//         console.log(valueE.name)
//         )
// });


 var arr1 = [];
 var arr2 = [];
 // var arr3 = [];
 // var arr4 = [];
 var obj = matrixdata;
    var ssg1 = obj.ModelData[8888801].WFDevsStatus;
    var ssg2 = obj.ModelData[8888802].PVDevsStatus;


    // console.log(ssg1);
    for(var x in ssg1){
        arr1.push(x)
        // for(var y in ssg1[x]){
        //     arr2.push(ssg1[x][y])
        // }
    }
    for(var m in ssg2){
        arr2.push(m)
        // for(var n in ssg1[m]){
        //     arr2.push(ssg1[m][n])
        // }
    }
    // console.log(arr1);
    console.log(arr2);
arr1.map((valueZ, keyZ)=> {
    // console.log(valueZ)
})
=======
import Login from '../../../../components/common/Loading.jsx';
import Superleftbox from './super/superleftbox.jsx';
// import dataBase from '../../../../../config/ModelData';
import matrix from '../../../../../config/MatrixModel';
var actions = require('redux/actions');
var { Router, Route, browserHistory} = require('react-router');
// let fanData = require('../../../../../config/fan-data');
// let matrixdata = require('../../../../../config/MatrixData');
// let model = require('../../../../../config/Model'); 
// let modeldata = require('../../../../../config/ModelData');

//         let data=modeldata.ModelData;
//         let mod=model.Model;
//         let  mat=matrix.Model;
//         let matD=matrixdata.ModelData;

// var model_data = modeldata.ModelData;

// var arr3 = [];
// var arr4 = [];
// // var model_ens = model.Model.ens;
// for(var j in model_ens){
//     arr3.push(model_ens[j])
// }
// // arr3.map((valueE,keyE)=> {
// //     return (
// //         console.log(valueE.name)
// //         )
// // });
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43


//  var arr1 = [];
//  var arr2 = [];
//  // var arr3 = [];
//  // var arr4 = [];
//  var obj = matrixdata;
//     var obj_wfd = obj.ModelData[8888801].WFDevsStatus;
//     var obj_pvd = obj.ModelData[8888802].PVDevsStatus;


//     // console.log(obj_pvd);
//     for(var x in obj_wfd){
//         arr1.push(x);
//         // for(var y in obj_wfd[x]){
//         //     arr2.push(obj_wfd[x][y])
//         // }
//     }
//     for(var m in obj_pvd){
//         arr2.push(m);
//         // for(var n in obj_wfd[m]){
//         //     arr2.push(obj_wfd[m][n])
//         // }
//     }
//     // console.log(arr2);
//     // console.log(arr1);
//     // console.log(arr2);
// // arr2.map((valueZ, keyZ)=> {
// //     console.log( )
// // })


let time;
let Component = React.createClass({
    componentWillMount() {
        this.props.changedate();
    },
     componentWillUnmount() {
       clearInterval(time)
    },
    componentDidMount() {
        this.props.init();
    },
    
    render() {
       


        let {pageTo_1,pageTo_2,Tofaninfo1,Topvinfo1,zhzb,fModel,fData,fanbool=false}=this.props;
        // console.log(fModel);
        // console.log(fData);
        // console.log(zhzb);
        if(fanbool){
        let model_ens = zhzb.Model.ens;
        let obj_wfd = fData.ModelData[8888801].WFDevsStatus;
        let obj_pvd = fData.ModelData[8888802].PVDevsStatus;
        let arr1 = [];
        let arr2 = [];
        for(var x in obj_wfd){
            arr1.push(x);
            // for(var y in obj_wfd[x]){
            //     arr2.push(obj_wfd[x][y])
            // }
        }
        for(var m in obj_pvd){
            arr2.push(m);
            // for(var n in obj_wfd[m]){
            //     arr2.push(obj_wfd[m][n])
            // }
        }
        // console.log(arr1,arr2)
        return (

            <div className={styles.bodyBox}>

                <div className={styles.leftBox}>
<<<<<<< HEAD
                    <div  className={`${styles.states} ${styles.box_shadow}`}>
                    
                         <Title title={['综合指标']}></Title>
                         <Title title={['综合指标']}></Title>
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
                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect} style={{"color":"#1fe005"}}>运行</span>
                                <span className={styles.numx} style={{"color":"#1fe005"}}>{data[8888801].ONL}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect} style={{"color":"#ff0000"}}>故障</span>
                                <span className={styles.numx} style={{"color":"#ff0000"}}>{data[8888801].FaultCount}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon2}/></span>
                                <span className={styles.contect} style={{"color":"#fbd500"}}>检测</span>
                                <span className={styles.numx} style={{"color":"#fbd500"}}>{data[8888801].RepairCount}</span>
                             </div>
                               <div className={styles.box}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect} style={{"color":"#929396"}}>离线</span>
                                <span className={styles.numx} style={{"color":"#929396"}}>{data[8888801].OfflineCount}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon4}/></span>
                                <span className={styles.contect} style={{"color":"#2189ff"}}>待机</span>
                                <span className={styles.numx} style={{"color":"#2189ff"}}>{data[8888801].WFStandbyCount}</span>
                             </div>

                             <div className={styles.box}>
                                <span className={styles.block}><img src={icon5}/></span>
                                <span className={styles.contect} style={{"color":"#dddcdc"}}>限电</span>
                                <span className={styles.numx} style={{"color":"#dddcdc"}}>{data[8888802].PVOFL}</span>
                             </div>


                            
                         </div>
                    </div>
                    <div className={`${styles.states} ${styles.Speed} ${styles.box_shadow}`}>
                      
                        <Title title={['光伏指标']}></Title>
                         <div className={styles.wind}>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.PVCount.name}</a><a className={styles.anum}><b>{data[8888802].PVCount}</b>个</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.InverterCount.name}</a><a className={styles.anum}><b>{data[8888802].InverterCount}</b>台</a></span>
                            <span className={styles.num}><a className={styles.anum1}>{mod.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{data[8888802].PVTSI_Aver}</b>W/m<sup>2</sup></a></span>
                          
                         </div>
                        <div className={styles.spedc}>


                            <div className={`${styles.box} ${styles.box1}`}>
                                <span className={styles.block}><img src={icon0}/></span>
                                <span className={styles.contect} style={{"color":"#1fe005"}}>运行</span>
                                <span className={styles.num} style={{"color":"#1fe005"}}>{data[8888802].PVONL}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`}>
                                <span className={styles.block}><img src={icon1}/></span>
                                <span className={styles.contect} style={{"color":"#ff0000"}}>故障</span>
                                <span className={styles.num} style={{"color":"#ff0000"}}>{data[8888802].PVFLT}</span>
                             </div>

                             <div className={`${styles.box} ${styles.box1}`}>
                                <span className={styles.block}><img src={icon3}/></span>
                                <span className={styles.contect} style={{"color":"#929396"}}>离线</span>
                                <span className={styles.num} style={{"color":"#929396"}}>{data[8888802].PVOFL}</span>
                             </div>




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

                <div className={styles.listrightBox}>
                    <div className={styles.listbodyBox}>
                    {
                    arr1.map((value, key)=> {
                        return (
                            <div className={styles.listheaderBox} key={key}>
                                <button className={styles.listbtn}>{skt[value].name}</button>
                                <div className={styles.listopt}>
                                    {
                                        ssg1[value].map((valueA, keyA)=> {
                                            return (
                                                
                                                    <div className={styles.listoptbtn_2}  key={keyA}><span>{valueA.Wtname}</span>
                                                        <div className={styles.listoptinfo}>
                                                            <span>{valueA.Wtname}</span>
                                                                <p>{'风速:'+Math.ceil(skt2[value].WindSpeed_DevAverValue/3600)+'m/s'}</p>
                                                                <p>{'功率:'+Number(skt2[value].WindSpeed_DevAverValue).toFixed(2)+'KW'}</p>
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                        
                    })
                   
                    }
                    </div>
                </div>

=======
                    <Superleftbox></Superleftbox>
                </div>
                <div className={styles.listrightBox}>
                    <div className={styles.listbodyBox1}>
                    <div>
                    {
                    arr1.map((value, key)=> {
                        return (
                            <div className={styles.listheaderBox} key={key}>
                                <button className={styles.listbtn} onClick={()=>pageTo_1(value,key,fData)}>{model_ens[value].name}</button>
                                <div className={styles.listopt}>
                                    {
                                        obj_wfd[value].map((valueA, keyA)=> {
                                            let i;
                                            let code = valueA.WTStateCode;
                                            // console.log(code);
                                            switch(code)
                                                {
                                                    case "DisComForPre":
                                                        i = "离线";
                                                        break;
                                                    case "DisComForPlc":
                                                        i = "离线";
                                                        break;
                                                    case "Unknown":
                                                        i = "离线";
                                                        break;
                                                    case "Online":
                                                        i = "正常发电";
                                                        break;
                                                    case "LimitPow":
                                                        i = "限功率";
                                                        break;
                                                    case "Alarm":
                                                        i = "告警";
                                                        break;
                                                    case "Fault":
                                                        i = "故障停机";
                                                        break;
                                                    case "Offline":
                                                        i = "待机";
                                                        break;
                                                    case "ProtoectStop":
                                                        i = "待机";
                                                        break;
                                                    case "LimitPowStop":
                                                        i = "待机";
                                                        break;
                                                    default:
                                                        i = "暂无状态";
                                                        break;
                                                }
                                            return (
                                                
                                                    <div className={`${styles.listoptbtn_2} ${code == "DisComForPre" ? styles.discomforpre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.limitPow : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`} key={keyA} onClick = {()=> Tofaninfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                        <div className={styles.listoptinfo}>
                                                            <span>{valueA.Wtname}</span>
                                                                <p>{'风速:'+Math.ceil(valueA.WindSpeed)+'m/s'}</p>
                                                                <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                        
                    })
                  
                    }
                    </div>
                    <div>
                    {
                    arr2.map((value, key)=> {
                        return (
                            <div className={styles.listheaderBox} key={key}>
                                <button className={styles.listbtn} onClick={()=>pageTo_2(value,key,fData)}>{model_ens[value].name}</button>
                                <div className={styles.listopt}>
                                    {
                                        obj_pvd[value].map((valueA, keyA)=> {
                                            let i;
                                            let code = valueA.WTStateCode;

                                            // console.log(valueA.PVTSI_Aver);
                                            switch(code)
                                                {
                                                    case "DisComForPre":
                                                        i = "离线";
                                                        break;
                                                    case "DisComForPlc":
                                                        i = "离线";
                                                        break;
                                                    case "Unknown":
                                                        i = "离线";
                                                        break;
                                                    case "Online":
                                                        i = "正常发电";
                                                        break;
                                                    case "LimitPow":
                                                        i = "限功率";
                                                        break;
                                                    case "Alarm":
                                                        i = "告警";
                                                        break;
                                                    case "Fault":
                                                        i = "故障停机";
                                                        break;
                                                    case "Offline":
                                                        i = "待机";
                                                        break;
                                                    case "ProtoectStop":
                                                        i = "待机";
                                                        break;
                                                    case "LimitPowStop":
                                                        i = "待机";
                                                        break;
                                                    default:
                                                        i = "暂无状态";
                                                        break;
                                                }
                                            return (
                                                
                                                    <div className={`${styles.listoptbtn_3} ${code == "DisComForPre" ? styles.discomforpre : (code == "DisComForPlc" ? styles.discomfor : (code === "Unknown" ? styles.discomfor : (code === "Online" ? styles.online : (code === "LimitPow" ? styles.online : (code === "Alarm" ? styles.Alarm : (code === "Fault" ? styles.fault : (code === "Offline" ? styles.discomfor : (code === "ProtoectStop" ? styles.discomfor : (code === "LimitPowStop" ? styles.discomfor : styles.default)))))))))}`}  key={keyA} onClick = {()=> Topvinfo1(value,valueA,key)}><span>{valueA.Wtname}</span>
                                                        <div className={styles.listoptinfo}>
                                                            <span>{valueA.Wtname}</span>
                                                                <p>{'辐照度:'+(valueA.PVTSI_Aver == undefined ? '--' : Math.ceil(valueA.PVTSI_Aver))+'W/㎡'}</p>
                                                                <p>{'功率:'+Number(valueA.ActPwr).toFixed(2)+'KW'}</p>
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                                                     
                    })
                  
                    }
                    </div>
                    </div>
                </div>
>>>>>>> 9f1a2c4903f5ad6c45ec995e413fedb506a23e43
            </div>
        );
        }else{
        return (
            <Login></Login>
        )
        }
    }
});


const mapStateToProps = (state) => {
    return {   
            zhzb: state.vars.zhzb,
            // bbs: state.vars.bbs,
            fModel: state.vars.fModel,
            fData: state.vars.fData,    
            fanbool: state.vars.fanbool,   
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedate: () => {
            time = setInterval(function(){
                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
                function setData(rdata){
                    dispatch(actions.setVars('zhzb', rdata));
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DevicesMatrix", setDatas, "Screen", 0);
                    function setDatas(rdata){
                        dispatch(actions.setVars('fModel', rdata));
                        TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(rdata){
                            TY.getRtData("DevicesMatrix", 8888800, setfData1)
                            function setfData1(rdata){
                                dispatch(actions.setVars('fData', rdata));
                                setTimeout(function(){
                                    dispatch(actions.setVars('fanbool', true));
                                },100)
                                
                            }
                        }
                    }
                }
            },3000)
            
        },
        init: () => {
            
        },

        pageTo_1:(value,key,fData)=>{
          dispatch(actions.setVars('numpage', 'fanmatrix'));
          dispatch(actions.setVars('valuepage', value));
          dispatch(actions.setVars('actbt',key ));
          dispatch(actions.setVars('actbt1','' ));
          dispatch(actions.setVars('fan_page', 'allpage'));
          dispatch(actions.setVars('befor_page','fan' ));
          dispatch(actions.setVars('fc_info', value));
          dispatch(actions.setVars('showPage', 'fan_matrix'));
          dispatch(actions.setVars('fData', fData));
          

        },
        pageTo_2:(value,key,fData)=>{
          dispatch(actions.setVars('numpage', 'pvmatrix'));
          dispatch(actions.setVars('valuepage1', value));
          dispatch(actions.setVars('actbt1',key ));
          dispatch(actions.setVars('actbt',''));
          dispatch(actions.setVars('fan_page', 'allpage'));
          dispatch(actions.setVars('befor_page','fan' ));
          dispatch(actions.setVars('fc_info', value));
          dispatch(actions.setVars('showPage', 'fan_matrix'));
          dispatch(actions.setVars('fData', fData));

        },
        Tofaninfo1: (value,valueA,key)=> {
            dispatch(actions.setVars('valuepage', value));
            dispatch(actions.setVars('value', valueA));
            dispatch(actions.setVars('valueid', value));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('befor_page','fan' ));
                
            dispatch(actions.setVars('showPage', 'turning'));
            dispatch(actions.setVars('pagename', 'fan_matrix')); 
            dispatch(actions.setVars('numtype', 'faninfo'));     
        },
        Topvinfo1: (value,valueA,key)=> {
            console.log(value,valueA,key)
            // dispatch(actions.setVars('valuepage1', value));
            dispatch(actions.setVars('value', valueA));
            dispatch(actions.setVars('valueid', value));
            dispatch(actions.setVars('actbt1',key ));
            dispatch(actions.setVars('actbt',''));
            dispatch(actions.setVars('befor_page','fan' ));


            dispatch(actions.setVars('showPage', 'turning'));
            dispatch(actions.setVars('pagename', 'fan_matrix')); 
            dispatch(actions.setVars('numtype', 'pvinfo')); 
            
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

