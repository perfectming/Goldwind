import React from 'react';
import {connect} from 'react-redux';
var {getState} = require('redux/store');
import styles from './fanPart.scss';
import Login from '../../../../../../../components/common/Loading.jsx';
import bg1 from '../../../../img/icon/1.png';
import bg2 from '../../../../img/icon/2.png';
import bg3 from '../../../../img/icon/3.png';
import bg4 from '../../../../img/icon/4.png';
import bg5 from '../../../../img/icon/5.png';
import bg6 from '../../../../img/icon/6.png';
import bg7 from '../../../../img/icon/7.png';
import bg8 from '../../../../img/icon/8.png';
import bg9 from '../../../../img/icon/9.png';
import Tom from '../../../../img/comp/succ.png';
import Jerry from '../../../../img/comp/defa.png';

var actions = require('redux/actions');
var $ = require('jquery');
import _ from 'lodash';
let pack=['pack_WROT','pack_WNAC','pack_WGEN','pack_WTPS','pack_WYAW','pack_WTCS','pack_WCNV','pack_WTRF','pack_WTGS'];//设置表格每列属性
let arr=[bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bg9];//整理背景路径
let time;
let onceTime;
let Component = React.createClass({
    componentWillMount() {
        let {vid, act1=0} = this.props;
        this.props.changeDate(vid,act1);
    },
    componentWillUnmount() {
        clearInterval(time);
        clearTimeout(onceTime);
    },
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {vid,  changetab, act1=0, boolFan = false, bujianModel, bujianData,skinStyle} = this.props;
        if (boolFan) {//判断执行完数据后打开页面
            var forIn=[];
            var forOut=[];
            for(let key in bujianModel.Model.dis){
                (key[14]&&key.slice(5,9)!='Bool')&& forIn.push(key);
            }
            for(let key in bujianModel.Model.dis){
                (key.slice(5,9)==='Bool')&& forOut.push(key);
            }
            return (
                <div className={skinStyle==1?styles.bodyBoxBlue:skinStyle==2?styles.bodyBoxWhite:styles.bodyBox} id="fanJy">
                    <div className={styles.fanidbox}>
                        {
                            pack.map((value, key)=> {
                                return (
                                    <span className={ act1 == key ? styles.active : styles.actspan } key={key}
                                          onClick={()=>changetab(key,vid)}>{bujianModel.Model.pks[value].name}</span>
                                )
                            })
                        }
                    </div>
                    <div className={`${styles.fanrightbox} ${styles.infofL}`}>
                        <div className={styles.action1box}>
                            {
                                forIn.map((value, key)=> {
                                    if(bujianData && bujianData.ModelData && bujianData.ModelData[vid]){
                                    return (
                                        <div className={styles.fandatabox} key={key}>
                                            <span>{bujianModel.Model.dis[value].name}</span>
                                            <span
                                                className={styles.numbox}><span>{(bujianData.ModelData[vid][bujianModel.Model.dis[value].path])}</span><span>{bujianModel.Model.dis[value].unit}</span></span>
                                        </div>
                                    )
                                    }else {
                                        return (
                                            <div className={styles.fandatabox} key={key}>
                                                <span>{bujianModel.Model.dis[value].name}</span>
                                                <span
                                                    className={styles.numbox}><span>--</span><span>{bujianModel.Model.dis[value].unit}</span></span>
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
                                            <span><img src={bujianData.ModelData[vid][value] == 'TRUE' ? Jerry : Tom}/>{bujianModel.Model.dis[value].name}</span>
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
        bujianData:state.vars.bujianData,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDate:(vid,act1)=>{
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", vid, "WTDetail", setData, "Screen", 0);
            function setData(rdata) {
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
                        function setDatafin(rdata1) {
                            // if(rdata1.ModelData[vid]){
                            //     let arr=[];
                            //     for(let key in rdata1.ModelData[vid]){ arr.push(key)};
                            //     arr.length>10 &&
                                dispatch(actions.setVars('bujianData', rdata1));
                            // }
                            setTimeout(function () {
                                dispatch(actions.setVars('boolFan', true));
                                clearTimeout(onceTime);
                            },100)
                        }/*从后台取出数据并赋给bujianData并告知页面加载完成*/
                    }
                    time=setInterval(function(){
                        let act2=_.clone(getState().vars.val);
                        (!act2) && (act2=0);
                        TY.getRtData(pkscs[pack[act2]].scid, vid, setDatafin);
                        function setDatafin(rdata1) {
                            if((rdata1 && rdata1.ModelData && rdata1.ModelData[vid])){
                                let a=0;
                                for(let key in rdata1.ModelData[vid]){ a++}
                                a>6 ?
                                dispatch(actions.setVars('bujianData', rdata1)):
                                    TY.getRtData(pkscs[pack[act2]].scid, vid, setDatafin);
                            }else {
                                TY.getRtData(pkscs[pack[act2]].scid, vid, setDatafin);}
                        }
                    },2000);
                    onceTime=setTimeout(function(){
                        alert('数据获取失败！请重新登入');
                        browserHistory.push('/app/all/page/login');
                        dispatch(actions.setVars('userInfo', false));
                    },30000)
                }}
            }
        },
        init: () => {
        },
        changetab:(act1,vid)=>{/*切换到选中部件的数据*/
            dispatch(actions.setVars('val', act1));
            arr[act1] &&
            $('#fanJy').css('background-image','url('+arr[act1]+')');//切换背景图片引用路径
            TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", vid, "WTDetail", setData, "Screen", 0);
            function setData(rdata) {
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
                            //console.log(rdata)
                            dispatch(actions.setVars('bujianModel', rdata));
                            TY.getRtData(pkscs[pack[act1]].scid, vid, setDatafin);
                            function setDatafin(rdata1) {
                                //console.log(rdata1)
                                dispatch(actions.setVars('bujianData', rdata1));
                                dispatch(actions.setVars('boolFan', true));
                            }
                        }
                    }}
            }
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
