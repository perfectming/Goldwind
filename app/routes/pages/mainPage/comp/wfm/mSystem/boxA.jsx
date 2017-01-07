import React from 'react';
import {connect} from 'react-redux';
import styles from './boxA.scss';
import jian from '../../../img/comp/jian_down.png';
import add from '../../../img/comp/add_down.png';
let type = require('../report/ywbb_date');
var $ =require('jquery');
var actions = require('redux/actions');
let url='54.223.200.134';
let Component = React.createClass({
    componentWillMount() {

        this.props.ajax();
    },
    componentDidMount() {
        this.props.init();
        let{playjq}=this.props;
        //初始化jquery方法
        setTimeout(function(){
            playjq();
        },1000)
    },

    render() {
        let {saveAll,closeboxA,boxRole} = this.props;
        //表格数据处理
            return (
                <div className={styles.faultBox} style={{top: 200, left:906}}>
                    <span>菜单选择</span>
                    <div className={styles.leftlist} id='box1'>
                        {
                            boxRole !== undefined && boxRole.data.map((valueC,keyC)=>{
                                return(
                                    <div key={keyC} className={styles.place}>
                                        <a className={styles.ca}>
                                            <img src={add}/>
                                            <b>{valueC.name}</b>
                                            <input type='checkbox' value='value'/>
                                        </a>
                                        {
                                            valueC.tlist.length>0 && valueC.tlist.map((valueD,keyD)=>{
                                                    return(
                                                            <div className={styles.placename} key={keyD}>
                                                                <a className={styles.da}>
                                                                    <img src={add} />
                                                                    <b>{valueD.name}</b>
                                                                    <input type='checkbox' value={valueD.thlist.length>0 ? 'value' : valueD.id}  />
                                                                </a>
                                                                {
                                                                    valueD.thlist.map((valueE,keyE)=>{
                                                                            return(
                                                                                <div className={styles.placeline} key={keyE}>
                                                                                    <a className={styles.ea} >
                                                                                        <b style={{cursor:'auto'}}>{valueE.name}</b>
                                                                                        <input type='checkbox' value={valueE.id}  />
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
        ajax:()=>{
            dispatch(actions.setVars('boolywbb', false));
            dispatch(actions.setObjs('tabledata',undefined));
            //获取设备类型信息
            $.ajax({
                url:'http://'+url+'/Monitor/xml.aspx',
                data:'functionname=GetDevTypeTree&crossDomain=true&zip=false&menuid=1DD28544-7805-4D86-8E39-09404726214A&sysid=1',
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"testCall",
                timeout:3000,
                success:function(json,textStatus){
                    dispatch(actions.appendObjs('devtype',json));
                    gettreedata();
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    alert('获取数据失败！');

                }
            });


            function gettreedata(){
                $.ajax({
                    url:'http://'+url+'/Monitor/xml.aspx',
                    data:'functionname=GetWFInfoByMonNoWfType&devtype=WindTurbine&crossDomain=true&zip=false',
                    dataType:"jsonp",
                    jsonp:"callback",
                    jsonpCallback:"testCall",
                    timeout:3000,
                    success:function(json,textStatus){
                        dispatch(actions.setVars('select_list',json));
                        dispatch(actions.setVars('boolywbb', true));
                    },
                    error:function(XMLHttpRequest,textStatus,errorThrown){
                        alert('获取数据失败！');
                    }
                });
            }





        },

        init: () => {
        },
        closeboxA:()=>{
            $("#box1").parent().css("display","none");
        },
        playjq:()=>{
            //复选框状态跟随
            $("#box1 input").change(function(){
                $(this).parent().siblings().find('input').prop('checked',$(this).prop('checked'))
            })
            //下拉点击事件
            $("#box1 b").on('click',function(){
                $(this).parent().siblings().toggle();
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
            })
        },
        saveAll: ()=> {
            let all=[];
            $('#box1 input').each(function(){
                if($(this).prop('checked')==true){
                    all.push($(this).val());
                }
            });
            dispatch(actions.setVars('roleIds', all));
            $("#box1").parent().css("display","none");
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
