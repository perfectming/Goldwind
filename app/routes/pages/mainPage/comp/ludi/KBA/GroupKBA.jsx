import React from 'react';
import {connect} from 'react-redux';
import styles from './GroupKBAstyle.scss';
import TimeSelect from './TimeSelect.jsx';
import TableF from './TableF.jsx';
import TableS from './TableS.jsx';
import TableT from './TableT.jsx';

let ipUrl = '10.68.100.32:8080';
let areaId=[],areaName=[],areaPBA=[],areaFault=[],areaLimit=[],areaDevice=[],areaMaintain=[],areaElec=[];
let wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtData,wtElec=[],wtLose=[],wtPBA=[],wtName=[];

var actions = require('redux/actions');

let Component = React.createClass({
	componentWillMount() {
        this.props.init();
    },
    
	render() {
		let {hide,topTen,bottomTen,more,choice=1,wtName,wtElec,wtPBA,wtLose}=this.props;
		return(
			<div className={styles.gbaBox}>
					<TimeSelect groupid={201612121721151}></TimeSelect>
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
							<div className={choice==3? styles.moreLight:styles.more} onClick={()=>more(wtData,choice)}>更多</div>
							<TableT wtName={wtName} wtElec={wtElec} wtPBA={wtPBA} wtLose={wtLose}></TableT>
						</div>
					</div>
					<div className={choice==3? styles.show:styles.hide}>
						<div className={styles.header}>
							<span onClick={()=>hide(choice)}>×</span>
						</div>
						<div className={styles.chart}>
							<div>
							<TableT wtName={wtName} wtElec={wtElec} wtPBA={wtPBA} wtLose={wtLose} ></TableT>
							</div>
						</div>
					</div>
			</div>
			
			
		)
		
}
});

const mapStateToProps = (state) => {
    return {
    	wtData : state.vars.wtData,
    	choice : state.vars.choice,
    	wtName : state.vars.wtName,
    	wtElec : state.vars.wtElec,
    	wtLose : state.vars.wtLose,
    	wtPBA : state.vars.wtPBA,
    	areaId: state.vars.areaId,
    	X1 : state.vars.x1,
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
		        	areaId=[],areaName=[],areaPBA=[],areaFault=[],areaLimit=[],areaMaintain=[],areaDevice=[],areaElec=[];
		        	wfName=[],wfId=[],wfElec=[],wfLose=[],wfPBA=[],wtElec=[],wtLose=[],wtPBA=[],wtName=[];
		        	for(var i in data.data[2]){
		        		areaId.push(data.data[2][i].groupid);
		        		areaName.push(data.data[2][i].groupname);
		        		areaPBA.push(data.data[2][i].pba);
		        		areaFault.push(data.data[2][i].faultloss);
		        		areaLimit.push(data.data[2][i].limitloss);
		        		areaMaintain.push(data.data[2][i].maintainloss);
		        		areaDevice.push(data.data[2][i].nodevreasonloss);
		        		areaElec.push(data.data[2][i].poweract);
		        	}
		        	for(var i in data.data[1]){
		        		wfName.push(data.data[1][i].wfname);
		        		wfId.push(data.data[1][i].wfid);
		        		wfElec.push(data.data[1][i].poweract);
		        		wfLose.push(data.data[1][i].totalloss);
		        		wfPBA.push(data.data[1][i].pba)
		        	}
		        	dispatch(actions.setVars('areaId', areaId));
		        	wtData=data.data[0];
		        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push(wtData.slice(0,10)[i].poweract);
		        		wtLose.push(wtData.slice(0,10)[i].totalloss);
		        		wtPBA.push(wtData.slice(0,10)[i].pba);
		        	};
		        	dispatch(actions.setVars('wtName', wtName));
				    dispatch(actions.setVars('wtElec', wtElec));
				    dispatch(actions.setVars('wtLose', wtLose));
				    dispatch(actions.setVars('wtPBA', wtPBA));
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
    	topTen:(wtData,choice,wtName,wtElec,wtLose,wtPBA)=>{
    		dispatch(actions.setVars('choice', 1));
    		wtElec=[],wtLose=[],wtPBA=[],wtName=[];
        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push(wtData.slice(0,10)[i].poweract/10000);
		        		wtLose.push(wtData.slice(0,10)[i].totalloss/10000);
		        		wtPBA.push(wtData.slice(0,10)[i].pba);
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
		        		wtElec.push(wtData.slice(0,10)[i].poweract/10000);
		        		wtLose.push(wtData.slice(0,10)[i].totalloss/10000);
		        		wtPBA.push(wtData.slice(0,10)[i].pba);
		        	};
		    dispatch(actions.setVars('wtName', wtName));
		    dispatch(actions.setVars('wtElec', wtElec));
		    dispatch(actions.setVars('wtLose', wtLose));
		    dispatch(actions.setVars('wtPBA', wtPBA));    	
        },
        more:(wtData,choice,wtName,wtElec,wtLose,wtPBA)=>{
        	dispatch(actions.setVars('choice', 3));
        	wtElec=[],wtLose=[],wtPBA=[],wtName=[];
        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i in wtData){
		        		wtName.push(wtData[i].wtname);
		        		wtElec.push(wtData[i].poweract/10000);
		        		wtLose.push(wtData[i].totalloss/10000);
		        		wtPBA.push(wtData[i].pba);
		        	};
		    dispatch(actions.setVars('wtName', wtName));
		    dispatch(actions.setVars('wtElec', wtElec));
		    dispatch(actions.setVars('wtLose', wtLose));
		    dispatch(actions.setVars('wtPBA', wtPBA));
        },
        hide:(choice)=>{
        	dispatch(actions.setVars('choice', 1));
    		wtElec=[],wtLose=[],wtPBA=[],wtName=[];
        	wtData.sort(function(a,b){return b.pba-a.pba});
		        	for(var i=0;i<10;i++){
		        		wtName.push(wtData.slice(0,10)[i].wtname);
		        		wtElec.push(wtData.slice(0,10)[i].poweract/10000);
		        		wtLose.push(wtData.slice(0,10)[i].totalloss/10000);
		        		wtPBA.push(wtData.slice(0,10)[i].pba);
		        	};
		    dispatch(actions.setVars('wtName', wtName));
		    dispatch(actions.setVars('wtElec', wtElec));
		    dispatch(actions.setVars('wtLose', wtLose));
		    dispatch(actions.setVars('wtPBA', wtPBA));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);