import React from 'react';
import {connect} from 'react-redux';
import styles from './box.scss';
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
        let {closebox} = this.props;
        return (

            <div className={styles.fiexdbox}>
                <img src={close} className={styles.close} onClick={()=>closebox()}/>
                <div className={styles.listbox} id='list1'>
                    <ul id='fclist1'>
                        {
                            arr1.map((value,key)=>{
                                return(
                                    <li key={key} >
                                        <a>{model_ens[value].name}</a>
                                        <div className={styles.list_span}>
                                            {
                                                obj_wfd[value].map((valueC,key)=>{
                                                    return(
                                                        <span key={key}>{valueC.Wtname}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    /*<ul className={styles.show} id='gflist1'>
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
                    </ul>*/
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
            $('#list1 ul li a').on('click',function(){
                var bg=$(this).css("background-image");
                if(bg=='url("'+add+'")'){
                    $(this).css("background-image",'url('+jian+')');
                }else{
                    $(this).css("background-image",'url('+add+')');
                }
                $(this).siblings('div').toggle();
            })

        },
        closebox:()=>{},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
