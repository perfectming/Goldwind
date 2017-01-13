import React from 'react';
import {connect} from 'react-redux';
import styles from './Hindex.scss';
import Hly_genday from '../group/groupj/Hly_genday.jsx';
import Login from '../../../../../../../../components/common/Loading.jsx';
var actions = require('redux/actions');
let ip="10.68.100.32";

;

let Component = React.createClass({
    componentWillMount() {
        let {ipUrl,areaId}=this.props
        this.props.ajax(ipUrl,areaId);
    },
    componentDidMount() {
        this.props.init();
    },



    render() {
        let {befor_pages='area',ipUrl,areaId,mapmonth,skinStyle,boll6=false, returnit,actbt=10,changecolor,day0,poweract,powerplan} = this.props;
        let data = require('./Healthy-data');
        let month = data.data.line_month;
        let button = data.data.button;
        let barLdpowerValue1 = data.data.line_date;
        let barLpdpowerValue1 = data.data.line_pdate;
        let barLpdpowerValues1 = data.data.line_pdates;
        let text0=data.data.line_date

        if(boll6){
        return (
            <div className={skinStyle==1?styles.boxBlue:skinStyle==2?styles.boxWhite:styles.box}>


                <div className={styles.onmonth}>
                    {
                        mapmonth.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={()=>changecolor(value,key,ipUrl,areaId)}>
                                    {value.yearpoweract+"月"}
                                </div>
                            )
                        })
                    }
                    <div className={styles.return} onClick={()=>returnit(befor_pages)}>返回</div>
                </div>


                <div className={`${styles.fbox10}`}>
                    <div className={`${styles.box_shadow} ${styles.logofa}`}>
                        <Hly_genday   barLpdpowerValues={poweract}
                                      jhpcolor={skinStyle == 1 ? "#fff" : skinStyle == 2 ? "#333333" : "#fff"}
                                      barLpdpowerValue={powerplan}
                                      barLdpowerValue={day0}
                                      text={text0[actbt]+'月巴盟区域每日发电量'}></Hly_genday>
                        <div className={styles.logo5}>

                        </div>
                    </div>
                </div>



            </div>
        );
        } else {
            return (<Login></Login>)
        }
    }
});


const mapStateToProps = (state) => {
    return {
        actbt:state.vars.actbt,
        wind:state.vars.wind,
        winds:state.vars.winds,
        day0:state.vars.day1,
        powerplan:state.vars.powerplan1,
        poweract:state.vars.poweract1,
        ipUrl:state.vars.ipUrl,
        areaId: state.vars.areaId,
        skinStyle: state.vars.skinStyle,
        boll6: state.vars.boll6,
        mapmonth: state.vars.mapmonth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl,areaId) => {

            areaId=areaId[0];
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/BaseData/getYearAndMonthList',
                async: false,
                data: {

                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    dispatch(actions.setVars('mapmonth', data.data));
                    dispatch(actions.setVars('actbt', 10));
                    dispatch(actions.setVars('mon',  data.data[10].yearpoweract+"月"));
                    jiang(data.data);
                },
                error: function () {
                    console.log("数据获取失败");
                },
            });
            function jiang(year) {


            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/ELEC/getAreaTimesElec',
                async:false,
                data:{

                    "groupid":  areaId==undefined? '201612121721151':areaId,
                    "year": year[10].year,
                    "month": year[10].yearpoweract,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    console.log(data)
                    let day0=[];
                    let poweract=[];
                    let powerplan=[];
                    for(var i in data.data.areaTimeElec){

                        day0.push(data.data.areaTimeElec[i].day+"日");
                        poweract.push(Number((data.data.areaTimeElec[i].poweract).toFixed(2)));
                        powerplan.push(Number((data.data.areaTimeElec[i].powerplan).toFixed(2)));

                    }
                    dispatch(actions.setVars('day1',day0 ));
                    dispatch(actions.setVars('poweract1',poweract ));
                    dispatch(actions.setVars('powerplan1',powerplan ))
                    dispatch(actions.setVars('boll6',true ))

                },
                error:function(){
                    alert(2)
                },
            })
            }


        },
        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test: ''
            }
        },
        changecolor :(value,key,ipUrl,areaId)=>{
            areaId=areaId[0];
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('wind',value.plan ));
            dispatch(actions.setVars('winds',value.actrul ));

            $.ajax({
                type:'post',
                url:'http://' + ipUrl + '/wbi/ELEC/getAreaTimesElec',
                async:false,
                data:{
                    "groupid":  areaId==undefined? '201612121721151':areaId,
                    "year":value.year,
                    "month": value.yearpoweract,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    console.log(data)
                    let day0=[];
                    let poweract=[];
                    let powerplan=[];
                    for(var i in data.data.areaTimeElec){
                        day0.push(data.data.areaTimeElec[i].day+"日");
                        poweract.push(Number((data.data.areaTimeElec[i].poweract).toFixed(2)));
                        powerplan.push(Number((data.data.areaTimeElec[i].powerplan).toFixed(2)));

                    }
                    dispatch(actions.setVars('day1',day0 ));
                    dispatch(actions.setVars('poweract1',poweract ));
                    dispatch(actions.setVars('powerplan1',powerplan ))
                },
                error:function(){

                },
            })

        },
        returnit:(befor_pages)=>{
            dispatch(actions.setVars('showPage',befor_pages));

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
