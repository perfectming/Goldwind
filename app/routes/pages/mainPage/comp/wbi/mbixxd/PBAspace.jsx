import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import PBAspacechart from './PBAspacechart.jsx';

import icono from './img/PBA.png';

var $ = require('jquery');

var actions = require('redux/actions');
  let data=require('./Profit-dataq');

// let button=data.button;
// let fanCost=data.fanCost;
// let fanCostA=data.fanCostA;
// let fanCostB=data.fanCostB;
// let fanCostC=data.fanCostC;
// let PBA=data.PBA;
let height=700;
let moree;
 let datee=new Date;
let month=datee.getMonth();
  let key=month;
let Component = React.createClass({
     componentWillMount() {
       let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{width,ipUrl,xxdwfId,xxdwfNa,btn=0,PBASpaceMorePba,PBASpaceMoreNodevreasonloss,PBASpaceMoreLimitloss,PBASpaceMoreMaintainloss,PBASpaceMoreFaultloss,PBASpaceMorePoweract,PBASpaceMoreWtname2,back,gogogo,PBASpaceFirstWtname,PBASpaceFirstPba,PBASpaceFirstNodevreasonloss,PBASpaceFirstLimitloss,PBASpaceFirstMaintainloss,PBASpaceFirstFaultloss,PBASpaceFirstPoweract,actbt=0,changpage,wind,windP,more,moree,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
        return (
            <div className={styles.box} >
            <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{ xxdwfNa+[actbt+1]+'月各风机PBA'}</p>
                <div onClick={()=>close()}>x</div>
                </div>
                 <div className={styles.scroll}>
                  <PBAspacechart fanProfitQ={PBASpaceMorePoweract}
                   machine={PBASpaceMoreWtname2} 
                   fanCost={PBASpaceMoreFaultloss} 
                   fanCostA={PBASpaceMoreMaintainloss} 
                   fanCostB={PBASpaceMoreLimitloss} 
                   fanCostC={PBASpaceMoreNodevreasonloss} 
                   PBA={PBASpaceMorePba} height={450} width={width} ty={10} pointWidth={20} pointPlacement={0.07} borderRadius={4}></PBAspacechart>
                 </div>
             </div>
               
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key,xxdwfId,ipUrl)} key={key}>{value.name}</li>)
                        })
                    }
     }
 
    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>

                </ul>
                <div className={styles.paddingtop}>
                <div className={styles.bigbox}>
                
                    
                         
                                <PBAspacechart fanProfitQ={PBASpaceFirstPoweract} machine={PBASpaceFirstWtname} fanCost={PBASpaceFirstFaultloss} fanCostA={PBASpaceFirstMaintainloss} fanCostB={PBASpaceFirstLimitloss} fanCostC={PBASpaceFirstNodevreasonloss} PBA={PBASpaceFirstPba} height={800} width={1735} text={xxdwfNa+[actbt+1]+'月各风机PBA'} ty={60} pointWidth={30}  pointPlacement={-0.07} borderRadius={4}></PBAspacechart>
                        
                    
                       
                  
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>
                    <div className={styles.buttons}>
                        <button className={btn===0? styles.btn0 : styles.btn1}onClick={()=>gogogo(actbt,xxdwfId,ipUrl)} > 前10</button>
                        <button className={btn===1? styles.btn0 : styles.btn1}onClick={()=>back(actbt,xxdwfId,ipUrl)}>后10</button>
                        <button className={btn===2? styles.btn0 : styles.btn1} onClick={()=>more(actbt,xxdwfId,ipUrl)}>更多</button>
                    </div>
                </div>
                </div>
            </div>


        );
    }
});



