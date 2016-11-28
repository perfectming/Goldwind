import React from 'react';
import {connect} from 'react-redux';
import styles from './tootipbox.scss';
import jian from '../../img/comp/jian_icon.png';
import add from '../../img/comp/add_icon.png';
import close from '../../img/comp/close_icon.png';
let $ =require('jquery');
var actions = require('redux/actions');
let matrixdata = require('../../../../../../config/MatrixData');
let model = require('../../../../../../config/Model');
let modeldata = require('../../../../../../config/ModelData');

let data=modeldata.ModelData;
let mod=model.Model;
let mat=model.Model;
let matD=matrixdata.ModelData;
let model_data = modeldata.ModelData;
var model_ens = model.Model.ens;
let arr1 = [];
let arr2 = [];
var obj = matrixdata;
var obj_wfd = obj.ModelData[8888801].WFDevsStatus;
var obj_pvd = obj.ModelData[8888802].PVDevsStatus;


(function(){
    for(var x in obj_wfd){
        arr1.push(x)
    }
     for(var m in obj_pvd){
        arr2.push(m)
        
    }

}());



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {border=true,changeborder,changeborder1,retlegend,closebox,Tofaninfo} = this.props;
        return (
           
                    <div className={styles.fiexdbox}>
                        <img src={close} className={styles.close} onClick={()=>closebox()}/>
                       <div className={styles.inputbox}>
                       
                            <span className={styles.search}></span><input type='text' placeholder="查询" /><a></a>
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
                       </div>
                    </div>   
        );
    }
});


const mapStateToProps = (state) => {
    return {
        border: state.vars.bordershow,
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
            })
             $('#gfc').on('click',function(){
                $(this).css('border','1px solid #51a0bf');
                $(this).css('border-bottom','1px solid #0a1b2d');
                $("#fc").css('border','none');
                $("#gflist").show();
                $("#fclist").hide();
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
        }
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
