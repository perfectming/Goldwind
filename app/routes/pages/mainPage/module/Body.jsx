import React from 'react';
import {connect} from 'react-redux';
import styles from './Body.scss';
import Tab from './Tab.jsx';
import Tree from './Tree.jsx';
import Header from './Header.jsx';

import u865 from '../img/comp/gz_icon.png';
import u867 from '../img/comp/tx_icon.png';
import u869 from '../img/comp/xx_icon.png';
import u871 from '../img/comp/ss_icon.png';

import Health_main from '../comp/healthManagement/Health_main.jsx';//健康管理
import History_list from '../comp/healthManagement/history.jsx';
import Manaport from '../comp/healthManagement/manaport.jsx';
import Subscribe from '../comp/healthManagement/subscribe.jsx';
import Yujing from '../comp/healthManagement/yujing.jsx';

import Booster from '../comp/wfm/runMonitor/Booster.jsx';//马鑫
import Monitorkb from '../comp/wfm/monitorkb/Monitorkb.jsx';

import Fan from '../comp/wfm/runMonitor/fanpvmatrix/Fan.jsx';//徐远明
import Ms from '../comp/wfm/mSystem/Ms.jsx';
import Amm from '../comp/wfm/mSystem/Amm.jsx';

import PEQI from '../comp/wfm/datamanager/PEQI.jsx';//姜园
import AS from '../comp/wfm/mSystem/AS.jsx';
import Alarm from '../comp/wfm/faultalarm/Alarm.jsx';
import Fault from '../comp/wfm/faultalarm/Fault.jsx';
import Tkgl from '../comp/wfm/runMonitor/controlAll.jsx';
import Power from '../comp/wfm/runMonitor/Power.jsx';

import Super from '../comp/wfm/runMonitor/Super.jsx';//林津津
import Cockpit from '../comp/wfm/cockpit/Cockpit.jsx';
import Ywbb from '../comp/wfm/report/allywbb.jsx';
import Fan_matrix from '../comp/wfm/runMonitor/fpinterface/Fan_matrix.jsx';
import Distribution from '../comp/wfm/runMonitor/distribution.jsx';
import Legend from '../comp/wfm/super/tootipbox.jsx';
import CS from '../comp/wfm/chart/cs.jsx';


import Healthy_one from '../comp/wbi/dashboard/grouprole/group/groupj/Healthy_one.jsx';//姜海鹏
import Healthy from '../comp/wbi/dashboard/grouprole/group/groupj/Healthy.jsx';
import Healthypba from '../comp/wbi/dashboard/grouprole/group/groupj/Healthypba.jsx';
import Healthypbas from '../comp/wbi/dashboard/grouprole/group/groupj/Healthypbas.jsx';
import Healthyregin from '../comp/wbi/dashboard/grouprole/area/Healthyregin.jsx';
import Healthyregins from '../comp/wbi/dashboard/grouprole/area/Healthyregins.jsx';
import Healthyregpba from '../comp/wbi/dashboard/grouprole/area/Healthyregpba.jsx';
import Healthyregpbas from '../comp/wbi/dashboard/grouprole/area/Healthyregpbas.jsx';
import Healthygen from '../comp/wbi/dashboard/grouprole/group/groupj/Healthygen.jsx';
import Healthygens from '../comp/wbi/dashboard/grouprole/group/groupj/Healthygens.jsx';
import Regiopower from '../comp/wbi/dashboard/grouprole/area/Regiopower.jsx';
import Regiopowers from '../comp/wbi/dashboard/grouprole/area/Regiopowers.jsx';
import Regiotba from '../comp/wbi/dashboard/grouprole/area/Regiotba.jsx';
import Regiotbas from '../comp/wbi/dashboard/grouprole/area/Regiotbas.jsx';
import Input_cost from '../comp/wbi/dashboard/grouprole/area/Input_cost.jsx';
import Prospace from '../comp/wbi/dashboard/grouprole/area/Prospace.jsx';


