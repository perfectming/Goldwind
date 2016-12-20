import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import Healtychart from './Healtychart.jsx';
import icono from './img/健康度1.png';
var $=require('jquery');
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let input_url="10.9.100.38";
let x0=[];
let x1=[];
let x2=[];
let healthy=data.healthy;
let Component = React.createClass({
  componentWillMount() {
    let{xxdwfId,xxdwfNa}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa);
    
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let areaRecordProfit=data.areaRecordProfit;
        let machineE=data.machineE;
        let text =data.textHealty;
      let{xxdwfNa,xxdwfId,WText,back,actbt,btn=0,changpage,wind,gogogo,windP,windPP,windd,actbtt,more,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
        return (

            <div className={styles.box}>
            <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{text[actbt]}</p>
                <div onClick={()=>close()}>x</div>
                </div>
                <div className={styles.scroll}>
          <Healtychart machineE={windPP} areaRecordProfit={windd} width={18000} height={450} ty={20}></Healtychart>
                </div>
             </div>
                 <ul className={styles.monthbox}>
                    {
                        data.healthy.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(xxdwfId,xxdwfNa,value,key,btn)} key={key}>{value.name}</li>)
                        })
                    }

                    <li className={styles.back1} onClick={()=>backtop(befor_pagee,befor_page2)}>{xxdwfNa}</li>
                    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>
                </ul>
 <div className={styles.paddingtop}>


                <div className={`${styles.bigbox} ${styles.shadow}`}>
                  
                      
                               <Healtychart machineE={windP}         areaRecordProfit={wind} height={800} text={text[actbt]} ty={40}></Healtychart>
                       
                        
                 
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>
                    <div className={styles.buttonsh}>
                      <button  className={btn===0? styles.btn0 : styles.btn1} onClick={()=>gogogo(actbt,btn)}   > 前10</button>
                      <button onClick={()=>back(xxdwfNa,xxdwfId,actbt,btn)} className={btn===1? styles.btn0 : styles.btn1}>后10</button>
                      <button  onClick={()=>more(xxdwfNa,xxdwfId,actbt,btn)} className={btn===2? styles.btn0 : styles.btn1}>更多</button>
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
         wind:state.vars.WSHealH1,
         windP:state.vars.WSHealName1,
         windd:state.vars.WSHealH11,
         windPP:state.vars.WSHealName11,
         actbt:state.vars.actbt,
         befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
        btn:state.vars.btnn,
        WText:state.vars.WText1,
        xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      

       ajax: (xxdwfId,xxdwfNa) => {

      

       let WSHealH=[];
       let WSHealName=[];
       let date = new Date();
       let month =date.getMonth();
      
             $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/Health/getWfieldHealth',  
             async:false,
            data:{
             'wfid':xxdwfId,
             'month':month,
             'year':2016
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             
            let WSHeal=data.data;
            for(var i=0 ; i<10;i++){
              let fanHealth=WSHeal[i].fanHealth;
               WSHealH.push(fanHealth);

              let wtname=WSHeal[i].wtname;
              WSHealName.push(wtname);

            }
            dispatch(actions.setVars('WSHealH1',WSHealH ));
            dispatch(actions.setVars('WSHealName1',WSHealName ));
             dispatch(actions.setVars('actbt',month-1));
             dispatch(actions.setVars('btnn',0));
            
             },
             error:function(){
                
             },
           });
        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        changpage :(xxdwfId,xxdwfNa,value,key,btn)=>{
        let WSHealH=[];
        let WSHealName=[];
        let date = new Date();
        let month =date.getMonth();
        let year =date.getFullYear();
       
             $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/Health/getWfieldHealth',  
             async:false,
            data:{
             'wfid':xxdwfId,
             'month':key+1,
             'year':year,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
      
            let WSHeal=data.data;
            for(var i=0 ; i<10;i++){
              let fanHealth=WSHeal[i].fanHealth;
               WSHealH.push(fanHealth);
              let wtname=WSHeal[i].wtname;
              WSHealName.push(wtname);
            }
            dispatch(actions.setVars('WSHealH1',WSHealH ));
            dispatch(actions.setVars('WSHealName1',WSHealName ));
             dispatch(actions.setVars('actbt',key));
             dispatch(actions.setVars('btnn',0));
            
             },
             error:function(){
               
             },
           });
            
        },
         gogogo:(key,btn)=>{
       
        let WSHealH=[];
        let WSHealName=[];
        let date = new Date();
        let month =date.getMonth();
             $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/Health/getWfieldHealth',  
             async:false,
            data:{
             'wfid':xxdwfId,
             'month':key+1,
             'year':2016,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
            let WSHeal=data.data;
            for(var i=0 ; i<10;i++){
              let fanHealth=WSHeal[i].fanHealth;
               WSHealH.push(fanHealth);
              let wtname=WSHeal[i].wtname;
              WSHealName.push(wtname);
            }
            dispatch(actions.setVars('WSHealH1',WSHealH ));
            dispatch(actions.setVars('WSHealName1',WSHealName ));
            dispatch(actions.setVars('btnn',0));
       
             },
             error:function(){
                
             },
           });
          },
           back:(xxdwfNa,xxdwfId,key,btn)=>{
        let WSHealH=[];
        let WSHealName=[];
        let date = new Date();
        let month =date.getMonth();
             $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/Health/getWfieldHealth',  
             async:false,
            data:{
             'wfid':xxdwfId,
             'month':key+1,
             'year':2016,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             
            let WSHeal=data.data;
            let length=WSHeal.length-1;  
            for(let i=length ; i>length-10;i--){
              let fanHealth=WSHeal[i].fanHealth;
               WSHealH.push(fanHealth);
              let wtname=WSHeal[i].wtname;
              WSHealName.push(wtname);
            }
            dispatch(actions.setVars('WSHealH1',WSHealH ));
            dispatch(actions.setVars('WSHealName1',WSHealName ));
             dispatch(actions.setVars('btnn',1));
       
             },
             error:function(){
                
             },
           });
          },
          more:(xxdwfNa,xxdwfId,key,btn)=>{
             $("#sss").show();
             $('#boxcover').show();
            let WSHealH=[];
            let WSHealName=[];
            let date = new Date();
            let month =date.getMonth();
             $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/Health/getWfieldHealth',  
             async:false,
            data:{
             'wfid':xxdwfId,
             'month':key+1,
             'year':2016,
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
            
            let WSHeal=data.data;
            for(var i in WSHeal){
              let fanHealth=WSHeal[i].fanHealth;
               WSHealH.push(fanHealth);
              let wtname=WSHeal[i].wtname;
              WSHealName.push(wtname);
            }
            dispatch(actions.setVars('WSHealH11',WSHealH ));
            dispatch(actions.setVars('WSHealName11',WSHealName ));
             dispatch(actions.setVars('btnn',2));
            
             },
             error:function(){
                
             },
           });
        },
        close:()=>{
            $("#sss").hide();
              $('#boxcover').hide();
        },
         backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },

    }
     
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);