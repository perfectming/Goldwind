import React from 'react';
import {connect} from 'react-redux';
var $ =require('jquery');
var actions = require('redux/actions');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
      let one=[];
      let two=[];
      let three=[];
      let alltree=[];
      let alltree1=[];
         let {asd,aaa} = this.props;
          for(let arg2 in aaa){
                if(aaa[arg2].id &&aaa[arg2].id!=''){
                    if(aaa[arg2].type=='wf'){
                      one.push(aaa[arg2])
                     }else if(aaa[arg2].type=='wl'){
                      two.push(aaa[arg2])
                     }else if(aaa[arg2].type=='wt'){
                        three.push(aaa[arg2])
                     }
                }
          }

          //二级菜单
        for(let i=0; i<one.length;i++){
          let two1=[];
          two.map((value,key)=>{
            if(value.parentid==one[i].id){
              two1.push(value)
            }

          })
          alltree.push(two1)
        }

          //三级菜单
        for(let i=0; i<two.length;i++){
          let two4=[];
          three.map((value,key)=>{
            if(value.parentid==two[i].id){
              two4.push(value)
            }

          })
          alltree1.push(two4)
        }

          console.log(one)
          console.log(alltree)
          console.log(alltree1)
        return (
            <div style={{color:'#fff'}}>
            45454545
              
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        asd:state.objs.asd,
        aaa:state.objs.aaa,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        play:()=>{
           
            dispatch(actions.appendObjs('asd',name[i]));
            i++;
       
        },
        init: () => {
          //获取设备类型信息
        $.ajax({    
               url:'http://54.223.200.134/Monitor/xml.aspx',    
               data:'functionname=getDevtree&crossDomain=true&zip=false',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){     
                    dispatch(actions.appendObjs('aaa',json)); 
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });

        }
     
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
