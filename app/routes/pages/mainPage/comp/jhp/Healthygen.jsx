import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_gen from './Hly_gen.jsx';
import Hly_gens from './Hly_gens.jsx';
import Hly_genp from './Hly_genp.jsx';

var actions = require('redux/actions');
var $ = require('jquery');


let Component = React.createClass({
    componentWillMount(ip) {
        this.props.ajax(ip);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {ip="10.68.100.32",barlotimes1,barlopowers1,barlopowerp1,barlotimes2,barlopowers2,barlopowerp2,barlotimes3,barlopowers3,barlopowerp3,hhdata,hhdata1, w0 = "", w10 = "风场1", mon = "一月份", befor_pages = 'group', returnit, hideit, arr, arr2,arr3, gogogo, back, more, actbt = 10, changecolor,} = this.props;

        let data = require('./Healthy-data');
        let month = data.data.line_month;
        let button = data.data.button;



        // let sort0 = hhdata.data[0];
        // let x4 = [];
        // let x5 = [];
        // let x45=[];
        // let x6 = [];
        // let x7 = [];
        // let x67 = [];
        //
        //
        // (function () {
        //     // console.log(sort0)
        //     for (var i = 0; i < 12; i++) {
        //         x4[i] = sort0[i].wtname;
        //         x5[i] = sort0[i].poweract;
        //         x45[i] = sort0[i].powerplan;
        //     }
        //     for (var i = 0; i < sort0.length; i++) {
        //         x6[i] = sort0[i].wtname;
        //         x7[i] = sort0[i].poweract;
        //         x67[i] =sort0[i].powerplan;
        //     }
        //
        // })();


        return (




            <div className={styles.box}>
                <div className={styles.light} id="light"></div>

                <div className={`${styles.boxhidden} ${styles.box_shadow}`} id="boxhidden">
                    <div className={styles.hidden_top}>
                        <div className={styles.logo2}></div>
                        <div className={styles.logo3}>
                            {mon + w0 + w10 + "各风机发电量"}
                        </div>
                        <span onClick={() => hideit()}>×</span>
                    </div>
                    <div className={styles.hidden_bottom}>
                    <Hly_genp height={450}  widths={4500}
                              name0={barlotimes3}
                              power1={barlopowers3}
                              power2={barlopowerp3}
                              text={''}></Hly_genp>
                    </div>

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
                    <div className={styles.return} onClick={() => returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.tbox}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_gen text={mon + "集团各区域发电量"}
                                 name0={barlotimes1}
                                 power1={barlopowers1}
                                 power2={barlopowerp1}
                                 pengpeng = {hhdata}></Hly_gen>
                        <div className={styles.logo}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={styles.fbox}>
                    <div className={`${styles.rbox} ${styles.box_shadow}`}>
                        <Hly_gens height={400}
                                  name0={barlotimes2}
                                  power1={barlopowers2}
                                  power2={barlopowerp2}
                                  text={mon + w0 + "各风场发电量" }></Hly_gens>
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
                            <Hly_genp height={400}
                                      name0={barlotimes3}
                                      power1={barlopowers3}
                                      power2={barlopowerp3}
                                      text={mon + w0 + w10 + "各风机发电量"}></Hly_genp>
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
        hhdata: state.vars.hhdata,
        hhdata1: state.vars.hhdata1,
        actbt: state.vars.actbt,
        wind: state.vars.wind,
        winds: state.vars.winds,
        arr: state.vars.arr,
        arr2: state.vars.arr2,
        arr3: state.vars.arr3,
        w0: state.vars.w1,
        w10: state.vars.w11,
        mon: state.vars.mon,
        windplan: state.vars.windplan,
        barlotimes1: state.vars.barlotimes1,
        barlopowers1: state.vars.barlopowers1,
        barlopowerp1: state.vars.barlopowerp1,
        barlotimes2: state.vars.barlotimes2,
        barlopowers2: state.vars.barlopowers2,
        barlopowerp2: state.vars.barlopowerp2,
        barlotimes3: state.vars.barlotimes3,
        barlopowers3: state.vars.barlopowers3,
        barlopowerp3: state.vars.barlopowerp3,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ip) => {
            $.ajax({
                type:'post',
                url:'http://10.68.100.32:8080/wbi/ELEC/getSpaceElec',
                async:false,
                data:'month=11',
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    dispatch(actions.setVars('hhdata',  data));

                    let barlotimes1 = [];
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[2]) {
                        barlotimes1.push(data.data[2][i].groupname);    //区域的横坐标
                        barlopowers1.push(data.data[2][i].powerplan);   //计划发电量
                        barlopowerp1.push(data.data[2][i].poweract);   //实际发电量
                    }
                    let w0=data.data[2][0].groupname;
                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i in data.data[1]) {
                        barlotimes2.push(data.data[1][i].wfname);    //区域的横坐标
                        barlopowers2.push(data.data[1][i].powerplan);   //计划发电量
                        barlopowerp2.push(data.data[1][i].poweract);   //实际发电量
                    }
                    let barlotimes3 = [];
                    let barlopowers3 = [];
                    let barlopowerp3 = [];
                    for (var i in data.data[2]) {
                        barlotimes3.push(data.data[2][i].wtname);    //区域的横坐标
                        barlopowers3.push(data.data[2][i].powerplan);   //计划发电量
                        barlopowerp3.push(data.data[2][i].poweract);   //实际发电量
                    }

                    dispatch(actions.setVars('barlotimes1', barlotimes1));
                    dispatch(actions.setVars('barlopowers1', barlopowers1));
                    dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));

                    dispatch(actions.setVars('barlotimes3', barlotimes3));
                    dispatch(actions.setVars('barlopowers3', barlopowers3));
                    dispatch(actions.setVars('barlopowerp3', barlopowerp3));


                    dispatch(actions.setVars('w1', w0));



                },
                error:function(){

                },
            })
            var obj = {
                test: ''
            }
        },
        init: () => {
            var obj = {
                test: ''
            }
        },
        changecolor: (value, key) => {
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('actbt', key));
            dispatch(actions.setVars('wind', value.plan));
            dispatch(actions.setVars('winds', value.actrul));

            $.ajax({
                type:'post',
                url:'http://10.68.100.32:8080/wbi/ELEC/getSpaceElec',
                async:false,
                data:{"month":key+1},
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    let barlotimes1 = [];
                    let barlopowers1 = [];
                    let barlopowerp1 = [];
                    for (var i in data.data[2]) {
                        barlotimes1.push(data.data[2][i].groupname);    //区域的横坐标
                        barlopowers1.push(data.data[2][i].powerplan);   //计划发电量
                        barlopowerp1.push(data.data[2][i].poweract);   //实际发电量
                    }
                    let w0=data.data[2][0].groupname;
                    let barlotimes2 = [];
                    let barlopowers2 = [];
                    let barlopowerp2 = [];
                    for (var i in data.data[1]) {
                        barlotimes2.push(data.data[1][i].wfname);    //区域的横坐标
                        barlopowers2.push(data.data[1][i].powerplan);   //计划发电量
                        barlopowerp2.push(data.data[1][i].poweract);   //实际发电量
                    }
                    let barlotimes3 = [];
                    let barlopowers3 = [];
                    let barlopowerp3 = [];
                    for (var i in data.data[2]) {
                        barlotimes3.push(data.data[2][i].wtname);    //区域的横坐标
                        barlopowers3.push(data.data[2][i].powerplan);   //计划发电量
                        barlopowerp3.push(data.data[2][i].poweract);   //实际发电量
                    }

                    dispatch(actions.setVars('barlotimes1', barlotimes1));
                    dispatch(actions.setVars('barlopowers1', barlopowers1));
                    dispatch(actions.setVars('barlopowerp1', barlopowerp1));

                    dispatch(actions.setVars('barlotimes2', barlotimes2));
                    dispatch(actions.setVars('barlopowers2', barlopowers2));
                    dispatch(actions.setVars('barlopowerp2', barlopowerp2));

                    dispatch(actions.setVars('barlotimes3', barlotimes3));
                    dispatch(actions.setVars('barlopowers3', barlopowers3));
                    dispatch(actions.setVars('barlopowerp3', barlopowerp3));
                },
                error:function(){

                },
            })

        },
        gogogo: (x4,x5,x45,i) => {
            console.log(x4);
            dispatch(actions.setVars('arr', x4[i].wtname));
            dispatch(actions.setVars('arr2', x5[i].poweract))
            dispatch(actions.setVars('arr3', x45[i].powerplan))


        },
        back: (x6,x7,x67,i) => {


            dispatch(actions.setVars('arr', x6[i].wtname))
            dispatch(actions.setVars('arr2', x7[i].poweract))
            dispatch(actions.setVars('arr3', x67[i].powerplan))
        },
        more: () => {
            $("#boxhidden").show();
            $("#light").show();
        },
        hideit: () => {
            $("#boxhidden").hide();
            $("#light").hide();
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));

        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
