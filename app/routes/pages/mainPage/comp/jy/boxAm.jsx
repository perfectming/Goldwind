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
var obj = matrixdata.ammData.content;
obj.map((value,key)=>{
    arr1.push(value[0])
});
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {border1=true,closeboxAm,Tofaninfo1} = this.props;
        return (

            <div className={styles.fiexdbox} style={{top: 294, left:672}}>
                <span>角色名称</span>
                <img src={close} className={styles.close} onClick={()=>closeboxAm()}/>
                <div className={styles.listbox} id='boxAm'>
                    <ul id='fclist'>
                        <li>
                            <a>所有</a>
                            <div className={styles.list_span}>
                                {
                                    arr1.map((valueC,key)=>{

                                        return(
                                            <div className={styles.listitem} key={key} onClick = {()=> Tofaninfo1(valueC)}>
                                                <input type='checkbox' name='checkname' value={valueC} />
                                                {valueC}
                                            </div>

                                        )
                                    })

                                }
                                        </div>
                                    </li>
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
            $('#boxAm ul li a').on('click',function(){
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
                alert('选中角色'+check_val);
            })
        },
        closeboxAm:()=>{
            $("#boxAm").parent().css("display","none");
        },
        Tofaninfo1: (value)=> {



        },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