import Areace from '../comp/wbi/dashboard/grouprole/windpage/Areace.jsx';//薛旭东44
import Areacet from '../comp/wbi/dashboard/grouprole/windpage/Areacet.jsx';
import TBAtime from '../comp/wbi/dashboard/grouprole/windpage/TBAtime.jsx';
import TBAspace from '../comp/wbi/dashboard/grouprole/windpage/TBAspace.jsx';
import Healty from '../comp/wbi/dashboard/grouprole/windpage/Healty.jsx';
import Healthytime from '../comp/wbi/dashboard/grouprole/windpage/Healthytime.jsx';
import PBAtime from '../comp/wbi/dashboard/grouprole/windpage/PBAtime.jsx';
import PBAspace from '../comp/wbi/dashboard/grouprole/windpage/PBAspace.jsx';
import Profits from '../comp/wbi/dashboard/grouprole/group/earnings/Profits.jsx';
import Profitss from '../comp/wbi/dashboard/grouprole/group/tba/Profitss2.jsx';
import Profitsss from '../comp/wbi/dashboard/grouprole/group/tbatime/Profitsss3.jsx';
import PEQII from '../comp/wbi/dashboard/grouprole/windpage/PEQII.jsx';
import WFSprofit from '../comp/wbi/dashboard/grouprole/windpage/WFSprofit.jsx';
import WFTprofit from '../comp/wbi/dashboard/grouprole/windpage/WFTprofit.jsx';
import Profitime from '../comp/wbi/dashboard/grouprole/group/Profitime.jsx';



import Baotou from '../comp/wbi/dashboard/branch/Baotou.jsx';//路迪
import Windbtpage from '../comp/wbi/dashboard/branch/Windbtpage.jsx';
import Xilin from '../comp/wbi/dashboard/branch/Xilin.jsx';
import Areaa from '../comp/wbi/dashboard/grouprole/area/Area.jsx';
import Group from '../comp/wbi/dashboard/grouprole/group/Group.jsx';
import Windpage from '../comp/wbi/dashboard/grouprole/windpage/Windpage.jsx';
import GroupKBA from '../comp/wbi/KPI/GroupKBA.jsx';
import AreaKBA from '../comp/wbi/KPI/AreaKBA.jsx';
import LoseElectric from '../comp/wbi/KPI/LoseElectric.jsx';
import DeviceLose from '../comp/wbi/KPI/DeviceLose.jsx';
import TopTen from '../comp/wbi/KPI/TopTen.jsx';
import ServiceLose from '../comp/wbi/KPI/ServiceLose.jsx';
import PerformLose from '../comp/wbi/KPI/PerformLose.jsx';
import MaintainLose from '../comp/wbi/KPI/MaintainLose.jsx';
import LimitLose from '../comp/wbi/KPI/LimitLose.jsx';
import Reliability from '../comp/wbi/KPI/Reliability.jsx';


