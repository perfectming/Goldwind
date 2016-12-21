import React from 'react';
import {connect} from 'react-redux';
import styles from './LoseElectricstyle.scss';
import PBAdata from './TimeSelect-data';
import ChartOne from './ChartOne.jsx';
import ChartFive from './ChartFive.jsx';

var actions = require('redux/actions');

let loseArea = [],loseAreaName=[],loseAreaId=[],selectName=[],selectId=[];

let Component = React.createClass({
	componentWillMount() {
    	let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
    	let {}=this.props;
        this.props.init();
    },
    
	render() {
		let data=PBAdata,comp=data.list;
		let {selectName,selectId,ipUrl,checkedLose=1,buttonAction, inputOnChange,changeValueST,changeValueET,checkedBoxPro,checkedBoxElec}=this.props;
		return(
				<div className={styles.bodyBox}>
					<div className={styles.inquireBox}>
		                {
		                    comp.map((value, key,valueName)=> {
		                        if (value.type === 'date') {
		                            return (
		                                    <div className={styles.dateBox} key={key}>
		                                        <span>发生时间</span><input id="startTime" ref="startTime" onChange={(e)=>changeValueST(e.target.value)} placeholder={value.content} type={value.type} style={{width:value.width}}/>
		                                        <span>结束时间</span><input id="endTime" ref="endTime" onChange={(e)=>changeValueET(e.target.value)} placeholder={value.content} type={value.type} style={{width:value.width}}/>
		                                    </div>
		                                )
		                        }else if (value.type === 'select') {
		                            return (
		                                    <div className={styles.seleBox} key={key}>
		                                        <span>选择KPI损失电量对象</span>
		                                        <select ref={'selectType'+key}>
		                                            {value.select.map((value, key)=> {
		                                                return (
		                                                    <option value={value} key={key}>{value}</option>
		                                                )
		                                            })}
		                                        </select>
		                                    </div>
		                                )
		                        }else if (value.type === 'button') {
		                            return (
		                                    <div className={styles.btnBox} key={key}>
			                                    <div className={styles.bBox}>
			                                        <button onClick={()=>buttonAction(loseArea,loseAreaName,loseAreaId,checkedLose,ipUrl)}>{"查询"}</button>
			                                    </div>
			                                    <div className={styles.bBox}>
			                                        <button onClick={()=>buttonReset()}>{"重置"}</button>
			                                    </div>
		                                    </div>
		                                )
		                        }else if (value.type === 'radio') {
		                            return (
		                                <div className={styles.radioBox} key={key}>
			                                <span>指标项选择 :</span>
			                                <input type={value.type} id="loseElectric" checked={checkedLose==1? true:false} onChange={()=>checkedBoxElec()} name={value.type}/>
			                                <span>损失电量</span>
			                                <input type={value.type} id="loseProfit" checked={checkedLose==0? true:false} onChange={()=>checkedBoxPro()} name={value.type}/>
			                                <span>损失收入</span>
		                                </div>
		                            )
		                        }
		                    })
		                }
		            </div>
					<div className={styles.content}>
						<div className={styles.areaLose}>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={loseAreaName[0]} lose={loseArea[0]}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={data.data[0].text[1]} lose={data.lose}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={data.data[0].text[2]} lose={data.lose}></ChartOne>
							</div>
							<div className={`${styles.areaSection} ${styles.boxShadow}`}>
								<ChartOne text={data.data[0].text[3]} lose={data.lose}></ChartOne>
							</div>
						</div>
						<div className={`${styles.lose} ${styles.boxShadow}`}>
							<ChartFive></ChartFive>
						</div>
					</div>
				</div>
			
			
		)
		
}
});

