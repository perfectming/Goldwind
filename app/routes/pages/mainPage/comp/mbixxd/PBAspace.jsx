import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import PBAspacechart from './PBAspacechart.jsx';
import icono from './img/PBA.png';
var $ = require('jquery');
var actions = require('redux/actions');
let data=require('./Profit-data');
let input_url="10.68.100.32";
let button=data.button;
let fanCost=data.fanCost;
let fanCostA=data.fanCostA;
let fanCostB=data.fanCostB;
let fanCostC=data.fanCostC;
let PBA=data.PBA;
let height=700;
let moree;
 var date=new Date;
var month=date.getMonth(); 
  
  var key=month;
let Component = React.createClass({
     componentWillMount() {
        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{PBASpaceMorePba,PBASpaceMoreNodevreasonloss,PBASpaceMoreLimitloss,PBASpaceMoreMaintainloss,PBASpaceMoreFaultloss,PBASpaceMorePoweract,PBASpaceMoreWtname2,back,gogogo,PBASpaceFirstWtname,PBASpaceFirstPba,PBASpaceFirstNodevreasonloss,PBASpaceFirstLimitloss,PBASpaceFirstMaintainloss,PBASpaceFirstFaultloss,PBASpaceFirstPoweract,actbt=0,changpage,wind,windP,more,moree,close,backtop,befor_pagee='windpage',befor_page2}=this.props;


        return (
            <div className={styles.box} >
            <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{ [actbt+1]+'月份各风机PBA'}</p>
                <div onClick={()=>close()}>x</div>
                </div>
                 <div className={styles.scroll}>
                  <PBAspacechart fanProfitQ={PBASpaceMorePoweract}
                   machine={PBASpaceMoreWtname2} 
                   fanCost={PBASpaceMoreFaultloss} 
                   fanCostA={PBASpaceMoreMaintainloss} 
                   fanCostB={PBASpaceMoreLimitloss} 
                   fanCostC={PBASpaceMoreNodevreasonloss} 
                   PBA={PBASpaceMorePba} height={450} width={17350}></PBAspacechart>
                 </div>
             </div>
               
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
     }
    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>

                </ul>
                <div className={styles.paddingtop}>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <PBAspacechart fanProfitQ={PBASpaceFirstPoweract} machine={PBASpaceFirstWtname} fanCost={PBASpaceFirstFaultloss} fanCostA={PBASpaceFirstMaintainloss} fanCostB={PBASpaceFirstLimitloss} fanCostC={PBASpaceFirstNodevreasonloss} PBA={PBASpaceFirstPba} height={750} width={1735}></PBAspacechart>
                            </div>
                        </div>
                         <div className={styles.tik}>
                        <p>{ [actbt+1]+'月份各风机PBA'}</p>
                    </div>
                    </div>
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>
                    <div className={styles.buttons}>
                      <button onClick={()=>gogogo(actbt)} > 前10</button>
                      <button onClick={()=>back(actbt)}>后10</button>
                      <button  onClick={()=>more(actbt)}>更多</button>
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
        PBASpaceMoreWtname2: state.vars.PBASpaceWtname11,
        PBASpaceMorePoweract: state.vars.PBASpaceFirstPoweract11,
        PBASpaceMoreFaultloss: state.vars.PBASpaceFirstFaultloss11,
        PBASpaceMoreMaintainloss: state.vars.PBASpaceFirstMaintainloss11,
        PBASpaceMoreLimitloss: state.vars.PBASpaceFirstLimitloss11,
        PBASpaceMoreNodevreasonloss: state.vars.PBASpaceFirstNodevreasonloss11,
        PBASpaceMorePba: state.vars.PBASpaceFirstPba121,

    
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
         ajax: () => {
            var areaIds=[];
            var windIds=[];
        // 初始化上个月的数据
         var PBASpaceFirstWtname=[];
         var PBASpaceFirstPoweract=[];
         var PBASpaceFirstFaultloss=[];
         var PBASpaceFirstMaintainloss=[];
         var PBASpaceFirstLimitloss=[];
         var PBASpaceFirstNodevreasonloss=[];
         var PBASpaceFirstPbaP=[];
         
            // 获取上面的区域
           $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/BaseData/getGroup',  
             async:false,
          
             dataType:'json',
             timeout:'3000',
             success:function(data){
               
                for(var i in data.data){
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
              url:'http://'+input_url+':8080/wbi/BaseData/getWfsByGroupid',  
              async:false,
              data:{
               'groupid':areaIds[0],
              },
              dataType:'json',
              timeout:'3000',
              success:function(data){
             
                 for(var i in data.data){
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
              url:'http://'+input_url+':8080/wbi/PBA/getWFliedArea',  
              async:false,
              data:{
               'wfid':150801,
               'month':month,
              },
              dataType:'json',
              timeout:'3000',
              success:function(data){
           
               var PBASpaceFirstPba=data.data;
                for ( var  i=0;i<10;i++){
                     var wtname=PBASpaceFirstPba[i].wtname;
                     PBASpaceFirstWtname.push(wtname);
                     var poweract=PBASpaceFirstPba[i].poweract;
                     PBASpaceFirstPoweract.push(poweract);
                     var faultloss=PBASpaceFirstPba[i].faultloss;
                     PBASpaceFirstFaultloss.push(faultloss);
                     var maintainloss=PBASpaceFirstPba[i].maintainloss;
                     PBASpaceFirstMaintainloss.push(maintainloss);
                     var limitloss=PBASpaceFirstPba[i].limitloss;
                     PBASpaceFirstLimitloss.push(limitloss);
                     var nodevreasonloss=PBASpaceFirstPba[i].nodevreasonloss;
                     PBASpaceFirstNodevreasonloss.push(nodevreasonloss);
                     var pba=PBASpaceFirstPba[i].pba
                     PBASpaceFirstPbaP.push(pba);
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
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
         changpage :(value,key)=>{
             //切换月份传值
             var PBASpaceWtname=[];
             var PBASpacePoweract=[];
             var PBASpaceFaultloss=[];
             var PBASpaceMaintainloss=[];
             var PBASpaceLimitloss=[];
             var PBASpaceNodevreasonloss=[];
             var PBASpacePba=[];
             var PBASpacePbaPBA=[];
             $.ajax({
              type:'post',
              url:'http://'+input_url+':8080/wbi/PBA/getWFliedArea',  
              async:false,
              data:{
               'wfid':150801,
               'month':key+1,
              },
              dataType:'json',
              timeout:'3000',
              success:function(data){
            
                var PBASpacePba=data.data;
                 for  ( var  i=0;i<10;i++){
                      var wtname=PBASpacePba[i].wtname;
                      PBASpaceWtname.push(wtname);
                      var poweract=PBASpacePba[i].poweract;
                      PBASpacePoweract.push(poweract);
                      var faultloss=PBASpacePba[i].faultloss;
                      PBASpaceFaultloss.push(faultloss);
                      var maintainloss=PBASpacePba[i].maintainloss;
                      PBASpaceMaintainloss.push(maintainloss);
                      var limitloss=PBASpacePba[i].limitloss;
                      PBASpaceLimitloss.push(limitloss);
                      var nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                      PBASpaceNodevreasonloss.push(nodevreasonloss);
                      var pba=Number(PBASpacePba[i].pba.toFixed(2));

                      PBASpacePbaPBA.push(pba);
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
          
        },
         gogogo:(actbt)=>{
           
            var PBASpaceWtname=[];
             var PBASpacePoweract=[];
             var PBASpaceFaultloss=[];
             var PBASpaceMaintainloss=[];
             var PBASpaceLimitloss=[];
             var PBASpaceNodevreasonloss=[];
             var PBASpacePba=[];
             var PBASpacePbaPBA=[];
             $.ajax({
              type:'post',
              url:'http://'+input_url+':8080/wbi/PBA/getWFliedArea',  
              async:false,
              data:{
               'wfid':150801,
               'month':actbt+1,
              },
              dataType:'json',
              timeout:'3000',
              success:function(data){
             
                var PBASpacePba=data.data;
                 for  ( var  i=0;i<10;i++){
                      var wtname=PBASpacePba[i].wtname;
                      PBASpaceWtname.push(wtname);
                      var poweract=PBASpacePba[i].poweract;
                      PBASpacePoweract.push(poweract);
                      var faultloss=PBASpacePba[i].faultloss;
                      PBASpaceFaultloss.push(faultloss);
                      var maintainloss=PBASpacePba[i].maintainloss;
                      PBASpaceMaintainloss.push(maintainloss);
                      var limitloss=PBASpacePba[i].limitloss;
                      PBASpaceLimitloss.push(limitloss);
                      var nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                      PBASpaceNodevreasonloss.push(nodevreasonloss);
                      var pba=Number(PBASpacePba[i].pba.toFixed(2));

                      PBASpacePbaPBA.push(pba);
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
         
             // $('.box').css('opacity',".5")
        },
        back:(actbt)=>{
           
            var PBASpaceWtname=[];
             var PBASpacePoweract=[];
             var PBASpaceFaultloss=[];
             var PBASpaceMaintainloss=[];
             var PBASpaceLimitloss=[];
             var PBASpaceNodevreasonloss=[];

             var PBASpacePbaPBA=[];
             $.ajax({
              type:'post',
              url:'http://'+input_url+':8080/wbi/PBA/getWFliedArea',  
              async:false,
              data:{
               'wfid':150801,
               'month':actbt+1,
              },
              dataType:'json',
              timeout:'3000',
              success:function(data){
            

                var PBASpacePba=data.data;
                
                  var length=PBASpacePba.length-10;

                 for  ( var i = length;i>length-10;i--){
                      var wtname=PBASpacePba[i].wtname;
                      PBASpaceWtname.push(wtname);
                      var poweract=PBASpacePba[i].poweract;
                      PBASpacePoweract.push(poweract);
                      var faultloss=PBASpacePba[i].faultloss;
                      PBASpaceFaultloss.push(faultloss);
                      var maintainloss=PBASpacePba[i].maintainloss;
                      PBASpaceMaintainloss.push(maintainloss);
                      var limitloss=PBASpacePba[i].limitloss;
                      PBASpaceLimitloss.push(limitloss);
                      var nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                      PBASpaceNodevreasonloss.push(nodevreasonloss);
                      var pba=Number(PBASpacePba[i].pba.toFixed(2));

                      PBASpacePbaPBA.push(pba);
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
         
             // $('.box').css('opacity',".5")
        },
        more:(actbt)=>{
             $("#sss").show();
             $('#boxcover').show();
              var PBASpaceWtname=[];
             var PBASpacePoweract=[];
             var PBASpaceFaultloss=[];
             var PBASpaceMaintainloss=[];
             var PBASpaceLimitloss=[];
             var PBASpaceNodevreasonloss=[];
             var PBASpacePba=[];
             var PBASpacePbaPBA=[];
             $.ajax({
              type:'post',
              url:'http://'+input_url+':8080/wbi/PBA/getWFliedArea',  
              async:false,
              data:{
               'wfid':150801,
               'month':actbt+1,
              },
              dataType:'json',
              timeout:'3000',
              success:function(data){
                
                var PBASpacePba=data.data;
                 for  ( var i in PBASpacePba){
                      var wtname=PBASpacePba[i].wtname;
                      PBASpaceWtname.push(wtname);
                      var poweract=PBASpacePba[i].poweract;
                      PBASpacePoweract.push(poweract);
                      var faultloss=PBASpacePba[i].faultloss;
                      PBASpaceFaultloss.push(faultloss);
                      var maintainloss=PBASpacePba[i].maintainloss;
                      PBASpaceMaintainloss.push(maintainloss);
                      var limitloss=PBASpacePba[i].limitloss;
                      PBASpaceLimitloss.push(limitloss);
                      var nodevreasonloss=PBASpacePba[i].nodevreasonloss;
                      PBASpaceNodevreasonloss.push(nodevreasonloss);
                      var pba=Number(PBASpacePba[i].pba.toFixed(2));

                      PBASpacePbaPBA.push(pba);
                 }
             
             
           

            
            
              },
              error:function(){
                  
              },
            });
            // 将变化月份赋值
       dispatch(actions.setVars('PBASpaceWtname11',PBASpaceWtname));
       
      // dispatch(actions.setVars('PBASpaceWtname1',PBASpaceWtname));
       dispatch(actions.setVars('PBASpaceFirstPoweract11',PBASpacePoweract ));
       dispatch(actions.setVars('PBASpaceFirstMaintainloss11',PBASpaceMaintainloss ));
       dispatch(actions.setVars('PBASpaceFirstLimitloss11',PBASpaceLimitloss));
       dispatch(actions.setVars('PBASpaceFirstFaultloss11',PBASpaceFaultloss ));
       dispatch(actions.setVars('PBASpaceFirstNodevreasonloss11',PBASpaceNodevreasonloss ));
       dispatch(actions.setVars('PBASpaceFirstPba121',PBASpacePbaPBA ));
         
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
