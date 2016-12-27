import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_pbaone from './Hly_pbaone.jsx';
import Hly_pbatwo from './Hly_pbatwo.jsx';

var actions = require('redux/actions');
var $ = require("jquery");
let ip="10.68.100.32";




let Component = React.createClass({
    componentWillMount() {
        let {ipUrl}=this.props
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {ip="10.68.100.32",ipUrl,befor_pages='area',width0,w10,wc1,wfid,bt0=0,wc2,hhdata,w0,mon, returnit,barLotime1,actbt=10,changecolor, hhdata4, hideit,gogogo,back,more,arr,arr2,power1, wrong10, wrong11, wrong12, wrong13, pba1, barRotimes,barRotime, power2, wrong20, wrong21, wrong22, wrong23, pba2, barLotime2,} = this.props;
        let data = require('./Healthy-data');
        let month = data.data.line_month;
        let button=data.data.button;
        let text0=data.data.line_date;

        return (




            <div className={styles.box}>

                <div className={styles.light} id="light"> </div>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`}   id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo30}>
                            {mon+w10+"各风机PBA"}
                        </div>
                        <span onClick={()=>hideit(power1, wrong10, wrong11, wrong12, wrong13, pba1,barLotime1)}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                    <Hly_pbatwo height={450}
                                widths={width0}
                                text={''}
                                barRotimes={barLotime1}
                                power1={power1}
                                wrong10={wrong10}
                                wrong11={wrong11}
                                wrong12={wrong12}
                                wrong13={wrong13}
                                pba1={pba1}
                    ></Hly_pbatwo>

                    </div>

                </div>


                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key} onClick={()=>changecolor(value,key,ipUrl)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={()=>returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>

                        <Hly_pbaone height={400} text={mon+'各风场PBA'}
                                    barRotime={barLotime2}
                                    power2={power2}
                                    wrong20={wrong20}
                                    wrong21={wrong21}
                                    wrong22={wrong22}
                                    wrong23={wrong23}
                                    pba2={pba2}
                        ></Hly_pbaone>
                        <div className={styles.logo2}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow} ${styles.fbox2}`}>
                        <div className={styles.rbox31}>


                        </div>
                        <div className={styles.rbox33}>
                            <button className={bt0===0? styles.button:styles.button22} onClick={() => gogogo(bt0,w0,  wc1,wc2, actbt, hhdata,ipUrl,wfid)}>前10</button>
                            <button className={bt0===1? styles.button:styles.button22} onClick={() => back(bt0,w0,  wc1,wc2, actbt, hhdata,ipUrl,wfid)}>后10</button>
                            <button className={styles.button22} onClick={() => more(bt0,w0,  wc1,wc2, actbt, hhdata,ipUrl,wfid)}>更多</button>
                        </div>

                        <Hly_pbatwo height={390} text={mon+w10+"各风机PBA"}
                                    barRotimes={barLotime1}
                                    power1={power1}
                                    wrong10={wrong10}
                                    wrong11={wrong11}
                                    wrong12={wrong12}
                                    wrong13={wrong13}
                                    pba1={pba1}
                        ></Hly_pbatwo>
                        <div className={styles.logomini2}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbt,
        wind:state.vars.wind,
        winds:state.vars.winds,
        windss:state.vars.windss,
        arr: state.vars.arr,
        arr2: state.vars.arr2,
        barLotime2: state.vars.barLotime21,
        power2: state.vars.power21,
        wrong20: state.vars.wrong201,
        wrong21: state.vars.wrong211,
        wrong22: state.vars.wrong221,
        wrong23: state.vars.wrong231,
        pba2: state.vars.pba21,
        barLotime1: state.vars.barLotime1,
        power1: state.vars.power1,
        wrong10: state.vars.wrong10,
        wrong11: state.vars.wrong11,
        wrong12: state.vars.wrong12,
        wrong13: state.vars.wrong13,
        pba1: state.vars.pba1,
        hhdata4: state.vars.hhdata4,
        mon: state.vars.mon,
        w0: state.vars.w1,
        w10: state.vars.w11,
        wc1: state.vars.wc1,
        wc2: state.vars.wc2,
        hhdata: state.vars.hhdata,
        bt0: state.vars.bt0,
        ipUrl: state.vars.ipUrl,
        wfid: state.vars.wfid,
        width0: state.vars.width0,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('actbt',  10));
            dispatch(actions.setVars('mon',  month2+"月"));
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/PBA/getAreaWFieldPBA',
                async:false,
                data:{
                    "month":month2,
                    "groupid":'201612121721151',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata4',  data));


                    let w10 = data.data[1][0].wfname;
                    dispatch(actions.setVars('w11', w10));


                    let barLotime21 = [];    //各区域   一区域二区域
                    let power21=[];       //实际发电量
                    let wrong201=[];       //故障损失
                    let wrong211=[];       //维护损失
                    let wrong221=[];       //限功率损失
                    let wrong231=[];       //非设备原因损失
                    let pba21=[];
                    for (var i in data.data[1]) {
                        barLotime21.push(data.data[1][i].wfname);    //区域的横坐标
                        power21.push(Number((data.data[1][i].poweract).toFixed(2)));   //实际发电量
                        wrong201.push(Number((data.data[1][i].faultloss).toFixed(2)));    //故障损失
                        wrong211.push(Number((data.data[1][i].maintainloss).toFixed(2)));  //维护损失
                        wrong221.push(Number((data.data[1][i].limitloss).toFixed(2)));    //限功率损失
                        wrong231.push(Number((data.data[1][i].nodevreasonloss).toFixed(2)));    //非设备原因损失
                        pba21.push(Number((data.data[1][i].pba*100).toFixed(2)));  //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime21', barLotime21));
                    dispatch(actions.setVars('power21', power21));
                    dispatch(actions.setVars('wrong201', wrong201));
                    dispatch(actions.setVars('wrong211', wrong211));
                    dispatch(actions.setVars('wrong221', wrong221));
                    dispatch(actions.setVars('wrong231', wrong231));
                    dispatch(actions.setVars('pba21', pba21));

                    let barLotime21q = [];    //各区域   一区域二区域
                    let power21q=[];       //实际发电量
                    let wrong201q=[];       //故障损失
                    let wrong211q=[];       //维护损失
                    let wrong221q=[];       //限功率损失
                    let wrong231q=[];       //非设备原因损失
                    let pba21q=[];
                    for (var i=0;i<10;i++) {
                        barLotime21q.push(data.data[0][i].wtname);   //区域的横坐标
                        power21q.push(Number((data.data[0][i].poweract).toFixed(2)));  //实际发电量
                        wrong201q.push(Number((data.data[0][i].faultloss).toFixed(2)));   //故障损失
                        wrong211q.push(Number((data.data[0][i].maintainloss).toFixed(2)));    //维护损失
                        wrong221q.push(Number((data.data[0][i].limitloss).toFixed(2)));   //限功率损失
                        wrong231q.push(Number((data.data[0][i].nodevreasonloss).toFixed(2)));    //非设备原因损失
                        pba21q.push(Number((data.data[0][i].pba*100).toFixed(2)));    //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime1', barLotime21q));
                    dispatch(actions.setVars('power1', power21q));
                    dispatch(actions.setVars('wrong10', wrong201q));
                    dispatch(actions.setVars('wrong11', wrong211q));
                    dispatch(actions.setVars('wrong12', wrong221q));
                    dispatch(actions.setVars('wrong13', wrong231q));
                    dispatch(actions.setVars('pba1', pba21q));


                },
                error:function(){

                },
            })
            var obj = {
                test: ''
            }
        },
        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test: ''
            }
        },
        changecolor:(value,key,ipUrl)=>{
            dispatch(actions.setVars('bt0', 0));
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind',value.plan ));
            dispatch(actions.setVars('winds',value.actrul ));
            dispatch(actions.setVars('windss',value.actruls ));

            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/PBA/getAreaWFieldPBA',
                async:false,
                data:{
                    "month":key+1,
                    "groupid":'201612121721151',
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    console.log(data)
                    let w10 = data.data[1][0].wfname;
                    dispatch(actions.setVars('w11', w10));
                    dispatch(actions.setVars('hhdata4',  data));
                    let barLotime21 = [];    //各区域   一区域二区域
                    let power21=[];       //实际发电量
                    let wrong201=[];       //故障损失
                    let wrong211=[];       //维护损失
                    let wrong221=[];       //限功率损失
                    let wrong231=[];       //非设备原因损失
                    let pba21=[];
                    for (var i in data.data[1]) {
                        barLotime21.push(data.data[1][i].wfname);    //区域的横坐标
                        power21.push(data.data[1][i].poweract);   //实际发电量
                        wrong201.push(data.data[1][i].faultloss);   //故障损失
                        wrong211.push(data.data[1][i].maintainloss);   //维护损失
                        wrong221.push(data.data[1][i].limitloss);   //限功率损失
                        wrong231.push(data.data[1][i].nodevreasonloss);   //非设备原因损失
                        pba21.push(Number((data.data[1][i].pba*100).toFixed(2)));    //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime21', barLotime21));
                    dispatch(actions.setVars('power21', power21));
                    dispatch(actions.setVars('wrong201', wrong201));
                    dispatch(actions.setVars('wrong211', wrong211));
                    dispatch(actions.setVars('wrong221', wrong221));
                    dispatch(actions.setVars('wrong231', wrong231));
                    dispatch(actions.setVars('pba21', pba21));

                    let barLotime21q = [];    //各区域   一区域二区域
                    let power21q=[];       //实际发电量
                    let wrong201q=[];       //故障损失
                    let wrong211q=[];       //维护损失
                    let wrong221q=[];       //限功率损失
                    let wrong231q=[];       //非设备原因损失
                    let pba21q=[];
                    for (var i=0;i<10;i++) {
                        barLotime21q.push(data.data[0][i].wtname);    //区域的横坐标
                        power21q.push(data.data[0][i].poweract);   //实际发电量
                        wrong201q.push(data.data[0][i].faultloss);   //故障损失
                        wrong211q.push(data.data[0][i].maintainloss);   //维护损失
                        wrong221q.push(data.data[0][i].limitloss);   //限功率损失
                        wrong231q.push(Number(data.data[0][i].nodevreasonloss.toFixed(2)));   //非设备原因损失
                        pba21q.push(Number((data.data[0][i].pba*100).toFixed(2)));      //非设备原因损失
                    }
                    dispatch(actions.setVars('barLotime1', barLotime21q));
                    dispatch(actions.setVars('power1', power21q));
                    dispatch(actions.setVars('wrong10', wrong201q));
                    dispatch(actions.setVars('wrong11', wrong211q));
                    dispatch(actions.setVars('wrong12', wrong221q));
                    dispatch(actions.setVars('wrong13', wrong231q));
                    dispatch(actions.setVars('pba1', pba21q));
                },
                error:function(){

                },
            })
        },
        gogogo: (bt0,w0,  wc1,wc2, actbt, hhdata,ipUrl,wfid) => {
            dispatch(actions.setVars('bt0', 0));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type":"0",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失
                    let wrong31c = [];       //维护损失
                    let wrong32c = [];       //限功率损失
                    let wrong33c = [];       //非设备原因损失
                    let pba3c = [];      //故障损失


                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(data.data[i].poweract);   //实际发电量
                        wrong30c.push(data.data[i].faultloss);   //故障损失
                        wrong31c.push(data.data[i].maintainloss);   //维护损失
                        wrong32c.push(data.data[i].limitloss);   //限功率损失
                        wrong33c.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba3c.push(Number((data.data[i].pba*100).toFixed(2)));  //非设备原因损失
                    }


                    dispatch(actions.setVars('barLotime1', barLotime3c))
                    dispatch(actions.setVars('power1', power3c))
                    dispatch(actions.setVars('wrong10', wrong30c))
                    dispatch(actions.setVars('wrong11', wrong31c))
                    dispatch(actions.setVars('wrong12', wrong32c))
                    dispatch(actions.setVars('wrong13', wrong33c))
                    dispatch(actions.setVars('pba1', pba3c))


                },
                error: function () {

                },
            });





        },
        back: (bt0,w0,  wc1,wc2, actbt, hhdata,ipUrl,wfid) => {
            dispatch(actions.setVars('bt0', 1));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type":"1",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失
                    let wrong31c = [];       //维护损失
                    let wrong32c = [];       //限功率损失
                    let wrong33c = [];       //非设备原因损失
                    let pba3c = [];      //故障损失


                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(Number((data.data[i].poweract).toFixed(2)));      //实际发电量
                        wrong30c.push(data.data[i].faultloss);   //故障损失
                        wrong31c.push(data.data[i].maintainloss);   //维护损失
                        wrong32c.push(data.data[i].limitloss);   //限功率损失
                        wrong33c.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba3c.push(Number((data.data[i].pba*100).toFixed(2)));    //非设备原因损失
                    }

                    dispatch(actions.setVars('barLotime1', barLotime3c))
                    dispatch(actions.setVars('power1', power3c))
                    dispatch(actions.setVars('wrong10', wrong30c))
                    dispatch(actions.setVars('wrong11', wrong31c))
                    dispatch(actions.setVars('wrong12', wrong32c))
                    dispatch(actions.setVars('wrong13', wrong33c))
                    dispatch(actions.setVars('pba1', pba3c))


                },
                error: function () {

                },
            });
        },
        more: (bt0,w0,  wc1,wc2, actbt, hhdata,ipUrl,wfid) => {

            dispatch(actions.setVars('bt0', 2));
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/PBA/getPageSize',
                async: false,
                data: {
                    "month": actbt + 1,
                    "groupid":  '201612121721151',
                    "wfid": wfid == undefined ? '150801' : wfid,
                    "type":"2",
                    "year":"2016"
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    let barLotime3c = [];    //各区域   一区域二区域
                    let power3c = [];       //实际发电量
                    let wrong30c = [];       //故障损失
                    let wrong31c = [];       //维护损失
                    let wrong32c = [];       //限功率损失
                    let wrong33c = [];       //非设备原因损失
                    let pba3c = [];      //故障损失


                    for (var i in data.data) {
                        barLotime3c.push(data.data[i].wtname);    //区域的横坐标
                        power3c.push(data.data[i].poweract);   //实际发电量
                        wrong30c.push(data.data[i].faultloss);   //故障损失
                        wrong31c.push(data.data[i].maintainloss);   //维护损失
                        wrong32c.push(data.data[i].limitloss);   //限功率损失
                        wrong33c.push(data.data[i].nodevreasonloss);   //非设备原因损失
                        pba3c.push(Number((data.data[i].pba*100).toFixed(2)));   //非设备原因损失
                    }
                    let width0=barLotime3c.length*60;
                    dispatch(actions.setVars('width0', width0));
                    dispatch(actions.setVars('barLotime1', barLotime3c))
                    dispatch(actions.setVars('power1', power3c))
                    dispatch(actions.setVars('wrong10', wrong30c))
                    dispatch(actions.setVars('wrong11', wrong31c))
                    dispatch(actions.setVars('wrong12', wrong32c))
                    dispatch(actions.setVars('wrong13', wrong33c))
                    dispatch(actions.setVars('pba1', pba3c))


                },
                error: function () {

                },
            });
            $("#light").show();
            $("#boxhidden").show();;
        },
        hideit: (power1, wrong10, wrong11, wrong12, wrong13, pba1,barLotime1) =>{
            dispatch(actions.setVars('bt0', 0));
            let barLotime3c = [];    //各区域   一区域二区域
            let power3c=[];       //实际发电量
            let wrong30c=[];       //故障损失
            let wrong31c=[];       //维护损失
            let wrong32c=[];       //限功率损失
            let wrong33c=[];       //非设备原因损失
            let pba3c=[];

            for (var i=0;i<10;i++) {

                barLotime3c[i]=barLotime1[i];    //区域的横坐标
                power3c[i]=power1[i];   //实际发电量
                wrong30c[i]=wrong10[i];   //故障损失
                wrong31c[i]=wrong11[i];   //维护损失
                wrong32c[i]=wrong12[i];   //限功率损失
                wrong33c[i]=wrong13[i];   //非设备原因损失
                pba3c[i]=pba1[i];   //非设备原因损失

            }

            dispatch(actions.setVars('barLotime1', barLotime3c))
            dispatch(actions.setVars('power1', power3c))
            dispatch(actions.setVars('wrong10', wrong30c))
            dispatch(actions.setVars('wrong11', wrong31c))
            dispatch(actions.setVars('wrong12', wrong32c))
            dispatch(actions.setVars('wrong13', wrong33c))
            dispatch(actions.setVars('pba1', pba3c))
            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit:(befor_pages)=>{
            dispatch(actions.setVars('showPage',befor_pages));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
