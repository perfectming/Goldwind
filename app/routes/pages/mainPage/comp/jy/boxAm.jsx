import React from 'react';
import {connect} from 'react-redux';
import styles from './box.scss';
import jian from '../../img/comp/jian_icon.png';
import add from '../../img/comp/add_icon.png';
import close from '../../img/comp/close_icon.png';
let $ =require('jquery');
var actions = require('redux/actions');
let matrixdata = require('../xym/data');

let arr1 = [];
var obj = matrixdata.ammData;
var obj_wfd = obj.ModelData[8888801].WFDevsStatus;

(function(){
    for(var x in obj_wfd){
        arr1.push(x)
    }
    arr1.splice(1,arr1.length-1);

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
                <div className={styles.listbox} id='box3'>
                    <ul id='fclist'>
                        {
                            arr1.map((value,key)=>{
                                return(
                                    <li key={key} >
                                        <div className={styles.list_span}>
                                            {
                                                obj_wfd[value].map((valueC,key)=>{

                                                    return(
                                                        <div className={styles.listitem} key={key} onClick = {()=> Tofaninfo1(valueC,value)}>
                                                            <input type='checkbox' name='checkname' value={valueC.Wtname} />
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
                    <a id='sent'>确定</a>
                    <a>取消</a>
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
            $("#sent").on('click',function(){
                var obj = document.getElementsByName("checkname");
                var check_val = [];
                for(var k in obj){
                    if(obj[k].checked)
                        check_val.push(obj[k].value);
                }
                alert('您发送的风机为'+check_val);
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
