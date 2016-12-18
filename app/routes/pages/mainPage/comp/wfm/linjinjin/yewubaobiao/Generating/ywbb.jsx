import React from 'react';
import {connect} from 'react-redux';
import styles from './ywbb.scss';
import jian from '../../../../../img/comp/jian_icon.png';
import add from '../../../../../img/comp/add_icon.png';
import drop from '../../../../../img/comp/drop2.gif';
import Column from './colum.jsx';
import Login from '../../../../../../../../components/common/Loading.jsx';
let type = require('./ywbb_date');
let btype = type.comps.from;
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
        },100)
    },
   showTree (b){
    let{playjq,showtree,firstname,devtype}=this.props;
     for(let arg1 in devtype.list){
        if(devtype.list[arg1].id==b){
            firstname=devtype.list[arg1]
        }
    }
    showtree(firstname);
   
    //初始化jquery方法
        setTimeout(function(){
            playjq();
        },100)
   },

    render() {
         let {devtype,boolywbb=false,showtree,playjq,firstname} = this.props;
           
            if(boolywbb){
                let treetype=[];
            for(let arg in devtype.list){
                if(devtype.list[arg].args.name){
                    treetype.push(devtype.list[arg])
                }
            }
            if(firstname==undefined){
            firstname=devtype.list._WindTurbine;
            }
            console.log(devtype)


        return (
            <div className={styles.faultBox}>
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
                    
                </div>


                <div className={styles.leftlist}></div>
                <div className={styles.righttable}></div>

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
        devtype:state.objs.devtype,
        boolywbb:state.vars.boolywbb,
        firstname:state.vars.firstname,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax:()=>{
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
                   dispatch(actions.setVars('boolywbb', true));  
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });

        },
        
        init: () => {
       

        },
        playjq:()=>{
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
        },
        showtree:(firstname)=>{
            dispatch(actions.setVars('boolywbb', false));

            //获取对应设备的数据
        $.ajax({    
               url:'http://'+url+'/Monitor/xml.aspx',    
               data:'functionname=GetWFInfoByMon&devtype=WindTurbine&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){    
                console.log(json)
                dispatch(actions.setVars('boolywbb', true));
                dispatch(actions.setVars('firstname', firstname));
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });



        },
       
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
