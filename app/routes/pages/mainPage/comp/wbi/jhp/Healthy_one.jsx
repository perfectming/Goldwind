import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_t from './Hly_t.jsx';
import Hly_r from './Hly_r.jsx';
import Hly_rs from './Hly_rs.jsx';
var $ = require('jquery');
let ip="10.68.100.32";

var actions = require('redux/actions');

let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;








let Component = React.createClass({
    componentWillMount() {
        let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },
    render() {

        let {w0,w10,mon,ipUrl,win,windplan=win,befor_pages='group',namex3,healthy3,namex2,healthy2,namex1,healthy1, returnit,hideit,wind, buttonAction, actbt = 0,  value0, inputOnChange, onFocus, changecolor, gogogo, back, more, arr,arr2} = this.props;


        return (




            <div className={styles.box}>

             <div className={styles.light} id="light"> </div>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`}  id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo3}>{mon+w0+w10+"各风机健康度"}</div>
                        <span onClick={()=>hideit()}>×</span>
                    </div>
                    <Hly_rs height={500}
                            powerValue={healthy3}
                            barRotimes={namex3} widths={5435}
                            text={''}></Hly_rs>


                </div>



                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt === key ? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={() => changecolor(value, key)}>
                                    {value.name}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={()=>returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_t
                               barLoTime={namex1}
                               barLoPowerValue={healthy1}
                               text={mon+ "各区域健康度"}></Hly_t>
                        <div className={styles.logo1}>

                        </div>
                    </div>
                </div>


                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_r height={400}
                               barRotime={namex2}
                               barLoPowerValue={healthy2}
                               text={mon+w0+"各风场健康度" }></Hly_r>
                        <div className={styles.logomini}>

                        </div>
                    </div>
                    <div className={`${styles.rbox2} ${styles.box_shadow} ${styles.logofa}`}>
                        <div className={styles.rbox30}>

                        </div>
                        <div className={styles.rbox3}>

                            <button className={styles.button} onClick={() => gogogo(sort0)}>前10</button>
                            <button className={styles.button} onClick={() => back(sort0)}>后10</button>
                            <button className={styles.button} onClick={() => more()}>更多</button>
                        </div>
                        <div className={styles.rbox4}>
                            <Hly_rs height={400}
                                    powerValue={healthy3}
                                    barRotimes={namex3}
                                    text={mon+w0+w10+"各风机健康度"}></Hly_rs>
                            <div className={styles.logomini}>

                            </div>

                        </div>
                    </div>
                </div>



            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        actbt: state.vars.actbt,
        wind: state.vars.wind,
        arr: state.vars.arr,
        arr2: state.vars.arr2,
        w0 : state.vars.w1,
        w10 : state.vars.w11,
        mon : state.vars.mon,
        windplan : state.vars.windplan,
        bt0: state.vars.bt0,
        ipUrl:state.vars.ipUrl,
        wfid:state.vars.wfid,
        healthy1:state.vars.healthy1,
        namex1:state.vars.namex1,
        healthy2:state.vars.healthy2,
        namex2:state.vars.namex2,
        healthy3:state.vars.healthy3,
        namex3:state.vars.namex3,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            var obj = {
                test: ''
            }

            let date=new Date();
            let year=date.getFullYear()
            let month2=date.getMonth();
            console.log(month2)
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/Health/getCompanyAreaHealth',
                async:false,
                data:{
                    "month":month2,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    console.log(data)
                    dispatch(actions.setVars('hhdata',  data));
                    dispatch(actions.setVars('actbt',  10));
                    dispatch(actions.setVars('mon',  month2+"月"));
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[2]) {
                        barlopowerp1.push(data.data[2][i].groupname);    //区域的横坐标
                        barlopowers1.push(data.data[2][i].areaHealth);   //计划发电量

                    }

                    let barlopowers2 = [];
                    let barlopowerp2 = [];

                    for (var i in data.data[1]) {
                        barlopowers2.push(data.data[1][i].groupname);    //区域的横坐标
                        barlopowerp2.push(data.data[1][i].areaHealth);    //区域的横坐标

                    }
                    let barlopowers3 = [];
                    let barlopowerp3 = [];

                    for (var i in data.data[0]) {
                        barlopowers3.push(data.data[0][i].groupname);    //区域的横坐标
                        barlopowerp3.push(data.data[0][i].areaHealth);    //区域的横坐标

                    }

                    dispatch(actions.setVars('healthy1', barlopowers1));
                    dispatch(actions.setVars('namex1', barlopowerp1));
                    dispatch(actions.setVars('healthy2', barlopowers2));
                    dispatch(actions.setVars('namex2', barlopowerp2));
                    dispatch(actions.setVars('healthy3', barlopowers3));
                    dispatch(actions.setVars('namex3', barlopowerp3));




                },
                error:function(){

                },
            })



        },
        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test: ''
            }


        },
        changecolor: (value, key) => {
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('windplan', value.plan));
            dispatch(actions.setVars('windplan1', value.plan));
        },
        gogogo: (sort0) => {
            (function () {
                sort0.sort(function (a,b) {
                    return b.time - a.time;
                })
                for(var i=0;i<12;i++){
                    x0[i]=sort0[i].name;
                    x1[i]=sort0[i].time;
                }

            })();
            dispatch(actions.setVars('arr', x1))
            dispatch(actions.setVars('arr2', x0))


        },
        back: (sort0) => {
            (function () {
                sort0.sort(function (a,b) {
                    return  a.time - b.time;
                })
                for(var i=0;i<12;i++){
                    x2[i]=sort0[i].name;
                    x3[i]=sort0[i].time;
                }

            })();
            dispatch(actions.setVars('arr', x3))
            dispatch(actions.setVars('arr2', x2))
        },
        more: () => {
            $("#boxhidden").show();
            $("#light").show();
        },
        hideit: () =>{
            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit:(befor_pages)=>{
            dispatch(actions.setVars('showPage',befor_pages));

        },



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
