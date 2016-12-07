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
        let{pagename='super',init}=this.props;
        return (
            <div>
            <Login></Login>
            {this.props.init(pagename)}
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        pagename:state.vars.pagename
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (pagename) => {
        
        clearInterval(time);
        time=setInterval(function(){

            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", 8888800, "DataOverview", setData, "Screen", 0);
       
        function setData(rdata){

            dispatch(actions.setVars('zhzb', rdata));
             TY.getRtData("DataOverview", 8888800, setData1)
             function setData1(rdata){
            dispatch(actions.setVars('bbs', rdata));
            dispatch(actions.setVars('showPage', pagename));


        }

        }

        },3000)
        
        

        

        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
