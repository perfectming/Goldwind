import React from 'react';
import {connect} from 'react-redux';
import styles from './Fan_matrix.scss';
import Headernav from './header.jsx';
import Faninfo from '../fanpvmatrix/Faninfo.jsx';
import Bodymap from './mapbody.jsx';
import FanPart from './fanPart.jsx';
import Pvinfo from '../fanpvmatrix/Pvinfo.jsx';
var actions = require('redux/actions');
let page1 = require('./mappage');


let Component = React.createClass({

    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changeFlag, changnav=0,fan_page,zhzb,bbs}=this.props;
      
        return (
            <div className={styles.bodyBox}>
                <Headernav fcpage={page1.header} zhz={zhzb} bs={bbs}></Headernav>
                { fan_page==='allpage' && <Bodymap tab={page1.header[changnav].rightpagge}></Bodymap>}
                { fan_page==='faninfo' && <Faninfo></Faninfo>}
                { fan_page==='pvinfo' && <Pvinfo></Pvinfo>}
                { fan_page==='fanpart' && <FanPart></FanPart>}
            </div>
        );
   
    }
});


const mapStateToProps = (state) => {
    return {
        changnav : state.vars.Changnav,
        flag : state.vars.flagff,
        fan_page : state.vars.fan_page,
        zhzb: state.vars.zhzb,
        bbs: state.vars.bbs,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (flag) => {
            var obj = {
                test:'',
                }
             dispatch(actions.setVars('navhide', false));
             

        },
         changeFlag :(flag)=>{
            
            if(flag){
                flag=false;
            }else{
                flag=true;
            };
            dispatch(actions.setVars('flagff', flag));
        }
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