const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbt,
        wind:state.vars.wind,
        windP:state.vars.windP,
        moree:state.vars.moree,
        befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
        // 将上个月的数据赋值
        PBASpaceFirstWtname: state.vars.PBASpaceWtname1,
        PBASpaceFirstPoweract: state.vars.PBASpaceFirstPoweract1,
        PBASpaceFirstFaultloss: state.vars.PBASpaceFirstFaultloss1,
        PBASpaceFirstMaintainloss: state.vars.PBASpaceFirstMaintainloss1,
        PBASpaceFirstLimitloss: state.vars.PBASpaceFirstLimitloss1,
        PBASpaceFirstNodevreasonloss: state.vars.PBASpaceFirstNodevreasonloss1,
        PBASpaceFirstPba: state.vars.PBASpaceFirstPba12,
        //弹出的更多赋值
        PBASpaceMoreWtname2: state.vars.PBASpaceWtname111,
        PBASpaceMorePoweract: state.vars.PBASpaceFirstPoweract11,
        PBASpaceMoreFaultloss: state.vars.PBASpaceFirstFaultloss11,
        PBASpaceMoreMaintainloss: state.vars.PBASpaceFirstMaintainloss11,
        PBASpaceMoreLimitloss: state.vars.PBASpaceFirstLimitloss11,
        PBASpaceMoreNodevreasonloss: state.vars.PBASpaceFirstNodevreasonloss11,
        PBASpaceMorePba: state.vars.PBASpaceFirstPba121,
        //获取上面的id
        xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
        btn:state.vars.btnn,
        ipUrl:state.vars.ipUrl,
        width:state.vars.width1,

    
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (xxdwfId,xxdwfNa,input_url) => {
            let areaIds=[];
            let windIds=[];
            // 初始化上个月的数据
            let PBASpaceFirstWtname=[];
            let PBASpaceFirstPoweract=[];
            let PBASpaceFirstFaultloss=[];
            let PBASpaceFirstMaintainloss=[];
            let PBASpaceFirstLimitloss=[];
            let PBASpaceFirstNodevreasonloss=[];
            let PBASpaceFirstPbaP=[];
         
            // 获取上面的区域
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/BaseData/getGroup',
                async:false,
          
                dataType:'json',
                timeout:'3000',
                success:function(data){
               
                    for(let i in data.data){
                        areaIds.push(i);
                    }
               
                    // 获取x轴的值内蒙达茂天润风电场
            
                },
                error:function(){
            
                },
            });
            //获取所有的风场
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/BaseData/getWfsByGroupid',
                async:false,
                data:{
                    'groupid':areaIds[0],
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
             
                    for(let i in data.data){
                        windIds.push(i);
                    }
                

                    // 获取x轴的值内蒙达茂天润风电场
            
                },
                error:function(){
                  
                },
            });
            // 根据风场找PBA空间
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':month,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
           
                    let PBASpaceFirstPba=data.data;
                    for ( let  i=0;i<10;i++){
                        let wtname=PBASpaceFirstPba[i].wtname;
                        PBASpaceFirstWtname.push(wtname);
                        let poweract=PBASpaceFirstPba[i].poweract;
                        PBASpaceFirstPoweract.push(poweract);
                        let faultloss=PBASpaceFirstPba[i].faultloss;
                        PBASpaceFirstFaultloss.push(faultloss);
                        let maintainloss=PBASpaceFirstPba[i].maintainloss;
                        PBASpaceFirstMaintainloss.push(maintainloss);
                        let limitloss=PBASpaceFirstPba[i].limitloss;
                        PBASpaceFirstLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpaceFirstPba[i].nodevreasonloss;
                        PBASpaceFirstNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpaceFirstPba[i].pba*100
                        PBASpaceFirstPbaP.push(Number(pba.toFixed(1)));
                    }
           
         
               
            
                },
                error:function(){
               
                },
            });
            // 将初始化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceFirstWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpaceFirstPoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceFirstMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceFirstLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFirstFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceFirstNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpaceFirstPbaP ));
            dispatch(actions.setVars('actbt',month-1 ));
            dispatch(actions.setVars('btnn',0));
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(value,key,xxdwfId,input_url)=>{
            //切换月份传值
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];
            let PBASpacePba=[];
            let PBASpacePbaPBA=[];
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':key+1,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
           
                    let PBASpacePba=data.data;
                    for  ( let  i=0;i<10;i++){
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpacePba[i].pba*100;
                        PBASpacePbaPBA.push(Number(pba.toFixed(1)));
                    }
               

                },
                error:function(){
               
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpacePbaPBA ));
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('btnn',0));
          
        },
        gogogo:(actbt,xxdwfId,input_url)=>{
           
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];
            let PBASpacePba=[];
            let PBASpacePbaPBA=[];
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':actbt+1,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
             
                    let PBASpacePba=data.data;
                    for  ( let  i=0;i<10;i++){
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpacePba[i].pba*100;

                        PBASpacePbaPBA.push(Number(pba.toFixed(1)));
                    }
               
             
          
            
                },
                error:function(){
                
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpacePbaPBA ));
            dispatch(actions.setVars('btnn',0));
         
            // $('.box').css('opacity',".5")
        },
        back:(actbt,xxdwfId,input_url)=>{
           
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];

            let PBASpacePbaPBA=[];
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':actbt+1,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
            

                    let PBASpacePba=data.data;
                
                    let length=PBASpacePba.length-10;

                    for  ( let i = length;i>length-10;i--){
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpacePba[i].pba*100;

                        PBASpacePbaPBA.push(Number(pba.toFixed(1)));
                    }
               

            
            
            
                },
                error:function(){
                  
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract1',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss1',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss1',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss1',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss1',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba12',PBASpacePbaPBA ));
            dispatch(actions.setVars('btnn',1));
         
            // $('.box').css('opacity',".5")
        },
        more:(actbt,xxdwfId,input_url)=>{
            $("#sss").show();
            $('#boxcover').show();
            let PBASpaceWtname=[];
            let PBASpacePoweract=[];
            let PBASpaceFaultloss=[];
            let PBASpaceMaintainloss=[];
            let PBASpaceLimitloss=[];
            let PBASpaceNodevreasonloss=[];
            let PBASpacePba=[];
            let PBASpacePbaPBA=[];
            let width =0;
            $.ajax({
                type:'post',
                url:'http://'+input_url+'/wbi/PBA/getWFliedArea',
                async:false,
                data:{
                    'wfid':xxdwfId,
                    'month':actbt+1,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                
                    let PBASpacePba=data.data;
                    for  ( let i in PBASpacePba){
                        let wtname=PBASpacePba[i].wtname;
                        PBASpaceWtname.push(wtname);
                        let poweract=PBASpacePba[i].poweract;
                        PBASpacePoweract.push(poweract);
                        let faultloss=PBASpacePba[i].faultloss;
                        PBASpaceFaultloss.push(faultloss);
                        let maintainloss=PBASpacePba[i].maintainloss;
                        PBASpaceMaintainloss.push(maintainloss);
                        let limitloss=PBASpacePba[i].limitloss;
                        PBASpaceLimitloss.push(limitloss);
                        let nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                        PBASpaceNodevreasonloss.push(nodevreasonloss);
                        let pba=PBASpacePba[i].pba*100;

                        PBASpacePbaPBA.push(Number(pba.toFixed(1)));
                    }
        
             let length =PBASpaceWtname.length;
              width=length*60;
           
      
            
            
                },
                error:function(){
                  
                },
            });
            // 将变化月份赋值
            dispatch(actions.setVars('PBASpaceWtname111',PBASpaceWtname));
       
            // dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
            dispatch(actions.setVars('PBASpaceFirstPoweract11',PBASpacePoweract ));
            dispatch(actions.setVars('PBASpaceFirstMaintainloss11',PBASpaceMaintainloss ));
            dispatch(actions.setVars('PBASpaceFirstLimitloss11',PBASpaceLimitloss));
            dispatch(actions.setVars('PBASpaceFirstFaultloss11',PBASpaceFaultloss ));
            dispatch(actions.setVars('PBASpaceFirstNodevreasonloss11',PBASpaceNodevreasonloss ));
            dispatch(actions.setVars('PBASpaceFirstPba121',PBASpacePbaPBA ));
            dispatch(actions.setVars('btnn',2));
            dispatch(actions.setVars('width1',width));

         
            // $('.box').css('opacity',".5")
        },
        close:()=>{
            $("#sss").hide();
            $('#boxcover').hide();
        },
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
