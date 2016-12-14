import React from 'react';
import {connect} from 'react-redux';
import styles from './GroupKBAstyle.scss';
import TimeSelect from './TimeSelect.jsx';
import TableF from './TableF.jsx';
import TableS from './TableS.jsx';
import TableT from './TableT.jsx';

let ipUrl = '10.68.100.32:8080';
let areaId=[],areaName=[],areaPBA=[],areaFault=[],areaLimit=[],areaDevice=[],areaMaintain=[],areaElec=[];
let wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtData,wtName=[],wtElec=[],wtPBA=[],wtLose=[];

var actions = require('redux/actions');

let Component = React.createClass({
	componentWillMount() {
        this.props.init();
    },
    
	render() {
		return(
			<div className={styles.gbaBox}>
					<TimeSelect></TimeSelect>
					<div className={styles.content}>
						<div className={`${styles.area} ${styles.boxShadow}`}>
							<div className={styles.img}><a></a></div>
							<TableF areaName={areaName} areaElec={areaElec} areaFault={areaFault} areaMaintain={areaMaintain} areaLimit={areaLimit} areaDevice={areaDevice} areaPBA={areaPBA}></TableF>
						</div>
						<div className={`${styles.wind} ${styles.boxShadow}`}>
							<div className={styles.img}><a></a></div>
							<TableS wfName={wfName} wfId={wfId} wfElec={wfElec} wfLose={wfLose} wfPBA={wfPBA}></TableS>
						</div>
						<div className={`${styles.fan} ${styles.boxShadow}`}>
							<div className={styles.img}><a></a></div>
							<div className={styles.top} onClick={()=>topTen(wtData)}>前10</div>
							<div className={styles.bottom} onClick={()=>bottomTen(wtData)}>后10</div>
							<div className={styles.more} onClick={()=>more(wtData)}>更多</div>
							<TableT wtName={wtName} wtElec={wtElec} wtPBA={wtPBA} wtLose={wtLose} ></TableT>
						</div>
					</div>
			</div>
			
			
		)
		
}
});

const mapStateToProps = (state) => {
    return {
    	wtData : state.vars.wtData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	init: () => {
            	$.ajax({
        		url: 'http://'+ipUrl+'/wbi/KPI/getCompanyKPI',//查询ID电量--YES
		        type: 'post',
		        async:false,
		        data:{},
		        dataType: 'json',//here
		        success:function (data) {
		        	console.log(data);
		        	areaId=[],areaName=[],areaPBA=[],areaFault=[],areaLimit=[],areaMaintain=[],areaDevice=[],areaElec=[];
		        	wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtElec=[],wtLose=[],wtPBA=[],wtName=[];
		        	for(var i in data.data[2]){
		        		areaId.push(data.data[2][i].groupid);
		        		areaName.push(data.data[2][i].groupname);
		        		areaPBA.push(data.data[2][i].pba/10000);
		        		areaFault.push(data.data[2][i].faultloss/10000);
		        		areaLimit.push(data.data[2][i].limitloss/10000);
		        		areaMaintain.push(data.data[2][i].maintainloss/10000);
		        		areaDevice.push(data.data[2][i].nodevreasonloss/10000);
		        		areaElec.push(data.data[2][i].poweract/10000);
		        	}
		        	for(var i in data.data[1]){
		        		wfName.push(data.data[1][i].wfname);
		        		wfId.push(data.data[1][i].wfid);
		        		wfElec.push(data.data[1][i].poweract/10000);
		        		wfLose.push(data.data[1][i].totalloss/10000);
		        		wfPBA.push(data.data[1][i].pba/10000)
		        	}
		        	wtData=data.data[0];
		        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push(wtData.slice(0,10)[i].poweract);
		        		wtLose.push(wtData.slice(0,10)[i].totalloss);
		        		wtPBA.push(wtData.slice(0,10)[i].pba);
		        	}
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　if(status=='timeout'){
			　　　　　 alert('超时');
			　　　　}
			　　},
		    });
		    dispatch(actions.setVars('wfName',wfName ));
		    dispatch(actions.setVars('wfId',wfId ));
		    dispatch(actions.setVars('wfElec',wfElec ));
		    dispatch(actions.setVars('wfLose',wfLose ));
		    dispatch(actions.setVars('wfPBA',wfPBA ));
		    dispatch(actions.setVars('areaName',areaName ));
		    dispatch(actions.setVars('wtData',wtData ));
    	}, 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);