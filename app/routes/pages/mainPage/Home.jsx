import React from "react";
import {connect} from 'react-redux';
import Header from './module/Header';
import styles from './module/Home.scss';
import Tree from './module/Tree';
import Body from './module/Body';
import FixedContent from '../../../components/common/FixedContent.jsx';
var {browserHistory} = require('react-router');
var $ =require('jquery');
var ReactHighcharts = require('react-highcharts');

var actions = require('redux/actions');

let page = require('../../../../config/page');
let comp = require('../../../../config/comp');
let tabaleData = require('../../../../config/table-data');

let Component = React.createClass({
    componentDidMount() {
        // console.log('high',ReactHighcharts);
        this.props.init(this.props.userInfo);
    },
    render() {
        let {itemHeaderActive, itemTreeAct, flag=true,userMessage,Verification}=this.props;
        return (

            <FixedContent mode="fullWidth" width={1920}>
                <div className={styles.bgbox} onClick={()=>Verification(userMessage)}>
                    <Header headerInfo={page.header}></Header>
                    {
                        flag && <Tree treeOpt={page.header[itemHeaderActive]} style={{overflow:'hidden'}}></Tree>
                    }
                    <Body tabOpt={page.header[itemHeaderActive]} tab={itemTreeAct}></Body>
                </div>
            </FixedContent>

        );
    }
});

const mapStateToProps = (state) => {
    return {
        itemHeaderActive: state.vars.headerItemActive,
        itemTreeAct: state.vars.treeItemActive,
        userInfo: state.vars.userInfo,
        flag: state.vars.putpage,
        userMessage:state.objs.userMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (userInfo)=> {
            // console.log(userInfo);
            if(!userInfo){
                browserHistory.push('/app/all/page/login')  ;
            }
            dispatch(actions.setVars('headerItemActive', 0));
            dispatch(actions.setVars('putpage', false));

        },
        Verification:(userMessage)=>{
            // console.log(userMessage.data.token) 
            // //获取登入时的时间
            // let length=userMessage.data.token.lastIndexOf('-')
            // let oldTime=userMessage.data.token.substring(length+1,userMessage.data.token.length)
            // //获取当前点击的时间
            // let newTime = (new Date()).getTime();
            // //获取时间间隔
            // let Time=(newTime-oldTime)/60000;
            // if(Time>0.5){
            //     alert('由于您长时间没有进行操作,请您重新登入！')
            //     browserHistory.push('/app/all/page/login');
            // }else{
            //     $.ajax({
            //     url:'http://10.9.0.4:9080/soam/token/verifyToken',
            //     data:'userid='+userMessage.data.id+'&token='+userMessage.data.token+'',
            //     type:'post',
            //     dataType:"json",
            //     timeout:3000,
            //     success:function(json,textStatus){  

            //       userMessage.data.token=json.data;
            //     },    
            //    error:function(XMLHttpRequest,textStatus,errorThrown){    
            //        alert('获取数据失败！');   
                   
            //    }   

            //     })

            // }
            
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
