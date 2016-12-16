import React from 'react';
import {connect} from 'react-redux';
var $ =require('jquery');
var actions = require('redux/actions');
let name=[[1,2],[3,4],[5,6,7],[4,0],[5,2]];
let i=0;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
         let {asd,play} = this.props;
        return (
            <div style={{color:'#fff'}} onClick={()=>play()}>
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
            // var args = 'crossDomain=true&zip=false&functionname=GetWFInfoByMon&devtype=WindTurbine';
            // TY.SendData(args, function(data){
            //     var dataObj=eval("data={" + data + "}");
            //     console.log(dataObj)
            // });

        $.ajax({
            url: "http://54.223.200.134/Monitor/xml.aspx",
            data: 'crossDomain=true&zip=true&functionname=GetWFInfoByMon&devtype=WindTurbine',
            type: 'post',
            async: true,
            dataType: 'text',//here
            complete: function () {

            },
            success:function (data) {

                var dataObj=eval("data={" + data + "}");
                console.log(dataObj)
            },
            error:function(){
                console.log('获取数据失败')
            }
        });

        }
     
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
