import React from 'react';
import {connect} from 'react-redux';
import styles from './fan.scss';
import Login from '../../../../../components/common/Loading.jsx';
import bg1 from '../../img/icon/1.png';
import bg2 from '../../img/icon/2.png';
import bg3 from '../../img/icon/3.png';
import bg4 from '../../img/icon/4.png';
import bg5 from '../../img/icon/5.png';
import bg6 from '../../img/icon/6.png';
import bg7 from '../../img/icon/7.png';
import bg8 from '../../img/icon/8.png';
import bg9 from '../../img/icon/9.png';
import Tom from '../../img/comp/succ.png';
import Jerry from '../../img/comp/defa.png';

var actions = require('redux/actions');
var $ = require('jquery');
let pack=['pack_WROT','pack_WNAC','pack_WGEN','pack_WTPS','pack_WYAW','pack_WTCS','pack_WCNV','pack_WTRF','pack_WTGS'];
let arr=[bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bg9];
let Component = React.createClass({
    componentWillUnmount() {
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {vid,  changetab, act1=0, boolFan = false, bujianModel, bujianData} = this.props;
        this.props.changeDate(vid,act1);
        if (boolFan) {
            var forIn=[];
            var forOut=[];
            for(let key in bujianData.ModelData){
                var diks=key;
            }
            for(let key in bujianModel.Model.dis){
                (key[14]&&key.slice(5,9)!='Bool')&& forIn.push(key);
            }
            for(let key in bujianModel.Model.dis){
                (key.slice(5,9)==='Bool')&& forOut.push(key);
            }
            return (
                <div className={styles.bodyBox} id="fanJy">
                    <div className={styles.fanidbox}>
                        {
                            pack.map((value, key)=> {
                                return (
                                    <span className={ act1 == key ? styles.active : styles.actspan } key={key}
                                          onClick={()=>changetab(key)}>{bujianModel.Model.pks[value].name}</span>
                                )
                            })
                        }
                    </div>
                    <div className={`${styles.fanrightbox} ${styles.infofL}`}>
                        <div className={styles.action1box}>
                            {
                                forIn.map((value, key)=> {
                                    if(bujianData.ModelData){
                                    return (
                                        <div className={styles.fandatabox} key={key}>
                                            <span>{bujianModel.Model.dis[value].name}</span>
                                            <span
                                                className={styles.numbox}><span>{(bujianData.ModelData[diks][bujianModel.Model.dis[value].path])?(bujianData.ModelData[diks][bujianModel.Model.dis[value].path]):'--'}</span><span>单位</span></span>
                                        </div>
                                    )}else {
                                        return(
                                            <div className={styles.fandatabox} key={key}>
                                                <span>{bujianModel.Model.dis[value].name}</span>
                                                <span
                                                    className={styles.numbox}><span>--</span><span>单位</span></span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={`${styles.infoBox} ${styles.infofL}`}>
                        <div className={styles.statusquery}>
                            {
                                forOut.map((value, key)=> {
                                    return (
                                        <div key={key}
                                             className={`${key % 12 < 6 ? styles.bgbox : styles.nomalbox} ${styles.statusquerybox}`}>
                                            <span><img src={value[1] == 0 ? Jerry : Tom}/>{bujianModel.Model.dis[value].name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <Login></Login>
            )
        }
    }
});




const mapStateToProps = (state) => {
    return {
        act1 : state.vars.val,
        vid:state.vars.Wtid,
        boolFan: state.vars.boolFan,
        bujianModel:state.vars.bujianModel,
        bujianData:state.vars.bujianData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDate:(vid,act1)=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", vid, "WTDetail", setData, "Screen", 0);
            function setData(rdata) {
                // dispatch(actions.setVars('bool', true));
                // dispatch(actions.setVars('modata', rdata));
                // dispatch(actions.setVars('fan_page', 'fanobj'));
                if (rdata.Model){
                var sk = rdata.Model.ens[vid].sk;
                TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", vid, sk, setDatas, "Screen", 0);
                function setDatas(rdata) {
                    var key;
                    for (let x in rdata.Model.prs) {
                        key = x;
                    }
                    var pkscs = rdata.Model.prs[key].pkscs;
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", vid, pkscs[pack[act1]].scid, setDataDo, "Screen", 0);
                    function setDataDo(rdata) {
                        dispatch(actions.setVars('bujianModel', rdata));
                        TY.getRtData(pkscs[pack[act1]].scid, vid, setDatafin);
                        function setDatafin(rdata) {
                            dispatch(actions.setVars('bujianData', rdata));
                            dispatch(actions.setVars('boolFan', true));
                        }
                    }
                }}
            }
        },
        init: () => {
        },
        changetab:(act)=>{
            dispatch(actions.setVars('val', act));
            arr[act] &&
            $('#fanJy').css('background-image','url('+arr[act]+')');
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
