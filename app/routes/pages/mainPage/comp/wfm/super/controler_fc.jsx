import React from 'react';
import {connect} from 'react-redux';
import styles from './controler_fc.scss';
import jian from '../../../img/comp/jian_icon.png';
import add from '../../../img/comp/add_icon.png';
import close from '../../../img/comp/close_icon.png';
let $ =require('jquery');
var actions = require('redux/actions');



let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {border1=true,retlegend,closebox1,Tofaninfo1,legend1,name,ens,wfd,ptitle} = this.props;
        return (
           
                    <div className={styles.fiexdbox}>
                        <img src={close} className={styles.close} onClick={()=>closebox1()}/>
                        <p className={styles.fctitle}>{ptitle}</p>
                       <div className={styles.listbox} id='list'>
                            <ul id='fclist'>
                                {  
                                    name.map((value,key)=>{
                                        return(
                                            <li key={key} >
                                                <a>{ens[value].name}</a>
                                                <div className={styles.list_span}>
                                                {
                                                    wfd[value].map((valueC,key)=>{

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
                            <a id='sent'>启动</a>
                            <a>停机</a>
                            <a>复位</a>
                            <a>测试</a>
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
            $('#list ul li a').on('click',function(){
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
        closebox1:()=>{
            dispatch(actions.setVars('legend1', false));
            dispatch(actions.setVars('legend2', false));
        },
        Tofaninfo1: (value)=> {

        
 
        },
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