var actions = require('redux/actions');
let page = require('../../../../../config/page');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {showPage, tabOpt, tab, flag=true,cssif2='sdfdf',legend=false,navlegend=false,changelegend,ifshow=false} = this.props;
        return (
            <div className={`${flag===true?styles.bodyBox : styles.bodyBox1} ${cssif2==='left'? styles.animate : styles.sdsd} ${cssif2==='right'? styles.animate1 : styles.sdsd}`}>
                <div className={ifshow===true? styles.fiexd :styles.ifshow}>
                    <img src={u871} onClick={()=>changelegend(legend)}/>
                    <img src={u865}/>
                    <img src={u867}/>
                    <img src={u869}/>
                    {legend===true && <Legend></Legend>}
                </div>
                <Tab tabOpt={tabOpt} tab={tab}/>
                {showPage === 'super' && <Super></Super>}
                {showPage === 'booster' && <Booster></Booster>}
                {showPage === 'tkgl' && <Tkgl></Tkgl>}
                {showPage === 'distribution' && <Distribution></Distribution>}
                {showPage === 'fan' && <Fan></Fan>}
                {showPage === 'power' && <Power></Power>}
                {showPage === 'cockpit' && <Cockpit></Cockpit>}
                {showPage === 'alarm' && <Alarm></Alarm>}
                {showPage === 'PEQI' && <PEQI></PEQI>}
                {showPage === 'AS' && <AS></AS>}
                {showPage === 'ms' && <Ms></Ms>}
                {showPage === 'amm' && <Amm></Amm>}
                {showPage === 'monitorkb' && <Monitorkb></Monitorkb>}
                {showPage === 'fan_matrix' && <Fan_matrix></Fan_matrix>}
                {showPage === 'ywbb' && <Ywbb></Ywbb>}
                {showPage === 'fault' && <Fault></Fault>}

                {showPage === 'baotou' && <Baotou></Baotou>}
                {showPage === 'windbtpage' && <Windbtpage></Windbtpage>}
                {showPage === 'xilin' && <Xilin></Xilin>}
                {showPage === 'area' && <Areaa></Areaa>}
                {showPage === 'group' && <Group></Group>}
                {showPage === 'windpage' && <Windpage></Windpage>}
                {showPage === 'serviceLose' && <ServiceLose></ServiceLose>}
                {showPage === 'performLose' && <PerformLose></PerformLose>}
                {showPage === 'maintainLose' && <MaintainLose></MaintainLose>}
                {showPage === 'limitLose' && <LimitLose></LimitLose>}
                {showPage === 'groupKBA' && <GroupKBA></GroupKBA>}
                {showPage === 'areaKBA' && <AreaKBA></AreaKBA>}
                {showPage === 'loseElectric' && <LoseElectric></LoseElectric>}

                {showPage === 'deviceLose' && <DeviceLose></DeviceLose>}
                {showPage === 'topTen' && <TopTen></TopTen>}





                {showPage === 'healthy_one' && <Healthy_one></Healthy_one>}
                {showPage === 'healthy' && <Healthy></Healthy>}
                {showPage === 'healthypba' && <Healthypba></Healthypba>}
                {showPage === 'healthypbas' && <Healthypbas></Healthypbas>}
                {showPage === 'healthyregin' && <Healthyregin></Healthyregin>}
                {showPage === 'healthyregins' && <Healthyregins></Healthyregins>}
                {showPage === 'healthyregpba' && <Healthyregpba></Healthyregpba>}
                {showPage === 'healthyregpbas' && <Healthyregpbas></Healthyregpbas>}
                {showPage === 'healthygen' && <Healthygen></Healthygen>}
                {showPage === 'healthygens' && <Healthygens></Healthygens>}
                {showPage === 'regiopower' && <Regiopower></Regiopower>}
                {showPage === 'regiopowers' && <Regiopowers></Regiopowers>}
                {showPage === 'regiotba' && <Regiotba></Regiotba>}
                {showPage === 'regiotbas' && <Regiotbas></Regiotbas>}
                {showPage === 'prospace' && <Prospace></Prospace>}

                {showPage === 'areace' && <Areace></Areace>}
                {showPage === 'areacet' && <Areacet></Areacet>}
                {showPage === 'tbatime' && <TBAtime></TBAtime>}
                {showPage === 'tbaspace' && <TBAspace></TBAspace>}
                {showPage === 'healty' && <Healty></Healty>}
                {showPage === 'healthytime' && <Healthytime></Healthytime>}
                {showPage === 'pbatime' && <PBAtime></PBAtime>}
                {showPage === 'pbaspace' && <PBAspace></PBAspace>}
                {showPage === 'profits' && <Profits></Profits>}
                {showPage === 'profitss' && <Profitss></Profitss>}
                {showPage === 'profitsss' && <Profitsss></Profitsss>}
                {showPage === 'wfsprofit' && <WFSprofit></WFSprofit>}
                {showPage === 'wftprofit' && <WFTprofit></WFTprofit>}
                {showPage === 'profitime' && <Profitime></Profitime>}
                


                {showPage === 'reliability' && <Reliability></Reliability>}






                {showPage === 'health_main' && <Health_main></Health_main>}
                {showPage === 'history_list' && <History_list></History_list>}
                {showPage === 'manaport' && <Manaport></Manaport>}
                {showPage === 'subscribe' && <Subscribe></Subscribe>}
                {showPage === 'yujing' && <Yujing></Yujing>}
                {showPage === 'peqii' && <PEQII></PEQII>}
                {showPage === 'input_cost' && <Input_cost></Input_cost>}
                {showPage === 'cs' && <CS></CS>}


                <div className={styles.clearbox}></div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        showPage: state.vars.showPage,
        flag: state.vars.bodypage,
        cssif2: state.vars.cssif2,
        legend: state.vars.legend,
        ifshow: state.vars.ifshow,//是否显示右上角告警查询按钮
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('bodypage', false));


        },
        changelegend:(legend)=>{
            legend=true;
            dispatch(actions.setVars('legend', legend));
        },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
