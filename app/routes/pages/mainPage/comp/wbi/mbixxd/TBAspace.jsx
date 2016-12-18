import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import TBAspacechart from './TBAspacechart.jsx';
import icono from './img/TBA.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
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
    componentDidMount() {
        this.props.init();
    },
    render() {
       
        let{actbt=0,changpage,wind,windP,gogogo,back,machinee,more,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
        return (
           
            <div className={styles.box}>
             <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{text[actbt]+'月份各风机TBA'}</p>
                <div onClick={()=>close()}>x</div>
                </div>
            <TBAspacechart fanCost={fanCost} machine={machinee==null?machine:machinee} fanProfitQ={windP==null?fanProfitQ:windP} width={1750} height={500}></TBAspacechart>

             </div>
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
          <li className={styles.back} onClick={()=>backtop(befor_pagee,befor_page2)}>返回</li>

                </ul>
                <div className={styles.paddingtop}>
                <div className={styles.bigbox}>
                  
                      
                            <div>
                                <TBAspacechart fanCost={fanCost} machine={machinee==null?machine:machinee} fanProfitQ={windP==null?fanProfitQ:windP} height={800} text={text[actbt]+'月份各风机TBA'}></TBAspacechart>
                            </div>
                       
               
                  
                    <div className={styles.imgq}>
                        <img src={icono}/>
                    </div>

                    <div className={styles.buttons}>
                      <button onClick={()=>gogogo(windFF)} > 前10</button>
                      <button onClick={()=>back(wind)}>后10</button>
                      <button  onClick={()=>more()}>更多</button>
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
         machinee:state.vars.machinee,
           befor_pagee : state.vars.befor_pagee,
        befor_page2 : state.vars.befor_page2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
         changpage :(value,key)=>{
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('wind',value.plan));
            dispatch(actions.setVars('windP',value.actrul));
        },
         gogogo:(wind)=>{
            (function(){
                windFF.sort(function(a,b){
                    return b.plan - a.plan;
                })
                for(var i=0;i<12;i++){
                    x0[i]=windFF[i].name;
                    x1[i]=windFF[i].plan;
                }
            })()
              dispatch(actions.setVars('machinee', x0));
              dispatch(actions.setVars('windP',x1))

        },
       back:(wind)=>{
            (function(){
                windFF.sort(function(a,b){
                    return a.plan - b.plan;
                })
                for(var i=0;i<12;i++){
                    x2[i]=windFF[i].name;
                    x3[i]=windFF[i].plan;
                }
            })()
              dispatch(actions.setVars('machinee', x2));
              dispatch(actions.setVars('windP',x3))

        },
         more:()=>{
             $("#sss").show();
             $('#boxcover').show();
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
