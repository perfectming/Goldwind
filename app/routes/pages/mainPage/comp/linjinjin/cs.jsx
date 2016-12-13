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
        let{pagename='super',init,numtype='super'}=this.props;
        return (
            <div>
            <Login></Login>
            {this.props.init(pagename,numtype)}
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        pagename:state.vars.pagename,
        numtype:state.vars.numtype
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (pagename,numtype) => {








        if(numtype=='super' || numtype=='distribution' || numtype=='fan' || numtype=='tkgl' || numtype=='booster' || numtype=='monitorkb'){
             clearInterval(time);

             // time=setInterval(function(){
        TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
            function setData(rdata){
                dispatch(actions.setVars('zhzb', rdata));
                TY.getRtData("DataOverview", 8888800, setData1)
                function setData1(rdata){
                    dispatch(actions.setVars('bbs', rdata));
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DevicesMatrix", setDatas, "Screen", 0);
                    function setDatas(rdata){
                        dispatch(actions.setVars('fModel', rdata));
                        TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(rdata){
                        dispatch(actions.setVars('fData', rdata));
                            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "WTLeftOverview", setDatas, "Screen", 0);
                            function setDatas(rdata){
                                dispatch(actions.setVars('leftm', rdata));
                                TY.getRtData("WTLeftOverview", 8888800, setlData)
                                function setlData(rdata){
                                dispatch(actions.setVars('leftd', rdata));
                                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "RegulationOverview", setDatas, "Screen", 0);
                                    function setDatas(rdata){
                                        dispatch(actions.setVars('jyname', rdata));
                                        TY.getRtData("RegulationOverview", 8888800, setfData)
                                            function setfData(rdata){
                                                dispatch(actions.setVars('jydata', rdata));
                                                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "MonitorBoard", momo, "Screen", 0);
                                                    function momo(rdata){
                                                        dispatch(actions.setVars('moname', rdata));
                                                        TY.getRtData("MonitorBoard", 8888800, ppo);
                                                            function ppo(rdata){
                                                                 TY.getRtData("MonitorBoard", 8888800, ppo);
                                                                function ppo(rdata){
                                                                    dispatch(actions.setVars('bool', true));
                                                                    dispatch(actions.setVars('modata', rdata));
                                                                    dispatch(actions.setVars('showPage', pagename));
                                                                }
                                                            }

                                                    }
                                            }
                                    }
                                
                                }
                            }
                           
                        }
                    }
                     
                    

                }
                
            }
               // },3000)
        
        }else{
            clearInterval(time);
             dispatch(actions.setVars('showPage', pagename));
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
