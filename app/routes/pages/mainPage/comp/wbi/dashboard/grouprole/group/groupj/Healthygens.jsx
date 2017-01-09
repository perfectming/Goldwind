import React from 'react';
import {connect} from 'react-redux';
import styles from '../../area/Hindex.scss';
import Hly_genday from './Hly_genday.jsx';

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
        let {befor_pages='group',skinStyle, returnit,actbt=10,changecolor,day0,poweract,powerplan,mon,ipUrl} = this.props;
          let data = require('./../../area/Healthy-data');
        let month = data.data.line_month;
        let button = data.data.button;
        let barLdpowerValue1 = data.data.line_date;
        let barLpdpowerValue1 = data.data.line_pdate;
        let barLpdpowerValues1 = data.data.line_pdates;
        let text0=data.data.line_date
        return (




            <div className={skinStyle==1?styles.boxBlue:skinStyle==2?styles.boxWhite:styles.box}>


                <div className={styles.onmonth}>
                    {
                        data.data.yearelectric[0].wind.map((value, key) => {
                            return (
                                <div className={actbt===key? styles.inmonth : styles.inmonth2} key={key} onClick={()=>changecolor(value,key)}>
                                    {value.name}
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
                        <div className={styles.logomini5}>

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
        day0:state.vars.day1,
        powerplan:state.vars.powerplan1,
        poweract:state.vars.poweract1,
        mon:state.vars.mon,
        ipUrl: state.vars.ipUrl,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ajax: (ipUrl) => {
            var obj = {
                test: ''
            }
            let date = new Date();
            let year = date.getFullYear()
            let month2 = date.getMonth();
            if(month2==0){
                month2=12;
            }
            dispatch(actions.setVars('actbt',  month2-1));
            dispatch(actions.setVars('mon',  month2+"月"));
            $.ajax({
                type:'post',
                url:'http://'+ipUrl+'/wbi/ELEC/getSpaceTimeElec',
                async:false,
                data:{
                    "month":month2==0? 12:month2,
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
                },
                error:function(){
                    alert(2)
                },
            })


        },
        init: () => {
            dispatch(actions.setVars('ip', ip));
            var obj = {
                test: ''
            }
        },
        changecolor :(value,key)=>{
            dispatch(actions.setVars('actbt',key ));
            dispatch(actions.setVars('mon', value.name));
            dispatch(actions.setVars('wind',value.plan ));
            dispatch(actions.setVars('winds',value.actrul ));

            $.ajax({
                type:'post',
                url:'http://'+ip+':8080/wbi/ELEC/getSpaceTimeElec',
                async:false,
                data:{"month":key+1},
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
