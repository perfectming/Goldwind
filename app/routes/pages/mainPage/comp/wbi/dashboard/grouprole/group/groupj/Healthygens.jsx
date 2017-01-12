import React from 'react';
import {connect} from 'react-redux';
import styles from '../../area/Hindex.scss';
import Hly_genday from './Hly_genday.jsx';
import Login from '../../../../../../../../../components/common/Loading.jsx';
var actions = require('redux/actions');
let ip="10.68.100.32";

;

let Component = React.createClass({

    componentWillMount() {
        let {ipUrl}=this.props
        this.props.ajax(ipUrl);
    },
    componentDidMount() {
        this.props.init();
    },



    render() {
        let {befor_pages='group',mapmonth,boll4=false,skinStyle, returnit,actbt=10,changecolor,day0,poweract,powerplan,mon,ipUrl} = this.props;
          let data = require('./../../area/Healthy-data');

        if(boll4){
        return (

            <div className={skinStyle==1?styles.boxBlue:skinStyle==2?styles.boxWhite:styles.box}>


                <div className={styles.onmonth}>
                    {
                        mapmonth.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key}
                                     onClick={()=>changecolor(value,key,ipUrl)}>
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
                                      barLpdpowerValue={powerplan}
                                      barLdpowerValue={day0}
                                      text={mon+"每日集团发电量"}></Hly_genday>
                        <div className={styles.logo5}>

                        </div>
                    </div>
                </div>



            </div>
        );}else{
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
        mon:state.vars.mon,
        ipUrl: state.vars.ipUrl,
        skinStyle: state.vars.skinStyle,
        boll4: state.vars.boll4,
        mapmonth: state.vars.mapmonth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            $.ajax({
                type: 'post',
                url: 'http://' + ipUrl + '/wbi/BaseData/getYearAndMonthList',
                async: false,
                data: {

                },
                dataType: 'json',
                timeout: '3000',
                success: function (data) {

                    console.log(data)
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
                url:'http://'+ipUrl+'/wbi/ELEC/getSpaceTimeElec',
                async:false,
                data: {
                    "year": year[10].year,
                    "month": year[10].yearpoweract,
                },
                dataType:'json',
                timeout:'3000',
                success:function(data){
                    let day0=[];
                    let poweract=[];
                    let powerplan=[];
                    for(var i in data.data){
                        day0.push(data.data[i].day+"日");
                        poweract.push(Number((data.data[i].poweract).toFixed(2)));
                        powerplan.push(Number((data.data[i].powerplan).toFixed(2)));

                    }
                    dispatch(actions.setVars('day1',day0 ));
                    dispatch(actions.setVars('poweract1',poweract ));
                    dispatch(actions.setVars('powerplan1',powerplan ))
                    dispatch(actions.setVars('boll4',true ))
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
        changecolor :(value,key,ipUrl)=>{
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('mon', value.yearpoweract+"月"));


            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/ELEC/getSpaceTimeElec',
                async:false,
                data:{
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
                    for(var i in data.data){

                        day0.push(data.data[i].day+"日");
                        poweract.push(Number((data.data[i].poweract).toFixed(2)));
                        powerplan.push(Number((data.data[i].powerplan).toFixed(2)));

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
