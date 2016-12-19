import React from 'react';
import {connect} from 'react-redux';
import styles from './SelectStyle.scss';

let data = require('./TimeSelect-data.js');

var actions = require('redux/actions');
var $ =require('jquery');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
    buttonAction (){
        // 获取select 选择的内容
        //开始时间
        var sTime = this.refs.startTime.value;
        //结束时间时间
        var eTime = this.refs.endTime.value;

        if(sTime == '' || eTime == ''){
            alert('请选择开始或者结束时间');
            return false;
        }
        let {groupid,ipUrl}=this.props;
        $.ajax({
	        		url:'http://'+ipUrl+'/wbi/KPI/getCompanyKPI',//默认获取1区域ID-YES
			        type: 'post',
			        async:false,
			        dataType: 'json',
			        data:{'startTime':sTime,'endTime':eTime,'groupid':groupid},
			        timeout : 60000, 
			        success:function (data) {
			        	console.log(data);
			        },
			        complete : function(XMLHttpRequest,status){ 
					　　　
					},
				});
    },

    render() {
        let {buttonAction, onFocus,changeValueS,changeValueE}= this.props;
        let comp = data.list;
        return (	
            <div className={styles.inquireBox}>
                {
                    comp.map((value, key,valueName)=> {
                        if (value.type === 'date') {
                            return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input id="startTime" ref="startTime" onChange={(e)=>changeValueS(e.target.value)} placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input id="endTime" ref="endTime" onChange={(e)=>changeValueE(e.target.value)} placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                        }else if (value.type === 'button') {
                            return (
                                    <div className={styles.btnBox} key={key}>
                                        <button onClick={this.buttonAction}>{value.title}</button>
                                    </div>
                                )
                            }
                        })
                    }
            </div>    
        );
    }
});


const mapStateToProps = (state) => {
    return {
    	X1 : state.vars.x1,
    	ipUrl : state.vars.ipUrl,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
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
        changeValueS : (e) => {
        	
        },
        changeValueE : (e) => {
        	
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);