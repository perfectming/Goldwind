import React from 'react';
import {connect} from 'react-redux';
import styles from './tootipbox.scss';
import jian from '../../img/comp/jian_icon.png';
import add from '../../img/comp/add_icon.png';
import close from '../../img/comp/close_icon.png';
let $ =require('jquery');
var actions = require('redux/actions');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {border=true,changeborder,changeborder1,retlegend,closebox,Tofaninfo,changtext,zhzb,bbs,fData} = this.props;
let mod=zhzb.Model;
let mat=zhzb.Model;
let model_data = bbs.ModelData;
var model_ens = zhzb.Model.ens;
let arr1 = [];
let arr2 = [];
var obj_wfd = fData.ModelData[8888801].WFDevsStatus;
var obj_pvd = fData.ModelData[8888802].PVDevsStatus;


(function(){
    for(var x in obj_wfd){
        arr1.push(x)
    }
     for(var m in obj_pvd){
        arr2.push(m)
        
    }
}());








        return (
           
                    <div className={styles.fiexdbox}>
                        <img src={close} className={styles.close} onClick={()=>closebox()}/>
                       <div className={styles.inputbox}>
                       
                            <span className={styles.search}></span><input type='text' placeholder="查询" id='seachtext'  /><a></a>
                            <div className={`${styles.line_title} ${styles.add_border}`} id='fc' >风场</div>
                            <div className={styles.line_title} id='gfc' >光伏场</div>
                       </div>
                       <div className={styles.listbox} id='list'>
                            <ul id='fclist'>
                                {  
                                    arr1.map((value,key)=>{
                                        return(
                                            <li key={key} >
                                                <a>{model_ens[value].name}</a>
                                                <div className={styles.list_span}>
                                                {
                                                    obj_wfd[value].map((valueC,key)=>{

                                                        return(

                                                            <span key={key} onClick = {()=> Tofaninfo(valueC,value)}>{valueC.Wtname}</span>

                                                            )
                                                    })

                                                }

                                                </div>
                                            </li>
                                        
                                        )
                                    })
                                }

                            </ul>
                            <ul className={styles.show} id='gflist'>
                                { 
                                    arr2.map((value,key)=>{
                                        return(
                                            <li key={key}>
                                                <a>{model_ens[value].name}</a>
                                                <div className={styles.list_span}>
                                                    {
                                                    obj_pvd[value].map((valueC,key)=>{
                                                        return(

                                                            <span key={key} onClick = {()=> Tofaninfo(valueC,value)}>{valueC.Wtname}</span>

                                                            )
                                                    })

                                                }
                                                </div>
                                            </li>
                                        
                                        )
                                    })

                                }  
                            </ul>
                            <div className={styles.search_anser} id='searcg_anser'>
                                {  
                                    arr1.map((value,key)=>{
                                        return(
                                            obj_wfd[value].map((valueC,key)=>{
                                                return(
                                                    <span key={key} onClick = {()=> Tofaninfo(valueC,value)}>{valueC.Wtname+'      (  '+model_ens[value].name+'  )'}</span>
                                                )
                                            })
                                        )
                                    })
                                },
                                {
                                    arr2.map((value,key)=>{
                                        return(   
                                            obj_pvd[value].map((valueC,key)=>{
                                                return(
                                                    <span key={key} onClick = {()=> Tofaninfo(valueC,value)}>{valueC.Wtname}</span>
                                                )
                                            })

                                        )
                                    })
                                }
                            </div>
                       </div>
                    </div>   
        );
    }
});


const mapStateToProps = (state) => {
    return {
        border: state.vars.bordershow,
        zhzb: state.vars.zhzb,
        bbs: state.vars.bbs,
        fData: state.vars.fData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            $('#fc').on('click',function(){
                $(this).css('border','1px solid #51a0bf');
                $(this).css('border-bottom','1px solid #0a1b2d');
                $("#gfc").css('border','none');
                $('#fclist').show();
                $("#gflist").hide();
                $("#searcg_anser").hide();
            })
             $('#gfc').on('click',function(){
                $(this).css('border','1px solid #51a0bf');
                $(this).css('border-bottom','1px solid #0a1b2d');
                $("#fc").css('border','none');
                $("#gflist").show();
                $("#fclist").hide();
                $("#searcg_anser").hide();
            })
            $('#list ul li a').on('click',function(){
                var bg=$(this).css("background-image");
                if(bg=='url("'+add+'")'){
                    $(this).css("background-image",'url('+jian+')');
                }else{
                    $(this).css("background-image",'url('+add+')');
                }
                
                $(this).siblings('div').toggle();
            })
            $("#seachtext").keyup(function(){
                console.log(1);
                $('#searcg_anser').show();
                $('#searcg_anser span').hide();
                $("#fclist").hide();
                $("#gflist").hide();
                $("#searcg_anser span").each(function(){
                    var reg = new RegExp($("#seachtext").val(), 'i');
                       if($(this).text().match(reg)){
                          $(this).show();
                     }
                });
             
              
                
            })

               
        },
        changeborder:(border)=>{
            border=true
            dispatch(actions.setVars('bordershow', border));
        },
        changeborder1:(border)=>{
            border=false
            dispatch(actions.setVars('bordershow', border));
        },
        closebox:()=>{
            dispatch(actions.setVars('legend', false));
        },
        Tofaninfo: (value,valuepage)=> {
            dispatch(actions.setVars('value', value));
            dispatch(actions.setVars('valueid', valuepage));
            dispatch(actions.setVars('fan_page', 'faninfo'));
            dispatch(actions.setVars('showPage', 'fan_matrix'));
            dispatch(actions.setVars('legend', false));
            dispatch(actions.setVars('headerItemActive', 1));
        },
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
