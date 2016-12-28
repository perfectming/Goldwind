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
        let {clickNumber, showFlag, changeFlag, flag,play,map=false,map1=false,show_allinfo,mapbool=false,mapmodel,mapdata,enterpage,enterpage1} = this.props;
        
        
        if(mapbool){
            console.log(mapmodel)
             
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
      
        
        return (
            <div className={styles.bodyBox}>
                    <div className={styles.leftBox}>
                        <Superleftbox></Superleftbox>
                    </div>
               
                <div className={styles.rightBox}>
                    <div className={`${styles.bigimg} ${map===true? styles.animat4 : styles.animat6} ${map1===true? styles.animat5 : styles.animat6} `}>
                        <div className={map==true? styles.place1 : styles.place2}  onClick={()=>play(map,map1)}></div>
                        <div id='sonitem'>
                             <div className={styles.mapenter} style={{top:'170px',left:'319px'}} onClick={()=>enterpage1('150811',1)}></div>
                            <div className={styles.mapenter} style={{top:'183px',left:'219px'}} onClick={()=>enterpage('150801',0)}></div>
                            <div className={styles.mapenter} style={{top:'359px',left:'219px'}} onClick={()=>enterpage1('150803',0)}></div>
                            <div className={styles.mapenter} style={{top:'453px',left:'419px'}} onClick={()=>enterpage1('150812',2)}></div>
                            <div className={styles.mapenter} style={{top:'294px',left:'77px'}} onClick={()=>enterpage('150828',1)}></div>
                        </div>
                        <div id='soninfo'>

                            <div className={styles.soninfo} style={{top:'0px',left:'300px'}}>
                                <div className={styles.sontit}><a className={styles.anum1}>川井光伏电站</a><a className={styles.anum}><b>{Number((mapdata[150811].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.InverterCount.name}</a><a className={styles.anum}><b>{mapdata[150811].InverterCount}</b>台</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{mapdata[150811].PVTSI_Aver ==='null' ? '--':Number(mapdata[150811].PVTSI_Aver).toFixed(2)}</b>W/㎡</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{mapdata[150811].TActPower ==='' ? '--':Number(mapdata[150811].TActPower/1000).toFixed(2)}</b>MW</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>出力率</a><a className={styles.anum}><b>{(mapdata[150811].TActPower/mapdata[150811].Capacity).toFixed(2)}</b>%</a></div>
                            </div>
                            <div className={`${styles.soninfo} ${styles.soninfo2}`} style={{top:'40px',left:'20px'}}>
                                 
                                 <div className={styles.sontit}><a className={styles.anum1}>川井风电场</a><a className={styles.anum}><b>{Number((mapdata[150801].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                                 <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.WTCount.name}</a><a className={styles.anum}><b>{mapdata[150801].WTCount}</b>台</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{mapdata[150801].WindSpeed_DevAverValue ==='null' ? '--':Number(mapdata[150801].WindSpeed_DevAverValue).toFixed(2)}</b>m/s</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{mapdata[150801].TActPower ==='' ? '--':Number(mapdata[150801].TActPower/1000).toFixed(2)}</b>MW</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>出力率</a><a className={styles.anum}><b>{(mapdata[150801].TActPower/mapdata[150801].Capacity).toFixed(2)}</b>%</a></div>
                            </div>
                            <div className={`${styles.soninfo} ${styles.soninfo3}`} style={{top:'285px',left:'360px'}}>
                                 <div className={styles.sontit}><a className={styles.anum1}>道勒光伏电站</a><a className={styles.anum}><b>{Number((mapdata[150803].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                                  <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.InverterCount.name}</a><a className={styles.anum}><b>{mapdata[150803].InverterCount}</b>台</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{mapdata[150803].PVTSI_Aver ==='null' ? '--':Number(mapdata[150803].PVTSI_Aver).toFixed(2)}</b>W/㎡</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{mapdata[150803].TActPower ==='' ? '--':Number(mapdata[150803].TActPower/1000).toFixed(2)}</b>MW</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>出力率</a><a className={styles.anum}><b>{(mapdata[150803].TActPower/mapdata[150803].Capacity).toFixed(2)}</b>%</a></div>
                            </div>
                            <div className={`${styles.soninfo} ${styles.soninfo4}`} style={{top:'465px',left:'520px'}}>
                                 <div className={styles.sontit}><a className={styles.anum1}>乌漫光伏电站</a><a className={styles.anum}><b>{Number((mapdata[150812].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                                  <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.InverterCount.name}</a><a className={styles.anum}><b>{mapdata[150812].InverterCount}</b>台</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{mapdata[150812].PVTSI_Aver ==='null' ? '--':Number(mapdata[150812].PVTSI_Aver).toFixed(2)}</b>W/㎡</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{mapdata[150812].TActPower ==='' ? '--':Number(mapdata[150812].TActPower/1000).toFixed(2)}</b>MW</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>出力率</a><a className={styles.anum}><b>{(mapdata[150812].TActPower/mapdata[150812].Capacity).toFixed(2)}</b>%</a></div>
                            </div>
                            <div className={`${styles.soninfo} ${styles.soninfo5}`} style={{top:'380px',left:'-20px'}}>
                                <div className={styles.sontit}><a className={styles.anum1}>敖包风电场</a><a className={styles.anum}><b>{Number((mapdata[150828].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                                 <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.WTCount.name}</a><a className={styles.anum}><b>{mapdata[150828].WTCount}</b>台</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>{mapmodel.dis.WindSpeed_DevAverValue.name}</a><a className={styles.anum}><b>{mapdata[150828].WindSpeed_DevAverValue ==='null' ? '--':Number(mapdata[150828].WindSpeed_DevAverValue).toFixed(2)}</b>m/s</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{mapdata[150828].TActPower ==='' ? '--':Number(mapdata[150828].TActPower/1000).toFixed(2)}</b>MW</a></div>
                                <div className={styles.sontit1}><a className={styles.anum1}>出力率</a><a className={styles.anum}><b>{(mapdata[150828].TActPower/mapdata[150828].Capacity).toFixed(2)}</b>%</a></div>
                            </div>
                        </div>
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
                              <div className={styles.allitem}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{wTact==0 ? '--' : (wTact/1000).toFixed(2) }</b>MW</a></div>
                            </div>
                            <div className={styles.light}>
                             <div className={styles.ptit}>光伏指标</div>
                              <div className={styles.allitem}><a className={styles.anum1}>光伏容量</a><a className={styles.anum}><b>{Number((mapdata[8888802].Capacity)*mapmodel.dis.Capacity.coeff).toFixed(mapmodel.dis.Capacity.place)}</b>{mapmodel.dis.Capacity.unit}</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.PVCount.name}</a><a className={styles.anum}><b>{mapdata[8888802].PVCount}</b>个</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.InverterCount.name}</a><a className={styles.anum}><b>{mapdata[8888802].InverterCount}</b>台</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>{mapmodel.dis.PVTSI_Aver.name}</a><a className={styles.anum}><b>{mapdata[8888802].PVTSI_Aver ==='null' ? '--':Number(mapdata[8888802].PVTSI_Aver).toFixed(2)}</b>W/㎡</a></div>
                              <div className={styles.allitem}><a className={styles.anum1}>有功功率</a><a className={styles.anum}><b>{lTact==0 ? '--' : (lTact/1000).toFixed(2) }</b>MW</a></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.mapitem}>
                    {
                        Item.mapitem.map((value,key)=>{
                            if(key==5){
                            return(
                                 <div className={styles.item_btn} key={key} onClick={()=>show_allinfo(map)}>
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
            dispatch(actions.setVars('mapbool', false)); 
            dispatch(actions.setVars('map', false));
             dispatch(actions.setVars('map1', false));
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
                                     start();
                                    setTimeout(function(){
                                       dispatch(actions.setVars('mapbool', true)); 
                                       document.getElementById('sonitem').style.display='none';
                                        document.getElementById('soninfo').style.display='none';
                                   },100)
                                     
                                }
                            }
                        }
                    }
                }

                function start(){
                     time=setInterval(function(){
                    TY.getRtData("DataOverview", 8888800, setData5)
                        function setData5(mapdata5){
                            dispatch(actions.setVars('bbs', mapdata5));
                            dispatch(actions.appendObjs('mapdata', mapdata5.ModelData));
   
                        }
                 },2000)
                }
                
                                                   
            
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
                    document.getElementById('soninfo').style.display='none';
                    document.getElementById('sonitem').style.display='none';
                }else{
                    map1=false;
                    map=true;
                    document.getElementById('allinfo').style.display='none';
                    document.getElementById('sonitem').style.display='block';
                }
                
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
                
                 $('#allinfo').hide();
                $('#soninfo').toggle();
            }else{
               
                $('#allinfo').toggle();
                $('#soninfo').hide();
            }
        },
        enterpage:(value2,key)=>{
           dispatch(actions.setVars('showPage', 'fan_matrix'));
           dispatch(actions.setVars('numpage', 'fanmatrix'));
           dispatch(actions.setVars('fan_page', 'allpage'));
           dispatch(actions.setVars('actbt',key ));
          dispatch(actions.setVars('actbtn',0));
          dispatch(actions.setVars('actbt1','' ));
           dispatch(actions.setVars('fc_info', value2));
           dispatch(actions.setVars('valuepage', value2));
           dispatch(actions.setVars('befor_page','distribution' ));
           dispatch(actions.setVars('Changnav', 0));
        },
         enterpage1:(value4,key)=>{
           dispatch(actions.setVars('showPage', 'fan_matrix'));
           dispatch(actions.setVars('numpage', 'pvmatrix'));
           dispatch(actions.setVars('fan_page', 'allpage'));
           dispatch(actions.setVars('actbt1',key ));
          dispatch(actions.setVars('actbtn',0));
          dispatch(actions.setVars('actbt','' ));
           dispatch(actions.setVars('fc_info', value4));
           dispatch(actions.setVars('valuepage1', value4));
           dispatch(actions.setVars('befor_page','distribution' ));
           dispatch(actions.setVars('Changnav', 1));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
