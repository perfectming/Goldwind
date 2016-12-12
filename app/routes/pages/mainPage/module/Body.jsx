import React from 'react';
import {connect} from 'react-redux';
import styles from './Body.scss';
import Chart from '../comp/Chart.jsx';
import From from '../comp/From.jsx';
import Table from '../comp/Table.jsx';
import Super from '../comp/Super.jsx';
import Test from '../comp/Test.jsx';
import Distribution from '../comp/linjinjin/distribution.jsx';
import Tkgl from '../comp/Tkgl.jsx';
import Power from '../comp/power/Power.jsx';
import Tab from './Tab.jsx';
import Booster from '../comp/Booster.jsx';
import Tree from './Tree.jsx';
import Header from './Header.jsx';
import Fan from '../comp/Fan.jsx';
import Cockpit from '../comp/linjinjin/Cockpit.jsx';
import Fan_matrix from '../comp/linjinjin/Fan_matrix.jsx';
import Alarm from '../comp/yAll/Alarm.jsx';
import PEQI from '../comp/jy/PEQI.jsx';
import AS from '../comp/jy/AS.jsx';
import Ms from '../comp/xym/Ms.jsx';
import Amm from '../comp/xym/Amm.jsx';
import Monitorkb from '../comp/maXin/Monitorkb.jsx';
import Ywbb from '../comp/linjinjin/yewubaobiao/allywbb.jsx';
import Fault from '../comp/yAll/Fault.jsx';
import u865 from '../img/comp/gz_icon.png';
import u867 from '../img/comp/tx_icon.png';
import u869 from '../img/comp/xx_icon.png';
import u871 from '../img/comp/ss_icon.png';

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

import Healthy_one from '../comp/jhp/Healthy_one.jsx';
import Healthy from '../comp/jhp/Healthy.jsx';
import Healthypba from '../comp/jhp/Healthypba.jsx';
import Healthypbas from '../comp/jhp/Healthypbas.jsx';
import Healthyregin from '../comp/jhp/Healthyregin.jsx';
import Healthyregins from '../comp/jhp/Healthyregins.jsx';
import Healthyregpba from '../comp/jhp/Healthyregpba.jsx';
import Healthyregpbas from '../comp/jhp/Healthyregpbas.jsx';
import Healthygen from '../comp/jhp/Healthygen.jsx';
import Healthygens from '../comp/jhp/Healthygens.jsx';
import Regiopower from '../comp/jhp/Regiopower.jsx';
import Regiopowers from '../comp/jhp/Regiopowers.jsx';
import Regiotba from '../comp/jhp/Regiotba.jsx';
import Regiotbas from '../comp/jhp/Regiotbas.jsx';

import Areace from '../comp/mbixxd/Areace.jsx';
import Areacet from '../comp/mbixxd/Areacet.jsx';
import TBAtime from '../comp/mbixxd/TBAtime.jsx';
import TBAspace from '../comp/mbixxd/TBAspace.jsx';
import Healty from '../comp/mbixxd/Healty.jsx'; 
import Healthytime from '../comp/mbixxd/Healthytime.jsx';
import PBAtime from '../comp/mbixxd/PBAtime.jsx';
import PBAspace from '../comp/mbixxd/PBAspace.jsx';
import Profits from '../comp/mbixxd/earnings/Profits.jsx';
import Profitss from '../comp/mbixxd/tba/Profitss.jsx';
import Profitsss from '../comp/mbixxd/tbatime/Profitsss.jsx';



import Legend from '../comp/super/tootipbox.jsx';
import Reliability from '../comp/ludi/KBA/Reliability.jsx';
import PEQII from '../comp/mbixxd/PEQII.jsx';
import Health_main from '../comp/healthManagement/Health_main.jsx';
import History_list from '../comp/healthManagement/history.jsx';
import Manaport from '../comp/healthManagement/manaport.jsx';
import Subscribe from '../comp/healthManagement/subscribe.jsx';
import Yujing from '../comp/healthManagement/yujing.jsx';
import Input_cost from '../comp/jhp/Input_cost.jsx';
import CS from '../comp/linjinjin/cs.jsx';
import Turning from '../comp/xym/turning.jsx';






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
                {showPage === 'turning' && <Turning></Turning>}


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
