import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_tt from '../group/groupj/Hly_tt.jsx';
import Hly_d from '../group/groupj/Hly_d.jsx';
var actions = require('redux/actions');


let data = require('./Healthy-data');
let month = data.data.line_month;
let button = data.data.button;
let barLoTime1 = data.data.line_month;
let barLoPowerValue1 = data.data.bar_loPower;
let text0=data.data.line_date;
let text1=data.data.text5;
let barRotime = data.data.bar_rotime;
let barLotime = data.data.bar_lotime;
let barLoPowerValue = data.data.bar_loPower;
let barLdpowerValue1 = data.data.line_date;
let barLpdpowerValue1 = data.data.line_pdate;



let Component = React.createClass({
    componentWillMount() {
        let {ipUrl}=this.props;
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {ipUrl, monthx, monthx2, healthy2, healthy3, monthx3, befor_pages = 'area', mon, returnit} = this.props;
        let data = require('./Healthy-data');
        return (




            <div className={styles.box}>
                <div className={styles.return2} onClick={() => returnit(befor_pages)}>返回</div>
                <div className={styles.tbox2}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_tt barLoTime={monthx}
                                barLoPowerValue={healthy2}
                                text={"巴盟每月健康度"}></Hly_tt>

                        <div className={styles.logo1}>

                        </div>
                    </div>
                </div>

                <div className={styles.clear}>

                </div>
                <div className={`${styles.fbox}  ${styles.logofa}`}>
                    <div className={`${styles.box_shadow}`}>
                        <Hly_d monthx3={monthx3}
                               healthy3={healthy3}
                               text={mon + "巴盟每日健康度"}></Hly_d>
                        <div className={styles.logomini}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        ipUrl: state.vars.ipUrl,
        monthx: state.vars.monthx,
        monthx2: state.vars.monthx2,
        monthx3: state.vars.monthx3,
        healthy2: state.vars.healthy2,
        healthy3: state.vars.healthy3,
        mon: state.vars.mon,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            var obj = {
                test: ''
            }
            dispatch(actions.setVars('bt0', 0));
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/Health/getCompanyMonthHealth',
                async: false,
                data: {
                    "month": '',
                    "year": '',

                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    dispatch(actions.setVars('hhdata', data));
                    dispatch(actions.setVars('mon', month2 + "月"));

                    let WTHeal = data.data.monthHealth;
                    let WTN = [];
                    let WTHealName = [];
                    WTHeal.map(function (value, key) {
                        for (let n in value) {

                            WTN.push(value[n]);
                            WTHealName.push(n + "月")
                        }

                    })
                    let monthx=[];
                    let qq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, ];
                    for(let i in qq){
                        monthx.push(qq[i]+"日")
                    }
                    let healthy3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]

                    dispatch(actions.setVars('healthy2', WTN));
                    dispatch(actions.setVars('monthx', WTHealName));

                    dispatch(actions.setVars('monthx3', monthx));
                    dispatch(actions.setVars('healthy3', healthy3));

                },
                error: function () {

                },
            })


        },

        init: () => {
            var obj = {
                test: ''
            }
        },
        returnit: (befor_pages) => {
            dispatch(actions.setVars('showPage', befor_pages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
