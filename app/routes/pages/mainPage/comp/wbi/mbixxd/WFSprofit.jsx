import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import WFSprofitchart from './WFSprofitchart.jsx';
import icono from './img/TBA.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let input_url="10.9.100.38";
let month=data.month;
let button=data.button;
let machine=data.machine;
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let text=data.text;
let windFF=data.windFF;
 let fanCost=data.fanCost;
 let fanProfitQ=data.fanProfitQ;
let Component = React.createClass({
  componentWillMount() {
        let{xxdwfId,xxdwfNa}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
       
        let{WFSPRa,WFSPNaM,WFSPCo,WFSPEa,WFSPNa,WFSPRaM,WFSPCoM,WFSPEaM,wTBANaM,btn,wTBAT,wTBADown,wTBARun,wTBANa,xxdwfId,xxdwfNa,actbt=0,changpage,wind,windP,gogogo,back,machinee,more,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
        return (
           
            <div className={styles.box}>
             <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{text[actbt]+'月各风机收益'}</p>
                <div onClick={()=>close()}>x</div>
                </div>
                <div className={styles.scroll}>
            <WFSprofitchart fanCost={WFSPCoM} machine={WFSPNaM} fanProfitQ={WFSPEaM} TBA={WFSPRaM} height={500} width={24000}  ty={10}></WFSprofitchart></div>

             </div>
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key,xxdwfId)} key={key}>{value.name}</li>)
                        })
                    }
                    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>
                <li className={styles.back1} onClick={()=>backtop(befor_pagee,befor_page2)}>{xxdwfNa}</li>

                </ul>
                <div className={styles.paddingtop}>
                <div className={styles.bigbox}>
                  
                      
                            <div>
                                <WFSprofitchart fanCost={WFSPCo} machine={WFSPNa} fanProfitQ={WFSPEa} TBA={WFSPRa} height={800} text={text[actbt]+'各风机收益'} ty={50}></WFSprofitchart>
                            </div>
                       
               
                  
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>

                    <div className={styles.buttons}>
                      <button onClick={()=>gogogo(xxdwfId,actbt,btn)} className={btn===0? styles.btn0 : styles.btn1} > 前10</button>
                      <button onClick={()=>back(xxdwfId,actbt,btn)} className={btn===1? styles.btn0 : styles.btn1}>后10</button>
                      <button  onClick={()=>more(xxdwfId,actbt,btn)} className={btn===2? styles.btn0 : styles.btn1}>更多</button>
                   </div>
                </div>
                </div>
            </div>


        );
    }
});



