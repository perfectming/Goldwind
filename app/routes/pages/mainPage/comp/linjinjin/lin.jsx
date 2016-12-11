import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');

let Component = React.createClass({
    componentWillMount() {
        this.props.init();
    },
    render() {
        let {modata,moname} = this.props;
        return (
            <div style={{color:'#fff'}}>
               {modata.ModelData[8888800].DayEgyAt}
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        moname: state.vars.moname,
        modata: state.vars.modata,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            setInterval(function(){


              TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "MonitorBoard", momo, "Screen", 0);
                function momo(rdata){
                    dispatch(actions.setVars('moname', rdata));
                    TY.getRtData("MonitorBoard", 8888800, ppo);
                        function ppo(rdata){
                            TY.getRtData("MonitorBoard", 8888800, ppo);
                                function ppo(rdata){
                                    dispatch(actions.setVars('modata', rdata));
                                                                   
                                }
                        }

                }
              },1000)
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
