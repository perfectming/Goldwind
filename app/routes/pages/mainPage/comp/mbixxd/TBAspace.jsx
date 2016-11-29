import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import TBAspacechart from './TBAspacechart.jsx';
import icono from './wind_logo.png';
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let machine=data.machine;
let x0=[];
let x1=[];
let x2=[];
let x3=[];
let windFF=data.windFF;
 let fanCost=data.fanCost;
 let fanProfitQ=data.fanProfitQ;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
       
        let{actbt=0,changpage,wind,windP,gogogo,back,machinee}=this.props;
        return (
           
            <div className={styles.box}>
                <ul className={styles.monthbox}>
                    {
                        data.wind.map((value,key)=>{
                            return(<li className={actbt===key? styles.red : styles.green}  onClick={()=>changpage(value,key)} key={key}>{value.name}</li>)
                        })
                    }
                </ul>
                <div className={styles.bigbox}>
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <TBAspacechart fanCost={fanCost} machine={machinee==null?machine:machinee} fanProfitQ={windP==null?fanProfitQ:windP}></TBAspacechart>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tik}>
                        <p>11月份各风机TBA</p>
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


        );
    }
});



const mapStateToProps = (state) => {
    return {
         actbt:state.vars.actbt,
         wind:state.vars.wind,
         windP:state.vars.windP,
         machinee:state.vars.machinee,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
