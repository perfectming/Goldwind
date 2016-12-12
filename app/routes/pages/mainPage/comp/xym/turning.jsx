import React from 'react';
import {connect} from 'react-redux';
import Login from '../../../../../components/common/Loading.jsx';
var actions = require('redux/actions');
var $ = require('jquery');
let zhzb=[];
let time;
let Component = React.createClass({
    componentDidMount() {

    },
    render() {
        let{pagename,init,numtype,value,fanid}=this.props;
        return (
            <div>
            <Login></Login>
            {this.props.init(pagename,numtype,value,fanid)}
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        pagename:state.vars.pagename,
        numtype:state.vars.numtype,
        value : state.vars.value,
        fanid : state.vars.valueid,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (pagename,numtype,value,fanid) => {
            // let s;
            // clearInterval(s);
            
           
                if(numtype === 'faninfo'){
                    // console.log(pagename,numtype);
                    // console.log(hehe);
                     // s = setInterval(function(){
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", value.Wtid, "WTDetail", setData3, "Screen", 0);
                    function setData3(rdata){
                        dispatch(actions.setVars('infofmodel', rdata));
                        // console.log(0,rdata); 
                        TY.getRtData("WTDetail", value.Wtid, setData4)  
                        function setData4(rdata){
                             
                            // console.log(1,rdata);
                            TY.getRtData("WTDetail", value.Wtid, setData5)
                            function setData5(rdata){
                                // console.log(11,rdata);
                                dispatch(actions.setVars('infofdata', rdata));
                            } 
                            
                                

                                setTimeout(function(){
                                    dispatch(actions.setVars('befor_page','fan' ));
                                    dispatch(actions.setVars('showPage', pagename));
                                    dispatch(actions.setVars('numpage', pagename));
                                    dispatch(actions.setVars('fan_page', numtype));
                                    dispatch(actions.setVars('value', value));
                                    dispatch(actions.setVars('valueid', value));
                                    // dispatch(actions.setVars('valuepage', fanid));
                                },100) 
                            
                        }
                    }
                     // }, 3000)
                }else if(numtype === 'fanmatrix'){
                    // console.log(numtype,pagename);
                    // clearInterval(s);
                    // dispatch(actions.setVars('showPage', 'fan_matrix'));
                    // dispatch(actions.setVars('valuepage', value));
                    // dispatch(actions.setVars('numpage', 'fanmatrix'));
                    // dispatch(actions.setVars('fan_page', 'allpage'));
                    // dispatch(actions.setVars('befor_page','fan' ));
                }else if(numtype == 'pvinfo'){
                    console.log(numtype,pagename);
                     TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", value.Wtid, "WTDetail", setData11, "Screen", 0);
                    function setData11(rdata){
                        dispatch(actions.setVars('infopmodel', rdata));
                        console.log(0,rdata); 
                        TY.getRtData("WTDetail", value.Wtid, setData12)  
                        function setData12(rdata){
                             
                            // console.log(1,rdata);
                            TY.getRtData("WTDetail", value.Wtid, setData13)
                            function setData13(rdata){
                                console.log(11,rdata);
                                dispatch(actions.setVars('infopdata', rdata));
                            } 
                            
                                

                                setTimeout(function(){
                                    console.log(1)
                                    dispatch(actions.setVars('valuepage1', fanid));
                                    // dispatch(actions.setVars('befor_page','fan' ));
                                    console.log(2)
                                    dispatch(actions.setVars('showPage', pagename));
                                    dispatch(actions.setVars('numpage', pagename));
                                    console.log(3)
                                    dispatch(actions.setVars('fan_page',  numtype));
                                    console.log(4)
                                    // dispatch(actions.setVars('value', value));
                                    console.log(5)
                                    // dispatch(actions.setVars('valueid', value));
                                    console.log(6)
                                    
                                    // console.log(7)
                                },1000) 
                            
                        }
                    }
                }
                
           
           
                       


        // clearInterval(time);
        // time=setInterval(function(){

        //     TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
       
        // function setData(rdata){

        //     dispatch(actions.setVars('zhzb', rdata));
        //      TY.getRtData("DataOverview", 8888800, setData1)
        //      function setData1(rdata){
        //     dispatch(actions.setVars('bbs', rdata));
        //     dispatch(actions.setVars('showPage', pagename));


        // }

        // }


        // },3000)

        
        

        

        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
