import React from 'react';
import {connect} from 'react-redux';
var $ =require('jquery');
var actions = require('redux/actions');
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
         let {} = this.props;
        return (
            <div>
            ghjgthghjghjghjghjghj
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        asd:state.objs.asd,
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
               data:'functionname=GetDevTypeTree&crossDomain=true&zip=false&menuid=1DD28544-7805-4D86-8E39-09404726214A&sysid=1',    
               dataType:"jsonp",    
               jsonp:"callback",    
               jsonpCallback:"testCall",    
               timeout:3000,       
               success:function(json,textStatus){    
                   console.log(json)   
               },    
               error:function(XMLHttpRequest,textStatus,errorThrown){    
                   console.log('获取数据失败！');    
               }    
            });

        }
     
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
