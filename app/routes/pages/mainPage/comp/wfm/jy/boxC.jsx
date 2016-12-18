import React from 'react';
import {connect} from 'react-redux';
import styles from './box.scss';
import jian from '../../../img/comp/jian_down.png';
import add from '../../../img/comp/add_down.png';
import close from '../../../img/comp/close_down.png';
let $ =require('jquery');
var actions = require('redux/actions');
let matrixdata = require('../../../../../../../config/MatrixData');
let model = require('../../../../../../../config/Model');
let modeldata = require('../../../../../../../config/ModelData');
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
    arr1.splice(1,arr1.length-1);
    for(var m in obj_pvd){
        arr2.push(m)

    }

}());



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {border1=true,closebox3,Tofaninfo1} = this.props;
        return (

            <div className={styles.fiexdbox} style={{top: 294, left:672}}>
                <span>设置功率预测权限</span>
                <img src={close} className={styles.close} onClick={()=>closebox3()}/>
                <div className={styles.listbox} id='box3'>
                    <ul id='fclist'>
                        {
                            arr1.map((value,key)=>{
                                return(
                                    <li key={key} >
                                        <a>所有</a>
                                        <div className={styles.list_span}>
                                            {
                                                obj_wfd[value].map((valueC,key)=>{

                                                    return(


                                                        <div className={styles.listitem} key={key} onClick = {()=> Tofaninfo1(valueC,value)}>
                                                            <input type='checkbox' name='checknameC' value={valueC.Wtname} />
                                                            {valueC.Wtname}
                                                        </div>

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
                <div className={styles.btnbox}>
                    <a id='sentC'>确定</a>
                    <a onClick={()=>closebox3()}>取消</a>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        border1: state.vars.bordershow1,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            $('#box3 ul li a').on('click',function(){
                var bg=$(this).css("background-image");
                if(bg=='url("'+add+'")'){
                    $(this).css("background-image",'url('+jian+')');
                }else{
                    $(this).css("background-image",'url('+add+')');
                }

                $(this).siblings('div').toggle();
            })
            //获取选中风机的信息
            $("#sentC").on('click',function(){
                var obj = document.getElementsByName("checknameC");
                var check_val = [];
                for(var k in obj){
                    if(obj[k].checked)
                        check_val.push(obj[k].value);
                }
                alert(check_val);
            })


        },
        closebox3:()=>{
            $("#box3").parent().css("display","none");
        },
        Tofaninfo1: (value)=> {



        },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
