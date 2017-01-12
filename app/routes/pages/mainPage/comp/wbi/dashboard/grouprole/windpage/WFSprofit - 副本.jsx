import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import WFSprofitchart from './WFSprofitchart.jsx';
import icono from '../../../../../img/comp/TBA.png';
var actions = require('redux/actions');
let data=require('./../group/Profit-data3');
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
        let{xxdwfId,xxdwfNa,ipUrl}=this.props;
        this.props.ajax(xxdwfId,xxdwfNa,ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {
       
        let{width,ipUrl,WFSPRa,WFSPNaM,WFSPCo,WFSPEa,WFSPNa,WFSPRaM,WFSPCoM,WFSPEaM,wTBANaM,btn,wTBAT,wTBADown,wTBARun,wTBANa,xxdwfId,xxdwfNa,actbt=0,changpage,wind,windP,gogogo,back,machinee,more,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
        return (
           
            <div className={styles.box}>
            {//遮罩层
            }
             <div className={styles.boxcover} id='boxcover'></div>
             {//更多弹出的表格
             }
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{text[actbt]+xxdwfNa+'各风机收益'}</p>
                <div onClick={()=>close()}>x</div>
                </div>
                <div className={styles.scroll}>
            <WFSprofitchart fanCost={WFSPCoM} machine={WFSPNaM} fanProfitQ={WFSPEaM} TBA={WFSPRaM} height={481} width={width}  ty={10} pointWidth={20} borderRadius={4} pointPlacement={0}></WFSprofitchart></div>

             </div>
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key,xxdwfId,ipUrl)} key={key}>{value.name}</li>)
                        })
                    }
                    <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>
               

                </ul>
            
                <div className={styles.bigbox}>
                  
                      
                         
                                <WFSprofitchart fanCost={WFSPCo} machine={WFSPNa} fanProfitQ={WFSPEa} TBA={WFSPRa} height={800} text={[actbt+1]+'月'+xxdwfNa+'各风机收益'} ty={40} pointWidth={30} borderRadius={7} pointPlacement={0} height={800}></WFSprofitchart>
                           
                       
               
                  
                    <div className={styles.imgqnm}>
                        <img src={icono}/>
                    </div>

                    <div className={styles.buttons}>
                      <button onClick={()=>gogogo(xxdwfId,actbt,btn,ipUrl)} className={btn===0? styles.btn0 : styles.btn1} > 前10</button>
                      <button onClick={()=>back(xxdwfId,actbt,btn,ipUrl)} className={btn===1? styles.btn0 : styles.btn1}>后10</button>
                      <button  onClick={()=>more(xxdwfId,actbt,btn,ipUrl)} className={btn===2? styles.btn0 : styles.btn1}>更多</button>
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
        ipUrl:state.vars.ipUrl,
      
        WFSPNaM:state.vars.WFSPNa11,
        WFSPEaM:state.vars.WFSPEa11,
        WFSPCoM:state.vars.WFSPCo11,
        WFSPRaM:state.vars.WFSPRa11,
        width:state.vars.width1,
     
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       ajax: (xxdwfId,xxdwfNa,input_url) => {
     
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
             url:'http://'+input_url+'/wbi/yield/getYieldByWfid',  
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
           
              let WFSP=data.data;
              for (let i in WFSP)
              {
                //初始风场名字
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);
                // 初始收入
              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);
               // 初始成本
              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);
              // 初始收益率
              	let rate=WFSP[i].rate*100;
              	WFSPRa.push(Number(rate.toFixed(2)));
              }
          
              },
             error:function(){
             
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
        // 点击月份改变
         changpage :(value,key,xxdwfId,input_url)=>{
          
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
             url:'http://'+input_url+'/wbi/yield/getYieldByWfid',  
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
          
              let WFSP=data.data;
              for (let i in WFSP)
              {
                //风场名字
                
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);
              //收入
              
              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);
               //成本
               
              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);
               //收益率
               
              	let rate=WFSP[i].rate;
              	WFSPRa.push(rate);
              }
          

              },
             error:function(){
          
              },
            });   
            dispatch(actions.setVars('WFSPNa1',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa1',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo1',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa1',WFSPRa)) ;
            dispatch(actions.setVars('actbtWFP',key)) ;
             dispatch(actions.setVars('btnn',0)) ;
        },
        // 前十
         gogogo:(xxdwfId,actbt,btn,input_url)=>{
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
             url:'http://'+input_url+'/wbi/yield/getYieldByWfid',  
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
           
              let WFSP=data.data;
              for (let i in WFSP)
              {
      // 风场名字
              	let wtname=WFSP[i].wtname;
              	WFSPNa.push(wtname);
 // 风场收入
              	let earning=WFSP[i].earning;
              	WFSPEa.push(earning);
// 风场成本
              	let costs=WFSP[i].costs;
              	WFSPCo.push(costs);
// 收益率
              	let rate=WFSP[i].rate;
              	WFSPRa.push(rate);
              }
          

              },
             error:function(){
          
              },
            });   
            dispatch(actions.setVars('WFSPNa1',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa1',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo1',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa1',WFSPRa)) ;
           
             dispatch(actions.setVars('btnn',0)) ;
           
        },
        // 后十
       back:(xxdwfId,actbt,btn,input_url)=>{
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
             url:'http://'+input_url+'/wbi/yield/getYieldByWfid',  
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
           
              },
            });   
            dispatch(actions.setVars('WFSPNa1',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa1',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo1',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa1',WFSPRa)) ;
           
             dispatch(actions.setVars('btnn',1)) ;

        },
         more:(xxdwfId,actbt,btn,input_url)=>{
             $("#sss").show();
             $('#boxcover').show();
            let WFSPNa=[];
          let WFSPEa=[];
          let WFSPCo=[];
          let WFSPRa=[];
          let width=0;
          let date= new Date();
          let year =date.getFullYear();
          let month=date.getMonth();
          let day = new Date(year,(actbt+1),0); 
          let  daycountT = day.getDate();
 
            $.ajax({
             type:'post',
             url:'http://'+input_url+'/wbi/yield/getYieldByWfid',  
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
              	WFSPRa.push(Number(rate.toFixed(2)));
              }
          let length =WFSPNa.length;
          width=length*60;

              },
             error:function(){
               
              },
            });   
            dispatch(actions.setVars('WFSPNa11',WFSPNa)) ;
            dispatch(actions.setVars('WFSPEa11',WFSPEa)) ;
            dispatch(actions.setVars('WFSPCo11',WFSPCo)); 
            dispatch(actions.setVars('WFSPRa11',WFSPRa)) ;
           
         
              dispatch(actions.setVars('width1',width)) ;
         
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
