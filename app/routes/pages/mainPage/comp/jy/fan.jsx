import React from 'react';
import {connect} from 'react-redux';
import styles from './fan.scss';
import Header from '../linjinjin/header';
import Title from '../super/Title.jsx';
var actions = require('redux/actions');
var $ = require('jquery');
let header=['发电机转速','发电机定子U组烧组温度','发电机定子V组烧组温度','发电机定子W组烧组温度','发电机转子烧组温度1','发电机转子烧组温度2','发电机转子烧组温度3','发电机驱动端轴承温度','发电机非驱动端轴承温度','发电机冷却空气(水)入口温度','发电机滑环温度','A相电压','B相电压','C相电压','A相电流','B相电流','C相电流'];
let content=['发电机超速','有功功率超限','发电机烧组1过热','过大压','发电机烧组温度高','风机转子转速与发电机转速不一致','发电机烧组2过热','低电压','发电机轴承温度高','发电机碳刷磨损','发电机烧组3过热','功率低','变频不同步','风机转子旋转方向错误','发电机转速突变','相电压瞬时过高'];
let modelvalue = require('../../../../../../config/WTDetailData.js');

let fmvalue = modelvalue.ModelData[652113028];
// console.log(value.Wtid);
// let qwer = "WTGS.PPV.Ra.F32.A";
// console.log(fmvalue["WTUR.WSpd.Ra.F32"]);
let WTURTemp = Math.ceil(fmvalue["WTUR.Temp.Ra.F32"]);
let WNACTemp = Math.ceil(fmvalue["WNAC.Temp.Ra.F32"]);
let WGENTemp = Math.ceil(fmvalue["WGEN.Temp.Ra.F32.1"]);

// console.log(WGENTemp);
let WTGShz = Math.ceil(fmvalue["WTGS.HZ.Ra.F32"]);


let WTSpd = Number(fmvalue["WTUR.WSpd.Ra.F32"]);
let WTPwr = Math.ceil(fmvalue["WTUR.PwrAt.Ra.F32"]);
let WROTSpd = Math.ceil(fmvalue["WROT.Spd.Ra.F32"]);
let WGENSpd = Math.ceil(fmvalue["WGEN.Spd.Ra.F32"]);

// console.log(WNACTemp);
// console.log(fmvalue);
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {value,fanid} = this.props;
        // console.log(fmvalue.StatusCode);
        let x;
        let code = value.WTStateCode;
        switch(code)
        {
            case "DisComForPre":
                x = "离线";
                break;
            case "DisComForPlc":
                x = "离线";
                break;
            case "Unknown":
                x = "离线";
                break;
            case "Online":
                x = "正常发电";
                break;
            case "LimitPow":
                x = "正常发电";
                break;
            case "Alarm":
                x = "正常发电";
                break;
            case "Fault":
                x = "故障停机";
                break;
            case "Offline":
                x = "待机";
                break;
            case "ProtoectStop":
                x = "待机";
                break;
            case "LimitPowStop":
                x = "待机";
                break;
            default:
                x = "维护";
                break;
        }
        // console.log(code);
        return (
            <div className={styles.bodyBox}>
                <div className={styles.fanidbox}>
                    <div>风机名称：{value.Wtname}</div>
                    <div>风机型号：{value.Wtid}</div>
                    <div>运行状态：{x}</div>
                    <div>首次并网日期：{value.Wtname}</div>
                </div>
                <div className={`${styles.infoBox} ${styles.infofL}`}>
                    <div className={`${styles.infoBox6} ${styles.infofL}`}>
                        <Title></Title>

                        <div className={styles.titlebox}><span>风机描述</span><span>风机状态</span><span>状态时长(min)</span></div>
                        <div className={styles.statusquery}>
                            {
                                fmvalue.DevStatusQuery.Value.map((value, key)=>{
                                    return (
                                        <div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
                                            <span>{(value.StatusDate).slice(0,-4)}</span>
                                            <span>{value.StatusDescr}</span>
                                            <span>{value.StatusTime}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={`${styles.infoBox7} ${styles.infofL}`}>
                        <Title></Title>
                        <div className={styles.titlebox}><span>风机描述</span><span>风机状态</span><span>状态时长</span></div>
                        <div className={styles.statusquery}>
                            {
                                fmvalue.DevStatusQuery.Value.map((value, key)=>{
                                    return (
                                        <div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
                                            <span>{(value.StatusDate).slice(0,-4)}</span>
                                            <span>{value.StatusDescr}</span>
                                            <span>{value.StatusTime}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={`${styles.fanrightbox} ${styles.infofL}`}>
                    <Title title={['状态统计']}></Title>
                    <div className={`${styles.fanaction} ${styles.infofL11111111}`}>
                        <div className={styles.actionbox}>
                            <div>启动</div>
                            <div>停机</div>
                            <div>复位</div>
                            <div>测试</div>
                        </div>
                    </div>
                    <div className={styles.action1box}>
                        <div className={styles.fandatabox}>
                            <span>日发电量</span>
                            <span className={styles.numbox}><span>{Math.ceil(fmvalue["DayEgyAt"])}</span><span>万kWh</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>月发电量</span>
                            <span className={styles.numbox}><span>{Math.ceil(fmvalue["MonthEgyAt"])}</span><span>万kWh</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>年发电量</span>
                            <span className={styles.numbox}><span>{Math.ceil(fmvalue["YearEgyAt"])}</span><span>万kWh</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>累计发电量</span>
                            <span className={styles.numbox}><span>{Math.ceil(fmvalue["TotalEgyAt"])}</span><span>万kWh</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>无功功率</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTUR.PwrReact.Ra.F32"]).toFixed(1)}</span><span>kVar</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>偏航位置</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WYAW.Posi.Ra.F32"]).toFixed(1)}</span><span>°</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>对风角度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WYAW.Wdir.Ra.F32"]).toFixed(1)}</span><span>°</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>叶片1角度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade1"]).toFixed(1)}</span><span>°</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>叶片2角度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade2"]).toFixed(1)}</span><span>°</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>叶片3角度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade3"]).toFixed(1)}</span><span>°</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>1号变桨柜体温度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox1"]).toFixed(1)}</span><span>℃</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>2号变桨柜体温度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox2"]).toFixed(1)}</span><span>℃</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>3号变桨柜体温度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox3"]).toFixed(1)}</span><span>℃</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>1号变桨逆变器温度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(1)}</span><span>℃</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>2号变桨逆变器温度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(1)}</span><span>℃</span></span>
                        </div>
                        <div className={styles.fandatabox}>
                            <span>3号变桨逆变器温度</span>
                            <span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(1)}</span><span>℃</span></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});




