import React from 'react';
import {connect} from 'react-redux';
import styles from './Cockpit.scss';
import Title from '../super/Title.jsx';
import Polar from '../wfm/mxx/Polar1';
import Pie2 from './Pie2.jsx';
import Tuchart from './Tuchart.jsx';
import Tuchart1 from './tuchar1.jsx';

import jnjp from '../../../img/comp/jienengjp.png';
import nljys from '../../../img/comp/nianleijys.png';
import nljybm from '../../../img/comp/nianleijybm.png';
import nlcojp from '../../../img/comp/nianleicojp.png';
import nlsojp from '../../../img/comp/nianleisojp.png';
import up from '../../../img/comp/up_icon.png';
import down from '../../../img/comp/down_icon.png';
import anquan from '../../../img/comp/anquan_icon.png';
import monBoardData from '../../../../../../../config/MonitorBoardData';
import model from '../../../../../../../config/MonitorBoardModel';
import Login from '../../../../../../components/common/Loading.jsx';
let comp = require('./date');
var $ = require('jquery');
let arr=[];
let arrname=[];
let allnum=0;
let num=[];
for(let i in monBoardData.ModelData){
    arr.push(monBoardData.ModelData[i].DayEgyAt/1);
}
arr.pop();
for(let x=0;x<arr.length;x++){
    allnum+=arr[x]
};

var actions = require('redux/actions');

