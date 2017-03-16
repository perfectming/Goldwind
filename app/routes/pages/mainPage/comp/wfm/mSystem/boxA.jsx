import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('redux/store');
import _ from 'lodash';
import styles from './boxA.scss';
import jian from '../../../img/comp/jian_down.png';
import jia from '../../../img/comp/add_down.png';
var $ =require('jquery');
var actions = require('redux/actions');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {pullDown,follow,saveAll,closeboxA,boxRole} = this.props;
        //表格数据处理
            return (
                <div className={styles.faultBox} style={{top: 200, left:906}}>
                    <span>菜单选择</span>
                    <div className={styles.leftlist} id='box1'>
                        {
                            (boxRole && boxRole.data) && boxRole.data.map((valueC,keyC)=>{
                                return(
                                    <div key={keyC} className={styles.place}>
                                        <a className={styles.ca}>
                                            <img onClick={(e)=>pullDown(e.target)} src={jia}/>
                                            <b onClick={(e)=>pullDown(e.target)}>{valueC.name}</b>
                                            <input type='checkbox' value={valueC.id} title={valueC.rightstype}
                                                   onChange={(e)=>follow(e.target)}
                                                   name={valueC['ids']==false?'checkItInbox':'checkItOutbox'}/>
                                        </a>
                                        {
                                            valueC.tlist.length>0 && valueC.tlist.map((valueD,keyD)=>{
                                                    return(
                                                            <div className={styles.placename} key={keyD}>
                                                                <a className={styles.da}>
                                                                    <img onClick={(e)=>pullDown(e.target)} src={jia} />
                                                                    <b onClick={(e)=>pullDown(e.target)}>{valueD.name}</b>
                                                                    <input type='checkbox' value={valueD.id} title={valueD.rightstype}
                                                                           onChange={(e)=>follow(e.target)}
                                                                           name={valueD['ids']==false?'checkItInbox':'checkItOutbox'}/>
                                                                </a>
                                                                {
                                                                    valueD.thlist.map((valueE,keyE)=>{
                                                                            return(
                                                                                <div className={styles.placeline} key={keyE}>
                                                                                    <a className={styles.ea} >
                                                                                        <b onClick={(e)=>pullDown(e.target)} style={{cursor:'auto'}}>{valueE.name}</b>
                                                                                        <input type='checkbox' title={valueE.rightstype} value={valueE.id}
                                                                                               onChange={(e)=>follow(e.target)}
                                                                                               name={valueE['ids']==false?'checkItInbox':'checkItOutbox'}/>
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.btnbox}>
                        <a id='sent' onClick={()=>saveAll()}>确定</a>
                        <a  onClick={()=>closeboxA()}>取消</a>
                    </div>
                </div>
            );
    }
});


const mapStateToProps = (state) => {
    return {
        boxRole: state.objs.boxRole,
        boxRoleId: state.objs.boxRoleId,

        devtype:state.objs.devtype,
        boolywbb:state.vars.boolywbb,
        firstname:state.objs.firstname,
        select_list:state.vars.select_list,
        tabledata:state.vars.tabledata,
        chart:state.vars.chart,
        chartname:state.vars.chartname,
        chartTitle:state.vars.chartTitle,
        devurls:state.vars.devurls,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        follow:(key)=>{
            $(key).parent().siblings().find('input').prop('checked',$(key).prop('checked'))
        },
        pullDown:(key)=>{
            if($(key).parent().children('img').attr('src') ==jia){
                $(key).parent().children('img').attr('src', jian);
            }else{
                $(key).parent().children('img').attr('src', jia);
            }
            $(key).parent().siblings().toggle();
        },
        closeboxA:()=>{
            $("#box1").parent().css("display","none");
        },
        saveAll: ()=> {
            let typeIdTemp = _.clone(getState().vars.boxRoleId);
            let all=[];
            $('#box1 input').each(function(){
                if($(this).prop('checked')==true){
                    let temp={};
                    temp['menuid']=$(this).val();
                    temp['roleid']=typeIdTemp;
                    temp['rightstype']=$(this).attr('title');
                    all.push(temp);
                }
            });
            dispatch(actions.setVars('boxRoleArr', all));
            console.log(all);
            $("#aids").css("display","none");
            $("#box1").parent().css("display","none");
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