const mapStateToProps = (state) => {
    return {
        value : state.vars.value,
        fanid : state.vars.valueid,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            if(WTGShz <=45){
                WTGShz = 45;
            }else if(WTGShz >= 56){
                WTGShz = (56-45)*15;
            }else{
                WTGShz = (WTGShz-45)*15;
            }
            $("#hzpoint").animate({ textIndent: 0 }, {
                duration: 1000,
                step: function(now,fx) {
                    $(this).css('transform-origin','90% 50%');
                    $(this).css('transform','rotate('+WTGShz+'deg)');
                },
            }, 1000 )

            var WTSpd = 45;
            if(WTSpd>=30){
                WTSpd = 30;
            }
            $("#wspoint").animate({ textIndent: 0 }, {
                step: function(now,fx) {
                    $(this).css('transform-origin','90% 50%');
                    $(this).css('transform','rotate('+WTSpd*6+'deg)');
                },
                duration:'slow'
            }, 2000);
            if(WTPwr>=180){
                WTPwr = 180;
            }
            $("#pwratpoint").animate({ textIndent: 0 }, {
                step: function(now,fx) {
                    $(this).css('transform-origin','90% 50%');
                    $(this).css('transform','rotate('+WTPwr+'deg)');
                },
            },1000)
            if(WROTSpd>=180){
                WROTSpd = 180;
            }
            $("#rspdpoint").animate({ textIndent: 0 }, {
                step: function(now,fx) {
                    $(this).css('transform-origin','90% 50%');
                    $(this).css('transform','rotate('+WROTSpd+'deg)');
                },
            },1000)
            if(WGENSpd>=30){
                WGENSpd = 30;
            }
            $("#gspdpoint").animate({ textIndent: 0 }, {
                step: function(now,fx) {
                    $(this).css('transform-origin','90% 50%');
                    $(this).css('transform','rotate('+WGENSpd*6+'deg)');
                },
            },1000)

            // $("#WGENtemp").animate({
            // 	height:WNACTemp+50,
            // 	duration: "slow",
            // }, 1000 )
            if(WTURTemp>=150){
                WTURTemp = 150;
            }

            if(WNACTemp>=150){
                WNACTemp = 150;
            }
            if(WGENTemp>=150){
                WGENTemp = 150;
            }
            $("#WTURTemp").animate({
                height:(WTURTemp+30)*3.2,
                duration: "slow",
            }, 1000 )
            $("#WNACTemp").animate({
                height:WNACTemp+50,
                duration: "slow",
            }, 1000 )
            $("#WGENTemp").animate({
                height:WGENTemp+50,
                duration: "slow",
            }, 1000 )
//   $.ajax({
//    type: 'GET',
//    url:'http://10.9.96.148:8080/soam/user/getPower?username=123&password=123',
//    data:{name:'xuyuanming'},
//    dataType:"jsonp",
//    // jsonp:"callback",
//    // jsonpCallback:"data",
//    timeout:30000,
//    // dataFilter:function(json){
//    //     console.log("jsonp.filter:"+json);
//    //     return json;
//    // },
//    success:function(json){
//        console.log(json);
//    },
//    // error:function(XMLHttpRequest,textStatus,errorThrown){
//    //     console.log("jsonp.error:"+textStatus);
//    // }
// });
            // function jsonp(data){console.log(data)};
// 				$.jsonp({
//    url:'http://10.9.0.9:8081/gwbi/elec/getPower',
//    data:{rel:13},
//    callbackParameter:"callback",
//    timeout:3000,
//    dataFilter:function(json){
//     console.log("jsonp.filter:"+json.name);
//     json.name = "测试123435";
// return json;
// },
//    success:function(json,textStatus,xOptions){
//        console.log("jsonp.success:"+json.name);
//    },
//    error:function(xOptions,textStatus){
//     console.log("jsonp.error:"+textStatus+", rel="+xOptions.data.rel);
//    }
// });




        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
