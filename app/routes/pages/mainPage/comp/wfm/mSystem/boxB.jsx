import React from 'react';
import {connect} from 'react-redux';
import styles from './boxB.scss';
import jian from '../../../img/comp/jian_down.png';
import add from '../../../img/comp/add_down.png';
import close from '../../../img/comp/close_down.png';
let $ =require('jquery');
var actions = require('redux/actions');
let soamMs=require('../../urlData').soam1;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {act,boxCenterId,wfBoxB,border1=true,closebox2,Tofaninfo1} = this.props;
        return (

            <div className={styles.fiexdbox}  style={{top: 30, left:-73}}>
                <span>设备选择</span>
                <div className={styles.listbox} id='box2'>
                    <ul id='fclist'>
                        {
                            wfBoxB && wfBoxB.data.map((value,key)=>{
                                return(
                                    <li key={key}>
                                        <a>{value.name}</a>
                                        <div className={styles.list_span}>
                                            {
                                                value.wfinfos.map((valueC,keyC)=>{
                                                    return(
                                                        <div className={act==keyC?styles.listitem1:styles.listitem} key={keyC} onClick = {()=> Tofaninfo1(valueC.id,boxCenterId,keyC)}>
                                                            {valueC.name}
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
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        border1: state.vars.bordershow1,
        wfBoxB: state.objs.wfBoxB,
        boxCenterId: state.objs.boxCenterId,
        act:state.vars.actBoxB,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            $("#center3 input[name='checkItOut']").prop('checked',true);
            $("#center3 input[name='checkItIn']").prop('checked',false);
            $.ajax({
                url: soamMs+'/roleright/getGroupInfoList',
                type: 'post',
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('wfBoxB', data));
                    $('#box2 ul li a').on('click',function(){
                        var bg=$(this).css("background-image");
                        if(bg=='url("'+add+'")'){
                            $(this).css("background-image",'url('+jian+')');
                        }else{
                            $(this).css("background-image",'url('+add+')');
                        }

                        $(this).siblings('div').toggle();
                    })
                    //获取选中风机的信息
                    $("#sentB").on('click',function(){
                        let objB = document.getElementsByName("checknameB");
                        var check_valB = [];
                        for(let k in objB){
                            if(objB[k].checked)
                                check_valB.push(objB[k].value);
                        }
                        alert(check_valB);
                    })
                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
            $("#center3 input[name='checkItOut']").prop('checked',true);
            $("#center3 input[name='checkItIn']").prop('checked',false);
        },
        closebox2:()=>{
            $("#box2").parent().css("display","none");
        },
        Tofaninfo1: (id,name,i)=> {
            dispatch(actions.setVars('actBoxB', i));
            $("#center3 input[name='checkItOut']").prop('checked',true);
            $("#center3 input[name='checkItIn']").prop('checked',false);
            $.ajax({
                url: soamMs+'/roleright/getByWfidRolerRightMapList',
                type: 'post',
                data:{wfid:id,roleid:name},
                dataType: 'json',//here,
                success:function (data) {
                    dispatch(actions.setObjs('boxCenter', data));
                    $("#center3 input[name='checkItOut']").prop('checked',true);
                    $("#center3 input[name='checkItIn']").prop('checked',false);

                },
                error:function(){
                    console.log('获取数据失败')
                }
            });
        },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