let Component = React.createClass({
   componentWillMount() {
        this.props.changedate();
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let{bloo=false}=this.props;
        if(bloo){
        let mobd=monBoardData.ModelData;
        let mod=model.Model;
        let urodz = new Date("11/12/2015");
        let now = new Date();let ile = now.getTime() - urodz.getTime();
        let dni = Math.floor(ile / (1000 * 60 * 60 * 24));
        return(
            <div className={styles.bodyBox}>
                <div className={`${styles.zhzb} ${styles.box_shadow}`}>
                    <Title title={['综合指标']}></Title>
                    <div className={styles.zhzbdown}><img src={anquan} className={styles.anquan}/>安全运行
                        <span className={styles.daynum}> 1026</span> 天
                    </div>
                    <div className={styles.zhzbtop}>
                        <div className={styles.zhzbtopbox}><div>全年发电量</div> <span className={styles.zhzbtopboxg}>71070.53</span>万kWh</div>
                        <div className={styles.zhzbtopbox}><div>弃风率</div> <span className={styles.zhzbtopboxg}>38</span>%</div>
                        <div className={styles.zhzbtopbox}><div>弃光率</div> <span className={styles.zhzbtopboxg}>46</span>%</div>
                        <div className={styles.zhzbtopbox}><div>上网电量</div> <span className={styles.zhzbtopboxg}>6430.45</span>万kWh</div>
                        <div className={styles.zhzbtopbox}><div>厂用电量</div> <span className={styles.zhzbtopboxg}>2255.21</span>万kWh</div>
                        <div className={styles.zhzbtopbox}><div>购网电量</div> <span className={styles.zhzbtopboxg}>{mobd[8888800].MonthEgyAt}</span>万kWh</div>
                        
                    </div>
                    
                </div>
                <div className={`${styles.zhzbgl} ${styles.box_shadow}`}>
                    <Title title={['综合指标概览']}></Title>
                    <div className={styles.zhzbglmain}>
                        <div className={styles.zhzbglbox}><img src={up}/><p>投资收益率</p><Pie2 color={['#1fe005']} num={[100]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#1fe005'}}>{126.3}%</p></span></div>
                        <div className={styles.zhzbglbox}><img src={up}/><p>年发电计划完成率</p><Pie2 color={['#fbd500','#32535C']} num={[89,11]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#fbd500'}}>{89.6}%</p></span></div>
                        <div className={styles.zhzbglbox}><img src={down}/><p>年度PBA</p><Pie2 color={['#ff0000','#32535C']} num={[68,32]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#ff0000'}}>{68}%</p></span></div>
                        <div className={styles.zhzbglbox}><img src={up}/><p>设备健康度</p><Pie2 color={['#d06960','#32535C']} num={[57,43]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#d06960'}}>{57}%</p></span></div>
                        <div className={styles.zhzbglbox}><img src={down}/><p>任务完成度</p><Pie2 color={['#fbd500','#32535C']} num={[82,18]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#fbd500'}}>{82}%</p></span></div>
                        <div className={styles.zhzbglbox}><img src={up}/><p>年度MTBF</p><Pie2 color={['#d06960','#32535C']} num={[30,70]}></Pie2><span className={styles.zhzbglboxnum}><p style={{color:'#d06960'}}>30h</p></span></div>
                    </div>
                </div>
                <div className={styles.columbox}>
                    <div className={`${styles.leftcolum} ${styles.box_shadow}`}>
                    <Title title={['月发电量完成情况']}></Title>
                        <Tuchart shuju={comp.jscnum.month}></Tuchart>
                    </div>
                    <div className={`${styles.rightcolum} ${styles.box_shadow}`}>
                    <Title title={['月收益状况']}></Title>
                     <Tuchart shuju={comp.jscnum.money}></Tuchart>
                    </div>
                </div>
             
                <div className={`${styles.fgzyfx} ${styles.box_shadow}`}>

                    <Title title={['场站等效利用小时数']}></Title>
                    <div className={styles.fgzyfxmain}>
                        <Tuchart shuju={comp.jscnum.mtbf}></Tuchart>
                    </div>
                </div>
               
                <div className={`${styles.gzsbgl} ${styles.box_shadow}`}>
                    <Title title={['场站MTBF排行']}></Title>
                    <Tuchart shuju={comp.jscnum.mtbf}></Tuchart>
                </div>
                 <div className={`${styles.ssdlqkfx} ${styles.box_shadow}`}>
                    <Title title={['损失电量情况分析(万kWh)']}></Title>
                    <Tuchart1 shuju={comp.jscnum.elect}></Tuchart1>
                </div>


                   <div className={`${styles.longbox} ${styles.box_shadow}`}>
                   <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={jnjp}/></div>
                        <div className={styles.righttext}>节能减排</div>
                    </div>
                    <div className={`${styles.navitem} ${styles.bore1}`}>
                        <div className={styles.leftimg} style={{width:'100%',textAlign:'center'}}>区域内场站数量:12个</div>
                    </div>
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nlcojp}/></div>
                        <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>73225</b>万吨</h2></div>
                    </div>
                    <div className={`${styles.navitem} ${styles.bore1}`}>
                        <div className={styles.leftimg} style={{width:'100%'}}>纳入CDM场站数量:8个</div>
                    </div>
                    
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nlcojp}/></div>
                        <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>{mobd[8888800].YearSO2Emissions}</b>万吨</h2></div>
                    </div>
                     <div className={`${styles.navitem} ${styles.bore1}`}>
                        <div className={styles.leftimg} style={{width:'100%'}}>未纳入CDM场站数量:4个</div>
                    </div>
                    
                    <div className={styles.navitem}>
                        <div className={styles.leftimg}><img src={nlcojp}/></div>
                        <div className={styles.righttext1}><h2>年累CO2减排</h2><h2><b>24408</b>万吨</h2></div>
                    </div>
                 
                </div>
            </div>

        )
    }else{
        return(
            <Login></Login>
            )
    }
    }
});


const mapStateToProps = (state) => {
    return {

         bloo:state.vars.bloo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changedate:()=>{
          
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
            function setData(rdata){
                dispatch(actions.setVars('zhzb', rdata));
                TY.getRtData("DataOverview", 8888800, setData1)
                function setData1(rdata){
                    dispatch(actions.setVars('bbs', rdata));
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DevicesMatrix", setDatas, "Screen", 0);
                    function setDatas(rdata){
                        dispatch(actions.setVars('fModel', rdata));
                        TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(rdata){
                        dispatch(actions.setVars('fData', rdata));
                            setTimeout(function () {
                                dispatch(actions.setVars('bloo', true));
                            },500)
                        }
                    }
                }
            }
      
        },
        init: () => {
                dispatch(actions.setVars('putpage', false));
                dispatch(actions.setVars('bodypage', false));
                dispatch(actions.setVars('navhide', false));
                dispatch(actions.setVars('cssif2', false));
            var obj = {
                test:''
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
