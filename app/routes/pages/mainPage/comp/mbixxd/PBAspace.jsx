import React from 'react';
import {connect} from 'react-redux';
import styles from './Areacestyle.scss';
import PBAspacechart from './PBAspacechart.jsx';
import icono from './wind_logo.png';
var $ = require('jquery');
var actions = require('redux/actions');
let data=require('./Profit-data');
let month=data.month;
let button=data.button;
let fanCost=data.fanCost;
let fanCostA=data.fanCostA;
let fanCostB=data.fanCostB;
let fanCostC=data.fanCostC;
let PBA=data.PBA;
let height=700;
let moree;
let machine=data.machine;
let fanProfitQ=data.fanProfitQ;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{actbt=0,changpage,wind,windP,more,moree,close,backtop,befor_pagee='windpage',befor_page2}=this.props;
        return (
            <div className={styles.box} >
            <div className={styles.boxcover} id='boxcover'></div>
             <div className={styles.more} id="sss">
                <div className={styles.moretitle}>
                <img src={icono}/>
                <p>{ [actbt+1]+'月份各风机PBA'}</p>
                <div onClick={()=>close()}>x</div>
                </div>
                 <PBAspacechart fanProfitQ={wind==null?fanProfitQ:wind} machine={machine} fanCost={fanCost} fanCostA={fanCostA} fanCostB={fanCostB} fanCostC={fanCostC} PBA={PBA} height={500} width={1750}></PBAspacechart>
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
                    <div className={styles.coverbox}>
                        <div className={styles.windcebox}>
                            <div>
                                <PBAspacechart fanProfitQ={wind==null?fanProfitQ:wind} machine={machine} fanCost={fanCost} fanCostA={fanCostA} fanCostB={fanCostB} fanCostC={fanCostC} PBA={PBA} height={750}></PBAspacechart>
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
                      <button onClick={()=>gogogo(windPT)} > 前10</button>
                      <button onClick={()=>back(windPT)}>后10</button>
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
         moree:state.vars.moree,
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