const mapStateToProps = (state) => {
    return {
    	ipUrl : state.vars.ipUrl,
    	checkedLose : state.vars.checkedLose,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	ajax: (ipUrl) =>{
    		$.ajax({
        		url:'http://'+ipUrl+'/wbi/KPI/getMrKPILoseElec',//Pie表
		        type: 'post',
		        async:false,
		        dataType: 'json',
		        data:'', 
		        success:function (data) {
		        	console.log(data)
		        	for(var i in data.data){
		        		loseArea[i]=[['故障损失',data.data[i].faultloss],['维护损失',data.data[i].maintainloss],['限功率损失',data.data[i].limitloss],['非设备原因损失',data.data[i].nodevreasonloss]];
		        		loseAreaName[i]=data.data[i].groupname;
		        		loseAreaId[i]=data.data[i].groupid;
		        	};
				},
		        complete : function(XMLHttpRequest,status){ 
				　　　if(status=='timeout'){
				　　　　　 console.log('超时');
				　　　}
				},
			});
			$.ajax({
        		url:'http://'+ipUrl+'/wbi/KPI/getGroupidAndwfid',//PBA表
		        type: 'post',
		        async:false,
		        dataType: 'json',
		        data:'',
		        timeout : 60000, 
		        success:function (data) {
		        	console.log(data)
		        	selectId=[],selectName=[];
		        	for(var i in data.data){
		        		selectId.push(data.data[i].groupid);
		        		selectName.push(data.data[i].groupname);
		        		for(var j in data.data[i].wfs){
		        			selectId.push(data.data[i].wfs[j].wfid);
		        			selectName.push(data.data[i].wfs[j].wfname);
		        		}
		        	}
		        	console.log(selectId);
		        	console.log(selectName);
		        },
		        complete : function(XMLHttpRequest,status){ 
				　　　if(status=='timeout'){
				　　　　　 console.log('超时');
				　　　}
				},
			})
    	},
        init: () => {
        	//初始日期为上月
        	var date = new Date();
        	var yearString=date.getFullYear();
        	var monthString=date.getMonth()+1;
        	var dayString;
        	//判断获取上月的月份和年份
        	if(monthString==1){
        		monthString=12;
        		yearString=yearString-1;
        	}else{
        		monthString=monthString-1;
        	};
        	//判断获取上月最后一天日期
        	if(monthString==2){
        		if(yearString%4==0){
        			dayString=29;
        		}
        		dayString=28;
        	}else if(monthString==4||6||9||11){
        		dayString=30;
        	}else{
        		dayString=31;
        	};
        	var startString=yearString+'-'+monthString+'-'+'01';
        	var endString=yearString+'-'+monthString+'-'+dayString;
        	$('#startTime').val(startString);
            $('#endTime').val(endString);
        },
        changeValueST : (e) => {
        	
	    },
	    changeValueET : (e) => {
	        	
	    },
	    checkedBoxElec : () =>{
	    	dispatch(actions.setVars('checkedLose', 1));
	    },
	    checkedBoxPro : () =>{
	    	dispatch(actions.setVars('checkedLose', 0));
	    },
	    buttonAction : (loseArea,loseAreaName,loseAreaId,checkedLose,ipUrl) =>{
	    	var sTime = $('#startTime').val();
	        //结束时间时间
	        var eTime = $('#endTime').val();
			if(sTime == '' || eTime == ''){
	            alert('请选择开始或者结束时间');
	            return false;
	       };
    		$.ajax({
    			url:'http://'+ipUrl+'/wbi/KPI/getKPILoseElec',//Pie表
		        type: 'post',
		        async:false,
		        dataType: 'json',
		        data:{'flag':checkedLose,'startTime':sTime,'endTime':eTime,'groupid':loseAreaId[0],}, 
		        success:function (data) {
		        	console.log(data)
		        	for(var i in data.data){
		        		loseArea[i]=[['故障损失',data.data[i].faultloss],['维护损失',data.data[i].maintainloss],['限功率损失',data.data[i].limitloss],['非设备原因损失',data.data[i].nodevreasonloss]];
		        		loseAreaName[i]=data.data[i].groupname;
		        		loseAreaId[i]=data.data[i].groupid;
		        	};
				},
		        complete : function(XMLHttpRequest,status){ 
				　　　if(status=='timeout'){
				　　　　　 console.log('超时');
				　　　}
				},
			});
	    }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

