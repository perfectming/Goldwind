import React from 'react';
import {connect} from 'react-redux';
import styles from './distribution.scss';
import leftIcon from '../../../img/icon/direct_icon.png' ;
import rightIcon from '../../../img/icon/direct_icon1.png' ;
import Superleftbox from './superleftbox.jsx';
let Item = require('./fpinterface/date');
import Login from '../../../../../../components/common/Loading.jsx';
var $ = require('jquery');
let time;
var actions = require('redux/actions');

let Component = React.createClass({
    componentWillMount() {
        this.props.getdata();
    },
    componentWillUnmount() {
       clearInterval(time)
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {clickNumber, showFlag, changeFlag, flag,play,map=false,map1=false,show_allinfo,mapbool=false,mapmodel,mapdata} = this.props;
        
        
        if(mapbool){
        let wind=[];
        let light=[];
        let wTact=0,lTact=0;
        if(mapmodel!=undefined){
        for(let name in mapmodel.ens){ 
      if(mapmodel.ens[name].wft=='Wf')  {  
            wind.push(mapmodel.ens[name].cis)
        }else if(mapmodel.ens[name].wft=='Gf'){
            light.push(mapmodel.ens[name].cis)
        }
           
        }
        if(wind.length!=0){
            wind.map(function(value,key){
                mapdata[value].TActPower==undefined? wTact=0 : wTact+=Number(mapdata[value].TActPower)
            })
        }
        if(light.length!=0){
            light.map(function(value,key){
                mapdata[value].TActPower==undefined? lTact=0 : lTact+=Number(mapdata[value].TActPower)
            })
        }
        }
        console.log(wTact)
        
        return (
            <div className={styles.bodyBox}>
                    <div className={styles.leftBox}>
                        <Superleftbox></Superleftbox>
                    </div>
               
                <div className={styles.rightBox}>
                    <div className={`${styles.bigimg} ${map===true? styles.animat4 : styles.animat6} ${map1===true? styles.animat5 : styles.animat6} `}>
                        <div className={map==true? styles.place1 : styles.place2}  onClick={()=>play(map,map1)}></div>
                        <div className={styles.allinfo} id='allinfo'>
                            <h3>综合指标</h3>
                            <p className={styles.capday}>
                                <span className={styles.allspan}><a className={styles.anum1}>装机容量</a><a className={styles.anum}><b>{Number((mapdata[8888800].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></span>
                                <span className={styles.allspan}><a className={styles.anum1}>日发电量</a><a className={styles.anum}><b>{Number((mapdata[8888800].DayEgyAt)*mapmodel.dis.DayEgyAt.coeff).toFixed(mapmodel.dis.DayEgyAt.place)}</b>{mapmodel.dis.DayEgyAt.unit}</a></span>
                            </p>
                            <div className={styles.wind}>
                             <div className={styles.ptit}>风场指标</div>
                              <div className={styles.allitem}><a className={styles.anum1}>风电容量</a><a className={styles.anum}><b>{Number((mapdata[8888801].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.WFCount.name}</a><a className={styles.anum}><b>{mapdata[8888801].WFCount}</b>个</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.WTCount.name}</a><a className={styles.anum}><b>{mapdata[8888800].WTCount}</b>台</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{Number(mapdata[8888800].WindSpeed_DevAverValue).toFixed(2)=='NaN' ? '--' : Number(mapdata[8888800].WindSpeed_DevAverValue).toFixed(2)}</b>{mapmodel.dis.WindSpeed_DevAverValue.unit}</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{wTact==0 ? '--' : wTact }</b>kW</a></div>
                            </div>
                            <div className={styles.light}>
                             <div className={styles.ptit}>光伏指标</div>
                              <div className={styles.allitem}><a className={styles.anum1}>光伏容量</a><a className={styles.anum}><b>{Number((mapdata[8888802].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.PVCount.name}</a><a className={styles.anum}><b>{mapdata[8888802].PVCount}</b>个</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.InverterCount.name}</a><a className={styles.anum}><b>{mapdata[8888802].InverterCount}</b>台</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{mapdata[8888802].PVTSI_Aver ==='null' ? '--':Number(mapdata[8888802].PVTSI_Aver).toFixed(2)}</b>W/㎡</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{lTact==0 ? '--' : lTact }</b>kW</a></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.mapitem}>
                    {
                        Item.mapitem.map((value,key)=>{
                            if(key==5){
                            return(
                                 <div className={styles.item_btn} key={key} onClick={()=>show_allinfo(map1)}>
                                    <img src={value.url}/>
                                    <span>{value.name}</span>
                                 </div>

                                )
                            }else{
                                return(
                                 <div className={styles.item_btn} key={key}>
                                    <img src={value.url}/>
                                    <span>{value.name}</span>
                                 </div>

                                )
                            }

                        })
                    }
                    </div>
                </div>
            </div>
        );
        }else{
            return(
                <Login></Login>
                )
        }
    }
});


const mapStateToProps = (state) => {
    return {
        showFlag : state.vars.distributionLeftBox,
        flag:state.vars.flagff,
        map:state.vars.map,
        map1:state.vars.map1,
        mapbool:state.vars.mapbool,
        mapmodel:state.objs.mapmodel,
        mapdata:state.objs.mapdata,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getdata:()=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
                function setData(mapmodel){
                    if(mapmodel.Model==undefined){
                         TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
                    }else{
                    dispatch(actions.appendObjs('mapmodel', mapmodel.Model));
                    TY.getRtData("DataOverview", 8888800, setData1)
                        function setData1(mapdata){
                            TY.getRtData("DataOverview", 8888800, setData1)
                                function setData1(mapdata){
                                    if(mapdata.ModelData==undefined){
                                         TY.getRtData("DataOverview", 8888800, setData1)
                                    }else{
                                    dispatch(actions.appendObjs('mapdata', mapdata.ModelData));
                                    setTimeout(function(){
                                       dispatch(actions.setVars('mapbool', true));  

                                   },100)
                                     
                                }
                            }
                        }
                    }
                }


                 // time=setInterval(function(){
                 //    TY.getRtData("DataOverview", 8888800, setData1)
                 //        function setData1(bbs1){
                 //            dispatch(actions.setVars('bbs', bbs1));
   
                 //        }
                 // },2000)
                                                   
            
        },
        init: () => {
            var obj = {
                test:''
            }
        },
        play:(map,map1)=>{
                if(map){
                    map=false;
                    map1=true;
                }else{
                    map1=false;
                    map=true;
                }
                $('#allinfo').hide();
             dispatch(actions.setVars('map', map));
             dispatch(actions.setVars('map1', map1));
            
        },
        changeFlag :(flag)=>{
            dispatch(actions.setVars('distributionLeftBox', flag));
            if(flag){
                flag=false;
            }else{
                flag=true;
            };
            dispatch(actions.setVars('flagff', flag));
        },
        show_allinfo:(map1)=>{
            
            if(map1){
                
                $('#allinfo').toggle();
            }else{
                $('#allinfo').hide();
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
