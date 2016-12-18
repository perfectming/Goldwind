import React from 'react';
import {connect} from 'react-redux';
import styles from './SelectStyle.scss';


let data = require('./TimeSelect-data.js');

var actions = require('redux/actions');

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
        let {groupid}=this.props;
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
        let {buttonAction, onFocus,changeValue}= this.props;
        let comp = data.list;
        return (	
            <div className={styles.inquireBox}>
                {
                    comp.map((value, key,valueName)=> {
                        if (value.type === 'date') {
                            return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input ref="startTime" value="2016-11-01" onChange={()=>changeValue()} placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input ref="endTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        	
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);