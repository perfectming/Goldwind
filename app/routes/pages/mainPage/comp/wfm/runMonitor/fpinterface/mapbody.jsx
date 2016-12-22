import React from 'react';
import {connect} from 'react-redux';
import styles from './mapbodyy.scss';
import Fcone from './fcone.jsx';
import Fctwo from './fctwo.jsx';
import Nav from './nav.jsx';
import Login from '../../../../../../../components/common/Loading.jsx';
let time;

var actions = require('redux/actions');

let Component = React.createClass({
    componentWillMount() {
        this.props.changedate();
    },
     componentWillUnmount() {
       clearInterval(time)
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {tab,boolmapbody=false,fModel,fData,leftm,leftd} = this.props;
        if(boolmapbody){
        return (
            <div className={styles.bodyBox }>
             <Nav title={tab} leftd={leftd}></Nav>
               <Fcone fModel={fModel} fData={fData} leftm={leftm} leftd={leftd}></Fcone>
                
              
            </div>
        );
        }else{
            return(
                <Login></Login>
                )
            
        }
    }
});


const mapStateToProps = (state) => {
    return {
        boolmapbody:state.vars.boolmapbody,
        fModel:state.vars.fModel,
        fData:state.vars.fData,
        leftm:state.vars.leftm,
        leftd:state.vars.leftd,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
         changedate:()=>{
             
            //     console.log('刷新')


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
                                        setTimeout(function(){
                                       dispatch(actions.setVars('boolmapbody', true));  
                                   },1000)
                                }
                            }
                        }
                    }
            time=setInterval(function(){  
                         TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(rdata){
                            dispatch(actions.setVars('fData', rdata));
                             TY.getRtData("WTLeftOverview", 8888800, setlData)
                                function setlData(rdata){
                                    dispatch(actions.setVars('leftd', rdata));
                                }

                        }                  
             },2000)
        },
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);