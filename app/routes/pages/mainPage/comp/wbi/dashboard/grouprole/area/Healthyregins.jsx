import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_ttt from './Hly_ttt.jsx';
import Hly_d from '../group/groupj/Hly_d.jsx';
var actions = require('redux/actions');


let data = require('./Healthy-data');




let Component = React.createClass({
    componentWillMount() {
        let {ipUrl,areaId}=this.props;
        this.props.ajax(ipUrl,areaId);
    },
    componentDidMount() {
        this.props.init();
    },


    render() {
        let {ipUrl,areaId, monthx, monthx2, healthy2, healthy3, monthx3, befor_pages = 'area', mon, returnit} = this.props;
        let data = require('./Healthy-data');
        return (




            <div className={styles.box}>
                <div className={styles.paddingtop}>
                <div className={styles.return2} onClick={() => returnit(befor_pages)}>返回</div>
                </div>
                <div className={styles.tbox2}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_ttt barLoTime={monthx}
                                barLoPowerValue={healthy2}
                                text={"巴盟每月健康度"}></Hly_ttt>

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
        areaId: state.vars.areaId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl,areaId) => {
            var obj = {
                test: ''
            }
            dispatch(actions.setVars('bt0', 0));
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
            }
            areaId=areaId[0];
            console.log(month2)
            console.log(areaId)

            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/Health/getAreaTimHealth',
                async: false,
                data: {
                    "month": month2,
                    "year": '',
                    "groupid":areaId,
                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {
                    console.log(data)
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
                    let WTHea2 = data.data.dayHealth;
                    let WTN2 = [];
                    let WTHealName2 = [];

                    for(let m in WTHea2){
                        WTN2.push(WTHea2[m]);
                        WTHealName2.push(m.slice(6,8)+"日")
                    }

                    dispatch(actions.setVars('healthy2', WTN));
                    dispatch(actions.setVars('monthx', WTHealName));

                    dispatch(actions.setVars('monthx3', WTHealName2));
                    dispatch(actions.setVars('healthy3', WTN2));

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
