import React from 'react';
import {connect} from 'react-redux';
import styles from './mapbodyy.scss';
import Fcone from './fcone.jsx';
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
                    function setDatas(fmodel){
                        dispatch(actions.setVars('fModel', fmodel));
                        TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(fdata){
                            if(fdata.ModelData[8888801] == undefined){
                                TY.getRtData("DevicesMatrix", 8888800, setfData)
                            }else{
                                dispatch(actions.setVars('fData', fdata));
                                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "WTLeftOverview", setDatas, "Screen", 0);
                                function setDatas(rdata){
                                    dispatch(actions.setVars('leftm', rdata));
                                    TY.getRtData("WTLeftOverview", 8888800, setlData)
                                    function setlData(rdata){
                                    dispatch(actions.setVars('leftd', rdata));
                                           
                                           dispatch(actions.setVars('boolmapbody', true));  
                                            
                                    }
                                }
                            }
                        
                        }
                    }

            time=setInterval(function(){
                         TY.getRtData("DevicesMatrix", 8888800, setfData)
                        function setfData(fdata){
                            dispatch(actions.setVars('fData', fdata));
                             TY.getRtData("WTLeftOverview", 8888800, setlData)
                                function setlData(rdata2){
                                    dispatch(actions.setVars('leftd', rdata2));
                                }
            
                        }
             },1500)
        },
        init: () => {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);