const mapStateToProps = (state) => {
    return {
    	   xxdwfId:state.vars.xxdwfId1,
        xxdwfNa:state.vars.xxdwfNa1,
         actbt:state.vars.actbtWFP,
         wind:state.vars.wind,
         windP:state.vars.windP,
         machinee:state.vars.machinee,
           befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
        
 
        WFSPNa:state.vars.WFSPNa1,
        WFSPEa:state.vars.WFSPEa1,
        WFSPCo:state.vars.WFSPCo1,
        WFSPRa:state.vars.WFSPRa1,
        btn:state.vars.btnn,
      
        WFSPNaM:state.vars.WFSPNa11,
        WFSPEaM:state.vars.WFSPEa11,
        WFSPCoM:state.vars.WFSPCo11,
        WFSPRaM:state.vars.WFSPRa11,
     
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       ajax: (xxdwfId,xxdwfNa) => {
     
          let WFSPNa=[];
          let WFSPEa=[];
          let WFSPCo=[];
          let WFSPRa=[];
          let date= new Date();
          let year =date.getFullYear();
          let month=date.getMonth();
          let day = new Date(year,month,0); 
          let  daycountT = day.getDate();
 
            $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',  
             async:false,
            data:{

             'wfid':xxdwfId,
             'startdate':year+"-"+month+"-"+1,
             'enddate':year+"-"+month+"-"+daycountT,
             'methods':"desc"
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             	console.log(year+"-"+month+"-"+daycountT);
              let WFSP=data.data;
              for (let i in WFSP)
              {
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);

              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);

              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);

              	let rate=WFSP[i].rate*100;
              	WFSPRa.push(Number(rate.toFixed(1)));
              }
          
              },
             error:function(){
               console.log(1)
              },
            });   
            dispatch(actions.setVars('WFSPNa1',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa1',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo1',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa1',WFSPRa)) ;
            dispatch(actions.setVars('actbtWFP',month-1)) ;
            dispatch(actions.setVars('btnn',0)) ;

        }
        ,
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
         changpage :(value,key,xxdwfId)=>{
          
          let WFSPNa=[];
          let WFSPEa=[];
          let WFSPCo=[];
          let WFSPRa=[];
          let date= new Date();
          let year =date.getFullYear();
          let month=date.getMonth();
          let day = new Date(year,(key+1),0); 
          let  daycountT = day.getDate();
 
            $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',  
             async:false,
            data:{

             'wfid':xxdwfId,
             'startdate':year+"-"+(key+1)+"-"+1,
             'enddate':year+"-"+(key+1)+"-"+daycountT,
             'methods':"desc"
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             	console.log(year+"-"+(key+1)+"-"+daycountT);
              let WFSP=data.data;
              for (let i in WFSP)
              {
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);

              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);

              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);

              	let rate=WFSP[i].rate;
              	WFSPRa.push(rate);
              }
          

              },
             error:function(){
               console.log(2)
              },
            });   
            dispatch(actions.setVars('WFSPNa1',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa1',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo1',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa1',WFSPRa)) ;
            dispatch(actions.setVars('actbtWFP',key)) ;
             dispatch(actions.setVars('btnn',0)) ;
        },
         gogogo:(xxdwfId,actbt,btn)=>{
           let WFSPNa=[];
          let WFSPEa=[];
          let WFSPCo=[];
          let WFSPRa=[];
          let date= new Date();
          let year =date.getFullYear();
          let month=date.getMonth();
          let day = new Date(year,(actbt+1),0); 
          let  daycountT = day.getDate();
 
            $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',  
             async:false,
            data:{

             'wfid':xxdwfId,
             'startdate':year+"-"+(actbt+1)+"-"+1,
             'enddate':year+"-"+(actbt+1)+"-"+daycountT,
             'methods':"desc"
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             	console.log(year+"-"+(actbt+1)+"-"+daycountT);
              let WFSP=data.data;
              for (let i in WFSP)
              {
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);

              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);

              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);

              	let rate=WFSP[i].rate;
              	WFSPRa.push(rate);
              }
          

              },
             error:function(){
               console.log(3)
              },
            });   
            dispatch(actions.setVars('WFSPNa1',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa1',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo1',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa1',WFSPRa)) ;
           
             dispatch(actions.setVars('btnn',0)) ;
           
        },
       back:(xxdwfId,actbt,btn)=>{
           let WFSPNa=[];
          let WFSPEa=[];
          let WFSPCo=[];
          let WFSPRa=[];
          let date= new Date();
          let year =date.getFullYear();
          let month=date.getMonth();
          let day = new Date(year,(actbt+1),0); 
          let  daycountT = day.getDate();
 
            $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',  
             async:false,
            data:{
             'wfid':xxdwfId,
             'startdate':year+"-"+(actbt+1)+"-"+1,
             'enddate':year+"-"+(actbt+1)+"-"+daycountT,
             'methods':"asc"
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             	console.log(year+"-"+(actbt+1)+"-"+daycountT);
              let WFSP=data.data;
              for (let i in WFSP)
              {
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);

              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);

              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);

              	let rate=WFSP[i].rate;
              	WFSPRa.push(rate);
              }
          

              },
             error:function(){
               console.log(4)
              },
            });   
            dispatch(actions.setVars('WFSPNa1',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa1',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo1',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa1',WFSPRa)) ;
           
             dispatch(actions.setVars('btnn',1)) ;

        },
         more:(xxdwfId,actbt,btn)=>{
             $("#sss").show();
             $('#boxcover').show();
            let WFSPNa=[];
          let WFSPEa=[];
          let WFSPCo=[];
          let WFSPRa=[];
          let date= new Date();
          let year =date.getFullYear();
          let month=date.getMonth();
          let day = new Date(year,(actbt+1),0); 
          let  daycountT = day.getDate();
 
            $.ajax({
             type:'post',
             url:'http://'+input_url+':8080/wbi/yield/getYieldByWfid',  
             async:false,
            data:{

             'wfid':xxdwfId,
             'startdate':year+"-"+(actbt+1)+"-"+1,
             'enddate':year+"-"+(actbt+1)+"-"+daycountT,
             'methods':"all"
            },
             dataType:'json',
             timeout:'3000',
             success:function(data){
             	console.log(year+"-"+(actbt+1)+"-"+daycountT);
              let WFSP=data.data;
              for (let i in WFSP)
              {
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);

              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);

              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);

              	let rate=WFSP[i].rate*100;
              	WFSPRa.push(Number(rate.toFixed(1)));
              }
          

              },
             error:function(){
               console.log(5)
              },
            });   
            dispatch(actions.setVars('WFSPNa11',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa11',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo11',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa11',WFSPRa)) ;
           
             dispatch(actions.setVars('btnn',2)) ;
         
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
