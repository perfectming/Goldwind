import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('redux/store');
import _ from 'lodash';
import styles from './boxA.scss';
import jian from '../../../img/comp/jian_down.png';
import add from '../../../img/comp/add_down.png';
let type = require('../report/ywbb_date');
var $ =require('jquery');
var actions = require('redux/actions');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {saveAll,closeboxA,boxRole} = this.props;
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
                                            <img src={add}/>
                                            <b>{valueC.name}</b>
                                            <input type='checkbox' value={valueC.id} title={valueC.rightstype}
                                                   name={valueC['ids']==false?'checkItInbox':'checkItOutbox'}/>
                                        </a>
                                        {
                                            valueC.tlist.length>0 && valueC.tlist.map((valueD,keyD)=>{
                                                    return(
                                                            <div className={styles.placename} key={keyD}>
                                                                <a className={styles.da}>
                                                                    <img src={add} />
                                                                    <b>{valueD.name}</b>
                                                                    <input type='checkbox' value={valueD.id} title={valueD.rightstype}
                                                                           name={valueD['ids']==false?'checkItInbox':'checkItOutbox'}/>
                                                                </a>
                                                                {
                                                                    valueD.thlist.map((valueE,keyE)=>{
                                                                            return(
                                                                                <div className={styles.placeline} key={keyE}>
                                                                                    <a className={styles.ea} >
                                                                                        <b style={{cursor:'auto'}}>{valueE.name}</b>
                                                                                        <input type='checkbox' title={valueE.rightstype} value={valueE.id}
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
            //下拉点击事件
            $("#box1 b").on('click',function(){
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
                $(this).parent().siblings().toggle();
            });
            //复选框状态跟随
            $("#box1 input").change(function(){
                $(this).parent().siblings().find('input').prop('checked',$(this).prop('checked'))
            })
        },
        closeboxA:()=>{
            $("#box1").parent().css("display","none");
        },
        playjq:()=>{
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
