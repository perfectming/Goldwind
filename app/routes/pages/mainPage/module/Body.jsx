import React from 'react';
import {connect} from 'react-redux';
import styles from './Body.scss';
import Chart from '../comp/Chart.jsx';
import From from '../comp/From.jsx';
import Table from '../comp/Table.jsx';

import Test from '../comp/Test.jsx';

import Tkgl from '../comp/Tkgl.jsx';
import Power from '../comp/power/Power.jsx';
import Tab from './Tab.jsx';
import Tree from './Tree.jsx';
import Header from './Header.jsx';

import u865 from '../../img/comp/gz_icon.png';
import u867 from '../../img/comp/tx_icon.png';
import u869 from '../../img/comp/xx_icon.png';
import u871 from '../../img/comp/ss_icon.png';

import Baotou from '../comp/ludi/branch/Baotou.jsx';
import Windbtpage from '../comp/ludi/branch/Windbtpage.jsx';
import Xilin from '../comp/ludi/branch/Xilin.jsx';
import Areaa from '../comp/ludi/instrumentpanel/Area.jsx';
import Group from '../comp/ludi/instrumentpanel/Group.jsx';
import Windpage from '../comp/ludi/instrumentpanel/Windpage.jsx';
import GroupKBA from '../comp/ludi/KBA/GroupKBA.jsx';
import AreaKBA from '../comp/ludi/KBA/AreaKBA.jsx';
import LoseElectric from '../comp/ludi/KBA/LoseElectric.jsx';
import DeviceLose from '../comp/ludi/KBA/DeviceLose.jsx';
import TopTen from '../comp/ludi/KBA/TopTen.jsx';
import ServiceLose from '../comp/ludi/KBA/ServiceLose.jsx';
import PerformLose from '../comp/ludi/KBA/PerformLose.jsx';
import MaintainLose from '../comp/ludi/KBA/MaintainLose.jsx';
import LimitLose from '../comp/ludi/KBA/LimitLose.jsx';
import Reliability from '../comp/ludi/KBA/Reliability.jsx';


import Health_main from '../comp/healthManagement/Health_main.jsx';
import History_list from '../comp/healthManagement/history.jsx';
import Manaport from '../comp/healthManagement/manaport.jsx';
import Subscribe from '../comp/healthManagement/subscribe.jsx';
import Yujing from '../comp/healthManagement/yujing.jsx';







import Booster from '../comp/wfm/Booster.jsx';//马鑫
import Monitorkb from '../comp/wfm/maXin/Monitorkb.jsx';

import Fan from '../comp/wfm/Fan.jsx';//徐远明
import Ms from '../comp/wfm/xym/Ms.jsx';
import Amm from '../comp/wfm/xym/Amm.jsx';


import PEQI from '../comp/wfm/jy/PEQI.jsx';//姜园
import AS from '../comp/wfm/jy/AS.jsx';
import Alarm from '../comp/wfm/yAll/Alarm.jsx';
import Fault from '../comp/wfm/yAll/Fault.jsx';
import Tkgl from '../comp/wfm/tkgl.jsx';

import Super from '../comp/wfm/Super.jsx';//林津津
import Cockpit from '../comp/wfm/linjinjin/Cockpit.jsx';
import Ywbb from '../comp/wfm/linjinjin/yewubaobiao/allywbb.jsx';
import Fan_matrix from '../comp/wfm/linjinjin/Fan_matrix.jsx';
import Distribution from '../comp/wfm/linjinjin/distribution.jsx';
import Legend from '../comp/wfm/super/tootipbox.jsx';
import CS from '../comp/wfm/linjinjin/cs.jsx';


import Healthy_one from '../comp/wbi/jhp/Healthy_one.jsx';//姜海鹏
import Healthy from '../comp/wbi/jhp/Healthy.jsx';
import Healthypba from '../comp/wbi/jhp/Healthypba.jsx';
import Healthypbas from '../comp/wbi/jhp/Healthypbas.jsx';
import Healthyregin from '../comp/wbi/jhp/Healthyregin.jsx';
import Healthyregins from '../comp/wbi/jhp/Healthyregins.jsx';
import Healthyregpba from '../comp/wbi/jhp/Healthyregpba.jsx';
import Healthyregpbas from '../comp/wbi/jhp/Healthyregpbas.jsx';
import Healthygen from '../comp/wbi/jhp/Healthygen.jsx';
import Healthygens from '../comp/wbi/jhp/Healthygens.jsx';
import Regiopower from '../comp/wbi/jhp/Regiopower.jsx';
import Regiopowers from '../comp/wbi/jhp/Regiopowers.jsx';
import Regiotba from '../comp/wbi/jhp/Regiotba.jsx';
import Regiotbas from '../comp/wbi/jhp/Regiotbas.jsx';
import Input_cost from '../comp/wbi/jhp/Input_cost.jsx';



import Areace from '../comp/wbi/mbixxd/Areace.jsx';//薛旭东
import Areacet from '../comp/wbi/mbixxd/Areacet.jsx';
import TBAtime from '../comp/wbi/mbixxd/TBAtime.jsx';
import TBAspace from '../comp/wbi/mbixxd/TBAspace.jsx';
import Healty from '../comp/wbi/mbixxd/Healty.jsx'; 
import Healthytime from '../comp/wbi/mbixxd/Healthytime.jsx';
import PBAtime from '../comp/wbi/mbixxd/PBAtime.jsx';
import PBAspace from '../comp/wbi/mbixxd/PBAspace.jsx';
import Profits from '../comp/wbi/mbixxd/earnings/Profits.jsx';
import Profitss from '../comp/wbi/mbixxd/tba/Profitss.jsx';
import Profitsss from '../comp/wbi/mbixxd/tbatime/Profitsss.jsx';
import PEQII from '../comp/wbi/mbixxd/PEQII.jsx';

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
                {showPage === 'chart' && <Chart></Chart>}
                {showPage === 'from' && <From></From>}
                {showPage === 'table' && <Table></Table>}
                {showPage === 'super' && <Super></Super>}
                {showPage === 'booster' && <Booster></Booster>}
                {showPage === 'tkgl' && <Tkgl></Tkgl>}
                {showPage === 'distribution' && <Distribution></Distribution>}
                {showPage === 'fan' && <Fan></Fan>}
                {showPage === 'power' && <Power></Power>}
                {showPage === 'test' && <Test></Test>}
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
