import React from 'react';
import {connect} from 'react-redux';
import styles from './GroupKBAstyle.scss';
import TimeSelect from './TimeSelect.jsx';
import TableF from './TableF.jsx';
import TableS from './TableS.jsx';
import TableT from './TableT.jsx';
import AlertWindow from './AlertWindow.jsx';
import Login from '../../../../../../components/common/Loading.jsx';


let areaId=[],areaName=[],areaPBA=[],areaFault=[],areaLimit=[],areaDevice=[],areaMaintain=[],areaElec=[];
let wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtData,wtElec=[],wtLose=[],wtPBA=[],wtName=[],wtElecMore=[],wtLoseMore=[],wtPBAMore=[],wtNameMore=[];;

var actions = require('redux/actions');

let Component = React.createClass({
	componentWillMount() {
		let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    
	render() {
		let {alertText,groupKBABool=false,X2,X1,areaId,areaName,areaPBA,areaFault,areaLimit,areaDevice,areaMaintain,areaElec,wfName,wfId,wfElec,wfLose,wfPBA,wtData,hide,topTen,bottomTen,more,choice=1,wtName,wtElec,wtPBA,wtLose,wtNameMore,wtElecMore,wtPBAMore,wtLoseMore}=this.props;
		if(groupKBABool){
			return(
				<div className={styles.gbaBox}>
						<AlertWindow text={alertText}></AlertWindow>
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
								<div className={choice==1? styles.topLight:styles.top} onClick={()=>topTen(wtData,choice,wtName,wtElec,wtLose,wtPBA)}>前10</div>
								<div className={choice==2? styles.bottomLight:styles.bottom} onClick={()=>bottomTen(wtData,choice,wtName,wtElec,wtLose,wtPBA)}>后10</div>
								<div className={choice==3? styles.moreLight:styles.more} onClick={()=>more(wtData,choice,wtName,wtElec,wtLose,wtPBA)}>更多</div>
								<TableT wtName={wtName} wtElec={wtElec} wtPBA={wtPBA} wtLose={wtLose}></TableT>
							</div>
						</div>
						<div className={choice==3? styles.show:styles.hide}>
							<div className={styles.header}>
								<h3><a></a><span>PBA</span></h3>
								<span onClick={()=>hide(wtData,choice,wtName,wtElec,wtLose,wtPBA)}>×</span>
							</div>
							<div className={styles.chart}>
								<div>
								<TableT wtName={wtNameMore} wtElec={wtElecMore} wtPBA={wtPBAMore} wtLose={wtLoseMore}></TableT>
								</div>
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
    	alertText : state.vars.alertText,
    	groupKBABool : state.vars.groupKBABool,
    	ipUrl : state.vars.ipUrl,
    	wtData : state.vars.wtData,
    	choice : state.vars.choice,
    	wtName : state.vars.wtName,
    	wtElec : state.vars.wtElec,
    	wtLose : state.vars.wtLose,
    	wtPBA : state.vars.wtPBA,
    	wtNameMore : state.vars.wtNameMore,
    	wtElecMore : state.vars.wtElecMore,
    	wtLoseMore : state.vars.wtLoseMore,
    	wtPBAMore : state.vars.wtPBAMore,
    	areaId: state.vars.areaId,
    	X1 : state.vars.x1,
    	X2 : state.vars.x2,
    	
    	areaId : state.vars.areaId,
    	areaName : state.vars.areaName,
    	areaPBA : state.vars.areaPBA,
    	areaFault : state.vars.areaFault,
    	areaLimit : state.vars.areaLimit,
    	areaMaintain : state.vars.areaMaintain,
    	areaDevice : state.vars.areaDevice,
    	areaElec : state.vars.areaElec,
    	wfName : state.vars.wfName,
    	wfId : state.vars.wfId,
    	wfElec : state.vars.wfElec,
    	wfLose : state.vars.wfLose,
    	wfPBA : state.vars.wfPBA,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	ajax: (ipUrl) => {
            	$.ajax({
        		url: 'http://'+ipUrl+'/wbi/KPI/getCompanyKPI',
		        type: 'post',
		        async:true,
		        data:{},
		        dataType: 'json',//here
		        success:function (data) {
		        	areaId=[],areaName=[],areaPBA=[],areaFault=[],areaLimit=[],areaMaintain=[],areaDevice=[],areaElec=[];
		        	wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtElec=[],wtLose=[],wtPBA=[],wtName=[];
		        	for(var i in data.data[2]){
		        		areaId.push(data.data[2][i].groupid);
		        		areaName.push(data.data[2][i].groupname);
		        		areaPBA.push((data.data[2][i].pba*100).toFixed(1)/1);
		        		areaFault.push((data.data[2][i].faultloss).toFixed(1)/1);
		        		areaLimit.push((data.data[2][i].limitloss).toFixed(1)/1);
		        		areaMaintain.push((data.data[2][i].maintainloss).toFixed(1)/1);
		        		areaDevice.push((data.data[2][i].nodevreasonloss).toFixed(1)/1);
		        		areaElec.push((data.data[2][i].poweract).toFixed(1)/1);
		        	};
		        	dispatch(actions.setVars('areaId', areaId));
		        	dispatch(actions.setVars('areaName', areaName));
		        	dispatch(actions.setVars('areaPBA', areaPBA));
		        	dispatch(actions.setVars('areaFault', areaFault));
		        	dispatch(actions.setVars('areaLimit', areaLimit));
		        	dispatch(actions.setVars('areaMaintain', areaMaintain));
		        	dispatch(actions.setVars('areaDevice', areaDevice));
		        	dispatch(actions.setVars('areaElec', areaElec));
		        	for(var i in data.data[1]){
		        		wfName.push(data.data[1][i].wfname);
		        		wfId.push(data.data[1][i].wfid);
		        		wfElec.push((data.data[1][i].poweract).toFixed(1)/1);
		        		wfLose.push((data.data[1][i].totalloss).toFixed(1)/1);
		        		wfPBA.push((data.data[1][i].pba*100).toFixed(1)/1)
		        	}
		        	dispatch(actions.setVars('wfName', wfName));
		        	dispatch(actions.setVars('wfId', wfId));
		        	dispatch(actions.setVars('wfElec', wfElec));
		        	dispatch(actions.setVars('wfLose', wfLose));
		        	dispatch(actions.setVars('wfPBA', wfPBA));
		        	
		        	wtData=data.data[0];
		        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push((wtData.slice(0,10)[i].poweract).toFixed(1)/1);
		        		wtLose.push((wtData.slice(0,10)[i].totalloss).toFixed(1)/1);
		        		wtPBA.push((wtData.slice(0,10)[i].pba*100).toFixed(1)/1);
		        	};
		        	dispatch(actions.setVars('wtName', wtName));
				    dispatch(actions.setVars('wtElec', wtElec));
				    dispatch(actions.setVars('wtLose', wtLose));
				    dispatch(actions.setVars('wtPBA', wtPBA));
				    dispatch(actions.setVars('wtData',wtData ));
				    dispatch(actions.setVars('x1', areaName[0]));
            		dispatch(actions.setVars('x2',wfName[0]));
		        },
		        complete : function(XMLHttpRequest,status){ 
			　　　　	dispatch(actions.setVars('groupKBABool',true ));
			　　  },
		    });
		    
    	}, 
    	topTen:(wtData,choice,wtName,wtElec,wtLose,wtPBA)=>{
    		dispatch(actions.setVars('choice', 1));
    		wtElec=[],wtLose=[],wtPBA=[],wtName=[];
        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push((wtData.slice(0,10)[i].poweract).toFixed(1)/1);
		        		wtLose.push((wtData.slice(0,10)[i].totalloss).toFixed(1)/1);
		        		wtPBA.push((wtData.slice(0,10)[i].pba*100).toFixed(1)/1);
		        	};
		    dispatch(actions.setVars('wtName', wtName));
		    dispatch(actions.setVars('wtElec', wtElec));
		    dispatch(actions.setVars('wtLose', wtLose));
		    dispatch(actions.setVars('wtPBA', wtPBA));
        },
        bottomTen:(wtData,choice,wtName,wtElec,wtLose,wtPBA)=>{
        	wtElec=[],wtLose=[],wtPBA=[],wtName=[];
        	dispatch(actions.setVars('choice', 2));
        	wtData.sort(function(a,b){return a.pba-b.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push((wtData.slice(0,10)[i].poweract).toFixed(1)/1);
		        		wtLose.push((wtData.slice(0,10)[i].totalloss).toFixed(1)/1);
		        		wtPBA.push((wtData.slice(0,10)[i].pba*100).toFixed(1)/1);
		        	};
		    dispatch(actions.setVars('wtName', wtName));
		    dispatch(actions.setVars('wtElec', wtElec));
		    dispatch(actions.setVars('wtLose', wtLose));
		    dispatch(actions.setVars('wtPBA', wtPBA));    	
        },
        more:(wtData,choice,wtName,wtElec,wtLose,wtPBA)=>{
        	dispatch(actions.setVars('choice', 3));
        	wtElecMore=[],wtLoseMore=[],wtPBAMore=[],wtNameMore=[];
        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i in wtData){
		        		wtNameMore.push(wtData[i].wtname);
		        		wtElecMore.push((wtData[i].poweract).toFixed(1)/1);
		        		wtLoseMore.push((wtData[i].totalloss).toFixed(1)/1);
		        		wtPBAMore.push((wtData[i].pba*100).toFixed(1)/1);
		        	};
		    dispatch(actions.setVars('wtNameMore', wtNameMore));
		    dispatch(actions.setVars('wtElecMore', wtElecMore));
		    dispatch(actions.setVars('wtLoseMore', wtLoseMore));
		    dispatch(actions.setVars('wtPBAMore', wtPBAMore));
        },
        hide:(wtData,choice,wtName,wtElec,wtLose,wtPBA)=>{
        	dispatch(actions.setVars('choice', 1));
    		wtElec=[],wtLose=[],wtPBA=[],wtName=[];
        	wtData.sort(function(a,b){return b.pba-a.pba});
        			for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push((wtData.slice(0,10)[i].poweract).toFixed(1)/1);
		        		wtLose.push((wtData.slice(0,10)[i].totalloss).toFixed(1)/1);
		        		wtPBA.push((wtData.slice(0,10)[i].pba*100).toFixed(1)/1);
		        	};
		    dispatch(actions.setVars('wtName', wtName));
		    dispatch(actions.setVars('wtElec', wtElec));
		    dispatch(actions.setVars('wtLose', wtLose));
		    dispatch(actions.setVars('wtPBA', wtPBA));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);