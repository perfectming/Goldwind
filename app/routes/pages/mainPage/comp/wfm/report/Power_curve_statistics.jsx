import React from 'react';
import {connect} from 'react-redux';
import styles from './ywbb.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import drop from '../../../img/comp/drop2.gif';
import Column from './colum.jsx';
import Login from '../../../../../../components/common/Loading.jsx';
let type = require('./ywbb_date');
let btype = type.comps.from;
var $ =require('jquery');
var actions = require('redux/actions');
var {browserHistory} = require('react-router');
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
    showTree (devurl){
        let{playjq,showtree,select_list,firstname,devtype}=this.props;

        //点击切换下拉选择项
        for(let id in devtype.list){
            if(devtype.list[id].id==devurl){
                firstname=devtype.list[id];
            }

        }



        showtree(devurl,firstname);
        //初始化jquery方法
        setTimeout(function(){
            playjq();
        },1000)
    },

    render() {
        let {skinStyle,devtype,boolywbb=false,showtree,playjq,firstname,select_list,Powdata,clickitem,chart,chartname,chartTitle,devurls='WindTurbine',searchnum} = this.props;
        let treetype=[];
        let Tarr=[]; //标题数组
        let Barr=[];  //数据
        let Carr=[];   //chart数据
        let Darr=[];  //统计数组
        let one=[]; //一级菜单
        let two=[]; //二级菜单
        let three=[]; //三级菜单

        let arr3=[]; //风速3
        let arr4=[]; //风速
        let arr5=[]; //风速
        let arr6=[]; //风速
        let arr7=[]; //风速
        let arr8=[]; //风速
        let arr9=[]; //风速
        let arr10=[]; //风速
        let arr11=[]; //风速
        let arr12=[]; //风速
        let arr13=[]; //风速
        let arr14=[]; //风速
        let arr15=[]; //风速
        let arr16=[]; //风速
        let arr17=[]; //风速
        let arr18=[]; //风速
        let arr19=[]; //风速
        let arr20=[]; //风速
        let arr21=[]; //风速
        let arr22=[]; //风速
        let wfName=[]; //电场名称
        let name=[]; //名称
        let conform=[]; //符合度
        let point=[]; //数据点数
        let valid=[]; //是否有效
        //获取设备类型对应的左侧树形二级和三级数据
        for(let arg2 in select_list){
            if(select_list[arg2].id &&select_list[arg2].id!=''){
                if(select_list[arg2].type=='wf'){
                    one.push(select_list[arg2])
                }else if(select_list[arg2].type=='wl' || select_list[arg2].parentid.length==6){

                    two.push(select_list[arg2])
                }else if(select_list[arg2].type=='wt' && select_list[arg2].parentid.length>6){

                    three.push(select_list[arg2])
                }
            }
        }
        //表格数据处理
        if(Powdata!==undefined && Powdata.wfname!==undefined){
            // arr3=Powdata.3.Values.split(',');
            // arr4=Powdata.4.Values.split(',');
            // arr5=Powdata.5.Values.split(','); 
            // arr6=Powdata.6.Values.split(','); 
            // arr7=Powdata.7.Values.split(','); 
            // arr8=Powdata.8.Values.split(','); 
            // arr9=Powdata.9.Values.split(','); 
            // arr10=Powdata.10.Values.split(','); 
            // arr11=Powdata.11.Values.split(','); 
            // arr12=Powdata.12.Values.split(','); 
            // arr13=Powdata.13.Values.split(','); 
            // arr14=Powdata.14.Values.split(','); 
            // arr15=Powdata.15.Values.split(','); 
            // arr16=Powdata.16.Values.split(','); 
            // arr17=Powdata.17.Values.split(','); 
            // arr18=Powdata.18.Values.split(','); 
            // arr19=Powdata.19.Values.split(','); 
            // arr20=Powdata.20.Values.split(','); 
            // arr21=Powdata.21.Values.split(','); 
            // arr22=Powdata.22.Values.split(','); 
            // wfName=Powdata.wfname.Values.split(','); 
            // name=Powdata.wtname.Values.split(','); 
            // conform=Powdata.fit.Values.split(','); 
            // point=Powdata.datacount.Values.split(','); 
            // valid=Powdata.iseffective.Values.split(','); 
        }

        if(boolywbb){
            //获取设备类型数组
            for(let arg in devtype.list){
                if(devtype.list[arg].args.name){
                    treetype.push(devtype.list[arg])
                }
            }

            //初始化显示设备类型
            if(firstname==undefined){
                firstname=devtype.list._WindTurbine;
            }

            return (
                <div className={skinStyle==1? styles.faultBoxBlue:skinStyle==2? styles.faultBoxWhite:styles.faultBox}>
                    <div className={styles.search_tit}>
                        <div className={styles.seleBox}>
                            <span>设备类型:</span>
                            <div className={styles.select}>
                                <span id='showitem'><img src={'http://'+url+'/'+firstname.img}/>{firstname.args.name}</span>
                                <img src={drop} id='slide' className={styles.topimg}/>
                                <div className={styles.selectye} id='selectye'>
                                    {
                                        treetype.map((value, key)=> {

                                            return (
                                                <div className={styles.item} key={key} onClick={()=>{this.showTree(value.id)}}><img src={'http://'+url+'/'+value.img}/>{value.args.name}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.seleBox}>
                            <div className={styles.dateBox}>
                                <span>发生时间</span><input id="startTime"   type='date'/>
                                <span>结束时间</span><input id="endTime"   type='date'/>
                            </div>
                        </div>

                        <div className={styles.btnBox}>
                            <button id='searchall' onClick={()=>searchnum(devurls)}><img src={'http://'+url+'/images/button/search.gif'}/>查询</button>
                        </div>
                        <div className={styles.btnBox}>
                            <button><img src={'http://'+url+'/images/button/set.gif'}/>设置参数</button>
                        </div>
                        <div className={styles.btnBox}>
                            <button><img src={'http://'+url+'/images/button/outbox.gif'}/>导出Excel</button>
                        </div>

                    </div>
                    <div className={styles.leftlist} id='leftlist'>
                        {
                            select_list !== undefined && one.map((valueC,keyC)=>{
                                return(
                                    <div key={keyC} className={styles.place} >
                                        <a className={styles.ca}>
                                            <img src={add} />
                                            <b><img src={'http://'+url+'/'+valueC.img}/>{valueC.text}</b>
                                            <input type='checkbox' value='value'   />
                                        </a>
                                        {
                                            two.length>0 ?
                                                two.map((valueD,keyD)=>{


                                                    if(valueD.parentid==valueC.id){
                                                        return(
                                                            <div className={styles.placename} key={keyD}>
                                                                <a className={styles.da}>
                                                                    <img src={add} />
                                                                    <b><img src={'http://'+url+'/'+valueD.img}/>{valueD.text}</b>
                                                                    <input type='checkbox' value={valueD.children ? 'value' : valueD.id}  />
                                                                </a>
                                                                {

                                                                    three.map((valueE,keyE)=>{
                                                                        if(valueE.parentid==valueD.id && valueE.args.wfid==valueC.id){
                                                                            return(
                                                                                <div className={styles.placeline} key={keyE}>
                                                                                    <a className={styles.ea} >
                                                                                        <b style={{cursor:'auto'}}><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                                                        <input type='checkbox' value={valueE.id}  />
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })

                                                                }


                                                            </div>
                                                        )
                                                    }
                                                }) : three.map((valueE,keyE)=>{
                                                if(valueE.args.wfid==valueC.id){
                                                    return(
                                                        <div className={styles.placename} key={keyE}>
                                                            <a className={styles.da} >
                                                                <b style={{cursor:'auto'}}><img src={'http://'+url+'/'+valueE.img}/>{valueE.text}</b>
                                                                <input type='checkbox' value={valueE.id}  />
                                                            </a>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.righttable}>
                        <div className={styles.tablebox} id='tablebox'>
                            {Powdata!==undefined &&
                                <table>
                                    <tbody>
                                        <tr className={styles.thState}><th>序号</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>电场名称</th><th>名称</th><th>符合度（%）</th><th>数据点数（月）</th><th>是否有效</th></tr>
                                        {
                                            arr3.map((value,key)=>{
                                                return(
                                                    <tr key={key} className={styles.thState}><th>{key+1}</th><th>{arr3[key]}</th><th>{arr4[key]}</th><th>{arr5[key]}</th><th>{arr6[key]}</th><th>{arr7[key]}</th><th>{arr8[key]}</th><th>{arr9[key]}</th><th>{arr10[key]}</th><th>{arr11[key]}</th><th>{arr12[key]}</th><th>{arr13[key]}</th><th>{arr14[key]}</th><th>{arr15[key]}</th><th>{arr16[key]}</th><th>{arr17[key]}</th><th>{arr18[key]}</th><th>{arr19[key]}</th><th>{arr20[key]}</th><th>{arr21[key]}</th><th>{arr22[key]}</th><th>{wfName[key]}</th><th>{name[key]}</th><th>{conform[key]}</th><th>{point[key]}</th><th>{valid[key]}</th></tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                        </div>

                        <div className={styles.columnbox} id='colum'>
                            { chart !==undefined && <Column cnum={chart} cname={chartname} ctit={chartTitle} ></Column> }
                        </div>
                    </div>

                </div>
            );
        }else{
            return(
                <Login></Login>
            )
        }
    }
});


const mapStateToProps = (state) => {
    return {
        skinStyle: state.vars.skinStyle, //全局换肤
        devtype:state.objs.devtype,
        boolywbb:state.vars.boolywbb,
        firstname:state.objs.firstname,
        select_list:state.vars.select_list,
        Powdata:state.vars.Powdata,
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
            dispatch(actions.setObjs('Powdata',undefined));
            //获取设备类型信息
            $.ajax({
                url:'http://'+url+'/Monitor/xml.aspx',
                data:'functionname=GetDevTypeTree&crossDomain=true&zip=false&menuid=1DD28544-7805-4D86-8E39-09404726214A&sysid=1',
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"testCall",
                timeout:5000,
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
                    timeout:5000,
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
        playjq:()=>{

            //初始化日期
            var date = new Date();
            if(date.getMonth()==0&&date.getDate()==1){
                var dateString = date.getFullYear()+"-01"+"-01";
                var dateString1 = (date.getFullYear()-1)+"-12"+"-31";
            }else{
                if(date.getMonth()<9){
                    if(date.getDate()<10){
                        var dateString = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
                    }else{
                        var dateString = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
                    }
                }else{
                    if(date.getDate()<10){
                        var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
                    }else{
                        var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                    }
                }
                if(date.getMonth()<9){
                    if(date.getDate()<11){
                        var dateString1 = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()-1);
                    }else{
                        var dateString1 = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+(date.getDate()-1);
                    }
                }else{
                    if(date.getDate()<11){
                        var dateString1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+(date.getDate()-1);
                    }else{
                        var dateString1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1);
                    }
                }
            }
            //获取今天与昨天的日期
            $('#startTime').val(dateString1);
            $('#endTime').val(dateString)
            //显示下拉菜单
            $('#slide').on('click',function(){
                $('#selectye').show();
            })
            //鼠标移出隐藏下拉菜单
            $('#selectye').mouseleave(function(){
                $(this).hide()
            })
            //选择显示设备类型并隐藏下拉菜单
            $('#selectye>div').on('click',function(){
                $('#showitem').html($(this).html());
                $('#selectye').hide();
            })



            //复选框状态跟随
            $("#leftlist input").change(function(){
                $(this).parent().siblings().find('input').prop('checked',$(this).prop('checked'))
            })
            //下拉点击事件
            $("#leftlist b").on('click',function(){
                $(this).parent().siblings().toggle();
                if($(this).siblings('img').attr('src') == add){
                    $(this).siblings('img').attr('src', jian);
                }else{
                    $(this).siblings('img').attr('src', add);
                }
            })


            //查询按钮功能
            $('#searchall').on('click',function(){
                $('#tabtit span').css('background','none');
                $('#tablist td').css('background','none');
                 //显示表格
                $('#tablebox').show();
            })




        },
        showtree:(devurl,firstname)=>{
            dispatch(actions.setVars('boolywbb', false));
            dispatch(actions.appendObjs('firstname',firstname));
            //获取对应设备的数据
            $.ajax({
                url:'http://'+url+'/Monitor/xml.aspx',
                data:'functionname=GetWFInfoByMonNoWfType&devtype='+devurl+'&crossDomain=true&zip=false',
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"testCall",
                timeout:5000,
                success:function(json,textStatus){
                    dispatch(actions.setVars('select_list',json));
                    dispatch(actions.setVars('devurls',devurl));
                    dispatch(actions.setVars('boolywbb', true));
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    alert('获取数据失败！');
                }
            });



        },

        clickitem:(kk,even)=>{
            let knum=[];
            let Tname=[];
            $('#'+even.id).css('background','#369').siblings().css('background','none')
            $('#tabody tr').each(function(){
                $(this).children('td').eq(kk).css('background','#369').siblings().css('background','none');
                knum.push(Number($(this).children('td').eq(kk).text()))
                Tname.push($(this).children('td').eq(1).text())
            })
            dispatch(actions.setVars('chart', knum));
            dispatch(actions.setVars('chartname', Tname));
            dispatch(actions.setVars('chartTitle', even.innerHTML));
            $('#colum').show();
        },
        searchnum:(devurls)=>{
            dispatch(actions.setVars('Powdata',undefined));
            var all=[];
            //清空数组
            all.splice(0,all.length);//字段

            //获取查询时间
            var startTime=$('#startTime').val();
            var endTime=$('#endTime').val();
            $('#leftlist input').each(function(){
                if($(this).prop('checked')==true){
                    if($(this).val()!=='value'){
                        all.push($(this).val())
                    }
                }

            });
            if(all.length>50){
                all.splice(50,all.length);
            }
            if(all.length==0){
                alert('设备数据获取失败！')
                return;
            }
            $.ajax({
                url:'http://'+url+'/Monitor/xml.aspx',
                data:'functionname=GetPowcurveStdAnalysis&wtid='+all+'&starttime='+startTime+'&endtime='+endTime+'&BTZ=480&Zip=false',
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"testCall",
                timeout:5000,
                success:function(json,textStatus){
                    console.log(json)
                    dispatch(actions.setVars('Powdata',json));
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    alert('获取数据失败！');
                }
            });
        }




    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
